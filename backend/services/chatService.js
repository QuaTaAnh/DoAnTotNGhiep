import { Op } from "sequelize";
import db from "../models/index.js";

export const createChatService = async (senderId, receiverId) => {
  try {
    const memberIds = [senderId, receiverId].sort();
    const membersJSON = JSON.stringify(memberIds);

    const rooms = await db.Room.findAll();
    for (const room of rooms) {
      const roomMembers = JSON.parse(room.members).sort();
      if (JSON.stringify(roomMembers) === membersJSON) {
        return {
          status: true,
          message: "Phòng đã tồn tại!",
          data: room,
        };
      }
    }
    const newRoom = await db.Room.create({
        members: membersJSON
    });
    if (newRoom) {
        return {
            status: true,
            message: 'Tạo phòng thành công!',
            data: newRoom
        };
    }
  } catch (error) {
    console.log(error);
  }
};

export const userChatsService = async (userId) => {
  try {
    const chat = await db.Room.findAll({
      where: {
        [Op.or]: [
          {
            members: {
              [Op.like]: `%${userId}%`,
            },
          },
        ],
      },
    });
    if (chat.length > 0) {
      return {
        status: true,
        message: "Lấy dữ liệu thành công!",
        data: chat,
      };
    } else {
      return {
        status: false,
        message: "Không tìm thấy dữ liệu!",
      };
    }
  } catch (error) {
    console.log(error);
  }
};
