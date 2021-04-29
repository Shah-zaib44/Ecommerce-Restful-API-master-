  function deleteProduct(e){
    let product_id=e.target.parentElement.parentElement.childNodes[1].className 
    e.target.parentElement.parentElement.remove();
    
  //   fetch(`http://localhost:5000/api/v1/products/${product_id}`, {
  //       method: 'delete'
       
  //   })
  //   .then(response => response.json())
  //   .then(function (response) {
  // if(response.success==true)
  // {
  //   window.location.href='../Frontend/view_products.html'
  // }
  // else{
  //   window.location.href='../Frontend/login.html'
  // }
  // });

  
e.preventDefault();
}
