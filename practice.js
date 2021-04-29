// HTTP
// const http=require('http');
// let arr=[
//     {rno:1},
//     {rno:2},
//     {rno:3},
// ]
// let arr1=['rno1','rno2','rno3'];
// const server=http.createServer( 
//     function (req,res){
//         //console.log(req);
//         if(req.method == 'POST' && req.url == '/data')
//         {
//         res.setHeader('Content-Type','application/json');
//         let data='';
//         req.on('data', 
//         function (chunk)
//         {
//             data+=chunk;
//                 }
//         )
//         req.on('end', 
//         function ()
//         {
//                  if(data!=''){
//                 res.statusCode=200;
//             arr.push(JSON.parse(data));
//             res.write(JSON.stringify(arr));
//             res.end();
//             }
//             else{
//                 res.statusCode=400;
//                 res.write('data is null');
//                 res.end();
//             }
//         }
//         )
//     }
//     else if(req.method == 'GET' && req.url == '/data')
//         {
//             res.statusCode=200;
//             res.setHeader('Content-Type','application/json');
//         res.write(JSON.stringify(arr));
//             res.end();
//         }
//         // res.write(JSON.stringify(arr));
//          // res.write(arr1.toString());
//          //res.write('Hello world');
//         // res.end();
// }
// );
// server.listen(5000,console.log('server is running'));

//EXPRESS
// const express=require('express');
// const app=express();
// let arr=[
//                 {rno:1},
//                 {rno:2},
//                 {rno:3},
// ]
// let arr1=['rno1','rno2','rno3'];
// app.delete('/data/:rno',
// function(req,res)
// {
//     arr.splice(req.params.rno,1);
//     res.status(200).json(arr);
// }
// )
// app.put('/data/:rno',
// function(req,res)
// {   
//     let data='';
//             req.on('data', 
//             function (chunk)
//             {
//                 data+=chunk;
//                     }
//             )
//             req.on('end', 
//             function ()
//             {
//                      if(data!=''){
//                         arr[req.params.rno]= JSON.parse(data);
//                 res.status(200).json(arr);
//                               }
//                 else{
                  
//                          res.status(400).json({data:null});
//                                  }
//                                 }
//                                 )
//         }
// )
// app.get('/data',
// function(req,res)
// {
//     res.status(200).json(arr);

// }
// )
// app.post('/data',
// function(req,res)
// {
//     let data='';
//             req.on('data', 
//             function (chunk)
//             {
//                 data+=chunk;
//                     }
//             )
//             req.on('end', 
//             function ()
//             {
//                      if(data!=''){
//                     arr.push(JSON.parse(data));
//                 res.status(200).json(arr);
//                               }
//                 else{
                  
//                          res.status(400).json({data:null});
//                                  }
//             }
//             )
//     //res.send('Hello world');
//    // res.send(arr1.toString());
// }
// )
// app.listen(5000,console.log('server is running'));

//DATABASE
// const express=require('express');
// const mssql=require('mssql');
// const app=express();
// let arr=[
//                 {rno:1},
//                 {rno:2},
//                 {rno:3},
// ]
// let arr1=['rno1','rno2','rno3'];
// app.delete('/data/:rno',
// function(req,res)
// {
//     mssql.connect('mssql://sa:abc123@localhost/myshop',
//     function (err) {
//        if (err) 
//        {
//            console.log(err);
//        }
//             var request = new mssql.Request();

// request.query(`delete from products where product_id='${req.params.rno}'`,
// function(err,recordset)
// {
//    if(err){
//        console.log(err);
//    }
//    else{
//        res.status(200).json(recordset);
//    }
// }
// )
//     }
//    )
// }
// )
// app.put('/data/:rno',
// function(req,res)
// {
//     mssql.connect('mssql://sa:abc123@localhost/myshop',
//      function (err) {
//         if (err) 
//         {
//             console.log(err);
//         }
//              var request = new mssql.Request();
//              let data='';
//                          req.on('data', 
//                          function (chunk)
//                          {
//                              data+=chunk;
//                                  }
//                          )
//                          req.on('end', 
//                          function ()
//                          {              
//  request.query(`update products set product_id='${JSON.parse(data).rno}' where product_id='${req.params.rno}'`,
//  function(err,recordset)
// {
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.status(200).json(recordset);
//     }
// }
// )
//      }
//     )
// }
// )
// }
// )
// app.get('/data',
// function(req,res)
// {
//     mssql.connect('mssql://sa:abc123@localhost/myshop',
//      function (err) {
//         if (err) 
//         {
//             console.log(err);
//         }
//              var request = new mssql.Request();

//  request.query(`select * from products`,
//  function(err,recordset)
// {
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.status(200).json(recordset);
//     }
// }
// )
//      }
//     )
// }
// )
// app.post('/data',
// function(req,res)
// {
//     mssql.connect('mssql://sa:abc123@localhost/myshop',
//      function (err) {
//         if (err) 
//         {
//             console.log(err);
//         }
//              var request = new mssql.Request();
//              let data='';
//                          req.on('data', 
//                          function (chunk)
//                          {
//                              data+=chunk;
//                                  }
//                          )
//                          req.on('end', 
//                          function ()
//                          {  
//  request.query(`insert into products (product_id) values ('${JSON.parse(data).rno}')`,
//  function(err,recordset)
// {
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.status(200).json(recordset);
//     }
// }
// )
//      }
//     )
// }
// )
// }
// )
//     //res.send('Hello world');
//    // res.send(arr1.toString());

// app.listen(5000,console.log('server is running'));