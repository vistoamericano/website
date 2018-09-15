// enduro_nojs
// * ———————————————————————————————————————————————————————— * //
// *	Js_cms helper
// *	Not being compiled for use on client. Only enduro use.
// *	Converts part of cms context into string with js object/array notation
// *	Usable when passing cms static data to client.
// *	Usage:
// *		<script>
// *			const global = {{{js_cms people}}}
// *		</script>
// *
// * ———————————————————————————————————————————————————————— * //

const helper = function () {}

helper.prototype.register = function () {

	const stringify_object = require('stringify-object')

	enduro.templating_engine.registerHelper('js_cms', function (context_object) {
		return stringify_object(context_object, {indent: '	', singleQuotes: true})
	})
}

module.exports = new helper()
