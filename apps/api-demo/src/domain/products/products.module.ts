import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/utils/jwt-strategy.utils';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, JwtStrategy],
  imports: [AuthModule],
})
export class ProductsModule {}
