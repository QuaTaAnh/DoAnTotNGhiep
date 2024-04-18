import { getPriceService } from "../services/priceService.js"

export const getPriceController = async (req, res) =>{
    try {
       const price = await getPriceService()
       return res.status(200).json(price)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Có lỗi xảy ra!', 
            error
        })
    }
}