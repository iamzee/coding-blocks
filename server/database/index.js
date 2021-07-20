const Sequelize = require('sequelize');

let sequelize = '';

if (process.env.NODE_ENV == 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	});
} else {
	sequelize = new Sequelize(process.env.DATABASE_URL);
}

// const init = async () => {
// 	try {
// 		await sequelize.authenticate();
// 		console.log('Connection has been established successfully.');
// 		module.exports = sequelize;
// 	} catch (error) {
// 		console.log('Unable to connect to the database', error);
// 	}
// };

// init();

module.exports = sequelize;
