var RenderTreeNode = require("./renderTreeNode.js")
var TreeNode = require("./treeNode.js")
function CodeTreeNode(data){
	RenderTreeNode.call(this,data);
}
CodeTreeNode.prototype = new RenderTreeNode();
CodeTreeNode.prototype.constructor = CodeTreeNode;
CodeTreeNode.prototype.addChild = function(data){
	return TreeNode.prototype.addChild.call(this, data);
}
module.exports = CodeTreeNode;