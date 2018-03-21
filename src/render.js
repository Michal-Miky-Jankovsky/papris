const matrix = require("./matrix");
const shape = require("./shapes");


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
	},
	/**
	 *
	 * @param {Shape} _shape
	 */
	shape: (_shape)=>{
		if (!_shape) {
			console.log("invalid shape");
			return;
		}
		_shape.map((row) => {
			console.log(
				row.join(" ")
			);
		});
		console.log("");
	}
};

