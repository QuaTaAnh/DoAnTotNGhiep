import { getProfileService } from "../services/authService.js"
import { getAllUserService, getUserByIdService, statistUserRegisterService, updateProfileService } from "../services/userService.js"

export const updateProfileController = async (req, res) => {
    try {
        const { id }  = req.user
        const {...user} = req.body
        const result = await updateProfileService(id, user)
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

export const getUserPersonalController = async (req, res) => {
    try {
        const { id }  = req.params
        const result = await getProfileService(id)
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

export const getAllUserController = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = 10
        const result = await getAllUserService(page, pageSize)
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

export const statistUserRegisterController = async (req, res) => {
    try {
        const result = await statistUserRegisterService()
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

export const adminUpdateUserController = async (req, res) => {
    try {
        const id = req.body.id
        const {...user} = req.body
        const result = await updateProfileService(id, user)
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

export const getUserByIdController = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getUserByIdService(id)
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


