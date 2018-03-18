"use strict";

const shapes = require("../src/shapes");
const { List } = require('immutable');

const EMPTY = 0;

/**
 * @typedef {Array.<Array.<number>>} Matrix
 */

/**
 * Right maximal index of matrix
 * @param {Matrix} matrix
 * @return {number}
 */
function rightMax(matrix) {
	let rowsLength = matrix.map((row) => row.length);
	return Math.max(...rowsLength);
}

module.exports = {
	/**
	 * Creates rectangle matrix
	 * @param width
	 * @param height
	 * @returns {Matrix}
	 */
	createRectangle: (width, height) => {
		return Array.from(
			Array(height),
			() => Array.from(
				Array(width),
				() => EMPTY
			)
		);
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
		if (shapes.getHeight(shape) + y > matrix.length) {
			return false;
		}

		let matrixBefore = List();
		matrix.map((row)=>{
			let rowList = List();
			row.map((cell)=>{
				rowList = rowList.push(cell);
			});
			matrixBefore = matrixBefore.push(rowList);
		});



		return true;
	}
};