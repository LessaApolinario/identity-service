import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { User } from 'src/core/domain/models/User';
import { AuthAdapter } from 'src/core/interfaces/adapters/AuthAdapter';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaAuthRepository extends AuthAdapter {
  constructor(private prismaService: PrismaService) {
    super();
  }

  login(credentials: CredentialsRequest): Promise<User> {
    throw new Error('Method not implemented.');
  }

  register(user: CreateUserRequest): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
