import { getCategoryService } from "../services/categoryService.js"

export const getCategoryController = async (req, res) =>{
    try {
       const category = await getCategoryService()
       return res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}