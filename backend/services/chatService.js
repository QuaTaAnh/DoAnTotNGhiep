import { Op } from 'sequelize';
import db from '../models/index.js'

export const createChatService = async (senderId, receiverId) => {
    try {
        const memberIds = [senderId, receiverId];
        const membersJSON = JSON.stringify(memberIds);
        const newRoom = await db.Room.create({
            members: membersJSON
        });
        if(newRoom){
            return {
                status: true,
                message: 'Tạo phòng thành công!',
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
                            [Op.like]: `%${userId}%`
                        }
                    }
                ]
            }
        })
        if(chat.length > 0){
            return {
                status: true,
                message: 'Lấy dữ liệu thành công!',
                data: chat
            };
        } else {
            return {
                status: false,
                message: 'Không tìm thấy dữ liệu!',
            };
        }
    } catch (error) {
        console.log(error);
    }
};

export const findChatService = async (firstId, secondId) => {
    try {
        const chats = await db.Room.findAll({
            raw: true
        });
        if (!chats || chats.length === 0) {
            return {
                status: false,
                message: 'Không tìm thấy phòng nào.',
                data: null
            };
        }

        for (const chat of chats) {
            const members = JSON.parse(chat.members.replace(/\\/g, '')).map(member => parseInt(member));
            console.log(members, typeof firstId, secondId);
            if (members.includes(firstId) && members.includes(secondId)) {
                return {
                    status: true,
                    message: 'Lấy dữ liệu thành công!',
                    data: chat
                };
            }
        }
        return {
            status: false,
            message: 'Không tìm thấy phòng chứa cả hai thành viên.',
            data: null
        };
    } catch (error) {
        console.log(error);
    }
};

  