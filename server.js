const express = require('express')
const fs = require('fs')
const cors=require("cors");
const bodyParser = require('body-parser')
const { json } = require('body-parser')

// const urlProduct = "C:/Users/Administrator/Desktop/site-user/src/assets/test.json"
// const urlOrder = "C:/Users/Administrator/Desktop/site-user/src/assets/ordertest.json"
// const urlUser = "C:/Users/Administrator/Desktop/site-user/src/assets/userTest.json"


const urlProduct = "../site-user/src/assets/test.json"
const urlOrder = "../site-user/src/assets/ordertest.json"
const urlUser = "../site-user/src/assets/userTest.json"



const app = express()
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });


app.use(cors(corsOptions))
const PORT = 9000
app.listen(PORT, () => console.log('listening on port ' + PORT))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const saveDataApi = (dataRequest, url) => {
    const finished = (err) => {
        if(err) {
            console.error(err)
            return
        }
    }
    const jsonData = JSON.stringify(dataRequest)
    fs.writeFile(url, jsonData, finished)
}


app.post("/data", (req, res) => {
    let result = "[" +Object.keys(req.body)[0] + "]";
    //saveData(JSON.parse(result)); 
    saveDataApi(JSON.parse(result), urlProduct); 
})

app.post("/order", (req, res) => {
    let result =Object.keys(req.body)[0] + "[" + Object.keys(Object.values(req.body)[0]) +"," + Object.keys(Object.values(Object.values(req.body)[0]))  ;
    result = result.slice(0,-2) + "]}]"
    //saveOrder(req.body); 
    saveDataApi(req.body, urlOrder); 

})

app.post("/user", (req,res) => {
    saveDataApi(req.body, urlUser); 
})