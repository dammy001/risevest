"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BaseRepository", {
    enumerable: true,
    get: function() {
        return BaseRepository;
    }
});
const _classtransformer = require("class-transformer");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class BaseRepository {
    async findOne(where, select, include) {
        // @ts-expect-error typing
        const data = await this.model.findFirst({
            where,
            ...!select && include && {
                include
            },
            ...!include && select && {
                select
            }
        });
        return this.mapEntity(data);
    }
    async findById(id, select) {
        return this.mapEntity(await this.findOne({
            id,
            select
        }));
    }
    async update(where, data, select) {
        // @ts-expect-error typing
        return await this.model.update({
            where,
            data,
            ...{
                select
            }
        });
    }
    async create(data, select) {
        // @ts-expect-error typing
        const created = await this.model.create({
            data,
            select
        });
        return this.mapEntity(created);
    }
    async upsert(where, create, update) {
        // @ts-expect-error typing
        return await this.model.upsert({
            where,
            create,
            update
        });
    }
    async delete(where) {
        // @ts-expect-error typing
        return await this.model.delete({
            where
        });
    }
    mapEntity(data) {
        return (0, _classtransformer.plainToInstance)(this.entity, JSON.parse(JSON.stringify(data)));
    }
    constructor(model, entity){
        _define_property(this, "model", void 0);
        _define_property(this, "entity", void 0);
        this.model = model;
        this.entity = entity;
    }
}

//# sourceMappingURL=base.repository.js.map