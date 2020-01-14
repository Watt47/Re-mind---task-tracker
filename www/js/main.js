var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var listeningElement = document.getElementById('loading');
        listeningElement.setAttribute('style', 'display:none;');
        common.init();
        ui.screen.tasks();
        settings.init();
        
        window.onerror = function(msg, url, line){
            if (JSON.parse(localStorage.getItem("settings")).showerrors)
                alert("Error:\n" + "Message: " + msg + "\nURL: " + url + "\nLine: " + line);
        }
    }
};
