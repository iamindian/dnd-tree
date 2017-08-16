require("codeTreeNode");
module.exports = function CodeTree(data){

}
CodeTree.prototype.addChild = function(data){

}
CodeTree.prototype.search = function(row){
	var dim;
	var dims = row;
	var dimIndex = 0;
	var dimsLength = dims.length;
	function callback(treeNode){
		console.log(treeNode.data);
	}
	function dfs(treeNode,dims,dimIndex,dimsLength,callback){
		var children = treeNode.children;
		var cLength = children.length;
		var i;
		if(treeNode.data===dims[dimIndex]){ //纬度的值已经找到
			if(dimIndex===dimsLength-1){ //如果该纬度是最后的维度则返回节点
				console.log(treeNode.data);
				return treeNode;
			}else{//若果最近纬度不是最后维度 则按照下一个维度的值找节点
				dimIndex++;
				for(i=0;i<cLength;i++){
					dfs(treeNode,dims,dimIndex,dimsLength,callback);
				}
			}
		}
	
	}
	dfs(this.root,dims,dimIndex,dimsLength,callback);	
}
