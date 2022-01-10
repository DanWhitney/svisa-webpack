import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000
export enum ViGetAttributeCompletionCode {
    VI_SUCCESS = 0, // Resource attribute retrieved successfully.
}

export enum ViGetAttributeErrorCode {
    VI_ERROR_INV_SESSION = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_OBJECT = VI_ERROR +  0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_NSUP_ATTR = VI_ERROR +  0x3FFF001D, // The specified attribute is not defined by the referenced resource.
}


export function viGetAttribute(viSession: number, attribute: number): Promise<{ status: number, attrState: number}> {
    return new Promise<{ status: number , attrState: number}>((resolve, reject) => {
        let status: number = VI_ERROR

        let bufferAttrState = Buffer.alloc(4) //u32

        status = agVisa.viGetAttribute(viSession, attribute, bufferAttrState as any)

        switch (status) {
            case ViGetAttributeCompletionCode.VI_SUCCESS: {
                let attrState = bufferAttrState.readUInt32LE()
                resolve({ status: status , attrState: attrState})
            }
            default: {
                reject(`viGetAttribute Error: status: ${status}`)
            }
        }
    })
}
