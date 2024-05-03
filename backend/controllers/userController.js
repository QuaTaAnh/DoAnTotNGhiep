import { updateProfileService } from "../services/userService.js"

export const updateProfileController = async (req, res) => {
    try {
        const { id }  = req.user
        const { name, phone, zalo, newPassword, oldPassword, avatar } = req.body
        const updateProfile = {name, phone, zalo, newPassword, oldPassword, avatar}
        const user = await updateProfileService(id, updateProfile)
        return res.status(200).json(user)
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}