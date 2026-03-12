import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  private createAuthTokens(payload: { sub: string }) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  async login(credentials: CredentialsRequest): Promise<AuthResponse> {
    const foundUser = await this.authAdapter.login(credentials);

    const payload = {
      sub: foundUser.id,
    };

    return this.createAuthTokens(payload);
  }

  async register(user: CreateUserRequest): Promise<boolean> {
    return await this.authAdapter.register(user);
  }

  async refresh(token: string): Promise<AuthResponse> {
    const isTokenValid = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid token.');
    }

    const payload = this.jwtService.decode(token);

    const currentTimeInMilliseconds = Date.now() / 1000;
    const isTokenExpired = payload.exp < currentTimeInMilliseconds;

    if (isTokenExpired) {
      throw new UnauthorizedException('Token expired.');
    }

    return this.createAuthTokens(payload);
  }
}
