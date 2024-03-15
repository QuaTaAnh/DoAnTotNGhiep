import Sequelize from 'sequelize';

const sequelize = new Sequelize('connectHousingDB', 'root', '17102002', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDB = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connect successfully.');
      } catch (error) {
        console.error('Error: ', error);
      }
}

export default connectDB