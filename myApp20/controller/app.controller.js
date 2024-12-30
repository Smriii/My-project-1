const App=require('../models/app.model.js');

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

exports.findOne = (req,res)=>{
    App.findById(req.params.messageId)
    .then((data)=>{
        if(!data){
            return res.status(404).send({
                message:"Message not found with id"+req.params.messageId,
            });
        }
        res.send(data);
    })
}

exports.create = (req,res)=>{
    if(!req.body.name){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }
    const messages = new App({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        difficulty: req.body.difficulty,
    });

    messages
    .save(messages)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message||"Some error occured while creating",
        });
    });
}


exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({
            message: "Data to be updated cannot be empty"
        })
    }
    const id = req.params.messageId;
    App.findByIdAndUpdate(id, req.body,{
        new:true,
        runvalidator: true,
        useFindAndModify: false,
    })
    .then((data)=>{
        if(!data){
            return res.status(404).send({
                message: "Data not found with id"+ id,
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

exports.delete = (req, res)=>{
    App.findByIdAndDelete(req.params.messageId).then((data)=>{
        if(!data){
            return res.status(404)
            .send({
                message: "Data not found with id"+ req.params.messageId,
            })
        }
        res.send({message: "Data deleted successfully"});
    });
}