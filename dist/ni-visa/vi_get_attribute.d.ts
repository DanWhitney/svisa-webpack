export declare enum ViGetAttributeCompletionCode {
    VI_SUCCESS = 0
}
export declare enum ViGetAttributeErrorCode {
    VI_ERROR_INV_SESSION,
    VI_ERROR_INV_OBJECT,
    VI_ERROR_NSUP_ATTR
}
export declare function viGetAttribute(viSession: number, attribute: number): Promise<{
    status: number;
    attrState: number;
}>;
