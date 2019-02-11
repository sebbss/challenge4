
var token = localStorage.getItem('access')
var user = localStorage.getItem('user')
var isAdmin = localStorage.getItem('role')
if (token == "" || isAdmin == true){
	redirect:window.location.replace('user.html')
}



function update_location(flag_id) {
	localStorage.setItem('id', flag_id);
	window.location.href='updtl${flag_id}';
	getOne();
}
//get all redflags

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
			var interventions = document.getElementById('profile_info');
			interventions.innerHTML+=
			`<p>You Have Not Made Any Interventions Yet</p>`
		}
		else {
			console.log(object[0].createdon)	
			for (var i=0; i<object.length;i++){
				console.log(object[i].createdon);
				var interventions = document.getElementById('profile_info');
				interventions.innerHTML+=
				`<button id="flags" onclick="window.location.href='#${object[i].flag_id}'">${object[i].description}</button>
	            <div id="${object[i].flag_id}">
	                <button class="hide" onclick ="view(${object[i].flag_id})">view</button>
	                <button class="updt" onclick ="intervlocation(${object[i].flag_id})">update location</button>
	                <button class="update" onclick = "intervdescription(${object[i].flag_id})">update description</button>
	                <button class="delete">delete</button>
	            </div>`
			
		}
		}
		}
	
})

//get specific refFlag

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
		var intervention = document.getElementById('profile_info');
		intervention.innerHTML+=
		`<div id = "view${response.flag_id}">
			<p>createdby   : ${response.createdby}</p>
			<p>createdon   : ${response.createdon}</p>
			<p>description : ${response.description}</p>
			<p>flag_id     : ${response.flag_id}</p>
			<p>flag_type   : ${response.flag_type}</p>
			<p>image       : ${response.image}</p>
			<p>location    : ${response.location}</p>
			<p>status      : ${response.status}</p>
			<p>video       : ${response.video}</p>
		</div>`
		window.location.href=`#view${flag_id}`;
	}
})
}

//update location
function intervlocation(flag_id) {
	const url3 =`http://127.0.0.1:5000/ireporter/api/v2/intervention/${flag_id}/location`
	var location = document.getElementById('profile_info');
	location.innerHTML+=
	`<div id="loc${flag_id}">
	<form id="newloc">
	<label for="newlocation"><b>newlocation</b></label>
    <input type="text" placeholder="enter a new location" id="newlocation" >
    <button type ="submit">update</button>
	</form>
	</div>`
	window.location.href=`#loc${flag_id}`;
	console.log('test');'test'
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
//update description
function intervdescription(flag_id) {
	const url4 =`http://127.0.0.1:5000/ireporter/api/v2/intervention/${flag_id}/description`
	var description = document.getElementById('profile_info');
	description.innerHTML+=	
	`<div id="des${flag_id}">
	<form id="newdes">
	<label for="newdescription"><b>newdescription</b></label>
    <input type="text" placeholder="enter a new location" id="newdescription" >
    <button type ="submit">update</button>
	</form>
	</div>`
	window.location.href=`#des${flag_id}`;
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