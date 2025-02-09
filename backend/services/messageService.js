import db from '../models/index.js'

export const addMessageService = async (senderId, content, roomId) => {
    try {
        const newMessage = await db.Message.create({
            senderId: senderId,
            roomId: roomId,
            content: content,
            read: false
        });
        if(newMessage){
            return {
                status: true,
                message: 'Nhắn tin thành công!',
                data: newMessage
            };
        }
    } catch (error) {
        console.log(error);
    }
};

export const getMessageService = async (chatId) => {
    try {
        const result = await db.Message.findAll({
            where: {
                roomId: chatId
            }
        });
        if(result.length > 0){
            return {
                status: true,
                message: 'Lấy dữ liệu thành công!',
                data: result
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
