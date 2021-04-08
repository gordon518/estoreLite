//to use log4js, npm install --save log4js(windows), or sudo npm install --save log4js(unix)
//define log module
var log4js = require("log4js");

log4js.configure({  
	appenders: {
		console: {
			type: 'console'
		},
		infoLogs: { 
    		type: 'dateFile',
      		filename: './logs/system.log',
      		backups:5,  // 仅保留最新的五个日志文件
      		pattern: ".yyyy-MM-dd", // 用于确定何时滚动日志的模式
      		alwaysIncludePattern: true,
      		compress: true
		}
	},
	categories: {
		default: { appenders: [ 'console', 'infoLogs' ], level: 'info' }
	}
});
  
exports.getLog=function() {
	var log = log4js.getLogger('system');
	return(log);
};
