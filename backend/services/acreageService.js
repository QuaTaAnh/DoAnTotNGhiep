import db from '../models/index.js'

export const getAcreageService = async () => {
    try {
        const acreages = await db.Area.findAll({
            raw: true,
        });
        
        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            acreages,
        };
    } catch (error) {
        console.log(error);
    }
}