'use strict'
const express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

const mongoDb = 'mongodb+srv://makeUp:store_MakeUp@cluster0.xztv5.mongodb.net/makeUpStore?retryWrites=true&w=majority'

mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let db = mongoose.connection;
db.on('connected', function () { console.log("connected to db") });
db.on('error', function () { console.log("error") });
db.on('disconnected', function () { console.log("disconnected to db") });

const { sendMailFunc } = require('./sendEmail');
const InvoiceGenerator  = require('./invoiceGenerator');
let Schema = mongoose.Schema;
let user = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String },
        id: { type: String },
        password: { type: String },
        cart: { type: Object },
        payment: { type: Object }
    }, { minimize: false }
);
let users = mongoose.model('userDetails', user, "users");

const randomPassword = () => {
    const result = [];
    const capitalLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '@$!%*#?&./';
    for (let i = 0; i < 2; i++) {
        result.push(capitalLetter.charAt(Math.floor(Math.random() * capitalLetter.length)));
        result.push(lowerCase.charAt(Math.floor(Math.random() * lowerCase.length)));
        result.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
        result.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }
    return result.join('');
}

const generateInvoiceNumber = () => {
    const result = [];
    const numbers = '0123456789';
    for (let i = 0; i < 6; i++) {
        result.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }
    return result.join('');
}

router.post("/insertUsers", (req, res) => {
    users.insertMany([{
        "name": "unKnown",
        "email": "unKnown@gmail.com",
        "id": "unKnown@gmail.com",
        "password": "",
        "cart": {
        },
        "payment": {}
    },]).then(function () {
        console.log("Data inserted");
        res.send("Data inserted")  // Success
    }).catch(function (error) {
        console.log(error)      // Failure
    });

});

router.get('/allUsers', async (req, res) => {
    await users.find({}, (err, users) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!users) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(users)
    })
});

router.get('/:', async (req, res) => {
    await users.findOne({ id: req.query.id }, (err, user) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!user) res.send([]);
        else {
            res.send(user);
        }
    })
});

router.put('/updateCart', async (req, res) => {
    await users.findOneAndUpdate({ id: req.query.id }, { cart: req.body }, (err, user) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!user) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(user)
    })
});

router.put('/updatePayment', async (req, res) => {
    await users.findOneAndUpdate({ id: req.query.id }, { payment: req.body }, (err, user) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!user) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(user)
    })
});

router.put('/updatePassword', async (req, res) => {
    await users.findOneAndUpdate({ id: req.query.id }, { password: randomPassword() }, (err, user) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!user) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        if (user) {
            const subject = "Rest Password";
            let messageToSent = `<h1>,Hi ${user.name}</h1>
                    <h2>Your password has been reset</h2>
                    <br/>
                    <h4>:Here is your new password</h4>
                    <br/>
                    <b>Password:</b>${user.password}
                    <br/>
                    <p>.Please keep it with you</p>
                    <br/>
                    <br/>
                    <br/>
                    <p>>.Fun shopping! <b>Make Up Time </b></p>
                    <img style="width:200px;" src='cid:unique@kreata.ee'>
                    <br/>`;
            const attachments = [{
                filename: 'logo.png',
                path: __dirname + '/images/logo.png',
                cid: 'unique@kreata.ee'
            }]
            sendMailFunc(user.email, subject, messageToSent,attachments);
        }
        res.send(user)
    })
});
router.put('/confirmOrder', async (req, res) => {
    new users(req.body).save((err, doc) => {
        if (err)
            return res.status(422).send(err);
        else if (doc && req.body.email != "unKnown@gmail.com"){
            const invoiceNumber = generateInvoiceNumber();
            const ig = new InvoiceGenerator(req.body,invoiceNumber)
            ig.generate()
            const attachments = [{
                filename: 'logo.png',
                path: __dirname + '/images/logo.png',
                cid: 'unique@kreata.ee'
            },
            {
                filename: `Invoice_${invoiceNumber}.pdf`,
                path:__dirname+`/pdf/Invoice_${invoiceNumber}.pdf`,
                contentType: 'application/pdf'
            }] 
            const subject = "Invoice attached";
            let messageToSent = `<h1>,Hi ${req.body.name}</h1>
            <h2>Thank you for your order</h2>
            <br/>
            <p>.This message is accompanied by your purchase invoice</p>
            <br/>
            <p>>.Fun shopping! <b>Make Up Time </b></p>
            <img style="width:200px;" src='cid:unique@kreata.ee'>
            <br/>`;
            sendMailFunc(req.body.email, subject, messageToSent,attachments);
            return res.send("action succeded");
        }
        else if(req.body.email == "unKnown@gmail.com"){
            return res.send("action succeded");
        }
    })
});
router.post('/signUp', async (req, res) => {
    new users(req.body).save((err, doc) => {
        if (err)
            return res.status(422).send(err);
        if (doc) {
            const subject = "welcome to Make Up Time!";
            let messageToSent = `<h1>,Hi ${req.body.name}</h1>
            <h2>You have successfully registered</h2>
            <br/>
            <h4>:Here are your account details</h4>
            <br/>
            <b>Email:</b>${req.body.email}
            <br/>
            <b>Name:</b>${req.body.name}
            <br/>
            <b>Password:</b>${req.body.password}
            <br/>
            <p>.Please keep them with you</p>
            <br/>
            <br/>
            <br/>
            <p>>.Fun shopping! <b>Make Up Time </b></p>
            <img style="width:200px;" src='cid:unique@kreata.ee'>
            <br/>`;
            const attachments = [{
                filename: 'logo.png',
                path: __dirname + '/images/logo.png',
                cid: 'unique@kreata.ee'
            }]
            sendMailFunc(req.body.email, subject, messageToSent,attachments);
            return res.send("you're signed-up succesfully");
        }
    })
});
module.exports = router;