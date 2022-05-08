import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id == id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  deleteTaskById(id: string): void {
    const task = this.getTaskById(id);
    if (task) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      // return task;
    }
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((tasks) => tasks.status == status);
    }

    if (search) {
      tasks = tasks.filter((tasks) => {
        if (
          tasks.description.toLowerCase().includes(search.toLowerCase()) ||
          tasks.title.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }
}
