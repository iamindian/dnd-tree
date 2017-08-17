var Tree = require("./tree.js");
function RenderTree(root,options){
		this.root = root;
		this.options = options?options:{};
		this.options.distance = {x:100,y:100};
		this.options.pos = {x:1920/2,y:1080/2};
		this.options.rectangler = {width:100,height:100};
		Tree.call(this,root);
}
RenderTree.prototype = new Tree();
RenderTree.prototype.constructor = RenderTree;
RenderTree.prototype.render = function(){
		this.bfs(this.layout.bind(this));
}
RenderTree.prototype.layout = function(treeNode){
		if(!treeNode.parent){
			treeNode.pos.y = this.options.pos.y;
			treeNode.pos.x = this.options.pos.x;
		}else{
			var parent = treeNode.parent;
			var cLength = parent.children.length;
			var parentY = parent.pos.y;
			var parentX = parent.pos.x;
			var distanceY = this.options.distance.y;
			var distanceX = this.options.distance.x;
			var mostLowest = parentY - (cLength-1)*100/2;
			treeNode.pos.y = mostLowest + treeNode.breadth*distanceY;
			treeNode.pos.x = parentX + treeNode.depth*distanceX;
		}
		console.log("value:%s,x:%s,y:%s",treeNode.data,treeNode.pos.x,treeNode.pos.y);
}
RenderTree.prototype.paint = function(treeNode){
	var x = treeNode.pos.x;
	var y = treeNOde.pos.y;


}
RenderTree.prototype.connection = function(){

}
module.exports = RenderTree
