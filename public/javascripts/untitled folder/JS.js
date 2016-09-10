/**
 * Created by idandagan1 on 31/08/2016.
 */


//-----------------Page: Home Page -------------------------------------------------------------------------------------------------------

function showBox()
{
    $("makingList").style.display = "";
}
$(document).ready(function(){
    setScroll();
});
function setScroll(){

    $("#b_start").click(function(){

        $("body").animate({scrollTop: $(".n_navbar").offset().top},1500);
    })

    $(document).ready(function(){

        $("#theList").scroll(function(){

            var scroll_top = $(this).scrollTop();
            $("#feedback").text(scroll_top);
        })

    })

}
//-----------------Page: List------------------------------------------------------------------------------------------------------
var numberOfItems=0;
var listOfItems = [];

var Item = function(i_Name)
{
    this.Name = i_Name;
}

$(document).ready(function(){


    $("#addItem").click(function(){

        var name = document.getElementById("item").value;
        if(name != "")
        {
            numberOfItems++;
            var new_Item = new Item(name);
            document.getElementById("totalItems").innerHTML = "Total Items: "+numberOfItems;
            listOfItems.push(new_Item);
            $("#theList").append("<li id=item class=b_tag onclick=deleted(this)>"+name+"</li>");
            document.getElementById("item").value = "";
            $(".b_tag:last").animate({"font-size":"25"},100);
            $(".b_tag:last").animate({"font-size":"16"},80);

        }
    })

//-------Clear List-------------------
    $("#b_clearList").click(function(){

        var listLength = listOfItems.length;
        listOfItems.splice(0,listLength);
        //$("li[id^=item]").remove();
        $("#theList").empty();
        document.getElementById("totalItems").innerHTML = "Total Items: 0";
        numberOfItems = 0;
    })

})

function deleted(event)
{
    $(event).remove();
    numberOfItems-=1;
    document.getElementById("totalItems").innerHTML = "Total Items: "+numberOfItems;
}

function disapear(){
    document.getElementById("inst").style.display = "none";
    document.getElementById("base").style.opacity = "1";
    $(".wrap").css({"-webkit-filter":"blur(0px)"},100);
    $(".wrap").css({"-moz-filter":"blur(0px)"},100);
    $(".wrap").css({"z-index":"1"},100);

}



//-----------------Page: Map-------------------------------------------------------------------------------------------------------
var indexOfSite;
var markers = [];
var marker;
var place;
var infowindow = new google.maps.InfoWindow();
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var mapOptions = {
    center: {lat: 40.9418601, lng: 13.5616095},
    zoom: 10,
    scrollwheel: false};
var map = new google.maps.Map(document.getElementById('theMap'),mapOptions);
var input = (document.getElementById('pac-input'));
var autocomplete = new google.maps.places.Autocomplete(input);
var initialLocation;
var listOfSites = [];
var totalCost = 0;
var index = 0;

var Site = function(i_Name, i_Address, i_Cost){
    this.SiteName = i_Name;
    this.Address = i_Address;
    this.Cost = i_Cost;
};

function showAttention(){
    $(".mapWrap").css({"z-index":"-3"},100);
    $(".mapWrap").css({"-webkit-filter":"blur(1px)"},100);
    $(".mapWrap").css({"-moz-filter":"blur(1px)"},100);
    document.getElementById("wrapAttention").style.display = "inline-block";
}

function showMap(){
    document.getElementById("wrapAttention").style.display = "none";
    $(".mapWrap").css({"-webkit-filter":"blur(0px"},100);
    $(".mapWrap").css({"-moz-filter":"blur(0px"},100);
    $(".mapWrap").css({"z-index":"1"},100);
}

$("#b_addSite").click(function(){

    addSite(this);

})
function addSite(event)//Adding the site to the list.
{

    var new_location = document.getElementById("pac-input").value;
    var new_nickname = document.getElementById("SiteName").value;
    var new_cost = document.getElementById("cost").value;
    if(new_location == "" || new_nickname== "")
    {
        showAttention();
    }
    else
    {
        showMap();
        if(new_cost != "")
        {
            totalCost+=parseFloat(new_cost);
            document.getElementById("totalCost").innerHTML = "Total Cost = "+totalCost+" $";
            $("#totalCost").animate({'font-size':'25'},100);
            $("#totalCost").animate({'font-size':'20'},70);
        }

        var new_site = new Site(new_nickname,new_location,new_cost);
        listOfSites.push(new_site);
        document.getElementById("SiteName").value="";
        document.getElementById("pac-input").value="";
        document.getElementById("cost").value="";
        displayTheSites(new_site);
    }

}
//----------Display the Site.------------------
function displayTheSites(event)
{
    $("#siteList").append("<li id="+index+" onclick=getSite(this) >"+event.SiteName+"</li><br>");
    index++;
}

function getSite(event){

    indexOfSite = parseInt($(event).attr("id"));
    map.setCenter(markers[indexOfSite].geometry.location);

    var marker = new google.maps.Marker({
        map: map
    });

    marker.setPlace(({
        placeId: markers[indexOfSite].place_id,
        location: markers[indexOfSite].geometry.location
    }));

    marker.setVisible(true);


    infowindow.setContent('<div><strong>' + markers[indexOfSite].name + '</strong><br>' +
        markers[indexOfSite].formatted_address + '</div>');
    infowindow.open(map,marker);
}

//------Clear List----------------------------
$("#b_clearSite").click(function(){

    var listLength = listOfSites.length;
    listOfSites.splice(0,listLength);
    $("#siteList").empty();
    markers.empty();
    totalCost = 0;
    index = 0;
    document.getElementById("totalCost").innerHTML = "Total Cost = 0 $";
})

//-----------------Auto Complete-----------------------------


function initialize() {

    var browserSupportFlag =  new Boolean();
    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setCenter(initialLocation);
        }, function() {
            handleNoGeolocation(browserSupportFlag);
        });
    }

    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
    function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
            initialLocation = newyork;
        } else {
            initialLocation = newyork;
        }
        map.setCenter(initialLocation);
    }

    //var input = (document.getElementById('pac-input'));

    // Create the autocomplete helper, and associate it with
    // an HTML text input box.
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('lblresult', map);
    var marker = new google.maps.Marker({
        map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);

    });

    // Get the full place details when the user selects a place from the
    // list of suggestions.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow.close();
        place = autocomplete.getPlace();
        markers.push(place);
        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport)
        {
            map.fitBounds(place.geometry.viewport);
        }
        else
        {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace(({
            placeId: place.place_id,
            location: place.geometry.location
        }));

        marker.setVisible(true);
        //markers.push(marker);
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            place.formatted_address + '</div>');
        infowindow.open(map, marker);
    });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);
window.onload = function(){
    initialize();
}

added.addEventListener("submit", function() {
    var newlatlong = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
    map.setCenter(newlatlong);
    marker.setPosition(newlatlong);
    map.setZoom(12);

});

