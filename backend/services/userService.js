import db from '../models/index.js'
import cloudinary from "../config/cloudinary.js";
import { col, fn } from 'sequelize';
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

export const getAllUserService = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
      const users = await db.User.findAll({
        where: {
          isAdmin: 0
        },
        attributes: ['id', 'name', 'phone', 'zalo', 'avatar', 'createdAt', 'updatedAt'],
        order: [['id', 'asc']],
        limit: pageSize,
        offset: offset,
      })
      const totalUsers = await db.User.count();
      const totalPages = Math.ceil(totalUsers / pageSize)

      return {
        status: true,
        message: 'Lấy dữ liệu thành công!',
        users,
        totalPages,
        totalUsers,
        currentPage: page
      };
  } catch (error) {
      console.log(error);
  }
}

export const statistUserRegisterService = async () => {
  try {
      const counts = await db.User.findAll({
        attributes: [
          [fn('YEAR', fn('DATE', col('createdAt'))), 'year'],
          [fn('MONTH', fn('DATE', col('createdAt'))), 'month'],
          [fn('COUNT', '*'), 'count']
        ],
        group: ['year', 'month']
      });
      return {
        status: true,
        message: 'Lấy dữ liệu thành công!',
        counts
      };
  } catch (error) {
      console.log(error);
  }
}

  