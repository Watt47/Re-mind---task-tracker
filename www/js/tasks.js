var tasks = {
tasksName: "tasks",
tasks: [],
saveTasks: function(){
    localStorage.setItem(tasks.tasksName, JSON.stringify(tasks.tasks));
},
loadTasks: function(){
    tasks.tasks = JSON.parse(localStorage.getItem(tasks.tasksName));
},
addTask: function(name){
    if (!tasks.tasks){
        tasks.tasks = new Array();
    }
    tasks.tasks.push(new Task(name));
    tasks.tasks[tasks.tasks.length-1].id = tasks.tasks.length - 1 ? tasks.tasks[tasks.tasks.length-2].id + 1 : 1;
    tasks.saveTasks();
    tasks.loadTasks();
    //tasks.toTable();
},
toString: function(){
    return JSON.stringify(tasks.tasks);
},
toTable: function(){
    var table = document.getElementById("tasks_table");
    table.innerHTML = "";
    table.border = 1
    var obj = tasks.tasks;
    if (!obj) return null;
    var header = table.createTHead();
    var row = header.insertRow(0);
    var row0 = obj[0];
    for (var property in row0) {
        if (row0.hasOwnProperty(property)) {
            // do stuff
            var x = row.insertCell(-1);
            x.innerHTML = property.bold();//making title bold style
        }
    }
    obj.forEach(function(item, index){
        var row = table.insertRow(-1);
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                var x = row.insertCell(-1);
                switch(key){
                    case "complete":
                        var ch = x.createChildElement("input", "type=checkbox");
                        ch.checked = item[key];
                        break;
                    default:
                        x.innerHTML = item[key];
                }
                var pressTimer;
                var actionComplete = false;
                if (key == "name"){
                    x.onmousedown = function(ev){
                        pressTimer = setTimeout(function(){
                                        actionComplete = true;
                                        var editTask = ev.target.createChildElement("input", "type=edit");
                                        editTask.value = item["name"];
                                        if (editTask.previousSibling)
                                        editTask.parentNode.removeChild(editTask.previousSibling);
                                        editTask.onkeypress = function(e) {
                                            var code = (e.keyCode ? e.keyCode : e.which);
                                            if ((code==13) || (code==10)){
                                                item.name = editTask.value;
                                                tasks.saveTasks();
                                                tasks.loadTasks();
                                                tasks.toTable();
                                            }
                                        };
                                                
                                            }, 1000);
                    };
                    x.ontouchstart = function(ev){
                        pressTimer = setTimeout(function(){
                                        actionComplete = true;
                                        var editTask = ev.target.createChildElement("input", "type=edit");
                                        editTask.value = item["name"];
                                        if (editTask.previousSibling)
                                        editTask.parentNode.removeChild(editTask.previousSibling);
                                        editTask.onkeypress = function(e) {
                                            var code = (e.keyCode ? e.keyCode : e.which);
                                            if ((code==13) || (code==10)){
                                                item.name = editTask.value;
                                                tasks.saveTasks();
                                                tasks.loadTasks();
                                                tasks.toTable();
                                            }
                                        };
                                                
                                            }, 1000);
                    };
                    x.onmouseup = function(){
                      //  alert(actionComplete);
                        clearTimeout(pressTimer);
                        if (actionComplete) return;
                        ui.screen.task(item);
                        task.arg = index;
                    };
                x.ontouchend = function(){
                   // alert(actionComplete);
                    clearTimeout(pressTimer);
                    if (actionComplete) return;
                    ui.screen.task(item);
                    task.arg = index;
                };                }
                if (key == "complete"){
                x.oninput = function(){
                    item.complete = ch.checked;
                    tasks.saveTasks();
                    tasks.loadTasks();
                    tasks.toTable();
                }
                }
            }
        }
    });
    return table;
}
}
