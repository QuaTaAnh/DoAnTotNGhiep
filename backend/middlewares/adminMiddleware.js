import * as jwt from 'jsonwebtoken';

export const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const isAdmin = decodedToken.isAdmin;

    if (!isAdmin) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập vào tài nguyên này.' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ.' });
  }
};
