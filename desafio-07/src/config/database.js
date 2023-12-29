import mongoose from 'mongoose';
import configs from './common.js';

const createConnectionString = ({ user, pass, host, db }) => {
  return `mongodb+srv://${user}:${pass}@${host}/${db}`;
};

if (configs.mongoose.debug) {
  mongoose.set('debug', true);
}

mongoose.connection.once('connecting', (error) => {
  console.log('MongoDB is connecting...');
});

mongoose.connection.once('connected', (error) => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (error) => {
  console.log('MongoDB failed to connect: ' + error);
});

mongoose.connect(createConnectionString(configs.mongoose));

export default mongoose.connection;
