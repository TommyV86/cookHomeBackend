const User = require('../models/userModel')
const Id = require('mongodb').ObjectId;
const bcrypt = require('bcrypt')
const obj = require('../obj')

const postUser = async (req, res) => {
    try {
        let { name, email } = req.body;
        const emailExist = await User.findOne({ email: email })
        if(emailExist){
            console.log(` xxx email ${email} already exists xxx `);
            return res.status(400).json(`email ${email} already exists`)
        } else {
            //Hash password
            let pswd = req.body.passwordHash;
            let salt = await bcrypt.genSalt(10);
            // debug
            console.log(pswd);
            console.log(salt);
            let pswdHash = await bcrypt.hash(pswd, salt);
            const newUser = await User.create({
                role: obj.admin,
                name: name,
                email: email, 
                passwordHash: pswdHash,
                salt: salt,
            });
            console.log(" *** success *** ");
            return res.status(200).json(newUser);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error);    
    }
}

const getUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log(` xxx email ${email} doesn't exists xxx `);
            return res.status(400).json(`email ${email} doesn't exists`);
        }

        const validPswd = await bcrypt.compare(password, user.passwordHash);
        if(!validPswd) {
            console.log("password is incorrect");
            return res.status(400).json("password is incorrect");
        } else {
            console.log("*** success login ! ***");
            const userData = {
                _id: user._id,
                role: user.role,
                email: user.email,
                name: user.name
            }
            res.status(200).json(userData);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error);    
    }
}

const modifyUser = async (req, res) => {
    try {
        let reqParamsId = req.params.id;
        let idParams = Id(reqParamsId);
        const searchIdUser = await User.findById(idParams);
        if(searchIdUser){
            let { name, email } = req.body;
            const userUpdated = await User.findByIdAndUpdate(idParams, {
                name: name,
                email: email
            });
            console.log(`*** user with id ${idParams} updated ***`);
            res.status(200).json(`${userUpdated._id} data's updated`);
        } else {
            console.log(" xxx failed update xxx");
            console.log("Id : " + idParams + " doesn't exist")
            res.status(404).json(" failed update, id " + idParams + " doesn't exist");
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

const deleteUser = async (req, res) => {
     try {
        let idParams = Id(req.params.id);
        const searchIdUser = await User.findById(idParams);
        if(searchIdUser){
            await User.remove({ _id: idParams });
            console.log(`*** user deleted ***`);
            console.log(`*** id : ${idParams} ***`);
            res.status(200).json(` user deleted -> ${idParams} `);
        } else {
            console.log(" xxx failed delete xxx");
            console.log("Id : " + idParams + " doesn't exist")
            res.status(404).json(" failed delete, id " + idParams + " doesn't exist");
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

module.exports = {
    postUser,
    getUser,
    modifyUser,
    deleteUser
}