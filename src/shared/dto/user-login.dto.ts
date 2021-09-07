import { User } from '../../domain/entities/user.entity';

export type UserLoginDto = Pick<User, 'name' | 'email'>;
