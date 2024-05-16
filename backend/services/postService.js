import db from '../models/index.js'
import { Op } from 'sequelize';
import cloudinary from "../config/cloudinary.js";

export const getPostService = async (page, pageSize, priceId, areaId, categoryId, status, address) => {
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
                status: status
            },
            include: [
                { model: db.User, as: 'user', attributes: ['id', 'name', 'zalo', 'phone', 'avatar'] },
                { 
                    model: db.Image, 
                    as: 'images', 
                    attributes: ['imageUrl'] 
                },
            ],
            limit: pageSize,
            offset: offset
        });

        const currentPageTotal = await db.Post.findAll({
            where: {
                [Op.and]: valueFilter,
                status: status
            },
        })

        const totalCount = currentPageTotal.length
        const totalPages = Math.ceil(currentPageTotal.length / pageSize);

        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            posts,
            totalPages,
            currentPage: page,
            totalCount
        };
    } catch (error) {
        console.log(error);
    }
}

export const getNewPostService = async (page, pageSize) => {
    try {
        const offset = (page - 1) * pageSize;
        const posts = await db.Post.findAll({
            where: {
                status: 'active' 
            },
            order:  [['createdAt', 'desc']],
            include: [
                { model: db.User, as: 'user', attributes: ['id', 'name', 'zalo', 'phone', 'avatar'] },
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['imageUrl']
                }
            ],
            limit: pageSize,
            offset: offset
        });

        const currentPageTotal = await db.Post.findAll({
            where: {
                status: 'active'
            },
            order:  [['createdAt', 'desc']],
        })

        const totalCount = currentPageTotal.length
        const totalPages = Math.ceil(currentPageTotal.length / pageSize);
        
        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            posts,
            totalPages,
            currentPage: page,
            totalCount
        };
    } catch (error) {
        console.log(error);
    }
}

export const getPostFollowService = async (page, pageSize, userId) => {
    try {
        const follow = await db.Follow.findAll({
            where: {
                followerId: userId
            },
            raw: true
        })
        const followingUser = follow.map(item => item.followingId);
        const offset = (page - 1) * pageSize;
        const posts = await db.Post.findAll({
            where: {
                userId: followingUser,
                status: 'active'
            },
            order:  [['createdAt', 'desc']],
            include: [
                { model: db.User, as: 'user', attributes: ['id', 'name', 'zalo', 'phone', 'avatar'] },
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['imageUrl']
                }
            ],
            limit: pageSize,
            offset: offset
        });

        const currentPageTotal = await db.Post.findAll({
            where: {
                userId: followingUser,
                status: 'active'
            },
            order:  [['createdAt', 'desc']],
        })

        const totalCount = currentPageTotal.length
        const totalPages = Math.ceil(currentPageTotal.length / pageSize);
        
        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            posts,
            totalPages,
            currentPage: page,
            totalCount
        };
    } catch (error) {
        console.log(error);
    }
}

export const getPostSearchService = async (page, pageSize, keyword) => {
    try {
        const offset = (page - 1) * pageSize;
        const posts = await db.Post.findAll({
            where: {
              title: {
                [Op.like]: `%${keyword}%`
                }, 
            status: 'active'
            },
            include: [
                { model: db.User, as: 'user', attributes: ['id','name', 'zalo', 'phone', 'avatar'] },
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['imageUrl']
                }
            ],
            limit: pageSize,
            offset: offset
          });
          
          const currentPageTotal = await db.Post.findAll({
            where: {
                title: {
                    [Op.like]: `%${keyword}%`,
                    },
                status: 'active'
                }
            })

        const totalCount = await db.Post.count();
        const totalPages = Math.ceil(currentPageTotal.length / pageSize);

        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            posts,
            totalPages,
            currentPage: page,
            totalCount
        };
    } catch (error) {
        console.log(error);
    }
}

export const createPostService = async(id, payload) =>{
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
                message: 'Tạo bài đăng thành công!',
                post: newPost
            };
        } else {
            return {
                status: false,
                message: 'Không thể tạo bài đăng'
            };
        }
    } catch (error) {
        console.log(error);
    }
}

export const getPostByIdService = async (id) => {
    try {
        const post = await db.Post.findOne({
            where: {
                id: id,
            },
            include: [
                { model: db.User, as: 'user', attributes: ['id', 'name', 'zalo', 'phone', 'avatar'] },
                { 
                    model: db.Image, 
                    as: 'images', 
                    attributes: ['imageUrl'] 
                }
            ],
        });
        if (!post) {
            return {
                status: false,
                message: 'Bài đăng không tồn tại!'
            };
        }

        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            post
        };
    } catch (error) {
        console.log(error);
    }
}

export const getPostSuggestService = async (page, pageSize, priceId, areaId, address) => {
    try {
        const offset = (page - 1) * pageSize;
        const posts = await db.Post.findAll({
            where: {
                priceId: priceId,
                areaId: areaId,
                address: {
                    [Op.like]: `%${address}%`
                },
                status: 'active' 
            },
            include: [
                { model: db.User, as: 'user', attributes: ['id', 'name', 'zalo', 'phone', 'avatar'] },
                { 
                    model: db.Image, 
                    as: 'images', 
                    attributes: ['imageUrl'] 
                }
            ],
            limit: pageSize,
            offset: offset
        });

        const currentPageTotal = await db.Post.findAll({
            where: {
                priceId: priceId,
                areaId:areaId,
                status: 'active'
            },
        })

        const totalCount = await db.Post.count();
        const totalPages = Math.ceil(currentPageTotal.length / pageSize);

        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            posts,
            totalPages,
            currentPage: page,
            totalCount
        };
    } catch (error) {
        console.log(error);
    }
}

export const getPostByUserIdService = async (page, pageSize, userId, status) => {
    try {
        const offset = (page - 1) * pageSize;
        const posts = await db.Post.findAll({
            where: {
                userId: userId,
                status: status
            },
            include: [
                { model: db.User, as: 'user', attributes: ['id', 'name', 'zalo', 'phone', 'avatar'] },
                { 
                    model: db.Image, 
                    as: 'images', 
                    attributes: ['imageUrl'] 
                }
            ],
            limit: pageSize,
            offset: offset
        });

        const currentPageTotal = await db.Post.findAll({
            where: {
                userId: userId,
                status: status
            },
        })

        const totalCount = await db.Post.count();
        const totalPages = Math.ceil(currentPageTotal.length / pageSize);

        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            posts,
            totalPages,
            currentPage: page,
            totalCount
        };
    } catch (error) {
        console.log(error);
    }
}

export const hiddenPostService = async (postId) =>{
    try {
        const post = await db.Post.findOne({
            where: {
                id: postId,
            },
        });
        if(post?.status === 'hidden'){
            return {
                status: false,
                message: 'Tin này đã bị ẩn!',
            };
        } 
        await db.Post.update(
            {status: 'hidden'}, 
            {where: { id: postId }}
        );
        return {
            status: true,
            message: 'Ẩn tin thành công!',
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const expiredPostService = async () =>{
    try {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
        await db.Post.update(
            { status: 'expired' },
            { where: { createdAt: { [db.Sequelize.Op.lt]: fiveDaysAgo }, status: 'active' } }
        );
        console.log('Đã cập nhật trạng thái cho các bài đăng đã hết hạn.');
    } catch (error) {
        console.log(error);
    }
}

export const incrementPostViewService = async (postId, userId) =>{
    try {
        const post = await db.Post.findOne({
            where: {
                id: postId
            }
        });

        if(post.userId === userId){
            return 
        }

        if(!post){
            return {
                status: false,
                message: 'Không tìm thấy bài đăng!',
            }
        }
        await db.Post.increment('viewsCount', { 
            where: { id: postId },
            by: 1,
         })
        return {
            status: true,
            message: 'Đã tăng lượt truy cập bài đăng này!',
        };
    } catch (error) {
        console.log(error);
    }
}

