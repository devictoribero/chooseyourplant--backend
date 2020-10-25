import { Task } from "./Task";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { TaskCriteria } from "./TaskCriteria";

export interface TaskRepository {
  search(criteria: TaskCriteria): Promise<Nullable<Array<Task>>>;

  save(task: Task, transaction?: any): Promise<void>;

  remove(id: string): Promise<void>;
}