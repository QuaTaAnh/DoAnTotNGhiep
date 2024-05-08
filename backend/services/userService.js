import db from '../models/index.js'
import cloudinary from "../config/cloudinary.js";
import { comparePassword, hashPassword } from '../helpers/authHelper.js'

export const updateProfileService = async (id, userPayload) => {
    try {
        let user = await db.User.findOne({
            where: {id},
            raw: true
        });
        const checkPhone = await db.User.findOne({
            where: {
              phone: userPayload.phone,
            },
          });
      
          if (checkPhone && checkPhone.id !== user.id) {
            return {
                status: false,
                message: 'Số điện thoại đã tồn tại!'
            }
          }
          if (userPayload.newPassword && userPayload.oldPassword) {
            const checkPass = await comparePassword(userPayload.oldPassword, user.password);
    
            if (!checkPass) {
                return {
                    status: false,
                    message: 'Mật khẩu cũ không đúng!'
                }
            } else {
              const hashedNewPassword = await hashPassword(
                userPayload.newPassword,
              );
              userPayload.password = hashedNewPassword;
            }
          }
          if(userPayload.avatar){
            const result = await cloudinary.uploader.upload(userPayload.avatar)
            userPayload.avatar = result.url
        }
        
        await db.User.update(userPayload, {
          where: { id }
        });

        return {
          status: true,
          message: 'Cập nhật thông tin thành công!'
        };
    } catch (error) {
        console.log(error);
    }
  }