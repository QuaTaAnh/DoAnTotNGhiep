import {
  createChatService,
  userChatsService,
} from "../services/chatService";

export const createChatController = async (req, res) => {
  try {
    const senderId = parseInt(req.user.id);
    const receiverId = parseInt(req.params.receiverId);
    const result = await createChatService(senderId, receiverId);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const userChatsController = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userChatsService(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};