import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { AuthResponse } from 'src/core/@types/http/response/AuthResponse';
import { UserResponse } from 'src/core/@types/http/response/UserResponse';
import { User } from 'src/core/domain/models/User';

export abstract class AuthUseCase {
  abstract login(credentials: CredentialsRequest): Promise<AuthResponse>;
  abstract register(user: CreateUserRequest): Promise<UserResponse>;
  abstract refresh(token: string): Promise<AuthResponse>;
  abstract findById(id: string): Promise<UserResponse | null>;
  abstract findByEmail(email: string): Promise<UserResponse | null>;
}
