import { type ClassConstructor } from 'class-transformer';
export declare class BaseRepository<TModel = any> {
    protected readonly model: TModel;
    protected entity: ClassConstructor<any>;
    constructor(model: TModel, entity: ClassConstructor<any>);
    findOne<WhereInputArgs, SelectArgs = object, IncludeArgs = object>(where: WhereInputArgs, select?: SelectArgs, include?: IncludeArgs): Promise<any>;
    findById<SelectArgs = object>(id: string, select?: SelectArgs): Promise<any>;
    update<WhereInputArgs, TData = any, SelectArgs = object>(where: WhereInputArgs, data: TData, select?: SelectArgs): Promise<any>;
    create<TData = any, SelectArgs = object>(data: TData, select?: SelectArgs): Promise<any>;
    upsert<WhereInputArgs, CreateInput, UpdateInput>(where: WhereInputArgs, create: CreateInput, update: UpdateInput): Promise<any>;
    delete<WhereInputArgs>(where: WhereInputArgs): Promise<any>;
    protected mapEntity<TData>(data: TData): TData extends null ? null : any;
}
