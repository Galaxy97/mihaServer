import { generateJWT } from '../jwt';
import { dbConnection } from '../../db';
import { Users } from '../../db/users';
import { RequestError } from '../../errors/RequestError';
import { SignUpDto } from '../../interfaces/dto/singUpDto';

export const signUpService = async (dataDto: SignUpDto) => {
  const existedUser = await dbConnection.getRepository(Users).findOne({
    where: {
      email: dataDto.email,
    },
  });

  if (existedUser) new RequestError(400, 'User already exist');

  const user = new Users();
  user.email = dataDto.email;
  user.password = dataDto.password;
  user.role = dataDto.role;

  const savedUser = await dbConnection.getRepository(Users).save(user);
  return generateJWT(user.role, savedUser.id);
};
