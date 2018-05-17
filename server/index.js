require('dotenv').config();

// Dependencies to run our app
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

// Our Message service
const MessageBroker = require('./services/MessageBroker');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Start our messageBroker instance, publish our form data
app.post('/users', (req, res) => {
  if (res.status >= 200 && res.status < 300) {
    const formData = JSON.stringify(req.body);
    const message = new MessageBroker(process.env.ROUTING_KEY);

    message.start()
      .then(() => message.publish('', process.env.ROUTING_KEY, formData));
  } else {
    const error = new Error(res.statusText || res.status);
    console.log(error);
  }
});

app.use(express.static('./build'));

app.listen(port, () => console.log(`Listening on port ${port}`));
