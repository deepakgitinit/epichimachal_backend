const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendingMail = require("../middlewares/nodemailer")


const createUser = async (req, res) => {
    try {
        if(!req.body.username || !req.body.password || !req.body.email){
            res.status(400).json({status: "Unsuccessful", msg: "Username or Password Cannot be Empty."})
            return;
        }
        const user = await Users.findOne({username: req.body.username})
        if(user){
            res.status(406).json({status: "Unsuccessful", message: "Username Already Exists."});
            return;
        }
        
        const genSalt = await bcrypt.genSalt(12);
        const encodedPassword = await bcrypt.hash(req.body.password, genSalt);

        const User = new Users({
            username: req.body.username,
            password: encodedPassword,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            profile: "",
            role: "USER",
            isVerified: false
        })
        if(req.file){
            User.profile = req.file.path;
        }

        const createdUser = await User.save();

        const id = createdUser._id.toString();
        const username = createdUser.username;
        const email = createdUser.email;
        const result = verificationToken(id, username, email);

        if(result){
            res.status(201).json({status: "Successful", message: "User successfully created."});
        }else{
            res.status(201).json({status: "Unsuccessful", message: "User not created."});

        }

    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error})
    }
}


const loginUser = async (req, res) =>{
    if(!req.body.username || !req.body.password){
        res.status(400).json({status: "Unsuccessful", message: "Username or Password cannot be empty."})
        return;
    }
    const user = await Users.findOne({username: req.body.username})
    if(!user){
        res.status(401).json({status: "Unsuccessful", message: "Username is incorrect."});
        return;
    }
    let token;
    if(await bcrypt.compare(req.body.password, user.password)){
        token = jwt.sign({userID: user.id, username: user.username, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    }
    res.status(200).json({status: "Successful", message: token})
}


const verificationToken = async (id, username, email) =>{
    const token = jwt.sign({id: id, username: username}, process.env.JWT_SECRET, {
        expiresIn: "30m"
    });
    if(token){
        try {
            await sendingMail({
                from: "no-reply@travelmorehimachal.com",
                to: `${email}`,
                subject: "Account Verification Link",
                text: `Hello, ${username} Please verify your email by
                clicking this link, link is activated for 10 minutes only :
                http://localhost:5000/api/v1/users/${token}`,
            })
            return true;

        } catch(error) {
            console.log({status: "Unsuccessful", message: error});
        }
    }else{
        return false;
    }
}


const verification = async(req, res) =>{
    const {verification} = req.params;
    const data = jwt.verify(verification, process.env.JWT_SECRET);

    const {username} = await Users.findByIdAndUpdate(data.id, {isVerified: true});

    if(!username){
        res.status(404).json({status: "Unsuccessful", message: "User not found."});
        return;
    }
    if(username != data.username){
        res.status(200).json({status: "Unsuccessful", message: "Token is not Valid."})
        return;
    }

    res.status(200).json({status: "Successful", message: "Account Verified."})
}

module.exports = {createUser, loginUser, verification};