import { Module } from '@nestjs/common';
import { AuthAdapter } from 'src/core/interfaces/adapters/AuthAdapter';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAuthRepository } from './prisma/PrismaAuthRepository';

@Module({
  providers: [
    PrismaService,
    PrismaAuthRepository,
    {
      provide: AuthAdapter,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [PrismaService, AuthAdapter, PrismaAuthRepository],
})
export class DatabaseModule {}
