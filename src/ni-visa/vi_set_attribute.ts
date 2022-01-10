import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000
export enum ViSetAttributeCompletionCode {
    VI_SUCCESS = 0, // Resource attribute retrieved successfully.
    VI_WARN_NSUP_ATTR_STATE = 0x3FFF0084, // Although the specified attribute state is valid, it is not supported by this resource implementation. (The application will still work, but this may have a performance impact.)
}

export enum ViSetAttributeErrorCode {
    VI_ERROR_ATTR_READONLY = VI_ERROR +  0x3FFF001F, // The specified attribute is read-only.
    VI_ERROR_INV_SESSION = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_OBJECT = VI_ERROR +  0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_NSUP_ATTR = VI_ERROR +  0x3FFF001D, // The specified attribute is not defined by the referenced resource.
    VI_ERROR_NSUP_ATTR_STATE = VI_ERROR + 0x3FFF001E, // The specified state of the attribute is not valid, or is not supported as defined by the resource. (The application probably will not work if this error is returned.)
    VI_ERROR_RSRC_LOCKED = VI_ERROR + 0x3FFF000F // Specified operation could not be performed because the resource identified by vi has been locked for this kind of access.  
}


export function viSetAttribute(viSession: number, attribute: number, attrState: number): Promise<{ status: number}> {
    return new Promise<{ status: number }>((resolve, reject) => {
        let status: number = VI_ERROR

        status = agVisa.viSetAttribute(viSession, attribute, attrState)

        switch (status) {
            case ViSetAttributeCompletionCode.VI_SUCCESS:
            case ViSetAttributeCompletionCode.VI_WARN_NSUP_ATTR_STATE: {
                resolve({ status: status})
            }
            default: {
                reject(`viSetAttribute Error: status: ${status}`)
            }
        }
    })
}
