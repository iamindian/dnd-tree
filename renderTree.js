require("./raphael-util.js")
var Raphael = require("Raphael");
var Tree = require("./tree.js");
function RenderTree(root,options){
		this.paper = Raphael(0,0,1440,900);
		this.paper.canvas.style.backgroundColor = '#3344ff';
		this.mixY;
		this.minX;
		this.root = root;
		this.options = options?options:{};
		this.options.distance = {x:200,y:150};
		this.options.pos = {x:1440/2,y:900/2};
		this.options.r = 50;
		this.options.rectangler = {width:100,height:100};
		Tree.call(this,root);
}
RenderTree.prototype = new Tree();
RenderTree.prototype.constructor = RenderTree;
RenderTree.prototype.render = function(paint,connect){
			this.calMinValue();
			var distanceY = this.options.distance.y;
			var distanceX = this.options.distance.x;
			var minY = this.minY;
			var minX = this.minX;
			var index=0;
			function computeLeaf(leaf){//计算叶子的位置
				leaf.pos.y = minY + distanceY*index;
				leaf.pos.x = minX + leaf.depth * distanceX;
				this.paint(leaf);
				index++;
			}
			this.traverseLeaves(computeLeaf.bind(this));
			function computeBranchsFromLeaf(leaf){
				var current = leaf.parent;
				var children,cLength,firstChild,lastChild;
				while(current){
					children = current.children;
					cLength = children.length;
					firstChild = null;
					lastChild = null;
				 	if(cLength===1){ //只有一个子节点时
				 		current.pos.y = children[0].pos.y;
				 		current.pos.x = this.minX + current.depth * distanceX;
				 	}else{ //有多个子节点时
				 		firstChild = children[0];
				 		lastChild = children[children.length-1];
				 		current.pos.y = firstChild.pos.y + (lastChild.pos.y - firstChild.pos.y)/2;//基于第一个子节点的位置计算
				 		current.pos.x = this.minX + current.depth * distanceX;
				 	}
				 	this.paint(current);
				 	if(current.parent){
						if(current.breadth!==current.parent.children.length-1) //如果最近节点不是最后一个子节点
							current = null;//不再计算父节 因为缺乏相邻节点的位置数据
						else
							current = current.parent;
					}else{
						current = null;
					}
				 	
				 
				} 
			}
			this.traverseLeaves(computeBranchsFromLeaf.bind(this));
			this.bfs(this.connection.bind(this));
}
RenderTree.prototype.calMinValue = function(){
	var leavesTotal = this.countLeaves();
	if(!leavesTotal){//单节点情况
		this.minY = this.options.pos.y;
		this.minX = this.options.pos.x;
	}else{	//多节点情况
		this.minY = this.options.pos.y - this.options.distance.y * (leavesTotal-1)/2;
		this.minX = this.options.pos.x;
	}
}
RenderTree.prototype.paint = function(treeNode){
	console.log("value:%s,x:%s,y:%s",treeNode.data,treeNode.pos.x,treeNode.pos.y);
	var x = treeNode.pos.x;
	var y = treeNode.pos.y;
	var rNodeSet = this.paper.set();
	var circle = this.paper.circle(0, 0, this.options.r);
	circle.attr("fill", "#ff3355");
	var text = this.paper.text(0, 0, treeNode.data).attr({fill: '#000000'})
	rNodeSet.push(circle);
	rNodeSet.push(text);
	rNodeSet.translate(x,y);


}
RenderTree.prototype.connection = function(treeNode){
	if(treeNode.parent){
		var r = this.options.r;
		var ppos = treeNode.parent.pos;
		var pos = treeNode.pos;
		var pcos = {
			x: ppos.x + r,
			y: ppos.y
		};
		var cos = {
			x: pos.x - r,
			y: pos.y
		};
		this.paper.line(pcos.x,pcos.y,cos.x,cos.y);
	}
}
module.exports = RenderTree
