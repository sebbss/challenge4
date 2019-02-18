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
	var data={
		location:location,
		description:description
	}
	


	fetch(urlred,{
		method:'POST',
		mode:'cors',
		headers:{
				'content-Type':'application/json',
				'Accept':'application/json',
				Authorization:`Bearer ${token}`
			},
		body:JSON.stringify(data)
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

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYnNzIiwiYSI6ImNqc2ExMWdyeTFoM3U0YnM4ejE2MG43YzUifQ.Ec3dgrMA8_24RNBlk2rxxA';
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom:9,
        center:[32.57505249978601, 0.3206802144422909]
        });
        var marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([0, 0])
            .addTo(map);
        map.on('click', function (e) {
            document.getElementById('rlocation').value=(e.lngLat);
        });

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
            .addTo(map);
        map3.on('click', function (e) {
            document.getElementById('newlocation').value=(e.lngLat);
        });

