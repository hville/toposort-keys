module.exports = topoSortKeys

/**
 * reverse Khan algorithm
 * @param {Object} dag - dag map
 * @param {function} predFcn - predecessor key
 * @param {Array} [lastSort] - keys
 * @returns {Array} - sorted key list
 */
function topoSortKeys(dag, predFcn, lastSort) {
	// count of successors and sort test
	var ids = lastSort || getKeys(dag),
			sNs = count(dag, predFcn, ids)
	if (sNs === true) return ids

	// assign nodes without successors at end
	var i = ids.length,
			ie = i,
			is = i
	while (i--) if (!sNs[ids[i]]) ids[--ie] = ids[i]
	while (is > ie) {
		var eps = predFcn(dag, ids[--is])
		if (eps) for (var p of eps) if (!--sNs[p]) ids[--ie] = p
	}
	return is ? null : ids
}
// count of successors and sort test
function count(dag, predFcn, ids) {
	var isSort = true,
			sNs = {}
	for (var i=0; i<ids.length; ++i) {
		var sps = predFcn(dag, ids[i])
		if (isSort && sNs[ids[i]]) isSort = false
		if (sps) for (var p of sps) sNs[p] = 1 + (sNs[p] || 0)
	}
	return isSort || sNs
}
// get keys or indices
function getKeys(o) {
	if (Array.isArray(o)) return o.map(getIndex)
	return Object.keys(o)
}
function getIndex(v, i) { return i }
