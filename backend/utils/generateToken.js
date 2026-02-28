import jwt from 'jsonwebtoken';

export const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const genereateToken = (res, userId) => {
  const token = createToken(userId);

  // Set jwt as HTTP-only cookie (for web)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
  });

  return token;
}

export default genereateToken;