import jwt from 'jsonwebtoken'
const authMiddleware = (req, res, next) => {
    let accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) return res.status(401).json({
        status: 1,
        message: 'Missing access token'
    })

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
          status: 1,
          message: 'Access token expired'
        })
        req.user = user
        next()
    })
}

export default authMiddleware