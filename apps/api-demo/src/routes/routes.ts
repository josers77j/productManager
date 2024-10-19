import { Routes } from '@nestjs/core';
import { AuthModule } from 'src/domain/auth/auth.module';
import { PermissionModule } from 'src/domain/permission/permission.module';
import { ProductsModule } from 'src/domain/products/products.module';
import { RolesModule } from 'src/domain/roles/roles.module';
import { UsersModule } from 'src/domain/users/users.module';


/* const adminRoutesLines: Routes = [
    {
        path: 'user',
        module: UsersModule,
    },
];
 */
/* const userRoutesLines: Routes = [
    {
        path: 'product',
        module: ProductsModule,
    },
]; */

const routes: Routes = [
    {
        path: 'user',
        module: UsersModule,
    },
    {
        path: 'product',
        module: ProductsModule,
    },
    {
        path : 'auth',
        module : AuthModule
    },
    {
        path : 'role',
        module : RolesModule
    },
    {
        path : 'permission',
        module : PermissionModule
    }
];

export { routes };
