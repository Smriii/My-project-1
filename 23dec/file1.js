//File Systems & Streams
//Asynchronous read
// const fs=require('fs');
// fs.readFile("input.txt", function(err,data){
//     if(err){
//         return console.log(err);
//     }
//     console.log('Asynchronous read' + data.toString());
// });


//Synchronous read
// const fs=require('fs');
// const data=fs.readFileSync('input.txt');
// console.log('Synchronous read:' + data.toString());
// console.log('Hi');


//Promise based reading a file
const fs=require('node:fs/promises');
async function example(){
    try{
        const data = await fs.readFile('input.txt', {encoding: 'utf8'});
        console.log(data);
    }
    catch(err){
        console.log(err);
    }
}

example();