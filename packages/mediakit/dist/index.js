"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoKit = exports.ImageKit = exports.MediaKit = void 0;
const kit_1 = __importDefault(require("./media-kit/kit"));
exports.MediaKit = kit_1.default;
const kit_2 = __importDefault(require("./image-kit/kit"));
exports.ImageKit = kit_2.default;
const kit_3 = __importDefault(require("./video-kit/kit"));
exports.VideoKit = kit_3.default;
exports.default = kit_1.default;
//# sourceMappingURL=index.js.map