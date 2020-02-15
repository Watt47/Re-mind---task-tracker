var ui = {
customCheckbox: function(parent){
    var label = parent.createChildElement("label", "class=container");
    label.innerHTML = "&nbsp;";
    label.createChildElement("input", "type=checkbox");
    label.createChildElement("span", "class=checkmark");
    return label;
},
currentScreen: "tasks",
reloadPage: function(){//rename to adjustHeight
    var d = 0;
    if (!!window.chrome || (device.platform == "Android"))
        d = 0;
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
         d = 1;
    }
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (device.platform == "iPhone"))
        d = 2;
    var main = document.getElementById('main');
    switch (ui.currentScreen){
            case "tasks":
                var table = document.getElementById("tasks_table");
                     table.style.height = (window.innerHeight - ui.bottomMenuShift - d) + "px";
                       main.style.height = (window.innerHeight - ui.bottomMenuShift + 22 - d) + "px";
                      //  ui.screen.tasks();
                break;
            case "task":
                main.style.height = (window.innerHeight - ui.bottomMenuShift + 22 - d) + "px";
         //   ui.screen.task(task.entity);
            break;
            case "settings":
                main.style.height = (window.innerHeight - ui.bottomMenuShift + 22 - d) + "px";
         //   ui.screen.settings();
            break;
            default:
            alert("error reloadpage!");
    }
},
bottomMenuShift: 125,
setTitle: function(resid){
  //  document.getElementById("header").textContent = _(resid);
    document.getElementById("header").setResId(resid);
},
button: function(caption){
    var btn = document.createElement("input");
    btn.type = 'button';
    btn.value = caption;
    return btn;
},
about: function(){
    alert(html10n.get("about_version", {"appname": "Todo app", "version": "0.0.12", "platform": device.platform}));
},
editBox: function(){
    var box = document.createElement('input');
    box.type = "text";
    return box;
},
screen: {
tasks: function(){
   // alert(0);
    ui.currentScreen = "tasks";
    ui.setTitle("tasks_title");
    var main = document.getElementById('main');
    main.innerHTML = "";
    menu.init(main);
    var table = document.createElement("table");
    main.appendChild(table);
    table.id = "tasks_table";
    table.classList.add("center");
//    alert(2);
    var inputDiv = document.createElement("div");
    inputDiv.classList.add("center");
    inputDiv.id = "input_field";
  //  alert(4);
    main.appendChild(inputDiv);
    var eb = ui.editBox();
    inputDiv.appendChild(eb);
  //  alert(3);
    var button = ui.button("Add task");
    button.setResId("tasks_button_addtask.value");
    inputDiv.appendChild(button);
 //   alert(5);
    inputDiv.style.display = "table";
  //  alert(6);
    tasks.loadTasks();
  //  alert(7);
    tasks.toTable();
  //  alert(1);
    button.onclick = function(){
 //       alert(0);
        tasks.addTask(eb.value);
        tasks.toTable();
        eb.value = "";
        var rows = document.querySelectorAll('#tasks_table tr');

        // line is zero-based
        // line is the row number that you want to see into view after scroll
        rows[tasks.tasks.length].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };
     eb.onkeypress = function(e) {
      //   alert(13);
         var code = (e.keyCode ? e.keyCode : e.which);
         if ( (code==13) || (code==10)){
             tasks.addTask(eb.value);
             tasks.toTable();
             eb.value = "";
             var rows = document.querySelectorAll('#tasks_table tr');

             // line is zero-based
             // line is the row number that you want to see into view after scroll
             rows[tasks.tasks.length].scrollIntoView({
                 behavior: 'smooth',
                 block: 'center'
             });
        }
  //       alert(14);
     };
    main.createChildElement("div", "class=fab,onclick=ui.screen.task();").textContent = "+";
    document.removeEventListener("backbutton", ui.screen.backToMain, false);
    alert(1);
    alert(2);
    html10n.localize(settings.getLanguage());
    //table.style.height = (window.innerHeight - ui.bottomMenuShift) + "px";
    ui.reloadPage();
},
task: function(taskEntity){
    task.entity = taskEntity;
    ui.currentScreen = "task";
    ui.setTitle("task_title");
    var main = document.getElementById('main');
    main.innerHTML = "";
    menu.task(main, !taskEntity);
    
    var table = document.createElement("table");
    main.appendChild(table);
    table.classList.add("center");
    var row0 = table.insertRow(-1);
    var row1 = table.insertRow(-1);
    var row2 = table.insertRow(-1);
    var row3 = table.insertRow(-1);

    var cell00 = row0.insertCell(-1);
    cell00.classList.add("min-width");
    var cell01 = row0.insertCell(-1);
    var cell10 = row1.insertCell(-1);
    var cell11 = row1.insertCell(-1);
    var cell20 = row2.insertCell(-1);
    var cell21 = row2.insertCell(-1);
    var cell30 = row3.insertCell(-1);
    var cell31 = row3.insertCell(-1);

    //var subMainDiv = main.createChildElement("div");
   // subMainDiv.classList.add("center");
  //  var idLabel = cell00.createChildElement("label");
    cell00.appendChild(document.createTextNode("id:"));
    cell00.setResId("task_field_id");
    cell01.appendChild(document.createTextNode(!taskEntity ? "" : taskEntity.id));
   // idLabel.appendChild(document.createTextNode("id: " + (!taskEntity ? "" : taskEntity.id)));
  //  subMainDiv.createChildElement("br");
    var nameLabel = cell10.createChildElement("label", "for=name");
    nameLabel.appendChild(document.createTextNode("name: "));
    nameLabel.setResId("task_field_name");
    var nameField = cell11.createChildElement("input","id=name,type=text");
    nameField.value = (!taskEntity ? "" : taskEntity.name);
    if (taskEntity)
        nameField.disabled = true;
    nameField.classList.add("width100percent");
    nameField.style.background = "white";
    nameField.style.border = 0;
   // subMainDiv.createChildElement("br");
    cell20.textContent = "Done:";
    cell20.setResId("task_field_done");
   // var checkbox = cell21.createChildElement("input", "id=complete,type=checkbox");
    var checkbox = ui.customCheckbox(cell21);
    checkbox.id = "complete";
    if (taskEntity)
        checkbox.children[0].checked = taskEntity.complete;
  //  subMainDiv.createChildElement("br");
    var descLabel = cell30.createChildElement("label");
    descLabel.appendChild(document.createTextNode("Description: "));
    descLabel.setResId("task_field_description");
    var descField = cell31.createChildElement("textarea","id=description");
    if (taskEntity){
        descField.appendChild(document.createTextNode(taskEntity.description));
        descField.disabled = true;
    }
    descField.classList.add("width100percent");
    descField.style.border = 0;
    descField.style.background = "white";
    descField.rows = 4;
    document.addEventListener("backbutton", ui.screen.backToMain, false);
    html10n.localize(settings.getLanguage());
   // main.style.height = (window.innerHeight - ui.bottomMenuShift + 22) + "px";
    ui.reloadPage();
},
settings: function(){
    ui.currentScreen = "settings";
    ui.setTitle("settings_title");
    var main = document.getElementById('main');
    main.innerHTML = "";
    menu.settings();
    var table = main.createChildElement("table");
    
    var row0 = table.insertRow(-1);
    var row1 = table.insertRow(-1);
    var row2 = table.insertRow(-1);
    var row3 = table.insertRow(-1);

    var cell00 = row0.insertCell(-1);
   // cell00.classList.add("min-width");
    var cell01 = row0.insertCell(-1);
    var cell10 = row1.insertCell(-1);
    var cell11 = row1.insertCell(-1);
    var cell20 = row2.insertCell(-1);
    var cell21 = row2.insertCell(-1);
    var cell30 = row3.insertCell(-1);
    var cell31 = row3.insertCell(-1);

    
    
    var subMainDiv = main.createChildElement("div");
    subMainDiv.classList.add("center");
  //  var checkbox = cell01.createChildElement("input", "id=showerrors,type=checkbox");
    var checkbox = ui.customCheckbox(cell01);
    checkbox.id = "showerrors";
    checkbox.children[0].oninput = function(e){
        settings.showerrors = e.target.checked;
        settings.saveSettings();
    };
    checkbox.children[0].checked = JSON.parse(localStorage.getItem("settings")).showerrors;
    var label = cell00.createChildElement("label", "for=showerrors");
    label.appendChild(document.createTextNode(("settings_showerrors")));
    label.setResId("settings_showerrors");
    subMainDiv.createChildElement("br");
    cell10.createChildElement("label", "for=lngselect").setResId("settings_label_language");
    var langSelect = cell11.createChildElement("select", "id=lngselect");
    langSelect.onchange = function(){
        settings.language = this.value;
        html10n.localize(settings.getLanguage());
        settings.saveSettings();
    };
    cell20.createChildElement("label").setResId("settings_removeall");
    var deleteBtn = cell21.createChildElement("button");
    cell30.createChildElement("label").setResId("settings_wkwebview");
    var checkWkBtn = cell31.createChildElement("button");
    checkWkBtn.setResId("settings_wkwebview");
    checkWkBtn.onclick = function(){
        alert(!!window.WkWebView);
        alert(!!window.webkit);
    };
    deleteBtn.setResId("settings_removeall");
    deleteBtn.onclick = function(){
        if (confirm(_("tasks_warning_deleteall"))){
             tasks.tasks = [];
             tasks.saveTasks();
             tasks.loadTasks();
       //      tasks.toTable();
        }
    };
    deleteBtn.id = "deleteBtn";
    var autoLang = langSelect.createChildElement("option", "value=auto");
    autoLang.textContent = "Autodetect";
    autoLang.setResId("settings_lang_auto");
    var enLang = langSelect.createChildElement("option", "value=en");
    enLang.textContent = "English";
    enLang.setResId("settings_lang_en");
    var ruLang = langSelect.createChildElement("option", "value=ru");
    ruLang.textContent = "Russian";
    ruLang.setResId("settings_lang_ru");
    langSelect.value = settings.language;
    document.addEventListener("backbutton", ui.screen.backToMain, false);
    html10n.localize(settings.getLanguage());
  //  main.style.height = (window.innerHeight - ui.bottomMenuShift + 22) + "px";
    ui.reloadPage();
},
backToMain: function(){
    ui.screen.tasks();
}
}
};
