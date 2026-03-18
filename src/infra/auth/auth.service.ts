import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequest } from 'src/core/@types/http/request/CreateUserRequest';
import { CredentialsRequest } from 'src/core/@types/http/request/CredentialsRequest';
import { AuthResponse } from 'src/core/@types/http/response/AuthResponse';
import { UserResponse } from 'src/core/@types/http/response/UserResponse';
import { AuthAdapter } from 'src/core/interfaces/adapters/AuthAdapter';
import { AuthUseCase } from 'src/core/interfaces/usecases/AuthUseCase';
import { PrismaUserMapper } from 'src/core/mappers/prisma/PrismaUserMapper';
import { comparePassword } from 'src/core/utils/password';

@Injectable()
export class AuthService extends AuthUseCase {
  constructor(
    private authAdapter: AuthAdapter,
    private jwtService: JwtService,
  ) {
    super();
  }

  private createAuthTokens(payload: { sub: string }): AuthResponse {
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }

  async login(credentials: CredentialsRequest): Promise<AuthResponse> {
    const { email, password } = credentials;
    const foundUser = await this.authAdapter.findByEmail(email);

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    const passwordMatch = comparePassword({
      password,
      hash: foundUser.passwordHash,
    });

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = {
      sub: foundUser.id,
    };

    return this.createAuthTokens(payload);
  }

  async register(user: CreateUserRequest): Promise<UserResponse> {
    const newUser = await this.authAdapter.register(user);
    return PrismaUserMapper.toUserResponse(newUser);
  }

  async refresh(token: string): Promise<AuthResponse> {
    const payload = this.jwtService.verify(token);
    return this.createAuthTokens({ sub: payload.sub });
  }

  async findById(id: string): Promise<UserResponse | null> {
    const user = await this.authAdapter.findById(id);
    return user ? PrismaUserMapper.toUserResponse(user) : null;
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    const foundUser = await this.authAdapter.findByEmail(email);
    return foundUser ? PrismaUserMapper.toUserResponse(foundUser) : null;
  }
}
