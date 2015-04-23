var octopus = require('./octopus.js')
octopus.run(function *(thunky){
	var mysql = require('mysql');
	var connection = mysql.createConnection(config.db.mysql.slave())
	connection.connect()
	var sql = 'select * from table'

	var query = thunky(connection.query , connection)  //这里封住函数 以便添加cbk到参数最后
	var row = yield query(sql , [])//通过cbk调用 generate的next(val)方法将val传给row 一切都是异步的 只是看起来像同步
   
	connection.end()
	return row


})(function (err , result){
	console.log('err' ,err)
	console.log('result' , result)
})
