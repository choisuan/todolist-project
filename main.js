//유저는 할일을 추가할 수 있다
//각 할일에 삭제와 체크버튼이 있다
//삭제버튼을 클릭하면 할일이 리스트에서 삭제된다
//체크버튼을 클릭하면 할일이 끝난 것으로 간주하고 밑줄이 간다
//끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다
//탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다
//모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click",addTask);
taskInput.addEventListener("focus",function(){taskInput.value=''});

function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,  // 객체 사용
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}
 
function render() {  // task-board창
    let resultHTML = ''; // string변수
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML += `<div class="task" style="background-color:lightgrey">
            <div class="task-done">${taskList[i].taskContent}</div>  
            <div class="button-area">
              <button onclick="toggleComplete('${taskList[i].id}')"><span style="color:grey"><i class="fa-solid fa-arrow-rotate-left"></i></span>
</button>
              <button onclick="deleteTask('${taskList[i].id}')"><span style="color:red"><i class="fa-solid fa-trash-can"></i></span>
</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>  
            <div class="button-area">
              <button onclick="toggleComplete('${taskList[i].id}')"><span style="color:lawngreen"><i class="fa-solid fa-check"></i></span>
</button>
              <button onclick="deleteTask('${taskList[i].id}')"><span style="color:red"><i class="fa-solid fa-trash-can"></i></span>
</button>
            </div>
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("id:",id)
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {  // 배열의 id와 버튼의 id가 같으면
            taskList[i].isComplete = !taskList[i].isComplete  // 현재값과 반대값을 가져옴
            break  // 아이템을 찾는 순간 for문 종료
        }
    }
    render()
    console.log(taskList) 
}

function deleteTask(id) {
    console.log("id:",id)
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1) // i번째에 있는 아이템을 하나 제거
            break
        }
    }            
    render()
}

function randomIdGenerate() {
    return Math.random().toString(36).substr(2, 16);
}