let form = document.getElementById('contactForm');

let nombre = document.getElementById('name');
let corregirNombre = document.getElementById('corregirNombre');

let telefono = document.getElementById('phone');
let corregirTelefono = document.getElementById('corregirTelefono');

let email = document.getElementById('email');
let corregirEmail = document.getElementById('corregirEmail');

let mensaje = document.getElementById('message');
let corregirMensaje = document.getElementById('corregirMensaje');

document.addEventListener('DOMContentLoaded', function() {
    form.addEventListener('submit', validarFormulario);
});

function validarFormulario(evento) {
    evento.preventDefault();
    let validar = true;  // Esta variable debe resetearse en cada envío del formulario

    validar = validarNombre();
    validar = validarTelefono();
    validar = validarEmail();
    validar = validarMensaje();

    if (validar === true) {
        form.submit();  // Solo se enviará si todas las validaciones son correctas
    }
}

function validarNombre() {
    if (nombre.value.trim() === "" || !/^[a-zA-Z0-9\s@$!%*?&]{1,50}$/.test(nombre.value)) {
        corregirNombre.style.color = 'red';
        corregirNombre.innerHTML = "El nombre debe tener entre 1 y 50 caracteres sin caracteres especiales";
        return false;
    } else {
        corregirNombre.innerHTML = "";
        return true;
    }
}

function validarTelefono() {
    if (telefono.value.trim() === "" || !/^[+]?[0-9]{1,25}(?:\s[0-9]{1,25})*$/.test(telefono.value)) {
        corregirTelefono.style.color = 'red';
        corregirTelefono.innerHTML = "El teléfono solo debe tener números y hasta 25 dígitos, sin espacios ni guiones";
        return false;
    } else {
        corregirTelefono.innerHTML = "";
        return true;
    }
}

function validarEmail() {
    if (email.value.trim() === "" || !/^[a-zA-Z0-9\s\.]{1,40}@[a-zA-Z0-9\s\.]{1,40}$/.test(email.value)) {
        corregirEmail.style.color = 'red';
        corregirEmail.innerHTML = "El email debe ser válido (contener @)";
        return false;
    } else {
        corregirEmail.innerHTML = "";
        return true;
    }
}

function validarMensaje() {
    if (mensaje.value.trim() === "" || !/^[a-zA-Z0-9\s@$!%*?&]{1,50}$/.test(mensaje.value)) {
        corregirMensaje.style.color = 'red';
        corregirMensaje.innerHTML = "El mensaje debe tener entre 1 y 50 caracteres y un carácter especial";
        return false;
    } else {
        corregirMensaje.innerHTML = "";
        return true;
    }
}
