import db from "../models/index.js";
import { Op, col, fn } from "sequelize";
import cloudinary from "../config/cloudinary.js";
import axios from "axios";

export const getPostService = async (
  page,
  pageSize,
  priceId,
  areaId,
  categoryId,
  status,
  address
) => {
  try {
    const offset = (page - 1) * pageSize;
    const valueFilter = [];
    if (priceId) {
      valueFilter.push({ priceId });
    }

    if (areaId) {
      valueFilter.push({ areaId });
    }

    if (categoryId) {
      valueFilter.push({ categoryId });
    }

    if (address) {
      valueFilter.push({ address: { [Op.like]: `%${address}%` } });
    }
    const posts = await db.Post.findAll({
      where: {
        [Op.and]: valueFilter,
        status: status,
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    const currentPageTotal = await db.Post.findAll({
      where: {
        [Op.and]: valueFilter,
        status: status,
      },
    });

    const totalCount = currentPageTotal.length;
    const totalPages = Math.ceil(currentPageTotal.length / pageSize);

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      posts,
      totalPages,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getNewPostService = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const posts = await db.Post.findAll({
      where: {
        status: "active",
      },
      order: [["createdAt", "desc"]],
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    const currentPageTotal = await db.Post.findAll({
      where: {
        status: "active",
      },
      order: [["createdAt", "desc"]],
    });

    const totalCount = currentPageTotal.length;
    const totalPages = Math.ceil(currentPageTotal.length / pageSize);

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      posts,
      totalPages,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getPostFollowService = async (page, pageSize, userId) => {
  try {
    const follow = await db.Follow.findAll({
      where: {
        followerId: userId,
      },
      raw: true,
    });
    const followingUser = follow.map((item) => item.followingId);
    const offset = (page - 1) * pageSize;
    const posts = await db.Post.findAll({
      where: {
        userId: followingUser,
        status: "active",
      },
      order: [["createdAt", "desc"]],
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    const currentPageTotal = await db.Post.findAll({
      where: {
        userId: followingUser,
        status: "active",
      },
      order: [["createdAt", "desc"]],
    });

    const totalCount = currentPageTotal.length;
    const totalPages = Math.ceil(currentPageTotal.length / pageSize);

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      posts,
      totalPages,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getPostSearchService = async (page, pageSize, keyword) => {
  try {
    const offset = (page - 1) * pageSize;
    const posts = await db.Post.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
        status: "active",
      },
      order: [["createdAt", "desc"]],
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    const currentPageTotal = await db.Post.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
        status: "active",
      },
    });

    const totalCount = await db.Post.count();
    const totalPages = Math.ceil(currentPageTotal.length / pageSize);

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      posts,
      totalPages,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.log(error);
  }
};

export const createPostService = async (id, payload) => {
  try {
    const newPost = await db.Post.create({
      userId: id,
      ...payload,
    });
    if (newPost) {
      const { images } = payload;
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i]);
          await db.Image.create({
            postId: newPost.id,
            imageUrl: result.url,
          });
        }
      }
      return {
        status: true,
        message: "Tạo bài đăng thành công!",
        post: newPost,
      };
    } else {
      return {
        status: false,
        message: "Không thể tạo bài đăng",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostByIdService = async (id) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
    });
    if (!post) {
      return {
        status: false,
        message: "Bài đăng không tồn tại!",
      };
    }

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      post,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getPostSuggestService = async (
  page,
  pageSize,
  priceId,
  areaId,
  address
) => {
  try {
    const offset = (page - 1) * pageSize;
    const posts = await db.Post.findAll({
      where: {
        priceId: priceId,
        areaId: areaId,
        address: {
          [Op.like]: `%${address}%`,
        },
        status: "active",
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    const currentPageTotal = await db.Post.findAll({
      where: {
        priceId: priceId,
        areaId: areaId,
        status: "active",
      },
    });

    const totalCount = await db.Post.count();
    const totalPages = Math.ceil(currentPageTotal.length / pageSize);

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      posts,
      totalPages,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getPostByUserIdService = async (
  page,
  pageSize,
  userId,
  status
) => {
  try {
    const offset = (page - 1) * pageSize;
    const posts = await db.Post.findAll({
      where: {
        userId: userId,
        status: status,
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    const currentPageTotal = await db.Post.findAll({
      where: {
        userId: userId,
        status: status,
      },
    });

    const totalCount = await db.Post.count();
    const totalPages = Math.ceil(currentPageTotal.length / pageSize);

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      posts,
      totalPages,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.log(error);
  }
};

export const hiddenPostService = async (postId, userId) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });
    if (post?.status === "hidden") {
      return {
        status: false,
        message: "Tin này đã bị ẩn!",
      };
    }
    if (post && post.userId === userId) {
      await db.Post.update({ status: "hidden" }, { where: { id: postId } });
      return {
        status: true,
        message: "Ẩn tin thành công!",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const adminHiddenPostService = async (postId) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });
    if (post?.status === "hidden") {
      return {
        status: false,
        message: "Tin này đã bị ẩn!",
      };
    }
    await db.Post.update({ status: "hidden" }, { where: { id: postId } });
    return {
      status: true,
      message: "Ẩn tin thành công!",
    };
  } catch (error) {
    console.log(error);
  }
};

export const expiredPostService = async () => {
  try {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    await db.Post.update(
      { status: "expired" },
      {
        where: {
          createdAt: { [db.Sequelize.Op.lt]: fiveDaysAgo },
          status: "active",
        },
      }
    );
    console.log("Đã cập nhật trạng thái cho các bài đăng đã hết hạn.");
  } catch (error) {
    console.log(error);
  }
};

export const incrementPostViewService = async (postId, userId) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });

    if (post.userId === userId) {
      return;
    }

    if (!post) {
      return {
        status: false,
        message: "Không tìm thấy bài đăng!",
      };
    }
    await db.Post.increment("viewsCount", {
      where: { id: postId },
      by: 1,
    });
    return {
      status: true,
      message: "Đã tăng lượt truy cập bài đăng này!",
    };
  } catch (error) {
    console.log(error);
  }
};

export const monthlyPostCountService = async () => {
  try {
    const result = await db.Post.findAll({
      attributes: [
        [fn("YEAR", fn("DATE", col("createdAt"))), "year"],
        [fn("MONTH", fn("DATE", col("createdAt"))), "month"],
        [fn("COUNT", "*"), "count"],
      ],
      group: ["year", "month"],
      order: [
        ["year", "ASC"],
        ["month", "ASC"],
      ],
    });
    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      result,
    };
  } catch (error) {
    console.log(error);
  }
};

export const topViewPostService = async () => {
  try {
    const result = await db.Post.findAll({
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
      order: [["viewsCount", "desc"]],
      limit: 3,
    });
    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      result,
    };
  } catch (error) {
    console.log(error);
  }
};

export const postCategoryCountService = async () => {
  try {
    const postCounts = await db.Post.findAll({
      attributes: ["categoryId", [fn("COUNT", col("categoryId")), "postCount"]],
      group: ["categoryId"],
      include: [{ model: db.Category, as: "category", attributes: ["value"] }],
    });
    const data = postCounts.map((entry) => ({
      category: entry.category.value,
      count: entry.dataValues.postCount,
    }));
    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      result: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getRecentPostService = async (userId, { longitude, latitude }) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        userId: {
          [Op.not]: userId,
        },
        status: "active",
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Image,
          as: "images",
          attributes: ["imageUrl"],
        },
      ],
    });
    const postsWithDistance = [];
    for (const post of posts) {
      const { data } = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
          post.address
        )}&access_token=pk.eyJ1IjoiYW5odHJhbngxMjMiLCJhIjoiY2x3ZXRveDlxMWt1azJxcDA5eWJ2MGY2dCJ9.VxaY6H_ilq6Jl8PZNsPbqw`
      );
      const postLongitude = data.features[0].geometry.coordinates[0];
      const postLatitude = data.features[0].geometry.coordinates[1];

      const distance = calculateDistance(
        longitude,
        latitude,
        postLongitude,
        postLatitude
      );

      if (distance <= 10) {
        // lấy bài viết trong phạm vi 10km
        postsWithDistance.push({
          post,
          distance,
        });
      }
    }
    postsWithDistance.sort((a, b) => a.distance - b.distance);

    const nearestPosts = postsWithDistance.slice(0, 4).map((item) => item.post);

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      posts: nearestPosts,
    };
  } catch (error) {
    console.log(error);
  }
};

//hàm tính khoảng cách
const calculateDistance = (
  userLongitude,
  userLatitude,
  postLongitude,
  postLatitude
) => {
  const R = 6371;

  const lat1 = (userLatitude * Math.PI) / 180;
  const lon1 = (userLongitude * Math.PI) / 180;
  const lat2 = (postLatitude * Math.PI) / 180;
  const lon2 = (postLongitude * Math.PI) / 180;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};
