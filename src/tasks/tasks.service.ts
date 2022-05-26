import { Injectable, NotFoundException } from '@nestjs/common';

import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskReository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskReository)
    private taskRepository: TaskReository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = task;
    const task = this.taskRepository.create({
      title,
      description,
    });
  }
}
