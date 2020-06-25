"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTotalNodesCountInTree = exports.getFlatTree = exports.fixPathsInTree = exports.removePathsInTree = exports.setErrorEmptyValues = exports.getTreeBadFields = exports.getItemByPath = exports.expandTreeSubpath = exports.expandTreePath = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {Immutable.List} path
 * @param {...string} suffix
 * @return {Immutable.List}
 */
var expandTreePath = function expandTreePath(path) {
  for (var _len = arguments.length, suffix = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    suffix[_key - 1] = arguments[_key];
  }

  return path.interpose('children1').withMutations(function (list) {
    list.skip(1);
    list.push.apply(list, suffix);
    return list;
  });
};
/**
 * @param {Immutable.List} path
 * @param {...string} suffix
 * @return {Immutable.List}
 */


exports.expandTreePath = expandTreePath;

var expandTreeSubpath = function expandTreeSubpath(path) {
  for (var _len2 = arguments.length, suffix = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    suffix[_key2 - 1] = arguments[_key2];
  }

  return path.interpose('children1').withMutations(function (list) {
    list.push.apply(list, suffix);
    return list;
  });
};
/**
 * @param {Immutable.Map} path
 * @param {Immutable.List} path
 * @return {Immutable.Map}
 */


exports.expandTreeSubpath = expandTreeSubpath;

var getItemByPath = function getItemByPath(tree, path) {
  var children = new _immutable["default"].OrderedMap(_defineProperty({}, tree.get('id'), tree));
  var res = tree;
  path.forEach(function (id) {
    res = children.get(id);
    children = res.get('children1');
  });
  return res;
};

exports.getItemByPath = getItemByPath;

var getTreeBadFields = function getTreeBadFields(tree) {
  var badFields = [];

  function _processNode(item, path, lev) {
    var id = item.get('id');
    var children = item.get('children1');
    var errorMessage = item.getIn(['properties', 'errorMessage']);
    var field = item.getIn(['properties', 'field']);

    if (errorMessage && errorMessage.length > 0) {
      badFields.push(field);
    }

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, path.concat(id), lev + 1);
      });
    }
  }

  ;
  if (tree) _processNode(tree, [], 0);
  return Array.from(new Set(badFields));
};
/**
 * Set errorMessage and validity to the rule if value is empty
 * @param {Immutable.Map} tree
 * @return {Immutable.Map} tree
 */


exports.getTreeBadFields = getTreeBadFields;

var setErrorEmptyValues = function setErrorEmptyValues(tree) {
  var newTree = tree;

  function _processNode(item, path) {
    var itemPath = path.push(item.get('id'));
    var properties = item.get('properties');
    var type = item.get('type');

    if (properties) {
      if (type && type === 'rule_group') {
        newTree = _checkNestedRule(item.get('children1'), newTree, itemPath);
      }

      var field = properties.get('field');
      var value = properties.get('value');

      if (field) {
        if (value && value.toJS().length > 0 && !value.toJS()[0]) {
          console.log(field);
          newTree = newTree.setIn(expandTreePath(itemPath, 'properties', 'validity'), false);
          newTree = newTree.setIn(expandTreePath(itemPath, 'properties', 'errorMessage'), 'No value selected');
        }
      }
    }

    var children = item.get('children1');

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, itemPath);
      });
    }
  }

  function _checkNestedRule(children, newTree, itemPath) {
    var requiredRules = ['currency', 'value'];
    children.valueSeq().forEach(function (v) {
      if (v.getIn(['properties', 'field']) && v.getIn(['properties', 'field']) !== null) {
        var temp = v.getIn(['properties', 'field']).split('.')[2];
        var index = requiredRules.indexOf(temp);

        if (index !== -1) {
          requiredRules.splice(index, 1);
        }
      }
    });

    if (requiredRules.length > 0) {
      newTree = newTree.setIn(expandTreePath(itemPath, 'properties', 'validity'), false);
      newTree = newTree.setIn(expandTreePath(itemPath, 'properties', 'errorMessage'), 'Required fields are empty');
    }

    return newTree;
  }

  if (tree) _processNode(tree, new _immutable["default"].List());
  return newTree;
};
/**
 * Remove `path` in every item
 * @param {Immutable.Map} tree
 * @return {Immutable.Map} tree
 */


exports.setErrorEmptyValues = setErrorEmptyValues;

var removePathsInTree = function removePathsInTree(tree) {
  var newTree = tree;

  function _processNode(item, path) {
    var itemPath = path.push(item.get('id'));

    if (item.get('path')) {
      newTree = newTree.removeIn(expandTreePath(itemPath, 'path'));
    }

    var children = item.get('children1');

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, itemPath);
      });
    }
  }

  ;

  _processNode(tree, new _immutable["default"].List());

  return newTree;
};
/**
 * Set correct `path` in every item
 * @param {Immutable.Map} tree
 * @return {Immutable.Map} tree
 */


exports.removePathsInTree = removePathsInTree;

var fixPathsInTree = function fixPathsInTree(tree) {
  var newTree = tree;

  function _processNode(item, path, lev) {
    var _id = item.get('id');

    var itemPath = path.push(item.get('id'));
    var currItemPath = item.get('path');

    if (!currItemPath || !currItemPath.equals(itemPath)) {
      newTree = newTree.setIn(expandTreePath(itemPath, 'path'), itemPath);
    }

    var children = item.get('children1');

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, itemPath, lev + 1);
      });
    }
  }

  ;

  _processNode(tree, new _immutable["default"].List(), 0);

  return newTree;
};
/**
 * @param {Immutable.Map} tree
 * @return {Object} {flat, items}
 */


exports.fixPathsInTree = fixPathsInTree;

var getFlatTree = function getFlatTree(tree) {
  var flat = [];
  var items = {};
  var realHeight = 0;

  function _flatizeTree(item, path, insideCollapsed, lev, info, parentType) {
    var type = item.get('type');
    var collapsed = item.get('collapsed');
    var id = item.get('id');
    var children = item.get('children1');
    var childrenIds = children ? children.map(function (_child, childId) {
      return childId;
    }) : null;
    var itemsBefore = flat.length;
    var top = realHeight;
    flat.push(id);
    if (!insideCollapsed) realHeight += 1;
    info.height = (info.height || 0) + 1;

    if (children) {
      var subinfo = {};
      children.map(function (child, _childId) {
        _flatizeTree(child, path.concat(id), insideCollapsed || collapsed, lev + 1, subinfo, type);
      });

      if (!collapsed) {
        info.height = (info.height || 0) + (subinfo.height || 0);
      }
    }

    var itemsAfter = flat.length;
    var _bottom = realHeight;
    var height = info.height;
    items[id] = {
      type: type,
      parent: path.length ? path[path.length - 1] : null,
      parentType: parentType,
      path: path.concat(id),
      lev: lev,
      leaf: !children,
      index: itemsBefore,
      id: id,
      children: childrenIds,
      _top: itemsBefore,
      _height: itemsAfter - itemsBefore,
      top: insideCollapsed ? null : top,
      height: height,
      bottom: (insideCollapsed ? null : top) + height,
      collapsed: collapsed,
      node: item
    };
  }

  _flatizeTree(tree, [], false, 0, {}, null);

  for (var i = 0; i < flat.length; i++) {
    var prevId = i > 0 ? flat[i - 1] : null;
    var nextId = i < flat.length - 1 ? flat[i + 1] : null;
    var item = items[flat[i]];
    item.prev = prevId;
    item.next = nextId;
  }

  return {
    flat: flat,
    items: items
  };
};
/**
 * Returns count of reorderable(!) nodes
 * @param {Immutable.Map} tree
 * @return {Integer}
 */


exports.getFlatTree = getFlatTree;

var getTotalNodesCountInTree = function getTotalNodesCountInTree(tree) {
  if (!tree) return -1;
  var cnt = 0;

  function _processNode(item, path, lev) {
    var id = item.get('id');
    var children = item.get('children1');
    var isRuleGroup = item.get('type') == 'rule_group';
    cnt++; //tip: rules in rule-group can be reordered only inside

    if (children && !isRuleGroup) {
      children.map(function (child, _childId) {
        _processNode(child, path.concat(id), lev + 1);
      });
    }
  }

  ;

  _processNode(tree, [], 0);

  return cnt - 1; // -1 for root
};

exports.getTotalNodesCountInTree = getTotalNodesCountInTree;