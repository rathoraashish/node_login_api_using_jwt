const con = require('../config/dbconfig');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const res = require('express/lib/response');

//---------Add new user api-----------

exports.addUser = async (req)=>{
    const userdata = req.body;
    const salt = bcrypt.genSaltSync(10);
    userdata.password = bcrypt.hashSync(userdata.password,salt);
    let isUserExist = await con.query(`select * from registration where email='${userdata.email}'`);
    console.log("length of array:",isUserExist[0]);
    if(isUserExist[0].length <= 0){
        console.log("addUser controller.......",userdata);
        let query = `insert into registration(full_name,email,password,mobile) value(?,?,?,?)`;
        const data = await con.query(query,[userdata.name,userdata.email,userdata.password,userdata.mobile]).then(obj => {
            console.log("1 record inserted", obj[0]);
            return obj[0]
        }).catch(err => {
            console.log("error", err);
            return err
        })
        return data;
    }else{
        result = {
            message:"user already exsists"
        }
        return result
    }
    // console.log("datataaaa", data);
}

exports.allUsers = async ()=>{
    let query = `select * from registration`;
    const data = await con.query(query).then(obj => {
        console.log("All users found", obj[0]);
        return obj[0]
    }).catch(err => {
        console.log("error", err);
        return err
    })
    // console.log("datataaaa", data);
    return data
}

exports.getUserById = async (id)=>{
    let query = `select id,full_name,email,mobile from registration where id=?`;
    const data = await con.query(query,[id]).then(obj => {
        console.log("User found", obj[0]);
        return obj[0]
    }).catch(err => {
        console.log("error", err);
        return err
    })
    // console.log("datataaaa", data);
    return data
}

exports.userLogin = async (req)=>{
    let response;
    let userdata = req.body;
    let query = `select * from registration where email=?`;
    const data = await con.query(query,[userdata.email]).then(async (obj) => {
        console.log("User found", obj[0]);
        let result = await bcrypt.compareSync(userdata.password,obj[0][0].password);
        if(result){
            const jsontoken = sign({result:obj[0].id}, "Ashish#123?",{
                expiresIn:"1h"
            });
            console.log("JSON TOKEN__________",jsontoken)
            response = {
                message:"Login success",
                jsontoken:jsontoken
            }
        }else{
            response = {
                message:"Please check email or password"
            }
        }
        return response;
    }).catch(err => {
        console.log("error", err);
        return err
    })
    return data
    // console.log("datataaaa", data);
}