import db from '../models/index.js'

export const getPriceService = async () => {
    try {
        const prices = await db.Price.findAll({
            raw: true,
        });
        
        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            prices,
        };
    } catch (error) {
        console.log(error);
    }
}