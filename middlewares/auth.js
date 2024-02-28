const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401).json({status: "Unsuccessful", message: "Token is not Valid."});
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userID: payload.userID, username: payload.username, role: payload.role}
        next();
    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error});
    }
}

module.exports = authentication;