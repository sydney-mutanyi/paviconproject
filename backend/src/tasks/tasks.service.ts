import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

export interface TaskQuery {
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
      },
    });
  }

  async findAll(projectId: string, query: TaskQuery = {}) {
    const { status, priority, search, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = { projectId };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) where.title = { contains: search, mode: 'insensitive' };

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({ where, skip, take: Number(limit), orderBy: { [sortBy]: sortOrder } }),
      this.prisma.task.count({ where }),
    ]);

    return { tasks, total, page: Number(page), limit: Number(limit) };
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateTaskDto,
        dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
