import db from '../models/index.js'

export const getFavoriteByPageService = async(page, pageSize, userId) =>{
    try {
        const offset = (page - 1) * pageSize;
        const savePosts = await db.SavePost.findAll({
            where: {
              userId: userId
            },
            include: 
              {
                model: db.Post,
                as: 'post',
                where: {
                    status: 'active'
                },
                include: [
                  {
                    model: db.User,
                    as: 'user',
                    attributes: ['id', 'name', 'zalo', 'phone', 'avatar']
                  },
                  {
                    model: db.Image,
                    as: 'images',
                    attributes: ['imageUrl']
                  }
                ]
              }
            ,
            limit: pageSize,
            offset: offset
        })

        const currentPageTotal = await db.SavePost.findAll({
            where: {
              userId: userId
            },
        })
        const totalPages = Math.ceil(currentPageTotal.length / pageSize);
        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            savePosts,
            totalPages,
            currentPage: page,
        }
    } catch (error) {
        console.log(error);
    }
}

export const checkFavoriteService = async(userId, postId) =>{
    try {
        const checkFavorite = await db.SavePost.findOne({
            where: {
                userId: userId,
                postId: postId
            }
        })
        if(checkFavorite){
            return {
                status: true,
                message: 'Bạn đã lưu tin này!',
            };
        } else{
            return {
                status: false,
                message: 'Bạn chưa lưu tin này!',
            };
        }
    } catch (error) {
        console.log(error);
    }
}

export const savePostService = async(userId, postId) =>{
    try {
        await db.SavePost.create({
            userId: userId,
            postId: postId
        })
        return {
            status: true,
            message: 'Lưu tin thành công!',
        };
    } catch (error) {
        console.log(error);
    }
}

export const unSavePostService = async(userId, postId) =>{
    try {
        await db.SavePost.destroy({
            where: {
                userId: userId,
                postId: postId
            }
        })
        return {
            status: true,
            message: 'Bỏ tin thành công!',
        };
    } catch (error) {
        console.log(error);
    }
}
