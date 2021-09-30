var smart = require("smartweb");

module.exports = {
	get: function(req, res) {
		console.log("login:get() starting");
		smart.showView(res, "login.htm", "");
	}
};