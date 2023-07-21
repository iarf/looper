"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Looper {
    /**
     * Finds all loops within a survey, returns as a 2d matrix compromising lists of their stations
     * E.g. [[i7,i8,i9], [i5,p54,p55,p56,p57,p58]] for a survey where shots are taken sequentially and
     * in which shots i9 -> i7, i5 -> p54, p58 -> i5 all exist
     * @param survey
     */
    static findLoops(survey) {
        const list = this.surveyToLinkedList(survey);
        const loops = [];
        // recursively traverse linked list, searching for loops
        const crawl = (node, neighbors, visited, prev) => {
            // now we've visited the current node
            visited.add(node);
            for (const neighbor of neighbors) {
                // ignore the previous station; a single vector shouldn't be treated as a loop
                if (neighbor == prev)
                    continue;
                // found a loop
                if (visited.has(neighbor)) {
                    let arr = Array.from(visited); // Note that per JS spec insertion order is maintained in sets
                    // get rid of everything before the neighbor (as this is just the path taken to reach the loop start point)
                    arr = arr.slice(arr.indexOf(neighbor));
                    // don't push to the answer if it's the inverse of another loop.
                    const sortedArr = Array.from(arr).sort(); // sorting eases comparisons; if both have the same elements they'll be the same loop
                    let found = false;
                    for (const loop of loops) {
                        const sortedLoop = Array.from(loop).sort();
                        // filter out obvious inequalities
                        if (sortedArr.length !== sortedLoop.length)
                            continue;
                        for (let i = 0; i < sortedArr.length; i++) {
                            if (sortedArr[i] !== sortedLoop[i])
                                break;
                            // they match
                            if (i === sortedArr.length - 1)
                                found = true;
                        }
                        if (found)
                            break;
                    }
                    if (!found)
                        loops.push(arr);
                    continue;
                }
                // hasn't been visited, start crawling
                crawl(neighbor, list.get(neighbor), new Set(visited), node);
            }
        };
        const start = survey[0].from; // start arbitrarily from the first station. If the survey is all connected the whole thing will be traversed
        crawl(start, list.get(start), new Set());
        return loops;
    }
    static surveyToLinkedList(survey) {
        const surveyLinkedList = new Map();
        for (const leg of survey) {
            if (!surveyLinkedList.has(leg.from))
                surveyLinkedList.set(leg.from, new Set());
            if (!surveyLinkedList.has(leg.to))
                surveyLinkedList.set(leg.to, new Set());
            surveyLinkedList.get(leg.from).add(leg.to);
            surveyLinkedList.get(leg.to).add(leg.from);
        }
        return surveyLinkedList;
    }
}
exports.default = Looper;
//# sourceMappingURL=index.js.map