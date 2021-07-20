const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRESQL_URI);

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
