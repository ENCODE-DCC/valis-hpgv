/**
 * Should be plain-old-data and easy to serialize
 * - Should encapsulate complete state, excluding transitive UI state
 * - Applying a TrackModel state should restore state exactly
 */
export type TrackModel = {
    type: string,

    // display properties
    name: string,
    heightPx?: number,
    expandedHeightPx?: number,
    
    highlightLocation?: number,

    expandable?: boolean,

    color?: Array<number>,

    // @! not yet implemented
    styleSelector?: string,

    [field: string]: any,
};

export default TrackModel;