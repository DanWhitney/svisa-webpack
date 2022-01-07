import { agVisa } from "./ni_visa"

const VI_ERROR = 0x80000000
export enum ViOpenCompletionCode {
    VI_SUCCESS = 0, //Session to the Default Resource Manager resource created successfully.
    VI_SUCCESS_DEV_NPRESENT = 0x3FFF007D, // Session opened successfully, but the device at the specified address is not responding.
    VI_WARN_CONFIG_NLOADED = 0x3FFF0077, // The specified configuration either does not exist or could not be loaded using VISA-specified defaults.
    VI_WARN_SERVER_CERT_UNTRUSTED = 0x3FFF00F0, // A HiSLIP VISA client does not trust the server certificate.
}

export enum ViOpenErrorCode {
    VI_ERROR_ALLOC = VI_ERROR + 0x3FFF003C, // Insufficient system resources to open a session.
    VI_ERROR_INTF_NUM_NCONFIG = VI_ERROR + 0x3FFF00A5, // The interface type is valid but the specified interface number is not configured.
    VI_ERROR_INV_ACC_MODE = VI_ERROR + 0x3FFF0013, // Invalid access mode.
    VI_ERROR_INV_RSRC_NAME = VI_ERROR + 0x3FFF0012, // Invalid resource reference specified. Parsing error.
    VI_ERROR_INV_SESSION = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_OBJECT = VI_ERROR + 0x3FFF000E, // The given session or object reference is invalid (both are the same value).
    VI_ERROR_INV_PROT = VI_ERROR + 0x3FFF0079, // The resource descriptor specifies a secure connection, but the device or VISA implementation does not support secure connections, or security has been disabled on the device.
                      // or the address string indicates a secure connection should be made, but the designated port is not for a TLS server. 
    VI_ERROR_LIBRARY_NFOUND = VI_ERROR + 0x3FFF009E, // A code library required by VISA could not be located or loaded.
    VI_ERROR_NPERMISSION = VI_ERROR + 0x3FFF00A8, // A secure connection could not be created because the instrument refused the credentials proffered by VISA or the credential information could not be mapped to valid credentials. 
    VI_ERROR_NSUP_OPER = VI_ERROR + 0x3FFF0067, // The given sesn does not support this function. For VISA, this function is supported only by the Default Resource Manager session.
    VI_ERROR_RSRC_BUSY = VI_ERROR + 0x3FFF0072, // The resource is valid but VISA cannot currently access it.
    VI_ERROR_RSRC_LOCKED = VI_ERROR + 0x3FFF000F, // Specified type of lock cannot be obtained because the resource is already locked with a lock type incompatible with the lock requested.
    VI_ERROR_RSRC_NFOUND = VI_ERROR + 0x3FFF0011, // Insufficient location information or resource not present in the system.
    VI_ERROR_SERVER_CERT = VI_ERROR + 0x3FFF00B0, // A secure connection could not be created due to the instrument certificate being invalid or untrusted. 
    VI_ERROR_TMO = VI_ERROR + 0x3FFF0015, // A session to the resource could not be obtained within the specified timeout period.
}


export function viOpen(viSession: number, visa_resource: string, viAccessMode: number, timeout: number): Promise<{ status: number, session: number }> {
    return new Promise<{ status: number, session: number }>((resolve, reject) => {
        let status: number = VI_ERROR

        let bufferSession = Buffer.alloc(4) //u32

        status = agVisa.viOpen(viSession, visa_resource, viAccessMode, timeout, bufferSession as any)

        switch (status) {
            case ViOpenCompletionCode.VI_SUCCESS:
            case ViOpenCompletionCode.VI_SUCCESS_DEV_NPRESENT:
            case ViOpenCompletionCode.VI_WARN_CONFIG_NLOADED:
            case ViOpenCompletionCode.VI_WARN_SERVER_CERT_UNTRUSTED: {
                let session: number = bufferSession.readUInt32LE()
                resolve({ status: status, session: session })
            }
            default: {
                reject(`viOpen Error: status: ${status}`)
            }
        }
    })
}
