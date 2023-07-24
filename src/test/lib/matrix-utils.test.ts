import MatrixUtils from '../../lib/matrix-utils'

describe ("MatrixUtils", () => {
    describe ("sphericalToCartesian", () => {
        it("Should convert a set of spherical coordinates to a correct vector", () => {
            const answer = MatrixUtils.sphericalToCartesian({
                distance: 5,
                azimuth: 60,
                inclination: -60
            })
            
            expect(answer.x).toBeCloseTo(1.25, 4)
            expect(answer.y).toBeCloseTo(2.1651, 4)
            expect(answer.z).toBeCloseTo(-4.3301, 4)

        })
    })
    describe("cartesianToSpherical", () => {
        it("should convert a vector to spherical coords", () => {
            const answer = MatrixUtils.cartesianToSpherical({
                x: 2,
                y: 7,
                z: 1
            })

            expect(answer.distance).toBeCloseTo(7.35);
            expect(answer.azimuth).toBeCloseTo(74.05);
            expect(answer.inclination).toBeCloseTo(7.82);
        })
    })
})