//email setting and function 
let nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'gmail.com',
    secure: false,
    auth: {
        user: 'makeuptime.online@gmail.com',
        pass: 'makeuptime'
    },
    tls: {
        rejectUnauthorized: false
    }
});


let mailOptions = {
    from:'makeuptime.online@gmail.com',
    accessKeyId: 'AWSACCESSKEY',
    secretAccessKey: 'AWS/Secret/key',
    attachments: [{
        filename: 'logo.png',
        path: __dirname + '/images/logo.png',
        cid: 'unique@kreata.ee' 
    }
]}

let sendMailFunc = function (toUser,subject,text,attachments) {
    mailOptions.to = toUser;
    mailOptions.subject = subject;
    mailOptions.html = text;
    mailOptions.attachments = attachments;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('sent email!')
        }
    })
}

module.exports = { transporter, mailOptions, sendMailFunc }