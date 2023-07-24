import MatrixUtils from "./lib/matrix-utils";
import { LoopInfo, SphericalLeg, Survey, SurveyLeg, Vector3 } from "./types";
export default class Looper {
    /**
     * Finds all loops within a survey, returns as a 2d matrix compromising lists of their stations
     * E.g. [[i7,i8,i9], [i5,p54,p55,p56,p57,p58]] for a survey where shots are taken sequentially and
     * in which shots i9 -> i7, i5 -> p54, p58 -> i5 all exist
     * @param survey 
     */
    public static findLoops(survey: Survey): string[][] {
        const list = this.surveyToLinkedList(survey);
        const loops: string[][] = [];
        // recursively traverse linked list, searching for loops
        const crawl = (node: string, neighbors: Set<string>, visited: Set<string>, prev?: string) => {
            // now we've visited the current node
            visited.add(node);

            for (const neighbor of neighbors) {
                // ignore the previous station; a single vector shouldn't be treated as a loop
                if (neighbor == prev) continue;
                // found a loop
                if (visited.has(neighbor)) {
                    let arr = Array.from(visited); // Note that per JS spec insertion order is maintained in sets
                    // get rid of everything before the neighbor (as this is just the path taken to reach the loop start point)
                    arr = arr.slice(arr.indexOf(neighbor));
                    
                    // don't push to the answer if it's the inverse of another loop.
                    const sortedArr = Array.from(arr).sort() // sorting eases comparisons; if both have the same elements they'll be the same loop
                    let found = false;
                    for (const loop of loops) {
                        const sortedLoop = Array.from(loop).sort();
                        // filter out obvious inequalities
                        if (sortedArr.length !== sortedLoop.length) continue;
                        for (let i = 0; i < sortedArr.length; i ++) {
                            if (sortedArr[i] !== sortedLoop[i]) break;
                            // they match
                            if (i === sortedArr.length - 1) found = true
                        }
                        if (found) break;
                    }
                    if (!found) loops.push(arr)
                    continue;
                }
                // hasn't been visited, start crawling
                crawl(neighbor, list.get(neighbor), new Set(visited), node);
            }
        }
        const start = survey[0].from // start arbitrarily from the first station. If the survey is all connected the whole thing will be traversed
        crawl(start, list.get(start), new Set());
        return loops;
    }
    public static surveyToLinkedList(survey: Survey): Map<string /**station */, Set<string> /**neighbors */> {
        const surveyLinkedList: Map<string /**station */, Set<string> /**neighbors */> = new Map();
        for (const leg of survey) {
            if (!surveyLinkedList.has(leg.from)) surveyLinkedList.set(leg.from, new Set());
            if (!surveyLinkedList.has(leg.to)) surveyLinkedList.set(leg.to, new Set());
            surveyLinkedList.get(leg.from).add(leg.to);
            surveyLinkedList.get(leg.to).add(leg.from);
        }
        return surveyLinkedList;
    }
    /**
     * Analyzes provided loops and returns some simple stats
     * @param survey 
     * @param loops
     */
    public static analyzeLoops(survey: Survey, loops: string[][]): LoopInfo[] {
        const analyzed: LoopInfo[] = [];
        for (const loop of loops) {
            // get an array of all shots used in the loop, transposed in the direction of the loop
            const shots: SurveyLeg[] = [];
            const shotVectors: Vector3[] = [];
            let distance = 0;
            for (let i = 0; i < loop.length; i ++) {
                const next = i + 1 < loop.length ? i + 1 : 0;
                // find shots equivalent to loop[i] -> loop[next] (stations)
                const legShots: SurveyLeg[] = [];
                for (const shot of survey) {
                    if (shot.from == loop[i] && shot.to == loop[next]) legShots.push(shot)
                    // invert shot if facing wrong way
                    else if (shot.from == loop[next] && shot.to == loop[i]) {
                        legShots.push({
                            from: shot.to,
                            to: shot.from,
                            data: {
                                distance: shot.data.distance,
                                azimuth: (shot.data.azimuth + 180) % 360,
                                inclination: - shot.data.inclination
                            }
                        })
                    }
                }
                // average all shots providing data on current leg
                const data: SphericalLeg =  {
                    distance: legShots.map(leg => leg.data.distance).reduce((accumulator, current) => accumulator + current) / legShots.length,
                    azimuth: legShots.map(leg => leg.data.azimuth).reduce((accumulator, current) => accumulator + current) / legShots.length,
                    inclination: legShots.map(leg => leg.data.inclination).reduce((accumulator, current) => accumulator + current) / legShots.length
                }
                shots.push({
                    from: loop[i],
                    to: loop[next],
                    data
                })
                shotVectors.push(MatrixUtils.sphericalToCartesian(data));
                distance += data.distance;
            }
            // add up vectors to find closure error
            const runningVector: Vector3 = {
                x: 0,
                y: 0,
                z: 0
            }
            shotVectors.map(vector => {
                runningVector.x += vector.x,
                runningVector.y += vector.y,
                runningVector.z += vector.z
            });
            const closureOffset = MatrixUtils.cartesianToSpherical(runningVector)
            // conver
            analyzed.push({
                stations: loop,
                distance,
                closureOffset
            })
        }
        return analyzed;
    }
}