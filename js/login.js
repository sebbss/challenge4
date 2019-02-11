window.onload = function loggedon () {
	document.getElementById('loginF').addEventListener('submit', login)

	function login (e) {
		e.preventDefault()
		var username = document.getElementById('username').value;
		var password = document.getElementById('psw').value;

		var logindata = {
					username:username,
					password:password
		};
		

	fetch('http://127.0.0.1:5000/login', {
			method:'POST',
			mode:'cors',
			headers:{
				'content-Type':'application/json',
				'Accept':'application/json'
			},
			body:JSON.stringify(logindata)
	}).then(res => res.json())
	.then(response =>{
		
		if (response['status'] == 200 && response['data'][0]['user']['isAdmin']==true){
				redirect:window.location.replace('admin.html')
			tkn = response['data'][0]['token'];
			localStorage.setItem('access', tkn);
			localStorage.setItem('user', username);
			localStorage.setItem('role', response['data'][0]['user']['isAdmin']);
			}
			else if (response['status'] == 200 && response['data'][0]['user']['isAdmin']==false) {
				redirect:window.location.replace('user.html')
			tkn = response['data'][0]['token'];
			localStorage.setItem('access', tkn);
			localStorage.setItem('user', username);
			localStorage.setItem('role', response['data'][0]['user']['isAdmin']);
			}
			else{
				alert(response['message'])
				redirect:window.location.replace('#')
			};
	})

	}


}

