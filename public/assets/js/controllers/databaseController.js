function salvaDati(){

    $.ajax({
        url: '/getBackup',
        type: 'POST',
        data: JSON.stringify({key:"backup"}),
        cache: false,
        contentType: 'application/json',
        success: function(data) {

            if(data.errore){
                alert('DataBase non Esportato')
            }else {
                alert('DataBase Esportato con successo nella cartella databaseBackup !')
            }

        },
        faliure: function(data) {
        }
    });


}

function esportaDati(){

    $.ajax({
        url: '/exportXls',
        type: 'GET',
        cache: false,
        contentType: 'application/json',
        success: function(data) {
            alert('DataBase Esportato con successo nella cartella databaseBackup !')
        },
        faliure: function(data) {
        }
    });


}