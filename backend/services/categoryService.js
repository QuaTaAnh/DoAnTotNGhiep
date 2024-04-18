import db from '../models/index.js'

export const getCategoryService = async () => {
    try {
        const categories = await db.Category.findAll({
            raw: true,
        });
        
        return {
            status: true,
            message: 'Lấy dữ liệu thành công!',
            categories,
        };
    } catch (error) {
        console.log(error);
    }
}