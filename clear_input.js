export function clearInput(inputCreateTask) {
    inputCreateTask.value = "";
    inputCreateTask.focus();
    // console.log(taskList);
    inputCreateTask.style.border = "";
  }