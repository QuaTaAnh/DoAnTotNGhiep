import authRoutes from './authRoute.js'
import userRoutes from './userRoute.js'
import insertRoutes from './insert.js'
import postRoutes from './postRoute.js'
import categoryRoute from './categoryRoute.js'
import priceRoute from './priceRoute.js'
import acreageRoute from './acreageRoute.js'

const initRoute = (app) =>{
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/user', userRoutes)
    app.use('/api/v1/insert', insertRoutes)
    app.use('/api/v1/post', postRoutes)
    app.use('/api/v1/category', categoryRoute)
    app.use('/api/v1/price', priceRoute)
    app.use('/api/v1/acreage', acreageRoute)

    return app.use('/', (req, res) =>{
        res.send('API tìm phòng trọ')
    })
}

export default initRoute