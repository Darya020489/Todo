export function getStorageData() {
    return JSON.parse(localStorage.getItem("todos")) ?? [];
  }
export function setStorageData(taskList) {
    localStorage.setItem("todos", JSON.stringify(taskList));
  }