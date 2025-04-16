document.addEventListener("DOMContentLoaded", function(event) {
    var greetings = [
        {greeting: "¡Hola!", language: "spanish"},
        {greeting: "Hello!", language: "english"},
        {greeting: "你好！", language: "chinese"},
        {greeting: "こんにちは！", language: "japones"},
        {greeting: "Bonjour!", language: "french"},
        {greeting: "Ciao!", language: "italian"},
        {greeting: "Olá!", language: "portuguese"},
        {greeting: "안녕하세요!", language: "koreano"}
    ];

    var id = 0;
    var interval = 1000;

    function showGreetings() {
        var greetingElement = document.getElementById("greetings");
        greetingElement.textContent = greetings[id].greeting;
        greetingElement.style.opacity = 1;
        setTimeout(function() {
            greetingElement.style.opacity = 0;
            id = (id + 1) % greetings.length;
            setTimeout(showGreetings, 1000);
        }, interval);
    }

    showGreetings();
});
