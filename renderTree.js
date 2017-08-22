require("./raphael-util.js");
var Raphael = require("Raphael");
var Tree = require("./tree.js");
function RenderTree(root,options){
		this.mixY;
		this.minX;
		this.root = root;
		var elements = [];
		var optionTemplate = {}
			optionTemplate.distance = {x:100,y:100};
			optionTemplate.pos = {x:20,y:0,w:600,h:600};
			optionTemplate.r = 20;
			optionTemplate.background = "#005500";
			//optionTemplate.rectangler = {width:100,height:100};
		if(!options){
			this.options = optionTemplate;
		}else{
			this.options = Object.assign(optionTemplate,options);
		}
		this.options.root = this.options.root?this.options.root:{pos:{}};
		Tree.call(this,root);
}
RenderTree.prototype = new Tree();
RenderTree.prototype.constructor = RenderTree;
RenderTree.prototype.render = function(paint,connect){
			this.calMinValue();
			if(!this.paper){
				if(this.options.id){
					this.paper = new Raphael(document.getElementById(this.options.id),this.options.pos.w,this.options.pos.h);
					this.paper.canvas.style.backgroundColor = this.options.background;
					//this.paper.canvas.style.pointerEvents="none";
					//this.paper.initZoom();
				}
				else{
					console.log("no container can be found");
				}

				
			}	
			this.paper.clear();
			//this.elementTreeNodeMapper = [];//清空elementTreeNodeMapper的数据
			var distanceY = this.options.distance.y;
			var distanceX = this.options.distance.x;
			var minY = this.minY;
			var minX = this.minX;
			var index=0;
			function computeLeaf(leaf){//计算叶子的位置
				leaf.pos.y = minY + distanceY * index;
				leaf.pos.x = minX + leaf.depth * distanceX;
				this.paint(leaf);
				index++;
			}
			this.dfsLeaves(computeLeaf.bind(this));
			function computeBranchsFromLeaf(leaf){
				var current = leaf.parent;
				var children,cLength,firstChild,lastChild;
				var childrenHeight;
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
						if(current.breadth!==current.parent.children.length-1) {//如果最近节点不是最后一个子节点
							current = null;//不再计算父节 因为缺乏相邻节点的位置数据
						}else{
							current = current.parent;

						}
					}else{
						current = null;
					}
				 	
				 
				} 
			}
			function computeBranchsFromLeaf2(leaf){
				var parent = leaf.parent,
				firstChild = null,
				lastChild = null,
				children = null,
				cLength = null;
				child = leaf;
				while(parent){
					if(child.breadth!==parent.children.length-1)
						return;
					children = parent.children;
					cLength = children.length;
					firstChild = children[0];
				 	lastChild = children[children.length-1];

					if(parent.children.length===1){
						parent.pos.x = this.minX + this.options.distance.x * parent.depth;
						parent.pos.y = parent.children[0].pos.y;
					}else{
						parent.pos.y = parent.children[0].pos.y + (lastChild.pos.y - firstChild.pos.y)/2;
						parent.pos.x = this.minX + this.options.distance.x * parent.depth;
					}
					this.paint(parent);
					child = parent;
					parent = parent.parent;
				}

			}
			this.dfsLeaves(computeBranchsFromLeaf2.bind(this));
			this.bfs(this.connection.bind(this));
}
RenderTree.prototype.calMinValue = function(){
	var leavesTotal = this.countLeaves();

	/*this.options.root.pos.y = this.options.pos.h/2;
	this.options.root.pos.x = this.options.pos.x + this.options.r;*/
	
	if(!leavesTotal){//单节点情况
		this.minY = this.options.pos.h/2;
		this.minX = this.options.pos.x + this.options.r;
	}else{	//多节点情况
		this.minY = this.options.pos.h/2 - this.options.distance.y * (leavesTotal-1)/2;
		this.minX = this.options.pos.x + this.options.r;
	}
}
RenderTree.prototype.paint = function(treeNode){
	//this.elementTreeNodeMapper.push(treeNode);//添加指向树节点的变量到elementTreeNodeMapper
	//console.log("value:%s,x:%s,y:%s",treeNode.data,treeNode.pos.x,treeNode.pos.y);
	var x = treeNode.pos.x;
	var y = treeNode.pos.y;
	var rNodeSet = this.paper.set();
	var circle = this.paper.circle(0, 0, this.options.r);
	circle.attr("fill", "#ff3355");
	circle.data("treeNode",treeNode);
	circle.node.style = "cursor:grabbing;";
	var text = this.paper.text(0, 0, treeNode.data).attr({fill: '#000000'});
	//text.data(this.elementTreeNodeMapper.length-1);//把在elementTreeNodeMapper中指向最近树节点的变量索引添加到raphael element的data属性
	text.node.setAttribute("pointer-events","none");//不触发事件
	rNodeSet.push(circle);
	rNodeSet.push(text);
	rNodeSet.translate(x,y);
	/*rNodeSet.drag(function move(dx,dy,x,y,e){
		//console.log(e);
	},
	function start(x,y,e){
		//console.log(e);
	},
	function end(e){
		//console.log(e);
	});*/
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
RenderTree.prototype.zoom = function(value){
	
}
module.exports = RenderTree
