"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserRepository", {
    enumerable: true,
    get: function() {
        return UserRepository;
    }
});
const _baserepository = require("../base.repository");
const _userentity = require("../../entities/user.entity");
const _lib = require("../../lib");
class UserRepository extends _baserepository.BaseRepository {
    async findByEmail(email) {
        return await this.findOne({
            email
        }, {
            ..._lib.userSelect
        });
    }
    async createOne(data) {
        return await this.create(data, {
            ..._lib.userSelect
        });
    }
    constructor(){
        super(_lib.prisma.user, _userentity.UserEntity);
    }
}

//# sourceMappingURL=user.repository.js.map