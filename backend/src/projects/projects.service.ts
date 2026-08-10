import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto, userId: string) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      include: { _count: { select: { tasks: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string, userId: string) {
    return this.prisma.project.findFirst({
      where: { id, userId },
      include: { tasks: true },
    });
  }

  async getStats(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: { userId },
      select: { id: true },
    });
    const projectIds = projects.map((p) => p.id);

    const [total, pending, inProgress, completed] = await Promise.all([
      this.prisma.task.count({ where: { projectId: { in: projectIds } } }),
      this.prisma.task.count({ where: { projectId: { in: projectIds }, status: 'PENDING' } }),
      this.prisma.task.count({ where: { projectId: { in: projectIds }, status: 'IN_PROGRESS' } }),
      this.prisma.task.count({ where: { projectId: { in: projectIds }, status: 'COMPLETED' } }),
    ]);

    return {
      totalProjects: projects.length,
      totalTasks: total,
      pending,
      inProgress,
      completed,
    };
  }

  update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    return this.prisma.project.updateMany({
      where: { id, userId },
      data: updateProjectDto,
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.project.deleteMany({
      where: { id, userId },
    });
  }
}

