const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verificationMail = require("../middlewares/verificationmail");
const forgotpassword = require("../middlewares/forgotpassword");

const createUser = async (req, res) => {
    try {
        if( !req.body.password || !req.body.email){
            res.status(400).json({status: "Unsuccessful", msg: "Email or Password Cannot be Empty."})
            return;
        }
        const user = await Users.findOne({email: req.body.email})
        if(user){
            res.status(200).json({status: "Unsuccessful", message: "Email Already Registered."});
            return;
        }
        
        const genSalt = await bcrypt.genSalt(12);
        const encodedPassword = await bcrypt.hash(req.body.password, genSalt);

        const User = new Users({
            email: req.body.email,
            password: encodedPassword,
            subscription: req.body.subscription
        })

        const createdUser = await User.save();
        const id = createdUser._id.toString();
        const email = createdUser.email;
        const result = verificationMail(id, email);

        if(result){
            res.status(201).json({status: "Successful", message: "User successfully created. Check for verification mail"});
        }else{
            res.status(500).json({status: "Unsuccessful", message: "User not created."});
        }

    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error})
    }
}


const loginUser = async (req, res) =>{
    try {
        if(!req.body.email || !req.body.password){
            res.status(400).json({status: "Unsuccessful", message: "Credentials cannot be empty."})
            return;
        }
        const user = await Users.findOne({email: req.body.email})
        if(!user){
            res.status(401).json({status: "Unsuccessful", message: "Email is incorrect."});
            return;
        }
        if(!user.isVerified){
            res.status(401).json({status: "Unsuccessful", message: "Account is not verified."});
            return;
        }

        if(await bcrypt.compare(req.body.password, user.password)){
            const token = jwt.sign({userID: user.id, role: user.role}, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });
            res.status(200).json({status: "Successful", message: token, profile: user.profile, role: user.role})
            return;
        }
        res.status(401).json({status: "Unsuccesful", message: "Password is incorrect!"});
        
    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
    }
}

const userProfile = async(req, res) =>{
    try {
        const userReq = req.user;
        const user = await Users.findById(userReq.userID);
        const userObj = {
            name: user.name,
            email: user.email,
            profile: user.profile,
            address: user.address,
            phone: user.phone,
            verified: user.isVerified,
            subscription: user.subscription
        }
        if(!user){
            res.status(404).json({status: "Unsuccessful", message: "User not found."});
            return;
        }
    
        res.status(200).json({status: "Successful", message: userObj})

    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
    }
}

const updateUser = async (req, res) =>{
    try {
        const userReq = req.user;

        const user = await Users.findById(userReq.userID);
        if(!user){
            res.status(404).json({status: "Unsuccessful", message: "User not found."});
            return;
        }

        const User = req.body;
        if(User.email != user.email){
            res.status(406).json({status: "Unsuccessful", message: "Email cannot be updated."});
            return;
        }

        const num = await Users.findOne({phone: User.phone});
        if(num && num.phone !="" && num.phone != user.phone){
            res.status(406).json({status: "Unsuccessful", message: "Phone number is already exists."});
            return;
        }

        if(req.file){
            User.profile = req.file.path;
        }

        const response = await Users.findByIdAndUpdate(userReq.userID, User, { new: true })

        if(response){
            res.status(201).json({status: "Successful", message: "Succesfully Updated", profile: response.profile});
            return;
        }

        res.status(404).json({status: "Unsuccesful", message: "Internal Error"})

    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
        console.log(error);
    }
}

const verification = async(req, res) =>{
    try {
        const {verification} = req.params;
        const data = jwt.verify(verification, process.env.JWT_SECRET);

        const user = await Users.findById(data.id);

        if(!user){
            res.status(200).json({status: "Unsuccessful", message: "User not found."});
            return;
        }
        else if(user.isVerified){
            res.status(200).json({status: "Unsuccessful", message: "User is Already Verified."});
            return;

        } else{
            user.isVerified = true;
            await user.save();
            res.status(200).json({status: "Successful", message: "Account Verified."})
            return
        }

    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
    }
}

const resendVerification = async (req, res) =>{
    try {
        const email = req.body.email;
        const user = await Users.findOne({email: email});
        if(!user){
            res.status(200).json({status: "Unsuccessful", message: "Email not found."});
            return;
        }
        if(user.isVerified == true){
            res.status(200).json({status: "Unsuccessful", message: "User is already verified."});
            return;
        }
        const result = await verificationMail(user.id, user.email);
    
        if(result){
            res.status(200).json({status: "Successful", message: "Check for verification mail"});
        }else{
            res.status(500).json({status: "Unsuccessful", message: "Internal error while sending verification mail."});
        }

    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
    }
}

const forgotPassword = async (req, res) =>{
    try {
        const email = req.body.email;
        const user = await Users.findOne({email: email});

        if(!user){
            res.status(404).json({status: "Unsuccessful", message: "Email not registered."});
            return;
        }
        const result = await forgotpassword(user.id, user.email);

        if(result){
            res.status(200).json({status: "Successful", message: "Check your mail for Password reset link."});
        }else{
            res.status(500).json({status: "Unsuccessful", message: "Internal error while sending mail."});
        }
        
    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
    }
}

const setPassword = async(req, res) =>{
    try {
        const {token} = req.params;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(data.id);

        if(!user){
            res.status(404).json({status: "Unsuccessful", message: "Token is not Valid. Regenerate Token."});
            return;
        }
        
        const genSalt = await bcrypt.genSalt(12);
        const encodedPassword = await bcrypt.hash(req.body.password, genSalt);


        user.password = encodedPassword;
        user.save();

        res.status(200).json({status: "Successful", message: "Password is reset Successfully."})
        
    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
    }
}

const setSettingsPassword = async(req, res) =>{
    try {
        const {userID} = req.user;
        const user = await Users.findById(userID);
        
        if(!user){
            res.status(404).json({status: "Unsuccessful", message: "Token is not Valid. Regenerate Token."});
            return;
        }
        
        const genSalt = await bcrypt.genSalt(12);
        const encodedPassword = await bcrypt.hash(req.body.password, genSalt);


        user.password = encodedPassword;
        user.save();

        res.status(200).json({status: "Successful", message: "Password is reset Successfully."})
        
    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
    }
}

module.exports = {createUser, loginUser, userProfile, updateUser, verification, resendVerification, forgotPassword, setPassword, setSettingsPassword};