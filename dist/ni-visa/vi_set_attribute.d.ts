export declare enum ViSetAttributeCompletionCode {
    VI_SUCCESS = 0,
    VI_WARN_NSUP_ATTR_STATE = 1073676420
}
export declare enum ViSetAttributeErrorCode {
    VI_ERROR_ATTR_READONLY,
    VI_ERROR_INV_SESSION,
    VI_ERROR_INV_OBJECT,
    VI_ERROR_NSUP_ATTR,
    VI_ERROR_NSUP_ATTR_STATE,
    VI_ERROR_RSRC_LOCKED
}
export declare function viSetAttribute(viSession: number, attribute: number, attrState: number): Promise<{
    status: number;
}>;
