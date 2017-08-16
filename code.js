var Mock = require("mockjs");
var data = Mock.mock({
	"codes|10":[	
		{"a":"dim-a","b":"dim-b","c":"dim-c","d|+1":1}	
	]
});
console.log(JSON.stringify(data,null,2));
