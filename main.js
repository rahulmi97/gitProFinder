$(document).ready(init);
function init(){
    $('.list').hide();
    $('#error').hide()
    $('#repo').hide();
    // alert(new Date())
   bindEvents();
   console.log('initialize')
}
function bindEvents(){
    $('.ser-btn').click(search)
}
function search(e){
    
    var name=$('#inp').val();
    if(name!=''){
        $.ajax({
            method:'GET',
            url:`https://api.github.com/users/${name}`,
            dataType:'json'
        }).done(ajax);
        console.log('search btn has clicked',name);
    }
    else{
        $('#error').show()
    }
   
}
function ajax(data){
console.log('data is',data);
if(data.following!==0){
    // var y=(data.created_at - new Date());
    // alert('data is',y);
    $('#repo').show();
    $('#error').hide();
    $('.list').show();
    $('img').attr('src',data.avatar_url);
    $('span.bio').html(data.bio);
    $('span.name').html(data.login);
    $('span.followers').html(data.followers);
    $('span.following').html(data.following);
    $('span.duration').html(data.created_at);
    $('li a').attr('href',data.html_url)
    $.ajax({
        method:'GET',
        url:data.repos_url,
        dataType:'json',
        
    }).done(repos,err);
}
else{
    $('.list').hide();
    $('#repo').hide();
    $('#error').show()
}

}
function err(e){
console.log('error is',e)
}
function repos(data){
    $('ul.repos').empty()
    $.each(data,function(i,val){
     
        $('ul.repos').append('<li> <a href='+val.clone_url+' target=_blank>'+val.name+' </a></li>');

        
    });
    
}