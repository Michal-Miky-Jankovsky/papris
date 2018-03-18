"use strict";

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("matrix", function () {
	let matrix = require("../src/matrix")


	it("create", function () {
		assert.deepEqual(matrix.createRectangle(2, 2),
			[[0, 0], [0, 0]]);
		assert.deepEqual(matrix.createRectangle(3, 3),
			[[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
		assert.deepEqual(matrix.createRectangle(3, 2),
			[[0, 0, 0], [0, 0, 0]]);
		assert.deepEqual(matrix.createRectangle(2, 3),
			[[0, 0], [0, 0], [0, 0]]);
	});

	describe("shapeFit", () => {
		it('throw', function () {
			expect(() => matrix.shapeFit(null, null, -1, 0)).to.throw();
			expect(() => matrix.shapeFit(null, null, 0, -1)).to.throw();
		});

		let matrix3x3 = matrix.createRectangle(3, 3);
		let shape3x3 = [
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 1]
		];
		let shape2x2 = [
			[1, 1],
			[1, 1]
		];

		it("horizontal RAW (rectangle only) overflow", function () {
			expect(matrix.shapeFit(matrix3x3, shape3x3, 0, 0)).to.equal(true);
			expect(matrix.shapeFit(matrix3x3, shape3x3, 1, 0)).to.equal(false);

			expect(matrix.shapeFit(matrix3x3, shape2x2, 1, 0)).to.equal(true);
			expect(matrix.shapeFit(matrix3x3, shape2x2, 2, 0)).to.equal(false);
		});
		it("vertical RAW (rectangle only) overflow", function () {
			expect(matrix.shapeFit(matrix3x3, shape3x3, 0, 0)).to.equal(true);
			expect(matrix.shapeFit(matrix3x3, shape3x3, 0, 1)).to.equal(false);

			expect(matrix.shapeFit(matrix3x3, shape2x2, 0, 1)).to.equal(true);
			expect(matrix.shapeFit(matrix3x3, shape2x2, 0, 2)).to.equal(false);
		});
	})
});
