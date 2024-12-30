const App=require('../models/app.model.js');

//Listing all properties
exports.findAll=(req,res)=>{
    App.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        console.error(err.stack);
        res.status(500).send({
            message:err.message||"Some error occurred"
        })
    })
}

//Finding a property by name
exports.findByName = (req, res) => {
    App.findOne({ name: req.params.propertyName })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: `Property not found with name ${req.params.propertyName}`,
          });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error retrieving property with name ${req.params.propertyName}`,
        });
      });
};

// Creating new property
exports.create = (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.type || !req.body.dimensions || !req.body.area || !req.body.contactNumber) {
      return res.status(400).send({ message: 'Content cannot be empty!' });
    }
  
    const property = new App({
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
      dimensions: req.body.dimensions,
      area: req.body.area,
      contactNumber: req.body.contactNumber,
      ...(req.body.type === 'Residential' && { rooms: req.body.rooms }),
    });
  
    property
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the property.',
        });
      });
};

//Updating property by id
exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({
            message: "Data to be updated cannot be empty"
        })
    }
    const id = req.params.propertyId;
    App.findByIdAndUpdate(id, req.body,{
        new:true,
        runvalidator: true,
        useFindAndModify: false,
    })
    .then((data)=>{
        if(!data){
            return res.status(404).send({
                message: "Property not found with id"+ id,
            })
        }else
        res.send({message: "Updated successfully"})
    })
    .catch((err)=>{
        res.status(500).send({
            message: "Error updating with id = " + id,
        });
    });
}


// Deleting a property by its name
exports.deleteByName = (req, res) => {
    App.findOneAndDelete({ name: req.params.propertyName })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: `Property not found with name ${req.params.propertyName}`,
          });
        }
        res.send({ message: "Property was deleted successfully!" });
      })
      .catch((err) => {
        res.status(500).send({
          message: `Could not delete property with name ${req.params.propertyName}`,
        });
      });
};

//Finding properties by their location
exports.findByLocation = (req, res) => {
    App.find({ area: req.params.location })
        .then((data) => {
            if (!data.length) {
                return res.status(404).send({ message: "No properties found in this location" });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error occurred while retrieving properties by location" });
        });
};

//Finding properties below a price
exports.findByPrice = (req, res) => {
    const maxPrice = Number(req.params.maxPrice);
    App.find({ price: { $lt: maxPrice } })
        .then((data) => {
            if (!data.length) {
                return res.status(404).send({ message: "No properties found below the given price" });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error occurred while retrieving properties by price" });
        });
};

//Finding properties by type
exports.findByType = (req, res) => {
    App.find({ type: req.params.type })
        .then((data) => {
            if (!data.length) {
                return res.status(404).send({ message: "No properties found of this type" });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error occurred while retrieving properties by type" });
        });
};

//Finding residential properties by number of rooms specified
exports.findResidentialByRooms = (req, res) => {
    const rooms = Number(req.params.rooms);
    App.find({ type: "Residential", rooms: rooms })
        .then((data) => {
            if (!data.length) {
                return res.status(404).send({ message: "No residential properties found with the given number of rooms" });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error occurred while retrieving residential properties by rooms" });
        });
};