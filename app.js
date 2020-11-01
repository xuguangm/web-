const express= require ('express');
const app=express();
//引入中间件模块body-parser
const bodyParser=require('body-parser');
//引入用户路由器
const userRouter=require('./router/user.js');
//console.log(userRouter);
app.listen(8080);

//静态托管资源到public目录
app.use(express.static('./public'));
//应用中间件body-parser将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
  extended:false
}));




//路由器放最后
//挂载用户路由器，添加前缀
app.use('/user',userRouter);













