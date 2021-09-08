import { UserLoginDto } from '../../shared/dto/user-login.dto';
import { UserRepository } from '../ports/user.repository';
import { BaseUseCase } from './base.usecase';

export class UserLoginRegister implements BaseUseCase<UserLoginDto, any> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(payload: UserLoginDto) {
    if (!payload.name || !payload.email) {
      throw new Error('invalid name or email');
    }
    let user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      user = await this.userRepository.create(payload);
    }
    if (user.name !== payload.name) {
      user = await this.userRepository.update(user.id!, payload);
    }
    return user;
  }
}
