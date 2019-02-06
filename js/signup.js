window.onload = function signup () {
	document.getElementById('signupF').addEventListener('submit', register)

	function register(e) {
		e.preventDefault()
		var email = document.getElementById('email').value;
		var username = document.getElementById('username').value;
		var firstname = document.getElementById('firstname').value;
		var lastname = document.getElementById('lastname').value;
		var isAdmin = document.getElementById('role').value;
		var phoneNumber = document.getElementById('phonenumber').value;
		var password = document.getElementById('psw').value;
		var userData = {
			email:email,
			username:username,
			firstname:firstname,
			lastname:lastname,
			phoneNumber:phoneNumber,
			password:password,
            isAdmin:isAdmin
		};
		

		fetch('http://127.0.0.1:5000/register', {
			method:'POST',
			mode:'cors',
			headers:{
				'content-Type':'application/json',
				'Accept':'application/json'
			},
			body:JSON.stringify(userData)
		}).then(resp => resp.json())
		.then(response =>{
			if (response['status'] == 201 && response['data'][0]['user']['isAdmin']=='True'){
				redirect:window.location.replace('admin.html')
			tkn = response['data'][0]['token'];
			localStorage.setItem('access', tkn);
			localStorage.setItem('user', username);
			}
			else if (response['status'] == 201 && response['data'][0]['user']['isAdmin']=='False') {
				redirect:window.location.replace('user.html')
			tkn = response['data'][0]['token'];
			localStorage.setItem('access', tkn);
			localStorage.setItem('user', username);
			}
			else{
				alert(response['message'])
				redirect:window.location.replace('#')
			};
		} )
}
}
