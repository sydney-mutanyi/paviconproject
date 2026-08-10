import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto, userId: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
        _count: {
            tasks: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    })[]>;
    findOne(id: string, userId: string): import(".prisma/client").Prisma.Prisma__ProjectClient<({
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
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getStats(userId: string): Promise<{
        totalProjects: number;
        totalTasks: number;
        pending: number;
        inProgress: number;
        completed: number;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto, userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string, userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
