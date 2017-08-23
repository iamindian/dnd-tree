function TreeNode(data){
	this.parent = null;//父节点
	this.children = [];
	this.depth = 0;	//该节点在树中的层级
	this.breadth = 0;//该节点在父节中子节点数组的索引
	this.data = data;//节点中储存的数据
	this.descendants = 0;//该节点所有的子孙后代节点的总数
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
	console.log(children);
	var cLength = children.length;
	for(i=0;i<cLength;i++){
		if(children[i]===this){
			children.splice(i,1);
			break;
		}
	}
	for(;i<cLength;i++){
		if(children[i])
			children[i].breadth--;
	}
	//console.log(children);
}
module.exports = TreeNode;