import { createPostService, getNewPostService, getPostSearchService, getPostService } from '../services/postService.js'

export const getPostController = async (req, res) =>{
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = 10
        const priceId = req.query.priceId
        const areaId = req.query.areaId
        const categoryId = req.query.categoryId
       const post = await getPostService(page, pageSize, priceId, areaId, categoryId)
       return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const getNewPostController = async (req, res) =>{
    try {
       const post = await getNewPostService()
       return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const getPostSearchController = async (req, res) =>{
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize =  req.query.pageSize ? parseInt(req.query.pageSize) : 10
        const { keyword } = req.params;
       const post = await getPostSearchService(page, pageSize, keyword)
       return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const createPostController = async (req, res) =>{
    try {
        const { id }  = req.user
        const {areaId, categoryId, priceId, title, ...payload} = req.body
        if(!areaId || !categoryId || !priceId || !title){
            return res.status(200).send({
                status: false,
                message: "Bạn phải nhập đầy đủ thông tin"
            })
        }
        const post = await createPostService(id, req.body)
        return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}
