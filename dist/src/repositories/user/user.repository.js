"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const base_repository_1 = require("../base.repository");
const user_entity_1 = require("../../entities/user.entity");
const lib_1 = require("@/lib");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(lib_1.prisma.user, user_entity_1.UserEntity);
    }
    async findByEmail(email) {
        return await this.findOne({
            email,
        }, { ...lib_1.userSelect });
    }
    async createOne(data) {
        return await this.create(data, { ...lib_1.userSelect });
    }
}
exports.UserRepository = UserRepository;
