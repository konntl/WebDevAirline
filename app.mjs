import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import routes from './routes/routes.js';
import auth from './routes/auth.js';
import { fileURLToPath } from 'node:url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(__dirname + "/Public"));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, //max 1hour
  sameSite: true,
 
  }


}));
app.use(passport.authenticate('session'));



app.use('/', routes);
app.use('/', auth);


let port = '3000';
const server = app.listen(port, () => { console.log("localhost " + port) });
