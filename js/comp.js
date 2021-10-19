function changeLanguage(language) {
    var element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
}

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function hideDropdown() {
    document.getElementById("myDropdown").classList.remove("show");
}

// function sendMail() {
//     var link = "mailto:me@example.com"
//              + "?cc=lsoraire@mpdtucuman.gob.ar"
//              + "&subject=" + escape("This is my subject")
//              + "&body=" + escape(document.getElementById('email').value)
//     ;

//     window.location.href = link;
// }

//update this with your js_form selector
var form_id_js = "formulario_contacto";

var data_js = {
    "access_token": "2jnt74h4dmeowdimyfiqqwhk"
};

function js_onSuccess() {
    // remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
    var divRespuesta = document.getElementByClass("respuesta");
    var spanRespuesta = document.getElementById("mensajeRespuesta");
    spanRespuesta.innerHTML = "TODO OK";
    divRespuesta.show();
    setTimeout(()=>{
    divRespuesta.hidden();
    },2000);
}

function js_onError(error) {
    // remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

var sendButton = document.getElementById("js_send");

function js_send() {
    sendButton.value='Sending…';
    sendButton.disabled=true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
        if(request.readyState == 4) {
            js_onError(request.response);
        }
    };

    var texto = document.querySelector("#" + form_id_js + " [name='texto']").value;
    var email = document.querySelector("#" + form_id_js + " [name='email']").value;
    var nombre = document.querySelector("#" + form_id_js + " [name='nombre']").value;
    var celular = document.querySelector("#" + form_id_js + " [name='celular']").value;
    var impresora= document.querySelector("#" + form_id_js + " [name='impresora']").value;
    var insumo = document.querySelector("#" + form_id_js + " [name='insumo']").value;
    var message= "Email:"+email+"\r\nNombre:"+nombre+"\r\nCelular:"+celular+"\r\nImpresora:"+impresora+"\r\nInsumo:"+insumo+"\r\nMensaje:"+texto;

    data_js['subject'] = "Formulario de Solicitud de insumo";
    data_js['text'] = message;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});