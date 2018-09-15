// * vendor dependencies
const expect = require('chai').expect
const path = require('path')
const fs = require('fs')

// * enduro dependencies
const local_enduro = require('../index').quick_init()
const flat_helpers = require(enduro.enduro_path + '/libs/flat_db/flat_helpers')
const babel = require(enduro.enduro_path + '/libs/babel/babel')
const test_utilities = require(enduro.enduro_path + '/test/libs/test_utilities')

describe('Pregeneration', function () {

	before(function () {
		return test_utilities.before(local_enduro, 'testproject_pregeneration')
			.then(() => {
				return babel.add_culture(['fr', 'es'])
			})
			.then(() => {
				return enduro.actions.render()
			})
	})

	it('_settings.css should be pregenerated', function (done) {

		const settings_css_filepath = path.join(enduro.project_path, enduro.config.build_folder, '_prebuilt', '_settings.css')
		expect(flat_helpers.file_exists_sync(settings_css_filepath)).to.be.ok

		fs.readFile(settings_css_filepath, 'utf8', function (err, data) {
			if (err) { return logger.err(err) }
			expect(data).to.contain('full-background')
			done()
		})

	})

	it('_cultures.json should be pregenerated', function () {
		const cultures_json_filepath = path.join(enduro.project_path, enduro.config.build_folder, '_prebuilt', '_cultures.json')
		expect(flat_helpers.file_exists_sync(cultures_json_filepath)).to.be.ok
	})

	after(function () {
		return test_utilities.after()
	})

})
