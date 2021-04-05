var smart = require("smartweb");
var  qs=require('querystring')
var db=require('../../model/liteDb');

module.exports = {
	post: function(req, res) {
		//console.log("doLogin:post() starting");
		var arr = [];
		req.on("data",function(data){
			arr.push(data);
		});
		req.on("end",function(){
			var data= Buffer.concat(arr).toString();
			var ret=null;
			res.writeHead(200, {'Content-Type': 'application/json'});
			try{
				ret=qs.parse(data);
				toAddUser(ret,function(result) {
					if(!result.err) {
						res.end(JSON.stringify({'code':0,'msg':'insert succcessful'}));		
					}
					else {
						res.end(JSON.stringify({'code':-1,'msg':'insert failed,err:'+result.err}));
					}
				});
			}catch(err){
				res.end(JSON.stringify({'code':-2,'msg':'insert failed,err:'+err}));
			}
		})
	}
};

function toAddUser(ret, fn) {
	db.exec("insert into users(username,password,freezed) values (?,?,?)",[ret.username,ret.password,ret.freezed],function(result){
		fn(result);
	});
}