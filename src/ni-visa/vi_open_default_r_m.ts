import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000
export enum ViOpenDefaultRMCompletionCode {
    VI_SUCCESS = 0 //Session to the Default Resource Manager resource created successfully.
}

export enum ViOpenDefaultRMErrorCode {
    VI_ERROR_ALLOC = VI_ERROR + 0x3FFF003C, // Insufficient system resources to create a session to the Default Resource Manager resource.
    VI_ERROR_INV_SETUP = VI_ERROR + 0x3FFF003A, // Some implementation-specific configuration file is corrupt or does not exist.
    VI_ERROR_SYSTEM_ERROR = VI_ERROR + 0x3FFF0000, //The VISA system failed to initialize.
}

export function viOpenDefaultRM(): Promise<{ status: number, defaultRM: number }> {
    return new Promise<{ status: number, defaultRM: number }>((resolve, reject) => {
        let status: number = VI_ERROR
        // allocate a buffer for the session response
        let buffer = Buffer.alloc(4)

        status = agVisa.viOpenDefaultRM(buffer as any)

        if (status === ViOpenDefaultRMCompletionCode.VI_SUCCESS) {
            let session: number = buffer.readUInt32LE()
            resolve({ status: status, defaultRM: session })
        }
        else {
            reject(`viOpenDefaultRM Error: status: ${status}`)
        }
    })
}