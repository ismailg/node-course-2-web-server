const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n',(err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});


app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.get('/', (req,res) => {
  // res.send('<h1>My First web server, go Ismail!!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home page',
    homeMessage: 'Welcome to my website stranger!'
  });
});

app.get('/About', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'

  });
});

app.get('/bad', (req,res) => {
  res.send({
    type : "Error",
    errorMessage : " This is an undefined folder"
  });
});


app.listen(3000,() => {
  console.log('Server is up on port 3000');
});
