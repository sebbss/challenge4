var role = localStorage.getItem('role');
var token =localStorage.getItem('access');
const url1 ="http://127.0.0.1:5000/ireporter/api/v2/interventions";
const url2 ="http://127.0.0.1:5000/ireporter/api/v1/flags";
fetch(url1,{
	methods:'GET',
	headers:{
		Authorization:`Bearer ${token}`
	},
	mode:'cors'
}).then(res => res.json())
.then(response => {
	if (response['message']=="token is invalid" || role == false)  {
		redirect:window.location.replace('userLogin.html')
	}
	else{
		const object =response['interventions']
		if (object == null){
			var interventions = document.getElementById('admininterv');
			interventions.innerHTML+=
			`<p>No Intervention Records Have Been Made</p>`
		}
		else {
				
			for (var i=0; i<object.length;i++){
				
				var interventions = document.getElementById('interventions_Data');
				interventions.innerHTML+=
				`<tr><td>${object[i].createdby}</td>
				<td>${object[i].createdon}</td>
				<td>${object[i].description}</td>
				<td>${object[i].flag_id}</td>
				<td>${object[i].flag_type}</td>
				<td>${object[i].image}</td>
				<td>${object[i].location}</td>
				<td>${object[i].status}</td>
				<td>${object[i].video}</td>
				<td><button class ="status" onclick = "intervstatus(${object[i].flag_id})">update</button></td></tr>`
			
		}
		}
		}
	
})

fetch(url2,{
	methods:'GET',
	headers:{
		Authorization:`Bearer ${token}`
	},
	mode:'cors'
}).then(res => res.json())
.then(response => {
	if (response['message']=="token is invalid" || role == false) {
		redirect:window.location.replace('userLogin.html')
	}
	else{
		const object2 =response['red_flags']
		if (object2 == null){
			var flags = document.getElementById('adminflags');
			flags.innerHTML+=
			`<p>No Red-flag Records Have Been Made</p>`
		}
		else {
				
			for (var i=0; i<object2.length;i++){
				
				var flags = document.getElementById('flags_Data');
				flags.innerHTML+=
				`<tr><td>${object2[i].createdby}</td>
				<td>${object2[i].createdon}</td>
				<td>${object2[i].description}</td>
				<td>${object2[i].flag_id}</td>
				<td>${object2[i].flag_type}</td>
				<td>${object2[i].image}</td>
				<td>${object2[i].location}</td>
				<td>${object2[i].status}</td>
				<td>${object2[i].video}</td>
				<td><button class ="status" onclick = "flagstatus(${object2[i].flag_id})">update</button></td></tr>`
			
		}
		}
		}
	
})





