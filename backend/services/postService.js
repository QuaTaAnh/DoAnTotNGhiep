import db from '../models/index.js'

export const getPostService = async (page, pageSize) => {
    try {
        const offset = (page - 1) * pageSize;
        const posts = await db.Post.findAll({
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone', 'avatar'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description'],
            limit: pageSize,
            offset: offset
        });

        const totalCount = await db.Post.count();
        const totalPages = Math.ceil(totalCount / pageSize);

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