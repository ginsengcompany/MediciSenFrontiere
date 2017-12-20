var pazienti;

var getDatiPazientePerCartella = {
    'idPaziente' : undefined,
    'idCartella' : undefined
}

var datiInFormazioni = {
    'id_cartella' : undefined
};

var datiIntervento = {
    'idCartella' : '',
    'idPaziente': ''
};

var datiFotoIntervento = {
    'username' : '',
    'intervento' : ''
};

$.ajax({
    url: '/getPaziente',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
        var combopazienti = data;
        var select = document.getElementById("paziente");
        pazienti = combopazienti;
        document.getElementById("formCartellaClinica").readOnly = false;
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
    document.getElementById('villaggio').value = '';
    document.getElementById('distretto').value = '';
    document.getElementById('contea').value    = '';
    document.getElementById('sesso').value     = '';
    document.getElementById('telefono').value  = '';
    document.getElementById('madre').value     = '';
    document.getElementById('padre').value     = '';
    document.getElementById('telefono').value  = '';
    document.getElementById('malaria').value   = '';
    document.getElementById('dalGiorno').value = '';
    document.getElementById('alGiorno').value  = '';
    document.getElementById('anni').value     = '';
    document.getElementById('peso').value     = '';

    indicePaziente = $('#paziente').val();
    indicePazienteJSON = JSON.parse(indicePaziente);

    $.ajax({
        url: '/getCartellaPaziente',
        type: 'POST',
        data: JSON.stringify(indicePazienteJSON),
        contentType: 'application/json',
        success: function(data) {
            var comboCartella = data;
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
    if ($('#cartellaClinica').val() === ''){
        return;
    }else{
        indiceNumeroCartella = JSON.parse($('#cartellaClinica').val());
        document.getElementById('fotoProfilo').style.display = 'block';
        document.getElementById('fotoProfilo').src = indiceNumeroCartella.foto_paziente.replace(/"/g, '');
    }
}

function changeSelectNumeroCartellaClinica() {
    if ($('#numeroCartellaClinica').val() === ''){
        return;
    }else {
        indiceCartella = JSON.parse($('#numeroCartellaClinica').val());

        document.getElementById('fotoProfilo').style.display = 'block';
        document.getElementById('fotoProfilo').src = indiceNumeroCartella.foto_paziente.replace(/"/g, '');

        getDatiPazientePerCartella.idCartella =  indiceCartella.id_cartella;
        getDatiPazientePerCartella.idPaziente = indiceCartella._id;

        $.ajax({
            url: '/getDatiPazientePerCartella',
            type: 'POST',
            data: JSON.stringify(getDatiPazientePerCartella),
            contentType: 'application/json',
            success: function(data) {
                var risultato = data;
                var k = new Date(risultato[0].malaria_inizio);
                var y = new Date(risultato[0].malaria_fine);
                risultato[0].malaria_inizio = formatDate(k);
                risultato[0].malaria_fine = formatDate(y);
                document.getElementById('villaggio').value = risultato[0].villaggio;
                document.getElementById('distretto').value = risultato[0].distretto;
                document.getElementById('contea').value = risultato[0].contea;
                document.getElementById('sesso').value = risultato[0].sesso;
                document.getElementById('telefono').value = risultato[0].peso;
                document.getElementById('madre').value = risultato[0].madre;
                document.getElementById('padre').value = risultato[0].padre;
                document.getElementById('telefono').value = risultato[0].telefono;
                document.getElementById('malaria').value = risultato[0].malaria;
                document.getElementById('dalGiorno').value = risultato[0].malaria_inizio;
                document.getElementById('alGiorno').value = risultato[0].malaria_fine;
                document.getElementById('anni').value = risultato[0].anni;
                document.getElementById('peso').value = risultato[0].peso;
            },
            faliure: function(data) {
                display.alert('Errore nel caricamento dei dati!');
            }
        });

        datiInFormazioni.id_cartella = indiceCartella.id_cartella;
        $.ajax({
            url: '/getInformazioni',
            type: 'POST',
            data: JSON.stringify(datiInFormazioni),
            cache: false,
            contentType: 'application/json',
            success: function(data) {

                var informazioni = data;

                if(
                    (informazioni[0].data_ricovero === '' || informazioni[0].data_ricovero === "" || informazioni[0].data_ricovero === undefined) ||
                    (informazioni[0].data_dimissione === '' || informazioni[0].data_dimissione === "" || informazioni[0].data_dimissione === undefined)
                ){
                    document.getElementById('dataRicovero').value   = new Date("1900", "0", "0", "0", "0", "0", "0");
                    document.getElementById('dataDimissione').value = new Date("1900", "0", "0", "0", "0", "0", "0");
                    document.getElementById('diagnosi').value = "";
                    document.getElementById('anamnesi').value = "";
                    document.getElementById('consulenzaChirurgica').value = "";
                    document.getElementById('consulenzaAnestesiologica').value = "";
                }
                else {
                    var d = new Date(informazioni[0].data_ricovero);
                    var x = new Date(informazioni[0].data_dimissione);
                    informazioni[0].data_ricovero = d;
                    informazioni[0].data_dimissione = x;
                    informazioni[0].data_ricovero = formatDate(informazioni[0].data_ricovero);
                    informazioni[0].data_dimissione = formatDate(informazioni[0].data_dimissione);
                    document.getElementById('dataRicovero').value = informazioni[0].data_ricovero;
                    document.getElementById('dataDimissione').value = informazioni[0].data_dimissione;
                    document.getElementById('diagnosi').value = informazioni[0].diagnosi;
                    document.getElementById('anamnesi').value = informazioni[0].anamnesi;
                    document.getElementById('consulenzaChirurgica').value = informazioni[0].consulenza_chiurugica;
                    document.getElementById('consulenzaAnestesiologica').value = informazioni[0].consulenza_anestesiologica;
                }
            },
            faliure: function(data) {
                display.alert('Errore nel caricamento dei dati!');
            }
        });

        datiIntervento.idCartella = indiceCartella.id_cartella;
        datiIntervento.idPaziente = indiceCartella._id;

        $.ajax({
            url: '/getDatiInterventoPerCartella',
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
                var option = document.createElement("option");
                option.text = " ";
                select.add(option);
                intervento = combointervento;
                for(index in combointervento) {
                    select.options[select.options.length] = new Option(combointervento[index].descrizione_intervento + " " + combointervento[index].data_intervento	, JSON.stringify(combointervento[index]));
                }

            },
            faliure: function(data) {
            }
        });

    }
}

function changeSelectIntervento(){

    var indice = $('#intervento').val();
    var indice2 = JSON.parse(indice);

    document.getElementById('dataIntervento').value = indice2.data_intervento;
    document.getElementById('descrizioneIntervento').value = indice2.descrizione_intervento;
    document.getElementById('foglioDiarioClinico').value = indice2.foglio_diario_clinico;
    document.getElementById('complicanze').value = indice2.complicanze;

    console.log(indice2);

    datiFotoIntervento.intervento = indice2._id;
    $.ajax({
        url: '/getFotoIntervento',
        type: 'POST',
        data: JSON.stringify(datiFotoIntervento),
        cache: false,
        contentType: 'application/json',
        success: function(data) {

            fotoIntervento = data;
            var numeroImmaginiDaQuery = fotoIntervento.length;
            var codiceGeneratoHTML = [];
            var div = document.getElementById('fotoIntervento');
            var i = 0;
            for (i = 0; i < numeroImmaginiDaQuery; i++) {
                var elem = document.createElement("img");
                elem.setAttribute("src", fotoIntervento[i].foto_intervento);
                elem.setAttribute("id", "thumbImage" + i);
                elem.setAttribute("data-toggle", "modal");
                elem.setAttribute("data-target", "#myModal");
                elem.setAttribute("height", "100px");
                elem.setAttribute("width", "100px");
                elem.style.border = "3px solid #43ACDC";
                elem.style.margin = "3px 3px 3px 3px";
                document.getElementById("fotoIntervento").appendChild(elem);
            }

            $(document).ready(function () {
                $('img').on('click', function () {
                    var image = $(this).attr('src');
                    //alert(image);
                    $('#myModal').on('show.bs.modal', function () {
                        $(".showimage").attr("src", image);
                    });
                });
            });


        },
        faliure: function(data) {
        }
    });
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
