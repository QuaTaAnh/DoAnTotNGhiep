import db from '../models/index.js'
import cloudinary from "../config/cloudinary.js";
import { comparePassword, hashPassword } from '../helpers/authHelper.js'

export const updateProfileService = async (id, updateProfile) => {
    try {
        let user = await db.User.findOne({
            where: {id},
            raw: true
        });
        const checkPhone = await db.User.findOne({
            where: {
              phone: updateProfile.phone,
            },
          });
      
          if (checkPhone && checkPhone.id !== user.id) {
            return {
                status: false,
                message: 'Số điện thoại đã tồn tại!'
            }
          }
          if (updateProfile.newPassword && updateProfile.oldPassword) {
            const checkPass = await comparePassword(updateProfile.oldPassword, user.password);
    
            if (!checkPass) {
                return {
                    status: false,
                    message: 'Mật khẩu cũ không đúng!'
                }
            } else {
              const hashedNewPassword = await hashPassword(
                updateProfile.newPassword,
              );
              updateProfile.password = hashedNewPassword;
            }
          }
          if(updateProfile.avatar){
            const result = await cloudinary.uploader.upload(updateProfile.avatar)
            updateProfile.avatar = result.public_id
        }
        
        await db.User.update(updateProfile, {
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