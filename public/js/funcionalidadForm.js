//Script para validar formulario
document.getElementById("contactForm").addEventListener("submit", function(event) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;
    
    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Por favor, complete todos los campos");
        event.preventDefault();
    }
});
console.log("FuncionalidadForm conectado");