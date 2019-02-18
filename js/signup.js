window.onload = function signup () {
	document.getElementById('signupF').addEventListener('submit', register)

	function register(e) {
		e.preventDefault()
		var email = document.getElementById('email').value;
		var username = document.getElementById('username').value;
		var firstname = document.getElementById('firstname').value;
		var lastname = document.getElementById('lastname').value;
		var phoneNumber = document.getElementById('phonenumber').value;
		var password = document.getElementById('psw').value;
		var userData = {
			email:email,
			username:username,
			firstname:firstname,
			lastname:lastname,
			phoneNumber:phoneNumber,
			password:password,
            
		};
		

		fetch('https://ireporter-challenge-3r.herokuapp.com/register', {
			method:'POST',
			mode:'cors',
			headers:{
				'content-Type':'application/json',
				'Accept':'application/json'
			},
			body:JSON.stringify(userData)
		}).then(resp => resp.json())
		.then(response =>{
			if (response['status'] == 201){
				redirect:window.location.replace('userLogin.html')
			}
			else{
				alert(response['message'])
				redirect:window.location.replace('#')
			};
		} )
}
}
