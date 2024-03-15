const Package = require('../models/packages');

const getPackages = async (req, res) =>{
    const allPackages = await Package.find({});
    res.status(200).json({allPackages});
}

const postPackage = async (req, res) =>{
    try {
        const package = new Package({
            title: req.body.title,
            price: req.body.price,
            destinations: [],
            time: req.body.time,
            thumbnail: ""
        })
        if(req.file){
            package.thumbnail = req.file.path;
        }
        await package.save();
        res.status(201).json({status: "Successful", message: "Package Created Successful"});
    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error})
    }
}

const updatePackage = async (req, res)=>{
    try {
        const {id: packageID } = req.params;
        if(!packageID){
            res.status(404).json({msg: "Package ID not found."});
        }
        const result = await Package.findByIdAndUpdate(packageID, req.body);
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error})
    }
}

const deletePackage = async (req, res)=>{
    try {
        const {id: packageID} = req.params;
        if(!packageID){
            res.status(404).json({"msg": "Package ID not found."});
        }
        const result = await Package.findByIdAndDelete({_id: packageID})
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({status: "Unsuccessful", message: error})
    }
}

module.exports =  { 
    getPackages,
    postPackage,
    updatePackage,
    deletePackage
};