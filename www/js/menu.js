var menu = {

init: function(root){
    var ul = root.createChildElement('ul', 'class=menu');
    
    this.appendMenuItem(ul, "javascript:void(0)", "New task").onclick = function(){
        ui.screen.task();
        //task.arg =
    };
    
     this.appendMenuItem(ul, "javascript:void(0)", "Settings").onclick = function(){
           ui.screen.settings();
           //task.arg =
       };
    
    this.appendMenuItem(ul, "javascript:void(0)", "Remove all").onclick = function(){
        if (confirm("DELETE ALL TASKS???")){
            tasks.tasks = [];
            tasks.saveTasks();
            tasks.loadTasks();
            tasks.toTable();
        }
    };
    
    
    },
appendMenuItem: function(ul, href, text, disabled = false){
    var menu1 = ul.createChildElement('li').createChildElement('a');
    menu1.href = href;
    menu1.onclick = function(){
        alert(text);
    };
    menu1.appendChild(document.createTextNode(text));
    if (disabled)
        menu1.classList.add("disabled");
    return menu1;
},
task: function(root, newtask){
    var ul = root.createChildElement('ul', 'class=menu');
    this.appendMenuItem(ul, "javascript:void(0)", "Home / tasks screen").onclick = function(){
        ui.screen.tasks();
    };
    this.appendMenuItem(ul, "javascript:void(0)", "Edit task", newtask).onclick = function(e){
        if (newtask){
            //alert(0);
            return;
        }
        document.getElementById("name").disabled = false;
        document.getElementById("description").disabled = false;
    };
    this.appendMenuItem(ul, "javascript:void(0)", "Save task").onclick = function(){
        if (newtask){
            task.arg = tasks.tasks.length;
            tasks.addTask(document.getElementById("name").value);
        }
        tasks.tasks[task.arg].name = document.getElementById("name").value;
        tasks.tasks[task.arg].complete = document.getElementById("complete").checked;
        tasks.tasks[task.arg].description = document.getElementById("description").value;
        tasks.saveTasks();
        ui.screen.tasks();
        if (newtask){
            tasks.tasks[tasks.tasks.length-1].id = tasks.tasks.length - 1 ? tasks.tasks[tasks.tasks.length-2].id + 1 : 1;
        }
    };
    this.appendMenuItem(ul, "javascript:void(0)", "Complete task").onclick = function(){
        if (!newtask)
            tasks.tasks[task.arg].complete = true;
        document.getElementById("complete").checked = true;
    };
    this.appendMenuItem(ul, "javascript:void(0)", "Delete task", newtask).onclick = function(){
        if (newtask){
         //   alert(0);
            return;
        }
        if (confirm("Delete this task?")){
            tasks.tasks.splice(task.arg, 1);
            tasks.saveTasks();
            ui.screen.tasks();
        }
    };
},
settings : function(){
        var ul = document.getElementById('main').createChildElement('ul', 'class=menu');
          this.appendMenuItem(ul, "javascript:void(0)", "Home / tasks screen").onclick = function(){
              ui.screen.tasks();
          };
        
    }
};
