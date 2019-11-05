// Business Logic for task Book ---------
function List() {
  this.listItems = [],
  this.currentId = 0
}

List.prototype.addListItem = function(listItem) {
  listItem.id = this.assignId();
  this.listItems.push(listItem);
}

function Task(task, completed) {
  this.task = task,
  this.completed = completed
}


List.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

List.prototype.findTask = function(id) {
  for (var i=0; i< this.listItems.length; i++) {
    if (this.listItems[i]) {
      if (this.listItems[i].id == id) {
        return this.listItems[i];
      }
    }
  };
  return false;
}

List.prototype.deleteTask= function(id) {
  for (var i=0; i< this.listItems.length; i++) {
    if (this.listItems[i]) {
      if (this.listItems[i].id == id) {
        delete this.listItems[i];
        return true;
      }
    }
  };
  return false;
}

var tasks = new List();




// User Logic for task Book ---------

$(document).ready(function(){
  $("form#to-do").submit(function(event){
    event.preventDefault();
    $("#results").children().remove();


    var listItem = $("input#listItem").val();
    var task = new Task(listItem,false);
    tasks.addListItem(task);


    tasks.listItems.forEach(function(task, index){
      if (tasks.listItems[index].completed === true) {
        $("#results").append("<li class='strikethrough' id='"+index+"'>" + (tasks.listItems[index].task) +"<img src='img/download.png' width='15px'></li>");
      } else {
        $("#results").append("<li id='"+index+"'>" + (tasks.listItems[index].task) +"<img id='"+index+"' src='img/download.png' width='15px'></li>");
      }
    });

    $("#results").children().click(function(){
      $("#"+this.id).toggleClass("strikethrough")
      if (tasks.listItems[this.id].completed === false) {
        tasks.listItems[this.id].completed = true;
      } else {
        tasks.listItems[this.id].completed = false;
      }
      console.log(tasks.listItems[this.id].completed);
    });


    $("img").click(function(){
      tasks.deleteTask(this.id);
    });

    tasks.listItems.forEach(function(task, index){
      console.log(task);
    });

    document.getElementById("to-do").reset();
  });
});
