export declare enum ViFindRsrcCompletionCode {
    VI_SUCCESS = 0
}
export declare enum ViFindRsrcErrorCode {
    VI_ERROR_INV_EXPR,
    VI_ERROR_INV_SESSION,
    VI_ERROR_INV_OBJECT,
    VI_ERROR_NSUP_OPER,
    VI_ERROR_RSRC_NFOUND
}
export declare function ViFindRsrc(viSession: number, expr: string): Promise<{
    status: number;
    findList: number;
    retcnt: number;
    instrDesc: string;
}>;
