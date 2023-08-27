"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const abstract_controller_1 = require("../abstract.controller");
const utils_1 = require("@/utils");
const lib_1 = require("@/lib");
const entities_1 = require("@/entities");
const config_1 = require("@/config");
const paginate = (0, utils_1.createPaginator)({ perPage: 20 });
class UserController extends abstract_controller_1.Controller {
    async create(req, res, next) {
        try {
            if (await lib_1.prisma.user.findFirst({ where: { email: req.body.email }, select: lib_1.userSelect })) {
                return abstract_controller_1.Controller.error(res, 'User already exists', {}, utils_1.StatusCode.BAD_REQUEST);
            }
            const user = await lib_1.prisma.user.create({ data: { ...req.body }, select: lib_1.userSelect });
            return abstract_controller_1.Controller.success(res, {
                user: abstract_controller_1.Controller.mapEntity(entities_1.UserEntity, user),
                token: jsonwebtoken_1.default.sign({ user }, config_1.JWT_SECRET, { expiresIn: '24h' }),
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findAll(req, res, next) {
        try {
            // Generic types can be passed to "paginate",
            // so args and result will be typed and autocompleted
            const result = await paginate(lib_1.prisma.user, {
                select: {
                    ...lib_1.userSelect,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }, { page: req.query.page });
            return abstract_controller_1.Controller.success(res, result);
        }
        catch (err) {
            next(err);
        }
    }
    async getTopUsers(req, res, next) {
        try {
            // The UserWithComments CTE identifies users who have at least one comment.
            // The main query joins the data from the UserPostCounts CTE,
            // filtering only those users who have comments based on the UserWithComments CTE.
            // The LEFT JOIN LATERAL clause retrieves the latest comment for each post while considering the specific user.
            // The final query retrieves the top 3 users with the most posts and includes their latest comments.
            return abstract_controller_1.Controller.success(res, await lib_1.prisma.$queryRaw `
          WITH UserPostCounts AS (
            SELECT
              u."id" AS user_id,
              u."firstName" AS user_name,
              u."lastName" AS last_name,
              COUNT(p."id") AS post_count,
              ROW_NUMBER() OVER (ORDER BY COUNT(p."id") DESC) AS user_rank
            FROM "users" u LEFT JOIN "posts" p ON u."id" = p."userId" GROUP BY u."id"
          ),
          UserWithComments AS (
            SELECT DISTINCT u."id" AS user_id FROM "users" u
            JOIN "comments" c ON u."id" = c."userId"
          )
          SELECT
            upc.user_id,
            upc.user_name,
            upc.last_name,
            p."title" AS post_title,
            c."comment" AS comment_content,
            c."createdAt" AS comment_createdAt
          FROM
            UserPostCounts upc
          JOIN
            "posts" p ON upc.user_id = p."userId"
          JOIN
            "users" u ON upc.user_id = u."id"
          JOIN LATERAL (
            SELECT "comment", "createdAt"
            FROM "comments" c
            WHERE c."postId" = p."id" AND c."userId" = u."id"
            ORDER BY c."createdAt" DESC
            LIMIT 1
          ) c ON true
          JOIN
            UserWithComments uwc ON upc.user_id = uwc.user_id
          WHERE
            upc.user_rank <= 3
          ORDER BY
            upc.user_rank;
        `);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
