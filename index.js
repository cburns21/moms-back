const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const parser = require('body-parser')
const dotenv = require('dotenv').config()
const knex = require('./knex')
app.use(cors())
app.use(parser.json())



app.get('/', function(req, res, next){
     knex('reminders')
     .then((reminder) => {
         res.send("Here are your reminders")
     })
     .catch((err) => {
         next(err)
     })
})

app.get('/reminders/:id', (req, res, next) => {
    knex.select('name').from('reminders').where('id',req.params.id)
    .then((reminder) => {
      res.send(reminder);
    })
    .catch((err) => {
      next(err);
    });
  })

  app.patch('/reminders/:id', (req, res, next) => {
    knex('reminders')
    .where({'id' : req.params.id})
    .update({name :"Sweep"})
    .returning('*')
    .then((reminder) => {
      res.send("Updated reminder");
    })
    .catch((err) => {
      next(err);
    });
  })

app.post('/reminders', (req, res, next) => {
    knex('reminders').insert(req.body)
    .then((reminders) => {
      res.send("Added reminder");
    })
    .catch((err) => {
      next(err);
    });
})

app.delete('/reminders/:id', (req, res, next) => {
    knex('reminders')
    .where({ 'id' : req.params.id })
    .del()
    .then((reminder) => {
        res.send("Delete Successful");
    })
    .catch((err) => {
        next(err);
    });
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, function() {
     console.log(`listening on port ${port}`)
})
