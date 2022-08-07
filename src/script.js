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
            class: "card-body" + (element.todo? ' bg-success':'')
        }).appendTo( componentCard );
        
        let componentCardFooter = $( "<div></div>" ,{
            class: "card-footer"
        }).appendTo( componentCard );


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


        $('<i></i>',{
            class:'bi bi-trash'
        }).on( "click",{id: index}, deleteTodo ).appendTo(componentCardFooter)

        $("<input/>",{
            type:"checkbox",
            class:"form-control",
            value:"Done",
            checked:element.todo
        })
        .on( "click",{id: index}, toggleTodo ).appendTo(componentCardFooter)
        
        
    });
}

function toggleTodo(event)
{
    todoList[event.data.id].todo = !todoList[event.data.id].todo;
    updateLocalStorage();
    printList();
}

function deleteTodo(event)
{
    todoList.splice(event.data.id,1);
    
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
    
    $("#copyExport").on( "click", exportTodoList )


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
    if(!($("#titleAdd").val() || $("#descriptionAdd").val()))
        return

    if(todoList===null || todoList===undefined)
        todoList=[]

    todoList.push({title:$("#titleAdd").val(),description:$("#descriptionAdd").val()})

    $("#titleAdd").val("")
    $("#descriptionAdd").val("")

    updateLocalStorage()
    printList()   
}

function updateLocalStorage()
{
    window.localStorage.setItem('todoList',JSON.stringify(todoList))
}

function setClipboard(text)
{
    navigator.clipboard.writeText(text);
}

function exportTodoList()
{
    setClipboard(JSON.stringify(todoList))
}