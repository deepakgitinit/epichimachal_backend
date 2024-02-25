const Destination = require('../models/destinations');

const getAllDestinations = async (req, res) =>{
    const allDestinations = await Destination.find({});
    res.status(200).json({allDestinations});
}

const postDestination = async (req, res) =>{
    let tags = [];
    tags = req.body.tags.split(",")
    // console.log(tags);
    
    const destination = new Destination({
        title: req.body.title,
        description: req.body.description,
        tags: tags,
        images: []
    })
    if(req.files){
        req.files.forEach((img)=>{
            destination.images.push(img.path);
        })
    }
    // console.log(destination);
    await destination.save();
    res.status(200).json({destination});
}

const updateDestination = async (req, res) =>{
    //TODO: update Destination
}

const deleteDestination = async (req, res) =>{
    //TODO: delete Destination
}

module.exports = {
    getAllDestinations,
    postDestination,
    updateDestination,
    deleteDestination
}