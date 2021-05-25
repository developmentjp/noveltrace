import express, { Application } from 'express';
import exphbs from 'express-handlebars';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './server/routes/index';
import novel from './server/routes/novel';
import connectDB from './config/connectDB';
// auth
import passport from 'passport';
import methodOverride from 'method-override';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import auth from './server/routes/auth';
import mysql from 'mysql2';
import passportConfig from './config/passport';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Passport config (pass in the (passport) as an argument to the function module)
passportConfig(passport);
MySQLStore(session);

// Parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Logging middleware
app.use(morgan('tiny'));

// Method override
app.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			let method = req.body._method;
			delete req.body._method;
			return method;
		}
	})
);

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

// Sessions
const sessionStore = new MySQLStore({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: sessionStore,
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//  Set Global Variable
app.use(function (req: any, res, next) {
	res.locals.user = req.user || null;
	next();
});

// Use Routes
app.use('/', routes);
app.use('/auth', auth);
app.use('/dashboard', novel);

app.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`));
