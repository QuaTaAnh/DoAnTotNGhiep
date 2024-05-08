import db from '../models/index.js'

export const checkFollowService = async(followerId, followingId) =>{
    try {
        const checkFollow = await db.Follow.findOne({
            where: {
                followerId: followerId,
                followingId: followingId
            }
        })
        if(checkFollow){
            return {
                status: true,
                message: 'Bạn đã theo dõi người này!',
            };
        } else{
            return {
                status: false,
                message: 'Bạn chưa theo dõi người này!',
            };
        }
    } catch (error) {
        console.log(error);
    }
}


export const followService = async(followerId, followingId) =>{
    try {
        const checkFollow = await db.Follow.findOne({
            where: {
                followerId: followerId,
                followingId: followingId
            }
        })
        if(checkFollow){
            return {
                status: false,
                message: 'Bạn đã theo dõi người này!',
            };
        } else{
            await db.Follow.create({
                followerId: followerId,
                followingId: followingId
            })
            return {
                status: true,
                message: 'Theo dõi thành công!',
            };
        }
    } catch (error) {
        console.log(error);
    }
}

export const unFollowService = async(followerId, followingId) =>{
    try {
        await db.Follow.destroy({
            where: {
                followerId: followerId,
                followingId: followingId
            }
        })
        return {
            status: true,
            message: 'Bỏ theo dõi thành công!',
        };
    } catch (error) {
        console.log(error);
    }
}
