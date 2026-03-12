import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { AuthResponse } from 'src/core/@types/http/response/AuthResponse';

export abstract class AuthUseCase {
  abstract login(credentials: CredentialsRequest): Promise<AuthResponse>;
  abstract register(user: CreateUserRequest): Promise<AuthResponse>;
  abstract refresh(token: string): Promise<AuthResponse>;
}
