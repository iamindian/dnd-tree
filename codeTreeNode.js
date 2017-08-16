require("renderTreeNode")
module.exports = function CodeTreeNode(data){
	RenderTreeNode.call(data);
}
CodeTreeNode.prototype = new RenderTreeNode();
CodeTreeNode.prototype.clone = function(){
	
};