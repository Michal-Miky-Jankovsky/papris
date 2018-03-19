"use strict";

let expect = require("chai").expect;
let assert = require("chai").assert;

const {List} = require('immutable');

describe("matrix", function () {
	let matrix = require("../src/matrix");

	it("create", function () {
		expect(matrix.createRectangle(2, 2).equals(
			List([
				List([0, 0]),
				List([0, 0])
			])
		)).to.equal(true);
		expect(matrix.createRectangle(3, 3).equals(
			List([
				List([0, 0, 0]),
				List([0, 0, 0]),
				List([0, 0, 0])
			])
		)).to.equal(true);
		expect(matrix.createRectangle(3, 2).equals(
			List([
				List([0, 0, 0]),
				List([0, 0, 0])
			])
		)).to.equal(true);
		expect(matrix.createRectangle(2, 3).equals(
			List([
				List([0, 0]),
				List([0, 0]),
				List([0, 0])
			])
		)).to.equal(true);
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
	});

	describe("tryToPlaceShape", () => {
		let matrix = require("../src/matrix");
		let matrix3x3 = matrix.createRectangle(3, 3);
		let shape2x2 = [
			[1, 1],
			[1, 1]
		];
		let shape3x1 = [
			[2, 2, 2]
		];
		let shape1x2 = [
			[3],
			[3]
		];

		beforeEach(()=>{
			expect(matrix.isSolved(matrix3x3)).to.equal(false);
			expect(matrix.countEmpty(matrix3x3)).to.equal(9);
		});

		it("happy case", function () {
			let matrixChanged1 = matrix.tryToPlaceShape(matrix3x3, shape2x2, 1, 1)
			expect(matrix.isSolved(matrixChanged1)).to.equal(false);
			expect(matrix.countEmpty(matrixChanged1)).to.equal(5);

			let matrixChanged2 = matrix.tryToPlaceShape(matrixChanged1, shape3x1, 0, 0)
			expect(matrix.isSolved(matrixChanged2)).to.equal(false);
			expect(matrix.countEmpty(matrixChanged2)).to.equal(2);

			let matrixChanged3 = matrix.tryToPlaceShape(matrixChanged2, shape1x2, 0, 1)
			expect(matrix.isSolved(matrixChanged3)).to.equal(true);
			expect(matrix.countEmpty(matrixChanged3)).to.equal(0);
		});

		it("collision", () => {

		});

	})
});
