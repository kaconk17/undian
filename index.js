const express = require('express')
const app = express()
const port = 3000
const path = require('path');
app.set('view engine', 'ejs')
//const bootstrap = require('bootstrap')

app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

app.get('/', (req, res) => {
  res.render('login');
})

app.get('/main', (req, res) => {
  res.render('main');
})
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})