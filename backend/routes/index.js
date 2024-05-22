import authRoutes from './authRoute.js'
import userRoutes from './userRoute.js'
import insertRoutes from './insert.js'
import postRoutes from './postRoute.js'
import categoryRoute from './categoryRoute.js'
import priceRoute from './priceRoute.js'
import acreageRoute from './acreageRoute.js'
import followRoute from './followRoute.js'
import commentRoute from './commentRoute.js'
import saveRoute from './saveRoute.js'
import chatRoute from './chatRoute.js'
import messageRoute from './messageRoute.js'

const initRoute = (app) =>{
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/user', userRoutes)
    app.use('/api/v1/insert', insertRoutes)
    app.use('/api/v1/post', postRoutes)
    app.use('/api/v1/category', categoryRoute)
    app.use('/api/v1/price', priceRoute)
    app.use('/api/v1/acreage', acreageRoute)
    app.use('/api/v1/follow', followRoute)
    app.use('/api/v1/comment', commentRoute)
    app.use('/api/v1/save', saveRoute)
    app.use('/api/v1/chat', chatRoute)
    app.use('/api/v1/message', messageRoute)

    return app.use('/', (req, res) =>{
        res.send('API tìm phòng trọ')
    })
}

export default initRoute