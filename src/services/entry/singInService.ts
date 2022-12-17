import { dbConnection } from '../../db';
import { Users } from '../../db/users';
import { RequestError } from '../../errors/RequestError';
import { SignInDto } from '../../interfaces/dto/singInDto';
import { generateJWT } from '../jwt';

export const signInService = async (dataDto: SignInDto) => {
  const user = await dbConnection.getRepository(Users).findOne({
    where: {
      email: dataDto.email,
    },
  });

  if (!user) throw new RequestError(400, 'User in not exist');

  if (user.password !== dataDto.password)
    throw new RequestError(401, 'password is not correct');

  return generateJWT(user.role, user.id);
};
