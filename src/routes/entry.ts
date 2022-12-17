import { Router } from 'express';
import { bodyValidator } from '../helpers/bodyValidator';
import { SignInDto } from '../interfaces/dto/singInDto';
import { SignUpDto } from '../interfaces/dto/singUpDto';
import { signUpService } from '../services/entry/signUpService';
import { signInService } from '../services/entry/singInService';

export const entry = Router();

entry.post('/sign_up', async (req, res) => {
  const signUpDto = await bodyValidator(SignUpDto, req.body);

  const response = await signUpService(signUpDto);
  res.send(response);
});

entry.post('/sign_in', async (req, res) => {
  const signInDto = await bodyValidator(SignInDto, req.body);

  const response = await signInService(signInDto);
  res.send(response);
});
