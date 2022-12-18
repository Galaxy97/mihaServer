import { UserRoles } from './../db/users';
import { sign } from 'jsonwebtoken';

export const generateJWT = (role: UserRoles, userId: number) => {
  return {
    token: sign({ role, userId }, 'superSecret', {
      expiresIn: '1m',
    }),
  };
};
