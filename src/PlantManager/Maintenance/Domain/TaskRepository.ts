import { Task } from "./Task";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { TimeInterval } from "../../../Shared/Domain/TimeInterval";

export interface TaskRepository {
  search(
    interval: TimeInterval,
    status?: String,
    type?: String
  ): Promise<Nullable<Array<Task>>>;

  save(task: Task, transaction?: any): Promise<void>;
}