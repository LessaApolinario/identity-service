import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { AuthResponse } from 'src/core/@types/http/response/AuthResponse';
import { AuthAdapter } from 'src/core/interfaces/adapters/AuthAdapter';
import { AuthUseCase } from 'src/core/interfaces/usecases/AuthUseCase';

@Injectable()
export class AuthService extends AuthUseCase {
  constructor(
    private authAdapter: AuthAdapter,
    private jwtService: JwtService,
  ) {
    super();
  }

  login(credentials: CredentialsRequest): Promise<AuthResponse> {
    throw new Error('Method not implemented.');
  }

  register(user: CreateUserRequest): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  refresh(token: string): Promise<AuthResponse> {
    throw new Error('Method not implemented.');
  }
}
