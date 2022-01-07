import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000

export enum ViReadCompletionCode {
    VI_SUCCESS = 0, //Session to the Default Resource Manager resource created successfully.
    VI_SUCCESS_TERM_CHAR = 0x3FFF0005,// The specified termination character was read.
    VI_SUCCESS_MAX_CNT = 0x3FFF0006,// The number of bytes read is equal to count.


}

export enum ViReadErrorCode {
    VI_ERROR_ASRL_FRAMING = VI_ERROR + 0x3FFF006B, // A framing error occurred during transfer.
    VI_ERROR_ASRL_OVERRUN = VI_ERROR + 0x3FFF006C, // An overrun error occurred during transfer. A character was not read from the hardware before the next character arrived.
    VI_ERROR_ASRL_PARITY = VI_ERROR + 0x3FFF006A, // A parity error occurred during transfer.
    VI_ERROR_BERR = VI_ERROR + 0x3FFF0038, // Bus error occurred during transfer.
    VI_ERROR_CONN_LOST = VI_ERROR + 0x3FFF00A6,  // The I/O connection for the given session has been lost.
    VI_ERROR_INV_SESSION = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_OBJECT = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_SETUP = VI_ERROR + 0x3FFF003A, // Unable to start write function because setup is invalid (due to attributes being set to an inconsistent state).
    VI_ERROR_IO = VI_ERROR + 0x3FFF003E, // Unknown I/O error occurred during transfer.
    VI_ERROR_NCIC = VI_ERROR + 0x3FFF0060, // The interface associated with the given vi is not currently the controller in charge.
    VI_ERROR_NLISTENERS = VI_ERROR + 0x3FFF005F, // No Listeners condition is detected (both NRFD and NDAC are de-asserted).
    VI_ERROR_NSUP_OPER = VI_ERROR + 0x3FFF0067, // The given vi does not support this function.
    VI_ERROR_OUTP_PROT_VIOL = VI_ERROR + 0x3FFF0036, //  Device reported an output protocol error occurred during transfer.
    VI_ERROR_RAW_RD_PROT_VIOL = VI_ERROR + 0x3FFF0035, // Violation of raw read protocol occurred during transfer.
    VI_ERROR_RAW_WR_PROT_VIOL = VI_ERROR + 0x3FFF0034, // Violation of raw write protocol occurred during transfer.
    VI_ERROR_RSRC_LOCKED = VI_ERROR + 0x3FFF000F, // Specified operation could not be performed because the resource identified by vi has been locked for this kind of access.
    VI_ERROR_TMO = VI_ERROR + 0x3FFF0015, // A session to the resource could not be obtained within the specified timeout period.
}


export function viRead(viSession: number, count:number ): Promise<{ status: number, retCount: number, buf:string }> {
    return new Promise<{ status: number, retCount: number, buf: string }>((resolve, reject) => {
        let status: number = VI_ERROR

        let bufferRetCount = Buffer.alloc(4) //u32
        let bufferBuf = Buffer.alloc(count) //u32

        status = agVisa.viRead(viSession, bufferBuf as any, count, bufferRetCount as any)

        switch (status) {
            case ViReadCompletionCode.VI_SUCCESS:
            case ViReadCompletionCode.VI_SUCCESS_MAX_CNT:
            case ViReadCompletionCode.VI_SUCCESS_TERM_CHAR: {
                let retCount: number = bufferRetCount.readUInt32LE()
                let buf: string = bufferBuf.readCString()
                resolve({ status: status, retCount: retCount, buf: buf  })
            }
            default: {
                reject(`viRead Error: status: ${status}`)
            }
        }
    })
}