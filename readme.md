<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 -->
# toposort-keys

*flexible and immutable topological sorting of different DAG structures* -
***small, simple, no dependencies***

• [Example](#example) • [Features](#features) • [API](#api) • [License](#license)

# Example

```javascript
var tsk = require('toposort-keys')

// similar DAG in 2 different shapes
var dag0 = [[1,2],[2],[]],
    dag1 = {a:{preds: ['b', 'c']}, b:{preds: ['c']}, c:{}}

// predecessor accessor functions
function pred0(dag, key) {
  return dag[key]
}
function pred1(dag, key) {
  return dag[key].preds
}

// sorting
var sort0 = tsk(dag0, pred0), // [2, 1, 0]
    sort1 = tsk(dag0, pred0) // ['c', 'b', 'a']

// in-place sorting from previous sort
sort0 = tsk(dag0, pred0, sort0) // [2, 1, 0]
```

# Features

* more flexible than other implementations for different DAG structures
* DAG is not modified
* past sorting orders can be used

# API

`sort(dag, predFcn[, lastSort])`
* `@param {Object} dag` DAG Array, Collection or Object
* `@param {function} predFcn` predecessor accessor function (see below)
* `@param {Array} [lastSort]` optional set of keys for faster parsing
* `@returns {Array}` sorted key list

`predFcn(dag, key)`
* `@param {Object} dag` DAG Array, Collection or Object
* `@param {number|string} key` Object node key or Array node index
* `@returns {Array}` array of predessor keys or indices

# License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
