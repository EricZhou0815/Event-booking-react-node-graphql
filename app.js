const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema=require('./graphql/schema/index');
const graphQlResolvers=require('./graphql/resolvers/index');
const isAuth=require('./middleware/is-auth');

const app = express();

// just for dev, never use for production const events=[]; add middleware to
// handle json request
app.use(bodyParser.json());

//set middleware to allow CROS
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if (req.method==='OPTIONS') {
        return res.sendStatus(200);
    }

    next();

});

app.use(isAuth);

//app.get('/',(req,res,next)=>{    res.send('Hello World!'); });
app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    //resolver: a function
    rootValue: graphQlResolvers,
    //enable a graphql debug interface
    graphiql: true
}));

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ehclm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    )
    .then(() => {
        app.listen(8000);
        console.log('Listening to port 8000...');
    })
    .catch(err => {
        console.log(err);
    });
