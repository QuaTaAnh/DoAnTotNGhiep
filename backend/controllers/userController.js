import { getUserPersonalService, updateProfileService } from "../services/userService.js"

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
        const result = await getUserPersonalService(id)
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

