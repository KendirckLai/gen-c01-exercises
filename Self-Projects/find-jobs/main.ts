import pg from 'pg';
import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import socketIO from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import grant from 'grant-express';

dotenv.config();

export const client = new pg.Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: "localhost",
  port: 5432
});

client.connect();

const app = express();
const server = new http.Server(app);
export const io = socketIO(server);

app.use(expressSession({
  secret: 'Tecky Academy Job Portal',
  resave: true,
  saveUninitialized: true
}));

app.use(grant({
  "defaults": {
    "protocol": "http",
    "host": "localhost:8080",
    "transport": "session",
    "state": true,
  },
  "gitlab": {
    "key": process.env.GITLAB_APPLICATION_ID || "",
    "secret": process.env.GITLAB_SECRET || "",
    "scope": [],
    "callback": "/login/gitlab/"
  },
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/protected/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})
export const upload = multer({ storage });

import { jobRoutes } from './jobRoutes';
import { userRoutes } from './userRoutes';
import { isAdmin, isGraduate, isLoggedIn } from './guards';
import { studentRoutes } from './studentRoutes';
import { mailgunRoutes } from './mailgunRoutes';
import { applicationRoutes } from './applicationRoutes';

app.use('/jobs', jobRoutes);
app.use('/', userRoutes);
app.use('/', studentRoutes)
app.use('/', mailgunRoutes);
app.use('/', applicationRoutes)

app.use(express.static('public'));
app.use('/graduate', isGraduate, express.static('protected/graduate'));
app.use('/admin', isAdmin, express.static('protected/admin'));
app.use(isLoggedIn, express.static('protected'));

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'public/404.html'));
})

server.listen(8080, function () {
  console.log("Express listening at http://localhost:8080");
})

io.on('connection', function (socket) {
  console.log(socket);
});
