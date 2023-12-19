import mongoose from 'mongoose';
import configs from './common.js';

const connectionString =
  `mongodb+srv://${configs.mongoose.user}:${configs.mongoose.pass}@` +
  `${configs.mongoose.host}/${configs.mongoose.db}`

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

mongoose.connect(connectionString);

export default mongoose.connection;
