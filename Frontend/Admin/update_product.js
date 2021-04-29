function updateProduct(e){
  let product_id=e.target.parentElement.parentElement.childNodes[1].className
  let product_category=e.target.parentElement.parentElement.childNodes[5].innerText
  let product_title=e.target.parentElement.parentElement.childNodes[7].innerText
  let product_image=e.target.parentElement.parentElement.childNodes[9].childNodes[0].src
  let product_price=e.target.parentElement.parentElement.childNodes[11].innerText

  let a=`
  
<br><br>
<div class="container">
 <h1 class="offset-2 text-center">Update Product</h1>
<br>
<form class="update_product">
<div class="form-group  form-inline col-6 offset-4">
      <label for="sel1" class="col-4">Product Category</label>
      <select class="form-control" class="col-8"id="sel1"name="product_category">
        <option class="product_category"  >${product_category}</option>
        <option>Laptop</option>
        <option>Mobile</option>
        <option>Computer</option>
        <option>Camera</option>
        <option >Earphone</option>
        
      </select>
      </div>
  <div class="form-group  form-inline col-6 offset-4">
    <label for="exampleInputEmail1" class="col-4 ">Product Title</label>
    <input type="text" class="form-control col-8 product_title" name="product_title" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Title " value="${product_title}"  >
    
  </div>
  <div class="form-group  form-inline col-6 offset-4">
    <label for="exampleInputEmail1" class="col-4 ">Product Price</label>
    <input type="number" class="form-control col-8 product_price" name="product_price" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Price" value="${parseInt(product_price)}" >
    
  </div>
  <div class="form-group   form-inline col-6 offset-4">
    <label for="exampleInputEmail1" class=" col-4 ">Product Image</label>
    <div class="form-group"> 
                
                <input class="form-control-file product_image"type="file" id="file" name="file">
               
            </div>
            <div class="offset-4 image">
            ${product_image}
             </div>   
    
  </div>
  
 
  
  <button type="submit" class="btn btn-primary col-6 offset-4 btn_submit btn_update_product" name="update_product">Update Product</button>

</form>

</div>`;

let b=document.querySelector('.body');
 b.innerHTML=a;
 document.querySelector('.product_image').addEventListener('click',function(){
  document.querySelector('.image').style.display='none';
  
});
document.querySelector('.btn_update_product').addEventListener('click',function(e){
  let updated_product_image;
  let updated_product_title=document.querySelector('.product_title').value
  let updated_product_category=document.querySelector('.product_category').innerHTML
  let updated_product_price=document.querySelector('.product_price').value

   
  pi=document.querySelector('.image')
  if(pi.style.display=='none')
  {
    updated_product_image=document.querySelector('.product_image').value
  }
  else{
    updated_product_image=product_image
  }
  console.log(updated_product_title,updated_product_category,updated_product_price,updated_product_image)

  
  let myForm = document.querySelector('.update_product');
  console.log(myForm)
  let formData = new FormData(myForm);
  formData.append('product_id',product_id)
	fetch(`http://localhost:5000/api/v1/products/${product_id}`, {
		method: 'put',
		body: formData
	})
	.then(response => response.json())
	.then(function (response) {
  if(response.success==true)
  {
    console.log(response)
    // window.location.href='../Frontend/view_products.html'
  }
  else{
    console.log(response)
    // window.location.href='../Frontend/login.html'
  }
  });
  e.preventDefault();
})
  
e.preventDefault();
}