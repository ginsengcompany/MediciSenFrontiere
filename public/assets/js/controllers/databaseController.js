function salvaDati(){

    $.ajax({
        url: '/getBackup',
        type: 'POST',
        data: JSON.stringify({key:"backup"}),
        cache: false,
        contentType: 'application/json',
        success: function(data) {

        },
        faliure: function(data) {
        }
    });


}