function showBox() {
    $('makingList').style.display = '';
}

$(document).ready(function (){
    setScroll();
});

function setScroll(){

    $('#b_start').click(function (){

        $('body').animate({ scrollTop: $('.n_navbar').offset().top },1500);
    })

    $(document).ready(function (){

        $('#theList').scroll(function (){
            var scroll_top = $(this).scrollTop();
            $('#feedback').text(scroll_top);
        })

        $('#titleSignIn').click(function (){
            $('#signInForm').fadeIn(200);
            $('#registerForm').fadeOut(200);
        })

        $('#titleRegister').click(function (){
            $('#registerForm').fadeIn(200);
            $('#signInForm').fadeOut(200);
        })
    })

}

$('#signInForm').on('submit', function (e) {
    e.preventDefault();

    // get the form data
    var formData = {
        'username' : $('input[name=userName]').val(),
        'password' : $('input[name=password]').val()
    };

    // Process the form
    $.ajax({
        type : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url : '/signIn', // the url where we want to POST
        data : formData, // our data object
        dataType : 'json', // what type of data do we expect back from the server
        encode : true,
        success: function (obj) {
            window.location = '/sites';
            window.reload();
        },
        error: function (obj){
            if(obj.responseText == 'Empty'){
                alert('Some fields are empty! Please fill out everything.');
            }else{
                alert('User doesn\'t exist!');
            }
        }
    })
});

$('#registerForm').on('submit', function (e) {
    e.preventDefault();

    // get the form data
    var formData = {
        'username' : $('input[name=regUserName]').val(),
        'password' : $('input[name=regPassword]').val(),
        'ConfirmPassword' : $('input[name=confirmPassword]').val(),
        'email' : $('input[name=email]').val()
    };

    // Process the form
    $.ajax({
        type : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url : '/register', // the url where we want to POST
        data : formData, // our data object
        dataType : 'json', // what type of data do we expect back from the server
        encode : true,
        success: function (obj) {
            window.location = '/sites';
            window.reload();
        },
        error: function (obj){
            if(obj.responseText == 'Password'){
                alert('Password doesn\'t match.');
            }else if(obj.responseText == 'Email'){
                alert('Please fill out a valid Email.');
            }else if(obj.responseText =='UserName'){
                alert('Username already exist.');
            }else{
                alert('We have encountered in some problems, please try again later.')
            }
        }
    })
});
