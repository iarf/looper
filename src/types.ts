export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface SphericalLeg {
    distance: number; // any decimal distance unit
    azimuth: number; // Degrees clockwise from North
    inclination: number; // Degrees relative to horizontal; range -90 : +9
}
export interface SurveyLeg {
    from: string;
    to: string;
    data: SphericalLeg;
}
export type Survey = SurveyLeg[]
export interface LoopInfo {
    distance: number;
    stations: string[];
    closureOffset: SphericalLeg;
}