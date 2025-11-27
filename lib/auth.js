import jwt from 'jsonwebtoken';

export function authenticateToken(token) {
  if (!token) throw new Error('Unauthorized: No token provided');

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Unauthorized: Invalid or expired token');
  }
}
