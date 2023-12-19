import express from 'express';
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser';
import { Server as SocketServer } from 'socket.io'
import configs from './config/common.js';
import SocketManager from './lib/SocketSingleton.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import messagesRouter from './routes/messages.router.js';
import { getDirectoryFromUrl } from './utils/path.js';
import './config/database.js';

const currDir = getDirectoryFromUrl(import.meta.url);

const app = express();
const httpServer = app.listen(configs.port);

const io = new SocketServer(httpServer);
const sm = SocketManager.instance;

sm.initialize(io);

app.engine('handlebars', handlebars.engine());

app.set('views', currDir + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/static', express.static(currDir + '/public'));
app.use('/health', (_req, res) => res.status(200).send('OK'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/', viewsRouter);
