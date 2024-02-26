const Destination = require('../models/destinations');

const getAllDestinations = async (req, res) =>{
    try {
        const allDestinations = await Destination.find({});
        res.status(200).json({allDestinations});
    } catch (error) {
        res.status(500).json({"status": "Unsuccessful", "message": error})
    }
}

const postDestination = async (req, res) =>{
    try {
        let tags = [];
        tags = req.body.tags.split(",")
        
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
        await destination.save();
        res.status(201).json({destination});
    } catch (error) {
        res.status(500).json({"status": "Unsuccessful", "message": error})
    }
}

const updateDestination = async (req, res) =>{
    console.log("req: ", req.body, "\nparams: ", req.params);
    try {
        const {id: destinationID } = req.params;
        const result = await Destination.findByIdAndUpdate({_id: destinationID}, req.body, {
            new: true,
            runValidators: true
        });
        if(!result){
            res.status(404).json({"msg": "Destination ID not found."});
        }
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({"status": "Unsuccessful", "message": error})
    }
}

const deleteDestination = async (req, res) =>{
    try {
        const {id: destinationID} = req.params;
        if(!destinationID){
            res.status(404).json({"msg": "Destination ID not found."});
        }
        const result = await Destination.findByIdAndDelete({_id: destinationID})
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({"status": "Unsuccessful", "message": error})
    }
}

module.exports = {
    getAllDestinations,
    postDestination,
    updateDestination,
    deleteDestination
}