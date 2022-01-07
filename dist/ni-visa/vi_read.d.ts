export declare enum ViReadCompletionCode {
    VI_SUCCESS = 0,
    VI_SUCCESS_TERM_CHAR = 1073676293,
    VI_SUCCESS_MAX_CNT = 1073676294
}
export declare enum ViReadErrorCode {
    VI_ERROR_ASRL_FRAMING,
    VI_ERROR_ASRL_OVERRUN,
    VI_ERROR_ASRL_PARITY,
    VI_ERROR_BERR,
    VI_ERROR_CONN_LOST,
    VI_ERROR_INV_SESSION,
    VI_ERROR_INV_OBJECT,
    VI_ERROR_INV_SETUP,
    VI_ERROR_IO,
    VI_ERROR_NCIC,
    VI_ERROR_NLISTENERS,
    VI_ERROR_NSUP_OPER,
    VI_ERROR_OUTP_PROT_VIOL,
    VI_ERROR_RAW_RD_PROT_VIOL,
    VI_ERROR_RAW_WR_PROT_VIOL,
    VI_ERROR_RSRC_LOCKED,
    VI_ERROR_TMO
}
export declare function viRead(viSession: number, count: number): Promise<{
    status: number;
    retCount: number;
    buf: string;
}>;
