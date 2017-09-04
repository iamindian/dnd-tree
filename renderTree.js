require("./raphael-util.js");
var Raphael = require("Raphael");
var Tree = require("./tree.js");
function RenderTree(root,options){
		
		this.root = root;
		var elements = [];
		var optionTemplate = {}
			optionTemplate.distance = {x:120,y:50};
			optionTemplate.pos = {x:20,y:20,w:700,h:700};
			optionTemplate.r = 20;
			optionTemplate.background = "#ffffff";
			optionTemplate.rect = {
				w:100,h:25
			};
			optionTemplate.edit = false;
			//optionTemplate.rectangler = {width:100,height:100};
		if(!options){
			this.options = optionTemplate;
		}else{
			this.options = Object.assign(optionTemplate,options);
		}
		this.options.root = this.options.root?this.options.root:{pos:{}};
		this.maxX = 0;//树最右边节点中心x最大值
		this.maxY = 0;//树最右边节点中心y最大值
		this.minX = 0; //树最左边节点中心x最小值
		this.minY = 0;	//树最左边节点中心y最小值
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
			var distanceY = this.options.distance.y;
			var distanceX = this.options.distance.x;
			var minY = this.options.rect.h/2;
			var minX = this.options.rect.w/2;
			var index=0;
			function computeLeaf(leaf){//计算叶子的位置
				leaf.pos.y = this.minY + distanceY * index;
				leaf.pos.x = this.minX + leaf.depth * distanceX;
				this.paint(leaf);
				index++;
				this.maxY = leaf.pos.y;
				this.maxX = Math.max(this.maxX,leaf.pos.x);
			}
			//debugger;
			this.dfsLeaves(computeLeaf.bind(this));
			function computeBranchsFromLeaf2(leaf){
				var parent = leaf.parent,
				firstChild = null,
				lastChild = null,
				children = null,
				cLength = null,
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
			this.paper.setSize(this.maxX + this.options.rect.w/2, this.maxY + this.options.rect.h/2);//调整画布大小
}
RenderTree.prototype.calMinValue = function(){
	var leavesTotal = this.countLeaves();

	/*this.options.root.pos.y = this.options.pos.h/2;
	this.options.root.pos.x = this.options.pos.x + this.options.r;*/
	
	if(!leavesTotal){//单节点情况
		this.minY = this.options.pos.h/2;
		this.minX = this.options.pos.x + this.options.rect.w/2;
	}else{	//多节点情况

		this.minY = this.options.rect.h/2;
		this.minX = this.options.pos.x + this.options.rect.w/2;
	}
}
RenderTree.prototype.paint = function(treeNode) {
	//this.elementTreeNodeMapper.push(treeNode);//添加指向树节点的变量到elementTreeNodeMapper
	//console.log("value:%s,x:%s,y:%s",treeNode.data,treeNode.pos.x,treeNode.pos.y);
	var x = treeNode.pos.x;
	var y = treeNode.pos.y;
	/*if (treeNode.ns) {
		treeNode.ns.forEach(function (e){
			if(e.type=="text"){
				e.attr('text',treeNode.data);
			}
		});
		treeNode.ns.translate(x, y);
	}else{*/
		var rNodeSet = this.paper.set();
		var w = this.options.rect.w;
		var h = this.options.rect.h;
		var rect = this.paper.rect(-w/2,-h/2,w,h,10);
		rect.attr("fill", "#738edf");
		rect.data("treeNode",treeNode);
		if(this.options.edit)
			rect.data("edit",true);
		else
			rect.data("edit",false);
		rect.node.style = "cursor:grabbing;";
		/*var circle = this.paper.circle(0, 0, this.options.r);
		 circle.attr("fill", "#ff3355");
		 circle.data("treeNode",treeNode);
		 circle.node.style = "cursor:grabbing;";*/
		var text = this.paper.text(0, 0, treeNode.data).attr({fill: '#ffffff'});
		//text.data(this.elementTreeNodeMapper.length-1);//把在elementTreeNodeMapper中指向最近树节点的变量索引添加到raphael element的data属性
		text.node.setAttribute("pointer-events","none");//不触发事件
		rNodeSet.push(rect);
		rNodeSet.push(text);
		rNodeSet.translate(x,y);
		treeNode.ns = rNodeSet;
		//console.log("tree node data: %s, x: %d, y:%d",treeNode.data, treeNode.pos.x, treeNode.pos.y);
		//console.dir(treeNode.doc);
	/*}*/

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
		var r = this.options.rect.w/2;
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
