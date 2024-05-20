import { Routes } from '@nestjs/core';
import { ProductsModule } from 'src/domain/products/products.module';
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

];

export { routes };