import ref from 'ref-napi';
export declare const agVisa: {
    viOpenDefaultRM: import("ffi-napi").ForeignFunction<number, [ref.Pointer<number>]>;
    viFindRsrc: import("ffi-napi").ForeignFunction<number, [number, string | null, ref.Pointer<number>, ref.Pointer<number>, string | null]>;
    viFindNext: import("ffi-napi").ForeignFunction<number, [number, string | null]>;
    viParseRsrc: import("ffi-napi").ForeignFunction<number, [number, string | null, ref.Pointer<number>, ref.Pointer<number>]>;
    viParseRsrcEx: import("ffi-napi").ForeignFunction<number, [number, string | null, ref.Pointer<number>, ref.Pointer<number>, string | null, string | null, string | null]>;
    viOpen: import("ffi-napi").ForeignFunction<number, [number, string | null, number, number, ref.Pointer<number>]>;
    viClose: import("ffi-napi").ForeignFunction<number, [number]>;
    viRead: import("ffi-napi").ForeignFunction<number, [number, ref.Pointer<number>, number, ref.Pointer<number>]>;
    viReadToFile: import("ffi-napi").ForeignFunction<number, [number, string | null, number, ref.Pointer<number>]>;
    viWrite: import("ffi-napi").ForeignFunction<number, [number, string | null, number, ref.Pointer<number>]>;
    viReadAsync: import("ffi-napi").ForeignFunction<number, [number, string | null, number, ref.Pointer<number>]>;
    viWriteAsync: import("ffi-napi").ForeignFunction<number, [number, string | null, number, ref.Pointer<number>]>;
    viEnableEvent: import("ffi-napi").ForeignFunction<number, [number, number, number, number]>;
    viDisableEvent: import("ffi-napi").ForeignFunction<number, [number, number, number]>;
    viWaitOnEvent: import("ffi-napi").ForeignFunction<number, [number, number, number, ref.Pointer<number>, ref.Pointer<number>]>;
    viGetAttribute: import("ffi-napi").ForeignFunction<number, [number, number, ref.Pointer<number>]>;
};
export declare function viRead(viSession: number, count: number): {
    status: number;
    retBuff: string;
    retCount: number;
};
export declare function visaQuery(visaAddress: string, queryString: string, callback: (status: number, returnBuffer: string) => void): void;
export declare function visaAsyncQuery(visaAddress: string, queryString: string, callback: (status: number, returnBuffer: string) => void): void;
export declare function visaQueryToPromise(visaAddress: string, queryString: string): Promise<string>;
