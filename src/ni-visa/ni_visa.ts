import { platform, arch } from 'os'
import { Library } from 'ffi-napi'
import { ViAccessMode, ViAttr, ViAttrState, ViEvent, ViEventFilter, ViEventType, ViFindList, ViObject, ViPAttrState, ViPBuf, ViPEvent, ViPEventType, ViPFindList, ViPJobId, ViPObject, ViPSession, ViPStatus, ViPUInt16, ViPUInt32, ViSession, ViStatus, ViUInt16, ViUInt32 } from './ni_visa_types'
import ref, { readInt64LE } from 'ref-napi';

import { NiVisaConstants } from './ni_visa_constants';
//import { ViAccessMode } from './ni_visa_constants';
// Choose the proper DLL name
// export const niVisa = (dllName: string) => {
// 	returnLibrary(dllName, {
// 		// Resource Manager Functions and Operations
// 		'viOpenDefaultRM': [ViStatus, [ViPSession]],
// 		'viFindRsrc': [ViStatus, [ViSession, 'string', ViPFindList, ViPUInt32, 'string']],
// 		'viFindNext': [ViStatus, [ViFindList, 'string']],
// 		'viParseRsrc': [ViStatus, [ViSession, 'string', ViPUInt16, ViPUInt16]],
// 		'viParseRsrcEx': [ViStatus, [ViSession, 'string', ViPUInt16, ViPUInt16, 'string', 'string', 'string']],
// 		'viOpen': [ViStatus, [ViSession, 'string', ViAccessMode, ViUInt32, ViPSession]],
// 		// Resource Template Operations
// 		'viClose': [ViStatus, [ViObject]],
// 		// Basic I/O Operations
// 		'viRead': [ViStatus, [ViSession, ViPBuf, ViUInt32, ViPUInt32]],
// 		'viReadToFile': [ViStatus, [ViSession, 'string', ViUInt32, ViPUInt32]],
// 		'viWrite': [ViStatus, [ViSession, 'string', ViUInt32, ViPUInt32]],
// 	})
// }
export const agVisa = Library('./agvisa32', {
	// Resource Manager Functions and Operations
	'viOpenDefaultRM': [ViStatus, [ViPSession]],
	'viFindRsrc': [ViStatus, [ViUInt32, 'string', ViPFindList, ViPUInt32, 'string']],
	'viFindNext': [ViStatus, [ViFindList, 'string']],
	'viParseRsrc': [ViStatus, [ViSession, 'string', ViPUInt16, ViPUInt16]],
	'viParseRsrcEx': [ViStatus, [ViSession, 'string', ViPUInt16, ViPUInt16, 'string', 'string', 'string']],
	'viOpen': [ViStatus, [ViSession, 'string', ViAccessMode, ViUInt32, ViPSession]],
	// Get and Set Attributes
	'viSetAttribute': [ViStatus,[ViSession, ViAttr, ViAttrState]],
	'viGetAttribute': [ViStatus,[ViSession, ViAttr, ViPAttrState]],
	// Resource Template Operations
	'viClose': [ViStatus, [ViObject]],
	// Basic I/O Operations`
	'viRead': [ViStatus, [ViSession, ViPBuf, ViUInt32, ViPUInt32]],
	'viReadToFile': [ViStatus, [ViSession, 'string', ViUInt32, ViPUInt32]],
	'viWrite': [ViStatus, [ViSession, 'string', ViUInt32, ViPUInt32]],
	// Async stuff
	'viReadAsync': [ViStatus, [ViSession, 'string', ViUInt32, ViPJobId]],
	'viWriteAsync': [ViStatus, [ViSession, 'string', ViUInt32, ViPJobId]],

	// Events
	'viEnableEvent': [ViStatus, [ViSession, ViEventType, ViUInt16, ViEventFilter]],
	'viDisableEvent': [ViStatus, [ViSession, ViEventType, ViUInt16]],
	'viWaitOnEvent': [ViStatus, [ViSession, ViEventType, ViUInt32, ViPEventType, ViPEvent]],


})

// export function viOpenDefaultRM(): { status: number, defaultRM: number } {

// 	let status: number = 1
// 	let pSesn = ref.alloc(ViPSession);
// 	status = agVisa.viOpenDefaultRM(pSesn)
// 	return { status: status, defaultRM: pSesn.readInt32LE() }
// }

// export function viOpen(viSession: number, visa_resource: string, viAccessMode: number, timeout: number): { status: number, viSession: number } {

// 	let p = ref.alloc(ViPSession);
// 	let status: number = 1
// 	status = agVisa.viOpen(viSession, visa_resource, viAccessMode, timeout, p)
// 	return { status: status, viSession: p.readInt32LE() }

// }

// s
// export function viRead(viSession: number, count: number): { status: number, retBuff: string, retCount: number } {

// 	let status: number = 1
// 	let buff = ref.alloc(ViPBuf);
// 	let retCount = ref.alloc(ViPUInt32);
// 	status = agVisa.viRead(viSession, buff, count, retCount)
// 	return {
// 		status: status,
// 		retBuff: buff.readCString().substring(0, retCount.readInt32LE()),
// 		retCount: retCount.readInt32LE()
// 	}
// }

// export function viClose(viObject: number): { status: number } {
// 	let status = agVisa.viClose(viObject)
// 	return { status: status }
// }

export function visaQuery(visaAddress: string, queryString: string, callback: (status: number, returnBuffer: string) => void) {

	console.log("hello")
	let queryStr = queryString + '\n';

	let status: number = 1
	let pSesn = ref.alloc(ViPSession);
	status = agVisa.viOpenDefaultRM(pSesn)

	if (status) return callback(status, "1");

	// open session to device

	let deviceSession = ref.alloc(ViPSession);
	status = agVisa.viOpen(pSesn.readInt32LE(), visaAddress, 0, 2000, deviceSession)

	if (status) return callback(status, "2");


	// write query to device
	let count = queryString.length
	let retCount = ref.alloc(ViPUInt32);
	status = agVisa.viWrite(deviceSession.readInt32LE(), queryString, count, retCount)

	if (status) return callback(status, "3");
	// read back query result


	let buff = ref.alloc(ViPBuf);
	retCount = ref.alloc(ViPUInt32);

	status = agVisa.viRead(deviceSession.readInt32LE(), buff, 512, retCount)
	let bufferSize = retCount.readInt32LE()
	let returnBuffer = buff.readCString().substring(0, retCount.readInt32LE())

	if (status) return callback(status, "4");
	// close session of device and resource manager
	agVisa.viClose(deviceSession.readInt32LE());
	agVisa.viClose(pSesn.readInt32LE());
	// return query result
	callback(status, returnBuffer);
}

export function visaAsyncQuery(visaAddress: string, queryString: string, callback: (status: number, returnBuffer: string) => void) {

	//console.log("hello")
	let queryStr = queryString + '\n';

	let status: number = 1
	let pSesn = ref.alloc(ViPSession);
	status = agVisa.viOpenDefaultRM(pSesn)

	if (status) return callback(status, "1");

	// open session to device

	let deviceSession = ref.alloc(ViPSession);
	status = agVisa.viOpen(pSesn.readInt32LE(), visaAddress, 0, 2000, deviceSession)

	if (status) return callback(status, "2");


	// write query to device
	let count = queryString.length
	let retCount = ref.alloc(ViPUInt32);
	// Enable the the event

	status = agVisa.viEnableEvent(deviceSession.readInt32LE(), NiVisaConstants.VI_EVENT_IO_COMPLETION, NiVisaConstants.VI_QUEUE, NiVisaConstants.VI_NULL)

	status = agVisa.viWrite(deviceSession.readInt32LE(), queryString, count, retCount)

	if (status) return callback(status, "3");
	// read back query result



	let buff = ref.alloc(ViPBuf);
	let jId = ref.alloc(ViPJobId);

	status = agVisa.viReadAsync(deviceSession.readInt32LE(), buff as any, 512, jId)

	let jobId = jId.readInt32LE()
	//console.log(`JobId: ${jobId}`)

	let eventType = ref.alloc(ViPEventType);
	let eventContext = ref.alloc(ViPEvent)

	status = agVisa.viWaitOnEvent(deviceSession.readInt32LE(), NiVisaConstants.VI_EVENT_IO_COMPLETION, 2000, eventType, eventContext)
	//

	//let returnBuffer = buff.readCString().substring(0,retCount.readInt32LE())

	//console.log(`Completed`)

	let eventPReturnedEventType = ref.alloc(ViPObject)
	let eventPJobId = ref.alloc(ViPJobId)
	let eventPReturnPStatus = ref.alloc(ViPStatus)
	let eventPReturnCount = ref.alloc(ViPUInt32)
	let eventPReturnedBuffer = ref.alloc(ViPBuf)

	status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_EVENT_TYPE, eventPReturnedEventType)
	let eventReturnedEventType = eventPReturnedEventType.readInt32LE()
	//console.log(`eventReturnedEventType: ${eventReturnedEventType}`)

	status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_JOB_ID, eventPJobId)
	let eventJobId = eventPJobId.readInt32LE()
	//console.log(`eventJobId: ${eventJobId}`)

	status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_STATUS, eventPReturnPStatus)
	let returnStatus = eventPReturnPStatus.readInt32LE()
	//console.log(`returnStatus: ${returnStatus}`)

	status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_RET_COUNT, eventPReturnCount)
	let eventReturnCount = eventPReturnCount.readInt32LE()
	//console.log(`eventReturnCount: ${eventReturnCount}`)

	status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_BUFFER, eventPReturnedBuffer)
	let ReturnBuffer = buff.readCString().substring(0, eventReturnCount)
	//console.log(`ReturnBuffer: ${ReturnBuffer}`)

	if (status) return callback(status, "4");
	// close session of device and resource manager
	agVisa.viClose(eventContext.readInt32LE());
	agVisa.viClose(deviceSession.readInt32LE());
	agVisa.viClose(pSesn.readInt32LE());
	// return query result
	callback(status, ReturnBuffer);
}

export function visaQueryToPromise(visaAddress: string, queryString: string,): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		//console.log("hello")
		let queryStr = queryString + '\n';

		let status: number = 1
		let pSesn = ref.alloc(ViPSession);
		status = agVisa.viOpenDefaultRM(pSesn)

		if (status) {
			reject(status)
		}

		// open session to device

		let deviceSession = ref.alloc(ViPSession);
		status = agVisa.viOpen(pSesn.readInt32LE(), visaAddress, 0, 2000, deviceSession)

		if (status) {
			reject(status)
		}

		// write query to device
		let count = queryString.length
		let retCount = ref.alloc(ViPUInt32);
		// Enable the the event

		status = agVisa.viEnableEvent(deviceSession.readInt32LE(), NiVisaConstants.VI_EVENT_IO_COMPLETION, NiVisaConstants.VI_QUEUE, NiVisaConstants.VI_NULL)

		status = agVisa.viWrite(deviceSession.readInt32LE(), queryString, count, retCount)

		if (status) {
			reject(status)
		}


		//let buff = ref.alloc(ViPBuf);
		let buff = new Buffer(512);
		let jId = ref.alloc(ViPJobId);

		status = agVisa.viReadAsync(deviceSession.readInt32LE(), buff as any, 512, jId)

		let jobId = jId.readInt32LE()
		//console.log(`JobId: ${jobId}`)

		let eventType = ref.alloc(ViPEventType);
		let eventContext = ref.alloc(ViPEvent)

		status = agVisa.viWaitOnEvent(deviceSession.readInt32LE(), NiVisaConstants.VI_EVENT_IO_COMPLETION, 2000, eventType, eventContext)
		//

		//let returnBuffer = buff.readCString().substring(0,retCount.readInt32LE())

		//console.log(`Completed`)

		let eventPReturnedEventType = ref.alloc(ViPObject)
		let eventPJobId = ref.alloc(ViPJobId)
		let eventPReturnPStatus = ref.alloc(ViPStatus)
		let eventPReturnCount = ref.alloc(ViPUInt32)
		let buffer = new Buffer(250)
		//let eventPReturnedBuffer = ref.ref(ViPBuf)

		status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_EVENT_TYPE, eventPReturnedEventType)
		let eventReturnedEventType = eventPReturnedEventType.readInt32LE()
		//console.log(`eventReturnedEventType: ${eventReturnedEventType}`)

		status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_JOB_ID, eventPJobId)
		let eventJobId = eventPJobId.readInt32LE()
		//console.log(`eventJobId: ${eventJobId}`)

		status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_STATUS, eventPReturnPStatus)
		let returnStatus = eventPReturnPStatus.readInt32LE()
		//console.log(`returnStatus: ${returnStatus}`)

		status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_RET_COUNT, eventPReturnCount)
		let eventReturnCount = eventPReturnCount.readInt32LE()
		//console.log(`eventReturnCount: ${eventReturnCount}`)

		//status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_BUFFER, buffer)
		let ReturnBuffer = buff.readCString()
		//console.log(`ReturnBuffer: ${ReturnBuffer}`)

		if (status) {
			reject(status)
		}
		// close session of device and resource manager
		agVisa.viClose(eventContext.readInt32LE());
		agVisa.viClose(deviceSession.readInt32LE());
		agVisa.viClose(pSesn.readInt32LE());
		// return query result
		resolve(ReturnBuffer);

	})
}