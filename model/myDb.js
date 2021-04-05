//before use this function, need to use the following command to install mysql module: 
//npm install --save mysql
//npm install --save async

var mysql = require('mysql');
var async = require("async");

function getConnection(callback) {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'estore',
		port:3306 
	});
	connection.connect(function(err) {
		if(err) {
			console.log(err);
			return null;
		}
		callback(connection);
	});
}

exports.getConn=function(callback) {
	getConnection(callback);
}

exports.query=function(sql,fn) {
	var result={err:null};
	getConnection(function(conn) {
		conn.query(sql, function(err, rows, fields) {
			if (err) {
				//throw err;
				console.log(err);
				result.err=err;
			}
			else {
				console.log('run sql:'+sql);
				result.rows=rows;
				result.fields=fields;
			}
			conn.end(function(e){
				if(e) {
					console.log(e);
					if(!result.err)
						result.err=e;
				}
				fn(result);
			});
		});	
	});
}

exports.queryWithParam=function(sql,param,fn) {
	var result={err:null};
	getConnection(function(conn) {
		conn.query(sql, param,function(err, rows, fields) {
			if (err) {
				//throw err;
				console.log(err);
				result.err=err;
			}
			else {
				console.log('run sql:'+sql+",param:"+param);
				result.rows=rows;
				result.fields=fields;
			}
			conn.end(function(e){
				if(e) {
					console.log(e);
					if(!result.err)
						result.err=e;
				}
				fn(result);
			});
		});	
	});
}

//transaction module, call example
/*
var sqlparams = [ 
    {
        sql:"insert table set a=?, b=? where 1=1",
        param: ['Wilson', 55]
    },
    {
        sql:"update ...",
        param: []       
    }
];

doTrans(sqlparams, function(err, info){
	if(err){
	   console.error("transaction failed");
	}else{
	   console.log("transaction done.");
	}
})
*/

function _getNewSqlParamEntity(sql, params, callback) {
	if (callback) {
		return callback(null, {
			sql: sql,
			params: params
		});
	}
	return {
		sql: sql,
		params: params
	};
}

//module.exports = {
//    execTrans: execTrans,
//}

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "estore",
    connectionLimit: 10,
    port: "3306",
    waitForConnections: false
});

function execTrans(sqlparamsEntities, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err, null);
        }
        connection.beginTransaction(function (err) {
            if (err) {
                return callback(err, null);
            }
            console.log("begin transaction, having statements length:" + sqlparamsEntities.length);
            var funcAry = [];
            sqlparamsEntities.forEach(function (sql_param) {
                var temp = function (cb) {
                    var sql = sql_param.sql;
                    var param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                console.log("Transaction failed, " + sql_param + "，ERROR：" + tErr);
                                throw tErr;
                            });
                        } else {
                            return cb(null, 'ok');
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (err, result) {
                if (err) {
                    console.log("async.series error: " + err);
                    connection.rollback(function (err) {
                        console.log("rollback error: " + err);
                        connection.release();
                        return callback(err, null);
                    });
                } else {
                    connection.commit(function (err, info) {
                        console.log("transaction info: " + JSON.stringify(info));
                        if (err) {
                            console.log("commit failed, " + err);
                            connection.rollback(function (err) {
                                console.log("rollback error: " + err);
                                connection.release();
                                return callback(err, null);
                            });
                        } else {
                            connection.release();
                            return callback(null, info);
                        }
                    })
                }
            })
        });
    });
}

exports.doTrans=function(sqlparams,callback) {
    var sqlParamsEntity = [];
    for(i=0; i<sqlparams.length; i++) {
        var sp=sqlparams[i];
        var sql=sp.sql;
        var param=sp.param;
        sqlParamsEntity.push(_getNewSqlParamEntity(sql, param));
    }
    execTrans(sqlParamsEntity,callback);
}