module.exports = {
	"type": "mysql",
	"host": process.env.CLEARDB_HOST,
	"port": 3306,
	"username": process.env.CLEARDB_USER,
	"password": process.env.CLEARDB_PASS,
	"database": process.env.CLEARDB_DB,
	"entities": [
		"./dist/**/*.entity.js"
	],
	"migrations": [
		"./dist/migrations/**/*.js"
	],
	"cli": {
		"migrationsDir": "./dist/migrations",
		"subscribersDir": "./dist/subscribers"
	},
	"synchronize": false
}