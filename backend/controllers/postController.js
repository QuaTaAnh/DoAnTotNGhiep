import { getNewPostService, getPostService } from '../services/postService.js'

export const getPostController = async (req, res) =>{
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = 10
        const priceCode = req.query.priceCode
        const areaCode = req.query.areaCode
        const categoryCode = req.query.categoryCode
       const post = await getPostService(page, pageSize, priceCode, areaCode, categoryCode)
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