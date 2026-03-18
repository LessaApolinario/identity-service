import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { User } from 'src/core/domain/models/User';
import { AuthAdapter } from 'src/core/interfaces/adapters/AuthAdapter';
import { PrismaUserMapper } from 'src/core/mappers/prisma/PrismaUserMapper';
import { hashPassword } from 'src/core/utils/password';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaAuthRepository extends AuthAdapter {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async register(user: CreateUserRequest): Promise<User> {
    const { name, last_name, email, password } = user;

    const hashedPassword = hashPassword({ password });

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        lastName: last_name,
        email,
        passwordHash: hashedPassword,
      },
    });

    return PrismaUserMapper.toDomain(newUser);
  }

  async findById(id: string): Promise<User | null> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return foundUser ? PrismaUserMapper.toDomain(foundUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return foundUser ? PrismaUserMapper.toDomain(foundUser) : null;
  }
}
