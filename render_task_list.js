export function renderTaskList(array, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask) {
    taskWrapper.innerHTML = "";
    array.forEach((task) => {
      taskWrapper.append(createTaskStructure(task, createEl, completeTask, deleteTask));
    });
    showTaskInfo();
  }
  
  function createTaskStructure(task, createEl, completeTask, deleteTask) {
    const taskBlock = createEl("div", "task-block");
    const check = createEl("input", "task-input");
    check.type = "checkbox";
    check.addEventListener("click", () => completeTask(task));
  
    const taskText = createEl("p", "task-text", task.text);
    const taskDate = createEl("p", "task-date", task.date);
    const deleteBtn = createEl("button", "delete-btn", "X");
    if (task.isCompleted) {
      check.checked = true;
      taskText.style.textDecoration = "line-through";
      taskBlock.style.backgroundColor = "rgb(233, 176, 107)";
    } else {
      taskText.style.textDecoration = "";
      taskBlock.style.backgroundColor = "";
    }
    deleteBtn.addEventListener("click", () => deleteTask(task));
    taskBlock.append(check, taskText, taskDate, deleteBtn);
    return taskBlock;
  }