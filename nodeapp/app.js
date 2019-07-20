const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mailer = require('@sendgrid/mail');
const Email = require('./models/email_schema');

//Inits
const app = express();
mailer.setApiKey(process.env.SENDGRID_API_KEY);
mongoose.connect("mongodb://localhost/nodeapp-db")
  .then(() => {
    console.log("Connected to db:)");
  })
  .catch((err) => {
    console.log(err);
  });

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

//POST Requests
app.post("/subscribe/", (req, res, next) => {
  const msg = new Email({
    to: 'nishantsatishkumar@gmail.com',
    from: req.body.email,
    subject: 'Its night today',
    text: 'Its night today',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  });

  mailer.send(msg).then(resp => {
    msg.save()
      .then((savedData) => {
        console.log(savedData.from);
        res.status(201).json({
          message: savedData.from
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "DB Error"
        });
      });

  })
  .catch(err => {
    msg_res = 'Error in SendGrid'
  });
});


module.exports = app;
