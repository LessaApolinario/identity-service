import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { User } from 'src/core/domain/models/User';

export abstract class AuthAdapter {
  abstract login(credentials: CredentialsRequest): Promise<User>;
  abstract register(user: CreateUserRequest): Promise<boolean>;
}
