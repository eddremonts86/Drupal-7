$(document).ready(function () {
window.addEventListener("load", function(){
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#efefef",
                "text": "#404040"
            },
            "button": {
                "background": "#8ec760",
                "text": "#ffffff"
            }
        },
        "theme": "classic",
        "content": {
            "message": "Denna hemsidan använder cookies för din bästa upplevelse av vår webbplats<br>Du kan ändra dina cookie-inställningar <a href='/cookies'>här</a><br>",
            "link": "Lär dig mer",
            "dismiss": "Förstår",
            "href": "/anvandningsvillkor"
        }
    })});

});
