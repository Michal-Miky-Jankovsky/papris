/**
 * @typedef {Array.<Array.<number>>} Shape
 */

const raw =
	[
		[
			[1],
			[1],
			[1],
			[1, 1],
		],
		[
			[1],
			[1, 1],
			[1],
		],
		[
			[1, 1],
			[0, 1],
			[0, 1],
			[0, 1, 1],
		],
		[
			[1],
			[1],
		],
		[
			[1],
			[1, 1],
		]
	];

const EMPTY = 0;

function fillZeros(shape) {
	let width = getNotNormalizedWidth(shape),
		newShape = [];

	for (let row of shape) {
		let newRow = row.slice();
		while (newRow.length < width) {
			newRow.push(EMPTY)
		}
		newShape.push(newRow);
	}

	return newShape;
}

const normalized = raw.map((shape) => {
	return fillZeros(shape);
});

function getRawShapes() {
	return raw;
}

function getShapes() {
	return normalized;
}

/**
 * Get width of (not normalized) shape
 * longest array means width
 * @param {Shape} shape
 */
function getNotNormalizedWidth(shape) {
	let max = 0;

	for (let row of shape) {
		if (row.length > max) {
			max = row.length;
		}
	}
	return max;
}

/**
 * Get width of (normalized) shape
 * longest array means width
 * @param {Shape} shape
 */
function getWidth(shape) {
	return shape[0].length;
}

/**
 * Get height of shape
 * count of rows means width
 * @param {Shape} shape
 */
function getHeight(shape) {
	return shape.length;
}

/**
 * Get height of shape
 * count of rows means width
 * @param {Shape} shape
 */
function getHandleRow(shape) {
	for (let handleRow = 0; handleRow < shape.length; handleRow++) {
		let row = shape[handleRow];
		if (row[0] === 1) {
			return handleRow;
		}
	}
}

/**
 *
 */
function getRotatedClone180(shape) {
	let newShape = Array();

	for (let row of shape) {
		newShape.unshift(
			row
				.slice()
				.reverse()
		);
	}

	return newShape;
}

/**
 *
 */
function getRotatedClone90(shape) {
	let newHeight = shape[0].length,
		newShape = Array.apply(null, Array(newHeight))
			.map(() => []),
		shapeClone = shape.slice();

	for (let row of shapeClone.reverse()) {
		row.forEach((value, index) => {
			newShape[index].push(value);
		});
	}

	return newShape;
}

/**
 *
 */
function getRotatedClone270(shape) {
	let newHeight = shape[0].length,
		newShape = Array.apply(null, Array(newHeight))
			.map(() => []);

	for (let row of shape) {
		row.forEach((value, index) => {
			let reversedIndex = row.length - 1 - index;
			newShape[reversedIndex].push(value);
		});
	}

	return newShape;
}

/**
 *
 * @param {Shape} shape
 */
function getShapeVariants(shape) {
	let rotated90 = getRotatedClone90(shape);

	if (areSameShapes(shape, rotated90)) {
		return [rotated90];
	}

	let rotated180 = getRotatedClone180(shape);

	if (areSameShapes(shape, rotated180)) {
		return [rotated180, rotated90];
	}

	let shapeClone = shape.slice();
	let rotated270 = getRotatedClone270(shape);

	return [shapeClone, rotated90, rotated180, rotated270]
}

function areSameShapes(shape1, shape2) {
	if (shape1.length !== shape2.length) {
		return false;
	}
	if (shape1[0].length !== shape2[0].length) {
		return false;
	}

	return shape1.every((row, rowIndex) =>
		row.every((value, columnIndex) =>
			value === shape2[rowIndex][columnIndex]
		)
	)
}

module.exports = {
	EMPTY,
	fillZeros,
	getShapes,
	getRawShapes,
	getWidth,
	getNotNormalizedWidth,
	getHeight,
	getHandleRow,
	getRotatedClone180,
	getRotatedClone90,
	getRotatedClone270,
	areSameShapes,
	getShapeVariants
};