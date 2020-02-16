var tasks = {
tasksName: "tasks",
filterShowDone: true,
tasks: [],
saveTasks: function(){
    localStorage.setItem(tasks.tasksName, JSON.stringify(tasks.tasks));
},
loadTasks: function(){
   // alert("loadt");
    tasks.tasks = JSON.parse(localStorage.getItem(tasks.tasksName));
 //   alert(123);
   // let arr = tasks.tasks.filter(el => el != null);
 //   alert(450);
  //  tasks.tasks = arr;
 //   alert("lend");
},
addTask: function(name){
    if (!tasks.tasks){
        tasks.tasks = new Array();
    }
    tasks.tasks.push(new Task(name));
    tasks.tasks[tasks.tasks.length-1].id = tasks.tasks.length - 1 ? tasks.maxId(tasks.tasks) + 1 : 1;
    tasks.saveTasks();
    tasks.loadTasks();
    //tasks.toTable();
},
sort: function(field){
    tasks.tasks.sort(function(a, b){
                     return (a[field] - b[field]) * tasks.asc;
                     });
},
order: "id", asc: 1,
maxId: function(arr){
    let max = arr[0].id;
    for (let el of arr){
        if (!el) continue;
        if (el.id > max){
            max = el.id;
        }
    }
    return max;
},
toString: function(){
    return JSON.stringify(tasks.tasks);
},
toTable: function(){
    var table = document.getElementById("tasks_table");
    table.innerHTML = "";
    var obj = tasks.tasks;
    if (!obj) return null;
    var header = table.createTHead();
    var row = header.insertRow(0);
    var row0 = obj[0];
    for (var property in row0) {
        if (row0.hasOwnProperty(property)) {
            var x = row.createChildElement("th");
            switch (property){
                    case "complete":
                   //     x.innerHTML = _("tasks_field_done");//.bold();
                      //  x.classList.add("bold");
                        x.setResId("tasks_field_done");
                    x.onclick = function(){
                        tasks.asc = -tasks.asc;
                        tasks.sort(property);
                        tasks.toTable();
                    };
                        break;
                    default:
                   //     x.innerHTML = _("tasks_field_" + property);
                    //    x.classList.add("bold");
                        x.setResId("tasks_field_" + property);
                    x.onclick = function(){
                        tasks.asc = -tasks.asc;
                       tasks.sort(property);
                        tasks.toTable();
                    };
            }
        }
    }
    var tb = table.createChildElement("tbody");
    tasks.sort(tasks.order);
    obj.forEach(function(item, index){
        if (item == null) return;
        if (item.complete && !tasks.filterShowDone) return;
        var row = tb.insertRow(-1);
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                var x = row.insertCell(-1);
                switch(key){
                    case "complete":
                       // var ch = x.createChildElement("input", "type=checkbox");
                    //    ch.checked = item[key];
                        var ch = ui.customCheckbox(x);
                        ch.children[0].checked = item[key];
                        x.style.textAlign = "center";
                        break;
                    case "id":
                        x.innerHTML = item[key];
                        x.style.textAlign = "center";
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
                        clearTimeout(pressTimer);
                        if (actionComplete) return;
                        ui.screen.task(item);
                        task.arg = index;
                    };
                x.ontouchend = function(){
                    clearTimeout(pressTimer);
                    if (actionComplete) return;
                    ui.screen.task(item);
                    task.arg = index;
                };                }
                if (key == "complete"){
                x.oninput = function(){
             //       item.complete = ch.checked;
                item.complete = ch.children[0].checked
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
