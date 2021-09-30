var smart = require("smartweb");

module.exports = {
	get: function(req, res) {
		console.log("index:get() starting");
		if(!req.session.username) {
			res.writeHead(302, {'Location': 'login.do'});
			res.end();
			return;
		}
		smart.showView(res, "frame/index.htm", "");
	}
};