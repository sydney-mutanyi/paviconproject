import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto, req: any): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    getStats(req: any): Promise<{
        totalProjects: number;
        totalTasks: number;
        pending: number;
        inProgress: number;
        completed: number;
    }>;
    findOne(id: string, req: any): import(".prisma/client").Prisma.Prisma__ProjectClient<({
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
    update(id: string, updateProjectDto: UpdateProjectDto, req: any): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string, req: any): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
