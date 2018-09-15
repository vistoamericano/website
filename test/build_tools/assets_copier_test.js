// * vendor dependencies
const expect = require('chai').expect
const path = require('path')

// * enduro dependencies
const local_enduro = require('../../index').quick_init()
const flat_helpers = require(enduro.enduro_path + '/libs/flat_db/flat_helpers')
const test_utilities = require('../libs/test_utilities')

describe('Static assets copier', function () {

	before(function () {
		return test_utilities.before(local_enduro, 'asset_copier_testfolder')
			.then(() => {
				return enduro.actions.start()
			})
	})

	it('should have copied all images files', function () {
		expect(flat_helpers.file_exists_sync(path.join(enduro.project_path, enduro.config.build_folder, 'assets', 'img', 'imagesgohere.txt'))).to.be.ok
	})

	it('should have copied all fonts files', function () {
		expect(flat_helpers.file_exists_sync(path.join(enduro.project_path, enduro.config.build_folder, 'assets', 'fonts', 'fontsgohere.txt'))).to.be.ok
	})

	it('should have copied all javascript files', function () {
		expect(flat_helpers.file_exists_sync(path.join(enduro.project_path, enduro.config.build_folder, 'assets', 'js', 'main.js'))).to.be.ok
	})

	it('should have copied all admin_extensions files', function () {
		expect(flat_helpers.file_exists_sync(path.join(enduro.project_path, enduro.config.build_folder, 'assets', 'admin_extensions', 'sample_extension.js'))).to.be.ok
	})

	it('should have copied files to root', function () {
		expect(flat_helpers.file_exists_sync(path.join(enduro.project_path, enduro.config.build_folder, 'test.txt'))).to.be.ok
	})

	// navigate back to testfolder
	after(function () {
		return enduro.actions.stop_server()
			.then(() => {
				return test_utilities.after()
			})
	})
})
