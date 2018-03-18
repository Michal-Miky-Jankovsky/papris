let shapes = {};

/**
 * @typedef {Array.<Array.<number>>} Shape
 */

shapes.raw =
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

module.exports = {
	getShapes: function () {
		return shapes.raw;
	},
	/**
	 * Get width of shape
	 * longest array means width
	 * @param {Shape} shape
	 */
	getWidth: function (shape) {
		let max = 0;

		for (let row of shape) {
			if (row.length > max) {
				max = row.length;
			}
		}
		return max;
	},

	/**
	 * Get height of shape
	 * count of rows means width
	 * @param {Shape} shape
	 */
	getHeight: function (shape) {
		return shape.length;
	},

	/**
	 * Get height of shape
	 * count of rows means width
	 * @param {Shape} shape
	 */
	getHandleRow: function (shape) {
		for (let handleRow = 0; handleRow < shape.length; handleRow++) {
			let row = shape[handleRow]
			if (row[0] === 1) {
				return handleRow;
			}
		}
	}

};