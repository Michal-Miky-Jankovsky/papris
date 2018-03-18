// karma.conf.js
module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ["jasmine", "requirejs"],
		browsers: ['NodeWebkit'],
		files: [
			'tests/**/*.js'
		],
		//...
	});
};