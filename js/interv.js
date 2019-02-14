var span = document.getElementsByClassName('closei')[0]
var modal2 = document.getElementById('intervmodal');
function displayinterv(){
    modal2.style.display = "block";
}
span.onclick = function(){
    modal2.style.display = "none";
}

var url = "http://127.0.0.1:5000/ireporter/api/v2/intervention"
var token = localStorage.getItem('access')

document.getElementById('modal-interv').addEventListener('submit', create_intervention)
window.onload =function loggedin() {
	var token = localStorage.getItem('access')
	var user = localStorage.getItem('user')
	var isAdmin = localStorage.getItem('role')
	if (token == "" || isAdmin == true){
		redirect:window.location.replace('user.html')
	}
}

//create intervention


function create_intervention(e) {

	e.preventDefault()
	var location = document.getElementById('location').value;
	var description = document.getElementById('description').value;
	var image = document.getElementById('image').value;
	var video = document.getElementById('video').value;

	var inter_data = {
		location:location,
		description:description,
		image:image,
		video:video,
	} 

	fetch(url,{
		method:'POST',
		mode:'cors',
		headers:{
				'content-Type':'application/json',
				'Accept':'application/json',
				Authorization:`Bearer ${token}`
			},
		body:JSON.stringify(inter_data)
	})
	.then(res => res.json())
	.then(data =>{
		if (data['status']==201){
			alert('created an intervention')
			redirect:window.location.replace('user.html');
		}
		else{
			
			if (data['message']== "token is invalid"){
				redirect:window.location.replace('userLogin.html')
			}
			else{
				alert(data['message'])
			}
		}
	})
}
