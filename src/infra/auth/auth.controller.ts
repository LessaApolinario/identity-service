import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
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

const loginRequestBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginRequestBody = z.infer<typeof loginRequestBodySchema>;

const registerUserRequestBodySchema = z.object({
  name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
});

type RegisterUserRequestBody = z.infer<typeof registerUserRequestBodySchema>;

const refreshAuthTokenRequestBodySchema = z.object({
  token: z.string(),
});

type RefreshAuthTokenRequestBody = z.infer<
  typeof refreshAuthTokenRequestBodySchema
>;

@Public()
@Controller('/auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @Post('/login')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(loginRequestBodySchema))
  async login(@Body() body: LoginRequestBody) {
    return await this.authUseCase.login(body);
  }

  @Post('/register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerUserRequestBodySchema))
  async registerUser(@Body() data: RegisterUserRequestBody) {
    const foundUser = await this.authUseCase.findByEmail(data.email);

    if (foundUser) {
      throw new ConflictException('User already exists.');
    }

    return await this.authUseCase.register(data);
  }

  @Post('/refresh')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(refreshAuthTokenRequestBodySchema))
  async refreshAuthToken(@Body() body: RefreshAuthTokenRequestBody) {
    const { token } = body;
    return await this.authUseCase.refresh(token);
  }

  @Get('/profile/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findUserProfileById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('id is required.');
    }

    const foundUser = await this.authUseCase.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return foundUser;
  }
}
