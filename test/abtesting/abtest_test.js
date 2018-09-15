// * vendor dependencies
const expect = require('chai').expect
const request = require('request')
const async = require('async')
const _ = require('lodash')

// * enduro dependencies
const local_enduro = require('../../index').quick_init()
const ab_tester = require(enduro.enduro_path + '/libs/ab_testing/ab_tester')
const test_utilities = require('../libs/test_utilities')

describe('A/B testing', function () {
	this.timeout(7000)

	before(function () {
		return test_utilities.before(local_enduro, 'abtest')
			.then(() => {
				return enduro.actions.start()
			})
	})

	it('should make a a/b list', function () {
		return ab_tester.get_ab_list()
			.then((ab_testing_list) => {
				expect(ab_testing_list).to.not.be.empty
				expect(ab_testing_list.index[0].page).to.equal('index')
			})
	})

	it('should serve different at least one different page out of 50 requests', function (done) {

		let responses = []

		async.each(new Array(50), function (file, callback) {
			request('http://localhost:5000/', function (error, response, body) {
				if (error) { console.log(error) }
				responses.push(body)
				callback()
			})
		}, () => {
			expect(Object.keys(_.groupBy(responses))).to.have.length.above(2)
			done()
		})
	})

	after(function () {
		return enduro.actions.stop_server()
			.then(() => {
				return test_utilities.after()
			})
	})

})
