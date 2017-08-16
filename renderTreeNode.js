require("treeNode.js")
module.exports = function RenderTreeNode(data){
	TreeNode.call(data);
}
RenderTreeNode.prototype = new TreeNode();
RenderTreeNode.prototype.render = function(){
	function draw(treeNode){
		this.layout(treeNode);
		this.drawRect(treeNode);
		this.drawConnection(treeNode);
	}
	this.dfs(draw);	
}
RenderTreeNode.prototype.layout = function(treeNode){
	if(!treeNode.parent)
		return;
}
RenderTreeNode.prototype.drawRect = function(treeNode){

}
RenderTreeNode.drawConnection =function(treeNode){
	if(!treeNode.parent)
		return;
}
		
	


