"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const sampleSurvey = [
    {
        from: "a0",
        to: "a1",
        data: {
            distance: 1,
            azimuth: 0,
            inclination: 0
        }
    },
    {
        from: "a1",
        to: "a2",
        data: {
            distance: 1,
            azimuth: 0,
            inclination: 0
        }
    },
    {
        from: "a2",
        to: "a3",
        data: {
            distance: 1,
            azimuth: 0,
            inclination: 0
        }
    },
    {
        from: "a3",
        to: "a4",
        data: {
            distance: 1,
            azimuth: 0,
            inclination: 0
        }
    },
    {
        from: "a2",
        to: "a5",
        data: {
            distance: 1,
            azimuth: 0,
            inclination: 0
        }
    },
    {
        from: "a5",
        to: "a6",
        data: {
            distance: 1,
            azimuth: 0,
            inclination: 0
        }
    },
    {
        from: "a6",
        to: "a7",
        data: {
            distance: 1,
            azimuth: 0,
            inclination: 0
        }
    },
    {
        from: "a7",
        to: "a4",
        data: {
            distance: 1,
            azimuth: 0,
            inclination: 0
        }
    },
];
describe("surveyToLinkedList", () => {
    it("creates a dually linked list with one node per station", () => {
        const list = __1.default.surveyToLinkedList(sampleSurvey);
        expect(list.size).toBe(8);
    });
});
describe("findLoops", () => {
    it("should find a loop", () => {
        const loops = __1.default.findLoops(sampleSurvey);
        expect(loops).toEqual([['a2', 'a3', 'a4', 'a7', 'a6', 'a5']]);
    });
});
//# sourceMappingURL=utils.test.js.map