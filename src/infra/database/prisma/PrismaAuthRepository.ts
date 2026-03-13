import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
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

  async login(credentials: CredentialsRequest): Promise<User> {
    const { email, password } = credentials;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const passwordMatch = bcrypt.compareSync(password, user.passwordHash);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }

  async register(user: CreateUserRequest): Promise<boolean> {
    const { name, lastName, email, password } = user;

    const foundUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      throw new ConflictException('User already exists.');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        lastName,
        email,
        passwordHash: hashedPassword,
      },
    });

    return !!newUser?.id;
  }
}
