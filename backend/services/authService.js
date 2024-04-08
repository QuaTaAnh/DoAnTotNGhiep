import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'

export const registerService = ({ phone, password, name }) => new Promise(async (resolve, reject) => {
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
        resolve({
            status: user ? true : false,
            message: user ? 'Đăng kí thành công!' : 'Số điện thoại đã có người sử dụng!',
        })
    } catch (error) {
        reject(error)
    }
})

export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
  try {
      const user = await db.User.findOne({
          where: { phone },
          raw: true
      })
      if(!user){
        resolve({
          status: false,
          message: 'Số điện thoại chưa đăng kí!'})
      }
      const checkPass = await comparePassword(password, user.password)
      if(!checkPass){
        resolve({
          status: false,
          message: 'Sai mật khẩu!'})
      }
      const token =  await jwt.sign({id: user.id, phone: user.phone}, process.env.SECRET_KEY, {expiresIn: '2d'}) 
      resolve({
        status: true,
        message: 'Đăng nhập thành công!', 
        token: token
      })
  } catch (error) {
      reject(error)
  }
})