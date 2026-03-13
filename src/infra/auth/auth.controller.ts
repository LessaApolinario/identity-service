import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthUseCase } from 'src/core/interfaces/usecases/AuthUseCase';
import { ZodValidationPipe } from 'src/infra/pipes/ZodValidationPipe';
import { z } from 'zod';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public';

const loginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginBodySchema = z.infer<typeof loginBodySchema>;

const registerBodySchema = z.object({
  name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
});

type RegisterBodySchema = z.infer<typeof registerBodySchema>;

const refreshBodySchema = z.object({
  token: z.string(),
});

type RefreshBodySchema = z.infer<typeof refreshBodySchema>;

@Public()
@Controller('/auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @Post('/login')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(loginBodySchema))
  async login(@Body() body: LoginBodySchema) {
    return await this.authUseCase.login(body);
  }

  @Post('/register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  async register(@Body() body: RegisterBodySchema) {
    const wasRegistered = await this.authUseCase.register({
      name: body.name,
      lastName: body.last_name,
      email: body.email,
      password: body.password,
    });

    return wasRegistered ? 'User registered successfully.' : '';
  }

  @Post('/refresh')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async refresh(@Body() body: RefreshBodySchema) {
    const { token } = body;
    return await this.authUseCase.refresh(token);
  }

  @Get('/profile/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async profile(@Param('id') id: string) {
    return await this.authUseCase.findById(id);
  }
}
