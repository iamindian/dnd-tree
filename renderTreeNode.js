var TreeNode = require("./treeNode.js")
function RenderTreeNode(data){
	TreeNode.call(this,data);
	this.pos = {x:0,y:0};
}
RenderTreeNode.prototype = new TreeNode();
RenderTreeNode.prototype.constructor = RenderTreeNode;
module.exports = RenderTreeNode;
		
	


