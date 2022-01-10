export declare enum ViFindNextCompletionCode {
    VI_SUCCESS = 0
}
export declare enum ViFindNextErrorCode {
    VI_ERROR_INV_SESSION,
    VI_ERROR_INV_OBJECT,
    VI_ERROR_NSUP_OPER,
    VI_ERROR_RSRC_NFOUND
}
export declare function ViFindNext(viSession: number): Promise<{
    status: number;
    instrDesc: string;
}>;
