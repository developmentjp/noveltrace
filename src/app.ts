import express, { Application } from 'express';
import exphbs from 'express-handlebars';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './server/routes/index';
import novel from './server/routes/novel';
import connectDB from './config/connectDB';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Logging middleware
app.use(morgan('tiny'));

// Static Files
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

// Templating Engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

const pool = connectDB();
pool.getConnection((err: Error, connection: any) => {
	if (err) throw err;
	console.log('Connected to as ID ' + connection.threadId);
});

// Use Routes
app.use('/', routes);
app.use('/dashboard', novel);

app.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`));
