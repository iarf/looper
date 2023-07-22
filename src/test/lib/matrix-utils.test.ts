import MatrixUtils from '../../lib/matrix-utils'

describe ("MatrixUtils", () => {
    describe ("sphericalToCartesian", () => {
        it("Should convert a set of spherical coordinates to a correct vector", () => {
            const answer = MatrixUtils.sphericalToCartesian({
                distance: 5,
                azimuth: 60,
                inclination: 30
            })
            expect(answer.x).toBeCloseTo(1.25, 4)
            expect(answer.y).toBeCloseTo(2.1903, 4)
            expect(answer.z).toBeCloseTo(4.3301, 4)

        })
    })
})