export declare type ViQueryStatus = {
    status: Number;
    write: String;
    read: String;
};
export declare const queryScpiByResourceName: (ResourceName: string, Scpi: string) => Promise<ViQueryStatus>;
