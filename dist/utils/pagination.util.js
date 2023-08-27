"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPaginator", {
    enumerable: true,
    get: function() {
        return createPaginator;
    }
});
const createPaginator = (defaultOptions)=>{
    return async (model, args = {
        where: undefined
    }, options)=>{
        const page = Number(options?.page || defaultOptions?.page) || 1;
        const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
        const skip = page > 0 ? perPage * (page - 1) : 0;
        const [total, data] = await Promise.all([
            model.count({
                where: args.where
            }),
            model.findMany({
                ...args,
                take: perPage,
                skip
            })
        ]);
        const lastPage = Math.ceil(total / perPage);
        return {
            data,
            meta: {
                total,
                lastPage,
                current: page,
                perPage,
                prev: page > 1 ? page - 1 : null,
                next: page < lastPage ? page + 1 : null
            }
        };
    };
};

//# sourceMappingURL=pagination.util.js.map