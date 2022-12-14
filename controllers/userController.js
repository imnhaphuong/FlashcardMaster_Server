const User = require("../models/User");
const Bcrypt = require("bcryptjs");
const Unit = require("../models/Unit");
const Class = require("../models/Class")
const jwt = require("jsonwebtoken");
const {
    generateOTP,
    mailTransport,
    mailTransportAgain,
    mailTransportRespone,
    mailTransportResponeAgain,
} = require("../utils/mail");
const VerificationToken = require("../models/VerificationToken");
const { isValidObjectId } = require("mongoose");
const { default: ShortUniqueId } = require('short-unique-id');
const { request } = require("express");
const uid = new ShortUniqueId({
    dictionary: [
        '0', '1', '2', '3',
        '4', '5', '6', '7',
        '8', '9'
    ],
});



const userController = {
    //Create
    createUser: async (req, res) => {

        const deFullName = 'user' + uid.randomUUID(4);
        const { email } = req.body
        const user = await User.findOne({ email });
        if (user) return res.json({ status: 'error', error: 'Tài khoản email đã được đăng ký' })
        req.body.password = Bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            fullname: deFullName
        });
        console.log('User created successfully: ', newUser)

        const OTP = generateOTP()
        const verificationToken = await new VerificationToken({
            owner: newUser._id,
            token: OTP
        })
        console.log("verification", verificationToken);
        //send verification mail to user
        await mailTransport(email, OTP)
        await verificationToken.save();
        await newUser.save();

        res.status(200);// HTTP REQUEST CODE

        res.json({ status: 'ok', user: newUser })
    },
    sendVerificationEmaail: async (req, res) => {
        const { userId, email } = req.body
        const OTP = generateOTP()
        const token = await VerificationToken.findOne({ owner: userId })
        if (token !== null) {
            await VerificationToken.findByIdAndDelete(token._id)
        }
        const verificationToken = new VerificationToken({
            owner: userId,
            token: OTP
        })
        await verificationToken.save();
        //send verification mail to user
        await mailTransport(email, OTP)
        res.status(200);// HTTP REQUEST CODE

        res.json({ status: 'ok' })
    },
    //verify
    verifyEmail: async (req, res) => {
        const { userId, otp } = req.body
        if (!userId || !otp.trim()) return res.json({ status: 'error', message: 'Invalid request' })
        if (!isValidObjectId(userId)) return res.json({ status: 'error', message: 'id tài khoản không đúng' })
        const user = await User.findById(userId)
        if (!user) return ({ status: 'error', message: 'Tài khoản không tồn tại' })
        if (user.isVerified) return res.json({ status: 'error', message: 'Tài khoản đã được xác nhận' });
        const token = await VerificationToken.findOne({ owner: userId })
        if (!token) return res.json({ status: 'error', message: 'Lỗi: Tài khoản không tồn tại' });
        const isMatched = await token.compareToken(otp)
        if (!isMatched) return res.json({ status: 'error', message: 'Mã OTP không đúng' });
        user.isVerified = true;

        await VerificationToken.findByIdAndDelete(token._id)

        await user.save();
        await mailTransportRespone(user.email)
        res.json({ status: 'success', message: "Xác nhận thành công" })
    },
    sendVerificationEmailAgain: async (req, res) => {
        const { userId, email } = req.body
        const OTP = generateOTP()
        const token = await VerificationToken.findOne({ owner: userId })
        if (token !== null) {
            await VerificationToken.findByIdAndDelete(token._id)
        }
        const verificationToken = new VerificationToken({
            owner: userId,
            token: OTP
        })
        console.log("OTP", OTP);
        await verificationToken.save();
        await mailTransportAgain(email, OTP)
        res.status(200);// HTTP REQUEST CODE
        res.json({ status: 'ok' })
    },
    verifyEmailAgain: async (req, res) => {
        const { userId, otp } = req.body
        const token = await VerificationToken.findOne({ owner: userId })
        const isMatched = await token.compareToken(otp)
        if (!isMatched) {
            return res.json({
                status: 'ERROR',
                message: 'Mã OTP không đúng'
            });
        }
        else {
            res.json({
                status: 'success',
                message: "Xác nhận thành công"
            });
            await VerificationToken.findByIdAndDelete(token._id)
        }
    },
    //sign in
    signIn: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send({ status: 'error', message: "Email này chưa được đăng ký " });
            }
            if (user.isVerified === false) {
                return res.status(400).send({ status: 'errorVerified', message: "Vui lòng xác nhận email " });
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
        User.findById(req.body.id)
            .populate("insignia")
            .then((data) => {
                console.log("got the user has id " + req.body.id);
                res.send(data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    },
    //getAllUser
    getAllUser: async (req, res) => {
        try {
            // const UserByID = new User(req.body);        
            User.find({}).populate("insignia").then(data => res.send(data));
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE

        }
    },
    signInGG: async () => {
        // Create an anonymous credential
        const credentials = Real.Credentials.anonymous();
        try {
            const user = await app.logIn(credentials);
            console.log("Successfully logged in!", user.id);
            return user;
        } catch (err) {
            console.error("Failed to log in", err.message);
        }
    },
    chooseClass: async (req, res) => {
        const { email } = req.body
        try {
            const user = await User.findOne({ email: email });
            user.type = 1;
            await user.save();
            res.status(200)
            res.json({ status: 'ok', user: user })
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE
        }
    },
    choosePersonal: async (req, res) => {
        const { email } = req.body
        try {
            const user = await User.findOne({ email: email });
            user.type = 2;
            await user.save();
            res.status(200)
            res.json({ status: 'ok', user: user })
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE
        }
    },
    searchUser: async (req, res) => {
        await User.find({ email: { '$regex': req.body.keyword, '$options': 'i' } })
            .populate("insignia")
            .then(async (data) => {
                const userData = await Promise.all(data.map(async e => {
                    const unitLength = (await Unit.find({ mode: true, creator: e._id })).length
                    const classLength = (await Class.find({ mode: true, creator: e._id })).length
                    return { ...e._doc, unitLength: unitLength, classLength: classLength }
                }))
                res.send(userData);
            })
            .catch((err) => {
                console.log("err", err);
            });
    },
    changePassword: async (req, res) => {
        const { email, oldPassword, newPassword } = req.body
        const user = await User.findOne({ email: req.body.email });
        if (Bcrypt.compareSync(oldPassword, user.password)) {
            const hashNewPassword = Bcrypt.hashSync(newPassword, 10);
            await User.updateOne({ email: email }, { password: hashNewPassword });
            return res.json({
                status: "SUCCESS",
                message: `Password change successfuly!`,
            })
        } else {
            return res.json({
                status: "FAILD",
                message: `Password invalid`
            })
        }
    },
    updateFullname: async (req, res) => {
        try {
            await User.updateOne({ _id: req.body.Userid }, { fullname: req.body.fullname })
            const data = await User.findById(req.body.Userid)
            res.send(data)
        } catch (err) {
            console.log("ERR", err);
        }
    },
    updateEmail: async (req, res) => {
        try {
            User.findByIdAndUpdate({ _id: req.body.userId }, { email: req.body.email })
                .then((data) => {
                    res.send(data)
                    //console.log("Đã cập nhật email mới vào server");
                });
        } catch (err) {
            console.log("ERR", err);
        }
    },
};

module.exports = userController;
