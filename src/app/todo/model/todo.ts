export type TodoStatus = 'waiting' | 'in progress' | 'done';
let idGenerated = 1;

export class Todo {
  id: number;
  status: TodoStatus;

  constructor(public name = '', public content = '', status: TodoStatus = 'waiting') {
    this.id = idGenerated++; 
    this.status = status;   }
}