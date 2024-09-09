let todos = []

async function addToList() {
    const title = document.getElementById("newtodo").value;
    await fetch("https://todoapi-zeta.vercel.app/", {
        method: "post",
        body: JSON.stringify({ title }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    readList();
    document.getElementById("newtodo").value = "";
}
// this function is doing something

async function removeFromList(index) {

    await fetch(`https://todoapi-zeta.vercel.app/${index}`, { method: "delete" })
    readList();
}

async function updateInList(index) {
    const title = document.getElementById("edit").value;
    await fetch(`https://todoapi-zeta.vercel.app/${index}`,
        {
            method: "put",
            body: JSON.stringify({ title }),
            headers: {
                "Content-Type": "application/json"
            }

        })
    readList();
}

async function readList() {
    const todos = await fetch("https://todoapi-zeta.vercel.app/").then(res => res.json())
    let temp = "";
    for (let index = 0; index < todos.length; index++) {
        const todo = `<div class="row" id="todo${todos[index].id}">
                        <p>${todos[index].title}</p>
                            <button type="button" class="fa fa-edit btn-icon" onclick="editItem(${todos[index].id})"></button>
                            <button type="button" class="fa fa-trash btn-icon" onclick="removeFromList(${todos[index].id})"></button>
                    </div>`;
        temp = temp + todo;
    }
    document.getElementById("todos").innerHTML = temp;
}
readList();

async function editItem(index) {
    
    const todos = await fetch("https://todoapi-zeta.vercel.app/").then(res => res.json());
    const item = todos.filter((j) => j.id == index)
    const temp = `<div class="row">
                <label for="edit">Edit:</label>
                <input type="text" name="edit" id="edit" value="${item[0].title}">
                <button type="button" class="btn-secondary" onclick="updateInList(${item[0].id})">Save</button>
                </div>`;
    document.getElementById(`todo${item[0].id}`).innerHTML = temp
}