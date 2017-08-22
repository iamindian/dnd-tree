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
Tree.prototype.countLeaves = function(treeNode){
	var total = 0;
	function visit(treeNode){
		total++;
	}
	if(!treeNode){
		this.dfsLeaves(visit.bind(this),this.root);
	}else{
		this.dfsLeaves(visit.bind(this),treeNode);
	}
	return total;
}
Tree.prototype.traverseBranch= function(visit,treeNode){
	
	function traverseBranch(treeNode){
		if(treeNode.children.length)
			visit(treeNode);
	}
	if(!treeNode){
		this.bfs(traverseBranch.bind(this),this.root);
	}else{
		this.bfs(traverseBranch.bind(this),treeNode);
	}
	
}
Tree.prototype.bfsLeaves = function(visit,treeNode){
	
	function traverseLeaves(treeNode){
		if(!treeNode.children.length)
			visit(treeNode);
	}
	
	if(!treeNode){
		this.bfs(traverseLeaves.bind(this),this.root);
	}else{
		this.bfs(traverseLeaves.bind(this),treeNode);
	}
}
Tree.prototype.dfsLeaves = function(visit,treeNode){
	function traverseLeaves(treeNode){
		if(!treeNode.children.length)
			visit(treeNode);
	}
	
	if(!treeNode){
		this.dfs(traverseLeaves.bind(this),this.root);
	}else{
		this.dfs(traverseLeaves.bind(this),treeNode);
	}
}
Tree.prototype.dfs = function(visit,treeNode){
	
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
	if(!treeNode){
		dfs(this.root);
	}else{
		dfs(treeNode);
	}

}
Tree.prototype.bfs = function(visit,treeNode){
	var pointer=0, nodes = [], children;
	if(treeNode){
		nodes.push(treeNode);
	}else{
		if(!this.root){
			return;
		}else{
			nodes.push(this.root);
		}
	}
	while(pointer<nodes.length){
		if(visit(nodes[pointer])) return;
		children = null;
		children = nodes[pointer].children;
		if(children)
			nodes = nodes.concat(children);
		pointer++;
	}


}
module.exports = Tree;
