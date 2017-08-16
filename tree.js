module.exports = function Tree(root){
	this.root = root; 
}
Tree.prototype.getMaxDepth = function(){
	var maxDepth;
	function visit(treeNode){
		var depth = 0;
		while(treeNode.parent){
			depth++;
			treeNode = treeNode.parent;
		}
		maxDepth = Math.max(depth,maxDepth);	
	}
	this.dfs(visit);
	return maxDepth;
}
Tree.prototype.dfs = function(visit){
	function dfs(treeNode){
		var index;
		var length = treeNode.children.length;
		var children = treeNode.children;
		visit(treeNode);
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
