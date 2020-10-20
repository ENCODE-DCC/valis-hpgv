import IDataSource from "../../data-source/IDataSource";
import { Tile, TileLoader } from "../TileLoader";
import { GeneInfo, TranscriptComponentInfo, TranscriptInfo, BigBedBroadPeakColumns, BigBedNarrowPeakColumns, BigBedMethylColumns, BigBedTssPeakColumns, BigBedIdrPeakColumns } from "./AnnotationTypes";
import { BigLoader } from "../../formats";
import { Contig, AnnotationTrackModel } from "../..";
export declare type Gene = GeneInfo & {
    transcripts: Array<Transcript>;
} & BigBedBroadPeakColumns & BigBedNarrowPeakColumns & BigBedMethylColumns & BigBedTssPeakColumns & BigBedIdrPeakColumns;
export declare type Transcript = TranscriptInfo & {
    exon: Array<TranscriptComponentInfo>;
    cds: Array<TranscriptComponentInfo>;
    utr: Array<TranscriptComponentInfo>;
    other: Array<TranscriptComponentInfo>;
};
declare type TilePayload = Array<Gene>;
declare enum AnnotationFormat {
    ValisGenes = 0,
    BigBed = 1,
    BigBedDataBroadPeak = 2,
    BigBedDataNarrowPeak = 3,
    BigBedDataMethyl = 4,
    BigBedDataTssPeak = 5,
    BigBedDataIdrPeak = 6
}
export declare class AnnotationTileLoader extends TileLoader<TilePayload, void> {
    protected readonly dataSource: IDataSource;
    protected readonly model: AnnotationTrackModel;
    protected readonly contig: string;
    protected annotationFileFormat?: AnnotationFormat;
    readonly macroLod: number;
    protected readonly macroLodBlendRange: number;
    protected readonly macroLodThresholdLow: number;
    protected readonly macroLodThresholdHigh: number;
    static cacheKey(model: AnnotationTrackModel): string;
    static getAnnotationFormat(model: AnnotationTrackModel): AnnotationFormat;
    static getAvailableContigs(model: AnnotationTrackModel): Promise<Array<Contig>>;
    constructor(dataSource: IDataSource, model: AnnotationTrackModel, contig: string, tileSize?: number);
    mapLodLevel(l: number): 0 | 5;
    protected _bigLoaderPromise: Promise<BigLoader>;
    protected getBigLoader(): Promise<BigLoader>;
    protected getTilePayload(tile: Tile<TilePayload>): Promise<TilePayload> | TilePayload;
    static loadValisGenesAnnotations(path: string, contig: string, startBaseIndex: number, span: number, macro: boolean): Promise<TilePayload>;
}
export default AnnotationTileLoader;
