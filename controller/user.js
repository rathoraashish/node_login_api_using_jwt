const con = require('../config/dbconfig');
const bcrypt = require('bcrypt');

//---------Add new user api-----------

exports.addUser = async (req)=>{
    const userdata = req.body;
    const salt = bcrypt.genSaltSync(10);
    userdata.password = bcrypt.hashSync(userdata.password,salt);
    console.log("addUser controller.......",userdata);
    let query = `insert into registration(full_name,email,password,mobile) value(?,?,?,?)`;
    const data = await con.query(query,[userdata.name,userdata.email,userdata.password,userdata.mobile]).then(obj => {
        console.log("1 record inserted", obj[0]);
        return obj[0]
    }).catch(err => {
        console.log("error", err);
        return err
    })
    // console.log("datataaaa", data);
    return data
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