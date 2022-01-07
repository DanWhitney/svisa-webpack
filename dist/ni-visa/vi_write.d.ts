export declare enum ViWriteCompletionCode {
    VI_SUCCESS = 0
}
export declare enum ViWriteErrorCode {
    VI_ERROR_BERR,
    VI_ERROR_CONN_LOST,
    VI_ERROR_INP_PROT_VIOL,
    VI_ERROR_INV_SESSION,
    VI_ERROR_INV_OBJECT,
    VI_ERROR_INV_SETUP,
    VI_ERROR_IO,
    VI_ERROR_NCIC,
    VI_ERROR_NLISTENERS,
    VI_ERROR_NSUP_OPER,
    VI_ERROR_RAW_RD_PROT_VIOL,
    VI_ERROR_RAW_WR_PROT_VIOL,
    VI_ERROR_RSRC_LOCKED,
    VI_ERROR_TMO
}
export declare function viWrite(viSession: number, buff: string): Promise<{
    status: number;
    retCount: number;
}>;
