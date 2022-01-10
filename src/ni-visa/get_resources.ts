//import { visaAsyncQuery, visaQuery, visaQueryToPromise } from './ni-visa/ni_visa'
export { viClose } from './vi_close';
export { viOpen } from './vi_open';
export { viOpenDefaultRM } from './vi_open_default_r_m';
export { viRead } from './vi_read';
export { viWrite } from './vi_write';
import { NiVisaConstants } from './ni_visa_constants';
import { viClose } from './vi_close';
import { ViFindNext } from './vi_find_next';
import { ViFindRsrc } from './vi_find_rsrc';
import { viGetAttribute } from './vi_get_attribute';
import { viOpen } from './vi_open';
import { viOpenDefaultRM } from './vi_open_default_r_m';

export type ResourceList = {resourceName: string, present: boolean}

export const getResources = async ():Promise<ResourceList[]> => {
    return new Promise<ResourceList[]> (async (resolve, reject) => {
        let viResources = []
    let viResources_with_present = []
    try {
        // open default session
        let defaultRM = await viOpenDefaultRM()
        //console.log(defaultRM)

        let attr = await viGetAttribute(defaultRM.defaultRM,NiVisaConstants.VI_KTATTR_RETURN_ALL)
        //console.log(attr)

        // get the list of equipment seen by pc
        let findList = await ViFindRsrc(defaultRM.defaultRM, "?*")
        // console.log(findList)
        viResources.push(findList.instrDesc)
        // loop through list of resource collection the resource name
        for (let i = 0; i < findList.retcnt -1; i++) {
            let next = await ViFindNext(findList.findList)
            viResources.push(next.instrDesc)
        }

        // verify the resources are present
        for (let i = 0; i < viResources.length; i++) {
            // console.log(`attempting to open ${viResources[i]}`)
            // attempting to open  
            let openAttempt = await viOpen(defaultRM.defaultRM,viResources[i],NiVisaConstants.VI_NULL,NiVisaConstants.VI_NULL)            
            if (openAttempt.status == 0) {
                viResources_with_present.push({resourceName: viResources[i], present: true})
                viClose(openAttempt.session)
            } else {
                viResources_with_present.push({resourceName: viResources[i], present: false})
            }
        }
        viClose(defaultRM.defaultRM)
        resolve(viResources_with_present)
        
    } catch (err) {
        reject (err)
    }
    })
}