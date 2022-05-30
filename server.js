const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const { json } = require('body-parser')

const app = express()

const PORT = 9000
app.listen(PORT, () => console.log('listening on port ' + PORT))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const dog = {
    name: 'Dog',
    age: 36777
}

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
    fs.writeFile('C:/Users/Admin/Desktop/photo-app/src/assets/data/test.json', jsonData, finished)
}
 
//saveData(dog)

app.post("/data", (req, res) => {
    //res.status(201).send(req.body)
    //console.log(req.body)
    let result = "[" +Object.keys(req.body)[0] + "]";
    //console.log(Object.keys(req.body)[0])
    saveData(JSON.parse(result)); 
})

