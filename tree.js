function Tree(root){
	this.root = root;
	// this.options = options?options:{};
}
Tree.prototype.getMaxDepth = function(){
	var maxDepth;
	function visit(treeNode){
		maxDepth = Math.max(treeNode.depth,maxDepth);	
	}
	this.dfs(visit);
	return maxDepth;
}
Tree.prototype.dfs = function(visit){
	function dfs(treeNode){
		var index;
		var length = treeNode.children.length;
		var children = treeNode.children;
		if(visit(treeNode)) return;
		if(length===0){
			return;	
		}else{
			for(index=0;index<length;index++){
				dfs(children[index]);	
			}
		}
	
	}
	dfs(this.root);	
}
Tree.prototype.bfs = function(visit){
	var pointer=0, nodes = [], children;
	
	if(!this.root){
		return;
	}
	nodes.push(this.root);
	while(pointer<nodes.length){
		visit(nodes[pointer]);
		children = null;
		children = nodes[pointer].children;
		if(children)
			nodes = nodes.concat(children);
		pointer++;
	}

}
module.exports = Tree;
