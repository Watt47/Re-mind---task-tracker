var menu = {
root: null,
init: function(root){
    menu.root = document.getElementById('footer');
    document.getElementById("menu").remove();
    var ul = menu.root.createChildElement('ul', 'class=menu,id=menu');
    this.appendMenuIcon(ul, "icons8-to-do-26-2.png").onclick = function(){
        ui.screen.task();
    };
    this.appendMenuIcon(ul, "icons8-settings-24.png").onclick = function(){
        ui.screen.settings();
    };
    /*
    this.appendMenuItem(ul, "tasks_menu_removeall", "Remove all").onclick = function(){
        if (confirm(_("tasks_warning_deleteall"))){
            tasks.tasks = [];
            tasks.saveTasks();
            tasks.loadTasks();
            tasks.toTable();
        }
    };*/
    this.appendMenuIcon(ul, "icons8-filter-24.png").onclick = function(){
        tasks.filterShowDone = !tasks.filterShowDone;
        tasks.toTable();
    };
    this.appendMenuIcon(ul, "icons8-about-24.png").onclick = function(){
        ui.about();
    };
},
appendMenuItem: function(ul, resId, text, disabled = false){
    var menu1 = ul.createChildElement('li').createChildElement('a');
    menu1.href = "javascript:void(0)";
    menu1.onclick = function(){
        alert(text);
    };
    menu1.appendChild(document.createTextNode(text));
    if (disabled)
        menu1.classList.add("disabled");
    menu1.setResId(resId);
    return menu1;
},
appendMenuIcon: function(ul, imgsrc, disabled = false){
    var menu1 = ul.createChildElement('li').createChildElement('a');
    menu1.href = "javascript:void(0)";
    var img = menu1.createChildElement("img", "src=icons/" + imgsrc);
    if (disabled)
        menu1.classList.add("disabled");
    return menu1;
},
task: function(root, newtask){
    document.getElementById("menu").remove();
    var ul = menu.root.createChildElement('ul', 'class=menu,id=menu');
    this.appendMenuIcon(ul, "icons8-to-do-26.png").onclick = function(){
        ui.screen.tasks();
    };
    this.appendMenuIcon(ul, "icons8-edit-24.png", newtask).onclick = function(e){
        if (newtask){
            //alert(0);
            return;
        }
        document.getElementById("name").disabled = false;
        document.getElementById("description").disabled = false;
    };
    this.appendMenuIcon(ul, "icons8-save-26.png").onclick = function(){
      //  alert(1);
        if (newtask){
      //      alert(tasks.tasks.length);
            task.arg = tasks.tasks.length;
            tasks.addTask(document.getElementById("name").value);
      //      alert(tasks);
        }
    //    alert(12);
        tasks.tasks[task.arg].name = document.getElementById("name").value;
        tasks.tasks[task.arg].complete = document.getElementById("complete").children[0].checked;
        tasks.tasks[task.arg].description = document.getElementById("description").value;
        tasks.saveTasks();
        ui.screen.tasks();
     //   alert(4);
        if (newtask){
            tasks.tasks[tasks.tasks.length-1].id = tasks.tasks.length - 1 ? tasks.tasks[tasks.tasks.length-2].id + 1 : 1;
        }
  //      alert(3);
    };
    this.appendMenuIcon(ul, "icons8-task-completed-24 copy.png").onclick = function(){
        if (!newtask)
            tasks.tasks[task.arg].complete = true;
        document.getElementById("complete").children[0].checked = true;
    };
    this.appendMenuIcon(ul, "icons8-delete-26.png", newtask).onclick = function(){
        if (newtask){
            return;
        }
        if (confirm(_("task_warning_delete"))){
           // tasks.tasks.splice(task.arg, 1);
          //  tasks.tasks[task.arg] = null;
            tasks.tasks.swapDelete(task.arg);
            tasks.saveTasks();
            ui.screen.tasks();
        }
    };
    this.appendMenuIcon(ul, "icons8-about-24.png").onclick = function(){
        ui.about();
    };
},
settings : function(){
        document.getElementById("menu").remove();
        var ul = menu.root.createChildElement('ul', 'class=menu,id=menu');
        this.appendMenuIcon(ul, "icons8-to-do-26.png").onclick = function(){
              ui.screen.tasks();
          };
        this.appendMenuIcon(ul, "icons8-about-24.png").onclick = function(){
            ui.about();
        };
    }
};
