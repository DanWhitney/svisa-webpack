import { visaAsyncQuery, visaQuery, visaQueryToPromise } from './ni-visa/ni_visa'
import { viClose } from './ni-visa/vi_close';
import { viOpen } from './ni-visa/vi_open';
import { viOpenDefaultRM } from './ni-visa/vi_open_default_r_m';
import { viRead } from './ni-visa/vi_read';
import { viWrite } from './ni-visa/vi_write';


const testResponse = async () => {
    try {
        let session = 0
        const a = await viOpenDefaultRM()
        console.log(a)
        const b = await viOpen(a.defaultRM, 'USB0::0x05E6::0x2100::8004949::0::INSTR', 0, 5000)
        console.log(b)

        for (let i = 0; i < 1000; i++) {
            const c = await viWrite(b.session, '*IDN?\n')
            console.log(c)

            const d = await viRead(b.session, 512)
            console.log(d)
        }

        const y = await viClose(b.session)
        console.log(y)

        const z = await viClose(a.defaultRM)
        console.log(z)

    } catch (error) {
        console.log(error)
    }
}

const deviceResponce = "KEITHLEY INSTRUMENTS INC.,MODEL 2100,1,01.08-01-01"
let errorCount = 0;
const forLoop = async () => {


    for (let i = 0; i < 1000; i++) {
        try {
            let ret = await visaQueryToPromise('USB0::0x05E6::0x2100::8004949::0::INSTR', '*IDN?')
            if (deviceResponce !== ret) {
                errorCount++
            }
            console.log(`Test No.: ${i} Err. Count: ${errorCount} Responce: ${ret}`)
        } catch (error) {
            console.log(error)
        }
    }
}

//forLoop()

testResponse()