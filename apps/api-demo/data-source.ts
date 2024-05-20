import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'user_crud',
  password: 'root',
  database: 'db_crud',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  driver: 'mysql2',
  extra: {
    allowPublicKeyRetrieval: true,
    insecureAuth: true
  }
});


