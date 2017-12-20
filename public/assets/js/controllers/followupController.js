var pazienti, cartellaClinica, indicePaziente, indicePazienteJSON, indiceNumeroCartella, indiceCartella;

var datiIntervento = {
    'username' : undefined
};

var datiFollowup = {
    'indagini_radiografiche' : undefined,
    'indagini_ecografiche' : undefined,
    'indegini_ematochimiche' : undefined,
    'follow_up' : undefined,
    'anni_precedenti' : undefined,
    'id_intervento' : undefined
};

$.ajax({
    url: '/getPaziente',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
        var combopazienti = data;
        var select = document.getElementById("paziente");
        pazienti = combopazienti;
        for(index in combopazienti) {
            select.options[select.options.length] = new Option(combopazienti[index].cognome + " " + combopazienti[index].nome, JSON.stringify(combopazienti[index]));
        }
    },
    faliure: function(data) {
        indicePazienteJSON = "";
    }
});

function changeSelectPaziente(){
    document.getElementById('cartellaClinica').options.length = 0;
    document.getElementById('numeroCartellaClinica').options.length = 0;
    indicePaziente = $('#paziente').val();
    indicePazienteJSON = JSON.parse(indicePaziente);

    $.ajax({
        url: '/getCartellaPaziente',
        type: 'POST',
        data: JSON.stringify(indicePazienteJSON),
        contentType: 'application/json',
        success: function(data) {
            var comboCartella = data;
            console.log(comboCartella);
            var selectCartella = document.getElementById("cartellaClinica");
            var selectNumeroCartela = document.getElementById("numeroCartellaClinica");
            selectCartella.options[selectCartella.options.length] = new Option('');
            selectNumeroCartela.options[selectNumeroCartela.options.length] = new Option('');
            cartellaClinica = comboCartella;
            for(index in comboCartella) {
                selectCartella.options[selectCartella.options.length] = new Option(comboCartella[index].cartella, JSON.stringify(comboCartella[index]));
                selectNumeroCartela.options[selectNumeroCartela.options.length] = new Option(comboCartella[index].numero_cartella, JSON.stringify(comboCartella[index]));
            }
        },
        faliure: function(data) {
            indicePazienteJSON = "";
            cartellaClinica = "";
            document.getElementById('cartellaClinica').options.length = 0;
        }
    });
}

function changeSelectCartellaClinica() {
    indiceCartella = JSON.parse($('#cartellaClinica').val());
    if ($('#numeroCartellaClinica').val() === ''){
        return;
    }else{
        indiceNumeroCartella = JSON.parse($('#numeroCartellaClinica').val());
        document.getElementById('fotoProfilo').style.display = 'block';
        document.getElementById('fotoProfilo').src = indiceNumeroCartella.foto_paziente.replace(/"/g, '');
    }
}

function changeSelectNumeroCartellaClinica() {
    indiceCartella = JSON.parse($('#cartellaClinica').val());
    indiceNumeroCartella = JSON.parse($('#numeroCartellaClinica').val());
    if ($('#numeroCartellaClinica').val() === ''){
        return;
    }else {
        document.getElementById('fotoProfilo').style.display = 'block';
        document.getElementById('fotoProfilo').src = indiceNumeroCartella.foto_paziente.replace(/"/g, '');
    }
    document.getElementById("intervento").options.length = 0;
    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);
    datiIntervento.username = indice2._id;
    $.ajax({
        url: '/getIntervento',
        type: 'POST',
        data: JSON.stringify(datiIntervento),
        cache: false,
        contentType: 'application/json',
        success: function(data) {

            var combointervento = data;
            for(var i =0; i<combointervento.length; i++){
                if(combointervento[i].data_intervento){

                    var d =new Date(combointervento[i].data_intervento);

                    combointervento[i].data_intervento = d;

                }
                combointervento[i].data_intervento = formatDate(combointervento[i].data_intervento);
            }
            var select = document.getElementById("intervento");
            intervento = combointervento;
            for(index in combointervento) {
                select.options[select.options.length] = new Option(combointervento[index].descrizione_intervento + " " + combointervento[index].data_intervento	, JSON.stringify(combointervento[index]));
            }

        },
        faliure: function(data) {
        }
    });
}

function salvaDati(){

    datiFollowup.id_intervento = indiceIntervento.id_tb_intervento;
    datiFollowup.indagini_radiografiche = $('#indaginiRadiografiche').val();
    datiFollowup.indagini_ecografiche = $('#indaginiEcografiche').val();
    datiFollowup.indegini_ematochimiche = $('#indaginiEmatochimiche').val();
    datiFollowup.follow_up = $('#followUp').val();
    datiFollowup.anni_precedenti = $('#anniPrecedenti').val();

    if(indicePazienteJSON === '' || indicePazienteJSON === "" || indicePazienteJSON === undefined)
    {
        alert('Non hai selezionato un paziente!');
    }
    else if (
        (datiFollowup.id_intervento          === '' || datiFollowup.id_intervento          === "" || datiFollowup.id_intervento          === undefined)||
        (datiFollowup.indagini_radiografiche === '' || datiFollowup.indagini_radiografiche === "" || datiFollowup.indagini_radiografiche === undefined)||
        (datiFollowup.indagini_ecografiche   === '' || datiFollowup.indagini_ecografiche   === "" || datiFollowup.indagini_ecografiche   === undefined)||
        (datiFollowup.indegini_ematochimiche === '' || datiFollowup.indegini_ematochimiche === "" || datiFollowup.indegini_ematochimiche === undefined)||
        (datiFollowup.follow_up              === '' || datiFollowup.follow_up              === "" || datiFollowup.follow_up              === undefined)||
        (datiFollowup.anni_precedenti        === '' || datiFollowup.anni_precedenti        === "" || datiFollowup.anni_precedenti        === undefined)
    ){
        alert('Inserire tutti i CAMPI!');
    } else {

        var indiceIntervento = JSON.parse($('#intervento').val());

        $.ajax({
            url: '/inserisciFollowUp',
            type: 'POST',
            data: JSON.stringify(datiFollowup),
            cache: false,
            contentType: 'application/json',
            success: function (data) {
                $('#indaginiRadiografiche').val('');
                $('#indaginiEcografiche').val('');
                $('#indaginiEmatochimiche').val('');
                $('#followUp').val('');
                $('#anniPrecedenti').val('');
                alert('Inserimento effettuato con Successo!');
            },
            faliure: function (data) {
            }
        });
    }
}

function formatDate(date) {
    var monthNames = [
        "Gennaio", "Febbraio", "Marzo",
        "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' '+hours+':'+minutes+':'+second;
}