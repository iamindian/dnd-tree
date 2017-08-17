function TreeNode(data){
	this.parent = null;
	this.children = [];
	this.depth = 0;	
	this.breadth = 0;
	this.data = data;
}
TreeNode.prototype.addChild = function(data){
	var node = new this.constructor(data);
	node.depth = this.depth + 1;
	node.parent = this;
	this.children.push(node);	
	node.breadth = this.children.length - 1;
	return node;
}
module.exports = TreeNode;