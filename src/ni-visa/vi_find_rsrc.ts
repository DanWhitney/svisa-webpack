import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000

export enum ViFindRsrcCompletionCode {
    VI_SUCCESS = 0, //This is the function return status. It returns either a completion code or an error code as follows.   
}

export enum ViFindRsrcErrorCode {
    VI_ERROR_INV_EXPR = VI_ERROR + 0x3FFF0010 ,// Invalid expression specified for search.
    VI_ERROR_INV_SESSION = VI_ERROR + 0x3FFF000E ,// The given session or object reference is invalid (both are the same value). 
    VI_ERROR_INV_OBJECT = VI_ERROR + 0x3FFF000E ,// The given session or object reference is invalid (both are the same value).
    VI_ERROR_NSUP_OPER = VI_ERROR + 0x3FFF0067 ,// The given sesn does not support this function.
    VI_ERROR_RSRC_NFOUND = VI_ERROR + 0x3FFF0011// Specified expression does not match any devices.
}


export function ViFindRsrc(viSession: number, expr: string): Promise<{ status: number, findList: number, retcnt: number, instrDesc: string }> {
    return new Promise<{ status: number, findList: number, retcnt: number, instrDesc: string }>((resolve, reject) => {
        let status: number = VI_ERROR

        let bufferFindList = Buffer.alloc(4) //u32
        let buffer_retcnt = Buffer.alloc(4) //u32
        let buffer_instrDesc = Buffer.alloc(512) // CString description


        status = agVisa.viFindRsrc(viSession, expr, bufferFindList as any, buffer_retcnt as any, buffer_instrDesc as any)

        switch (status) {
            case ViFindRsrcCompletionCode.VI_SUCCESS: {
                let findList = bufferFindList.readUInt32LE()
                let retcnt: number = buffer_retcnt.readUInt32LE()
                let instrDesc: string = buffer_instrDesc.readCString()
                resolve({ status: status, findList: findList, retcnt: retcnt, instrDesc: instrDesc })
            }
            default: {
                reject(`viFindRsrc Error: status: ${status}`)
            }
        }
    })
}