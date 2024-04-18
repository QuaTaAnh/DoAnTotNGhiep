import { createPricesAndAreas, insertService } from '../services/insert.js'


export const insertController = async (req, res) =>{
    try {
        const response = await insertService()
        return res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false, 
            message: 'Co loi xay ra!', 
            error
        })
    }
}
