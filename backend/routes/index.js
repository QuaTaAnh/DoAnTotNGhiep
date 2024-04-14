import authRoutes from './authRoute.js'
import insertRoutes from './insert.js'

const initRoute = (app) =>{
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/insert', insertRoutes)

    return app.use('/', (req, res) =>{
        res.send('API tìm phòng trọ')
    })
}

export default initRoute