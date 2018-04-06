$('#b_logout').click(function (event){

    event.preventDefault();

    $.ajax({
        url: 'sites/logout',
        method: 'get',
        success: function (obj) {
        },
        error: function (obj){
            alert("You must sign-in!");
        }
    });
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

function disapear(){
    document.getElementById("inst").style.display = "none";
    document.getElementById("base").style.opacity = "1";
    $(".wrap").css({ "-webkit-filter":"blur(0px)" },100);
    $(".wrap").css({ "-moz-filter":"blur(0px)" },100);
    $(".wrap").css({ "z-index":"1" },100);

}

function deleted(event){

    var item = {
        'Name': event.getAttribute("value")
    }

    var jsonItem = JSON.stringify(item, null, 2);

    $.ajax({
        url: '/list/deleteItem',
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
