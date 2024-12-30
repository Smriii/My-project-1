module.exports = (app)=>{
    const App = require("../controller/app.controller.js");


app.get("/get-all", App.findAll);
app.get("/properties/:propertyName", App.findByName);
app.post("/create", App.create);
app.put("/properties/:propertyId", App.update);
app.delete("/properties/:propertyName", App.deleteByName);

app.get("/properties/location/:location", App.findByLocation);
app.get("/properties/price/:maxPrice", App.findByPrice);
app.get("/properties/type/:type", App.findByType);
app.get("/properties/residential/:rooms", App.findResidentialByRooms);
}