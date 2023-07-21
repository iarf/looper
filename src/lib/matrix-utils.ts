import { SphericalLeg, Vector3 } from "../types";

export default class MatrixUtils {
    /**
     * Trigonometrically convert spherical coordinates to a vector
     * @param spherical 
     * @returns 
     */
    public static sphericalToCartesian(spherical: SphericalLeg): Vector3 {
        const azimRad = this.degToRad(spherical.azimuth);
        const clinRad = this.degToRad(spherical.inclination);

        return {
            x: spherical.distance * Math.sin(clinRad) * Math.cos(azimRad),
            y: spherical.distance * Math.sin(clinRad * Math.sin(azimRad)),
            z: spherical.distance * Math.cos(clinRad)
        }
    }
    /**
     * convert degrees to radians
     * @param deg 
     * @returns 
     */
    private static degToRad(deg: number): number {
        return deg * (Math.PI / 180)
    }
}