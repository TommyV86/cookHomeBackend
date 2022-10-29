const User = require('../models/userModel')
const Id = require('mongodb').ObjectId;
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid');
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
                role: obj.usualUser,
                name: name,
                email: email, 
                passwordHash: pswdHash,
                salt: salt,
                token: ''
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

const getEmailforNewPswd = async (req, res) => {
    try {
        const email = req.body.email
        const emailUser = await User.findOne({email: email})
        const dbEmail = emailUser.email
        if(dbEmail === email){
            // attribution d'un token pour servir d'index pour le changement de mdp
            let uniqueCodev4 = uuidv4()
            await User.updateOne(emailUser, {$set: {token: uniqueCodev4}})

            // creation de l'expediteur
            let sendMailer = obj.sendMailer
            let pswdMailer = obj.pswdMailer
            let serviceMailer = obj.sendMailer

            let transporter = nodemailer.createTransport({
                service: serviceMailer,
                auth: {
                    user: sendMailer,
                    pass: pswdMailer
                }
            })

            // creation du contenu de mail
            let mailOptions = {
                from: sendMailer,
                to: dbEmail,
                subject: 'Redéfinition du mdp',
                text: `Veuillez redéfinir votre mdp en cliquant sur le lien 
                http://localhost:3000/PasswordChange?token=${uniqueCodev4}`
            }

            // envoi du mail par l'expediteur
            transporter.sendMail(mailOptions, (e, info) => {
                if(e){
                    console.log('not sent')
                    console.log(e)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            console.log(`user mail from db finded : ${dbEmail}`)
            res.status(200).json(`user mail from data base finded : ${dbEmail}`)
        } else {
            console.log(`this mail ${email} doesn't exist`)
        }

    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

const modifyPswd = async (req, res) => {
    try {
        let token = req.params.token;
        const searchTokenUser = await User.findOne({ token: token });
        if(searchTokenUser){
            let { password } = req.body;
            let salt = await bcrypt.genSalt(10);
            let pswdHash = await bcrypt.hash(password, salt);
            await User.updateOne({token: token}, {$set:
                {passwordHash: pswdHash}
            });
            res.status(200).json(`success password update`);
        } else {
            console.log(" xxx failed update xxx");
            console.log("token : " + token + " doesn't exist")
            res.status(404).json(" failed update, token " + token + " doesn't exist");
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
    getEmailforNewPswd,
    modifyPswd,
    deleteUser
}