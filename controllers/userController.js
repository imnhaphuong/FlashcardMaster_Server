const { User } = require("../models/User");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { generateOTP, mailTransport } = require("../utils/mail");
const VerificationToken = require("../models/VerificationToken");
const { isValidObjectId } = require("mongoose");
//mail sender details
// const transporter = nodemailer.creatTransporter({
//     service: 'gmail',
//     auth: {
//         user: 'trangnguyen24201@gmail.com',
//         pass: password
//     },
//     tls: {
//         rejectUnauthorized: false,
//     }
// })
const userController = {
    //Create
    createUser: async (req, res) => {

        const { email } = req.body
        const user = await User.findOne({ email });
        if (user) return res.json({ status: 'error', error: 'Tài khoản email đã được đăng ký' })
        req.body.password = Bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
        });
        console.log('User created successfully: ', newUser)

        // res.send(newUser);
        //send verification mail to user
        // const mailOptions ={
        //     from:'"Verify your email" <trangnguyen24201@gmail.com>',
        //     to: newUser.email,
        //     subject:'trangnguyen - verify your email',
        //     mess: `${newUser.name}! Cảm ơn đã đăng ký`
        // }  
        const OTP = generateOTP()
        const verificationToken = new VerificationToken({
            owner: newUser._id,
            token: OTP
        })
        await verificationToken.save();
        await newUser.save();
        //send verification mail to user
        mailTransport().sendMail({
            from: 'fmaster@gmail.com',
            to: newUser.email,
            subject: "Xác nhận tài khoản email đăng ký",
            html: `<h1>${OTP}</h1>`
        })
        res.status(200);// HTTP REQUEST CODE

        res.json({ status: 'ok' })
    },
    //verify
    verifyEmail: async (req, res) => {
        const { userId, otp } = req.body
        console.log(userId);
        if (!userId || !otp.trim()) return res.json( 'Invalid request')
        if (!isValidObjectId(userId)) return res.json( 'id tài khoản không đúng')
        const user = await User.findById(userId)
        if (!user) return (res, 'Tài khoản không tồn tại')
        if (user.isVerified) return res.json( 'Tài khoản đã được xác nhận');
        const token = await VerificationToken.findOne({ owner: user._id })
        if (!token) return res.json( 'Tài khoản không tồn tại');
        const isMatched = await token.compareToken(otp)
        if (!isMatched)return res.json( 'Mã OTP không đúng');
        user.isVerified = true;
        await VerificationToken.findByIdAndDelete(token._id)
        await user.save();
        mailTransport().sendMail({
            from: 'fmaster@gmail.com',
            to: user.email,
            subject: "Xác nhận tài khoản email đăng ký",
            html: `<h1>Xác nhận thành công</h1>`
        }) 
        res.json({success: true, message:"Xác nhận thành công"})
    },
    //sign in
    signIn: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send({ status: 'error', message: "Email này chưa được đăng ký " });
            }
            if (!Bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).send({ status: 'error', message: "Mật khẩu chưa đúng" });
            }
            //Create and assign a token 
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
            res.header('auth-token', token).send({ data: user, token: token });

        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE
        }
    },
    //Get by id
    getUserByID: async (req, res) => {
        try {
            console.log(req.body);
            User.findById(req.body).then(data => res.send(data));
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE

        }
    },
    //getAllUser
    getAllUser: async (req, res) => {
        try {
            // const UserByID = new User(req.body);        
            User.find().then(data => res.send(data));
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE

        }
    },
};

module.exports = userController;