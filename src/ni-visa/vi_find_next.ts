import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000

export enum ViFindNextCompletionCode {
    VI_SUCCESS = 0, //This is the function return status. It returns either a completion code or an error code as follows.   
}

export enum ViFindNextErrorCode {
    VI_ERROR_INV_SESSION = VI_ERROR + 0x3FFF000E ,// The given session or object reference is invalid (both are the same value). 
    VI_ERROR_INV_OBJECT = VI_ERROR + 0x3FFF000E ,// The given session or object reference is invalid (both are the same value).
    VI_ERROR_NSUP_OPER = VI_ERROR + 0x3FFF0067 ,// The given sesn does not support this function.
    VI_ERROR_RSRC_NFOUND = VI_ERROR + 0x3FFF0011// Specified expression does not match any devices.
}

export function ViFindNext(viSession: number): Promise<{ status: number, instrDesc: string }> {
    return new Promise<{ status: number, instrDesc: string }>((resolve, reject) => {
        let status: number = VI_ERROR

        let buffer_instrDesc = Buffer.alloc(512) // CString description


        status = agVisa.viFindNext(viSession, buffer_instrDesc as any)

        switch (status) {
            case ViFindNextCompletionCode.VI_SUCCESS: {
                let instrDesc: string = buffer_instrDesc.readCString()
                resolve({ status: status, instrDesc: instrDesc })
            }
            default: {
                reject(`viFindNext Error: status: ${status}`)
            }
        }
    })
}