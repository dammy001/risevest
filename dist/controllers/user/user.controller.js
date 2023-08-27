"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserController", {
    enumerable: true,
    get: function() {
        return UserController;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _abstractcontroller = require("../abstract.controller");
const _utils = require("../../utils");
const _lib = require("../../lib");
const _entities = require("../../entities");
const _config = require("../../config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const paginate = (0, _utils.createPaginator)({
    perPage: 20
});
class UserController extends _abstractcontroller.Controller {
    async create(req, res, next) {
        try {
            if (await _lib.prisma.user.findFirst({
                where: {
                    email: req.body.email
                },
                select: _lib.userSelect
            })) {
                return _abstractcontroller.Controller.error(res, 'User already exists', {}, _utils.StatusCode.BAD_REQUEST);
            }
            const user = await _lib.prisma.user.create({
                data: {
                    ...req.body
                },
                select: _lib.userSelect
            });
            return _abstractcontroller.Controller.success(res, {
                user: _abstractcontroller.Controller.mapEntity(_entities.UserEntity, user),
                token: _jsonwebtoken.default.sign({
                    user
                }, _config.JWT_SECRET, {
                    expiresIn: '24h'
                })
            });
        } catch (err) {
            next(err);
        }
    }
    async findAll(req, res, next) {
        try {
            // Generic types can be passed to "paginate",
            // so args and result will be typed and autocompleted
            const result = await paginate(_lib.prisma.user, {
                select: {
                    ..._lib.userSelect
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }, {
                page: req.query.page
            });
            return _abstractcontroller.Controller.success(res, result);
        } catch (err) {
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
            return _abstractcontroller.Controller.success(res, await _lib.prisma.$queryRaw`
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
        } catch (err) {
            next(err);
        }
    }
}

//# sourceMappingURL=user.controller.js.map