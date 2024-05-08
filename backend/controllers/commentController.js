import { createCommentService, getCommentByPageService } from "../services/commentService"

export const createCommentController = async (req, res) =>{
    try {
        const id  = req.user.id
        const comment = await createCommentService(id, req.body)
        return res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const getCommentByPageController = async (req, res) =>{
    try {
        const page = req.query.page
        const postId = req.query.postId
        const comment = await getCommentByPageService(page, postId)
        return res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}