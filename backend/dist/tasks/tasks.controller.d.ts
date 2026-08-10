import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        priority: string;
        dueDate: Date | null;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(projectId: string, status?: string, priority?: string, search?: string, sortBy?: string, sortOrder?: 'asc' | 'desc', page?: number, limit?: number): Promise<{
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: string;
            title: string;
            priority: string;
            dueDate: Date | null;
            projectId: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        priority: string;
        dueDate: Date | null;
        projectId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateTaskDto: UpdateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        priority: string;
        dueDate: Date | null;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        priority: string;
        dueDate: Date | null;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
