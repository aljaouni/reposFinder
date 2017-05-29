$(document).ready(function () {
    document.addEventListener('deviceready',function () {
       getRepos(); 
    });
    $('.ui-input-clear').click(function () {
       $('#search_list').hide();
       $('#user_info').hide();
    });
    $('#search_btn').click(function (e) {
        e.preventDefault();
        var search_html='';
        var user_html='';
        var user_name=$("#search_input").val();
        var user_url="https://api.github.com/users/"+user_name;
        var repos_url="https://api.github.com/users/"+user_name+'/repos';
        
        $.ajax({
            url:repos_url,
            dataType:'jsonp',
            success:function (response) {
                $.ajax({
                    url:user_url,
                    dataType:'jsonp',
                    success:function (data) {
                        console.log(data);
                        user_html+='<h3><img src="'+data.data.avatar_url+'" class="thumbnails"><a target="_blank" href="'+data.data.html_url+'">'+data.data.name+'</a></h3><div style="clear: both"></div><br><br>';
                        $('#user_info').html(user_html);
                    }
                });
                $.each(response.data,function () {
                    search_html+='<li><h1><a target="_blank" href="'+this.html_url+' " >'+this.name+'</a></h1><p>By '+this.owner.login+'</p></li>';
                });
                $('#search_list').append(search_html);
                $('#search_list').listview('refresh');
            }
            
        })
    });
});
function getRepos() {
    var html='';
    $.ajax({
        url:"https://api.github.com/repositories",
        dataType:"jsonp",
        success:function (response) {
            $.each(response.data,function (i,item) {
                if (i<10){
                    html+='<li>' +
                        '<img class="thumbnails" src="'+this.owner.avatar_url+'">' +
                        '<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1>' +
                        '<p>By '+this.owner.login+'</p>' +
                        '</li>';
                }
            });
            $('#repo_list').append(html);
            $('#repo_list').listview('refresh');
        }
    });
}