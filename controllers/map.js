$('#b_getTop').click(function(event){

    event.preventDefault();

    $.ajax({
        url: 'map.html/getFriends',
        method: 'get',
        success: function (listOfStreets) {
            showFirends(listOfStreets);
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

$('#b_getPlacesNearPrimary').click(function(event){

    event.preventDefault();

    $.ajax({
        url: 'map.html/getStreetsNearPrimaryStreet',
        method: 'GET',
        success: function (listOfStreets) {
            createMerkersForFriends(listOfStreets);
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

$('#b_getPlacesNearby').click(function(event){

    event.preventDefault();

    var street = {
        place_id: placeID,
        location: {
            lng: location.lng,
            lat: location.lat
        }
    }

    $.ajax({
        url: 'street.html/getStreetsNearby',
        method: 'GET',
        data: street,
        dataType: 'json',
        success: function (listOfStreets) {
            createMerkersForFriends(listOfStreets);
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

$('#streetPrivacy').change(function(event) {

    event.preventDefault();

    var newStatus = {
        status: false
    };

    if ($('#streetPrivacy').is(":checked"))
    {
        newStatus.status = true;
    }

    $.ajax({
        url: 'map.html/changeStreetPrivacy',
        method: 'PUT',
        data: newStatus,
        dataType    : 'json',
        success: function (obj) {

        }
    });

});

$('#b_removeStreet').click(function(event){

    event.preventDefault();

    $.ajax({
        url: 'map.html/removeStreet',
        method: 'delete',
        success: function (obj) {
            displayTopFive(obj.list);
            $('#topFiveBlock').fadeIn("slow");
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

$('#b_logout').click(function(event){

    event.preventDefault();

    $.ajax({
        url: 'map.html/logout',
        method: 'get',
        success: function (obj) {
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });
})

$('#b_changeAddress').click(function(event){

    event.preventDefault();

    var streetID = {
        streetID: $('input[name=newaddress]').val()
    }

    $.ajax({
        url: 'map.html/changePrimaryStreet',
        method: 'put',
        data        : streetID, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        success: function (obj) {

        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

$('#b_updateBasicInfo').click(function(event){

    event.preventDefault();

    var user = {
        firstName: $('input[name=firstName]').val(),
        familyName: $('input[name=familyName]').val()
    }

    $.ajax({
        url: 'map.html/updateBasicInfo',
        method: 'post',
        data        : user, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        success: function (obj) {

        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

$('#b_updateProfessionalInfo').click(function(event){

    event.preventDefault();

    var user = {
        work: $('input[name=firstName]').val(),
        college: $('input[name=familyName]').val()
    }

    $.ajax({
        url: 'map.html/updateProfessionalInfo',
        method: 'post',
        data        : user, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        success: function (obj) {

        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

$('#b_addAdmin').click(function(event){

    event.preventDefault();

    var newAdmin = {
        newAdmin: $('input[name=newaddress]').val()
    }

    $.ajax({
        url: 'map.html/addAdmin',
        method: 'put',
        data        : newAdmin, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        success: function (obj) {

        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

$('#b_addPost').click(function(event){

    event.preventDefault();

    var post = {
        post: $('input[name=sitename]').val()
    }

    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/map.html/addPost', // the url where we want to POST
        data        : post, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true,
        success: function (post) {
            displayPost(post);
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    })

})

$('#b_deletePost').click(function(event){

    event.preventDefault();

    $.ajax({
        type        : 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/map.html/deletePost', // the url where we want to POST
        encode          : true,
        success: function (obj) {
            //addPost(post);
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    })

})

$('#b_addComment').click(function(event){

    event.preventDefault();

    var comment = {
        comment: $('input[name=sitename]').val()
    }

    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/map.html/addComment', // the url where we want to POST
        data        : comment, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true,
        success: function (obj) {
            //addPost(post);
        },
        error: function(obj){
            // alert("You must sign-in!");
        }
    })

})

$('#b_addLikeToPost').click(function(event){

    event.preventDefault();

    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/map.html/addLikeToPost', // the url where we want to POST
        encode          : true,
        success: function (post) {
            addLike(true);
        },
        error: function(obj){
            alert("Error");
        }
    })

})

$('#b_unlikePost').click(function(event){

    event.preventDefault();

    $.ajax({
        type        : 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/map.html/unlikePost', // the url where we want to POST
        encode          : true,
        success: function (obj) {
            addLike(false);
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    })

})

$('#b_findStreet').click(function(event){

    event.preventDefault();

    var street = {
        place_id: placeID
    }

    $.ajax({
        type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/map.html/getStreet', // the url where we want to POST
        data        : street, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true,
        success: function (res) {
            displayResult(res);
        },
        error: function(obj){
            displayResult(obj);
        }
    })

})

$('#b_addStreet').click(function(event){

    event.preventDefault();

    var street = {
        address: $('input[name=siteaddress]').val(),
        place_id: placeID,
        name: short_name,
        location: {
            lng: location.lng,
            lat: location.lat
        }

    }

    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/map.html/addStreet', // the url where we want to POST
        data        : street, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true,
        success: function (res) {
            displayResult(res);
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    })

})

function displayTopFive(list){

    $("#siteList").empty();

    if(list == null){
        return;
    }

    for (var i=0; i<list.length; i++)
    {
        $("#topList").append("<li id="+i+">"+list[i]+"</li><br>");
    }

}

function displayResultsList(list){

    $("#siteList").empty();

    if(list == null){
        $("#siteList").append("<li>Not found</li>");
    }

    listOfSites = list;

    for (var i=0; i<list.length; i++)
    {
        $("#siteList").append("<li>"+list[i].toString()+"</li><br>");
    }
    document.getElementById("totalCost").innerHTML = "Total Cost = "+totalCost+" $";
}

function displayResult(res){

    $("#siteList").empty();

    if(!res || !res.content){
        $("#siteList").append("<li>Not found</li>");
    }
    $("#siteList").append("<li>"+res.content.name.toString()+"</li>");

}

function displayPost(post){

    $("#siteList").empty();

    if(!post){
        return;
    }
    $("#siteList").append("<ul></ul>");
    $("#siteList").append("<li>Author: "+post.author+"</li>");
    $("#siteList").append("<li>Date: "+post.createdDate+"</li>");
    $("#siteList").append("<li>Post: "+post.body+"</li>");

}

function addLike(like){

    $("#siteList").empty();

    if(like == null){
        return;
    }
    if(like === true){
        $("#siteList").append("<li>Like: 1 </li>");
    }else{
        $("#siteList").append("<li>Like: 0 </li>");
    }
}

//})

function disapear(){
    document.getElementById("inst").style.display = "none";
    document.getElementById("base").style.opacity = "1";
    $(".wrap").css({"-webkit-filter":"blur(0px)"},100);
    $(".wrap").css({"-moz-filter":"blur(0px)"},100);
    $(".wrap").css({"z-index":"1"},100);

}

function deleted(event){

    var item = {
        'Name': event.getAttribute("value")
    }

    var jsonItem = JSON.stringify(item, null, 2);

    $.ajax({
        url: '/list.html/deleteItem',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: 'delete',
        data: jsonItem,
        success: function (obj) {
            $(event).remove();
            numberOfItems-=1;
            document.getElementById("totalItems").innerHTML = "Total Items: "+numberOfItems;
        }
    });
}