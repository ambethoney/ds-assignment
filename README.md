# Do Something Code Challenge

This web app consists of a simple Node.js server with a React front end.

Based off of [Create React App](https://github.com/facebookincubator/create-react-app), this project uses one package.json and can be run locally with a few commands. It is hosted on Heroku. I am also using [Mail Jet](https://app.mailjet.com/signup) for easy email sending.

To see the built app, please [click here](https://dsct.herokuapp.com/).
View our public email inbox [here](https://www.mailinator.com/v2/inbox.jsp?zone=public&query=dscodetest#).

## Local Development

### Add environment variables
Copy the .env.example file and add in your own ENV variables

`cp .env.example .env`


```
CLOUDAMQP_URL=<your CloudAMQP URL>
ROUTING_KEY=<likely the queue you will send messages to, though this does depend on your project>
MAILJET_PUB_KEY=<Access from [here](https://app.mailjet.com/signup)>
MAILJET_SECRET_KEY=<Access from [here](https://app.mailjet.com/signup)>
```

### Run the API Server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

## Deployment

### Heroku

1. Create a new Heroku app.

2. Install Heroku CLI

In terminal:

```bash
 heroku login
 ```

3. Create a new Git repository

In terminal:

```bash
  cd my-project/
  git init
  heroku git:remote -a <PROJECT NAME>
  ```

4. Add ENV variables in Dashboard
  `Settings > Reveal Config Vars`

5. Deploy Application

In terminal:

```bash
  git add .
  git commit -am "make it better"
  git push heroku master
  ```
