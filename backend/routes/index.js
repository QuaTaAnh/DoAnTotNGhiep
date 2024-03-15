import authRoutes from './authRoute.js'

const initRoute = (app) =>{
    app.use('/api/v1/auth', authRoutes)

    return app.use('/', (req, res) =>{
        res.send('API tìm phòng trọ')
    })
}

export default initRoute