import db from "../models/index.js";

export const getCategoryService = async () => {
  try {
    const categories = await db.Category.findAll({
      raw: true,
    });

    return {
      status: true,
      message: "Lấy dữ liệu thành công!",
      categories,
    };
  } catch (error) {
    console.log(error);
  }
};

export const createCategoryService = async (payload) => {
  try {
    const existingCategory = await db.Category.findOne({
      where: {
        code: payload.code,
      },
    });
    if (existingCategory) {
      return {
        status: false,
        message: "Mã danh mục đã tồn tại!.",
      };
    }
    const newCate = await db.Category.create({
      ...payload,
    });
    if (newCate) {
      return {
        status: true,
        message: "Tạo danh mục thành công!",
      };
    } else {
      return {
        status: false,
        message: "Không thể tạo danh mục",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoryService = async (id, payload) => {
  try {
    const category = await db.Category.findOne({
      where: {
        id: id,
      },
    });
    if (!category) {
      return {
        status: false,
        message: "Danh mục không tồn tại!",
      };
    }
    const existingCategory = await db.Category.findAll({
      where: {
        code: payload.code,
      },
    });
    if (existingCategory.length > 0) {
      return {
        status: false,
        message: "Mã danh mục đã tồn tại!.",
      };
    }
    await db.Category.update(payload, {
      where: { id },
    });
    return {
      status: true,
      message: "Cập nhật danh mục thành công!",
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryService = async (id) => {
  try {
    await db.Category.destroy({
      where: {
        id: id,
      },
    });
    return {
      status: true,
      message: "Xóa danh mục thành công!",
    };
  } catch (error) {
    console.log(error);
  }
};
