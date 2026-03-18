import { User as PrismaUser } from '@prisma/client';
import { UserResponse } from 'src/core/@types/http/response/UserResponse';
import { User } from 'src/core/domain/models/User';

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      passwordHash: user.passwordHash,
    };
  }

  static toUserResponse(user: PrismaUser): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    };
  }
}
