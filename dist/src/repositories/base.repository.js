"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const class_transformer_1 = require("class-transformer");
// missing type safety here: Issue with prisma not having some generics to work with for dynamic repository
class BaseRepository {
    model;
    entity;
    constructor(model, entity) {
        this.model = model;
        this.entity = entity;
    }
    async findOne(where, select, include) {
        // @ts-expect-error typing
        const data = await this.model.findFirst({
            where,
            ...(!select && include && { include }),
            ...(!include && select && { select }),
        });
        return this.mapEntity(data);
    }
    async findById(id, select) {
        return this.mapEntity(await this.findOne({ id, select }));
    }
    async update(where, data, select) {
        // @ts-expect-error typing
        return await this.model.update({
            where,
            data,
            ...{ select },
        });
    }
    async create(data, select) {
        // @ts-expect-error typing
        const created = await this.model.create({
            data,
            select,
        });
        return this.mapEntity(created);
    }
    async upsert(where, create, update) {
        // @ts-expect-error typing
        return await this.model.upsert({
            where,
            create,
            update,
        });
    }
    async delete(where) {
        // @ts-expect-error typing
        return await this.model.delete({
            where,
        });
    }
    mapEntity(data) {
        return (0, class_transformer_1.plainToInstance)(this.entity, JSON.parse(JSON.stringify(data)));
    }
}
exports.BaseRepository = BaseRepository;
