let expect = require("chai").expect;
let assert = require("chai").assert;

describe("shapesCombinations", function () {
	let combinations = require("../src/shapesCombinations");

	it("3 squares", function () {
		let square = [
			[1, 1],
			[1, 1]
		];

		assert.deepEqual(
			combinations.generate(
				[square, square, square]
			),

			[square, square, square]
		);
	});

	it("3 lines", function () {
		let lineHorizontal = [
			[1, 1]
		];
		let lineVertical = [
			[1],
			[1]
		];

		assert.deepEqual(
			combinations.generate(
				[lineHorizontal, lineHorizontal, lineHorizontal]
			),
			[
				[lineHorizontal, lineHorizontal, lineHorizontal],
				[lineHorizontal, lineHorizontal, lineVertical],
				[lineHorizontal, lineVertical, lineVertical],
				[lineVertical, lineVertical, lineVertical],
			]
		);
	});


});