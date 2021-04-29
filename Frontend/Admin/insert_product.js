let a = `<br><br>
<div class="container">
 <h1 class="offset-2 text-center">Insert New Product</h1>
<br>
<form id="form" >
<div class="form-group  form-inline col-6 offset-4">
      <label for="sel1" class="col-4">Product Category</label>
      <select class="form-control" class="col-8"name="product_category" id="product_category">
        <option>Laptop</option>
        <option>Mobile</option>
        <option>Computer</option>
        <option>Camera</option>
        <option >Earphone</option>
      </select>
      </div>
  <div class="form-group  form-inline col-6 offset-4">
    <label for="exampleInputEmail1" class="col-4">Product Title</label>
    <input type="text" class="form-control col-8" name="product_title" id="product_title" aria-describedby="emailHelp" placeholder="Enter Product Title ">
    
  </div>
  <div class="form-group  form-inline col-6 offset-4">
    <label for="exampleInputEmail1" class="col-4">Product Price</label>
    <input type="number" class="form-control col-8" name="product_price" id="product_price" aria-describedby="emailHelp" placeholder="Enter Product Price">
    
  </div>
  <div class="form-group   form-inline col-6 offset-4">
    <label for="exampleInputEmail1"  class=" col-4 ">Product Image</label>
    <div class="form-group"> 
                
                <input class="form-control-file"type="file" id="file" name="file" id="product_image">
               
            </div>
    
  </div>
  
 
  
  <button type="submit" class="btn btn-primary col-6 offset-4" id="insert_product" name="insert_product">Insert New Product</button>

</form>

</div>`;
document.querySelector(".body").innerHTML = a;
const form = {
  form: document.querySelector("#form"),
  insert_product: document.querySelector("#insert_product"),
};
form.insert_product.addEventListener("click", insertProduct);
function insertProduct(e) {
  console.log(form.form);
  let formData = new FormData(form.form);
  fetch("http://localhost:5000/api/v1/products", {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);
      if (response.success == true) {
        window.location.href = "../Frontend/index.html";
      } else {
        window.location.href = "../Frontend/insert_product.html";
      }
      // let token = response.sessionToken;
      // localStorage.setItem('SessionToken', token);
    });
  e.preventDefault();
}
