const matrix = require("../src/matrix");


module.exports = {
	/**
	 * Render matrix
	 * @param {Matrix} _matrix
	 */
	matrix: (_matrix) => {
		if (!_matrix) {
			console.log("invalid matrix");
			return;
		}
		_matrix.map((row) => {
			console.log(
				row
					.map((item) => {
						return item === matrix.NONE ? " " : item;
					})
					.join(" ")
			);
		});
		console.log("");
	}
};

