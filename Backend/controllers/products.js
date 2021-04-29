const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const ErrorResponse = require("../middleware/erroResponse");
const path = require("path");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const crypto = require("crypto");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("../config/db");

const data = [
  {
    id: 1,
    text: "ali",
    desc: "aaa",
  },
  {
    id: 2,
    text: "ramis",
    desc: "bbb",
  },
  {
    id: 3,
    text: "adeel",
    desc: "ccc",
  },
];

// exports.getProducts =asyncHandler((req, res, next) => {
// console.log(req.body)
//   let queryStr=JSON.stringify(req.query);
//     let q=JSON.parse(queryStr);
//       let x,y;
//   let z=[]
//   let p=[]
//   let search;
//   let nextPage,prevPage,lastPage;
//       let limit=0;
//    for (x in q){
//     for(y in q[x]){
//       p.push(x);
//       z.push(y);
//     }
//      }
//   search=`select * from products`;
//   if(z[0]=='lt')
//   {
//     search=`select * from products where product_id<${q[x][z[0]]}`;
//   }
//   else if(z[0]=='gt')
//   {
//     search=`select * from products where product_id>${q[x][z[0]]}`;
//   }
//   else if(z[0]=='lte')
//   {
//     search=`select * from products where product_id<=${q[x][z[0]]}`;
//   }
//   else if(z[0]=='gte')
//   {
//     search=`select * from products where product_id>=${q[x][z[0]]}`;
//   }
//   if(z[0]=='in')
//   {
//     search=`select * from products where product_category in ('${q[x][z[0]]}')`;
//   }
//   else if(x=='select')
//   {
//     search=`select ${q[x]} from products`;
//   }
//   else if(req.query.select&&x=='product_id')
//   {
//     search=`select ${req.query.select} from products where product_id=${q[x]}`;
//   }
//   else if((p[0]=='limit'&&p[1]=='page')||(p[0]=='page'&&p[1]=='limit'))
//   {
//     if(p[0]=='page')
//     {
//       search=`select ${q[p[2]]} from products order by product_category offset ${q[p[0]]} rows fetch next ${q[p[1]]} rows only `;
//       limit=parseInt(q[p[1]]);
//       lastPage=parseInt(q[p[0]])*limit;
//       if(parseInt(q[p[0]])<lastPage)
//       {
//       nextPage=parseInt(q[p[0]])+1;
//       }
//      else if(parseInt(q[p[0]])>0)
//       {
//       prevPage=parseInt(q[p[0]])-1;
//       }
//           }
//     else {
//       search=`select ${q[p[2]]} from products order by product_category offset ${q[p[1]]} rows fetch next ${q[p[0]]} rows only `;
//       limit=parseInt(q[p[0]]);
//       lastPage=parseInt(q[p[1]])*limit;
//       if(parseInt(q[p[1]])<lastPage)
//       {
//         nextPage=parseInt(q[p[1]])+1;
//               }
//  else if(parseInt(q[p[1]])>0)
//       {
//             prevPage=parseInt(q[p[1]])-1;
//       }
//     }
//      }
//     if((z[0]=='gte'&&z[1]=='lte')||(z[0]=='lte'&&z[1]=='gte'))
//   {
//     if(z[0]=='gte')
//     {
//       search=`select * from products where product_id>=${req.query.product_id.gte} and product_id<=${req.query.product_id.lte}  `;
//     }
//     else{
//       search=`select * from products where product_id<=${req.query.product_id.lte} and  product_id>=${req.query.product_id.gte} `;
//     }
//      }
//                     connectDB().request().query(search, function (err, recordset) {
//                 if (err) {
//                       next(err);
//                     }
//                     else {
//                     res.status(200).json({
//                       success: true,
//                       nextPage,
//                       prevPage,
//                       lastPage,
//                       limit,
//                       data: recordset
//                       });
//                     }
//                     });
//       });

// exports.getProduct = asyncHandler((req, res, next) => {
//     connectDB().request().query(`select * from products where product_id=${req.params.id}`, function (err, recordset) {
//                             if (err) {
//                               next(err);
//                             }
//                             else {
//                               res.status(200).json({
//                               success: true,
//                               data: recordset.recordset
//                               });
//                             }
//                         });
//       })
// by using js object
// exports.createProduct = (req, res, next) => {
//                   //  for(let i = 0; i < data.length; i++){
//                   // connectDB().request().query(`insert into products (product_id,product_category,product_title) values ('${data[i].id}','${data[i].text}','${data[i].desc}')`, function (err) {
//                   //     if (err) {
//                   //       next(err);
//                   //     }
//                   //     else {
//                   //     res.status(200).json({
//                   //       success: true,
//                   //       data: 'created'
//                   //       });
//                   //     }
//     // });
//     //               }
// };

// create using body/json

// exports.createProduct =asyncHandler( (req, res, next) => {
//                              let body = [];
//                              req
//                                .on("data", (chunk) => {
//                                  body.push(chunk);
//                                })
//                                .on("end", () => {
//                                  body = Buffer.concat(body).toString();
//                                  const { product_id, product_category,product_title } = JSON.parse(body);
//                                  console.log(product_category)
//                            connectDB().request().query(`insert into products (product_category,product_title) values ('${product_category}','${product_title}')`, function (err) {
//                               if (err)
//{
//                                 next(new ErrorResponse('fail',404));
//                               }
//                               else {
//                                 res.status(200).json({
//                                                          success: true,
//                                                           data: 'created'
//                                                           });
//                                                                // let filename=req.files.file.name+path.parse(req.files.file.name).ext;
//                               }
//                       });
//                     })
// })

// // create using form-data

exports.createProduct = asyncHandler((req, res, next) => {
  // if (!req.files) {
  //   next(new ErrorResponse("please upload a file", 404));
  // }
  // if (!req.files.file.mimetype.startsWith("image")) {
  //   next(new ErrorResponse("please upload a image file", 404));
  // }
  // if (req.files.file.size > process.env.max_file_size) {
  //   next(
  //     new ErrorResponse(
  //       `please upload a image of size less than ${process.env.max_file_size}`,
  //       404
  //     )
  //   );
  console.log(req.files.file.size);
  // }
  let product_category = JSON.parse(JSON.stringify(req.body)).product_category;
  let product_title = JSON.parse(JSON.stringify(req.body)).product_title;
  let product_price = JSON.parse(JSON.stringify(req.body)).product_price;
  let filename = JSON.parse(JSON.stringify(req.files.file)).name;
  console.log(filename);
  console.log(product_title);
  console.log(product_category);
  console.log(product_price);
  // connectDB()
  //   .request()
  //   .query(
  //     `insert into products (product_category,product_title,product_image,product_price) values ('${product_category}','${product_title}','${filename}','${product_price}')`,
  //     function (err) {
  //       if (err) {
  //         console.log(err);
  //         next(new ErrorResponse("fail", 404));
  //       } else {
  //         res.status(200).json({
  //           success: true,
  //           data: "created",
  //         });
  //         // let filename=req.files.file.name+path.parse(req.files.file.name).ext;
  //         req.files.file.mv(
  //           `${process.env.file_upload_path}/${filename}`,
  //           function (err) {
  //             if (err) {
  //               next(new ErrorResponse("problem while uploading a file", 404));
  //             } else {
  //               console.log("file uploaded successfully");
  //             }
  //           }
  //         );
  //       }
  //     }
  //   );
});

// by using js variables

// var id=11;
// var a='Lap';
// var b= 'Dell';

// exports.updateProduct = (req, res, next) => {
//                     connectDB().request().query(`update products set product_id='${id}', product_category='${a}',product_title='${b}' where product_id='${req.params.id}'`, function (err, recordset) {
//                       if (err) {
//                         next(err);
//                       }
//                       else {
//                       res.status(200).json({
//                         success: true,
//                         data: 'updated'
//                         });
//                       }
//           });
// };

// by using body/json
// exports.updateProduct =asyncHandler( (req, res, next) => {
//   let product_price=JSON.parse(JSON.stringify(req.body)).product_price

//   let product_category=JSON.parse(JSON.stringify(req.body)).product_category
//   let  product_title= JSON.parse(JSON.stringify(req.body)).product_title
//   let product_id=JSON.parse(JSON.stringify(req.params)).id
//   console.log(product_category)
//   console.log(product_id)
//                          connectDB().request().query(`update products set  product_category='${product_category}',product_title='${product_title}',product_price='${product_price}' where product_id='${product_id}'`, function (err, recordset) {
//                       if (err) {
//                         next(err);
//                         console.log(err)
//                       }
//                       else {
//                                             res.status(200).json({
//                         success: true,
//                         data: 'updated'
//                         });
//                       }
//           });
//         })

// exports.deleteProduct =asyncHandler( (req, res, next) => {
//   console.log(req)
//   connectDB().request().query(`delete from products where product_id=${req.params.id}`, function (err, recordset) {
//                       if (err) {
//                         next(err);
//                       }
//                       else {
//                       res.status(200).json({
//                         success: true,
//                         data: 'deleted'
//                         });
//                       }
//           });
// })

// exports.registerCustomer =(req, res, next) => {
// const {customer_name,customer_email,customer_pass,customer_contact}= req.body
//         // let salt= await bcrypt.genSalt(10);
//     //  customer_pass=await bcrypt.hash(customer_pass,salt)
//                      if(!customer_id){
//                       next(new ErrorResponse('Please enter customer_id',404));
//                      }
//                            connectDB().request().query(`insert into customers (customer_name,customer_email,customer_pass,
//                                 customer_contact) values ('${customer_name}','${customer_email}','${customer_pass}','${customer_contact}')`, function (err) {
//                               if (err) {
//                                 next(err);
//                               }
//                               else {
//                                 res
//                                 .status(200)
//                                 .json({
//                                   success: true
//                                                                   });
//                                 // let filename=req.files.file.name+path.parse(req.files.file.name).ext;
//                               }
//                                                   });
// }

// exports.loginCustomer =(req, res, next) => {
//   console.log(req)
//   //for form
//       const customer_email=JSON.parse(JSON.stringify(req.body)).c_email;
//       const customer_pass=JSON.parse(JSON.stringify(req.body)).c_pass;
//      // for postman
//       // const customer_email=  req.body.customer_email
//       // const customer_pass=req.body.customer_pass
//      // let salt= await bcrypt.genSalt(10);
//    //  customer_pass=await bcrypt.hash(customer_pass,salt)
//                     let query= `select customer_id,customer_email,customer_pass  from customers where customer_email='${customer_email}' and customer_pass='${customer_pass}' `
//                     connectDB().request().query(query, function (err, recordset) {
//                      if(err)
//                      {
//                      next(err)
//                    }
//                    else{
//                     console.log(recordset)
//                     if(recordset.recordset.length==0)
//                     {
//                       res
//                       .status(404)
//                       .json({
//                         success: false
//                                                         });
//                     }
//                     else{
//                       res
//                       .status(200)
//                       .json({
//                         success: true
//                                                         });
//                     }
//                    }
//                   //   if((customer_email!=recordset.recordset[0].customer_email)&&(customer_pass!=recordset.recordset[0].customer_pass)){
//                   //   next(new ErrorResponse('email and Password both does not match',404));
//                   //  }
//                   // else if(customer_email!=recordset.recordset[0].customer_email){
//                   //   next(new ErrorResponse('email does not match',404));
//                   //                      }
//                   // else if(customer_pass!=recordset.recordset[0].customer_pass){
//                   //   next(new ErrorResponse('Password does not match',404));
//                   //                      }
//                   //   else{
//                   //     sendTokenResponse(recordset.recordset[0].customer_id, 200, res,recordset);
//                   //                       }
//                                        });
//  }

// exports.forgotPassword =(req, res, next) => {
//   const {customer_email}=req.body;
//  // let salt= await bcrypt.genSalt(10);
// //  customer_pass=await bcrypt.hash(customer_pass,salt)
// if(!customer_email){
//   next(new ErrorResponse('Please enter customer_email',404));
//  }
//  const resetToken= getResetPasswordToken(customer_email);
//  console.log(resetToken)
//  const resetUrl= `${req.protocol}://${req.get('host')}/api/v1/customer/resetPassword/${resetToken}`
//  const msg=`you have requested to reset a password. please make a put request to ${resetUrl}`
//  try {

//   sendEmail({
//     email:customer_email,
//     subject:'resetPassword',
//     msg
//   })
//   res
//     .status(200)
//        .json({
//       success: true,
//           msg:'email sent'
//     });
//  }
//   catch (err) {
//    next(new ErrorResponse('email could not be sent'),500)
//  }

//                 let query= `select top 1 customer_id,customer_email,customer_pass,
//                 resetPasswordToken,
//                 resetPasswordExpire  from customers where customer_email='${customer_email}'`
//                 connectDB().request().query(query, function (err, recordset) {
//                  if(err)
//                  {
//                  next(err)
//                }

//                if(recordset.rowsAffected==0)
//                {
//                 next(new ErrorResponse('User does not exist',404));
//                }

//                                    });
// }

//   exports.resetPassword =(req, res, next) => {
//     console.log('reset',req.params.resetToken)
//     const resetPasswordToken = crypto
//      .createHash('sha256')
//   .update(req.params.resetToken)
//   .digest('hex')
//     const {customer_pass}=req.body;
//                   let query= `select customer_id from customers where resetPasswordToken='${resetPasswordToken}' `
//                   connectDB().request().query(query, function (recordset) {
//                     customer_id=recordset.recordset[0].customer_id

//                                                                        });
//     let query1= `update customers set customer_pass='${customer_pass}' resetPasswordToken=' '  where resetPasswordToken='${resetPasswordToken}' `
//      connectDB().request().query(query1, function (err) {
//        if(err){
//         next(new ErrorResponse('token does not exist',404));
//        }
//       else{
//         sendTokenResponse(customer_id, 200, res,'updated');
//                           }
//                                                                            } )

// }

// let getResetPasswordToken = function(customer_email) {
//   const resetToken=crypto.randomBytes(20).toString('hex')
//  const resetPasswordToken = crypto
//   .createHash('sha256')
//   .update(resetToken)
//   .digest('hex')
//   console.log('resetPasswordToken',resetPasswordToken)
//   const resetPasswordExpire=new Date().toLocaleDateString()+10*60*1000

//   let query= `update customers set resetPasswordToken='${resetPasswordToken}',resetPasswordExpire='${resetPasswordExpire}' where customer_email='${customer_email}'`
//   connectDB().request().query(query, function (err, recordset) {
//       }
//   )

//   return resetToken  };

//   getSignedJwtToken = function(user) {
//     return jwt.sign({ id: user }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRE
//     });
//   };

//   const sendTokenResponse = (user, statusCode, res,recordset) => {
//     // Create token
//     const token = getSignedJwtToken(user);
//     const options = {
//       expires: new Date(
//         Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true
//     };
//     if (process.env.NODE_ENV === 'production') {
//       options.secure = true;
//     }
//     res
//       .status(statusCode)
//       .cookie('token', token, options)
//       .json({
//         success: true,
//         token,
//         recordset
//       });
//   };
