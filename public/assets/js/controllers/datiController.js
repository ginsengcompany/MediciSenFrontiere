// Dopo aver fatto la query per le immagini che hai prelevato dal Db per quell'intervento avrai la possibilità di fare un ciclo!
// Potresti ad esempio tirare fuori un array di immagini ed adeguarti a questo tipo di logica che vedi sotto,
// ovver oavresti numeroImmaginiDaQuery lunghezza vettore e pathImmagini sono le immagini ovvero i path nell'array

var numeroImmaginiDaQuery = 40;
var pathImmagini = "https://cc-media-foxit.fichub.com/image/floptv/276a97a2-3f7e-4ae9-8ff9-3b0d1546ffc9/immagini-avatar-whatsapp-17-maxw-600.jpg";
var codiceGeneratoHTML = [];
var div = document.getElementById('fotoIntervento');
var i = 0;
for (i = 0; i < numeroImmaginiDaQuery; i++) {
    var elem = document.createElement("img");
    elem.setAttribute("src", pathImmagini);
    elem.setAttribute("id", "thumbImage" + i);
    elem.setAttribute("data-toggle", "modal");
    elem.setAttribute("data-target", "#myModal");
    elem.setAttribute("height", "100px");
    elem.setAttribute("width", "100px");
    elem.style.border = "3px solid #43ACDC";
    elem.style.margin = "3px 3px 3px 3px";
    document.getElementById("fotoIntervento").appendChild(elem);
}

function PrelevaElementiNelDiv(divID, elementoNelDiv) {
    var res = {};
    var elemento = document.getElementById(divID).getElementsByTagName("*");
    console.log(elemento.length);
    for (var i = 0; i < elemento.length; i++) {
        if (elemento[i].id.indexOf(elementoNelDiv) >= 0) {
            console.log(i);
            res[i] = elemento[i];
        }
    }
    return res;
}

var e = PrelevaElementiNelDiv("fotoIntervento", "thumbImage");
$(document).ready(function () {
    $('img').on('click', function () {
        var image = $(this).attr('src');
        //alert(image);
        $('#myModal').on('show.bs.modal', function () {
            $(".showimage").attr("src", image);
        });
    });
});