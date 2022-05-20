module.exports = {
  type: 'mysql',
	host: process.env.DB_HOST,
	port: 3306,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/migrations/**/*.js'],
	cli: {
    migrationsDir: './dist/migrations',
    subscribersDir: './dist/subscribers',
	},
  synchronize: false,
}