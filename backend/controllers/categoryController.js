import { createCategoryService, deleteCategoryService, getCategoryService, updateCategoryService } from "../services/categoryService.js"

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

export const createCategoryController = async (req, res) =>{
    try {
        const {code, value} = req.body
        if(!code || !value) {
            return res.status(200).send({
                status: false,
                message: "Bạn phải nhập đầy đủ thông tin"
            })
        }
        const category = await createCategoryService(req.body)
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

export const updateCategoryController = async (req, res) => {
    try {
        const id = req.params.id
        const {...payload} = req.body
        const result = await updateCategoryService(id, payload)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const id = req.params.id
        const result = await deleteCategoryService(id)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}