var cartellaClinica, indicePaziente, indicePazienteJSON, indiceCartella;

indicePazienteJSON = { "_id":undefined};

var datiIntervento = {
    'username' : undefined
};

var idCartella = {
    'id_cartella' : undefined
};

function setTabInformazioni(indiceCartella) {

    tabInformazioni = $('#tabellaInformazioni').DataTable( {
        responsive: true,
        bDestroy: true,
        ajax: {
            url: "/getInformazioni",
            contentType: "application/json",
            type: "POST",
            data:  function ( d ) {
                return JSON.stringify(indiceCartella)
            }
        },
        columns: [
            { "data": "data_ricovero" , "render": function (data) {
                function pad(s) { return (s < 10) ? '0' + s : s; }
                var d = new Date(data);
                return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
            }},
            { "data": "data_dimissione" , "render": function (data) {
                if(data !== null){
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length < 10 ? "0" + month : month) + "/" + date.getFullYear();
                }
                else{
                    var label = "-";
                    return label;
                }
            }},
            { "data": "diagnosi"},
            { "data": "anamnesi"},
            { "data": "consulenza_chiurugica"},
            { "data": "consulenza_anestesiologica"}
        ]
    } );

}

function setTabFollowUp(indiceIntervento) {
	
	
    tabFollowUp = $('#tabellaFollowUp').DataTable( {
        responsive: true,
        bDestroy: true,
        ajax: {
            url: "/getFollowUp",
            contentType: "application/json",
            type: "POST",
            data:  function ( d ) {
                return JSON.stringify(indiceIntervento)
            }
        },
        columns: [
            { "data": "data" , "render": function (data) {
                if(data !== null){
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length < 10 ? "0" + month : month) + "/" + date.getFullYear();
                }
                else{
                    var label = "-";
                    return label;
                }
            }},
            { "data": "indagini_ecografiche"},
            { "data": "indagini_radiografiche"},
            { "data": "indagini_ematochimiche"},
            { "data": "follow_up"},
            { "data": "anni_precedenti"}
        ]
    } );

}

function convertDate(inputFormat) {
    if(inputFormat !== null){
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }
    else{
        var label = "-";
        return label;
    }

}

function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
        '<td>Surgey Children:</td>'+
        '<td>'+d.surgey_children+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>St Mary Hospital:</td>'+
        '<td>'+d.st_mary_hospital+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Villaggio:</td>'+
        '<td>'+d.villaggio+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Distretto:</td>'+
        '<td>'+d.distretto+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Contea:</td>'+
        '<td>'+d.contea+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>madre:</td>'+
        '<td>'+d.madre+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Padre:</td>'+
        '<td>'+d.padre+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Telefono:</td>'+
        '<td>'+d.telefono+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Malaria:</td>'+
        '<td>'+d.malaria+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Data Inizio Malaria:</td>'+
        '<td>'+convertDate(d.malaria_inizio)+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Data Fine Malaria:</td>'+
        '<td>'+convertDate(d.malaria_fine)+'</td>'+
        '</tr>'+
        '</table>';
}

$(document).ready(function() {

    tabPazienti = $('#tabellaPazienti').DataTable( {
        ajax: "/getPaziente",
        responsive: true,
        ajaxSettings: {
            method: "GET",
            cache: false
        },
        columns: [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "cognome" },
            { "data": "nome" },
            { "data": "sesso"},
            { "data": "surgey_children", "visible": false },
            { "data": "st_mary_hospital", "visible": false },
            { "data": "villaggio", "visible": false },
            { "data": "distretto", "visible": false },
            { "data": "contea", "visible": false },
            { "data": "madre", "visible": false },
            { "data": "padre", "visible": false },
            { "data": "telefono", "visible": false },
            { "data": "malaria", "visible": false },
            { "data": "malaria_inizio" , "render": function (data) {
                function pad(s) { return (s < 10) ? '0' + s : s; }
                var d = new Date(data);
                return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
            }, "visible": false},
            { "data": "malaria_fine" , "render": function (data) {
                function pad(s) { return (s < 10) ? '0' + s : s; }
                var d = new Date(data);
                return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
            }, "visible": false}
        ]
    } );

    $('#tabellaPazienti tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            ids1 = $.map(tabPazienti.rows('.selected').data(), function (item) {
                return item;
            });
            arrayPaziente = ids1;
            changeSelectPaziente(arrayPaziente);
        }
        else {
            tabPazienti.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            ids1 = $.map(tabPazienti.rows('.selected').data(), function (item) {
                return item;
            });
            arrayPaziente = ids1;
            changeSelectPaziente(arrayPaziente);

        }
    } );

    $('#tabellaPazienti tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tabPazienti.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

});

function changeSelectPaziente(arrayPaziente){
    if (arrayPaziente.length<0)
    {
        document.getElementById('fotoProfilo').style.display = 'none';
        return;
    }
    else
    {
        document.getElementById('cartellaClinica').options.length = 0;
        document.getElementById('numeroCartellaClinica').options.length = 0;
        document.getElementById('fotoProfilo').style.display = 'none';
        indicePaziente = arrayPaziente[0]._id;
        indicePazienteJSON._id = indicePaziente;

        $.ajax({
            url: '/getCartellaPaziente',
            type: 'POST',
            data: JSON.stringify(indicePazienteJSON),
            contentType: 'application/json',
            success: function (data) {
                var comboCartella = data;
                var selectCartella = document.getElementById("cartellaClinica");
                selectCartella.options[selectCartella.options.length] = new Option('');
                cartellaClinica = comboCartella;
                for (index in comboCartella) {
                    selectCartella.options[selectCartella.options.length] = new Option(comboCartella[index].cartella, JSON.stringify(comboCartella[index]));
                }
            },
            faliure: function (data) {
                indicePazienteJSON = "";
                cartellaClinica = "";
                document.getElementById('cartellaClinica').options.length = 0;
            }
        });
    }
}

function changeSelectCartellaClinica() {
	
	var indice = $('#cartellaClinica').val();
	
	if(!indice){
		
	document.getElementById("numeroCartellaClinica").options.length=0;

    document.getElementById('fotoProfilo').style.display = 'none';

    $('#numeroCartellaClinica').val('');
	document.getElementById('dataIntervento').value = "";
    document.getElementById('descrizioneIntervento').value = "";
    document.getElementById('foglioDiarioClinico').value = "";
    document.getElementById('complicanze').value = "";
	
	$('#tabellaFollowUp').dataTable().fnClearTable();
	
	$('#tabellaInformazioni').dataTable().fnClearTable();
	document.getElementById("fotoIntervento").innerHTML="";
		
	}
	else if(indice){
		
    document.getElementById("numeroCartellaClinica").options.length=0;

    document.getElementById('fotoProfilo').style.display = 'none';

    $('#numeroCartellaClinica').val('');
	document.getElementById('dataIntervento').value = "";
    document.getElementById('descrizioneIntervento').value = "";
    document.getElementById('foglioDiarioClinico').value = "";
    document.getElementById('complicanze').value = "";
	
	$('#tabellaFollowUp').dataTable().fnClearTable();
	
	$('#tabellaInformazioni').dataTable().fnClearTable();
	document.getElementById("fotoIntervento").innerHTML="";		

    indiceCartella = JSON.parse($('#cartellaClinica').val());
    idCartella.id_cartella = indiceCartella.id_cartella;

    $.ajax({
        url: '/getNumeroCartella',
        type: 'POST',
        data: JSON.stringify(idCartella),
        contentType: 'application/json',
        success: function(data) {

            var select = document.getElementById("numeroCartellaClinica");
            select.options[select.options.length] = new Option('');
            for(index in data) {
                select.options[select.options.length] = new Option(data[index].numero_cartella, JSON.stringify(data[index]));
            }
        },
        faliure: function(data) {
            display.alert('Errore nel prelievo delle informazioni!');
        }
    });

	}

}

function changeSelectNumeroCartellaClinica() {
    indiceCartella = JSON.parse($('#cartellaClinica').val());
    document.getElementById('fotoProfilo').style.display = 'block';
    document.getElementById('fotoProfilo').src = indiceCartella.foto_paziente.replace(/"/g, '');
    document.getElementById("intervento").options.length = 0;
    datiIntervento.username = arrayPaziente[0]._id;
    datiIntervento.id_cartella = indiceCartella.id_cartella;

    setTabInformazioni(indiceCartella);

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
            select.options[select.options.length] = new Option('');
            for(index in combointervento) {
                select.options[select.options.length] = new Option(combointervento[index].descrizione_intervento + " " + combointervento[index].data_intervento	, JSON.stringify(combointervento[index]));
            }

        },
        faliure: function(data) {
        }
    });
}

function changeSelectIntervento(){
	

    var indice = $('#intervento').val();
    
	
	if(!indice){
		
	document.getElementById('dataIntervento').value = "";
    document.getElementById('descrizioneIntervento').value = "";
    document.getElementById('foglioDiarioClinico').value = "";
    document.getElementById('complicanze').value = "";
	
	$('#tabellaFollowUp').dataTable().fnClearTable();
	document.getElementById("fotoIntervento").innerHTML="";
		
	}
	else if(indice){
		
		var indice2 = JSON.parse(indice);
		
		 document.getElementById('dataIntervento').value = indice2.data_intervento;
    document.getElementById('descrizioneIntervento').value = indice2.descrizione_intervento;
    document.getElementById('foglioDiarioClinico').value = indice2.foglio_diario_clinico;
    document.getElementById('complicanze').value = indice2.complicanze;

    setTabFollowUp(indice2);



    $.ajax({
        url: '/getFotoIntervento',
        type: 'POST',
        data: JSON.stringify(indice2),
        cache: false,
        contentType: 'application/json',
        success: function(data) {
			
			document.getElementById("fotoIntervento").innerHTML="";

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
                elem.setAttribute("height", "150px");
                elem.setAttribute("width", "250");
                elem.style.border = "3px solid #43ACDC";
                elem.style.margin = "3px 3px 3px 3px";
                document.getElementById("fotoIntervento").appendChild(elem);
            }

            $(document).ready(function () {
                $('img').on('click', function () {
                    var image = $(this).attr('src');
                    $('#myModal').on('show.bs.modal', function () {
                        $(".imagepreview").attr("src", image);
                    });
                });
            });


        },
        faliure: function(data) {
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

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

$(function() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth()+1; //January is 0!
    var valueMonth=yyyy+'-'+mm;
    $('#searchcartellaClinica').val(valueMonth);
});

function searchTable(){

    var datiSearch = {
        "cartella": "",
        "numero_cartella": ""
    };

    if(($('#searchcartellaClinica').val() !== '' || $('#searchcartellaClinica').val() !== null) && ($('#searchnumeroCartella').val() !== '' || $('#searchnumeroCartella').val() !== null)){

        datiSearch.cartella = $('#searchcartellaClinica').val();
        datiSearch.numero_cartella = $('#searchnumeroCartella').val();

        $.ajax({
            url: '/searchTable',
            type: 'POST',
            data: JSON.stringify(datiSearch),
            contentType: 'application/json',
            success: function(data) {
                console.log(data[0]);
                tabPazienti.search( data[0].cognome +" "+ data[0].nome).draw();
            },
            faliure: function(data) {

            }
        });

    }

}

