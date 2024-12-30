const express=require("express")
const app=express()

app.get("/login",(req,res)=>{
    res.send("login page");
})

app.get("/about",(req,res)=>{
    res.send("about page");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});