import GPUDevice, { GPUTexture } from "engine/rendering/GPUDevice";
import { SignalTrackModel } from "./SignalTrackModel";
import { AxiosDataLoader, BigWigReader, HeaderData } from "bigwig-reader";
import { TileLoader, Tile } from "../TileLoader";
import { IDataSource } from "../../data-source/IDataSource";
export declare type SignalTilePayload = {
    array: Float32Array;
    sequenceMinMax: {
        min: number;
        max: number;
    };
    dataUploaded: boolean;
    getTexture(device: GPUDevice): GPUTexture;
};
declare type BlockPayload = {
    _gpuTexture: GPUTexture;
    floatPacking: boolean;
    getTexture(device: GPUDevice): GPUTexture;
};
export declare class SignalTileLoader extends TileLoader<SignalTilePayload, BlockPayload> {
    protected readonly dataSource: IDataSource;
    protected readonly model: SignalTrackModel;
    protected readonly contig: string;
    ready: boolean;
    protected header: HeaderData;
    protected lodMap: Array<number>;
    protected lodZoomIndexMap: Array<number | null>;
    protected bigWigLoader: AxiosDataLoader;
    protected bigWigReader: BigWigReader;
    static cacheKey(model: SignalTrackModel): string;
    constructor(dataSource: IDataSource, model: SignalTrackModel, contig: string);
    protected onReady(): void;
    protected generateLodLookups(bigWigHeader: HeaderData): {
        lodMap: Array<number>;
        lodZoomIndexMap: Array<number>;
    };
    protected mapLodLevel(l: number): number;
    protected getTilePayload(tile: Tile<SignalTilePayload>): Promise<SignalTilePayload>;
    protected createBlockPayload(lodLevel: number, lodX: number, tileWidth: number, rows: number): BlockPayload;
    protected releaseBlockPayload(payload: BlockPayload): void;
}
export {};