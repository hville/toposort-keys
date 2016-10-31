var ct = require('cotest')
var tsk = require('./toposort-keys')

var dag = {}

function getP(d, k) { return d[k].p }
function getA(d, k) { return d[k] }

ct('presorted', function() {
	dag = {
		a: {},
		b: {p:['a']},
		c: {p:['a', 'b']}
	}
	ct('{==}', tsk(dag, getP), ['a', 'b', 'c'])
	ct('{==}', tsk(dag, getP, ['a', 'b', 'c']), ['a', 'b', 'c'])
})
ct('unsorted', function() {
	dag = {
		a: {p:['c', 'b']},
		b: {p:['c']},
		c: {}
	}
	ct('{==}', tsk(dag, getP), ['c', 'b', 'a'])
	ct('{==}', tsk(dag, getP, ['a', 'b', 'c']), ['c', 'b', 'a'])
	ct('{==}', tsk(dag, getP, ['b', 'a', 'c']), ['c', 'b', 'a'])
})
ct('cycle', function() {
	dag = {
		a: {p:['c']},
		b: {p:['a']},
		c: {p:['b']}
	}
	ct('===', tsk(dag, getP), null)
	ct('===', tsk(dag, getP, ['a', 'b', 'c']), null)
})
ct('slack', function() {
	dag = {
		a: {p:[]},
		b: {},
		c: {}
	}
	ct('{==}', tsk(dag, getP), ['a', 'b', 'c'])
	ct('{==}', tsk(dag, getP, ['a', 'b', 'c']), ['a', 'b', 'c'])
	ct('{==}', tsk(dag, getP, ['b', 'a', 'c']), ['b', 'a', 'c'])
})
ct('array dag', function() {
	dag = [
		{p:[]},
		{},
		{p:[1,0]}
	]
	ct('{==}', tsk(dag, getP), [0, 1, 2])
	ct('{==}', tsk(dag, getP, [0, 1, 2]), [0, 1, 2])
	ct('{==}', tsk(dag, getP, [1, 2, 0]), [0, 1, 2])
	ct('{==}', tsk(dag, getP, [2, 0, 1]), [0, 1, 2])
	ct('{==}', tsk(dag, getP, [0, 2, 1]), [0, 1, 2])
	ct('{==}', tsk(dag, getP, [2, 1, 0]), [0, 1, 2])
	ct('{==}', tsk(dag, getP, [1, 0, 2]), [1, 0, 2])
})
ct('array-array', function() {
	dag = [
		[],
		[],
		[1,0]
	]
	ct('{==}', tsk(dag, getA), [0, 1, 2])
	ct('{==}', tsk(dag, getA, [0, 1, 2]), [0, 1, 2])
	ct('{==}', tsk(dag, getA, [1, 2, 0]), [0, 1, 2])
	ct('{==}', tsk(dag, getA, [2, 0, 1]), [0, 1, 2])
	ct('{==}', tsk(dag, getA, [0, 2, 1]), [0, 1, 2])
	ct('{==}', tsk(dag, getA, [2, 1, 0]), [0, 1, 2])
	ct('{==}', tsk(dag, getA, [1, 0, 2]), [1, 0, 2])
})

