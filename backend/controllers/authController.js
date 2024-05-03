import { getProfileService, loginService, registerService } from '../services/authService.js'

export const registerController = async (req, res) =>{
    try {
        const {name, password, phone } = req.body
        if(!name){
            return res.status(400).send({error: 'Vui lòng nhập tên!'})
        }
        if(!password){
            return res.status(400).send({error: 'Vui lòng nhập mật khẩu!'})
        }
        if(!phone){
            return res.status(400).send({error: 'Vui lòng nhập số điện thoại!'})
        }

        const register = await registerService(req.body)
        return res.status(200).json(register)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Đăng kí thất bại!', 
            error
        })
    }
}

export const loginController = async (req, res) =>{
    try {
        const { phone, password } = req.body
        if(!password){
            return res.status(400).send({error: 'Vui lòng nhập mật khẩu!'})
        }
        if(!phone){
            return res.status(400).send({error: 'Vui lòng nhập số điện thoại!'})
        }

        const login = await loginService(req.body)
        return res.status(200).json(login)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Đăng nhập thất bại!', 
            error
        })
    }
}

export const getProfileController = async (req, res) => {
    try {
        const { id }  = req.user
        const user = await getProfileService(id)
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

