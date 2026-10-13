var name = "Aditya Yadva";
let age = 21;
const isEmployed = false;
const skills = ["HTML", "CSS", "JavaScript"];

console.log(`Name: ${name} (Type: ${typeof name})`);
console.log(`Age: ${age} (Type: ${typeof age})`);
console.log(`Is Employed: ${isEmployed} (Type: ${typeof isEmployed})`);
console.log(`Skills: [${skills.map(skill => JSON.stringify(skill)).join(", ")}] (Type: ${typeof skills})`);
