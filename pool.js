const mysql=require('mysql');
//创建连接池对象
const pool=mysql.createPool({
host:'127.0.0.1',
port:'3306',
user:'root',
password:'',
database:'xz',
connectionLimit:'15' //设置连接池中连接的数量
});
 //导出连接池对象
 
module.exports=pool;