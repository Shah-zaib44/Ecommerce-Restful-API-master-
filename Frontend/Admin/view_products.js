
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
                       <td class="${ab.product_id}" ></td>
                       <td class="text-center">${index+1}</td>
                       <td class="text-center">${ab.product_category}</td>
                       <td class="text-center">${ab.product_title}</td>
                       <td class="text-center"><img id='cartImage'  src='../public/uploads/${ab.product_image}'></td>
                       <td class="text-center">${ab.product_price}/-</td>
                       
                      
                         
                       <td class="text-center"> 
    
                    
                       <button  type='submit' id="update" class='btn btn-primary btn_update'  name='update'>Update</button>
                       </td>
                       <td class="text-center">
                       <button  type='submit' id="delete" class='btn btn-danger btn_delete' name='delete'>Delete</button>
                       </td>
                       <td ></td>
            </tr>
          `;
          });
    
         
        
          document.getElementById('cartTableBody').innerHTML = output;
        
          let p=document.getElementsByClassName('btn_update')
         
          for (let i = 0; i < p.length; i++) {
              let input = p[i]
              input.addEventListener('click', updateProduct)
          }
          let q=document.getElementsByClassName('btn_delete')
         
          for (let i = 0; i < q.length; i++) {
              let input = q[i]
              input.addEventListener('click', deleteProduct)
          }
    })();
}
