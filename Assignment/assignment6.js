const products = [
	{ name: "Laptop", price: 800 },
	{ name: "Mouse", price: 25 },
	{ name: "Keyboard", price: 45 }
];

console.log("-- All Products (forEach) --\n");
products.forEach(product => {
	console.log(`Item: ${product.name} - Price: $${product.price}\n`);
});

const filteredProducts = products.filter(product => product.price < 50);
console.log("-- Filtered Products (Price < $50) --\n");
console.log(filteredProducts);

const mappedProductTags = products.map(product => `${product.name.toUpperCase()} costs $${product.price}`);
console.log("\n-- Mapped Product Tags (map) --\n");
console.log(`[ ${mappedProductTags.map(tag => JSON.stringify(tag)).join(", ")} ]`);
