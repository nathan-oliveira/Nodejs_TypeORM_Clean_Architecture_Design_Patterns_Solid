export default {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [
    './src/infra/data-sources/database/*.{js,ts}'
  ],
  migrations: [
    './src/infra/database/migrations/*.{js,ts}'
  ],
  cli: {
    migrationsDir: './src/infra/database/migrations'
  }
}
