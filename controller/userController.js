const { set } = require('mongoose');
const users = require('../db/models/users');
const bcrypt = require('bcryptjs');
const success_function = require('../utils/response-handler').success_function ;
const error_function = require('../utils/response-handler').error_function ;
const set_pass_template = require("../utils/email-templates/setPassword").resetPassword;
const sendEmail = require ("../utils/send-email").sendEmail;

function generateRandomPassword(length) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
    let password = "";

    for (var i = 0; i<length;i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}

async function createUser (req,res) {
    try {
        let name = req.body.name ;
        
        let email = req.body.email;
        let password = generateRandomPassword(12);

        console.log("name :",name)

        let userFound =await users.findOne({email});

        if(userFound){
            let response = error_function({
                statusCode : 400 ,
                message : "user already exist"
            })
            res.status(response.statusCode).send(response);
            return ;
        }

        let salt = await bcrypt.genSalt(10);
        console.log("salt : ",salt);

        let hashed_password = bcrypt.hashSync(password,salt);

        let new_user = await users.create ({
            name,
            email,
            password : hashed_password,
            user_type : "65fa97d33f1f1cfd77e757ba"
        });

        if (new_user) {
            let emailContent = await set_pass_template(name,email,password);

            await sendEmail(email, "set your password",emailContent);
            console.log("email :", email)

            
            let response_datas = {
                _id : new_user._id,
                name : new_user.name,
                email : new_user.email,
                user_type : "65fa97d33f1f1cfd77e757ba"
            }
            console.log("new_user : ",new_user);

            let response = success_function({
                statusCode : 201,
                data : response_datas,
                message : "user created successfully",
            })
            res.status(response.statusCode).send(response);
            return ;
        }else {
            let response = error_function({
                statusCode : 400 ,
                message : "user creation failed",
            })
            res.status(response.statusCode).send(response);
            return ;
        }
    }catch (error) {
        console.log("error : ",error);

        let response = error_function ({
            statusCode : 400 , 
            message : "something went wrong..."
        })
        res.status(response.statusCode).send(response);
        return ;
    }
}

async function getUserData(req,res){
    try {
        let allUsers = await users.find({});

        if (allUsers.length > 0) {
            let response = success_function({
                statusCode : 200,
                data : allUsers,
                message : "All users retrieved successfully",
            });
            res.status(response.statusCode).send(response);
        }else {
            let response = error_function({
                statusCode : 404 ,
                message : "No users found",
            });
            res.status(response.statusCode).send(response);
            return ;
        }
    } catch(error) {
        console.log ("error : ",error);

        let response = error_function({
            statusCode : 500,
            message : "Internal server error",
        });
        res.status(response.statusCode).send(response)
    }
} 

module.exports = {
    createUser,
    getUserData,
}