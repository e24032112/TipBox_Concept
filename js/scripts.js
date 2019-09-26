var recognizing = false;

var recognition_text = "";

if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous=false;
    recognition.interimResults=true;
    recognition.lang="en-US";
    //recognition.lang="cmn-Hant-TW";
    recognition.onstart = () => {
        $("#yourModal").modal();
        recognition_text = "";
        console.log('start recognition...');
        recognizing = true;
    };

    recognition.onend = () => {
        $("#yourModal").modal("hide");
        console.log('stop recognition!');
        recognizing = false;
        if(recognition_text){
            /*for(var i = 0 ; i < 2 ; i++){
                $(".search")[i].value = recognition_text;
            }*/
            scroll_map();
            search_map(recognition_text);
        }
    };

    recognition.onerror = () => {
        console.log(event.error);
        switch(event.error){
            case "not-allowed":
                $(".error").html('<button type="button" class="close" data-dismiss="modal">&times;</button><strong>Error!</strong> Microphone access is denied!');
                break;
            case "no-speech":
                $(".error").html('<button type="button" class="close" data-dismiss="modal">&times;</button><strong>Error!</strong> You didn\'t say anything!');
                break;
            case "audio-capture":
                $(".error").html('<button type="button" class="close" data-dismiss="modal">&times;</button><strong>Error!</strong> No microphone is detected!');
                break;
            default:
        }
        
        $("#myModal").modal();
    }

    recognition.onresult=function(event){
        /*var i = event.resultIndex;
        var j = event.results[i].length-1;
        console.log(event.results[i][j].transcript);*/
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                recognition_text = event.results[i][0].transcript;
            }
        }
    };
}



$(document).ready(function(){

    // site preloader -- also uncomment the div in the header and the css style for #preloader
    $(window).load(function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });


    if($(window).scrollTop()!=0){
        $('.navbar').css("padding-top","0vw");
        $('.navbar').css("padding-bottom","1.3vw");
        $('.navbar').css("background-color","rgba(35, 31, 35, 0.9)");
        $('.nav-btn-right-h').addClass('nav-btn-right-scroll');
        $('.nav-btn-right-h').removeClass('nav-btn-right-h');            
    }else{
        $('.navbar').css("padding-top","3vw");
        $('.navbar').css("padding-bottom","0vw");
        $('.navbar').css("background-color","rgba(0, 0, 0, 0)");
        $('.nav-btn-right-scroll').addClass('nav-btn-right-h');
        $('.nav-btn-right-scroll').removeClass('nav-btn-right-scroll');
    }

    $('.carousel.slide').carousel({
        interval: 5000,
        cycle: true
    });

    $(window).scroll(function(){
        if($(window).scrollTop()!=0){
            $('.navbar').css("padding-top","0vw");
            $('.navbar').css("padding-bottom","1.3vw");
            $('.navbar').css("background-color","rgba(35, 31, 35, 0.9)");
            $('.nav-btn-right-h').addClass('nav-btn-right-scroll');
            $('.nav-btn-right-h').removeClass('nav-btn-right-h');            
        }else{
            $('.navbar').css("padding-top","3vw");
            $('.navbar').css("padding-bottom","0vw");
            $('.navbar').css("background-color","rgba(0, 0, 0, 0)");
            $('.nav-btn-right-scroll').addClass('nav-btn-right-h');
            $('.nav-btn-right-scroll').removeClass('nav-btn-right-scroll');
        }
    });

    $('#Google_Play').mouseover(function(){
        $('#Google_Play img:eq(0)').css("display","none");
        $('#Google_Play img:eq(1)').css("display","block");
    });
    $('#Apple_Store').mouseover(function(){
        $('#Apple_Store img:eq(0)').css("display","none");
        $('#Apple_Store img:eq(1)').css("display","block");
    });

    $('#Google_Play').mouseout(function(){
        $('#Google_Play img:eq(0)').css("display","block");
        $('#Google_Play img:eq(1)').css("display","none");
    });
    $('#Apple_Store').mouseout(function(){
        $('#Apple_Store img:eq(0)').css("display","block");
        $('#Apple_Store img:eq(1)').css("display","none");
    });

    $('.dropdown-menu li a').click(function(){
        if($(this).attr("id") == "default"){
            $('button.col4-input').html( "Choose your city" );
            $('button.col4-input').css("color","#727272");
            $('button.col4-input:hover').css("color","#727272");
        }else{
            $('button.col4-input').html( $(this).text() );
            $('button.col4-input').css("color","#231f20");
            $('button.col4-input:hover').css("color","#231f20");
        }
    });

    $("#arrow").click(function(event) {
        scroll_map(event);
    });

    $(".search").change(function(event) {
        if($(".search").is(":focus") === true){
            /*for(var i = 0 ; i < 2 ; i++){
                $(".search")[i].value = $(this).val();
            }*/
            scroll_map(event);
            search_map($(this).val());
        } 
    });

    $(".search_it").click(function(event){
        /*for(var i = 0 ; i < 2 ; i++){
            $(".search")[i].value = $(".div_in_google_map div div input").val();
        }*/
        scroll_map(event);
        search_map($(".div_in_google_map div div input").val());
    });

    $(".glyphicon-search").click(function(event){
        /*for(var i = 0 ; i < 2 ; i++){
            $(".search")[i].value = $(this).parent().find("input").val();
        }*/
        scroll_map(event);
        search_map($(this).parent().find("input").val());
    });

    $(".ion-android-microphone").click(function(event){
        if(recognizing==false){
            if (!('webkitSpeechRecognition' in window)) {
                $(".error").html('<button type="button" class="close" data-dismiss="modal">&times;</button><strong>Error!</strong> This function is only supported in Chrome 25 or higher version.');
                $("#myModal").modal();
            } else {
                recognition.start();
            }
        }else{
            recognition.stop();
        }
    });
});

var scroll_map = (event) => {
    if(event){
        event.preventDefault();
    }

    // Store hash
    var hash = $("#arrow a").attr("href");

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
        scrollTop: $(hash).offset().top
        }, 400, function(){
            // Add hash (#) to URL when done scrolling (default click behavior)
            //window.location.hash = hash;
    });
};

var correct_add = (Ar, str) => {
    var pati = [];
	var rate = 0;
	var str1;
    Ar.forEach(function(item){
		str1 = "";
		if(str1 = item.types[0]){
			str1 = item.long_name;
			rate = 0;
			console.log(str1);
			for(var i = 0, j = 0, matched = 0, len = str.length;i<len;){
				console.log([i,j]);
				if(str[i].toUpperCase() == str1[j].toUpperCase()){
					rate++;
					i++;
					if(j == str1.length-1){
						break;
					}
					j++;
					matched=j;
				}else{
					if(j == str1.length-1){
						j = matched;
						i++;
					}else{
						j++;
					}
				}
			}
			if ((rate == str.length)&&(str1.length == str.length)) rate++;
			pati.push([rate,str1]);
		}
    });
	if(!pati) return str;
	var Corrected = pati[0];
	pati.forEach(function(item){
		if(item[0]>Corrected[0]){
			Corrected = item;
		}
	});
	return Corrected[1];
};

var search_map = (address) => {
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json",
        {"address":address,"key":"AIzaSyDW-GIfy8FarJJyH5D_4YRicBPYEcjLnr0","language":"en"},
        function(data){
            var addr = data.results[0].address_components;
            addr = correct_add(addr,address);
            $(".search").val(addr);
            var loc = data.results[0].geometry.location;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: loc.lat, lng: loc.lng},
                scrollwheel: false,
                disableDefaultUI: true,
				zoomControl: true,
                zoom: 11
            });
            var Append_ = true;
            $(".dropdown-menu li").each(function(){
                if ($(this).find("a").text().toUpperCase()==addr.toUpperCase()){
                    Append_ = false;
                }
            });
            if(Append_){
                $(".dropdown-menu").append("<li><a>"+addr+"</a></li>");
                $('.dropdown-menu li a').click(function(){
                    if($(this).attr("id") == "default"){
                        $('button.col4-input').html( "Choose your city" );
                        $('button.col4-input').css("color","#727272");
                        $('button.col4-input:hover').css("color","#727272");
                    }else{
                        $('button.col4-input').html( $(this).text() );
                        $('button.col4-input').css("color","#231f20");
                        $('button.col4-input:hover').css("color","#231f20");
                    }
                });
            }
        }
    );
};

var initMap = () => {
	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 22.9997281, lng: 120.2270277},
	scrollwheel: false,
	disableDefaultUI: true,
	zoomControl: true,
	zoom: 11
	});
};
