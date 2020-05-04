const express = require('express');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

let db = require('./models')


// WRITE YOUR ROUTES HERE /////////////////////

    //throw widgets onto index
    app.get('/', (req, res) => {
    db.widget.findAll()
    .then(widget => {
        console.log(widget)
    res.render('index', {widget})
    })
})

    app.post('/', (req, res) => {
  //create in db
    db.widget.create(req.body)
    //create new post
    .then(widgets => {
        console.log('postingg')
        //send to index page
        res.redirect('/')
    })
    .catch(err => {
      console.log('oops p')
      res.send('oops 404')
    })
})

app.post('/delete', (req, res) => {
  db.widget.destroy({
    where: {id: req.body.id}
  })
  .then(widget => {
    console.log(req.body)
    res.redirect('/')
  }).catch(err => {
    console.log('error', err)
    res.send('delete is broke')
  })
} )


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(process.env.PORT || 3000)
