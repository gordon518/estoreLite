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
		smart.showView(res, "frame/userAdd.htm", "");
	}
};