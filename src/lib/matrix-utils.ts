import { SphericalLeg, Vector3 } from "../types";

export default class MatrixUtils {
    /**
     * Trigonometrically convert spherical coordinates to a vector
     * @param spherical 
     * @returns 
     */
    public static sphericalToCartesian(spherical: SphericalLeg): Vector3 {
        // flip inclination to be relative to level rather than the z pole
        const clin = 90 - spherical.inclination
        const azimRad = this.degToRad(spherical.azimuth);
        const clinRad = this.degToRad(clin);

        return {
            x: spherical.distance * Math.sin(clinRad) * Math.cos(azimRad),
            y: spherical.distance * Math.sin(clinRad) * Math.sin(azimRad),
            z: spherical.distance * Math.cos(clinRad)
        }
    }
    // public static cartesianToSpherical(cartesian: Vector3): SphericalLeg {
    //     return {
    //         distance: Math.sqrt(cartesian.x ^ 2 + cartesian.y ^ 2 + cartesian.z ^ 2),
    //         azimuth: this.radToDeg(Math.atan(Math.sqrt(cartesian.x ^ 2 + cartesian.y ^ 2)))
    //     }
    // }
    /**
     * convert degrees to radians
     * @param deg 
     * @returns 
     */
    private static degToRad(deg: number): number {
        return deg * (Math.PI / 180)
    }
    /**
     * convert radians to degrees
     * @param rad 
     * @returns 
     */
    private static radToDeg(rad: number): number {
        return rad / (Math.PI / 180)
    }
}