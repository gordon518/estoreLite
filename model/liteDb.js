//before use this function, need to use the following command to install sqlite module: 
//npm i sqlite3 --save

const path = require('path');
var sqlite3 = require('sqlite3').verbose();

function getSqliteDb(callback) {
/*	var db = new sqlite3.Database(path.resolve(__dirname, '../sqlite/estore.db'), sqlite3.OPEN_READWRITE, function (err) {
		if (err) {
            return console.log(err.message);
        }
        callback(db);
    });*/
	var db = new sqlite3.Database(path.resolve(__dirname, '../sqlite/estore.db'), sqlite3.OPEN_READWRITE, function (err) {
		if (err) {
            return console.log(err.message);
        }
        callback(db);
    });
}

exports.getDb=function(callback) {
	getSqliteDb(callback);
}

exports.query=function(sql,param,fn) {
	var result={err:null};
	getSqliteDb(function(db) {
		db.all(sql, param, function(err, rows) {
			if (err) {
				//throw err;
				console.log('find error: ', err);
				result.err=err;
			}
			else {
				console.log('run sql:'+sql+",param:"+param);
				result.rows=rows;
			}
			db.close(function(e) {
				if(e) {
					console.log(e);
					if(!result.err)
						result.err=e;
				}
				console.log('close sqlite database');
				fn(result);
			});
		});	
	});
}

exports.exec=function(sql,param,fn) {
	var result={err:null};
	getSqliteDb(function(db) {
		db.run(sql, param, function(err) {
			if (err) {
				//throw err;
				console.log(err);
				result.err=err;
			}
			else {
				console.log('run sql:'+sql+",param:"+param);
			}
			db.close(function(e) {
				if(e) {
					console.log(e);
					if(!result.err)
						result.err=e;
				}
				console.log('close sqlite database');
				fn(result);
			});
		});	
	});
}

