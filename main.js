//유저는 할일을 추가할 수 있다
//각 할일에 삭제와 체크버튼이 있다
//삭제버튼을 클릭하면 할일이 리스트에서 삭제된다
//체크버튼을 클릭하면 할일이 끝난 것으로 간주하고 밑줄이 간다
//끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다
//탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다
//모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div"); // task-tab 아래에 있는 div를 다 가져옴
let taskList = [];
let mode = "all";
let filterList = [];
let underLine = document.getElementById("underline");

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // 반드시 === 사용
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  // div underline은 빼고 시작
  tabs[i].addEventListener("click", function (event) {
    // 누구를 클릭했는지에 관한 정보를 event가 가지고있음
    filter(event);
  }); // NodeList를 배열처럼 사용
}

function addTask() {
  if (taskInput.value === "") {
    return alert("할일을 입력해주세요."); // return으로 if문을 끝내야 render()함수가 시행x
  }

  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value, // 객체 사용
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  taskInput.value = "";
  render();
}

function render() {
  // task-board창
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = ""; // string변수
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += `<div class="task" style="background-color:lightgrey">
            <div class="task-done">${list[i].taskContent}</div>  
            <div class="button-area">
              <button onclick="toggleComplete('${list[i].id}')"><span style="color:grey"><i class="fa-solid fa-arrow-rotate-left"></i></span>
</button>
              <button onclick="editTask('${list[i].id}')"><i class="fa-solid fa-pen-to-square"></i></button>

              <button onclick="deleteTask('${list[i].id}')"><span style="color:red"><i class="fa-solid fa-trash-can"></i></span>
</button>
            </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>  
            <div class="button-area">
              <button onclick="toggleComplete('${list[i].id}')"><span style="color:greenyellow"><i class="fa-solid fa-check"></i></span>
</button>
              <button onclick="editTask('${list[i].id}')"><i class="fa-solid fa-pen-to-square"></i></button>

              <button onclick="deleteTask('${list[i].id}')"><span style="color:red"><i class="fa-solid fa-trash-can"></i></span>
</button>
            </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // 배열의 id와 버튼의 id가 같으면
      filterList.splice(i, 1);
      taskList[i].isComplete = !taskList[i].isComplete; // 현재값과 반대값을 가져옴
    }
  }
  filter(); // filter()함수 안에 render()함수가 포함되어 있음
}

function editTask(id) {
  let newContent = prompt("수정할 내용을 입력하세요.");
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].taskContent = newContent;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  let isDelete = confirm("삭제하시겠습니까?"); // 확인버튼 누르면 true
  if (isDelete === true) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
        taskList.splice(i, 1); // i번째에 있는 아이템을 하나 제거
        break;
      }
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    // 이벤트가 실행되면
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 3) + "px";
  } // 탭 바의 위치에 따라 render()함수가 실행됨->모든 탭에서 버튼 활성화

  filterList = [];
  if (mode === "all") {
    render(); // 전체 리스트 보여줌
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        // 미완성 리스트(체크 표시 안한 것)를 보여줌
        filterList.push(taskList[i]); // 미완성 리스트만 해서 새로운 배열을 만듦
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        // 완성 리스트(체크 표시 한 것)를 보여줌
        filterList.push(taskList[i]); // 완성 리스트만 해서 새로운 배열을 만듦
      }
    }
  }
  render();
}

function randomIdGenerate() {
  return Math.random().toString(36).substr(2, 16);
}
