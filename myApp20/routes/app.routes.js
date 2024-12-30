module.exports = (app)=>{
    const App = require("../controller/app.controller.js");


app.get("/get-all", App.findAll);
app.get("/message/:messageId", App.findOne);
app.post("/create", App.create);
app.put("/message/:messageId", App.update);
app.delete("/message/:messageId", App.delete);
}