var smart = require("smartweb");
var  qs=require('querystring')
var db=require('../model/liteDb');

module.exports = {
	post: function(req, res) {
		console.log("doLogin:post() starting");
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
				checkPass(ret,function(flag) {
					if(flag==1) {
						req.session.username=ret.username;
						res.end(JSON.stringify({'code':0,'msg':'check password succcessful'}));		
					}
					else {
						res.end(JSON.stringify({'code':-1,'msg':'check username and password failed'}));
					}
				});
			}catch(err){
				res.end(JSON.stringify({'code':-1,'msg':'check username and password failed'}));
			}
		})
	}
};

function checkPass(ret, fn) {
	var flag=0;
	db.query("select password from users where username=?",[ret.username],function(result){
		if(result.rows.length>0) {
			var row=result.rows[0];
			var dbPass=row["PASSWORD"];
			if(dbPass==ret.password) {
				flag=1;
			}
		}
		fn(flag);
	});
}