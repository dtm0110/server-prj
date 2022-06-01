const express = require('express')
const fs = require('fs')
const cors=require("cors");
const bodyParser = require('body-parser')
const { json } = require('body-parser')

const app = express()
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
const PORT = 9000
app.listen(PORT, () => console.log('listening on port ' + PORT))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const saveData = (dog) => {

    console.log("data truyen vao" + dog)
    const data = {
        product: dog
    }

    const finished = (err) => {
        if(err) {
            console.error(err)
            return
        }
    }

    const jsonData = JSON.stringify(dog)
    fs.writeFile('C:/Users/Administrator/Desktop/site-user/src/assets/test.json', jsonData, finished)
}
 

const saveOrder = (dog) => {

    console.log("abcxyz")
    console.log("data truyen vao order" + dog)
    const data = {
        product: dog
    }

    const finished = (err) => {
        if(err) {
            console.error(err)
            return
        }
    }

    const jsonData = JSON.stringify(dog)
    fs.writeFile('C:/Users/Administrator/Desktop/site-user/src/assets/ordertest.json', jsonData, finished)
}
//saveData(dog)

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });


app.post("/data", (req, res) => {
    //res.status(201).send(req.body)
    //console.log(req.body)
    let result = "[" +Object.keys(req.body)[0] + "]";
    //console.log(Object.keys(req.body)[0])
    saveData(JSON.parse(result)); 
})

app.post("/order", (req, res) => {
    //res.status(201).send(req.body)
    console.log("da vao day")
    console.log("order " + req.body)
    //console.log("body gui len " + Object.keys(req.body))
    console.log("in lan cuoi")
    let result =Object.keys(req.body)[0] + "[" + Object.keys(Object.values(req.body)[0]) +"," + Object.keys(Object.values(Object.values(req.body)[0]))  ;
    result = result.slice(0,-2) + "]}]"
    //console.log(Object.keys(req.body)[0])
    saveOrder(req.body); 
})
