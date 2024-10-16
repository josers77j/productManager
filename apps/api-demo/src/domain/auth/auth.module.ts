import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt-strategy.utils';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DemoMiddleware } from 'src/middleware/demo.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGuard],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '2y' },
      }),
    }),
  ],
  exports: [AuthModule, AuthGuard, JwtModule],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoMiddleware).forRoutes({
      method: RequestMethod.GET,
      path: 'profile',
    });
  }
}
