const express = require("express");
const path = require('path');
const app = express();
const port = 8000;
const hostname = '127.0.0.1';
const fs = require('fs');


// express related stuff
app.use('/static', express.static('static'))// for serving static file
app.use(express.urlencoded({ extended: true }));


// pug related stuff
app.set('view engine', 'pug')// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the views directory

// getpoints
// our pug demo endpoint
app.get('/', (req, res) => {
  const con = "this is best content on internet so use it wisely";
  const params = { 'title': 'this is pug tutorial', "contents": con };
  res.status(200).render('index', params)
})
app.post('/', (req, res) => {
  // console.log(req.body);
  let name = req.body.name;
  let age = req.body.age;
  let email = req.body.email;
  let gender = req.body.gender;
  let address = req.body.address;
  let more = req.body.more;

  let output = `the name of the client is ${name}, ${age} years old,${gender},residing at ${address}.more about him/her: ${more}`;
  fs.writeFileSync('output.txt', output);
  const params = { 'message': 'your form has been submitted successfully' };
  res.status(200).render('index.pug', params);
})

app.listen(port, () => {
  console.log(`the application started successfully on port http://${hostname}:${port} `)
});