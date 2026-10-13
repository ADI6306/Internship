function calculateArea(length = 5, width = 4) {
	return length * width;
}

const calculateAreaArrow = (length = 5, width = 4) => length * width;

console.log(`Standard Function Area (Default 5x4): ${calculateArea()}`);
console.log(`Arrow Function Area (Custom 10x3): ${calculateAreaArrow(10, 3)}`);

{
	let blockVar = "I am inside the block";
}

try {
	console.log(blockVar);
} catch (error) {
	console.log(`Scope Test Error: ${error.name}: ${error.message} (when accessed outside block)`);
}