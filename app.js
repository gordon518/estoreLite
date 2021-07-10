//to use log4js, npm install --save log4js(windows), or sudo npm install --save log4js(unix)
var smart = require("smartweb");

var log=require('./log').getLog();
log.info("log system started!");

smart.start(80);