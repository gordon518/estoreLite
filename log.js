//to use log4js, npm install --save log4js(windows), or sudo npm install --save log4js(unix)
//define log module
var log4js = require("log4js");

log4js.configure({  
    appenders: [  
      { type: 'console' },
      { type: 'datefile', filename: './logs/system.log',  pattern: '.yyyy-MM-dd',  alwaysIncludePattern: true, category: 'system' }
    ],
    levels: {
        system: 'all',
    },
  });
  
exports.getLog=function() {
	var log = log4js.getLogger('system');
	return(log);
};
