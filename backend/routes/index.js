import authRoutes from './authRoute.js'
import insertRoutes from './insert.js'
import postRoutes from './postRoute.js'

const initRoute = (app) =>{
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/insert', insertRoutes)
    app.use('/api/v1/post', postRoutes)

    return app.use('/', (req, res) =>{
        res.send('API tìm phòng trọ')
    })
}

export default initRoute