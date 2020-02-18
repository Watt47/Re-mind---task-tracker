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
      //  html10n.localize("en");
        ui.screen.tasks();
        settings.init();
     //   html10n.localize("en");
        
        window.onerror = function(msg, url, line){
            if (JSON.parse(localStorage.getItem("settings")).showerrors)
              //  alert(_("debug_error", {msg: msg, url: url, line: line}));
                alert("Error:\n" + "Message: " + msg + "\nURL: " + url + "\nLine: " + line);
            return false;
        }
        window.addEventListener("orientationchange", function(){
                                var afterOrientationChange = function(){
                                    ui.reloadPage();
                                    window.removeEventListener("resize", afterOrientationChange);
                                };
                                window.addEventListener("resize", afterOrientationChange);
        });
        var alertOnResize = function(){/* alert(); */ui.reloadPage();};
        window.addEventListener("resize", alertOnResize);
    }
};
