var smart = require("smartweb");
var db=require('../../model/liteDb');

module.exports = {
	get: function(req, res) {
		console.log("userList:get() starting");
		if(!req.session.username) {
			res.writeHead(302, {'Location': 'login.do'});
			res.end();
			return;
		}
		db.query("select username,password,freezed from users", [], function(rst){
			var data={ rowset: JSON.stringify(rst.rows) };
			smart.showView(res, "frame/userList.ejs", data);
		});
	}
};