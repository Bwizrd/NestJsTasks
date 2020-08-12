import { Injectable, NotFoundException } from '@nestjs/common';

import * as MOCKED_RESPONSE from './../../db.json';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User): Promise<Task[]> {
      return this.taskRepository.getTasks(filterDto, user);
    }

  async getTaskById(
      id: number,
      user: User
    ): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
    if (!found) {
      throw new NotFoundException(`Task with Id '${id}' not found`);
    }
    return found;
  }

  //   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;

  //     let tasks = this.getAllTasks();

  //     if (status) {
  //       tasks = tasks.filter(task => task.status === status);
  //     }

  //     if (search) {
  //       tasks = tasks.filter(
  //         task =>
  //           task.title.includes(search) || task.description.includes(search),
  //       );
  //     }

  //     return tasks;
  //   }

  async createTask(createTaskDto: CreateTaskDto, user): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);

  }

    async deleteTask(id: number, user: User): Promise<void> {
      const result = await this.taskRepository.delete({id, userId: user.id});
      if (result.affected === 0) {
        throw new NotFoundException(`Task with Id '${id}' not found`);
      }
    }

   async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
}
