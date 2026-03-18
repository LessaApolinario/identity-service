import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { User } from 'src/core/domain/models/User';

export abstract class AuthAdapter {
  abstract register(user: CreateUserRequest): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
