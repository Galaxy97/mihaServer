import { verify } from 'jsonwebtoken';
import { UserRoles } from './db/users';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) next(new Error('wrong token'));
  const { userId, role } = verify(token, 'superSecret') as {
    userId: number;
    role: UserRoles;
  };

  if (!userId) next(new Error('wrong token'));
  req.userId = userId as number;
  req.userRole = role as UserRoles;

  next();
};
