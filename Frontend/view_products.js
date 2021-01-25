
document.addEventListener('DOMContentLoaded',showProducts);

function showProducts(){
    (async () => {
 
        const result = await fetch('http://localhost:5000/api/v1/products', {
            headers: { "Access-Control-Allow-Origin": "http://localhost:5000/api/v1/products" }
        });

        const article = await result.json()

        let output = '';

        article.data.recordset.forEach(function(ab,index){
            output += `
            <tr> 
                       <td ></td><td></td>
                       <td class="text-center">${index+1}</td>
                       
                       <td class="text-center">${ab.product_title}</td>
                       <td class="text-center"><img id='cartImage'  src='../public/uploads/${ab.product_image}'></td>
                       <td class="text-center">${ab.product_price}/-</td>
                       
                      
                         
    
                    
                       <button  type='submit'class='btn btn-primary' name='update'>Update</button>
                       </td>
                       <td ></td>
                       <td class="text-center">
                       <button  type='submit'class='btn btn-danger' name='delete'>Delete</button>
                       </td>
                       <td class="text-center"> 
            </tr>
          `;
          });
    
         
        
          document.getElementById('cartTableBody').innerHTML = output;
      

    })();
}
