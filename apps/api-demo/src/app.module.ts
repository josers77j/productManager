import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './domain/users/users.module';
import { ProductsModule } from './domain/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { routes } from './routes/routes';
import { AuthModule } from './domain/auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { RolesModule } from './domain/roles/roles.module';
import { PermissionModule } from './domain/permission/permission.module';
import { ResourceModule } from './domain/resource/resource.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client-demo/dist')
    }),
    UsersModule,
    ProductsModule,
    RouterModule.register(routes),
    AuthModule,
    RolesModule,
    PermissionModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
