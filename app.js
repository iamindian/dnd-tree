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
var context;
var codeTree = new CodeTree({ id: 1, pos: { x: 20, y: 0, w: 500, h: 500 } });
var row, root;
row = { "1": "1", "2": "2", "3": "3", "4": "4" };
codeTree.createNodes(row);
row = { "1": "1", "2": "3", "3": "2", "4": "5" };
codeTree.createNodes(row);
row = { "1": "1", "2": "3", "3": "5", "4": "2" };
codeTree.createNodes(row);
codeTree.render();


var codeTree2 = new CodeTree({ id: 2, pos: { x: 20, y: 0, w: 500, h: 500 } });
row = { "1": "1", "2": "2", "3": "3", "4": "4" };
codeTree2.createNodes(row);
row = { "1": "1", "2": "4", "3": "4", "4": "6" };
codeTree2.createNodes(row);
codeTree2.render();
//console.dir(codeTree.getRows());
var container = document.getElementById("container");
var from, to;
var timer;

document.addEventListener("DOMContentLoaded",function() {

    context = document.createElement("div");
    context.dataset.id = "";
    context.id = "context";
    context.style.display = "none";
    context.style.position = "fixed";
    context.innerHTML = "<ul style='list-style:none;margin:0px;padding:0px;font:10px;background-color:#00eeff'><li data-action='add'>add</li><li data-action='remove'>remove</li></ul>";
    document.body.appendChild(context);

    container.addEventListener("mousedown", function(e) {
        from = null;
        var element = document.elementFromPoint(e.clientX, e.clientY);

        if (!element)
            return;
        //console.log(element);
        if (element.tagName === "circle") {
            from = element;
        }
    });

    container.addEventListener("dblclick", function(e) {
        var element = document.elementFromPoint(e.clientX, e.clientY);
        if(element.tagName!=="circle")
        	return;
        var id = element.raphaelid;
        console.log("raphael id: %s", id);
        var treeNode = codeTree.paper.getById(id).data("treeNode");
        console.dir(treeNode);
        var value = prompt("please enter a new value");
        if(!value)
        	return;
        treeNode.data = value;
        codeTree.render();

    });
    function contextClick(e){
    	var target, relatedTarget;
        target = e.target;
        relatedTarget = e.relatedTarget;
    	var context = e.target.closest("#context");
    	if(!context)
    		return;
    	
        var id = context.dataset.id;
        console.log("raphael id: %s",id);
        var treeNode = codeTree.paper.getById(id).data("treeNode");
        //console.dir(treeNode);
        var action = target.dataset.action;
        switch(action){
        	case "add":
        		var value = prompt("please enter a new value");
        		if(value)
        			treeNode.addChild(value);
        		codeTree.render();
        	break;
        	case "remove":
        		treeNode.remove();
        		console.dir(codeTree.root);
        		codeTree.render();
        	break;
        }
        hideContext();

    }
    container.addEventListener("click", contextClick.bind(this));
    container.addEventListener("mouseup", function(e) {
        to = null;
        var element = document.elementFromPoint(e.clientX, e.clientY);
        if (!element)
            return;
        //console.log(element);
        if (element.tagName === "circle") {
            to = element;
        }
        if (!to || !from) {
            return;
        }
        if (to.parentElement.parentElement.id !== '1') {
            return;
        }
        if (from.parentElement.parentElement.id !== '2') {
            return;
        }
        //console.log(codeTree.paper.getById(to.raphaelid).data());
        //console.log(codeTree2.paper.getById(from.raphaelid).data());
        var toTreeNode = codeTree.paper.getById(to.raphaelid).data("treeNode");
        var fromTreeNode = codeTree2.paper.getById(from.raphaelid).data("treeNode");
        //console.log(codeTree.getParentsAsRow(toTreeNode));
        //console.log(codeTree2.getChildrenAsRows(fromTreeNode));
        var parentRow = codeTree.getParentsAsRow(toTreeNode);
        var childrenRows = codeTree2.getChildrenAsRows(fromTreeNode);
        var i = 0;
        var paths = [];
        while (i < childrenRows.length) {
            paths.push(parentRow.concat(childrenRows[i]));
            i++;
        }
        //console.dir(paths);
        i = 0;
        while (i < paths.length) {
            codeTree.createNodes(paths[i]);
            i++;
        }

        codeTree.render();
        //console.dir(codeTree.getRows());
        //console.dir(codeTree.root);
    });


    function mouseoverCircle(e) {
        var target, relatedTarget;
        target = e.target;
        relatedTarget = e.relatedTarget;
        if (target.tagName === "circle") {
            clearTimeout(timer);
            var element = document.elementFromPoint(e.clientX, e.clientY);
            var rect = element.getBoundingClientRect();
            //console.log("offsetLeft:%d", rect.left);
            //console.log("offsetTop:%d", rect.top);
            context.style.top = rect.top + "px";
            context.style.left = rect.right + "px";
            context.style.display = "block";
            context.dataset.id = target.raphaelid;
            //console.dir(target);
        }

    }

    function mouseoverContext(e) {
        var target, relatedTarget;
        target = e.target;
        relatedTarget = e.relatedTarget;
        if (target.closest("#context")) {
            clearTimeout(timer);
        }
    }
    container.addEventListener("mouseover", mouseoverCircle.bind(this));
    container.addEventListener("mouseover", mouseoverContext.bind(this));

    function mouseoutFromCircle(e) {

        var target, relatedTarget;
        target = e.target;
        relatedTarget = e.relatedTarget;
        if (target.tagName === "circle") {
            clearTimeout(timer);
            timer = setTimeout(hideContext, 500);

        }
    }

    function mouseoutFromContext(e) {
        var target, relatedTarget;
        target = e.target;
        relatedTarget = e.relatedTarget;
        if (target.closest("#context")) {
            clearTimeout(timer);
            timer = setTimeout(hideContext, 500);

        }
    }
    container.addEventListener("mouseout", mouseoutFromCircle.bind(this));
    container.addEventListener("mouseout", mouseoutFromContext.bind(this));

    function hideContext() {
        context.style.display = "none";
    }

});

//document.addEventListener('contextmenu', event => event.preventDefault());
//console.dir(codeTree.paper);
//console.log("count leaves: %s",codeTree.countLeaves() );
/*if(process){
	process.exit(0);
}*/