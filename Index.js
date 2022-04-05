var myMap, preview;
var clicks = 0; 
var zoek = document.getElementById('zoek');

document.getElementsByTagName('body').onload = getAPIdata();

function getClicks() {
    clicks += 1;
    console.log(clicks);
    return clicks;
}
function getLat() {
    var latitude = 0;
    var plaatsnaam = document.getElementById('plaatsnaam');
    var onderregel = document.getElementById('onderregel');
    var btnreload = document.getElementById('btn-reload');
    var plaats = document.getElementById('plaats')
    
    btnreload.style.visibility = "hidden";
    
    if (clicks == 0) {
        latitude = 52.1601144 ;
        plaatsnaam.innerHTML = 'Landingsplaats 1:';
        onderregel.innerHTML = 'Leiden, Zuid-Holland';
        plaats.innerHTML = 'De mooiste stad van Nederland';
    }
    else if (clicks == 1) {
        latitude = 52.5542536;
        plaatsnaam.innerHTML = 'Landingsplaats 2:';
        onderregel.innerHTML = 'West-Graftdijk, Noord-Holland';
        plaats.innerHTML = 'Het mooiste dorp van Nederland';
    }
    else if (clicks == 2) {
        latitude = 50.9140244;
        plaatsnaam.innerHTML = 'Landingsplaats 3:';
        onderregel.innerHTML = 'Maastricht, Limburg';
        plaats.innerHTML = 'Een sfeervolle stad vol prachtige straatjes';
        
    }
    else if (clicks == 3) {
        latitude = 53.2606799;
        plaatsnaam.innerHTML = 'Landingsplaats 4:';
        onderregel.innerHTML = 'Zuid-Wolde, Groningen';
        plaats.innerHTML = 'Tsjaa...';
    }
    else if (clicks => 4) {
        latitude = -25.2743980;
        plaatsnaam.innerHTML = 'Dit waren de vier landingsmogelijkheden in Nederland.';
        onderregel.innerHTML = 'Via de onderstaande knop komt u op de eerste landingsmogelijkheid.';
        plaats.innerHTML = 'AUSTRALIE VOOR HET VERSCHIL';
        btnreload.style.visibility = "visible";
    }
    return latitude;
}

function getLng() {
    var longitude = 4.4970097;

    if (clicks == 0){
        longitude = 4.4970097;
    }
    else if (clicks == 1) {
        longitude = 4.7950025;
    }
    else if (clicks == 2) {
        longitude = 5.7761350;
    }
    else if (clicks == 3) {
        longitude = 6.5923127;
    }
    else if (clicks == 4) {
        longitude = 133.7751360;
    }
    
    return longitude;
}

function initMap() {
	var myStyles =[
		 {
		 	featureType: "poi",
		 	stylers: [{ visibility: "on" }]
		 },
		 {
		 	featureType: 'transit',
		 	stylers: [{visibility: 'on'}]
		 }
	];
	var mapOptions = {
		center: {
			lat: getLat(), 
			lng: getLng()
		},
		zoom: 14,
	};
    var mapOptions2 = {
		center: {
			lat: getLat(), 
			lng: getLng()
		},
		zoom: 14,
        mapTypeId: 'satellite'
	};

	myMap = new google.maps.Map(document.getElementById('maps'), mapOptions);
    
    var locatieMarker = new google.maps.Marker({
		position: {
			lat: getLat(), 
			lng: getLng(),
		},
		map: myMap,
		title: 'Landingsplek'
	});

}

function getAPIdata() {
    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=';
    var lat = getLat();
    var lon = getLng();
    var apiKey ='b1f538a469a6b6f9fd103cda1db6e9ef';
    

    var request = url + lat + '&lon=' + lon + '&appid=' + apiKey;
    fetch(request)
    .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        onAPISucces(response);
    })
    .catch(function (error) {
        console.error('Request failed', error);
    });
}
function clearData() {
   document.getElementById('weer').innerHTML = '';
'';
}

function onAPISucces(response) {
    var weatherList = response.daily;
    var weatherBox = document.getElementById('weer');
    var temp = Math.floor(weatherList[1].temp.day - 273.15);
    var clouds = weatherList[1].clouds;
    var weeradvies = document.getElementById('weeradvies');
    var weeradvies2 = document.getElementById('weeradvies2');
    var conclusie = document.getElementById('conclusie');
    
    if (temp > 20) {
        weeradvies.innerHTML = 'Het is heerlijk warm op de bestemming.'; 
        conclusie.style.font = "18px/18px D-DIN-Bold,Arial,Verdana,sans-serif";
    }
    else {
        weeradvies.innerHTML = 'Het is momenteel erg koud op de landingsplaats!'
        conclusie.style.font = "18px/18px D-DIN-Bold,Arial,Verdana,sans-serif";
    }
    
    
    if (temp > 4) {
        if (clouds < 30){
            conclusie.innerHTML = 'Hier kunt u gemakkelijk landen';
            conclusie.style.color = "white";
            conclusie.style.font = "18px/18px D-DIN-Bold,Arial,Verdana,sans-serif";
        }
        else {
            conclusie.innerHTML = 'Er is wel bewolking, landen is mogelijk';
            conclusie.style.color = "white";
            conclusie.style.font = "18px/18px D-DIN-Bold,Arial,Verdana,sans-serif";
        }
    }
    else {
        if (clouds < 30) {
            conclusie.innerHTML = 'Hier kunt u gemakkelijk landen';
            conclusie.style.color = "white";
            conclusie.style.font = "18px/18px D-DIN-Bold,Arial,Verdana,sans-serif";
        }
        else {
            conclusie.innerHTML = 'U kunt beter een andere landingsplaats zoeken';
            conclusie.style.color = "white";
            conclusie.style.font = "18px/18px D-DIN-Bold,Arial,Verdana,sans-serif";
        }
    }
        
    for(var i=0; i< weatherList.length; i++){
        var dateTime = new Date(weatherList[i].dt*1000);
        var date = formDate(dateTime);
        var cloud = weatherList[i].clouds;
        var temp = Math.floor(weatherList[i].temp.day - 273.15);
        var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';

        forecastMessage =  '<div class="forecastMoment">';
        forecastMessage +=   '<div class="date"> '+date+' </div>';
        forecastMessage +=   '<div class="cloud"> '+cloud+'&#37; wolken </div>';
        forecastMessage +=   '<div class="temp"> '+temp+'&#176;C </div>';
        forecastMessage += '</div>';

        weatherBox.innerHTML += forecastMessage;
    }
}
function updateUIError() {
    var weatherBox = document.getElementById('weer');
    weatherBox.className = 'hidden'; 
}
function formDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    return day +'/'+ month;
}
