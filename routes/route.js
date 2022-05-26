const express = require('express');
const app = express();
var router = express.Router();
const User = require('../controller/user');
const bodyParser = require('body-parser');
const {validateToken} = require('../auth/token_validation')

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
          "status":"success",
          "data":data
        })
        //return responseMessage(null, data) // User in-case of lambda function
      } catch (err) {
        console.log("Error:::::::))", err);
        res.send({
          "status":"failed",
          "message":"failed to insert user",
          "data":err
        })
       // return responseMessage(err, null)
      }
})

router.get('/users',validateToken, async (req,res)=>{
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

router.get('/users/:id',validateToken, async (req,res)=>{
    try {
        var id = req.params.id;
        // console.log("Data from postman",id);
        const data = await User.getUserById(id)
        console.log("data:::response)__", data);
        res.send({
          "status":200,
          "message":"User fetched using id",
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

router.post('/login', async (req,res)=>{
  try {
      // console.log("Data from postman",req.body);
      const data = await User.userLogin(req)
      console.log("data:::response)__", data);
      res.send({
        "status":200,
        "data":data
      })
    } catch (err) {
      console.log("Error:::::::))", err);
      res.send({
        "status":400,
        "message":"Login failed",
        "data":err
      })
    }
})

router.delete('/deleteUser',validateToken, async (req,res)=>{
  try {
      // console.log("Data from postman",req.body);
      const data = await User.deleteUser(req)
      console.log("data:::response)__", data);
      res.send({
        "status":200,
        "data":data
      })
    } catch (err) {
      console.log("Error:::::::))", err);
      res.send({
        "status":400,
        "message":"Unable to delete user",
        "data":err
      })
    }
})

module.exports = router;