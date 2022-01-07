import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000
export enum ViCloseCompletionCode {
    VI_SUCCESS = 0, //Session to the Default Resource Manager resource created successfully.
    VI_WARN_NULL_OBJECT = 0x3FFF0082// The specified object reference is uninitialized.
}

export enum ViCloseErrorCode {
    VI_ERROR_CLOSING_FAILED = VI_ERROR + 0x3FFF0016, // Unable to deallocate the previously allocated data structures corresponding to this session or object reference.
    VI_ERROR_INV_SESSION = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_OBJECT = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
}


export function viClose(viObject: number): Promise<{ status: number }> {
    return new Promise<{ status: number }>((resolve, reject) => {
        let status: number = VI_ERROR

        status = agVisa.viClose(viObject)
        switch (status) {
            case ViCloseCompletionCode.VI_SUCCESS:
            case ViCloseCompletionCode.VI_WARN_NULL_OBJECT: {
                resolve({ status: status })
            }
            default: {
                reject(`viClose Error: status: ${status}`)
            }
        }
    })
}