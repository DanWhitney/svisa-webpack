export declare enum ViCloseCompletionCode {
    VI_SUCCESS = 0,
    VI_WARN_NULL_OBJECT = 1073676418
}
export declare enum ViCloseErrorCode {
    VI_ERROR_CLOSING_FAILED,
    VI_ERROR_INV_SESSION,
    VI_ERROR_INV_OBJECT
}
export declare function viClose(viObject: number): Promise<{
    status: number;
}>;
