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
// exports.mailTransport = () => {
//     var transport = nodemailer.createTransport({
//         host: "smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: process.env.MAILTRAP_USERNAME,
//             pass: process.env.MAILTRAP_PASSWORD
//         }
//     });
//     return transport
// }

exports.mailTransport = async (email, otp) => {
    const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
    try {
        const accessToken = await oAuth2Client.getAccessToken()

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
    const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
    try {
        const accessToken = await oAuth2Client.getAccessToken()

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