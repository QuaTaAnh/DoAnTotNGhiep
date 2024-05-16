import { checkFollowService, followService, unFollowService } from "../services/followService"

export const checkFollowController = async (req, res) =>{
    try {
        const followerId  = req.user.id
        const followingId = parseInt(req.params.userId)
        const follow = await checkFollowService(followerId, followingId)
        return res.status(200).json(follow)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const followController = async (req, res) =>{
    try {
        const followerId  = req.user.id
        const followingId = parseInt(req.params.userId)
        const follow = await followService(followerId, followingId)
        return res.status(200).json(follow)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}

export const unFollowController = async (req, res) =>{
    try {
        const followerId  = req.user.id
        const followingId = parseInt(req.params.userId)
        const unFollow = await unFollowService(followerId, followingId)
        return res.status(200).json(unFollow)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}