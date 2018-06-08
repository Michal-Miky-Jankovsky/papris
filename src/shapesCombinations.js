let shapesLib = require("../src/shapes");

function reducerSum(accumulator, currentValue) {
	return accumulator + currentValue;
}

/**
 * Generate minimal combinations
 * @param {Array.<Shape>} shapes
 */
function generate(shapes) {
	let counts = [];
	let allCombinations = shapes.map(
		(shape) => {
			let variants = shapesLib.getShapeVariants(shape);
			counts.push(variants.length);

			return variants
		}
	);

	// immediate end
	if (counts.reduce(reducerSum) === allCombinations.length) {
		return shapes;
	}
	let out;
	allCombinations.forEach((oneShapeCombinations, index) => {
		if (index === 0) {
			out = oneShapeCombinations;
		} else {

		}
	})


}

module.exports = {
	generate
};