
      const form = {
        form:document.querySelector('#form'),
        insert_product: document.querySelector('#insert_product')
        
    };
   form.insert_product.addEventListener('click', insertProduct);
   function insertProduct(e)  {
       
       let formData = new FormData(form.form);
         fetch('http://localhost:5000/api/v1/products', {
             method: 'post',
             body: formData
         })
         .then(response => response.json())
         .then(function (response) {
             console.log(response)
       if(response.success==true)
       {
         window.location.href='../Frontend/index.html'
       }
       else{
         window.location.href='../Frontend/insert_product.html'
       }
             // let token = response.sessionToken;
             // localStorage.setItem('SessionToken', token);
       });
       e.preventDefault();
     }
   
           
  

    
