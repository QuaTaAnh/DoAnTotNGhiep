import { checkFavoriteService, getFavoriteByPageService, savePostService, unSavePostService } from "../services/saveService"

export const getFavoriteByPageController = async (req, res) =>{
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = 10
        const userId  = req.params.userId
        const favorite = await getFavoriteByPageService(page, pageSize, userId)
        return res.status(200).json(favorite)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const checkFavoriteController = async (req, res) =>{
    try {
        const userId  = req.user.id
        const postId = parseInt(req.params.postId)
        const favorite = await checkFavoriteService(userId, postId)
        return res.status(200).json(favorite)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const savePostController = async (req, res) =>{
    try {
        const userId  = req.user.id
        const postId = parseInt(req.params.postId)
        const savePost = await savePostService(userId, postId)
        return res.status(200).json(savePost)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const unSavePostController = async (req, res) =>{
    try {
        const userId  = req.user.id
        const postId = parseInt(req.params.postId)
        const unSavePost = await unSavePostService(userId, postId)
        return res.status(200).json(unSavePost)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}