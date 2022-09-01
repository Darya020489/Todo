"use strict";

import {createEl} from './create_elements.js';
import {getDate} from './date.js';
import {renderTaskList} from './render_task_list.js';
import {clearInput} from './clear_input.js';
import {setStorageData, getStorageData} from './local_storage.js';
const ENTER_KEY_CODE = 13;
const root = document.querySelector("#root");
const taskContainer = createEl("div", "task-container");
root.append(taskContainer);
const title = createEl("h1", "title", "TODO LIST");
const themeBtn = createEl("button", "btn theme_btn", "Change theme");
const controlBlock = createEl("div", "block control-block");
const deleteAllBtn = createEl("button", "btn delete-all__btn", "Delete All");
const deleteLastBtn = createEl("button", "btn delete-last__btn", "Delete Last");
const inputCreateTask = createEl("input", "input create-task__input");
inputCreateTask.type = "text";
inputCreateTask.placeholder = "Enter Todo...";
const addTaskBtn = createEl("button", "btn add-task__btn", "Add");
const infoBlock = createEl("div", "block info-block");
const showInfoText = createEl("p", "info-text", "All: 0      Completed: 0");
const showAllBtn = createEl("button", "btn info-all__btn", "Show All");
const showCompletedBtn = createEl(
  "button",
  "btn info-completed__btn",
  "Show Completed"
);
const inputSearch = createEl("input", "input search-task__input");
inputSearch.type = "text";
inputSearch.placeholder = "Search...";
const taskWrapper = createEl("div", "task-wrapper");
controlBlock.append(deleteAllBtn, deleteLastBtn, inputCreateTask, addTaskBtn);
infoBlock.append(showInfoText, showAllBtn, showCompletedBtn, inputSearch);
taskContainer.append(title, themeBtn, controlBlock, infoBlock, taskWrapper);

let taskList = [];


document.addEventListener("DOMContentLoaded", () => {
  taskList = getStorageData();
  console.log(taskList);
  renderTaskList(taskList, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask);
  root.classList.add(localStorage.getItem("theme"));
  inputCreateTask.focus();
});

themeBtn.addEventListener("click", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    localStorage.setItem("theme", "light");
    root.classList.remove(theme);
    root.classList.add("light");
  } else {
    localStorage.setItem("theme", "dark");
    root.classList.remove(theme);
    root.classList.add("dark");
  }
});

function addTask() {
  if (!inputCreateTask.value) {
    inputCreateTask.style.borderColor = "red";
    return;
  }
  const newTask = {
    text: inputCreateTask.value,
    isCompleted: false,
    date: getDate(),
    id: Math.random(),
  };
  taskList.push(newTask);
  setStorageData(taskList);
  clearInput(inputCreateTask);
  renderTaskList(taskList, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask);
}

addTaskBtn.addEventListener("click", addTask);

inputCreateTask.addEventListener("keypress", (event) => {
  if (event.keyCode == ENTER_KEY_CODE) {
    addTask();
  }
});

deleteAllBtn.addEventListener("click", () => {
  taskList.length = 0;
  setStorageData(taskList);
  renderTaskList(taskList, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask);
});

deleteLastBtn.addEventListener("click", () => {
  taskList.splice(taskList.length - 1, 1);
  setStorageData(taskList);
  renderTaskList(taskList, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask);
});

showAllBtn.addEventListener("click", () => {
  renderTaskList(taskList, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask);
});

showCompletedBtn.addEventListener("click", () => {
  let arr = taskList.filter((task) => task.isCompleted === true);
  renderTaskList(arr, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask);
});

function showTaskInfo() {
  return (showInfoText.textContent = `All: ${taskList.length}    Completed: ${
    taskList.filter((task) => task.isCompleted === true).length
  }`);
}

inputSearch.addEventListener("input", () => {
  let arr = taskList.filter((task) => task.text.includes(inputSearch.value));
  console.log(inputSearch.value);
  renderTaskList(arr);
});

function deleteTask(taskForDelete) {
  let taskIndex = taskList.findIndex((item) => item.id === taskForDelete.id);
  taskList.splice(taskIndex, 1);
  setStorageData(taskList);
  renderTaskList(taskList, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask);
}

function completeTask(task) {
  let taskEl = taskList.find((item) => item.id === task.id);
  taskEl.isCompleted = taskEl.isCompleted ? false : true;
  setStorageData(taskList);
  renderTaskList(taskList, taskWrapper, createEl, showTaskInfo, completeTask, deleteTask);
}