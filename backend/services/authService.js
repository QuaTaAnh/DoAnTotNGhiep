import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import cloudinary from "../config/cloudinary.js";

export const registerService = async ({ phone, password, name }) => {
    try {
        const hashedPass = await hashPassword(password)
        const response = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                name,
                phone,
                password: hashedPass,
                isAdmin: false,
                zalo: phone
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
      const token =  await jwt.sign({id: user.id, phone: user.phone, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn: '1d'}) 
      return {
        status: true,
        message: 'Đăng nhập thành công!', 
        token: token
      }
  } catch (error) {
    console.log(error);
  }
}

export const getProfileService = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id },
            attributes: {
                exclude: ['password']
            }
        })
        const followersCount = await db.Follow.count({
            where: { followingId: user.id }
          });
      
        const followingCount = await db.Follow.count({
          where: { followerId: user.id }
        });
        
        user = user.toJSON(); 
        user.followersCount = followersCount;
        user.followingCount = followingCount;
        return {
            status: true,
            message: 'Lấy thông tin người dùng thành công!', 
            user: user
        }
    } catch (error) {
        console.log(error);
    }
}