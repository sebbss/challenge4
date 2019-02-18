
var token = localStorage.getItem('access');
var user = localStorage.getItem('user');
var isAdmin = localStorage.getItem('role');
var registered = localStorage.getItem('date');

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
var username = document.getElementById('usname');
username.innerHTML+=user
var joined = document.getElementById('reg');
joined.innerHTML+=registered.split(' ')[0]
var rejected =0;
var resolved = 0;
var underinvestigation = 0;
var draft =0;
var rrejected =0;
var rresolved = 0;
var runderinvestigation = 0;
var rdraft =0;

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
	if (response['message']=="token is invalid" || isAdmin == true) {
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
				if (object[i].status == 'rejected'){
					rejected++;
				}
				else if(object[i].status == 'resolved'){
					resolved++;
				}
				else if (object[i].status== 'under investigation'){
					underinvestigation++;
				}
				else{
					draft++;
				}
			
				var interventions = document.getElementById('Interventions');
				interventions.innerHTML+=
				`<button id="flags" onclick="window.location.href='#${object[i].flag_id}'">intervention ${object[i].flag_id}</button>
	            <li id="${object[i].flag_id}">
	                <button class="hide" onclick ="view(${object[i].flag_id})">view</button>
	                <button class="updt" onclick ="intervlocation(${object[i].flag_id})">update loc</button>
	                <button class="update" onclick = "intervdescription(${object[i].flag_id})">update desc</button>
	                <button class="delete" onclick ="del_interv(${object[i].flag_id})">delete</button>
	                <button class="upload" onclick="upload_interv(${object[i].flag_id})">upload</button>
	            </li>`
			
		}
		document.getElementById('draft_interv').innerHTML+=draft;
		document.getElementById('res_interv').innerHTML+=resolved;
		document.getElementById('rej_interv').innerHTML+=rejected;
		document.getElementById('un_interv').innerHTML+=underinvestigation;
		}
		}

	return fetch("http://127.0.0.1:5000/ireporter/api/v1/flags",{
	methods:'GET',
	headers:{
		Authorization:`Bearer ${token}`
	},
	mode:'cors'
}).then(res => res.json())
.then(response => {
		console.log(response['red_flags']);
		const object2 =response['red_flags']
		if (object2 == null){
			var redflags = document.getElementById('Redflags');
			redflags.innerHTML+=
			`<p>You Have Not Made Any Interventions Yet</p>`
		}
		else {	
			for (var i=0; i<object2.length;i++){
				if (object2[i].status == 'rejected'){
					rrejected++;
				}
				else if(object2[i].status == 'resolved'){
					rresolved++;
				}
				else if (object2[i].status== 'under investigation'){
					runderinvestigation++;
				}
				else{
					rdraft++;
				}

				var redflags = document.getElementById('Redflags');
				redflags.innerHTML+=
				`<button id="flags" onclick="window.location.href='#${object2[i].flag_id}'">red-flag ${object2[i].flag_id}</button>
	            <li id="${object2[i].flag_id}">
	                <button class="hide" onclick ="flagview(${object2[i].flag_id})">view</button>
	                <button class="updt" onclick ="flaglocation(${object2[i].flag_id})">update loc</button>
	                <button class="update" onclick = "flagdescription(${object2[i].flag_id})">update desc</button>
	                <button class="delete" onclick ="del_flag(${object2[i].flag_id})">delete</button>
	                <button class="upload" onclick="upload_flag(${object2[i].flag_id})">upload</button>
	            </li>`
		}
		document.getElementById('draft_flags').innerHTML+=rdraft;2
		document.getElementById('res_flags').innerHTML+=rresolved;
		document.getElementById('rej_flags').innerHTML+=rrejected;
		document.getElementById('un_flags').innerHTML+=runderinvestigation;
		}
		
	
})
	
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

//get specific red-flag
function flagview(flag_id) {
	const rurl2 =`http://127.0.0.1:5000/ireporter/api/v1/flags/${flag_id}`
	

fetch(rurl2,{
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
		var redflag = document.getElementById('userview');
		document.getElementById('userview').innerHTML='';
		redflag.innerHTML+=
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

//update location redflag
function flaglocation(flag_id) {
	const rurl3 =`http://127.0.0.1:5000/ireporter/api/v1/flags/${flag_id}/location`;
	
    document.getElementById('newloc').style.display = "block";

	document.getElementById('newloc').addEventListener('submit', updaterloc)
	function updaterloc(e) {
		e.preventDefault();
		var new_loc = document.getElementById('newlocation').value
	fetch(rurl3,{
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

//update description redflag
function flagdescription(flag_id) {
	const rurl4 =`http://127.0.0.1:5000/ireporter/api/v1/flags/${flag_id}/description`

	document.getElementById('newdes').style.display = "block";

	document.getElementById('newdes').addEventListener('submit', updaterdes)
	function updaterdes(e) {
		e.preventDefault();
		var new_des = document.getElementById('newdescription').value
	fetch(rurl4,{
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


//delete red-flag

function del_flag(flag_id) {
	const rurl5 = `http://127.0.0.1:5000/ireporter/api/v1/flags/${flag_id}`

	fetch(rurl5,{
		method:'DELETE',
		headers:{
			Authorization:`Bearer ${token}`
		},
		mode:'cors'
		}).	then(res => res.json())
	.then(response =>{
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

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYnNzIiwiYSI6ImNqc2ExMWdyeTFoM3U0YnM4ejE2MG43YzUifQ.Ec3dgrMA8_24RNBlk2rxxA';
        var map3 = new mapboxgl.Map({
        container: 'map3',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom:9,
        center:[32.57505249978601, 0.3206802144422909]
        });
        var marker3 = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([0, 0])
            .addTo(map3);
        map3.on('click', function (e) {
            document.getElementById('newlocation').value=(e.lngLat);
        });