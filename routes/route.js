const express = require('express');
const app = express();
var router = express.Router();
const User = require('../controller/user');
const bodyParser = require('body-parser');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

router.post('/',(req,res)=>{
    res.send(req.body)
})

router.post('/addUser', async (req,res)=>{
    try {
        // console.log("Data from postman",req.body);
        const data = await User.addUser(req)
        console.log("data:::response)__", data);
        res.send({
          "status":200,
          "message":"User inserted successfuly",
          "data":data
        })
        //return responseMessage(null, data) // User in-case of lambda function
      } catch (err) {
        console.log("Error:::::::))", err);
        res.send({
          "status":400,
          "message":"failed to insert user",
          "data":err
        })
       // return responseMessage(err, null)
      }
})

router.get('/users', async (req,res)=>{
    try {
        // console.log("Data from postman",req.body);
        const data = await User.allUsers()
        console.log("data:::response)__", data);
        res.send({
          "status":200,
          "message":"Users fetched successfuly",
          "data":data
        })
      } catch (err) {
        console.log("Error:::::::))", err);
        res.send({
          "status":400,
          "message":"Unable to fetch user",
          "data":err
        })
      }
})

module.exports = router;