import { addMessageService, getMessageService } from "../services/messageService"

export const addMessageController = async (req, res) => {
    try {
        const {senderId, content, roomId} = req.body
        const result = await addMessageService(senderId, content, roomId)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const getMessageController = async (req, res) => {
    try {
        const chatId = parseInt(req.params.chatId)
        const result = await getMessageService(chatId)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

