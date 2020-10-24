export class TaskAlreadyExists extends Error {
  message: string;

  constructor(id: string) {
    super(`Task with ID ${id} already exists`);
    this.message = `Task with ID ${id} already exists`;
  }
}
