import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
declare global {
    var prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare const customPrisma: (options: Prisma.PrismaClientOptions) => PrismaClient<{
    datasources?: Prisma.Datasources | undefined;
    datasourceUrl?: string | undefined;
    errorFormat?: Prisma.ErrorFormat | undefined;
    log?: (Prisma.LogLevel | Prisma.LogDefinition)[] | undefined;
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export * from './selects';
export default prisma;
