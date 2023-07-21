export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface RadialLeg {
    distance: number; // any decimal distance unit
    azimuth: number; // Degrees clockwise from North
    inclination: number; // Degrees relative to horizontal; range -90 : +9
}
export interface SurveyLeg {
    from: string;
    to: string;
    data: RadialLeg;
}
export type Survey = SurveyLeg[]