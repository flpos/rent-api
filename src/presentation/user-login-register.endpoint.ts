import { Application } from 'express';
import { UserRepository } from '../domain/ports/user.repository';
import { UserLoginRegister } from '../domain/use-cases/user-login-register.usecase';

export class UserLoginRegisterEndPoint {
  register(app: Application, userRepository: UserRepository) {
    app.post('/login', async (req, res) => {
      const payload = req.body;
      const useCase = new UserLoginRegister(userRepository);

      try {
        const result = await useCase.execute(payload);
        res.json(result);
      } catch (err) {
        res.status(500).send((err as Error).message);
      }
    });
  }
}
