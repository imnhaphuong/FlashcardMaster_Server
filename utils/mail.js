const { google } = require('googleapis');
const nodemailer = require('nodemailer');

exports.generateOTP = () => {
    let otp = ''

    for (let i = 0; i <= 3; i++) {
        const randVal = Math.round(Math.random() * 9)
        otp = otp + randVal
    }
    return otp;
}


exports.mailTransport = async (email, otp) => {

    try {

        var transport = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,

            }
        });
        var mailOptions = {
            from: 'FlashcardMaster<flmaster022@hotmail.com>',
            to: email,
            subject: "Xác nhận tài khoản email đăng ký",
            html: `<h1>Chào mừng bạn đến với Flashcard Master</h1>
                    <h2>Mã OTP của bạn là</h2>
                    <h2>${otp}</h2>     
            `
        }
        transport.sendMail(mailOptions, (err, result) => {
            if (err) {
                console.log('err', err);
            } else {
                console.log("Thành công", result);
            }
            transport.close()
        })

    } catch (err) {
        console.log(err);
    }

    return transport
}
exports.mailTransportRespone = async (email) => {

    try {

        var transport = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,

            }
        });
        var mailOptions = {
            from: 'FlashcardMaster<flmaster022@hotmail.com>',
            to: email,
            subject: "Xác nhận tài khoản email đăng ký",
            html: `<h1>Chào mừng bạn đến với Flashcard Master</h1>
                    <h2>Xác nhận thành công</h2>     
            `
        }
        transport.sendMail(mailOptions, (err, result) => {
            if (err) {
                console.log('err', err);
            } else {
                console.log("Thành công", result);
            }
            transport.close()
        })

    } catch (err) {
        console.log(err);
    }

    return transport
}