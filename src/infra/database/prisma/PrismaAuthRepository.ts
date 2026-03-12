import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { AuthResponse } from 'src/core/@types/http/response/AuthResponse';
import { AuthAdapter } from 'src/core/interfaces/adapters/AuthAdapter';

@Injectable()
export class PrismaAuthRepository extends AuthAdapter {
  login(credentials: CredentialsRequest): Promise<AuthResponse> {
    throw new Error('Method not implemented.');
  }

  register(user: CreateUserRequest): Promise<AuthResponse> {
    throw new Error('Method not implemented.');
  }

  refresh(token: string): Promise<AuthResponse> {
    throw new Error('Method not implemented.');
  }
}
