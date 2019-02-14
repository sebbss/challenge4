
var token = localStorage.getItem('access');
var user = localStorage.getItem('user');
var isAdmin = localStorage.getItem('role');
if (token == "" || isAdmin == true){
	redirect:window.location.replace('user.html')
}
var span2 = document.getElementsByClassName('closeloc')[0];
var span = document.getElementsByClassName('closedes')[0];
var span3 = document.getElementsByClassName('viewI')[0];
var modal = document.getElementById('newloc');
span.onclick = function(){document.getElementById('newdes').style.display = "none";}
span2.onclick = function(){document.getElementById('newloc').style.display = "none";}
span3.onclick = function(){document.getElementById('viewF').style.display = "none";}
window.onclick = function(event) {
	if(event.target==modal){
		modal.style.display ='none';
	}
}

//get all interventions

const url1 ="http://127.0.0.1:5000/ireporter/api/v2/interventions"
fetch(url1,{
	methods:'GET',
	headers:{
		Authorization:`Bearer ${token}`
	},
	mode:'cors'
}).then(res => res.json())
.then(response => {
	if (response['message']=="token is invalid") {
		redirect:window.location.replace('userLogin.html')
	}
	else{
		const object =response['interventions']
		if (object == null){
			var interventions = document.getElementById('Interventions');
			interventions.innerHTML+=
			`<p>You Have Not Made Any Interventions Yet</p>`
		}
		else {
		
			for (var i=0; i<object.length;i++){
			
				var interventions = document.getElementById('Interventions');
				interventions.innerHTML+=
				`<button id="flags" onclick="window.location.href='#${object[i].flag_id}'">${object[i].description}</button>
	            <li id="${object[i].flag_id}">
	                <button class="hide" onclick ="view(${object[i].flag_id})">view</button>
	                <button class="updt" onclick ="intervlocation(${object[i].flag_id})">update location</button>
	                <button class="update" onclick = "intervdescription(${object[i].flag_id})">update description</button>
	                <button class="delete" onclick ="del_interv(${object[i].flag_id})">delete</button>
	            </li>`
			
		}
		}
		}
	
})


//get all red-flags
const rurl1 ="http://127.0.0.1:5000/ireporter/api/v1/flags"
fetch(rurl1,{
	methods:'GET',
	headers:{
		Authorization:`Bearer ${token}`
	},
	mode:'cors'
}).then(res => res.json())
.then(response => {
	if (response['message']=="token is invalid") {
		redirect:window.location.replace('userLogin.html')
	}
	else{
		const object2 =response['red_flags']
		if (object2 == null){
			var redflags = document.getElementById('Redflags');
			redflags.innerHTML+=
			`<p>You Have Not Made Any Interventions Yet</p>`
		}
		else {	
			for (var i=0; i<object2.length;i++){

				var redflags = document.getElementById('Redflags');
				redflags.innerHTML+=
				`<button id="flags" onclick="window.location.href='#${object2[i].flag_id}'">${object2[i].description}</button>
	            <li id="${object2[i].flag_id}">
	                <button class="hide" onclick ="flagview(${object2[i].flag_id})">view</button>
	                <button class="updt" onclick ="intervlocation(${object2[i].flag_id})">update location</button>
	                <button class="update" onclick = "intervdescription(${object2[i].flag_id})">update description</button>
	                <button class="delete" onclick ="del_interv(${object2[i].flag_id})">delete</button>
	            </li>`
		}
		}
		}
	
})

//get specific intervention

function view(flag_id) {
	const url2 =`http://127.0.0.1:5000/ireporter/api/v2/intervention/${flag_id}`
	

fetch(url2,{
	methods:'GET',
	headers:{
		Authorization:`Bearer ${token}`
	},
	mode:'cors'
}).then(res => res.json())
.then(response =>{
	if (response['message']=="token is invalid"||response['message']=="flag with that id doesnot exist") {
		redirect:window.location.replace('userLogin.html')
	}
	else{
		var intervention = document.getElementById('userview');
		document.getElementById('userview').innerHTML='';
		intervention.innerHTML+=
			`<p>createdby   : ${response.createdby}</p>
			<p>createdon   : ${response.createdon}</p>
			<p>description : ${response.description}</p>
			<p>flag_id     : ${response.flag_id}</p>
			<p>flag_type   : ${response.flag_type}</p>
			<p>image       : ${response.image}</p>
			<p>location    : ${response.location}</p>
			<p>status      : ${response.status}</p>
			<p>video       : ${response.video}</p>`
		document.getElementById('viewF').style.display="block";
	}
})
}

//update location intervention
function intervlocation(flag_id) {
	const url3 =`http://127.0.0.1:5000/ireporter/api/v2/intervention/${flag_id}/location`
	
    document.getElementById('newloc').style.display = "block";

	document.getElementById('newloc').addEventListener('submit', updateloc)
	function updateloc(e) {
		e.preventDefault();
		var new_loc = document.getElementById('newlocation').value
	fetch(url3,{
		method:'PATCH',
		mode:'cors',
		headers:{
				'content-Type':'application/json',
				'Accept':'application/json',
				Authorization:`Bearer ${token}`
			},
		body:JSON.stringify({location:new_loc})
	}).then(res => res.json())
	.then(response => {
		if (response['status']==200 ) {
			redirect:window.location.replace('profile.html');
		}
		else{
			if (response['message']=="token is invalid"){
				redirect:window.location.replace('userLogin.html');
			}
			else{
				alert(response['message']);
			}
		}
	})
}
}
//update description intervention
function intervdescription(flag_id) {
	const url4 =`http://127.0.0.1:5000/ireporter/api/v2/intervention/${flag_id}/description`

	document.getElementById('newdes').style.display = "block";

	document.getElementById('newdes').addEventListener('submit', updatedes)
	function updatedes(e) {
		e.preventDefault();
		var new_des = document.getElementById('newdescription').value
	fetch(url4,{
		method:'PATCH',
		mode:'cors',
		headers:{
				'content-Type':'application/json',
				'Accept':'application/json',
				Authorization:`Bearer ${token}`
			},
		body:JSON.stringify({description:new_des})
	}).then(res => res.json())
	.then(response => {
		if (response['status']==200 ) {
			redirect:window.location.replace('profile.html');
		}
		else{
			if (response['message']=="token is invalid"){
				redirect:window.location.replace('userLogin.html');
			}
			else{
				alert(response['message']);
			}
		}
	})
}
}

//delete intervention 

function del_interv(flag_id) {
	const url5 = `http://127.0.0.1:5000/ireporter/api/v2/intervention/${flag_id}`

	fetch(url5,{
		method:'DELETE',
		headers:{
			Authorization:`Bearer ${token}`
		},
		mode:'cors'
		}).	then(res => res.json())
	.then(response =>{
		console.log(response);
		if (response['status']==202){
			redirect:window.location.replace('profile.html');
		}
		else{
			if (response['message']=="token is invalid"){
				redirect:window.location.replace('userLogin.html');
			}
			else{
				alert(response['message']);
			}

		}
	})
}


//