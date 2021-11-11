import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el index.html
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const aFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
        <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${todo.completado ? "checked" : ""}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
		</li>
    `;
  const div = document.createElement("div");
  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

// Eventos
txtInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && txtInput.value.length > 0) {
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  const nombreElemento = event.target.localName;
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute("data-id");
  if (nombreElemento.includes("input")) {
    // Si hago click en el input cambio el completado por true o false
    todoList.toggleTodo(todoId);
    // Le cambio al elemento el tachado o no
    todoElemento.classList.toggle("completed");
  } else if (nombreElemento.includes("button")) {
    // Cuando se presiona el boton es por que deseamos borrar el todo
    todoList.eliminarTodo(todoId);
    // Ahora lo borro del ul al li que tiene el todo
    divTodoList.removeChild(todoElemento);
  }
});

btnBorrar.addEventListener("click", () => {
  todoList.eliminarCompletados();
  // Elimino los li del ul donde estan los todos pero desde abajo hacia arriba
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFilters.addEventListener("click", (event) => {

  const filtro = event.target.text;

  if (!filtro) {
    return;
  }

  aFiltros.forEach(element => {
    element.classList.remove('selected');
  });
  event.target.classList.add('selected');

  for (const elemento of divTodoList.children) {

    elemento.classList.remove("hidden");

    const completado = elemento.classList.contains("completed");
    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
        break;
    }
  }

});
