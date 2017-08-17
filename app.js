var CodeTreeNode = require("./codeTreeNode.js");
var CodeTree = require("./codeTree.js");
var Tree = require("./tree.js");
var TreeNode = require("./treeNode.js");
//var a = new CodeTreeNode("a");
var a = new TreeNode("a");
var b = a.addChild("b");
var c = a.addChild("c");
var d = b.addChild("d");
var e = b.addChild("e");
var f = c.addChild("f");
var g = c.addChild("g");
var tree = new Tree(a);
console.log("dfs:");
tree.bfs(function(treeNode){
	console.log(treeNode.data);
});
console.log("bfs:");
tree.dfs(function(treeNode){
	console.log(treeNode.data);
});

var codeTree = new CodeTree();
var row = {"1":1,"2":2,"3":3,"4":4};
var root = codeTree.createNodes(row);
row = {"1":1,"2":21,"3":3,"4":4};
root = codeTree.createNodes(row);
row = {"1":1,"2":22,"3":3,"4":4};
root = codeTree.createNodes(row);
row = {"1":1,"2":2,"3":31,"4":4};
root = codeTree.createNodes(row);
debugger;
codeTree.render();
process.exit(0);
