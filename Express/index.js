const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongodb');

const mongoClient = mongo.MongoClient;
let client = new mongoClient('mongodb://localhost:27017/test', {useNewUrlParser: true});
let connection;

client.connect((err,db)=>{
    if(err){
        console.log('Something went wrong');
    }
    connection = db;
});

const app = express();
app.use(cors());

app.post('/post-data', bodyParser.json(), (req,res)=>{
    let collection_instance = connection.db('test').collection('test');
    collection_instance.insertOne(req.body, (err,records)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({ status: "Inserted"});
        }
    });
})

app.post('/update-data/:id', bodyParser.json(), (req,res)=>{
    let id = { _id : new mongo.ObjectID(req.params.id) };
    console.log(req.body)
    let collection_instance = connection.db('test').collection('test');
    collection_instance.updateOne(id, {$set: req.body}, (err,records)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({ status: "updated"});
        }
    });
})

app.post('/delete', bodyParser.json(), (req,res)=>{
    console.log(req.body.id);
    let id = { _id : new mongo.ObjectID(req.body.id) };
    console.log(id);
    let collection_instance = connection.db('test').collection('test');
    collection_instance.deleteOne(id, (err, obj)=>{
        if(err){
            console.log("Something went wrong");
        }
        else{
            console.log('Deleted');
        }
    })
})

app.get('/get-data', (req,res)=>{
    let collection_instance = connection.db('test').collection('test');
    collection_instance.find().toArray((err,docs)=>{
        if(err){
            console.log("Something went wrong");
        }
        else{
            res.send(docs);
        }
    })
})

app.listen(3000, () => console.log('Express started at port 3000'));