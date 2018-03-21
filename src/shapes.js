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
	let width = getWidth(shape),
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
 * Get width of shape
 * longest array means width
 * @param {Shape} shape
 */
function getWidth(shape) {
	let max = 0;

	for (let row of shape) {
		if (row.length > max) {
			max = row.length;
		}
	}
	return max;
}

function getValue(shape) {
	for (let row of shape) {
		for (let value of row) {
			if (value !== EMPTY) {
				return value;
			}
		}
	}

	throw "no value";
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

module.exports = {
	EMPTY,
	fillZeros,
	getShapes,
	getRawShapes,
	getWidth,
	getHeight,
	getHandleRow,
	getRotatedClone180
};