let btnsubmit=document.querySelector('.btn')
btnsubmit.addEventListener('click',userLogin);
  function userLogin(e){
  let myForm = document.querySelector('.form-signin');
  let formData = new FormData(myForm);
	fetch('http://localhost:5000/api/v1/customer/login', {
		method: 'post',
		body: formData
	})
	.then(response => response.json())
	.then(function (response) {
  if(response.success==true)
  {
    window.location.href='../Frontend/index.html'
  }
  else{
    window.location.href='../Frontend/login.html'
  }
  });
  e.preventDefault();
}