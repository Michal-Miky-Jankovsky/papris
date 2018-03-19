"use strict";

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

		for (let row = 0; row < height; row++) {
			let rowItems = List();
			for (let column = 0; column < width; column++) {
				rowItems = rowItems.push(EMPTY);
			}
			matrix = matrix.push(rowItems);
		}

		return matrix;
	},
	/**
	 *
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
	 *
	 * @param {Matrix} matrix
	 * @param {Shape} shape
	 * @param {number} x
	 * @param {number} y
	 */
	tryToPlaceShape: (matrix, shape, x, y) => {
		let collision = false;

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

		return collision === true ? false : matrix;
	},
	isSolved: (matrix) => {
		return matrix.every((row) => {
			return row.every((cellValue) => {
				return cellValue !== EMPTY && cellValue !== NONE;
			})
		})
	},
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