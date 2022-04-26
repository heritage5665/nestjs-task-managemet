import { Body, Controller, Get, Post } from '@nestjs/common';

import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body('title') title, @Body('description') description): void {
    console.log(description);
    console.log(title);
  }
}