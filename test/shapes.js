"use strict";

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("shapes", function () {
	let shapes = require("../src/shapes");

	describe("getShapes", () => {

		it("getRawShapes", function () {
			assert.deepEqual(shapes.getRawShapes(),
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
			assert.deepEqual(shapes.getShapes(),
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
	});

	describe("get dimensions",()=>{
		it("getWidth", function () {
			let allRawShapes = shapes.getShapes();

			expect(shapes.getNotNormalizedWidth(allRawShapes[0])).to.equal(2);
			expect(shapes.getNotNormalizedWidth(allRawShapes[1])).to.equal(2);
			expect(shapes.getNotNormalizedWidth(allRawShapes[2])).to.equal(3);
			expect(shapes.getNotNormalizedWidth(allRawShapes[3])).to.equal(1);
			expect(shapes.getNotNormalizedWidth(allRawShapes[4])).to.equal(2);
		});

		it("getWidth", function () {
			let allShapes = shapes.getShapes();

			expect(shapes.getWidth(allShapes[0])).to.equal(2);
			expect(shapes.getWidth(allShapes[1])).to.equal(2);
			expect(shapes.getWidth(allShapes[2])).to.equal(3);
			expect(shapes.getWidth(allShapes[3])).to.equal(1);
			expect(shapes.getWidth(allShapes[4])).to.equal(2);
		});

		it("getHeight", function () {
			let allShapes = shapes.getShapes();

			expect(shapes.getHeight(allShapes[0])).to.equal(4);
			expect(shapes.getHeight(allShapes[1])).to.equal(3);
			expect(shapes.getHeight(allShapes[2])).to.equal(4);
			expect(shapes.getHeight(allShapes[3])).to.equal(2);
			expect(shapes.getHeight(allShapes[4])).to.equal(2);
		});
	});

	describe("rotation",()=>{

		it("getRotatedClone90", function () {
			assert.deepEqual(shapes.getRotatedClone90(
				[
					[1, 2]
				]),
				[
					[1],
					[2]
				]);
			assert.deepEqual(shapes.getRotatedClone90(
				[
					[1],
					[2]
				]),
				[
					[2, 1]
				]);
			assert.deepEqual(shapes.getRotatedClone90(
				[
					[1, 2],
					[3, 4],
				]),
				[
					[3, 1],
					[4, 2],
				]);
		});

		it("getRotatedClone180", function () {
			assert.deepEqual(shapes.getRotatedClone180(
				[
					[1, 2]
				]),
				[
					[2, 1]
				]);
			assert.deepEqual(shapes.getRotatedClone180(
				[
					[1],
					[2]
				]),
				[
					[2],
					[1]
				]);
			assert.deepEqual(shapes.getRotatedClone180(
				[
					[1, 2],
					[3, 4],
				]),
				[
					[4, 3],
					[2, 1],
				]);
		});

		it("getRotatedClone270", function () {
			assert.deepEqual(shapes.getRotatedClone270(
				[
					[1, 2]
				]),
				[
					[2],
					[1]
				]);
			assert.deepEqual(shapes.getRotatedClone270(
				[
					[1],
					[2]
				]),
				[
					[1, 2]
				]);
			assert.deepEqual(shapes.getRotatedClone270(
				[
					[1, 2],
					[3, 4],
				]),
				[
					[2, 4],
					[1, 3],
				]);
		});

	});


	it("getHandleRow", function () {
		let allShapes = shapes.getShapes();

		expect(shapes.getHandleRow(allShapes[0])).to.equal(0);
		expect(shapes.getHandleRow(allShapes[1])).to.equal(0);
		expect(shapes.getHandleRow(allShapes[2])).to.equal(0);
		expect(shapes.getHandleRow(allShapes[3])).to.equal(0);
		expect(shapes.getHandleRow(allShapes[4])).to.equal(0);

		let shape = [
			[0, 1],
			[0, 1],
			[1, 1],
		];
		expect(shapes.getHandleRow(shape)).to.equal(2);
	});


	it("areSameShapes", function () {
		expect(shapes.areSameShapes(
			[
				[1, 2],
				[3, 4]
			],
			[
				[1, 2],
				[3, 4]
			]
		)).to.equal(true);
		expect(shapes.areSameShapes(
			[
				[1, 2],
				[3, 4]
			],
			[
				[1, 2, 0],
				[3, 4]
			]
		)).to.equal(false);
		expect(shapes.areSameShapes(
			[
				[1, 2],
				[3, 4]
			],
			[
				[1, 2],
				[3, 4],
				[0]
			]
		)).to.equal(false);
		expect(shapes.areSameShapes(
			[
				[1, 2],
				[3, 4]
			],
			[
				[1, 2],
				[4, 3]
			]
		)).to.equal(false);
		expect(shapes.areSameShapes(
			[
				[1, 0],
				[1, 1]
			],
			[
				[1, 1],
				[1, 0]
			]
		)).to.equal(false);
	});

	it("getShapeVariants", function () {
		assert.deepEqual(shapes.getShapeVariants(
			[
				[1, 1],
				[1, 1]
			]),
			[
				[
					[1, 1],
					[1, 1]
				]
			]);
		assert.deepEqual(shapes.getShapeVariants(
			[
				[1],
				[1]
			]),
			[
				[
					[1],
					[1]
				],
				[
					[1, 1]
				]
			]);
		assert.deepEqual(shapes.getShapeVariants(
			[
				[1, 0],
				[1, 1]
			]),
			[
				[
					[1, 0],
					[1, 1],
				],
				[
					[1, 1],
					[1, 0],
				],
				[
					[1, 1],
					[0, 1],
				],
				[
					[0, 1],
					[1, 1],
				],
			]);
	});


});
