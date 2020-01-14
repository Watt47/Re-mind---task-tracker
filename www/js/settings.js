var settings = {

init: function(){
    if(localStorage.getItem("settings") === null) {
        localStorage.setItem("settings", JSON.stringify({showerrors: false}));
    }
    }
};
