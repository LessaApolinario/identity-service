import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { AuthResponse } from 'src/core/@types/http/response/AuthResponse';
import { AuthAdapter } from 'src/core/interfaces/adapters/AuthAdapter';
import { AuthUseCase } from 'src/core/interfaces/usecases/AuthUseCase';

@Injectable()
export class AuthService extends AuthUseCase {
  constructor(private authAdapter: AuthAdapter) {
    super();
  }

  login(credentials: CredentialsRequest): Promise<AuthResponse> {
    return this.authAdapter.login(credentials);
  }

  register(user: CreateUserRequest): Promise<AuthResponse> {
    return this.authAdapter.register(user);
  }

  refresh(token: string): Promise<AuthResponse> {
    return this.authAdapter.refresh(token);
  }
}
