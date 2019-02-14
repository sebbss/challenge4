var modal = document.getElementById('flagmodal');
var span = document.getElementsByClassName('close')[0]
function display(){
    modal.style.display = "block";
}

span.onclick = function(){
    modal.style.display = "none";
}

var urlred = "http://127.0.0.1:5000/ireporter/api/v1/flag"
var token = localStorage.getItem('access');

document.getElementById('modal-content').addEventListener('submit', create_redFlag)
window.onload =function loggedin() {
	var token = localStorage.getItem('access')
	var user = localStorage.getItem('user')
	var isAdmin = localStorage.getItem('role')
	if (token == "" || isAdmin == true){
		redirect:window.location.replace('user.html')
	}
}

//create intervention


function create_redFlag(e) {

	e.preventDefault()
	var location = document.getElementById('rlocation').value;
	var description = document.getElementById('rdescription').value;
	var image = document.getElementById('rimage').value;
	var video = document.getElementById('rvideo').value;

	var inter_data = {
		location:location,
		description:description,
		image:image,
		video:video,
	} 

	fetch(urlred,{
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
			alert('created a redflag')
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
