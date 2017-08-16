module.exports = function TreeNode(data){
	this.parent = null;
	this.children = [];
	this.depth;	
	this.data;
}
TreeNode.prototype.addChild = function(data){
	var node = new TreeNode(data);
	node.depth = this.depth + 1;
	node.data = data;
	node.parent = this;
	this.children.push(node);	
}
