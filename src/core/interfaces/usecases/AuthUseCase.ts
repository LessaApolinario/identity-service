import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { AuthResponse } from 'src/core/@types/http/response/AuthResponse';
import { User } from 'src/core/domain/models/User';

export abstract class AuthUseCase {
  abstract login(credentials: CredentialsRequest): Promise<AuthResponse>;
  abstract register(user: CreateUserRequest): Promise<boolean>;
  abstract refresh(token: string): Promise<AuthResponse>;
}
