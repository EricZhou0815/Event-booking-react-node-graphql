# Event-booking-react-node-graphql

A platform allows people to create and share events. A user can register and login. A logged in user can create new event and view all events including those created by other users. A logged in user can also view details of an event and then book the event. He can also view his bookings and delete his bookings. 

## Tech Stacks

- MongdoDB, Express.js, React.js, Node.js, GraphQL, JWT

## How to use

### 1. Download the file or use git commond:

```
git clone git@github.com:EricZhou0815/Event-booking-react-node-graphql.git
```

### 2. Update the node_modules based on the package.json

There are two package.json files, for front-end and back-end. 

```
npm install && cd front-end && npm install
```

### 3. Connect to the database

This server uses MongoDB Atlas as database. The connection string is in models/index.js. Database connection account and password are in .env file.

Please the .env config is only used for development. The config will change when it is deployed.

If you need to deploy your own server, please create a MongoDB Atlas database and use your own data base. For detailed process, please reference this tutorial:

https://www.thepolyglotdeveloper.com/2018/09/developing-restful-api-nodejs-mongodb-atlas/

### 4. Start the back-end GraphQL server

```
npm run start
```

### 5. Start the front-end

```
cd frontend  && npm run start
```


