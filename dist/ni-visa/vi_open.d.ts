export declare enum ViOpenCompletionCode {
    VI_SUCCESS = 0,
    VI_SUCCESS_DEV_NPRESENT = 1073676413,
    VI_WARN_CONFIG_NLOADED = 1073676407,
    VI_WARN_SERVER_CERT_UNTRUSTED = 1073676528
}
export declare enum ViOpenErrorCode {
    VI_ERROR_ALLOC,
    VI_ERROR_INTF_NUM_NCONFIG,
    VI_ERROR_INV_ACC_MODE,
    VI_ERROR_INV_RSRC_NAME,
    VI_ERROR_INV_SESSION,
    VI_ERROR_INV_OBJECT,
    VI_ERROR_INV_PROT,
    VI_ERROR_LIBRARY_NFOUND,
    VI_ERROR_NPERMISSION,
    VI_ERROR_NSUP_OPER,
    VI_ERROR_RSRC_BUSY,
    VI_ERROR_RSRC_LOCKED,
    VI_ERROR_RSRC_NFOUND,
    VI_ERROR_SERVER_CERT,
    VI_ERROR_NCIC,
    VI_ERROR_TMO
}
export declare function viOpen(viSession: number, visa_resource: string, viAccessMode: number, timeout: number): Promise<{
    status: number;
    session: number;
}>;
