"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_route_1 = __importDefault(require("./users.route"));
describe('UserRoute', () => {
    it('should be defined', () => {
        expect(users_route_1.default).toBeDefined();
    });
});
