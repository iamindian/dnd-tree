var CodeTreeNode = require("./codeTreeNode.js");
var CodeTree = require("./codeTree.js");
var Tree = require("./tree.js");
var TreeNode = require("./treeNode.js");
//var a = new CodeTreeNode("a");
/*var a = new TreeNode("a");
var b = a.addChild("b");
var c = a.addChild("c");
var d = b.addChild("d");
var e = b.addChild("e");
var f = c.addChild("f");
var g = c.addChild("g");
var tree = new Tree(a);*/
/*console.log("dfs:");
tree.bfs(function(treeNode){
	console.log(treeNode.data);
});
console.log("bfs:");
tree.dfs(function(treeNode){
	console.log(treeNode.data);
});*/

var codeTree = new CodeTree({id:1,pos:{x:20,y:0,w:500,h:500}});
var row,root;
row = {"1":"1","2":"2","3":"3","4":"4"};
codeTree.createNodes(row);
row = {"1":"1","2":"3","3":"2","4":"5"};
codeTree.createNodes(row);
row = {"1":"1","2":"3","3":"5","4":"2"};
codeTree.createNodes(row);
codeTree.render();


var codeTree2 = new CodeTree({id:2,pos:{x:20,y:0,w:500,h:500}});
row = {"1":"1","2":"2","3":"3","4":"4"};
codeTree2.createNodes(row);
row = {"1":"1","2":"4","3":"4","4":"6"};
codeTree2.createNodes(row);
codeTree2.render();
//console.dir(codeTree.getRows());
var container = document.getElementById("container");
var from,to;
container.addEventListener("mousedown",function(e){
	from = null;
	var element = document.elementFromPoint(e.clientX,e.clientY);
	
	if(!element)
		return;
	//console.log(element);
	if(element.tagName==="circle"){
		from = element;
	}
});
container.addEventListener("mouseup",function(e){
	to = null;
	var element = document.elementFromPoint(e.clientX,e.clientY);
	if(!element)
		return;
	//console.log(element);
	if(element.tagName==="circle"){
		to = element;
	}
	if(!to||!from){
		return;
	}
	if(to.parentElement.parentElement.id!=='1'){
		return;
	}
	if(from.parentElement.parentElement.id!=='2'){
		return;
	}
	//console.log(codeTree.paper.getById(to.raphaelid).data());
	//console.log(codeTree2.paper.getById(from.raphaelid).data());
	var toTreeNode = codeTree.paper.getById(to.raphaelid).data("treeNode");
	var fromTreeNode = codeTree2.paper.getById(from.raphaelid).data("treeNode");
	//console.log(codeTree.getParentsAsRow(toTreeNode));
	console.log(codeTree2.getChildrenAsRows(fromTreeNode));
	var parentRow = codeTree.getParentsAsRow(toTreeNode);
	var childrenRows = codeTree2.getChildrenAsRows(fromTreeNode);
	var i = 0;
	var paths = [];
	while(i<childrenRows.length){
		paths.push(parentRow.concat(childrenRows[i]));
		i++;
	}
	console.dir(paths);
	i = 0;
	while(i < paths.length){
		codeTree.createNodes(paths[i]);
		i++;
	}
	codeTree.render();
	//console.dir(codeTree.getRows());
	//console.dir(codeTree.root);
});
//console.dir(codeTree.paper);
//console.log("count leaves: %s",codeTree.countLeaves() );
/*if(process){
	process.exit(0);
}*/

