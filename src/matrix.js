const shapes = require("../src/shapes");
const {List} = require('immutable');

const EMPTY = 0;
const NONE = null;

/**
 * @typedef {List.<List.<number>>} Matrix immutable
 */

/**
 * Right maximal index of matrix
 * @param {Matrix} matrix
 * @return {number}
 */
function rightMax(matrix) {
	let rowsLength = matrix.map((row) => row.size);
	return Math.max(...rowsLength);
}

module.exports = {
	EMPTY: EMPTY,
	NONE: NONE,
	/**
	 * Creates rectangle matrix
	 * @param width
	 * @param height
	 * @returns {Matrix}
	 */
	createRectangle: (width, height) => {
		let matrix = List();

		return matrix.withMutations((matrix) => {
			for (let row = 0; row < height; row++) {
				let rowItems = List();
				for (let column = 0; column < width; column++) {
					rowItems = rowItems.push(EMPTY);
				}
				matrix = matrix.push(rowItems);
			}
		});
	},
	/**
	 * Test if shape fit into matrix
	 *  - independent on what is in matrix already
	 *  - just if make sense to try
	 * @param {Matrix} matrix
	 * @param {Shape} shape
	 * @param {number} x
	 * @param {number} y
	 */
	shapeFit: (matrix, shape, x, y) => {
		if (x < 0 || y < 0) {
			throw new TypeError("overflow");
		}

		// horizontal RAW (rectangle only) overflow
		// todo other matrix shapes
		if (shapes.getWidth(shape) + x > rightMax(matrix)) {
			return false;
		}
		// vertical RAW (rectangle only) overflow
		// todo other matrix shapes
		if (shapes.getHeight(shape) + y > matrix.size) {
			return false;
		}

		return true;
	},
	/**
	 * Try to place in matrix
	 *  - returns new matrix if no conflict
	 * @param {Matrix} matrix
	 * @param {Shape} shape
	 * @param {number} x
	 * @param {number} y
	 * @return {Matrix|false}
	 */
	tryToPlaceShape: (matrix, shape, x, y) => {
		let collision = false,
			newMatrix;

		newMatrix = matrix.withMutations((matrix) => {
			shape.map((row, rowIndex) => {
				row.map((cellValue, columnIndex) => {
					let y2 = rowIndex + y,
						x2 = columnIndex + x;

					if (matrix.getIn([y2, x2]) === EMPTY) {
						matrix = matrix.setIn([y2, x2], cellValue);
					} else {
						collision = true;
					}
				})
			});
		});

		return collision === true ? false : newMatrix;
	},
	/**
	 * Finally solved
	 *  - all matrix positions all filled
	 * @param {Matrix} matrix
	 * @returns {boolean}
	 */
	isSolved: (matrix) => {
		return matrix.every((row) => {
			return row.every((cellValue) => {
				return cellValue !== EMPTY && cellValue !== NONE;
			})
		})
	},
	/**
	 * Count empty cells
	 * @param {Matrix} matrix
	 * @returns {number}
	 */
	countEmpty: (matrix) => {
		let count = 0;

		matrix.map((row) => {
			row.map((cellValue) => {
				if (cellValue === EMPTY) {
					count++;
				}
			})
		});

		return count;
	}
};