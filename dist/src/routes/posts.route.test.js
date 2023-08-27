"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_route_1 = __importDefault(require("./posts.route"));
describe('PostRoute', () => {
    it('should be defined', () => {
        expect(posts_route_1.default).toBeDefined();
    });
});
