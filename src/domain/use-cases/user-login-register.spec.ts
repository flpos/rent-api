import { UserMemoryRepository } from '../../data/memory-cached/user-memory-cached.repository';
import { UserLoginDto } from '../../shared/dto/user-login.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../ports/user.repository';
import { UserLoginRegister } from './user-login-register.usecase';

let mockRepo: UserRepository;

let useCase: UserLoginRegister;

beforeEach(() => {
  mockRepo = new UserMemoryRepository();
});

describe('user-login-register-usecase', () => {
  it("calls create fn if user doesn't exists", async () => {
    jest.spyOn(mockRepo, 'create');

    useCase = new UserLoginRegister(mockRepo);
    const payload: UserLoginDto = {
      email: 'test@abc.com',
      name: 'test',
    };
    const result = await useCase.execute(payload);

    expect(mockRepo.create).toBeCalledWith(payload);
    expect(result!.id).toBeDefined();
  });

  it('updates the database if the name of a user change (same email)', async () => {
    jest.spyOn(mockRepo, 'update');

    useCase = new UserLoginRegister(mockRepo);
    const payload: UserLoginDto = {
      email: 'test1@abc.com',
      name: 'new name',
    };

    const oldUser = await mockRepo.findByEmail(payload.email);

    const updatedUser = await useCase.execute(payload);

    expect(updatedUser!.id).toEqual(oldUser!.id);
    expect(updatedUser!.name).toEqual(payload.name);
  });

  it('throws error if name or email is missing', async () => {
    useCase = new UserLoginRegister(mockRepo);
    expect(useCase.execute({ email: 'test' } as User)).rejects.toThrow(
      'invalid name or email'
    );
    expect(useCase.execute({ name: 'test' } as User)).rejects.toThrow(
      'invalid name or email'
    );
  });
});
