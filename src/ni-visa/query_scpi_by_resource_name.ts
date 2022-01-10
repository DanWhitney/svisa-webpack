import { NiVisaConstants } from "./ni_visa_constants"
import { viClose } from "./vi_close"
import { viOpen } from "./vi_open"
import { viOpenDefaultRM } from "./vi_open_default_r_m"
import { viRead } from "./vi_read"
import { viWrite } from "./vi_write"


type ViQueryStatus = {
    status: Number
    write: String
    read: String
}

const queryScpiByResourceName = async (ResourceName: string, Scpi: string):Promise<ViQueryStatus> => {
    return new Promise<ViQueryStatus>(async (resolve,reject) => {

        const a = await viOpenDefaultRM()
        console.log(a)
        const b = await viOpen(a.defaultRM, ResourceName, NiVisaConstants.VI_NULL, NiVisaConstants.VI_NULL)
        console.log(b)

        const c = await viWrite(b.session, `${Scpi}\n`)
        console.log(c)

        const d = await viRead(b.session, 512)
        console.log(d)
    

        const y = await viClose(b.session)
        console.log(y)

        const z = await viClose(a.defaultRM)
        console.log(z)

        resolve({status: 0, write: Scpi, read: d.buf})
    })
}