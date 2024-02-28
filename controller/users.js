const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
            role: "USER"
        })
        if(req.file){
            User.profile = req.file.path;
        }

        await User.save();
        res.status(201).json({status: "Successful", message: "User Successfully Created."});

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
    if(user.username != req.body.username){
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

module.exports = {createUser, loginUser};