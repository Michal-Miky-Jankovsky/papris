"use strict";

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("shapes", function () {
	let getRawShapes = require("../src/shapes").getRawShapes;
	let getShapes = require("../src/shapes").getShapes;
	let getWidth = require("../src/shapes").getWidth;
	let getHeight = require("../src/shapes").getHeight;
	let getHandleRow = require("../src/shapes").getHandleRow;
	let getRotatedClone180 = require("../src/shapes").getRotatedClone180;

	it("getRawShapes", function () {
		assert.deepEqual(getRawShapes(),
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
			]
		);
	});

	it("getShapes", function () {
		assert.deepEqual(getShapes(),
			[
				[
					[1, 0],
					[1, 0],
					[1, 0],
					[1, 1],
				],
				[
					[1, 0],
					[1, 1],
					[1, 0],
				],
				[
					[1, 1, 0],
					[0, 1, 0],
					[0, 1, 0],
					[0, 1, 1],
				],
				[
					[1],
					[1],
				],
				[
					[1, 0],
					[1, 1],
				]
			]
		);
	});

	it("getRotatedClone180", function () {
		assert.deepEqual(getRotatedClone180(
			[
				[1, 2]
			]),
			[
				[2, 1]
			]);
		assert.deepEqual(getRotatedClone180(
			[
				[1],
				[2]
			]),
			[
				[2],
				[1]
			]);
		assert.deepEqual(getRotatedClone180(
			[
				[1, 2],
				[3, 4],
			]),
			[
				[4, 3],
				[2, 1],
			]);
	});


	it("getWidth", function () {
		let shapes = getShapes();

		expect(getWidth(shapes[0])).to.equal(2);
		expect(getWidth(shapes[1])).to.equal(2);
		expect(getWidth(shapes[2])).to.equal(3);
		expect(getWidth(shapes[3])).to.equal(1);
		expect(getWidth(shapes[4])).to.equal(2);
	});

	it("getHeight", function () {
		let shapes = getShapes();

		expect(getHeight(shapes[0])).to.equal(4);
		expect(getHeight(shapes[1])).to.equal(3);
		expect(getHeight(shapes[2])).to.equal(4);
		expect(getHeight(shapes[3])).to.equal(2);
		expect(getHeight(shapes[4])).to.equal(2);
	});


	it("getHandleRow", function () {
		let shapes = getShapes();

		expect(getHandleRow(shapes[0])).to.equal(0);
		expect(getHandleRow(shapes[1])).to.equal(0);
		expect(getHandleRow(shapes[2])).to.equal(0);
		expect(getHandleRow(shapes[3])).to.equal(0);
		expect(getHandleRow(shapes[4])).to.equal(0);

		let shape = [
			[0, 1],
			[0, 1],
			[1, 1],
		];
		expect(getHandleRow(shape)).to.equal(2);
	});

});
