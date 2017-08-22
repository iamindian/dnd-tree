var CodeTreeNode = require("./codeTreeNode.js");
var RenderTree = require("./renderTree.js");
function CodeTree(options){
	this.root = null;
	if(!options)
		RenderTree.call(this,this.root);
	else
		RenderTree.call(this,this.root,options);
}
CodeTree.prototype = new RenderTree();
CodeTree.prototype.constructor = CodeTree;
CodeTree.prototype.createNodes = function(row){
	var depth = row.length;
	var path = [];
	var prop;
	var i,j;
	var tmp;
	var parent = null;
	var parentChildren = [];
	if(!row)
		return;
	for(prop in row){
		path.push(row[prop]);
	}
	if(!path.length)
		return;
	j=0;
	while(j < path.length){
		if(!parent){
			if(!this.root){
				this.root = new CodeTreeNode(path[j]);
				parent = this.root;
				parentChildren = parent.children;
			}else{
				if(this.root.data===path[j]){
					parent = this.root;
					parentChildren = parent.children;
				}else{
					console.log("tree root does not match");
					return;
				}

			}
		}else{
			if(!parentChildren.length){
				parent = parent.addChild(path[j]);
				parentChildren = parent.children;
			}else{
				tmp = null;
				tmp = find(path[j],parentChildren)
				if(tmp){
					parent = tmp;
					parentChildren = tmp.children;
				}else{
					parent = parent.addChild(path[j]);
					parentChildren = parent.children;
				}
			}
		}
		j++;
	}
	function find(v,parentChildren){
		var i;
		var result = null;
		for(i=0;i<parentChildren.length;i++){
			if(parentChildren[i].data===v)
				result = parentChildren[i];
		}
		return result;
	}
	return this.root;
}
CodeTree.prototype.getParentsAsRow = function(treeNode){
	if(!treeNode)
		return;
	var row = [];
	row.push(treeNode.data);
	var current = treeNode.parent;
	while(current){
		row.push(current.data);
		current = current.parent;
	}
	return row.reverse();
}
CodeTree.prototype.getRows = function(treeNode){
	var rows = [];
	function leaf(treeNode){
		var row = [];
		var current = treeNode;
		while(current){
			row.push(current.data);
			current = current.parent;
		}
		rows.push(row.reverse());
	};
	if(!treeNode){
		this.dfsLeaves(leaf.bind(this),this.root);
	}else{
		this.dfsLeaves(leaf.bind(this),treeNode);
	}
	return rows;
	
}
CodeTree.prototype.getChildrenAsRows = function(treeNode){
	var rows = [];
	function leaf(leaf){
		var row = [];
		var current = leaf;
		while(true){
			if(current===treeNode){
				row.push(current.data);
				break;
			}else{
				row.push(current.data);
			}
			current = current.parent;
		}
		rows.push(row.reverse());
	}
	if(!treeNode){
		return;
	}else{
		this.dfsLeaves(leaf.bind(this),treeNode);
	}
	return rows;
}

module.exports = CodeTree;


