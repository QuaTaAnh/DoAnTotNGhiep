import db from '../models/index.js'

export const createCommentService = async(userId, payload) =>{
    try {
        const userData = await db.User.findOne({
            where: {
                id: userId
            }
        })

        const {name, avatar} = userData

        let newComment = await db.Comment.create({
            userId: userId,
            postId: payload.postId,
            content: payload.content
        });

        newComment = {...newComment.toJSON(), user: {name, avatar}}
        
        if(newComment){
            return {
                success: true,
                data: newComment,
                message: 'Bình luận thành công!',
              };
        }
    } catch (error) {
        console.log(error);
    }
}

export const getCommentByPageService = async(page, postId) =>{
    try {
        const offset = (page - 1) * 10;
        const comments = await db.Comment.findAll({
            where: {
                postId: postId
            },
            order:  [['createdAt', 'desc']],
            include: [
                { model: db.User, as: 'user', attributes: ['id', 'name', 'zalo', 'phone', 'avatar'] },
            ],
            limit: 10,
            offset: offset
        });

        const currentPageTotal = await db.Comment.findAll({
            where: {
                postId: postId
            },
        })
        
        const totalCount = await db.Comment.count();
        const totalPages = Math.ceil(currentPageTotal.length / 10);

        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            comments,
            totalPages,
            currentPage: page,
            totalCount
        };
    } catch (error) {
        console.log(error);
    }
}