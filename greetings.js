document.addEventListener("DOMContentLoaded", function(event) {
    var saludos = [
        {texto: "¡Hola!", idioma: "español"},
        {texto: "Hello!", idioma: "inglés"},
        {texto: "你好！", idioma: "chino"},
        {texto: "こんにちは！", idioma: "japonés"},
        {texto: "Bonjour!", idioma: "francés"},
        {texto: "Ciao!", idioma: "italiano"},
        {texto: "Olá!", idioma: "portugués"},
        {texto: "안녕하세요!", idioma: "coreano"}
    ];

    var indice = 0;
    var intervalo = 1000; // Cambia cada 3 segundos (3000 milisegundos)

    function mostrarSaludo() {
        var saludoElement = document.getElementById("saludo");
        saludoElement.textContent = saludos[indice].texto;
        saludoElement.style.opacity = 1;
        setTimeout(function() {
            saludoElement.style.opacity = 0;
            indice = (indice + 1) % saludos.length;
            setTimeout(mostrarSaludo, 1000); // Espera 1 segundo antes de mostrar el siguiente saludo
        }, intervalo);
    }

    mostrarSaludo();
});
