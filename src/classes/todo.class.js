export class Todo {
  static fromJson({ id, tarea, completado, creado }) {
    
    const tmpTodo = new Todo(tarea);

    tmpTodo.id = id;
    tmpTodo.completado = completado;
    tmpTodo.creado = creado;
    return tmpTodo;
  }

  constructor(tarea) {
    this.tarea = tarea;
    this.id = new Date().getTime();
    this.completado = false;
    this.creado = new Date();
  }

  detailTodo() {
    return `${this.tarea} - ${this.id}`;
  }
}
