function TreeNode(data){
	this.parent = null;
	this.children = [];
	this.depth = 0;	
	this.breadth = 0;
	this.data = data;
	this.descendants = 0;
}
TreeNode.prototype.addChild = function(data){
	var node = new this.constructor(data);
	var parent = this;
	node.depth = this.depth + 1;
	node.parent = this;
	this.children.push(node);	
	node.breadth = this.children.length - 1;
	while(parent){
		parent.descendants++;
		parent = parent.parent;
	}
	return node;
}
TreeNode.prototype.remove = function(){

	var parent = this.parent;
	if(!parent)
		return;
	var i = 0;
	var children = parent.children;
	var cLength = children.length;
	for(i=0;i<cLength;i++){
		if(children[i]===this){
			parent.children = children.splice(i,1);
		}
	}
}
module.exports = TreeNode;