$(document).ready(initTodo);

let todoList;

function initTodo()
{
    /* Check exist data on Local Storage*/
    todoList = JSON.parse(window.localStorage.getItem('todoList'));

    setupComponentOfMain($("#mainContent"));

    printList()

}

function printList()
{
    let divComponent = $("#todolist")
    divComponent.children().remove()

    if(todoList===null)
        return

    todoList.forEach((element,index) => {
        if(!(element.title || element.description))
            return
            
        let componentCard = $( "<div></div>" ,{
            class: "card",
            todoId:index
        }).appendTo( divComponent );
        
        let component = $( "<div></div>" ,{
            class: "card-body"
        }).appendTo( divComponent );
        
        

        if(element.title)
        {
            $( "<h4></h4>" ,{
                class: "card-title"
            }).text(element.title).appendTo( component );
        }

        if(element.description)
        {
            $( "<div></div>" ,{
                class: "card-text"
            }).text(element.description).appendTo( component );

        }

        $("<input/>",{
            type:"button",
            class:"form-control",
            value:"Delete todo"
        })
        .on( "click",{id: index}, deleteTodo ).appendTo(component)
        
    });
}

function deleteTodo(event)
{
    todoList.splice(event.data.id);
    
    updateLocalStorage();
    printList();
}

function setupComponentOfMain(divComponent)
{
    // https://api.jquery.com/jQuery/#jQuery2
    $("<div/>",{
        id:"todoAddComponent",
        class:"p-5 mt-10"
    }).appendTo(divComponent)

    $("<div/>",{
        id:"todolist"
    }).appendTo(divComponent)


    setupAdd($("#todoAddComponent"))
    



}

function setupAdd(component)
{
    $("<input/>",{
        id:"titleAdd",
        type:"text",
        class:"form-control mb-2",
        placeholder:"Title",
    }).appendTo(component)

    $("<textarea></textarea>",{
        id:"descriptionAdd",
        class:"form-control mb-2",
    }).appendTo(component)

    $("<input/>",{
        id:"buttonAdd",
        type:"button",
        class:"form-control",
        value:"Add new todo"
    })
    .on( "click", addTodo ).appendTo(component)
        
}

function addTodo()
{
    if(todoList===null || todoList===undefined)
        todoList=[]

    todoList.push({title:$("#titleAdd").val(),description:$("#descriptionAdd").val()})

    updateLocalStorage()
    printList()   
}

function updateLocalStorage()
{
    window.localStorage.setItem('todoList',JSON.stringify(todoList))
}