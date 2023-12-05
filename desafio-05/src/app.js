import express from 'express';
import handlebars from 'express-handlebars'
import { Server as SocketServer } from 'socket.io'
import { getDirectoryFromUrl } from './utils/path.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import SocketManager from './lib/SocketManager.js';

const app = express();
const httpServer = app.listen(8080);
const io = new SocketServer(httpServer);
const sm = SocketManager.instance;
const currDir = getDirectoryFromUrl(import.meta.url);

sm.initialize(io);

app.engine('handlebars', handlebars.engine());

app.set('views', currDir + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(currDir + '/public'));

app.use('/health', (_req, res) => res.send('OK'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);