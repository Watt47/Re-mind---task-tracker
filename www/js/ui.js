var ui = {
button: function(caption){
    var btn = document.createElement("input");
    btn.type = 'button';
    btn.value = caption;
    return btn;
},
editBox: function(){
    var box = document.createElement('input');
    box.type = "edit";
    return box;
},
screen: {
tasks: function(){
    var main = document.getElementById('main');
    main.innerHTML = "";
     menu.init(main);
     var table = document.createElement("table");
     main.appendChild(table);
     table.id = "tasks_table";
     table.classList.add("center");
     var inputDiv = document.createElement("div");
     inputDiv.classList.add("center");
    inputDiv.id = "input_field";
     main.appendChild(inputDiv);
     var eb = ui.editBox();
     inputDiv.appendChild(eb);
     var button = ui.button("Add task");
     inputDiv.appendChild(button);
     inputDiv.style.display = "table";
     tasks.loadTasks();
     tasks.toTable();
     button.onclick = function(){
         tasks.addTask(eb.value);
         tasks.toTable();

         eb.value = "";
     };
     eb.onkeypress = function(e) {
         var code = (e.keyCode ? e.keyCode : e.which);
         if ( (code==13) || (code==10)){
             tasks.addTask(eb.value);
             tasks.toTable();

             eb.value = "";
        }
     };
},
task: function(taskEntity){
    var main = document.getElementById('main');
    main.innerHTML = "";
    menu.task(main, !taskEntity);
    var subMainDiv = main.createChildElement("div");
    subMainDiv.classList.add("center");
    var idLabel = subMainDiv.createChildElement("label");
    idLabel.appendChild(document.createTextNode("id: " + (!taskEntity ? "" : taskEntity.id)));
    subMainDiv.createChildElement("br");
    var nameLabel = subMainDiv.createChildElement("label", "for=name");
    nameLabel.appendChild(document.createTextNode("name: "));
    var nameField = subMainDiv.createChildElement("input","id=name,type=edit,value=" + (!taskEntity ? "" : taskEntity.name));
    if (taskEntity)
        nameField.disabled = true;
    subMainDiv.createChildElement("br");
    var checkbox = subMainDiv.createChildElement("input", "id=complete,type=checkbox");
    if (taskEntity)
        checkbox.checked = taskEntity.complete;
    subMainDiv.createChildElement("br");
    var descLabel = subMainDiv.createChildElement("label");
    descLabel.appendChild(document.createTextNode("Description: "));
    var descField = subMainDiv.createChildElement("textarea","id=description");
    if (taskEntity){
        descField.appendChild(document.createTextNode(taskEntity.description));
        descField.disabled = true;
    }
},
settings: function(){
    var main = document.getElementById('main');
    main.innerHTML = "";
    menu.settings();
    var subMainDiv = main.createChildElement("div");
    subMainDiv.classList.add("center");
    var checkbox = subMainDiv.createChildElement("input", "id=showerrors,type=checkbox");
    checkbox.oninput = function(e){
        localStorage.setItem("settings", JSON.stringify({showerrors: e.target.checked}));
    };
    checkbox.checked = JSON.parse(localStorage.getItem("settings")).showerrors;
    var label = subMainDiv.createChildElement("label", "for=showerrors");
    label.appendChild(document.createTextNode("Show errors"));
}
}
};
