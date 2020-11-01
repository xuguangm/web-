const express =require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由对象
const r=express.Router();
//1.用户注册  post  /reg
r.post('/reg',(req,res)=>{
	//1.1获取post请求的数据
	let obj=req.body;
	 console.log(obj);
	 //1.2检测各项数据是否为空
	 if (!obj.uname)
	 {
		 res.send({code:401,msg:'uname required'});
	 //阻止往后执行
	    return;
	 }
	 if (!obj.upwd)
	 {
		 res.send({code:402,msg:'upwd required'});
	     return;
	 }
	 if (!obj.email)
	 {
		 res.send({code:403,msg:'email required'});
	     return;
	 }
	 if (!obj.phone)
	 {
		 res.send({code:404,msg:'phone required'});
	     return;
	 }
	 //1.3将数据插入到数据表xz_user中，执行SQL命令
pool.query('insert into xz_user set?',[obj],(err,result)=>{
    if(err) throw err;
    console.log(result);
	res.send({code:200,msg:'注册成功'});;
});
});
//2.用户登录  post /login
r.post('/login',(req,res)=>{
//2.1获取post请求的数据
let obj=req.body;
console.log(obj);
if (!obj.uname)
{
	set.send({code:405,msg:'uname requied'});
    return;
}
if (!obj.upwd)
{
	res.send({code:406,msg:'upwd required'});
 
    return;
}
//执行SQL命令，查询数据库中是否有对应的用户名和密码
pool.query('select * from xz_user where uname=? and upwd=?',
	[obj.uname,obj.upwd],(err,result)=>{
if(err) throw err;
//结果为数组
console.log(result);

//如果是空数组，则说明登录失败，否则登陆成功
if (result.length===0)
{
	res.send({code:301,msg:'登录失败'});
}else{
    res.send({code:200,msg:'登录成功'});
}
});
});
r.post('/update',(req,res)=>{
//3.1获取post请求的数据
let obj=req.body;
console.log(obj);
//3.2检测各项是否为空
//遍历对象obj，得到每个属性的值
let i=400;
for (let k in obj )
{
	//每次循环，状态码加1
	i++;
	//k代表属性名，obj[k]代表属性对应的值
	//console.log(k,obj[k]);
   //判断属性值是否为空,如果为空，提示这项是必须的
   if (!obj[k])
   {
	   res.send({code:i,msg:k+'不能为空'});
   return;
   }
}
//3.3执行SQL命令，修改用户的数据
pool.query('update xz_user set ? where uid=?',
	[obj,obj.uid],(err,result)=>{
if(err) throw err;
//结果是一个对象
console.log(result);
//如果对象下的affectedRows为0，则修改失败，否则修改成功
if(result.affectedRows===0){
res.send({code:301,msg:'修改失败'});
}else{
res.send({code:200,msg:'修改成功'});
}
});
});

//4.用户列表  get /list
r.get('/list',(req,res)=>{
	//4.1获取查询字符串传递的数据
let obj=req.query;
console.log(obj);
//4.2检测各项数据是否为空,如果每页大小为空默认设置为5，
//如果当前页码为空设置默认为1
if (!obj.size)
{
	obj.size=5;
}
if (!obj.pno)
{
	obj.pno=1;
}
console.log(obj);
//4.3计算开始查询的值
let start=(obj.pno-1)*obj.size;
//4.4将每页的大小转为整形
let count=parseInt(obj.size);
//执行SQL命令，查询数据
pool.query('select * from xz_user limit ?,?',
	[start,count],(err,result)=>{
if(err) throw err;
//结果是数组
console.log(result);
//把数组直接响应给浏览器端
res.send(result);
});
});

//5.1获取查询字符串传递的数据
//r.get('/detail',(req,res)=>{});
	/*

let obj=req.query;
console.log(obj);

if (!obj.uid)
{
	res.send({code:401,msg:uid+'不能为空'});
}

pool.query('select * form xz_user where uid=?',
	[obj],(ree,result)=>{
if(err) throw err;
console.log(result);
res.send(result);
});

});
*/
//r.post('/delete',(req,res)=>{
	
//let obj=req.body;
//console.log(obj);
//});
/*
if (!obj.uid)
{
	res.send({code:301,msg:'不能为空'});
}
pool.query('delete from xz_user where uid=?',
	[obj],(err,result)=>{
if(err) throw err;
console.log(result);
if(result.affectedRows===0){
res.send({code:301,msg:'删除失败'});
}else{
res.send({code:200,msg:'删除成功'});
}
});
});
*/

//导出路由器对象
module.exports=r;









