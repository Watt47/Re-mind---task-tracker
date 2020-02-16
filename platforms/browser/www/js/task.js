function Task(name){
    this.name = name;
    this.complete = false;
    this.description = "";
    this.toString = function(){
        return JSON.stringify(this);
    };
}
var task = {
    arg: 0
}
