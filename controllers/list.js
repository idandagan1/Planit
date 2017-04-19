$("#addItem").click(function(){
    var itemName = document.getElementById("item").value;
    var quantity = document.getElementById("quantity").value;

    if(input == ""){
        return;
    }

    var item = {
        'Name': itemName,
        'Quantity': quantity
    }

    var jsonItem = JSON.stringify(item, null, 2);

    $.ajax({
        url: '/list.html/addItem',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: 'post',
        data: jsonItem,
        success: function (obj) {
            showItem();
            console.log("item has been insert");
        },
        error: function(obj){
            alert("You must sign-in!");
        }
    });

})

function showItem(){

    var name = document.getElementById("item").value;
    var quantity = document.getElementById("quantity").value;
    var display = name+" X "+quantity
    if(name != "")
    {
        numberOfItems++;
        var new_Item = new Item(name);
        document.getElementById("totalItems").innerHTML = "Total Items: "+numberOfItems;
        listOfItems.push(new_Item);
        $("#theList").append("<li id="+name+" class=b_tag onclick=deleted(this) value="+name+">"+display+"</li>");
        document.getElementById("item").value = "";
        $(".b_tag:last").animate({"font-size":"25"},100);
        $(".b_tag:last").animate({"font-size":"16"},80);

    }
}

function displayItems(list){

    if(list == null){
        return;
    }

    for (var i=0; i<list.length; i++)
    {
        $("#theList").append("<li id=item" + i + " class=b_tag onclick=deleted(this) value="+list[i].Name+">" + list[i].Name + " X " + list[i].Quantity +"</li>");
        numberOfItems = list.length;
        document.getElementById("totalItems").innerHTML = "Total Items: "+list.length;
    }
}

$("#b_clearList").click(function(){

    var listLength = listOfItems.length;
    listOfItems.splice(0,listLength);
    $("#theList").empty();
    document.getElementById("totalItems").innerHTML = "Total Items: 0";
    numberOfItems = 0;
})