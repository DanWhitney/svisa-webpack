export declare enum ViOpenDefaultRMCompletionCode {
    VI_SUCCESS = 0
}
export declare enum ViOpenDefaultRMErrorCode {
    VI_ERROR_ALLOC,
    VI_ERROR_INV_SETUP,
    VI_ERROR_SYSTEM_ERROR
}
export declare function viOpenDefaultRM(): Promise<{
    status: number;
    defaultRM: number;
}>;
