var CodeTreeNode = require("./codeTreeNode.js");
var RenderTree = require("./renderTree.js");
function CodeTree(rows){
	this.root = null;
	RenderTree.call(this,this.root);
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
module.exports = CodeTree;


