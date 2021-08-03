const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {res.send('hello')})

app.post('/signin', (req , res) => { signin.handleSignin(req , res , db , bcrypt)})

app.post('/register', (req , res) => { register.handleRegister(req , res , db , bcrypt)})

app.get('/profile/:id', (req , res) => {profile.handleProfileGet(req , res , db)})

app.put('/image', (req , res) => {image.handleImage(req , res ,db)})

app.post('/imageUrl', (req , res) => {image.handleApiKey(req , res)})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);