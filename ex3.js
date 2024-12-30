// let numbers = [1,2,3,4,5,6];

// console.log(filter(numbers,isOdd));
// console.log(filter(numbers,isEven));

// function filter(numbers,callback){
//     let results = [];
//     for(const number of numbers){
//         if(number !== 0 && callback(number)){
//             results.push(number);
//         }
//     }
//     return results;
// }

// function isOdd(number){
//     return number % 2 !== 0;
// }

// function isEven(number){
//     return number % 2===0;
// }





const filters = (numbers, callback) => numbers.filter(callback);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Even numbers:", filters(numbers, num => num % 2 === 0));
console.log("Odd numbers:", filters(numbers, num => num % 2 !== 0)); 
