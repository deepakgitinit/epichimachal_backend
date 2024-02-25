const Package = require('../models/packages');

const getPackages = async (req, res) =>{
    const allPackages = await Package.find({});
    res.status(200).json({allPackages});
}

const postPackage = async (req, res) =>{
    // let destinations = [];
    // destinations = req.body.destinations.split(",")

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
    res.status(201).json({package});
}

const updatePackage = async (req, res)=>{
    //TODO: Add update Package with update thumbnail of put request with req id
}

const deletePackage = async (req, res)=>{
    //TODO: Delete package with its id
}

module.exports =  { 
    getPackages,
    postPackage,
    updatePackage,
    deletePackage
};