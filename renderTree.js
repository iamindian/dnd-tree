var Tree = require("renderTreeNode.js");
module.exports = function RenderTree(root){
		Tree.call(root);
}
RenderTree.prototype = new Tree();
RenderTree.prototype.render = function(){
		this.dfs(function(treeNode){
			treeNode.render();
		})
}