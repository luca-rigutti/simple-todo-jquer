$(document).ready(initTodo);

let todoList;

function initTodo()
{
    /* Check exist data on Local Storage*/
    todoList = JSON.parse(window.localStorage.getItem('todoList'));

    setupComponentOfMain($("#mainContent"));

    printList($("#todolist"))

}

function printList(divComponent)
{
    divComponent.children().remove()

    if(todoList===null)
        return

    todoList.forEach(element => {
        let component = $( "<div></div>" ).appendTo( divComponent );
        
        if(element.title)
        {
            $( "<h4></h4>" ).text(element.title).appendTo( component );
        }

        if(element.description)
        {
            $( "<div></div>" ).text(element.description).appendTo( component );

        }
        
    });
}

function setupComponentOfMain(divComponent)
{
    // https://api.jquery.com/jQuery/#jQuery2
    $("<div/>",{
        id:"todoAddComponent"
    }).appendTo(divComponent)

    $("<div/>",{
        id:"todolist"
    }).appendTo(divComponent)


    setupAdd($("#todoAddComponent"))
    



}

function setupAdd(component)
{
    let title = document.createElement("input")
    title.type="text"
    title.id="titleAdd"

    let description = document.createElement("textarea")
    description.id="descriptionAdd"
    
    let button = document.createElement("input")
    button.type="button"
    button.id="buttonAdd"

    button.onclick= addTodo;

    //$("#buttonAdd").on( "click", addTodo );

    component.append(title,description,button)
    
    $("#buttonAdd").on( "click", function() { alert("test")} );

        

    
}

function addTodo()
{
    if(todoList===null || todoList===undefined)
        todoList=[]

    todoList.push({title:$("#titleAdd").val(),description:$("#descriptionAdd").val()})

    updateLocalStorage()
    printList($("#todolist"))   
}

function updateLocalStorage()
{
    window.localStorage.setItem('todoList',JSON.stringify(todoList))
}