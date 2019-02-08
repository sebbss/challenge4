var span = document.getElementsByClassName('closei')[0]
function displayinterv(){
    document.getElementById('modal-interv').style.display = "block";
}
span.onclick = function(){
    document.getElementById('modal-interv').style.display = "none";
}

var url = "http://127.0.0.1:5000/ireporter/api/v2/intervention"
var token = localStorage.getItem('access')

document.getElementById('modal-interv').addEventListener('submit', create_intervention)


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
		}
		else{
			alert(data['message'])
		}
	})
}
