import Looper from "..";
import { Survey } from "../types";
const sampleSurvey: Survey = [
    {
        from: "a0",
        to: "a1",
        data: {
            distance: 1,
            azimuth: 90,
            inclination: 0
        }
    },
    {
        from: "a1",
        to: "a2",
        data: {
            distance: 1,
            azimuth: 90,
            inclination: 0
        }
    },
    {
        from: "a2",
        to: "a3",
        data: {
            distance: 1,
            azimuth: 90,
            inclination: 0
        }
    },
    {
        from: "a3",
        to: "a4",
        data: {
            distance: 1,
            azimuth: 90,
            inclination: -40
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
            distance: 2,
            azimuth: 90,
            inclination: -39
        }
    },
    {
        from: "a6",
        to: "a7",
        data: {
            distance: 1,
            azimuth: 180,
            inclination: 0
        }
    },
    {
        from: "a7",
        to: "a4",
        data: {
            distance: 1,
            azimuth: 270,
            inclination: 0
        }
    },
]
const sampleSurvey2: Survey = [
    {
        from: "0",
        to: "1",
        data: {
            distance: 2,
            azimuth: 90,
            inclination: 45
        }
    },
    {
        from: "1",
        to: "2",
        data: {
            distance: 2,
            azimuth: 90,
            inclination: 45
        }
    },
    {
        from: "2",
        to: "0",
        data: {
            distance: 4,
            azimuth: 270,
            inclination: -45
        }
    },
]
describe("surveyToLinkedList", () => {
    it("creates a dually linked list with one node per station", () => {
        const list = Looper.surveyToLinkedList(sampleSurvey);
        expect(list.size).toBe(8);
    })
})

describe("findLoops", () => {
    it("should find a loop", () => {
        const loops = Looper.findLoops(sampleSurvey);
        expect(loops).toEqual([ [ 'a2', 'a3', 'a4', 'a7', 'a6', 'a5' ] ])
    })
})

describe("analyzeLoops", () => {
    it("should return statistics for a simple intuitive loop", () => {
        const loops = Looper.findLoops(sampleSurvey2);
        const analysis = Looper.analyzeLoops(sampleSurvey2, loops);
        expect(analysis[0].stations).toEqual(["0","1","2"])
        expect(analysis[0].closureOffset.distance).toBeCloseTo(0),
        expect(analysis[0].distance).toBe(8)
    });
})