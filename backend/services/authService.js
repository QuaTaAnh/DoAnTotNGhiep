import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'

export const registerService = async ({ phone, password, name }) => {
    try {
        const hashedPass = await hashPassword(password)
        const response = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                id: v4(),
                name,
                phone,
                password: hashedPass,
            }
        })
        const user = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        return {
            status: user ? true : false,
            message: user ? 'Đăng kí thành công!' : 'Số điện thoại đã có người sử dụng!',
        }
    } catch (error) {
        console.log(error);
    }
}

export const loginService = async ({ phone, password }) => {
  try {
      const user = await db.User.findOne({
          where: { phone },
          raw: true
      })
      if(!user){
        return {
            status: false,
            message: 'Số điện thoại chưa đăng kí!'
        }
      }
      const checkPass = await comparePassword(password, user.password)
      if(!checkPass){
        return {
            status: false,
            message: 'Sai mật khẩu!'
        }
      }
      const token =  await jwt.sign({id: user.id, phone: user.phone}, process.env.SECRET_KEY, {expiresIn: '1h'}) 
      return {
        status: true,
        message: 'Đăng nhập thành công!', 
        token: token
      }
  } catch (error) {
    console.log(error);
  }
}

export const getProfileService = async (id ) => {
    try {
        const user = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        return {
            status: true,
            message: 'Lấy thông tin người dùng thành công!', 
            user: user
        }
    } catch (error) {
        console.log(error);
    }
  }