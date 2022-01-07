import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000
export enum ViWriteCompletionCode {
    VI_SUCCESS = 0, //Session to the Default Resource Manager resource created successfully.
}

export enum ViWriteErrorCode {
    VI_ERROR_BERR = VI_ERROR + 0x3FFF0038, // Bus error occurred during transfer.
    VI_ERROR_CONN_LOST = VI_ERROR + 0x3FFF00A6,  // The I/O connection for the given session has been lost.
    VI_ERROR_INP_PROT_VIOL = VI_ERROR + 0x3FFF0037, // Device reported an input protocol error occurred during transfer.
    VI_ERROR_INV_SESSION = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_OBJECT = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_SETUP = VI_ERROR + 0x3FFF003A, // Unable to start write function because setup is invalid (due to attributes being set to an inconsistent state).
    VI_ERROR_IO = VI_ERROR + 0x3FFF003E, // Unknown I/O error occurred during transfer.
    VI_ERROR_NCIC = VI_ERROR + 0x3FFF0060, // The interface associated with the given vi is not currently the controller in charge.
    VI_ERROR_NLISTENERS = VI_ERROR + 0x3FFF005F, // No Listeners condition is detected (both NRFD and NDAC are de-asserted).
    VI_ERROR_NSUP_OPER = VI_ERROR + 0x3FFF0067, // The given vi does not support this function.
    VI_ERROR_RAW_RD_PROT_VIOL = VI_ERROR + 0x3FFF0035, // Violation of raw read protocol occurred during transfer.
    VI_ERROR_RAW_WR_PROT_VIOL = VI_ERROR + 0x3FFF0034, // Violation of raw write protocol occurred during transfer.
    VI_ERROR_RSRC_LOCKED = VI_ERROR + 0x3FFF000F, // Specified operation could not be performed because the resource identified by vi has been locked for this kind of access.
    VI_ERROR_TMO = VI_ERROR + 0x3FFF0015, // A session to the resource could not be obtained within the specified timeout period.
}


export function viWrite(viSession: number, buff: string): Promise<{ status: number, retCount: number }> {
    return new Promise<{ status: number, retCount: number }>((resolve, reject) => {
        let status: number = VI_ERROR

        let bufferRetCount = Buffer.alloc(4) //u32

        status = agVisa.viWrite(viSession, buff, buff.length, bufferRetCount as any)

        switch (status) {
            case ViWriteCompletionCode.VI_SUCCESS: {
                let retCount: number = bufferRetCount.readUInt32LE()
                resolve({ status: status, retCount: retCount })
            }
            default: {
                reject(`viWrite Error: status: ${status}`)
            }
        }
    })
}