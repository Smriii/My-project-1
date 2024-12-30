//fs.writeFile(path,data,options,callback)

const fs=require('fs');
console.log("writing into the file...");
fs.writeFile("input1.txt","This is write file",function(err){
    if(err){
    return console.log(err);
    }
    console.log("Data is written successfully");

    fs.readFile("input1.txt",function(err,data){
        if(err){
            return console.error(err);
        }
        console.log('Read operation done successfully', + data.toString())
    });
});