/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ni_visa_1 = __webpack_require__(/*! ./ni-visa/ni_visa */ "./src/ni-visa/ni_visa.ts");
const vi_close_1 = __webpack_require__(/*! ./ni-visa/vi_close */ "./src/ni-visa/vi_close.ts");
const vi_open_1 = __webpack_require__(/*! ./ni-visa/vi_open */ "./src/ni-visa/vi_open.ts");
const vi_open_default_r_m_1 = __webpack_require__(/*! ./ni-visa/vi_open_default_r_m */ "./src/ni-visa/vi_open_default_r_m.ts");
const vi_read_1 = __webpack_require__(/*! ./ni-visa/vi_read */ "./src/ni-visa/vi_read.ts");
const vi_write_1 = __webpack_require__(/*! ./ni-visa/vi_write */ "./src/ni-visa/vi_write.ts");
const testResponse = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let session = 0;
        const a = yield (0, vi_open_default_r_m_1.viOpenDefaultRM)();
        console.log(a);
        const b = yield (0, vi_open_1.viOpen)(a.defaultRM, 'USB0::0x05E6::0x2100::8004949::0::INSTR', 0, 5000);
        console.log(b);
        for (let i = 0; i < 1000; i++) {
            const c = yield (0, vi_write_1.viWrite)(b.session, '*IDN?\n');
            console.log(c);
            const d = yield (0, vi_read_1.viRead)(b.session, 512);
            console.log(d);
        }
        const y = yield (0, vi_close_1.viClose)(b.session);
        console.log(y);
        const z = yield (0, vi_close_1.viClose)(a.defaultRM);
        console.log(z);
    }
    catch (error) {
        console.log(error);
    }
});
const deviceResponce = "KEITHLEY INSTRUMENTS INC.,MODEL 2100,1,01.08-01-01";
let errorCount = 0;
const forLoop = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 1000; i++) {
        try {
            let ret = yield (0, ni_visa_1.visaQueryToPromise)('USB0::0x05E6::0x2100::8004949::0::INSTR', '*IDN?');
            if (deviceResponce !== ret) {
                errorCount++;
            }
            console.log(`Test No.: ${i} Err. Count: ${errorCount} Responce: ${ret}`);
        }
        catch (error) {
            console.log(error);
        }
    }
});
//forLoop()
testResponse();


/***/ }),

/***/ "./src/ni-visa/ni_visa.ts":
/*!********************************!*\
  !*** ./src/ni-visa/ni_visa.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.visaQueryToPromise = exports.visaAsyncQuery = exports.visaQuery = exports.viRead = exports.agVisa = void 0;
const ffi_napi_1 = __webpack_require__(/*! ffi-napi */ "ffi-napi");
const ni_visa_types_1 = __webpack_require__(/*! ./ni_visa_types */ "./src/ni-visa/ni_visa_types.ts");
const ref_napi_1 = __importDefault(__webpack_require__(/*! ref-napi */ "ref-napi"));
const ni_visa_constants_1 = __webpack_require__(/*! ./ni_visa_constants */ "./src/ni-visa/ni_visa_constants.ts");
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
exports.agVisa = (0, ffi_napi_1.Library)('./agvisa32', {
    // Resource Manager Functions and Operations
    'viOpenDefaultRM': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViPSession]],
    'viFindRsrc': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViUInt32, 'string', ni_visa_types_1.ViPFindList, ni_visa_types_1.ViPUInt32, 'string']],
    'viFindNext': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViFindList, 'string']],
    'viParseRsrc': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, 'string', ni_visa_types_1.ViPUInt16, ni_visa_types_1.ViPUInt16]],
    'viParseRsrcEx': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, 'string', ni_visa_types_1.ViPUInt16, ni_visa_types_1.ViPUInt16, 'string', 'string', 'string']],
    'viOpen': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, 'string', ni_visa_types_1.ViAccessMode, ni_visa_types_1.ViUInt32, ni_visa_types_1.ViPSession]],
    // Resource Template Operations
    'viClose': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViObject]],
    // Basic I/O Operations`
    'viRead': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, ni_visa_types_1.ViPBuf, ni_visa_types_1.ViUInt32, ni_visa_types_1.ViPUInt32]],
    'viReadToFile': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, 'string', ni_visa_types_1.ViUInt32, ni_visa_types_1.ViPUInt32]],
    'viWrite': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, 'string', ni_visa_types_1.ViUInt32, ni_visa_types_1.ViPUInt32]],
    // Async stuff
    'viReadAsync': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, 'string', ni_visa_types_1.ViUInt32, ni_visa_types_1.ViPJobId]],
    'viWriteAsync': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, 'string', ni_visa_types_1.ViUInt32, ni_visa_types_1.ViPJobId]],
    // Events
    'viEnableEvent': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, ni_visa_types_1.ViEventType, ni_visa_types_1.ViUInt16, ni_visa_types_1.ViEventFilter]],
    'viDisableEvent': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, ni_visa_types_1.ViEventType, ni_visa_types_1.ViUInt16]],
    'viWaitOnEvent': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, ni_visa_types_1.ViEventType, ni_visa_types_1.ViUInt32, ni_visa_types_1.ViPEventType, ni_visa_types_1.ViPEvent]],
    'viGetAttribute': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViEvent, ni_visa_types_1.ViAttr, ni_visa_types_1.ViPObject]]
});
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
function viRead(viSession, count) {
    let status = 1;
    let buff = ref_napi_1.default.alloc(ni_visa_types_1.ViPBuf);
    let retCount = ref_napi_1.default.alloc(ni_visa_types_1.ViPUInt32);
    status = exports.agVisa.viRead(viSession, buff, count, retCount);
    return {
        status: status,
        retBuff: buff.readCString().substring(0, retCount.readInt32LE()),
        retCount: retCount.readInt32LE()
    };
}
exports.viRead = viRead;
// export function viClose(viObject: number): { status: number } {
// 	let status = agVisa.viClose(viObject)
// 	return { status: status }
// }
function visaQuery(visaAddress, queryString, callback) {
    console.log("hello");
    let queryStr = queryString + '\n';
    let status = 1;
    let pSesn = ref_napi_1.default.alloc(ni_visa_types_1.ViPSession);
    status = exports.agVisa.viOpenDefaultRM(pSesn);
    if (status)
        return callback(status, "1");
    // open session to device
    let deviceSession = ref_napi_1.default.alloc(ni_visa_types_1.ViPSession);
    status = exports.agVisa.viOpen(pSesn.readInt32LE(), visaAddress, 0, 2000, deviceSession);
    if (status)
        return callback(status, "2");
    // write query to device
    let count = queryString.length;
    let retCount = ref_napi_1.default.alloc(ni_visa_types_1.ViPUInt32);
    status = exports.agVisa.viWrite(deviceSession.readInt32LE(), queryString, count, retCount);
    if (status)
        return callback(status, "3");
    // read back query result
    let buff = ref_napi_1.default.alloc(ni_visa_types_1.ViPBuf);
    retCount = ref_napi_1.default.alloc(ni_visa_types_1.ViPUInt32);
    status = exports.agVisa.viRead(deviceSession.readInt32LE(), buff, 512, retCount);
    let bufferSize = retCount.readInt32LE();
    let returnBuffer = buff.readCString().substring(0, retCount.readInt32LE());
    if (status)
        return callback(status, "4");
    // close session of device and resource manager
    exports.agVisa.viClose(deviceSession.readInt32LE());
    exports.agVisa.viClose(pSesn.readInt32LE());
    // return query result
    callback(status, returnBuffer);
}
exports.visaQuery = visaQuery;
function visaAsyncQuery(visaAddress, queryString, callback) {
    //console.log("hello")
    let queryStr = queryString + '\n';
    let status = 1;
    let pSesn = ref_napi_1.default.alloc(ni_visa_types_1.ViPSession);
    status = exports.agVisa.viOpenDefaultRM(pSesn);
    if (status)
        return callback(status, "1");
    // open session to device
    let deviceSession = ref_napi_1.default.alloc(ni_visa_types_1.ViPSession);
    status = exports.agVisa.viOpen(pSesn.readInt32LE(), visaAddress, 0, 2000, deviceSession);
    if (status)
        return callback(status, "2");
    // write query to device
    let count = queryString.length;
    let retCount = ref_napi_1.default.alloc(ni_visa_types_1.ViPUInt32);
    // Enable the the event
    status = exports.agVisa.viEnableEvent(deviceSession.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_EVENT_IO_COMPLETION, ni_visa_constants_1.NiVisaConstants.VI_QUEUE, ni_visa_constants_1.NiVisaConstants.VI_NULL);
    status = exports.agVisa.viWrite(deviceSession.readInt32LE(), queryString, count, retCount);
    if (status)
        return callback(status, "3");
    // read back query result
    let buff = ref_napi_1.default.alloc(ni_visa_types_1.ViPBuf);
    let jId = ref_napi_1.default.alloc(ni_visa_types_1.ViPJobId);
    status = exports.agVisa.viReadAsync(deviceSession.readInt32LE(), buff, 512, jId);
    let jobId = jId.readInt32LE();
    //console.log(`JobId: ${jobId}`)
    let eventType = ref_napi_1.default.alloc(ni_visa_types_1.ViPEventType);
    let eventContext = ref_napi_1.default.alloc(ni_visa_types_1.ViPEvent);
    status = exports.agVisa.viWaitOnEvent(deviceSession.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_EVENT_IO_COMPLETION, 2000, eventType, eventContext);
    //
    //let returnBuffer = buff.readCString().substring(0,retCount.readInt32LE())
    //console.log(`Completed`)
    let eventPReturnedEventType = ref_napi_1.default.alloc(ni_visa_types_1.ViPObject);
    let eventPJobId = ref_napi_1.default.alloc(ni_visa_types_1.ViPJobId);
    let eventPReturnPStatus = ref_napi_1.default.alloc(ni_visa_types_1.ViPStatus);
    let eventPReturnCount = ref_napi_1.default.alloc(ni_visa_types_1.ViPUInt32);
    let eventPReturnedBuffer = ref_napi_1.default.alloc(ni_visa_types_1.ViPBuf);
    status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_EVENT_TYPE, eventPReturnedEventType);
    let eventReturnedEventType = eventPReturnedEventType.readInt32LE();
    //console.log(`eventReturnedEventType: ${eventReturnedEventType}`)
    status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_JOB_ID, eventPJobId);
    let eventJobId = eventPJobId.readInt32LE();
    //console.log(`eventJobId: ${eventJobId}`)
    status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_STATUS, eventPReturnPStatus);
    let returnStatus = eventPReturnPStatus.readInt32LE();
    //console.log(`returnStatus: ${returnStatus}`)
    status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_RET_COUNT, eventPReturnCount);
    let eventReturnCount = eventPReturnCount.readInt32LE();
    //console.log(`eventReturnCount: ${eventReturnCount}`)
    status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_BUFFER, eventPReturnedBuffer);
    let ReturnBuffer = buff.readCString().substring(0, eventReturnCount);
    //console.log(`ReturnBuffer: ${ReturnBuffer}`)
    if (status)
        return callback(status, "4");
    // close session of device and resource manager
    exports.agVisa.viClose(eventContext.readInt32LE());
    exports.agVisa.viClose(deviceSession.readInt32LE());
    exports.agVisa.viClose(pSesn.readInt32LE());
    // return query result
    callback(status, ReturnBuffer);
}
exports.visaAsyncQuery = visaAsyncQuery;
function visaQueryToPromise(visaAddress, queryString) {
    return new Promise((resolve, reject) => {
        //console.log("hello")
        let queryStr = queryString + '\n';
        let status = 1;
        let pSesn = ref_napi_1.default.alloc(ni_visa_types_1.ViPSession);
        status = exports.agVisa.viOpenDefaultRM(pSesn);
        if (status) {
            reject(status);
        }
        // open session to device
        let deviceSession = ref_napi_1.default.alloc(ni_visa_types_1.ViPSession);
        status = exports.agVisa.viOpen(pSesn.readInt32LE(), visaAddress, 0, 2000, deviceSession);
        if (status) {
            reject(status);
        }
        // write query to device
        let count = queryString.length;
        let retCount = ref_napi_1.default.alloc(ni_visa_types_1.ViPUInt32);
        // Enable the the event
        status = exports.agVisa.viEnableEvent(deviceSession.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_EVENT_IO_COMPLETION, ni_visa_constants_1.NiVisaConstants.VI_QUEUE, ni_visa_constants_1.NiVisaConstants.VI_NULL);
        status = exports.agVisa.viWrite(deviceSession.readInt32LE(), queryString, count, retCount);
        if (status) {
            reject(status);
        }
        //let buff = ref.alloc(ViPBuf);
        let buff = new Buffer(512);
        let jId = ref_napi_1.default.alloc(ni_visa_types_1.ViPJobId);
        status = exports.agVisa.viReadAsync(deviceSession.readInt32LE(), buff, 512, jId);
        let jobId = jId.readInt32LE();
        //console.log(`JobId: ${jobId}`)
        let eventType = ref_napi_1.default.alloc(ni_visa_types_1.ViPEventType);
        let eventContext = ref_napi_1.default.alloc(ni_visa_types_1.ViPEvent);
        status = exports.agVisa.viWaitOnEvent(deviceSession.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_EVENT_IO_COMPLETION, 2000, eventType, eventContext);
        //
        //let returnBuffer = buff.readCString().substring(0,retCount.readInt32LE())
        //console.log(`Completed`)
        let eventPReturnedEventType = ref_napi_1.default.alloc(ni_visa_types_1.ViPObject);
        let eventPJobId = ref_napi_1.default.alloc(ni_visa_types_1.ViPJobId);
        let eventPReturnPStatus = ref_napi_1.default.alloc(ni_visa_types_1.ViPStatus);
        let eventPReturnCount = ref_napi_1.default.alloc(ni_visa_types_1.ViPUInt32);
        let buffer = new Buffer(250);
        //let eventPReturnedBuffer = ref.ref(ViPBuf)
        status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_EVENT_TYPE, eventPReturnedEventType);
        let eventReturnedEventType = eventPReturnedEventType.readInt32LE();
        //console.log(`eventReturnedEventType: ${eventReturnedEventType}`)
        status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_JOB_ID, eventPJobId);
        let eventJobId = eventPJobId.readInt32LE();
        //console.log(`eventJobId: ${eventJobId}`)
        status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_STATUS, eventPReturnPStatus);
        let returnStatus = eventPReturnPStatus.readInt32LE();
        //console.log(`returnStatus: ${returnStatus}`)
        status = exports.agVisa.viGetAttribute(eventContext.readInt32LE(), ni_visa_constants_1.NiVisaConstants.VI_ATTR_RET_COUNT, eventPReturnCount);
        let eventReturnCount = eventPReturnCount.readInt32LE();
        //console.log(`eventReturnCount: ${eventReturnCount}`)
        //status = agVisa.viGetAttribute(eventContext.readInt32LE(), NiVisaConstants.VI_ATTR_BUFFER, buffer)
        let ReturnBuffer = buff.readCString();
        //console.log(`ReturnBuffer: ${ReturnBuffer}`)
        if (status) {
            reject(status);
        }
        // close session of device and resource manager
        exports.agVisa.viClose(eventContext.readInt32LE());
        exports.agVisa.viClose(deviceSession.readInt32LE());
        exports.agVisa.viClose(pSesn.readInt32LE());
        // return query result
        resolve(ReturnBuffer);
    });
}
exports.visaQueryToPromise = visaQueryToPromise;


/***/ }),

/***/ "./src/ni-visa/ni_visa_constants.ts":
/*!******************************************!*\
  !*** ./src/ni-visa/ni_visa_constants.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NiVisaConstants = exports.ViAccessMode = void 0;
var ViAccessMode;
(function (ViAccessMode) {
    ViAccessMode[ViAccessMode["VI_NO_LOCK"] = 0] = "VI_NO_LOCK";
    ViAccessMode[ViAccessMode["VI_EXCLUSIVE_LOCK"] = 1] = "VI_EXCLUSIVE_LOCK";
    ViAccessMode[ViAccessMode["VI_SHARED_LOCK"] = 2] = "VI_SHARED_LOCK";
})(ViAccessMode = exports.ViAccessMode || (exports.ViAccessMode = {}));
var NiVisaConstants;
(function (NiVisaConstants) {
    NiVisaConstants[NiVisaConstants["VI_NULL"] = 0] = "VI_NULL";
    NiVisaConstants[NiVisaConstants["VI_ERROR"] = 2147483648] = "VI_ERROR";
    NiVisaConstants[NiVisaConstants["VI_SPEC_VERSION"] = 5244928] = "VI_SPEC_VERSION";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RSRC_CLASS"] = 3221159937] = "VI_ATTR_RSRC_CLASS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RSRC_NAME"] = 3221159938] = "VI_ATTR_RSRC_NAME";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RSRC_IMPL_VERSION"] = 1073676291] = "VI_ATTR_RSRC_IMPL_VERSION";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RSRC_LOCK_STATE"] = 1073676292] = "VI_ATTR_RSRC_LOCK_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MAX_QUEUE_LENGTH"] = 1073676293] = "VI_ATTR_MAX_QUEUE_LENGTH";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USER_DATA_32"] = 1073676295] = "VI_ATTR_USER_DATA_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FDC_CHNL"] = 1073676301] = "VI_ATTR_FDC_CHNL";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FDC_MODE"] = 1073676303] = "VI_ATTR_FDC_MODE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FDC_GEN_SIGNAL_EN"] = 1073676305] = "VI_ATTR_FDC_GEN_SIGNAL_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FDC_USE_PAIR"] = 1073676307] = "VI_ATTR_FDC_USE_PAIR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_SEND_END_EN"] = 1073676310] = "VI_ATTR_SEND_END_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TERMCHAR"] = 1073676312] = "VI_ATTR_TERMCHAR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TMO_VALUE"] = 1073676314] = "VI_ATTR_TMO_VALUE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_READDR_EN"] = 1073676315] = "VI_ATTR_GPIB_READDR_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_IO_PROT"] = 1073676316] = "VI_ATTR_IO_PROT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_DMA_ALLOW_EN"] = 1073676318] = "VI_ATTR_DMA_ALLOW_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_BAUD"] = 1073676321] = "VI_ATTR_ASRL_BAUD";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_DATA_BITS"] = 1073676322] = "VI_ATTR_ASRL_DATA_BITS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_PARITY"] = 1073676323] = "VI_ATTR_ASRL_PARITY";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_STOP_BITS"] = 1073676324] = "VI_ATTR_ASRL_STOP_BITS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_FLOW_CNTRL"] = 1073676325] = "VI_ATTR_ASRL_FLOW_CNTRL";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RD_BUF_OPER_MODE"] = 1073676330] = "VI_ATTR_RD_BUF_OPER_MODE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RD_BUF_SIZE"] = 1073676331] = "VI_ATTR_RD_BUF_SIZE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_WR_BUF_OPER_MODE"] = 1073676333] = "VI_ATTR_WR_BUF_OPER_MODE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_WR_BUF_SIZE"] = 1073676334] = "VI_ATTR_WR_BUF_SIZE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_SUPPRESS_END_EN"] = 1073676342] = "VI_ATTR_SUPPRESS_END_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TERMCHAR_EN"] = 1073676344] = "VI_ATTR_TERMCHAR_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_DEST_ACCESS_PRIV"] = 1073676345] = "VI_ATTR_DEST_ACCESS_PRIV";
    NiVisaConstants[NiVisaConstants["VI_ATTR_DEST_BYTE_ORDER"] = 1073676346] = "VI_ATTR_DEST_BYTE_ORDER";
    NiVisaConstants[NiVisaConstants["VI_ATTR_SRC_ACCESS_PRIV"] = 1073676348] = "VI_ATTR_SRC_ACCESS_PRIV";
    NiVisaConstants[NiVisaConstants["VI_ATTR_SRC_BYTE_ORDER"] = 1073676349] = "VI_ATTR_SRC_BYTE_ORDER";
    NiVisaConstants[NiVisaConstants["VI_ATTR_SRC_INCREMENT"] = 1073676352] = "VI_ATTR_SRC_INCREMENT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_DEST_INCREMENT"] = 1073676353] = "VI_ATTR_DEST_INCREMENT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_WIN_ACCESS_PRIV"] = 1073676357] = "VI_ATTR_WIN_ACCESS_PRIV";
    NiVisaConstants[NiVisaConstants["VI_ATTR_WIN_BYTE_ORDER"] = 1073676359] = "VI_ATTR_WIN_BYTE_ORDER";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_ATN_STATE"] = 1073676375] = "VI_ATTR_GPIB_ATN_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_ADDR_STATE"] = 1073676380] = "VI_ATTR_GPIB_ADDR_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_CIC_STATE"] = 1073676382] = "VI_ATTR_GPIB_CIC_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_NDAC_STATE"] = 1073676386] = "VI_ATTR_GPIB_NDAC_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_SRQ_STATE"] = 1073676391] = "VI_ATTR_GPIB_SRQ_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_SYS_CNTRL_STATE"] = 1073676392] = "VI_ATTR_GPIB_SYS_CNTRL_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_HS488_CBL_LEN"] = 1073676393] = "VI_ATTR_GPIB_HS488_CBL_LEN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_CMDR_LA"] = 1073676395] = "VI_ATTR_CMDR_LA";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_DEV_CLASS"] = 1073676396] = "VI_ATTR_VXI_DEV_CLASS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MAINFRAME_LA"] = 1073676400] = "VI_ATTR_MAINFRAME_LA";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MANF_NAME"] = 3221160050] = "VI_ATTR_MANF_NAME";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MODEL_NAME"] = 3221160055] = "VI_ATTR_MODEL_NAME";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_VME_INTR_STATUS"] = 1073676427] = "VI_ATTR_VXI_VME_INTR_STATUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_TRIG_STATUS"] = 1073676429] = "VI_ATTR_VXI_TRIG_STATUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_VME_SYSFAIL_STATE"] = 1073676436] = "VI_ATTR_VXI_VME_SYSFAIL_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_WIN_BASE_ADDR_32"] = 1073676440] = "VI_ATTR_WIN_BASE_ADDR_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_WIN_SIZE_32"] = 1073676442] = "VI_ATTR_WIN_SIZE_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_AVAIL_NUM"] = 1073676460] = "VI_ATTR_ASRL_AVAIL_NUM";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MEM_BASE_32"] = 1073676461] = "VI_ATTR_MEM_BASE_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_CTS_STATE"] = 1073676462] = "VI_ATTR_ASRL_CTS_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_DCD_STATE"] = 1073676463] = "VI_ATTR_ASRL_DCD_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_DSR_STATE"] = 1073676465] = "VI_ATTR_ASRL_DSR_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_DTR_STATE"] = 1073676466] = "VI_ATTR_ASRL_DTR_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_END_IN"] = 1073676467] = "VI_ATTR_ASRL_END_IN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_END_OUT"] = 1073676468] = "VI_ATTR_ASRL_END_OUT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_REPLACE_CHAR"] = 1073676478] = "VI_ATTR_ASRL_REPLACE_CHAR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_RI_STATE"] = 1073676479] = "VI_ATTR_ASRL_RI_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_RTS_STATE"] = 1073676480] = "VI_ATTR_ASRL_RTS_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_XON_CHAR"] = 1073676481] = "VI_ATTR_ASRL_XON_CHAR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_XOFF_CHAR"] = 1073676482] = "VI_ATTR_ASRL_XOFF_CHAR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_WIN_ACCESS"] = 1073676483] = "VI_ATTR_WIN_ACCESS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RM_SESSION"] = 1073676484] = "VI_ATTR_RM_SESSION";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_LA"] = 1073676501] = "VI_ATTR_VXI_LA";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MANF_ID"] = 1073676505] = "VI_ATTR_MANF_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MEM_SIZE_32"] = 1073676509] = "VI_ATTR_MEM_SIZE_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MEM_SPACE"] = 1073676510] = "VI_ATTR_MEM_SPACE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_MODEL_CODE"] = 1073676511] = "VI_ATTR_MODEL_CODE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_SLOT"] = 1073676520] = "VI_ATTR_SLOT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_INTF_INST_NAME"] = 3221160169] = "VI_ATTR_INTF_INST_NAME";
    NiVisaConstants[NiVisaConstants["VI_ATTR_IMMEDIATE_SERV"] = 1073676544] = "VI_ATTR_IMMEDIATE_SERV";
    NiVisaConstants[NiVisaConstants["VI_ATTR_INTF_PARENT_NUM"] = 1073676545] = "VI_ATTR_INTF_PARENT_NUM";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RSRC_SPEC_VERSION"] = 1073676656] = "VI_ATTR_RSRC_SPEC_VERSION";
    NiVisaConstants[NiVisaConstants["VI_ATTR_INTF_TYPE"] = 1073676657] = "VI_ATTR_INTF_TYPE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_PRIMARY_ADDR"] = 1073676658] = "VI_ATTR_GPIB_PRIMARY_ADDR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_SECONDARY_ADDR"] = 1073676659] = "VI_ATTR_GPIB_SECONDARY_ADDR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RSRC_MANF_NAME"] = 3221160308] = "VI_ATTR_RSRC_MANF_NAME";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RSRC_MANF_ID"] = 1073676661] = "VI_ATTR_RSRC_MANF_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_INTF_NUM"] = 1073676662] = "VI_ATTR_INTF_NUM";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TRIG_ID"] = 1073676663] = "VI_ATTR_TRIG_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_REN_STATE"] = 1073676673] = "VI_ATTR_GPIB_REN_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_UNADDR_EN"] = 1073676676] = "VI_ATTR_GPIB_UNADDR_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_DEV_STATUS_BYTE"] = 1073676681] = "VI_ATTR_DEV_STATUS_BYTE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FILE_APPEND_EN"] = 1073676690] = "VI_ATTR_FILE_APPEND_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_TRIG_SUPPORT"] = 1073676692] = "VI_ATTR_VXI_TRIG_SUPPORT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_ADDR"] = 3221160341] = "VI_ATTR_TCPIP_ADDR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_HOSTNAME"] = 3221160342] = "VI_ATTR_TCPIP_HOSTNAME";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_PORT"] = 1073676695] = "VI_ATTR_TCPIP_PORT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_DEVICE_NAME"] = 3221160345] = "VI_ATTR_TCPIP_DEVICE_NAME";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_NODELAY"] = 1073676698] = "VI_ATTR_TCPIP_NODELAY";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_KEEPALIVE"] = 1073676699] = "VI_ATTR_TCPIP_KEEPALIVE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_4882_COMPLIANT"] = 1073676703] = "VI_ATTR_4882_COMPLIANT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_SERIAL_NUM"] = 3221160352] = "VI_ATTR_USB_SERIAL_NUM";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_INTFC_NUM"] = 1073676705] = "VI_ATTR_USB_INTFC_NUM";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_PROTOCOL"] = 1073676711] = "VI_ATTR_USB_PROTOCOL";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_MAX_INTR_SIZE"] = 1073676719] = "VI_ATTR_USB_MAX_INTR_SIZE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_DEV_NUM"] = 1073676801] = "VI_ATTR_PXI_DEV_NUM";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_FUNC_NUM"] = 1073676802] = "VI_ATTR_PXI_FUNC_NUM";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_BUS_NUM"] = 1073676805] = "VI_ATTR_PXI_BUS_NUM";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_CHASSIS"] = 1073676806] = "VI_ATTR_PXI_CHASSIS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_SLOTPATH"] = 3221160455] = "VI_ATTR_PXI_SLOTPATH";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_SLOT_LBUS_LEFT"] = 1073676808] = "VI_ATTR_PXI_SLOT_LBUS_LEFT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_SLOT_LBUS_RIGHT"] = 1073676809] = "VI_ATTR_PXI_SLOT_LBUS_RIGHT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_TRIG_BUS"] = 1073676810] = "VI_ATTR_PXI_TRIG_BUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_STAR_TRIG_BUS"] = 1073676811] = "VI_ATTR_PXI_STAR_TRIG_BUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_STAR_TRIG_LINE"] = 1073676812] = "VI_ATTR_PXI_STAR_TRIG_LINE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_SRC_TRIG_BUS"] = 1073676813] = "VI_ATTR_PXI_SRC_TRIG_BUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_DEST_TRIG_BUS"] = 1073676814] = "VI_ATTR_PXI_DEST_TRIG_BUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_TYPE_BAR0"] = 1073676817] = "VI_ATTR_PXI_MEM_TYPE_BAR0";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_TYPE_BAR1"] = 1073676818] = "VI_ATTR_PXI_MEM_TYPE_BAR1";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_TYPE_BAR2"] = 1073676819] = "VI_ATTR_PXI_MEM_TYPE_BAR2";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_TYPE_BAR3"] = 1073676820] = "VI_ATTR_PXI_MEM_TYPE_BAR3";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_TYPE_BAR4"] = 1073676821] = "VI_ATTR_PXI_MEM_TYPE_BAR4";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_TYPE_BAR5"] = 1073676822] = "VI_ATTR_PXI_MEM_TYPE_BAR5";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR0_32"] = 1073676833] = "VI_ATTR_PXI_MEM_BASE_BAR0_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR1_32"] = 1073676834] = "VI_ATTR_PXI_MEM_BASE_BAR1_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR2_32"] = 1073676835] = "VI_ATTR_PXI_MEM_BASE_BAR2_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR3_32"] = 1073676836] = "VI_ATTR_PXI_MEM_BASE_BAR3_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR4_32"] = 1073676837] = "VI_ATTR_PXI_MEM_BASE_BAR4_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR5_32"] = 1073676838] = "VI_ATTR_PXI_MEM_BASE_BAR5_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR0_64"] = 1073676840] = "VI_ATTR_PXI_MEM_BASE_BAR0_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR1_64"] = 1073676841] = "VI_ATTR_PXI_MEM_BASE_BAR1_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR2_64"] = 1073676842] = "VI_ATTR_PXI_MEM_BASE_BAR2_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR3_64"] = 1073676843] = "VI_ATTR_PXI_MEM_BASE_BAR3_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR4_64"] = 1073676844] = "VI_ATTR_PXI_MEM_BASE_BAR4_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_BASE_BAR5_64"] = 1073676845] = "VI_ATTR_PXI_MEM_BASE_BAR5_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR0_32"] = 1073676849] = "VI_ATTR_PXI_MEM_SIZE_BAR0_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR1_32"] = 1073676850] = "VI_ATTR_PXI_MEM_SIZE_BAR1_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR2_32"] = 1073676851] = "VI_ATTR_PXI_MEM_SIZE_BAR2_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR3_32"] = 1073676852] = "VI_ATTR_PXI_MEM_SIZE_BAR3_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR4_32"] = 1073676853] = "VI_ATTR_PXI_MEM_SIZE_BAR4_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR5_32"] = 1073676854] = "VI_ATTR_PXI_MEM_SIZE_BAR5_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR0_64"] = 1073676856] = "VI_ATTR_PXI_MEM_SIZE_BAR0_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR1_64"] = 1073676857] = "VI_ATTR_PXI_MEM_SIZE_BAR1_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR2_64"] = 1073676858] = "VI_ATTR_PXI_MEM_SIZE_BAR2_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR3_64"] = 1073676859] = "VI_ATTR_PXI_MEM_SIZE_BAR3_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR4_64"] = 1073676860] = "VI_ATTR_PXI_MEM_SIZE_BAR4_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MEM_SIZE_BAR5_64"] = 1073676861] = "VI_ATTR_PXI_MEM_SIZE_BAR5_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_IS_EXPRESS"] = 1073676864] = "VI_ATTR_PXI_IS_EXPRESS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_SLOT_LWIDTH"] = 1073676865] = "VI_ATTR_PXI_SLOT_LWIDTH";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_MAX_LWIDTH"] = 1073676866] = "VI_ATTR_PXI_MAX_LWIDTH";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_ACTUAL_LWIDTH"] = 1073676867] = "VI_ATTR_PXI_ACTUAL_LWIDTH";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_DSTAR_BUS"] = 1073676868] = "VI_ATTR_PXI_DSTAR_BUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_DSTAR_SET"] = 1073676869] = "VI_ATTR_PXI_DSTAR_SET";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_ALLOW_WRITE_COMBINE"] = 1073676870] = "VI_ATTR_PXI_ALLOW_WRITE_COMBINE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_HISLIP_OVERLAP_EN"] = 1073677056] = "VI_ATTR_TCPIP_HISLIP_OVERLAP_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_HISLIP_VERSION"] = 1073677057] = "VI_ATTR_TCPIP_HISLIP_VERSION";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_HISLIP_MAX_MESSAGE_KB"] = 1073677058] = "VI_ATTR_TCPIP_HISLIP_MAX_MESSAGE_KB";
    NiVisaConstants[NiVisaConstants["VI_ATTR_TCPIP_IS_HISLIP"] = 1073677059] = "VI_ATTR_TCPIP_IS_HISLIP";
    NiVisaConstants[NiVisaConstants["VI_ATTR_JOB_ID"] = 1073692678] = "VI_ATTR_JOB_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_EVENT_TYPE"] = 1073692688] = "VI_ATTR_EVENT_TYPE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_SIGP_STATUS_ID"] = 1073692689] = "VI_ATTR_SIGP_STATUS_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RECV_TRIG_ID"] = 1073692690] = "VI_ATTR_RECV_TRIG_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_INTR_STATUS_ID"] = 1073692707] = "VI_ATTR_INTR_STATUS_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_STATUS"] = 1073692709] = "VI_ATTR_STATUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RET_COUNT_32"] = 1073692710] = "VI_ATTR_RET_COUNT_32";
    NiVisaConstants[NiVisaConstants["VI_ATTR_BUFFER"] = 1073692711] = "VI_ATTR_BUFFER";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RECV_INTR_LEVEL"] = 1073692737] = "VI_ATTR_RECV_INTR_LEVEL";
    NiVisaConstants[NiVisaConstants["VI_ATTR_OPER_NAME"] = 3221176386] = "VI_ATTR_OPER_NAME";
    NiVisaConstants[NiVisaConstants["VI_ATTR_GPIB_RECV_CIC_STATE"] = 1073693075] = "VI_ATTR_GPIB_RECV_CIC_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RECV_TCPIP_ADDR"] = 3221176728] = "VI_ATTR_RECV_TCPIP_ADDR";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_RECV_INTR_SIZE"] = 1073693104] = "VI_ATTR_USB_RECV_INTR_SIZE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_RECV_INTR_DATA"] = 3221176753] = "VI_ATTR_USB_RECV_INTR_DATA";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_RECV_INTR_SEQ"] = 1073693248] = "VI_ATTR_PXI_RECV_INTR_SEQ";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_RECV_INTR_DATA"] = 1073693249] = "VI_ATTR_PXI_RECV_INTR_DATA";
    /*- Attributes (platform dependent size) ------------------------------------*/
    NiVisaConstants[NiVisaConstants["VI_ATTR_USER_DATA_64"] = 1073676298] = "VI_ATTR_USER_DATA_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RET_COUNT_64"] = 1073692712] = "VI_ATTR_RET_COUNT_64";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USER_DATA"] = 1073676298] = "VI_ATTR_USER_DATA";
    NiVisaConstants[NiVisaConstants["VI_ATTR_RET_COUNT"] = 1073692712] = "VI_ATTR_RET_COUNT";
    /*- Event Types -------------------------------------------------------------*/
    NiVisaConstants[NiVisaConstants["VI_EVENT_IO_COMPLETION"] = 1073684489] = "VI_EVENT_IO_COMPLETION";
    NiVisaConstants[NiVisaConstants["VI_EVENT_TRIG"] = 3221168138] = "VI_EVENT_TRIG";
    NiVisaConstants[NiVisaConstants["VI_EVENT_SERVICE_REQ"] = 1073684491] = "VI_EVENT_SERVICE_REQ";
    NiVisaConstants[NiVisaConstants["VI_EVENT_CLEAR"] = 1073684493] = "VI_EVENT_CLEAR";
    NiVisaConstants[NiVisaConstants["VI_EVENT_EXCEPTION"] = 3221168142] = "VI_EVENT_EXCEPTION";
    NiVisaConstants[NiVisaConstants["VI_EVENT_GPIB_CIC"] = 1073684498] = "VI_EVENT_GPIB_CIC";
    NiVisaConstants[NiVisaConstants["VI_EVENT_GPIB_TALK"] = 1073684499] = "VI_EVENT_GPIB_TALK";
    NiVisaConstants[NiVisaConstants["VI_EVENT_GPIB_LISTEN"] = 1073684500] = "VI_EVENT_GPIB_LISTEN";
    NiVisaConstants[NiVisaConstants["VI_EVENT_VXI_VME_SYSFAIL"] = 1073684509] = "VI_EVENT_VXI_VME_SYSFAIL";
    NiVisaConstants[NiVisaConstants["VI_EVENT_VXI_VME_SYSRESET"] = 1073684510] = "VI_EVENT_VXI_VME_SYSRESET";
    NiVisaConstants[NiVisaConstants["VI_EVENT_VXI_SIGP"] = 1073684512] = "VI_EVENT_VXI_SIGP";
    NiVisaConstants[NiVisaConstants["VI_EVENT_VXI_VME_INTR"] = 3221168161] = "VI_EVENT_VXI_VME_INTR";
    NiVisaConstants[NiVisaConstants["VI_EVENT_PXI_INTR"] = 1073684514] = "VI_EVENT_PXI_INTR";
    NiVisaConstants[NiVisaConstants["VI_EVENT_TCPIP_CONNECT"] = 1073684534] = "VI_EVENT_TCPIP_CONNECT";
    NiVisaConstants[NiVisaConstants["VI_EVENT_USB_INTR"] = 1073684535] = "VI_EVENT_USB_INTR";
    NiVisaConstants[NiVisaConstants["VI_ALL_ENABLED_EVENTS"] = 1073709055] = "VI_ALL_ENABLED_EVENTS";
    /*- Completion and Error Codes ----------------------------------------------*/
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_EVENT_EN"] = 1073676290] = "VI_SUCCESS_EVENT_EN";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_EVENT_DIS"] = 1073676291] = "VI_SUCCESS_EVENT_DIS";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_QUEUE_EMPTY"] = 1073676292] = "VI_SUCCESS_QUEUE_EMPTY";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_TERM_CHAR"] = 1073676293] = "VI_SUCCESS_TERM_CHAR";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_MAX_CNT"] = 1073676294] = "VI_SUCCESS_MAX_CNT";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_DEV_NPRESENT"] = 1073676413] = "VI_SUCCESS_DEV_NPRESENT";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_TRIG_MAPPED"] = 1073676414] = "VI_SUCCESS_TRIG_MAPPED";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_QUEUE_NEMPTY"] = 1073676416] = "VI_SUCCESS_QUEUE_NEMPTY";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_NCHAIN"] = 1073676440] = "VI_SUCCESS_NCHAIN";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_NESTED_SHARED"] = 1073676441] = "VI_SUCCESS_NESTED_SHARED";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_NESTED_EXCLUSIVE"] = 1073676442] = "VI_SUCCESS_NESTED_EXCLUSIVE";
    NiVisaConstants[NiVisaConstants["VI_SUCCESS_SYNC"] = 1073676443] = "VI_SUCCESS_SYNC";
    NiVisaConstants[NiVisaConstants["VI_WARN_QUEUE_OVERFLOW"] = 1073676300] = "VI_WARN_QUEUE_OVERFLOW";
    NiVisaConstants[NiVisaConstants["VI_WARN_CONFIG_NLOADED"] = 1073676407] = "VI_WARN_CONFIG_NLOADED";
    NiVisaConstants[NiVisaConstants["VI_WARN_NULL_OBJECT"] = 1073676418] = "VI_WARN_NULL_OBJECT";
    NiVisaConstants[NiVisaConstants["VI_WARN_NSUP_ATTR_STATE"] = 1073676420] = "VI_WARN_NSUP_ATTR_STATE";
    NiVisaConstants[NiVisaConstants["VI_WARN_UNKNOWN_STATUS"] = 1073676421] = "VI_WARN_UNKNOWN_STATUS";
    NiVisaConstants[NiVisaConstants["VI_WARN_NSUP_BUF"] = 1073676424] = "VI_WARN_NSUP_BUF";
    NiVisaConstants[NiVisaConstants["VI_WARN_EXT_FUNC_NIMPL"] = 1073676457] = "VI_WARN_EXT_FUNC_NIMPL";
    NiVisaConstants[NiVisaConstants["VI_ERROR_SYSTEM_ERROR"] = 3221159936] = "VI_ERROR_SYSTEM_ERROR";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_OBJECT"] = 3221159950] = "VI_ERROR_INV_OBJECT";
    NiVisaConstants[NiVisaConstants["VI_ERROR_RSRC_LOCKED"] = 3221159951] = "VI_ERROR_RSRC_LOCKED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_EXPR"] = 3221159952] = "VI_ERROR_INV_EXPR";
    NiVisaConstants[NiVisaConstants["VI_ERROR_RSRC_NFOUND"] = 3221159953] = "VI_ERROR_RSRC_NFOUND";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_RSRC_NAME"] = 3221159954] = "VI_ERROR_INV_RSRC_NAME";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_ACC_MODE"] = 3221159955] = "VI_ERROR_INV_ACC_MODE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_TMO"] = 3221159957] = "VI_ERROR_TMO";
    NiVisaConstants[NiVisaConstants["VI_ERROR_CLOSING_FAILED"] = 3221159958] = "VI_ERROR_CLOSING_FAILED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_DEGREE"] = 3221159963] = "VI_ERROR_INV_DEGREE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_JOB_ID"] = 3221159964] = "VI_ERROR_INV_JOB_ID";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_ATTR"] = 3221159965] = "VI_ERROR_NSUP_ATTR";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_ATTR_STATE"] = 3221159966] = "VI_ERROR_NSUP_ATTR_STATE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_ATTR_READONLY"] = 3221159967] = "VI_ERROR_ATTR_READONLY";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_LOCK_TYPE"] = 3221159968] = "VI_ERROR_INV_LOCK_TYPE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_ACCESS_KEY"] = 3221159969] = "VI_ERROR_INV_ACCESS_KEY";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_EVENT"] = 3221159974] = "VI_ERROR_INV_EVENT";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_MECH"] = 3221159975] = "VI_ERROR_INV_MECH";
    NiVisaConstants[NiVisaConstants["VI_ERROR_HNDLR_NINSTALLED"] = 3221159976] = "VI_ERROR_HNDLR_NINSTALLED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_HNDLR_REF"] = 3221159977] = "VI_ERROR_INV_HNDLR_REF";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_CONTEXT"] = 3221159978] = "VI_ERROR_INV_CONTEXT";
    NiVisaConstants[NiVisaConstants["VI_ERROR_QUEUE_OVERFLOW"] = 3221159981] = "VI_ERROR_QUEUE_OVERFLOW";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NENABLED"] = 3221159983] = "VI_ERROR_NENABLED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_ABORT"] = 3221159984] = "VI_ERROR_ABORT";
    NiVisaConstants[NiVisaConstants["VI_ERROR_RAW_WR_PROT_VIOL"] = 3221159988] = "VI_ERROR_RAW_WR_PROT_VIOL";
    NiVisaConstants[NiVisaConstants["VI_ERROR_RAW_RD_PROT_VIOL"] = 3221159989] = "VI_ERROR_RAW_RD_PROT_VIOL";
    NiVisaConstants[NiVisaConstants["VI_ERROR_OUTP_PROT_VIOL"] = 3221159990] = "VI_ERROR_OUTP_PROT_VIOL";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INP_PROT_VIOL"] = 3221159991] = "VI_ERROR_INP_PROT_VIOL";
    NiVisaConstants[NiVisaConstants["VI_ERROR_BERR"] = 3221159992] = "VI_ERROR_BERR";
    NiVisaConstants[NiVisaConstants["VI_ERROR_IN_PROGRESS"] = 3221159993] = "VI_ERROR_IN_PROGRESS";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_SETUP"] = 3221159994] = "VI_ERROR_INV_SETUP";
    NiVisaConstants[NiVisaConstants["VI_ERROR_QUEUE_ERROR"] = 3221159995] = "VI_ERROR_QUEUE_ERROR";
    NiVisaConstants[NiVisaConstants["VI_ERROR_ALLOC"] = 3221159996] = "VI_ERROR_ALLOC";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_MASK"] = 3221159997] = "VI_ERROR_INV_MASK";
    NiVisaConstants[NiVisaConstants["VI_ERROR_IO"] = 3221159998] = "VI_ERROR_IO";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_FMT"] = 3221159999] = "VI_ERROR_INV_FMT";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_FMT"] = 3221160001] = "VI_ERROR_NSUP_FMT";
    NiVisaConstants[NiVisaConstants["VI_ERROR_LINE_IN_USE"] = 3221160002] = "VI_ERROR_LINE_IN_USE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_LINE_NRESERVED"] = 3221160003] = "VI_ERROR_LINE_NRESERVED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_MODE"] = 3221160006] = "VI_ERROR_NSUP_MODE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_SRQ_NOCCURRED"] = 3221160010] = "VI_ERROR_SRQ_NOCCURRED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_SPACE"] = 3221160014] = "VI_ERROR_INV_SPACE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_OFFSET"] = 3221160017] = "VI_ERROR_INV_OFFSET";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_WIDTH"] = 3221160018] = "VI_ERROR_INV_WIDTH";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_OFFSET"] = 3221160020] = "VI_ERROR_NSUP_OFFSET";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_VAR_WIDTH"] = 3221160021] = "VI_ERROR_NSUP_VAR_WIDTH";
    NiVisaConstants[NiVisaConstants["VI_ERROR_WINDOW_NMAPPED"] = 3221160023] = "VI_ERROR_WINDOW_NMAPPED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_RESP_PENDING"] = 3221160025] = "VI_ERROR_RESP_PENDING";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NLISTENERS"] = 3221160031] = "VI_ERROR_NLISTENERS";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NCIC"] = 3221160032] = "VI_ERROR_NCIC";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSYS_CNTLR"] = 3221160033] = "VI_ERROR_NSYS_CNTLR";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_OPER"] = 3221160039] = "VI_ERROR_NSUP_OPER";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INTR_PENDING"] = 3221160040] = "VI_ERROR_INTR_PENDING";
    NiVisaConstants[NiVisaConstants["VI_ERROR_ASRL_PARITY"] = 3221160042] = "VI_ERROR_ASRL_PARITY";
    NiVisaConstants[NiVisaConstants["VI_ERROR_ASRL_FRAMING"] = 3221160043] = "VI_ERROR_ASRL_FRAMING";
    NiVisaConstants[NiVisaConstants["VI_ERROR_ASRL_OVERRUN"] = 3221160044] = "VI_ERROR_ASRL_OVERRUN";
    NiVisaConstants[NiVisaConstants["VI_ERROR_TRIG_NMAPPED"] = 3221160046] = "VI_ERROR_TRIG_NMAPPED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_ALIGN_OFFSET"] = 3221160048] = "VI_ERROR_NSUP_ALIGN_OFFSET";
    NiVisaConstants[NiVisaConstants["VI_ERROR_USER_BUF"] = 3221160049] = "VI_ERROR_USER_BUF";
    NiVisaConstants[NiVisaConstants["VI_ERROR_RSRC_BUSY"] = 3221160050] = "VI_ERROR_RSRC_BUSY";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_WIDTH"] = 3221160054] = "VI_ERROR_NSUP_WIDTH";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_PARAMETER"] = 3221160056] = "VI_ERROR_INV_PARAMETER";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_PROT"] = 3221160057] = "VI_ERROR_INV_PROT";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_SIZE"] = 3221160059] = "VI_ERROR_INV_SIZE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_WINDOW_MAPPED"] = 3221160064] = "VI_ERROR_WINDOW_MAPPED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NIMPL_OPER"] = 3221160065] = "VI_ERROR_NIMPL_OPER";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_LENGTH"] = 3221160067] = "VI_ERROR_INV_LENGTH";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_MODE"] = 3221160081] = "VI_ERROR_INV_MODE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_SESN_NLOCKED"] = 3221160092] = "VI_ERROR_SESN_NLOCKED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_MEM_NSHARED"] = 3221160093] = "VI_ERROR_MEM_NSHARED";
    NiVisaConstants[NiVisaConstants["VI_ERROR_LIBRARY_NFOUND"] = 3221160094] = "VI_ERROR_LIBRARY_NFOUND";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_INTR"] = 3221160095] = "VI_ERROR_NSUP_INTR";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INV_LINE"] = 3221160096] = "VI_ERROR_INV_LINE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_FILE_ACCESS"] = 3221160097] = "VI_ERROR_FILE_ACCESS";
    NiVisaConstants[NiVisaConstants["VI_ERROR_FILE_IO"] = 3221160098] = "VI_ERROR_FILE_IO";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_LINE"] = 3221160099] = "VI_ERROR_NSUP_LINE";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NSUP_MECH"] = 3221160100] = "VI_ERROR_NSUP_MECH";
    NiVisaConstants[NiVisaConstants["VI_ERROR_INTF_NUM_NCONFIG"] = 3221160101] = "VI_ERROR_INTF_NUM_NCONFIG";
    NiVisaConstants[NiVisaConstants["VI_ERROR_CONN_LOST"] = 3221160102] = "VI_ERROR_CONN_LOST";
    NiVisaConstants[NiVisaConstants["VI_ERROR_MACHINE_NAVAIL"] = 3221160103] = "VI_ERROR_MACHINE_NAVAIL";
    NiVisaConstants[NiVisaConstants["VI_ERROR_NPERMISSION"] = 3221160104] = "VI_ERROR_NPERMISSION";
    /*- Other VISA Definitions --------------------------------------------------*/
    NiVisaConstants[NiVisaConstants["VI_VERSION_MAJOR"] = 5] = "VI_VERSION_MAJOR";
    NiVisaConstants[NiVisaConstants["VI_VERSION_MINOR"] = 8] = "VI_VERSION_MINOR";
    NiVisaConstants[NiVisaConstants["VI_VERSION_SUBMINOR"] = 0] = "VI_VERSION_SUBMINOR";
    NiVisaConstants[NiVisaConstants["VI_FIND_BUFLEN"] = 256] = "VI_FIND_BUFLEN";
    NiVisaConstants[NiVisaConstants["VI_INTF_GPIB"] = 1] = "VI_INTF_GPIB";
    NiVisaConstants[NiVisaConstants["VI_INTF_VXI"] = 2] = "VI_INTF_VXI";
    NiVisaConstants[NiVisaConstants["VI_INTF_GPIB_VXI"] = 3] = "VI_INTF_GPIB_VXI";
    NiVisaConstants[NiVisaConstants["VI_INTF_ASRL"] = 4] = "VI_INTF_ASRL";
    NiVisaConstants[NiVisaConstants["VI_INTF_PXI"] = 5] = "VI_INTF_PXI";
    NiVisaConstants[NiVisaConstants["VI_INTF_TCPIP"] = 6] = "VI_INTF_TCPIP";
    NiVisaConstants[NiVisaConstants["VI_INTF_USB"] = 7] = "VI_INTF_USB";
    NiVisaConstants[NiVisaConstants["VI_PROT_NORMAL"] = 1] = "VI_PROT_NORMAL";
    NiVisaConstants[NiVisaConstants["VI_PROT_FDC"] = 2] = "VI_PROT_FDC";
    NiVisaConstants[NiVisaConstants["VI_PROT_HS488"] = 3] = "VI_PROT_HS488";
    NiVisaConstants[NiVisaConstants["VI_PROT_4882_STRS"] = 4] = "VI_PROT_4882_STRS";
    NiVisaConstants[NiVisaConstants["VI_PROT_USBTMC_VENDOR"] = 5] = "VI_PROT_USBTMC_VENDOR";
    NiVisaConstants[NiVisaConstants["VI_FDC_NORMAL"] = 1] = "VI_FDC_NORMAL";
    NiVisaConstants[NiVisaConstants["VI_FDC_STREAM"] = 2] = "VI_FDC_STREAM";
    NiVisaConstants[NiVisaConstants["VI_LOCAL_SPACE"] = 0] = "VI_LOCAL_SPACE";
    NiVisaConstants[NiVisaConstants["VI_A16_SPACE"] = 1] = "VI_A16_SPACE";
    NiVisaConstants[NiVisaConstants["VI_A24_SPACE"] = 2] = "VI_A24_SPACE";
    NiVisaConstants[NiVisaConstants["VI_A32_SPACE"] = 3] = "VI_A32_SPACE";
    NiVisaConstants[NiVisaConstants["VI_A64_SPACE"] = 4] = "VI_A64_SPACE";
    NiVisaConstants[NiVisaConstants["VI_PXI_ALLOC_SPACE"] = 9] = "VI_PXI_ALLOC_SPACE";
    NiVisaConstants[NiVisaConstants["VI_PXI_CFG_SPACE"] = 10] = "VI_PXI_CFG_SPACE";
    NiVisaConstants[NiVisaConstants["VI_PXI_BAR0_SPACE"] = 11] = "VI_PXI_BAR0_SPACE";
    NiVisaConstants[NiVisaConstants["VI_PXI_BAR1_SPACE"] = 12] = "VI_PXI_BAR1_SPACE";
    NiVisaConstants[NiVisaConstants["VI_PXI_BAR2_SPACE"] = 13] = "VI_PXI_BAR2_SPACE";
    NiVisaConstants[NiVisaConstants["VI_PXI_BAR3_SPACE"] = 14] = "VI_PXI_BAR3_SPACE";
    NiVisaConstants[NiVisaConstants["VI_PXI_BAR4_SPACE"] = 15] = "VI_PXI_BAR4_SPACE";
    NiVisaConstants[NiVisaConstants["VI_PXI_BAR5_SPACE"] = 16] = "VI_PXI_BAR5_SPACE";
    NiVisaConstants[NiVisaConstants["VI_OPAQUE_SPACE"] = 65535] = "VI_OPAQUE_SPACE";
    NiVisaConstants[NiVisaConstants["VI_UNKNOWN_LA"] = -1] = "VI_UNKNOWN_LA";
    NiVisaConstants[NiVisaConstants["VI_UNKNOWN_SLOT"] = -1] = "VI_UNKNOWN_SLOT";
    NiVisaConstants[NiVisaConstants["VI_UNKNOWN_LEVEL"] = -1] = "VI_UNKNOWN_LEVEL";
    NiVisaConstants[NiVisaConstants["VI_UNKNOWN_CHASSIS"] = -1] = "VI_UNKNOWN_CHASSIS";
    NiVisaConstants[NiVisaConstants["VI_QUEUE"] = 1] = "VI_QUEUE";
    NiVisaConstants[NiVisaConstants["VI_HNDLR"] = 2] = "VI_HNDLR";
    NiVisaConstants[NiVisaConstants["VI_SUSPEND_HNDLR"] = 4] = "VI_SUSPEND_HNDLR";
    NiVisaConstants[NiVisaConstants["VI_ALL_MECH"] = 65535] = "VI_ALL_MECH";
    NiVisaConstants[NiVisaConstants["VI_ANY_HNDLR"] = 0] = "VI_ANY_HNDLR";
    NiVisaConstants[NiVisaConstants["VI_TRIG_ALL"] = -2] = "VI_TRIG_ALL";
    NiVisaConstants[NiVisaConstants["VI_TRIG_SW"] = -1] = "VI_TRIG_SW";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL0"] = 0] = "VI_TRIG_TTL0";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL1"] = 1] = "VI_TRIG_TTL1";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL2"] = 2] = "VI_TRIG_TTL2";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL3"] = 3] = "VI_TRIG_TTL3";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL4"] = 4] = "VI_TRIG_TTL4";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL5"] = 5] = "VI_TRIG_TTL5";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL6"] = 6] = "VI_TRIG_TTL6";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL7"] = 7] = "VI_TRIG_TTL7";
    NiVisaConstants[NiVisaConstants["VI_TRIG_ECL0"] = 8] = "VI_TRIG_ECL0";
    NiVisaConstants[NiVisaConstants["VI_TRIG_ECL1"] = 9] = "VI_TRIG_ECL1";
    NiVisaConstants[NiVisaConstants["VI_TRIG_ECL2"] = 10] = "VI_TRIG_ECL2";
    NiVisaConstants[NiVisaConstants["VI_TRIG_ECL3"] = 11] = "VI_TRIG_ECL3";
    NiVisaConstants[NiVisaConstants["VI_TRIG_ECL4"] = 12] = "VI_TRIG_ECL4";
    NiVisaConstants[NiVisaConstants["VI_TRIG_ECL5"] = 13] = "VI_TRIG_ECL5";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT1"] = 14] = "VI_TRIG_STAR_SLOT1";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT2"] = 15] = "VI_TRIG_STAR_SLOT2";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT3"] = 16] = "VI_TRIG_STAR_SLOT3";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT4"] = 17] = "VI_TRIG_STAR_SLOT4";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT5"] = 18] = "VI_TRIG_STAR_SLOT5";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT6"] = 19] = "VI_TRIG_STAR_SLOT6";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT7"] = 20] = "VI_TRIG_STAR_SLOT7";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT8"] = 21] = "VI_TRIG_STAR_SLOT8";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT9"] = 22] = "VI_TRIG_STAR_SLOT9";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT10"] = 23] = "VI_TRIG_STAR_SLOT10";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT11"] = 24] = "VI_TRIG_STAR_SLOT11";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_SLOT12"] = 25] = "VI_TRIG_STAR_SLOT12";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_INSTR"] = 26] = "VI_TRIG_STAR_INSTR";
    NiVisaConstants[NiVisaConstants["VI_TRIG_PANEL_IN"] = 27] = "VI_TRIG_PANEL_IN";
    NiVisaConstants[NiVisaConstants["VI_TRIG_PANEL_OUT"] = 28] = "VI_TRIG_PANEL_OUT";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_VXI0"] = 29] = "VI_TRIG_STAR_VXI0";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_VXI1"] = 30] = "VI_TRIG_STAR_VXI1";
    NiVisaConstants[NiVisaConstants["VI_TRIG_STAR_VXI2"] = 31] = "VI_TRIG_STAR_VXI2";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL8"] = 32] = "VI_TRIG_TTL8";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL9"] = 33] = "VI_TRIG_TTL9";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL10"] = 34] = "VI_TRIG_TTL10";
    NiVisaConstants[NiVisaConstants["VI_TRIG_TTL11"] = 35] = "VI_TRIG_TTL11";
    NiVisaConstants[NiVisaConstants["VI_TRIG_PROT_DEFAULT"] = 0] = "VI_TRIG_PROT_DEFAULT";
    NiVisaConstants[NiVisaConstants["VI_TRIG_PROT_ON"] = 1] = "VI_TRIG_PROT_ON";
    NiVisaConstants[NiVisaConstants["VI_TRIG_PROT_OFF"] = 2] = "VI_TRIG_PROT_OFF";
    NiVisaConstants[NiVisaConstants["VI_TRIG_PROT_SYNC"] = 5] = "VI_TRIG_PROT_SYNC";
    NiVisaConstants[NiVisaConstants["VI_TRIG_PROT_RESERVE"] = 6] = "VI_TRIG_PROT_RESERVE";
    NiVisaConstants[NiVisaConstants["VI_TRIG_PROT_UNRESERVE"] = 7] = "VI_TRIG_PROT_UNRESERVE";
    NiVisaConstants[NiVisaConstants["VI_READ_BUF"] = 1] = "VI_READ_BUF";
    NiVisaConstants[NiVisaConstants["VI_WRITE_BUF"] = 2] = "VI_WRITE_BUF";
    NiVisaConstants[NiVisaConstants["VI_READ_BUF_DISCARD"] = 4] = "VI_READ_BUF_DISCARD";
    NiVisaConstants[NiVisaConstants["VI_WRITE_BUF_DISCARD"] = 8] = "VI_WRITE_BUF_DISCARD";
    NiVisaConstants[NiVisaConstants["VI_IO_IN_BUF"] = 16] = "VI_IO_IN_BUF";
    NiVisaConstants[NiVisaConstants["VI_IO_OUT_BUF"] = 32] = "VI_IO_OUT_BUF";
    NiVisaConstants[NiVisaConstants["VI_IO_IN_BUF_DISCARD"] = 64] = "VI_IO_IN_BUF_DISCARD";
    NiVisaConstants[NiVisaConstants["VI_IO_OUT_BUF_DISCARD"] = 128] = "VI_IO_OUT_BUF_DISCARD";
    NiVisaConstants[NiVisaConstants["VI_FLUSH_ON_ACCESS"] = 1] = "VI_FLUSH_ON_ACCESS";
    NiVisaConstants[NiVisaConstants["VI_FLUSH_WHEN_FULL"] = 2] = "VI_FLUSH_WHEN_FULL";
    NiVisaConstants[NiVisaConstants["VI_FLUSH_DISABLE"] = 3] = "VI_FLUSH_DISABLE";
    NiVisaConstants[NiVisaConstants["VI_NMAPPED"] = 1] = "VI_NMAPPED";
    NiVisaConstants[NiVisaConstants["VI_USE_OPERS"] = 2] = "VI_USE_OPERS";
    NiVisaConstants[NiVisaConstants["VI_DEREF_ADDR"] = 3] = "VI_DEREF_ADDR";
    NiVisaConstants[NiVisaConstants["VI_DEREF_ADDR_BYTE_SWAP"] = 4] = "VI_DEREF_ADDR_BYTE_SWAP";
    NiVisaConstants[NiVisaConstants["VI_TMO_IMMEDIATE"] = 0] = "VI_TMO_IMMEDIATE";
    NiVisaConstants[NiVisaConstants["VI_TMO_INFINITE"] = 4294967295] = "VI_TMO_INFINITE";
    NiVisaConstants[NiVisaConstants["VI_NO_LOCK"] = 0] = "VI_NO_LOCK";
    NiVisaConstants[NiVisaConstants["VI_EXCLUSIVE_LOCK"] = 1] = "VI_EXCLUSIVE_LOCK";
    NiVisaConstants[NiVisaConstants["VI_SHARED_LOCK"] = 2] = "VI_SHARED_LOCK";
    NiVisaConstants[NiVisaConstants["VI_LOAD_CONFIG"] = 4] = "VI_LOAD_CONFIG";
    NiVisaConstants[NiVisaConstants["VI_NO_SEC_ADDR"] = 65535] = "VI_NO_SEC_ADDR";
    NiVisaConstants[NiVisaConstants["VI_ASRL_PAR_NONE"] = 0] = "VI_ASRL_PAR_NONE";
    NiVisaConstants[NiVisaConstants["VI_ASRL_PAR_ODD"] = 1] = "VI_ASRL_PAR_ODD";
    NiVisaConstants[NiVisaConstants["VI_ASRL_PAR_EVEN"] = 2] = "VI_ASRL_PAR_EVEN";
    NiVisaConstants[NiVisaConstants["VI_ASRL_PAR_MARK"] = 3] = "VI_ASRL_PAR_MARK";
    NiVisaConstants[NiVisaConstants["VI_ASRL_PAR_SPACE"] = 4] = "VI_ASRL_PAR_SPACE";
    NiVisaConstants[NiVisaConstants["VI_ASRL_STOP_ONE"] = 10] = "VI_ASRL_STOP_ONE";
    NiVisaConstants[NiVisaConstants["VI_ASRL_STOP_ONE5"] = 15] = "VI_ASRL_STOP_ONE5";
    NiVisaConstants[NiVisaConstants["VI_ASRL_STOP_TWO"] = 20] = "VI_ASRL_STOP_TWO";
    NiVisaConstants[NiVisaConstants["VI_ASRL_FLOW_NONE"] = 0] = "VI_ASRL_FLOW_NONE";
    NiVisaConstants[NiVisaConstants["VI_ASRL_FLOW_XON_XOFF"] = 1] = "VI_ASRL_FLOW_XON_XOFF";
    NiVisaConstants[NiVisaConstants["VI_ASRL_FLOW_RTS_CTS"] = 2] = "VI_ASRL_FLOW_RTS_CTS";
    NiVisaConstants[NiVisaConstants["VI_ASRL_FLOW_DTR_DSR"] = 4] = "VI_ASRL_FLOW_DTR_DSR";
    NiVisaConstants[NiVisaConstants["VI_ASRL_END_NONE"] = 0] = "VI_ASRL_END_NONE";
    NiVisaConstants[NiVisaConstants["VI_ASRL_END_LAST_BIT"] = 1] = "VI_ASRL_END_LAST_BIT";
    NiVisaConstants[NiVisaConstants["VI_ASRL_END_TERMCHAR"] = 2] = "VI_ASRL_END_TERMCHAR";
    NiVisaConstants[NiVisaConstants["VI_ASRL_END_BREAK"] = 3] = "VI_ASRL_END_BREAK";
    NiVisaConstants[NiVisaConstants["VI_STATE_ASSERTED"] = 1] = "VI_STATE_ASSERTED";
    NiVisaConstants[NiVisaConstants["VI_STATE_UNASSERTED"] = 0] = "VI_STATE_UNASSERTED";
    NiVisaConstants[NiVisaConstants["VI_STATE_UNKNOWN"] = -1] = "VI_STATE_UNKNOWN";
    NiVisaConstants[NiVisaConstants["VI_BIG_ENDIAN"] = 0] = "VI_BIG_ENDIAN";
    NiVisaConstants[NiVisaConstants["VI_LITTLE_ENDIAN"] = 1] = "VI_LITTLE_ENDIAN";
    NiVisaConstants[NiVisaConstants["VI_DATA_PRIV"] = 0] = "VI_DATA_PRIV";
    NiVisaConstants[NiVisaConstants["VI_DATA_NPRIV"] = 1] = "VI_DATA_NPRIV";
    NiVisaConstants[NiVisaConstants["VI_PROG_PRIV"] = 2] = "VI_PROG_PRIV";
    NiVisaConstants[NiVisaConstants["VI_PROG_NPRIV"] = 3] = "VI_PROG_NPRIV";
    NiVisaConstants[NiVisaConstants["VI_BLCK_PRIV"] = 4] = "VI_BLCK_PRIV";
    NiVisaConstants[NiVisaConstants["VI_BLCK_NPRIV"] = 5] = "VI_BLCK_NPRIV";
    NiVisaConstants[NiVisaConstants["VI_D64_PRIV"] = 6] = "VI_D64_PRIV";
    NiVisaConstants[NiVisaConstants["VI_D64_NPRIV"] = 7] = "VI_D64_NPRIV";
    NiVisaConstants[NiVisaConstants["VI_D64_2EVME"] = 8] = "VI_D64_2EVME";
    NiVisaConstants[NiVisaConstants["VI_D64_SST160"] = 9] = "VI_D64_SST160";
    NiVisaConstants[NiVisaConstants["VI_D64_SST267"] = 10] = "VI_D64_SST267";
    NiVisaConstants[NiVisaConstants["VI_D64_SST320"] = 11] = "VI_D64_SST320";
    NiVisaConstants[NiVisaConstants["VI_WIDTH_8"] = 1] = "VI_WIDTH_8";
    NiVisaConstants[NiVisaConstants["VI_WIDTH_16"] = 2] = "VI_WIDTH_16";
    NiVisaConstants[NiVisaConstants["VI_WIDTH_32"] = 4] = "VI_WIDTH_32";
    NiVisaConstants[NiVisaConstants["VI_WIDTH_64"] = 8] = "VI_WIDTH_64";
    NiVisaConstants[NiVisaConstants["VI_GPIB_REN_DEASSERT"] = 0] = "VI_GPIB_REN_DEASSERT";
    NiVisaConstants[NiVisaConstants["VI_GPIB_REN_ASSERT"] = 1] = "VI_GPIB_REN_ASSERT";
    NiVisaConstants[NiVisaConstants["VI_GPIB_REN_DEASSERT_GTL"] = 2] = "VI_GPIB_REN_DEASSERT_GTL";
    NiVisaConstants[NiVisaConstants["VI_GPIB_REN_ASSERT_ADDRESS"] = 3] = "VI_GPIB_REN_ASSERT_ADDRESS";
    NiVisaConstants[NiVisaConstants["VI_GPIB_REN_ASSERT_LLO"] = 4] = "VI_GPIB_REN_ASSERT_LLO";
    NiVisaConstants[NiVisaConstants["VI_GPIB_REN_ASSERT_ADDRESS_LLO"] = 5] = "VI_GPIB_REN_ASSERT_ADDRESS_LLO";
    NiVisaConstants[NiVisaConstants["VI_GPIB_REN_ADDRESS_GTL"] = 6] = "VI_GPIB_REN_ADDRESS_GTL";
    NiVisaConstants[NiVisaConstants["VI_GPIB_ATN_DEASSERT"] = 0] = "VI_GPIB_ATN_DEASSERT";
    NiVisaConstants[NiVisaConstants["VI_GPIB_ATN_ASSERT"] = 1] = "VI_GPIB_ATN_ASSERT";
    NiVisaConstants[NiVisaConstants["VI_GPIB_ATN_DEASSERT_HANDSHAKE"] = 2] = "VI_GPIB_ATN_DEASSERT_HANDSHAKE";
    NiVisaConstants[NiVisaConstants["VI_GPIB_ATN_ASSERT_IMMEDIATE"] = 3] = "VI_GPIB_ATN_ASSERT_IMMEDIATE";
    NiVisaConstants[NiVisaConstants["VI_GPIB_HS488_DISABLED"] = 0] = "VI_GPIB_HS488_DISABLED";
    NiVisaConstants[NiVisaConstants["VI_GPIB_HS488_NIMPL"] = -1] = "VI_GPIB_HS488_NIMPL";
    NiVisaConstants[NiVisaConstants["VI_GPIB_UNADDRESSED"] = 0] = "VI_GPIB_UNADDRESSED";
    NiVisaConstants[NiVisaConstants["VI_GPIB_TALKER"] = 1] = "VI_GPIB_TALKER";
    NiVisaConstants[NiVisaConstants["VI_GPIB_LISTENER"] = 2] = "VI_GPIB_LISTENER";
    NiVisaConstants[NiVisaConstants["VI_VXI_CMD16"] = 512] = "VI_VXI_CMD16";
    NiVisaConstants[NiVisaConstants["VI_VXI_CMD16_RESP16"] = 514] = "VI_VXI_CMD16_RESP16";
    NiVisaConstants[NiVisaConstants["VI_VXI_RESP16"] = 2] = "VI_VXI_RESP16";
    NiVisaConstants[NiVisaConstants["VI_VXI_CMD32"] = 1024] = "VI_VXI_CMD32";
    NiVisaConstants[NiVisaConstants["VI_VXI_CMD32_RESP16"] = 1026] = "VI_VXI_CMD32_RESP16";
    NiVisaConstants[NiVisaConstants["VI_VXI_CMD32_RESP32"] = 1028] = "VI_VXI_CMD32_RESP32";
    NiVisaConstants[NiVisaConstants["VI_VXI_RESP32"] = 4] = "VI_VXI_RESP32";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_SIGNAL"] = -1] = "VI_ASSERT_SIGNAL";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_USE_ASSIGNED"] = 0] = "VI_ASSERT_USE_ASSIGNED";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_IRQ1"] = 1] = "VI_ASSERT_IRQ1";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_IRQ2"] = 2] = "VI_ASSERT_IRQ2";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_IRQ3"] = 3] = "VI_ASSERT_IRQ3";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_IRQ4"] = 4] = "VI_ASSERT_IRQ4";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_IRQ5"] = 5] = "VI_ASSERT_IRQ5";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_IRQ6"] = 6] = "VI_ASSERT_IRQ6";
    NiVisaConstants[NiVisaConstants["VI_ASSERT_IRQ7"] = 7] = "VI_ASSERT_IRQ7";
    NiVisaConstants[NiVisaConstants["VI_UTIL_ASSERT_SYSRESET"] = 1] = "VI_UTIL_ASSERT_SYSRESET";
    NiVisaConstants[NiVisaConstants["VI_UTIL_ASSERT_SYSFAIL"] = 2] = "VI_UTIL_ASSERT_SYSFAIL";
    NiVisaConstants[NiVisaConstants["VI_UTIL_DEASSERT_SYSFAIL"] = 3] = "VI_UTIL_DEASSERT_SYSFAIL";
    NiVisaConstants[NiVisaConstants["VI_VXI_CLASS_MEMORY"] = 0] = "VI_VXI_CLASS_MEMORY";
    NiVisaConstants[NiVisaConstants["VI_VXI_CLASS_EXTENDED"] = 1] = "VI_VXI_CLASS_EXTENDED";
    NiVisaConstants[NiVisaConstants["VI_VXI_CLASS_MESSAGE"] = 2] = "VI_VXI_CLASS_MESSAGE";
    NiVisaConstants[NiVisaConstants["VI_VXI_CLASS_REGISTER"] = 3] = "VI_VXI_CLASS_REGISTER";
    NiVisaConstants[NiVisaConstants["VI_VXI_CLASS_OTHER"] = 4] = "VI_VXI_CLASS_OTHER";
    NiVisaConstants[NiVisaConstants["VI_PXI_ADDR_NONE"] = 0] = "VI_PXI_ADDR_NONE";
    NiVisaConstants[NiVisaConstants["VI_PXI_ADDR_MEM"] = 1] = "VI_PXI_ADDR_MEM";
    NiVisaConstants[NiVisaConstants["VI_PXI_ADDR_IO"] = 2] = "VI_PXI_ADDR_IO";
    NiVisaConstants[NiVisaConstants["VI_PXI_ADDR_CFG"] = 3] = "VI_PXI_ADDR_CFG";
    NiVisaConstants[NiVisaConstants["VI_TRIG_UNKNOWN"] = -1] = "VI_TRIG_UNKNOWN";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_UNKNOWN"] = -1] = "VI_PXI_LBUS_UNKNOWN";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_NONE"] = 0] = "VI_PXI_LBUS_NONE";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_0"] = 1000] = "VI_PXI_LBUS_STAR_TRIG_BUS_0";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_1"] = 1001] = "VI_PXI_LBUS_STAR_TRIG_BUS_1";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_2"] = 1002] = "VI_PXI_LBUS_STAR_TRIG_BUS_2";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_3"] = 1003] = "VI_PXI_LBUS_STAR_TRIG_BUS_3";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_4"] = 1004] = "VI_PXI_LBUS_STAR_TRIG_BUS_4";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_5"] = 1005] = "VI_PXI_LBUS_STAR_TRIG_BUS_5";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_6"] = 1006] = "VI_PXI_LBUS_STAR_TRIG_BUS_6";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_7"] = 1007] = "VI_PXI_LBUS_STAR_TRIG_BUS_7";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_8"] = 1008] = "VI_PXI_LBUS_STAR_TRIG_BUS_8";
    NiVisaConstants[NiVisaConstants["VI_PXI_LBUS_STAR_TRIG_BUS_9"] = 1009] = "VI_PXI_LBUS_STAR_TRIG_BUS_9";
    NiVisaConstants[NiVisaConstants["VI_PXI_STAR_TRIG_CONTROLLER"] = 1413] = "VI_PXI_STAR_TRIG_CONTROLLER";
    /*- National Instruments ----------------------------------------------------*/
    NiVisaConstants[NiVisaConstants["VI_ERROR_HW_NGENUINE"] = 3221160106] = "VI_ERROR_HW_NGENUINE";
    NiVisaConstants[NiVisaConstants["VI_INTF_RIO"] = 8] = "VI_INTF_RIO";
    NiVisaConstants[NiVisaConstants["VI_INTF_FIREWIRE"] = 9] = "VI_INTF_FIREWIRE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_SYNC_MXI_ALLOW_EN"] = 1073676641] = "VI_ATTR_SYNC_MXI_ALLOW_EN";
    /* This is for VXI SERVANT resources */
    NiVisaConstants[NiVisaConstants["VI_EVENT_VXI_DEV_CMD"] = 3221168143] = "VI_EVENT_VXI_DEV_CMD";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_DEV_CMD_TYPE"] = 1073692727] = "VI_ATTR_VXI_DEV_CMD_TYPE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_DEV_CMD_VALUE"] = 1073692728] = "VI_ATTR_VXI_DEV_CMD_VALUE";
    NiVisaConstants[NiVisaConstants["VI_VXI_DEV_CMD_TYPE_16"] = 16] = "VI_VXI_DEV_CMD_TYPE_16";
    NiVisaConstants[NiVisaConstants["VI_VXI_DEV_CMD_TYPE_32"] = 32] = "VI_VXI_DEV_CMD_TYPE_32";
    /* mode values include VI_VXI_RESP16, VI_VXI_RESP32, and the next 2 values */
    NiVisaConstants[NiVisaConstants["VI_VXI_RESP_NONE"] = 0] = "VI_VXI_RESP_NONE";
    NiVisaConstants[NiVisaConstants["VI_VXI_RESP_PROT_ERROR"] = -1] = "VI_VXI_RESP_PROT_ERROR";
    /* This is for VXI TTL Trigger routing */
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_TRIG_LINES_EN"] = 1073692739] = "VI_ATTR_VXI_TRIG_LINES_EN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_VXI_TRIG_DIR"] = 1073692740] = "VI_ATTR_VXI_TRIG_DIR";
    /* This allows extended Serial support on Win32 and on NI ENET Serial products */
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_DISCARD_NULL"] = 1073676464] = "VI_ATTR_ASRL_DISCARD_NULL";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_CONNECTED"] = 1073676731] = "VI_ATTR_ASRL_CONNECTED";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_BREAK_STATE"] = 1073676732] = "VI_ATTR_ASRL_BREAK_STATE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_BREAK_LEN"] = 1073676733] = "VI_ATTR_ASRL_BREAK_LEN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_ALLOW_TRANSMIT"] = 1073676734] = "VI_ATTR_ASRL_ALLOW_TRANSMIT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_ASRL_WIRE_MODE"] = 1073676735] = "VI_ATTR_ASRL_WIRE_MODE";
    NiVisaConstants[NiVisaConstants["VI_ASRL_WIRE_485_4"] = 0] = "VI_ASRL_WIRE_485_4";
    NiVisaConstants[NiVisaConstants["VI_ASRL_WIRE_485_2_DTR_ECHO"] = 1] = "VI_ASRL_WIRE_485_2_DTR_ECHO";
    NiVisaConstants[NiVisaConstants["VI_ASRL_WIRE_485_2_DTR_CTRL"] = 2] = "VI_ASRL_WIRE_485_2_DTR_CTRL";
    NiVisaConstants[NiVisaConstants["VI_ASRL_WIRE_485_2_AUTO"] = 3] = "VI_ASRL_WIRE_485_2_AUTO";
    NiVisaConstants[NiVisaConstants["VI_ASRL_WIRE_232_DTE"] = 128] = "VI_ASRL_WIRE_232_DTE";
    NiVisaConstants[NiVisaConstants["VI_ASRL_WIRE_232_DCE"] = 129] = "VI_ASRL_WIRE_232_DCE";
    NiVisaConstants[NiVisaConstants["VI_ASRL_WIRE_232_AUTO"] = 130] = "VI_ASRL_WIRE_232_AUTO";
    NiVisaConstants[NiVisaConstants["VI_EVENT_ASRL_BREAK"] = 1073684515] = "VI_EVENT_ASRL_BREAK";
    NiVisaConstants[NiVisaConstants["VI_EVENT_ASRL_CTS"] = 1073684521] = "VI_EVENT_ASRL_CTS";
    NiVisaConstants[NiVisaConstants["VI_EVENT_ASRL_DSR"] = 1073684522] = "VI_EVENT_ASRL_DSR";
    NiVisaConstants[NiVisaConstants["VI_EVENT_ASRL_DCD"] = 1073684524] = "VI_EVENT_ASRL_DCD";
    NiVisaConstants[NiVisaConstants["VI_EVENT_ASRL_RI"] = 1073684526] = "VI_EVENT_ASRL_RI";
    NiVisaConstants[NiVisaConstants["VI_EVENT_ASRL_CHAR"] = 1073684533] = "VI_EVENT_ASRL_CHAR";
    NiVisaConstants[NiVisaConstants["VI_EVENT_ASRL_TERMCHAR"] = 1073684516] = "VI_EVENT_ASRL_TERMCHAR";
    /* This is for fast viPeek/viPoke macros */
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_SUB_MANF_ID"] = 1073676803] = "VI_ATTR_PXI_SUB_MANF_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_SUB_MODEL_CODE"] = 1073676804] = "VI_ATTR_PXI_SUB_MODEL_CODE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_PXI_USE_PREALLOC_POOL"] = 1073676815] = "VI_ATTR_PXI_USE_PREALLOC_POOL";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_BULK_OUT_PIPE"] = 1073676706] = "VI_ATTR_USB_BULK_OUT_PIPE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_BULK_IN_PIPE"] = 1073676707] = "VI_ATTR_USB_BULK_IN_PIPE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_INTR_IN_PIPE"] = 1073676708] = "VI_ATTR_USB_INTR_IN_PIPE";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_CLASS"] = 1073676709] = "VI_ATTR_USB_CLASS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_SUBCLASS"] = 1073676710] = "VI_ATTR_USB_SUBCLASS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_ALT_SETTING"] = 1073676712] = "VI_ATTR_USB_ALT_SETTING";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_END_IN"] = 1073676713] = "VI_ATTR_USB_END_IN";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_NUM_INTFCS"] = 1073676714] = "VI_ATTR_USB_NUM_INTFCS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_NUM_PIPES"] = 1073676715] = "VI_ATTR_USB_NUM_PIPES";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_BULK_OUT_STATUS"] = 1073676716] = "VI_ATTR_USB_BULK_OUT_STATUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_BULK_IN_STATUS"] = 1073676717] = "VI_ATTR_USB_BULK_IN_STATUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_INTR_IN_STATUS"] = 1073676718] = "VI_ATTR_USB_INTR_IN_STATUS";
    NiVisaConstants[NiVisaConstants["VI_ATTR_USB_CTRL_PIPE"] = 1073676720] = "VI_ATTR_USB_CTRL_PIPE";
    NiVisaConstants[NiVisaConstants["VI_USB_PIPE_STATE_UNKNOWN"] = -1] = "VI_USB_PIPE_STATE_UNKNOWN";
    NiVisaConstants[NiVisaConstants["VI_USB_PIPE_READY"] = 0] = "VI_USB_PIPE_READY";
    NiVisaConstants[NiVisaConstants["VI_USB_PIPE_STALLED"] = 1] = "VI_USB_PIPE_STALLED";
    NiVisaConstants[NiVisaConstants["VI_USB_END_NONE"] = 0] = "VI_USB_END_NONE";
    NiVisaConstants[NiVisaConstants["VI_USB_END_SHORT"] = 4] = "VI_USB_END_SHORT";
    NiVisaConstants[NiVisaConstants["VI_USB_END_SHORT_OR_COUNT"] = 5] = "VI_USB_END_SHORT_OR_COUNT";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FIREWIRE_DEST_UPPER_OFFSET"] = 1073676784] = "VI_ATTR_FIREWIRE_DEST_UPPER_OFFSET";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FIREWIRE_SRC_UPPER_OFFSET"] = 1073676785] = "VI_ATTR_FIREWIRE_SRC_UPPER_OFFSET";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FIREWIRE_WIN_UPPER_OFFSET"] = 1073676786] = "VI_ATTR_FIREWIRE_WIN_UPPER_OFFSET";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FIREWIRE_VENDOR_ID"] = 1073676787] = "VI_ATTR_FIREWIRE_VENDOR_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FIREWIRE_LOWER_CHIP_ID"] = 1073676788] = "VI_ATTR_FIREWIRE_LOWER_CHIP_ID";
    NiVisaConstants[NiVisaConstants["VI_ATTR_FIREWIRE_UPPER_CHIP_ID"] = 1073676789] = "VI_ATTR_FIREWIRE_UPPER_CHIP_ID";
    NiVisaConstants[NiVisaConstants["VI_FIREWIRE_DFLT_SPACE"] = 5] = "VI_FIREWIRE_DFLT_SPACE";
})(NiVisaConstants = exports.NiVisaConstants || (exports.NiVisaConstants = {}));
;


/***/ }),

/***/ "./src/ni-visa/ni_visa_types.ts":
/*!**************************************!*\
  !*** ./src/ni-visa/ni_visa_types.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViEventFilter = exports.ViPEventType = exports.ViEventType = exports.ViPJobId = exports.ViJobId = exports.ViPFindList = exports.ViFindList = exports.ViConstBuf = exports.ViPBuf = exports.ViBuf = exports.ViAccessMode = exports.ViConstRsrc = exports.ViRsrc = exports.ViConstString = exports.ViString = exports.ViPSession = exports.ViAttr = exports.ViPEvent = exports.ViEvent = exports.ViSession = exports.ViPObject = exports.ViObject = exports.ViPStatus = exports.ViStatus = exports.ViPByte = exports.ViByte = exports.ViPChar = exports.ViChar = exports.ViPUInt16 = exports.ViUInt16 = exports.ViPInt16 = exports.ViPUInt32 = exports.ViUInt32 = exports.ViPInt32 = exports.ViInt32 = exports.ViInt16 = void 0;
const ref_napi_1 = __importDefault(__webpack_require__(/*! ref-napi */ "ref-napi"));
exports.ViInt16 = ref_napi_1.default.types.int16;
exports.ViInt32 = ref_napi_1.default.types.int32;
exports.ViPInt32 = ref_napi_1.default.refType(exports.ViInt32);
exports.ViUInt32 = ref_napi_1.default.types.uint32;
exports.ViPUInt32 = ref_napi_1.default.refType(exports.ViUInt32);
exports.ViPInt16 = ref_napi_1.default.refType(exports.ViInt16);
exports.ViUInt16 = ref_napi_1.default.types.uint16;
exports.ViPUInt16 = ref_napi_1.default.refType(exports.ViUInt16);
exports.ViChar = ref_napi_1.default.types.char;
exports.ViPChar = ref_napi_1.default.refType(exports.ViChar);
exports.ViByte = ref_napi_1.default.types.uchar;
exports.ViPByte = ref_napi_1.default.refType(exports.ViByte);
// Note, this needs to be ViUInt32, not ViInt32 other we get negative hex
exports.ViStatus = exports.ViUInt32;
exports.ViPStatus = ref_napi_1.default.refType(exports.ViStatus);
exports.ViObject = exports.ViUInt32;
exports.ViPObject = ref_napi_1.default.refType(exports.ViObject);
exports.ViSession = exports.ViUInt32;
exports.ViEvent = exports.ViObject;
exports.ViPEvent = ref_napi_1.default.refType(exports.ViEvent);
exports.ViAttr = exports.ViUInt32;
exports.ViPSession = ref_napi_1.default.refType(exports.ViSession);
exports.ViString = exports.ViPChar;
exports.ViConstString = exports.ViString;
exports.ViRsrc = exports.ViString;
exports.ViConstRsrc = exports.ViConstString;
exports.ViAccessMode = exports.ViUInt32;
exports.ViBuf = exports.ViPByte;
exports.ViPBuf = exports.ViPByte;
exports.ViConstBuf = exports.ViPByte;
exports.ViFindList = exports.ViObject;
exports.ViPFindList = ref_napi_1.default.refType(exports.ViFindList);
exports.ViJobId = exports.ViUInt32;
exports.ViPJobId = ref_napi_1.default.refType(exports.ViJobId);
exports.ViEventType = exports.ViUInt32;
exports.ViPEventType = ref_napi_1.default.refType(exports.ViEventType);
exports.ViEventFilter = exports.ViUInt32;


/***/ }),

/***/ "./src/ni-visa/vi_close.ts":
/*!*********************************!*\
  !*** ./src/ni-visa/vi_close.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viClose = exports.ViCloseErrorCode = exports.ViCloseCompletionCode = void 0;
const ni_visa_1 = __webpack_require__(/*! ./ni_visa */ "./src/ni-visa/ni_visa.ts");
const VI_ERROR = 0x80000000;
var ViCloseCompletionCode;
(function (ViCloseCompletionCode) {
    ViCloseCompletionCode[ViCloseCompletionCode["VI_SUCCESS"] = 0] = "VI_SUCCESS";
    ViCloseCompletionCode[ViCloseCompletionCode["VI_WARN_NULL_OBJECT"] = 1073676418] = "VI_WARN_NULL_OBJECT"; // The specified object reference is uninitialized.
})(ViCloseCompletionCode = exports.ViCloseCompletionCode || (exports.ViCloseCompletionCode = {}));
var ViCloseErrorCode;
(function (ViCloseErrorCode) {
    ViCloseErrorCode[ViCloseErrorCode["VI_ERROR_CLOSING_FAILED"] = VI_ERROR + 0x3FFF0016] = "VI_ERROR_CLOSING_FAILED";
    ViCloseErrorCode[ViCloseErrorCode["VI_ERROR_INV_SESSION"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_SESSION";
    ViCloseErrorCode[ViCloseErrorCode["VI_ERROR_INV_OBJECT"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_OBJECT";
})(ViCloseErrorCode = exports.ViCloseErrorCode || (exports.ViCloseErrorCode = {}));
function viClose(viObject) {
    return new Promise((resolve, reject) => {
        let status = VI_ERROR;
        status = ni_visa_1.agVisa.viClose(viObject);
        switch (status) {
            case ViCloseCompletionCode.VI_SUCCESS:
            case ViCloseCompletionCode.VI_WARN_NULL_OBJECT: {
                resolve({ status: status });
            }
            default: {
                reject(`viClose Error: status: ${status}`);
            }
        }
    });
}
exports.viClose = viClose;


/***/ }),

/***/ "./src/ni-visa/vi_open.ts":
/*!********************************!*\
  !*** ./src/ni-visa/vi_open.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viOpen = exports.ViOpenErrorCode = exports.ViOpenCompletionCode = void 0;
const ni_visa_1 = __webpack_require__(/*! ./ni_visa */ "./src/ni-visa/ni_visa.ts");
const VI_ERROR = 0x80000000;
var ViOpenCompletionCode;
(function (ViOpenCompletionCode) {
    ViOpenCompletionCode[ViOpenCompletionCode["VI_SUCCESS"] = 0] = "VI_SUCCESS";
    ViOpenCompletionCode[ViOpenCompletionCode["VI_SUCCESS_DEV_NPRESENT"] = 1073676413] = "VI_SUCCESS_DEV_NPRESENT";
    ViOpenCompletionCode[ViOpenCompletionCode["VI_WARN_CONFIG_NLOADED"] = 1073676407] = "VI_WARN_CONFIG_NLOADED";
    ViOpenCompletionCode[ViOpenCompletionCode["VI_WARN_SERVER_CERT_UNTRUSTED"] = 1073676528] = "VI_WARN_SERVER_CERT_UNTRUSTED";
})(ViOpenCompletionCode = exports.ViOpenCompletionCode || (exports.ViOpenCompletionCode = {}));
var ViOpenErrorCode;
(function (ViOpenErrorCode) {
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_ALLOC"] = VI_ERROR + 0x3FFF003C] = "VI_ERROR_ALLOC";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_INTF_NUM_NCONFIG"] = VI_ERROR + 0x3FFF00A5] = "VI_ERROR_INTF_NUM_NCONFIG";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_INV_ACC_MODE"] = VI_ERROR + 0x3FFF0013] = "VI_ERROR_INV_ACC_MODE";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_INV_RSRC_NAME"] = VI_ERROR + 0x3FFF0012] = "VI_ERROR_INV_RSRC_NAME";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_INV_SESSION"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_SESSION";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_INV_OBJECT"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_OBJECT";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_INV_PROT"] = VI_ERROR + 0x3FFF0079] = "VI_ERROR_INV_PROT";
    // or the address string indicates a secure connection should be made, but the designated port is not for a TLS server. 
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_LIBRARY_NFOUND"] = VI_ERROR + 0x3FFF009E] = "VI_ERROR_LIBRARY_NFOUND";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_NPERMISSION"] = VI_ERROR + 0x3FFF00A8] = "VI_ERROR_NPERMISSION";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_NSUP_OPER"] = VI_ERROR + 0x3FFF0067] = "VI_ERROR_NSUP_OPER";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_RSRC_BUSY"] = VI_ERROR + 0x3FFF0072] = "VI_ERROR_RSRC_BUSY";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_RSRC_LOCKED"] = VI_ERROR + 0x3FFF000F] = "VI_ERROR_RSRC_LOCKED";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_RSRC_NFOUND"] = VI_ERROR + 0x3FFF0011] = "VI_ERROR_RSRC_NFOUND";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_SERVER_CERT"] = VI_ERROR + 0x3FFF00B0] = "VI_ERROR_SERVER_CERT";
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_TMO"] = VI_ERROR + 0x3FFF0015] = "VI_ERROR_TMO";
})(ViOpenErrorCode = exports.ViOpenErrorCode || (exports.ViOpenErrorCode = {}));
function viOpen(viSession, visa_resource, viAccessMode, timeout) {
    return new Promise((resolve, reject) => {
        let status = VI_ERROR;
        let bufferSession = Buffer.alloc(4); //u32
        status = ni_visa_1.agVisa.viOpen(viSession, visa_resource, viAccessMode, timeout, bufferSession);
        switch (status) {
            case ViOpenCompletionCode.VI_SUCCESS:
            case ViOpenCompletionCode.VI_SUCCESS_DEV_NPRESENT:
            case ViOpenCompletionCode.VI_WARN_CONFIG_NLOADED:
            case ViOpenCompletionCode.VI_WARN_SERVER_CERT_UNTRUSTED: {
                let session = bufferSession.readUInt32LE();
                resolve({ status: status, session: session });
            }
            default: {
                reject(`viOpen Error: status: ${status}`);
            }
        }
    });
}
exports.viOpen = viOpen;


/***/ }),

/***/ "./src/ni-visa/vi_open_default_r_m.ts":
/*!********************************************!*\
  !*** ./src/ni-visa/vi_open_default_r_m.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viOpenDefaultRM = exports.ViOpenDefaultRMErrorCode = exports.ViOpenDefaultRMCompletionCode = void 0;
const ni_visa_1 = __webpack_require__(/*! ./ni_visa */ "./src/ni-visa/ni_visa.ts");
const VI_ERROR = 0x80000000;
var ViOpenDefaultRMCompletionCode;
(function (ViOpenDefaultRMCompletionCode) {
    ViOpenDefaultRMCompletionCode[ViOpenDefaultRMCompletionCode["VI_SUCCESS"] = 0] = "VI_SUCCESS"; //Session to the Default Resource Manager resource created successfully.
})(ViOpenDefaultRMCompletionCode = exports.ViOpenDefaultRMCompletionCode || (exports.ViOpenDefaultRMCompletionCode = {}));
var ViOpenDefaultRMErrorCode;
(function (ViOpenDefaultRMErrorCode) {
    ViOpenDefaultRMErrorCode[ViOpenDefaultRMErrorCode["VI_ERROR_ALLOC"] = VI_ERROR + 0x3FFF003C] = "VI_ERROR_ALLOC";
    ViOpenDefaultRMErrorCode[ViOpenDefaultRMErrorCode["VI_ERROR_INV_SETUP"] = VI_ERROR + 0x3FFF003A] = "VI_ERROR_INV_SETUP";
    ViOpenDefaultRMErrorCode[ViOpenDefaultRMErrorCode["VI_ERROR_SYSTEM_ERROR"] = VI_ERROR + 0x3FFF0000] = "VI_ERROR_SYSTEM_ERROR";
})(ViOpenDefaultRMErrorCode = exports.ViOpenDefaultRMErrorCode || (exports.ViOpenDefaultRMErrorCode = {}));
function viOpenDefaultRM() {
    return new Promise((resolve, reject) => {
        let status = VI_ERROR;
        // allocate a buffer for the session response
        let buffer = Buffer.alloc(4);
        status = ni_visa_1.agVisa.viOpenDefaultRM(buffer);
        if (status === ViOpenDefaultRMCompletionCode.VI_SUCCESS) {
            let session = buffer.readUInt32LE();
            resolve({ status: status, defaultRM: session });
        }
        else {
            reject(`viOpenDefaultRM Error: status: ${status}`);
        }
    });
}
exports.viOpenDefaultRM = viOpenDefaultRM;


/***/ }),

/***/ "./src/ni-visa/vi_read.ts":
/*!********************************!*\
  !*** ./src/ni-visa/vi_read.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viRead = exports.ViReadErrorCode = exports.ViReadCompletionCode = void 0;
const ni_visa_1 = __webpack_require__(/*! ./ni_visa */ "./src/ni-visa/ni_visa.ts");
const VI_ERROR = 0x80000000;
var ViReadCompletionCode;
(function (ViReadCompletionCode) {
    ViReadCompletionCode[ViReadCompletionCode["VI_SUCCESS"] = 0] = "VI_SUCCESS";
    ViReadCompletionCode[ViReadCompletionCode["VI_SUCCESS_TERM_CHAR"] = 1073676293] = "VI_SUCCESS_TERM_CHAR";
    ViReadCompletionCode[ViReadCompletionCode["VI_SUCCESS_MAX_CNT"] = 1073676294] = "VI_SUCCESS_MAX_CNT";
})(ViReadCompletionCode = exports.ViReadCompletionCode || (exports.ViReadCompletionCode = {}));
var ViReadErrorCode;
(function (ViReadErrorCode) {
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_ASRL_FRAMING"] = VI_ERROR + 0x3FFF006B] = "VI_ERROR_ASRL_FRAMING";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_ASRL_OVERRUN"] = VI_ERROR + 0x3FFF006C] = "VI_ERROR_ASRL_OVERRUN";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_ASRL_PARITY"] = VI_ERROR + 0x3FFF006A] = "VI_ERROR_ASRL_PARITY";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_BERR"] = VI_ERROR + 0x3FFF0038] = "VI_ERROR_BERR";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_CONN_LOST"] = VI_ERROR + 0x3FFF00A6] = "VI_ERROR_CONN_LOST";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_INV_SESSION"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_SESSION";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_INV_OBJECT"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_OBJECT";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_INV_SETUP"] = VI_ERROR + 0x3FFF003A] = "VI_ERROR_INV_SETUP";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_IO"] = VI_ERROR + 0x3FFF003E] = "VI_ERROR_IO";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_NCIC"] = VI_ERROR + 0x3FFF0060] = "VI_ERROR_NCIC";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_NLISTENERS"] = VI_ERROR + 0x3FFF005F] = "VI_ERROR_NLISTENERS";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_NSUP_OPER"] = VI_ERROR + 0x3FFF0067] = "VI_ERROR_NSUP_OPER";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_OUTP_PROT_VIOL"] = VI_ERROR + 0x3FFF0036] = "VI_ERROR_OUTP_PROT_VIOL";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_RAW_RD_PROT_VIOL"] = VI_ERROR + 0x3FFF0035] = "VI_ERROR_RAW_RD_PROT_VIOL";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_RAW_WR_PROT_VIOL"] = VI_ERROR + 0x3FFF0034] = "VI_ERROR_RAW_WR_PROT_VIOL";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_RSRC_LOCKED"] = VI_ERROR + 0x3FFF000F] = "VI_ERROR_RSRC_LOCKED";
    ViReadErrorCode[ViReadErrorCode["VI_ERROR_TMO"] = VI_ERROR + 0x3FFF0015] = "VI_ERROR_TMO";
})(ViReadErrorCode = exports.ViReadErrorCode || (exports.ViReadErrorCode = {}));
function viRead(viSession, count) {
    return new Promise((resolve, reject) => {
        let status = VI_ERROR;
        let bufferRetCount = Buffer.alloc(4); //u32
        let bufferBuf = Buffer.alloc(count); //u32
        status = ni_visa_1.agVisa.viRead(viSession, bufferBuf, count, bufferRetCount);
        switch (status) {
            case ViReadCompletionCode.VI_SUCCESS:
            case ViReadCompletionCode.VI_SUCCESS_MAX_CNT:
            case ViReadCompletionCode.VI_SUCCESS_TERM_CHAR: {
                let retCount = bufferRetCount.readUInt32LE();
                let buf = bufferBuf.readCString();
                resolve({ status: status, retCount: retCount, buf: buf });
            }
            default: {
                reject(`viRead Error: status: ${status}`);
            }
        }
    });
}
exports.viRead = viRead;


/***/ }),

/***/ "./src/ni-visa/vi_write.ts":
/*!*********************************!*\
  !*** ./src/ni-visa/vi_write.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viWrite = exports.ViWriteErrorCode = exports.ViWriteCompletionCode = void 0;
const ni_visa_1 = __webpack_require__(/*! ./ni_visa */ "./src/ni-visa/ni_visa.ts");
const VI_ERROR = 0x80000000;
var ViWriteCompletionCode;
(function (ViWriteCompletionCode) {
    ViWriteCompletionCode[ViWriteCompletionCode["VI_SUCCESS"] = 0] = "VI_SUCCESS";
})(ViWriteCompletionCode = exports.ViWriteCompletionCode || (exports.ViWriteCompletionCode = {}));
var ViWriteErrorCode;
(function (ViWriteErrorCode) {
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_BERR"] = VI_ERROR + 0x3FFF0038] = "VI_ERROR_BERR";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_CONN_LOST"] = VI_ERROR + 0x3FFF00A6] = "VI_ERROR_CONN_LOST";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_INP_PROT_VIOL"] = VI_ERROR + 0x3FFF0037] = "VI_ERROR_INP_PROT_VIOL";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_INV_SESSION"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_SESSION";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_INV_OBJECT"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_OBJECT";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_INV_SETUP"] = VI_ERROR + 0x3FFF003A] = "VI_ERROR_INV_SETUP";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_IO"] = VI_ERROR + 0x3FFF003E] = "VI_ERROR_IO";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_NCIC"] = VI_ERROR + 0x3FFF0060] = "VI_ERROR_NCIC";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_NLISTENERS"] = VI_ERROR + 0x3FFF005F] = "VI_ERROR_NLISTENERS";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_NSUP_OPER"] = VI_ERROR + 0x3FFF0067] = "VI_ERROR_NSUP_OPER";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_RAW_RD_PROT_VIOL"] = VI_ERROR + 0x3FFF0035] = "VI_ERROR_RAW_RD_PROT_VIOL";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_RAW_WR_PROT_VIOL"] = VI_ERROR + 0x3FFF0034] = "VI_ERROR_RAW_WR_PROT_VIOL";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_RSRC_LOCKED"] = VI_ERROR + 0x3FFF000F] = "VI_ERROR_RSRC_LOCKED";
    ViWriteErrorCode[ViWriteErrorCode["VI_ERROR_TMO"] = VI_ERROR + 0x3FFF0015] = "VI_ERROR_TMO";
})(ViWriteErrorCode = exports.ViWriteErrorCode || (exports.ViWriteErrorCode = {}));
function viWrite(viSession, buff) {
    return new Promise((resolve, reject) => {
        let status = VI_ERROR;
        let bufferRetCount = Buffer.alloc(4); //u32
        status = ni_visa_1.agVisa.viWrite(viSession, buff, buff.length, bufferRetCount);
        switch (status) {
            case ViWriteCompletionCode.VI_SUCCESS: {
                let retCount = bufferRetCount.readUInt32LE();
                resolve({ status: status, retCount: retCount });
            }
            default: {
                reject(`viWrite Error: status: ${status}`);
            }
        }
    });
}
exports.viWrite = viWrite;


/***/ }),

/***/ "ffi-napi":
/*!***************************!*\
  !*** external "ffi-napi" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("ffi-napi");

/***/ }),

/***/ "ref-napi":
/*!***************************!*\
  !*** external "ref-napi" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("ref-napi");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RTtnQkFDcEQsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDbEQ7WUFDRCxPQUFPLENBQUMsQ0FBQztnQkFDTCxNQUFNLENBQUMsMEJBQTBCLE1BQU0sRUFBRSxDQUFDO2FBQzdDO1NBQ0o7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDO0FBbEJELDBCQWtCQzs7Ozs7Ozs7Ozs7QUMzQ0Q7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVzY3JpcHQtd2VicGFjay1taW4vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13ZWJwYWNrLW1pbi8uL3NyYy9uaS12aXNhL25pX3Zpc2EudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13ZWJwYWNrLW1pbi8uL3NyYy9uaS12aXNhL25pX3Zpc2FfY29uc3RhbnRzLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2VicGFjay1taW4vLi9zcmMvbmktdmlzYS9uaV92aXNhX3R5cGVzLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2VicGFjay1taW4vLi9zcmMvbmktdmlzYS92aV9jbG9zZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdlYnBhY2stbWluLy4vc3JjL25pLXZpc2Evdmlfb3Blbi50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdlYnBhY2stbWluLy4vc3JjL25pLXZpc2Evdmlfb3Blbl9kZWZhdWx0X3JfbS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdlYnBhY2stbWluLy4vc3JjL25pLXZpc2EvdmlfcmVhZC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdlYnBhY2stbWluLy4vc3JjL25pLXZpc2Evdmlfd3JpdGUudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13ZWJwYWNrLW1pbi9leHRlcm5hbCBjb21tb25qcyBcImZmaS1uYXBpXCIiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13ZWJwYWNrLW1pbi9leHRlcm5hbCBjb21tb25qcyBcInJlZi1uYXBpXCIiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13ZWJwYWNrLW1pbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdlYnBhY2stbWluL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13ZWJwYWNrLW1pbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13ZWJwYWNrLW1pbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmlzYUFzeW5jUXVlcnksIHZpc2FRdWVyeSwgdmlzYVF1ZXJ5VG9Qcm9taXNlIH0gZnJvbSAnLi9uaS12aXNhL25pX3Zpc2EnXHJcbmltcG9ydCB7IHZpQ2xvc2UgfSBmcm9tICcuL25pLXZpc2EvdmlfY2xvc2UnO1xyXG5pbXBvcnQgeyB2aU9wZW4gfSBmcm9tICcuL25pLXZpc2Evdmlfb3Blbic7XHJcbmltcG9ydCB7IHZpT3BlbkRlZmF1bHRSTSB9IGZyb20gJy4vbmktdmlzYS92aV9vcGVuX2RlZmF1bHRfcl9tJztcclxuaW1wb3J0IHsgdmlSZWFkIH0gZnJvbSAnLi9uaS12aXNhL3ZpX3JlYWQnO1xyXG5pbXBvcnQgeyB2aVdyaXRlIH0gZnJvbSAnLi9uaS12aXNhL3ZpX3dyaXRlJztcclxuXHJcblxyXG5jb25zdCB0ZXN0UmVzcG9uc2UgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCBzZXNzaW9uID0gMFxyXG4gICAgICAgIGNvbnN0IGEgPSBhd2FpdCB2aU9wZW5EZWZhdWx0Uk0oKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGEpXHJcbiAgICAgICAgY29uc3QgYiA9IGF3YWl0IHZpT3BlbihhLmRlZmF1bHRSTSwgJ1VTQjA6OjB4MDVFNjo6MHgyMTAwOjo4MDA0OTQ5OjowOjpJTlNUUicsIDAsIDUwMDApXHJcbiAgICAgICAgY29uc29sZS5sb2coYilcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYyA9IGF3YWl0IHZpV3JpdGUoYi5zZXNzaW9uLCAnKklETj9cXG4nKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZCA9IGF3YWl0IHZpUmVhZChiLnNlc3Npb24sIDUxMilcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHkgPSBhd2FpdCB2aUNsb3NlKGIuc2Vzc2lvbilcclxuICAgICAgICBjb25zb2xlLmxvZyh5KVxyXG5cclxuICAgICAgICBjb25zdCB6ID0gYXdhaXQgdmlDbG9zZShhLmRlZmF1bHRSTSlcclxuICAgICAgICBjb25zb2xlLmxvZyh6KVxyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGRldmljZVJlc3BvbmNlID0gXCJLRUlUSExFWSBJTlNUUlVNRU5UUyBJTkMuLE1PREVMIDIxMDAsMSwwMS4wOC0wMS0wMVwiXHJcbmxldCBlcnJvckNvdW50ID0gMDtcclxuY29uc3QgZm9yTG9vcCA9IGFzeW5jICgpID0+IHtcclxuXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gYXdhaXQgdmlzYVF1ZXJ5VG9Qcm9taXNlKCdVU0IwOjoweDA1RTY6OjB4MjEwMDo6ODAwNDk0OTo6MDo6SU5TVFInLCAnKklETj8nKVxyXG4gICAgICAgICAgICBpZiAoZGV2aWNlUmVzcG9uY2UgIT09IHJldCkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JDb3VudCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFRlc3QgTm8uOiAke2l9IEVyci4gQ291bnQ6ICR7ZXJyb3JDb3VudH0gUmVzcG9uY2U6ICR7cmV0fWApXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2Zvckxvb3AoKVxyXG5cclxudGVzdFJlc3BvbnNlKCkiLCJpbXBvcnQgeyBwbGF0Zm9ybSwgYXJjaCB9IGZyb20gJ29zJ1xyXG5pbXBvcnQgeyBMaWJyYXJ5IH0gZnJvbSAnZmZpLW5hcGknXHJcbmltcG9ydCB7IFZpQWNjZXNzTW9kZSwgVmlBdHRyLCBWaUV2ZW50LCBWaUV2ZW50RmlsdGVyLCBWaUV2ZW50VHlwZSwgVmlGaW5kTGlzdCwgVmlPYmplY3QsIFZpUEJ1ZiwgVmlQRXZlbnQsIFZpUEV2ZW50VHlwZSwgVmlQRmluZExpc3QsIFZpUEpvYklkLCBWaVBPYmplY3QsIFZpUFNlc3Npb24sIFZpUFN0YXR1cywgVmlQVUludDE2LCBWaVBVSW50MzIsIFZpU2Vzc2lvbiwgVmlTdGF0dXMsIFZpVUludDE2LCBWaVVJbnQzMiB9IGZyb20gJy4vbmlfdmlzYV90eXBlcydcclxuaW1wb3J0IHJlZiwgeyByZWFkSW50NjRMRSB9IGZyb20gJ3JlZi1uYXBpJztcclxuXHJcbmltcG9ydCB7IE5pVmlzYUNvbnN0YW50cyB9IGZyb20gJy4vbmlfdmlzYV9jb25zdGFudHMnO1xyXG4vL2ltcG9ydCB7IFZpQWNjZXNzTW9kZSB9IGZyb20gJy4vbmlfdmlzYV9jb25zdGFudHMnO1xyXG4vLyBDaG9vc2UgdGhlIHByb3BlciBETEwgbmFtZVxyXG4vLyBleHBvcnQgY29uc3QgbmlWaXNhID0gKGRsbE5hbWU6IHN0cmluZykgPT4ge1xyXG4vLyBcdHJldHVybkxpYnJhcnkoZGxsTmFtZSwge1xyXG4vLyBcdFx0Ly8gUmVzb3VyY2UgTWFuYWdlciBGdW5jdGlvbnMgYW5kIE9wZXJhdGlvbnNcclxuLy8gXHRcdCd2aU9wZW5EZWZhdWx0Uk0nOiBbVmlTdGF0dXMsIFtWaVBTZXNzaW9uXV0sXHJcbi8vIFx0XHQndmlGaW5kUnNyYyc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpUEZpbmRMaXN0LCBWaVBVSW50MzIsICdzdHJpbmcnXV0sXHJcbi8vIFx0XHQndmlGaW5kTmV4dCc6IFtWaVN0YXR1cywgW1ZpRmluZExpc3QsICdzdHJpbmcnXV0sXHJcbi8vIFx0XHQndmlQYXJzZVJzcmMnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVBVSW50MTYsIFZpUFVJbnQxNl1dLFxyXG4vLyBcdFx0J3ZpUGFyc2VSc3JjRXgnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVBVSW50MTYsIFZpUFVJbnQxNiwgJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJ11dLFxyXG4vLyBcdFx0J3ZpT3Blbic6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpQWNjZXNzTW9kZSwgVmlVSW50MzIsIFZpUFNlc3Npb25dXSxcclxuLy8gXHRcdC8vIFJlc291cmNlIFRlbXBsYXRlIE9wZXJhdGlvbnNcclxuLy8gXHRcdCd2aUNsb3NlJzogW1ZpU3RhdHVzLCBbVmlPYmplY3RdXSxcclxuLy8gXHRcdC8vIEJhc2ljIEkvTyBPcGVyYXRpb25zXHJcbi8vIFx0XHQndmlSZWFkJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCBWaVBCdWYsIFZpVUludDMyLCBWaVBVSW50MzJdXSxcclxuLy8gXHRcdCd2aVJlYWRUb0ZpbGUnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVVJbnQzMiwgVmlQVUludDMyXV0sXHJcbi8vIFx0XHQndmlXcml0ZSc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpVUludDMyLCBWaVBVSW50MzJdXSxcclxuLy8gXHR9KVxyXG4vLyB9XHJcbmV4cG9ydCBjb25zdCBhZ1Zpc2EgPSBMaWJyYXJ5KCcuL2FndmlzYTMyJywge1xyXG5cdC8vIFJlc291cmNlIE1hbmFnZXIgRnVuY3Rpb25zIGFuZCBPcGVyYXRpb25zXHJcblx0J3ZpT3BlbkRlZmF1bHRSTSc6IFtWaVN0YXR1cywgW1ZpUFNlc3Npb25dXSxcclxuXHQndmlGaW5kUnNyYyc6IFtWaVN0YXR1cywgW1ZpVUludDMyLCAnc3RyaW5nJywgVmlQRmluZExpc3QsIFZpUFVJbnQzMiwgJ3N0cmluZyddXSxcclxuXHQndmlGaW5kTmV4dCc6IFtWaVN0YXR1cywgW1ZpRmluZExpc3QsICdzdHJpbmcnXV0sXHJcblx0J3ZpUGFyc2VSc3JjJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlQVUludDE2LCBWaVBVSW50MTZdXSxcclxuXHQndmlQYXJzZVJzcmNFeCc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpUFVJbnQxNiwgVmlQVUludDE2LCAnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnXV0sXHJcblx0J3ZpT3Blbic6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpQWNjZXNzTW9kZSwgVmlVSW50MzIsIFZpUFNlc3Npb25dXSxcclxuXHQvLyBSZXNvdXJjZSBUZW1wbGF0ZSBPcGVyYXRpb25zXHJcblx0J3ZpQ2xvc2UnOiBbVmlTdGF0dXMsIFtWaU9iamVjdF1dLFxyXG5cdC8vIEJhc2ljIEkvTyBPcGVyYXRpb25zYFxyXG5cdCd2aVJlYWQnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sIFZpUEJ1ZiwgVmlVSW50MzIsIFZpUFVJbnQzMl1dLFxyXG5cdCd2aVJlYWRUb0ZpbGUnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVVJbnQzMiwgVmlQVUludDMyXV0sXHJcblx0J3ZpV3JpdGUnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVVJbnQzMiwgVmlQVUludDMyXV0sXHJcblx0Ly8gQXN5bmMgc3R1ZmZcclxuXHQndmlSZWFkQXN5bmMnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVVJbnQzMiwgVmlQSm9iSWRdXSxcclxuXHQndmlXcml0ZUFzeW5jJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlVSW50MzIsIFZpUEpvYklkXV0sXHJcblxyXG5cdC8vIEV2ZW50c1xyXG5cdCd2aUVuYWJsZUV2ZW50JzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCBWaUV2ZW50VHlwZSwgVmlVSW50MTYsIFZpRXZlbnRGaWx0ZXJdXSxcclxuXHQndmlEaXNhYmxlRXZlbnQnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sIFZpRXZlbnRUeXBlLCBWaVVJbnQxNl1dLFxyXG5cdCd2aVdhaXRPbkV2ZW50JzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCBWaUV2ZW50VHlwZSwgVmlVSW50MzIsIFZpUEV2ZW50VHlwZSwgVmlQRXZlbnRdXSxcclxuXHQndmlHZXRBdHRyaWJ1dGUnOiBbVmlTdGF0dXMsIFtWaUV2ZW50LCBWaUF0dHIsIFZpUE9iamVjdF1dXHJcblxyXG59KVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHZpT3BlbkRlZmF1bHRSTSgpOiB7IHN0YXR1czogbnVtYmVyLCBkZWZhdWx0Uk06IG51bWJlciB9IHtcclxuXHJcbi8vIFx0bGV0IHN0YXR1czogbnVtYmVyID0gMVxyXG4vLyBcdGxldCBwU2VzbiA9IHJlZi5hbGxvYyhWaVBTZXNzaW9uKTtcclxuLy8gXHRzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuRGVmYXVsdFJNKHBTZXNuKVxyXG4vLyBcdHJldHVybiB7IHN0YXR1czogc3RhdHVzLCBkZWZhdWx0Uk06IHBTZXNuLnJlYWRJbnQzMkxFKCkgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdmlPcGVuKHZpU2Vzc2lvbjogbnVtYmVyLCB2aXNhX3Jlc291cmNlOiBzdHJpbmcsIHZpQWNjZXNzTW9kZTogbnVtYmVyLCB0aW1lb3V0OiBudW1iZXIpOiB7IHN0YXR1czogbnVtYmVyLCB2aVNlc3Npb246IG51bWJlciB9IHtcclxuXHJcbi8vIFx0bGV0IHAgPSByZWYuYWxsb2MoVmlQU2Vzc2lvbik7XHJcbi8vIFx0bGV0IHN0YXR1czogbnVtYmVyID0gMVxyXG4vLyBcdHN0YXR1cyA9IGFnVmlzYS52aU9wZW4odmlTZXNzaW9uLCB2aXNhX3Jlc291cmNlLCB2aUFjY2Vzc01vZGUsIHRpbWVvdXQsIHApXHJcbi8vIFx0cmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMsIHZpU2Vzc2lvbjogcC5yZWFkSW50MzJMRSgpIH1cclxuXHJcbi8vIH1cclxuXHJcbi8vIHNcclxuZXhwb3J0IGZ1bmN0aW9uIHZpUmVhZCh2aVNlc3Npb246IG51bWJlciwgY291bnQ6IG51bWJlcik6IHsgc3RhdHVzOiBudW1iZXIsIHJldEJ1ZmY6IHN0cmluZywgcmV0Q291bnQ6IG51bWJlciB9IHtcclxuXHJcblx0bGV0IHN0YXR1czogbnVtYmVyID0gMVxyXG5cdGxldCBidWZmID0gcmVmLmFsbG9jKFZpUEJ1Zik7XHJcblx0bGV0IHJldENvdW50ID0gcmVmLmFsbG9jKFZpUFVJbnQzMik7XHJcblx0c3RhdHVzID0gYWdWaXNhLnZpUmVhZCh2aVNlc3Npb24sIGJ1ZmYsIGNvdW50LCByZXRDb3VudClcclxuXHRyZXR1cm4ge1xyXG5cdFx0c3RhdHVzOiBzdGF0dXMsXHJcblx0XHRyZXRCdWZmOiBidWZmLnJlYWRDU3RyaW5nKCkuc3Vic3RyaW5nKDAsIHJldENvdW50LnJlYWRJbnQzMkxFKCkpLFxyXG5cdFx0cmV0Q291bnQ6IHJldENvdW50LnJlYWRJbnQzMkxFKClcclxuXHR9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiB2aUNsb3NlKHZpT2JqZWN0OiBudW1iZXIpOiB7IHN0YXR1czogbnVtYmVyIH0ge1xyXG4vLyBcdGxldCBzdGF0dXMgPSBhZ1Zpc2EudmlDbG9zZSh2aU9iamVjdClcclxuLy8gXHRyZXR1cm4geyBzdGF0dXM6IHN0YXR1cyB9XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2aXNhUXVlcnkodmlzYUFkZHJlc3M6IHN0cmluZywgcXVlcnlTdHJpbmc6IHN0cmluZywgY2FsbGJhY2s6IChzdGF0dXM6IG51bWJlciwgcmV0dXJuQnVmZmVyOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuXHJcblx0Y29uc29sZS5sb2coXCJoZWxsb1wiKVxyXG5cdGxldCBxdWVyeVN0ciA9IHF1ZXJ5U3RyaW5nICsgJ1xcbic7XHJcblxyXG5cdGxldCBzdGF0dXM6IG51bWJlciA9IDFcclxuXHRsZXQgcFNlc24gPSByZWYuYWxsb2MoVmlQU2Vzc2lvbik7XHJcblx0c3RhdHVzID0gYWdWaXNhLnZpT3BlbkRlZmF1bHRSTShwU2VzbilcclxuXHJcblx0aWYgKHN0YXR1cykgcmV0dXJuIGNhbGxiYWNrKHN0YXR1cywgXCIxXCIpO1xyXG5cclxuXHQvLyBvcGVuIHNlc3Npb24gdG8gZGV2aWNlXHJcblxyXG5cdGxldCBkZXZpY2VTZXNzaW9uID0gcmVmLmFsbG9jKFZpUFNlc3Npb24pO1xyXG5cdHN0YXR1cyA9IGFnVmlzYS52aU9wZW4ocFNlc24ucmVhZEludDMyTEUoKSwgdmlzYUFkZHJlc3MsIDAsIDIwMDAsIGRldmljZVNlc3Npb24pXHJcblxyXG5cdGlmIChzdGF0dXMpIHJldHVybiBjYWxsYmFjayhzdGF0dXMsIFwiMlwiKTtcclxuXHJcblxyXG5cdC8vIHdyaXRlIHF1ZXJ5IHRvIGRldmljZVxyXG5cdGxldCBjb3VudCA9IHF1ZXJ5U3RyaW5nLmxlbmd0aFxyXG5cdGxldCByZXRDb3VudCA9IHJlZi5hbGxvYyhWaVBVSW50MzIpO1xyXG5cdHN0YXR1cyA9IGFnVmlzYS52aVdyaXRlKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgcXVlcnlTdHJpbmcsIGNvdW50LCByZXRDb3VudClcclxuXHJcblx0aWYgKHN0YXR1cykgcmV0dXJuIGNhbGxiYWNrKHN0YXR1cywgXCIzXCIpO1xyXG5cdC8vIHJlYWQgYmFjayBxdWVyeSByZXN1bHRcclxuXHJcblxyXG5cdGxldCBidWZmID0gcmVmLmFsbG9jKFZpUEJ1Zik7XHJcblx0cmV0Q291bnQgPSByZWYuYWxsb2MoVmlQVUludDMyKTtcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpUmVhZChkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIGJ1ZmYsIDUxMiwgcmV0Q291bnQpXHJcblx0bGV0IGJ1ZmZlclNpemUgPSByZXRDb3VudC5yZWFkSW50MzJMRSgpXHJcblx0bGV0IHJldHVybkJ1ZmZlciA9IGJ1ZmYucmVhZENTdHJpbmcoKS5zdWJzdHJpbmcoMCwgcmV0Q291bnQucmVhZEludDMyTEUoKSlcclxuXHJcblx0aWYgKHN0YXR1cykgcmV0dXJuIGNhbGxiYWNrKHN0YXR1cywgXCI0XCIpO1xyXG5cdC8vIGNsb3NlIHNlc3Npb24gb2YgZGV2aWNlIGFuZCByZXNvdXJjZSBtYW5hZ2VyXHJcblx0YWdWaXNhLnZpQ2xvc2UoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpKTtcclxuXHRhZ1Zpc2EudmlDbG9zZShwU2Vzbi5yZWFkSW50MzJMRSgpKTtcclxuXHQvLyByZXR1cm4gcXVlcnkgcmVzdWx0XHJcblx0Y2FsbGJhY2soc3RhdHVzLCByZXR1cm5CdWZmZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlzYUFzeW5jUXVlcnkodmlzYUFkZHJlc3M6IHN0cmluZywgcXVlcnlTdHJpbmc6IHN0cmluZywgY2FsbGJhY2s6IChzdGF0dXM6IG51bWJlciwgcmV0dXJuQnVmZmVyOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuXHJcblx0Ly9jb25zb2xlLmxvZyhcImhlbGxvXCIpXHJcblx0bGV0IHF1ZXJ5U3RyID0gcXVlcnlTdHJpbmcgKyAnXFxuJztcclxuXHJcblx0bGV0IHN0YXR1czogbnVtYmVyID0gMVxyXG5cdGxldCBwU2VzbiA9IHJlZi5hbGxvYyhWaVBTZXNzaW9uKTtcclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuRGVmYXVsdFJNKHBTZXNuKVxyXG5cclxuXHRpZiAoc3RhdHVzKSByZXR1cm4gY2FsbGJhY2soc3RhdHVzLCBcIjFcIik7XHJcblxyXG5cdC8vIG9wZW4gc2Vzc2lvbiB0byBkZXZpY2VcclxuXHJcblx0bGV0IGRldmljZVNlc3Npb24gPSByZWYuYWxsb2MoVmlQU2Vzc2lvbik7XHJcblx0c3RhdHVzID0gYWdWaXNhLnZpT3BlbihwU2Vzbi5yZWFkSW50MzJMRSgpLCB2aXNhQWRkcmVzcywgMCwgMjAwMCwgZGV2aWNlU2Vzc2lvbilcclxuXHJcblx0aWYgKHN0YXR1cykgcmV0dXJuIGNhbGxiYWNrKHN0YXR1cywgXCIyXCIpO1xyXG5cclxuXHJcblx0Ly8gd3JpdGUgcXVlcnkgdG8gZGV2aWNlXHJcblx0bGV0IGNvdW50ID0gcXVlcnlTdHJpbmcubGVuZ3RoXHJcblx0bGV0IHJldENvdW50ID0gcmVmLmFsbG9jKFZpUFVJbnQzMik7XHJcblx0Ly8gRW5hYmxlIHRoZSB0aGUgZXZlbnRcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpRW5hYmxlRXZlbnQoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfRVZFTlRfSU9fQ09NUExFVElPTiwgTmlWaXNhQ29uc3RhbnRzLlZJX1FVRVVFLCBOaVZpc2FDb25zdGFudHMuVklfTlVMTClcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpV3JpdGUoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBxdWVyeVN0cmluZywgY291bnQsIHJldENvdW50KVxyXG5cclxuXHRpZiAoc3RhdHVzKSByZXR1cm4gY2FsbGJhY2soc3RhdHVzLCBcIjNcIik7XHJcblx0Ly8gcmVhZCBiYWNrIHF1ZXJ5IHJlc3VsdFxyXG5cclxuXHJcblxyXG5cdGxldCBidWZmID0gcmVmLmFsbG9jKFZpUEJ1Zik7XHJcblx0bGV0IGpJZCA9IHJlZi5hbGxvYyhWaVBKb2JJZCk7XHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aVJlYWRBc3luYyhkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIGJ1ZmYgYXMgYW55LCA1MTIsIGpJZClcclxuXHJcblx0bGV0IGpvYklkID0gaklkLnJlYWRJbnQzMkxFKClcclxuXHQvL2NvbnNvbGUubG9nKGBKb2JJZDogJHtqb2JJZH1gKVxyXG5cclxuXHRsZXQgZXZlbnRUeXBlID0gcmVmLmFsbG9jKFZpUEV2ZW50VHlwZSk7XHJcblx0bGV0IGV2ZW50Q29udGV4dCA9IHJlZi5hbGxvYyhWaVBFdmVudClcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpV2FpdE9uRXZlbnQoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfRVZFTlRfSU9fQ09NUExFVElPTiwgMjAwMCwgZXZlbnRUeXBlLCBldmVudENvbnRleHQpXHJcblx0Ly9cclxuXHJcblx0Ly9sZXQgcmV0dXJuQnVmZmVyID0gYnVmZi5yZWFkQ1N0cmluZygpLnN1YnN0cmluZygwLHJldENvdW50LnJlYWRJbnQzMkxFKCkpXHJcblxyXG5cdC8vY29uc29sZS5sb2coYENvbXBsZXRlZGApXHJcblxyXG5cdGxldCBldmVudFBSZXR1cm5lZEV2ZW50VHlwZSA9IHJlZi5hbGxvYyhWaVBPYmplY3QpXHJcblx0bGV0IGV2ZW50UEpvYklkID0gcmVmLmFsbG9jKFZpUEpvYklkKVxyXG5cdGxldCBldmVudFBSZXR1cm5QU3RhdHVzID0gcmVmLmFsbG9jKFZpUFN0YXR1cylcclxuXHRsZXQgZXZlbnRQUmV0dXJuQ291bnQgPSByZWYuYWxsb2MoVmlQVUludDMyKVxyXG5cdGxldCBldmVudFBSZXR1cm5lZEJ1ZmZlciA9IHJlZi5hbGxvYyhWaVBCdWYpXHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfRVZFTlRfVFlQRSwgZXZlbnRQUmV0dXJuZWRFdmVudFR5cGUpXHJcblx0bGV0IGV2ZW50UmV0dXJuZWRFdmVudFR5cGUgPSBldmVudFBSZXR1cm5lZEV2ZW50VHlwZS5yZWFkSW50MzJMRSgpXHJcblx0Ly9jb25zb2xlLmxvZyhgZXZlbnRSZXR1cm5lZEV2ZW50VHlwZTogJHtldmVudFJldHVybmVkRXZlbnRUeXBlfWApXHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfSk9CX0lELCBldmVudFBKb2JJZClcclxuXHRsZXQgZXZlbnRKb2JJZCA9IGV2ZW50UEpvYklkLnJlYWRJbnQzMkxFKClcclxuXHQvL2NvbnNvbGUubG9nKGBldmVudEpvYklkOiAke2V2ZW50Sm9iSWR9YClcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9TVEFUVVMsIGV2ZW50UFJldHVyblBTdGF0dXMpXHJcblx0bGV0IHJldHVyblN0YXR1cyA9IGV2ZW50UFJldHVyblBTdGF0dXMucmVhZEludDMyTEUoKVxyXG5cdC8vY29uc29sZS5sb2coYHJldHVyblN0YXR1czogJHtyZXR1cm5TdGF0dXN9YClcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9SRVRfQ09VTlQsIGV2ZW50UFJldHVybkNvdW50KVxyXG5cdGxldCBldmVudFJldHVybkNvdW50ID0gZXZlbnRQUmV0dXJuQ291bnQucmVhZEludDMyTEUoKVxyXG5cdC8vY29uc29sZS5sb2coYGV2ZW50UmV0dXJuQ291bnQ6ICR7ZXZlbnRSZXR1cm5Db3VudH1gKVxyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX0JVRkZFUiwgZXZlbnRQUmV0dXJuZWRCdWZmZXIpXHJcblx0bGV0IFJldHVybkJ1ZmZlciA9IGJ1ZmYucmVhZENTdHJpbmcoKS5zdWJzdHJpbmcoMCwgZXZlbnRSZXR1cm5Db3VudClcclxuXHQvL2NvbnNvbGUubG9nKGBSZXR1cm5CdWZmZXI6ICR7UmV0dXJuQnVmZmVyfWApXHJcblxyXG5cdGlmIChzdGF0dXMpIHJldHVybiBjYWxsYmFjayhzdGF0dXMsIFwiNFwiKTtcclxuXHQvLyBjbG9zZSBzZXNzaW9uIG9mIGRldmljZSBhbmQgcmVzb3VyY2UgbWFuYWdlclxyXG5cdGFnVmlzYS52aUNsb3NlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpKTtcclxuXHRhZ1Zpc2EudmlDbG9zZShkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCkpO1xyXG5cdGFnVmlzYS52aUNsb3NlKHBTZXNuLnJlYWRJbnQzMkxFKCkpO1xyXG5cdC8vIHJldHVybiBxdWVyeSByZXN1bHRcclxuXHRjYWxsYmFjayhzdGF0dXMsIFJldHVybkJ1ZmZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2aXNhUXVlcnlUb1Byb21pc2UodmlzYUFkZHJlc3M6IHN0cmluZywgcXVlcnlTdHJpbmc6IHN0cmluZywpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdC8vY29uc29sZS5sb2coXCJoZWxsb1wiKVxyXG5cdFx0bGV0IHF1ZXJ5U3RyID0gcXVlcnlTdHJpbmcgKyAnXFxuJztcclxuXHJcblx0XHRsZXQgc3RhdHVzOiBudW1iZXIgPSAxXHJcblx0XHRsZXQgcFNlc24gPSByZWYuYWxsb2MoVmlQU2Vzc2lvbik7XHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuRGVmYXVsdFJNKHBTZXNuKVxyXG5cclxuXHRcdGlmIChzdGF0dXMpIHtcclxuXHRcdFx0cmVqZWN0KHN0YXR1cylcclxuXHRcdH1cclxuXHJcblx0XHQvLyBvcGVuIHNlc3Npb24gdG8gZGV2aWNlXHJcblxyXG5cdFx0bGV0IGRldmljZVNlc3Npb24gPSByZWYuYWxsb2MoVmlQU2Vzc2lvbik7XHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuKHBTZXNuLnJlYWRJbnQzMkxFKCksIHZpc2FBZGRyZXNzLCAwLCAyMDAwLCBkZXZpY2VTZXNzaW9uKVxyXG5cclxuXHRcdGlmIChzdGF0dXMpIHtcclxuXHRcdFx0cmVqZWN0KHN0YXR1cylcclxuXHRcdH1cclxuXHJcblx0XHQvLyB3cml0ZSBxdWVyeSB0byBkZXZpY2VcclxuXHRcdGxldCBjb3VudCA9IHF1ZXJ5U3RyaW5nLmxlbmd0aFxyXG5cdFx0bGV0IHJldENvdW50ID0gcmVmLmFsbG9jKFZpUFVJbnQzMik7XHJcblx0XHQvLyBFbmFibGUgdGhlIHRoZSBldmVudFxyXG5cclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aUVuYWJsZUV2ZW50KGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0VWRU5UX0lPX0NPTVBMRVRJT04sIE5pVmlzYUNvbnN0YW50cy5WSV9RVUVVRSwgTmlWaXNhQ29uc3RhbnRzLlZJX05VTEwpXHJcblxyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpV3JpdGUoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBxdWVyeVN0cmluZywgY291bnQsIHJldENvdW50KVxyXG5cclxuXHRcdGlmIChzdGF0dXMpIHtcclxuXHRcdFx0cmVqZWN0KHN0YXR1cylcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly9sZXQgYnVmZiA9IHJlZi5hbGxvYyhWaVBCdWYpO1xyXG5cdFx0bGV0IGJ1ZmYgPSBuZXcgQnVmZmVyKDUxMik7XHJcblx0XHRsZXQgaklkID0gcmVmLmFsbG9jKFZpUEpvYklkKTtcclxuXHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlSZWFkQXN5bmMoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBidWZmIGFzIGFueSwgNTEyLCBqSWQpXHJcblxyXG5cdFx0bGV0IGpvYklkID0gaklkLnJlYWRJbnQzMkxFKClcclxuXHRcdC8vY29uc29sZS5sb2coYEpvYklkOiAke2pvYklkfWApXHJcblxyXG5cdFx0bGV0IGV2ZW50VHlwZSA9IHJlZi5hbGxvYyhWaVBFdmVudFR5cGUpO1xyXG5cdFx0bGV0IGV2ZW50Q29udGV4dCA9IHJlZi5hbGxvYyhWaVBFdmVudClcclxuXHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlXYWl0T25FdmVudChkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9FVkVOVF9JT19DT01QTEVUSU9OLCAyMDAwLCBldmVudFR5cGUsIGV2ZW50Q29udGV4dClcclxuXHRcdC8vXHJcblxyXG5cdFx0Ly9sZXQgcmV0dXJuQnVmZmVyID0gYnVmZi5yZWFkQ1N0cmluZygpLnN1YnN0cmluZygwLHJldENvdW50LnJlYWRJbnQzMkxFKCkpXHJcblxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgQ29tcGxldGVkYClcclxuXHJcblx0XHRsZXQgZXZlbnRQUmV0dXJuZWRFdmVudFR5cGUgPSByZWYuYWxsb2MoVmlQT2JqZWN0KVxyXG5cdFx0bGV0IGV2ZW50UEpvYklkID0gcmVmLmFsbG9jKFZpUEpvYklkKVxyXG5cdFx0bGV0IGV2ZW50UFJldHVyblBTdGF0dXMgPSByZWYuYWxsb2MoVmlQU3RhdHVzKVxyXG5cdFx0bGV0IGV2ZW50UFJldHVybkNvdW50ID0gcmVmLmFsbG9jKFZpUFVJbnQzMilcclxuXHRcdGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKDI1MClcclxuXHRcdC8vbGV0IGV2ZW50UFJldHVybmVkQnVmZmVyID0gcmVmLnJlZihWaVBCdWYpXHJcblxyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9FVkVOVF9UWVBFLCBldmVudFBSZXR1cm5lZEV2ZW50VHlwZSlcclxuXHRcdGxldCBldmVudFJldHVybmVkRXZlbnRUeXBlID0gZXZlbnRQUmV0dXJuZWRFdmVudFR5cGUucmVhZEludDMyTEUoKVxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgZXZlbnRSZXR1cm5lZEV2ZW50VHlwZTogJHtldmVudFJldHVybmVkRXZlbnRUeXBlfWApXHJcblxyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9KT0JfSUQsIGV2ZW50UEpvYklkKVxyXG5cdFx0bGV0IGV2ZW50Sm9iSWQgPSBldmVudFBKb2JJZC5yZWFkSW50MzJMRSgpXHJcblx0XHQvL2NvbnNvbGUubG9nKGBldmVudEpvYklkOiAke2V2ZW50Sm9iSWR9YClcclxuXHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX1NUQVRVUywgZXZlbnRQUmV0dXJuUFN0YXR1cylcclxuXHRcdGxldCByZXR1cm5TdGF0dXMgPSBldmVudFBSZXR1cm5QU3RhdHVzLnJlYWRJbnQzMkxFKClcclxuXHRcdC8vY29uc29sZS5sb2coYHJldHVyblN0YXR1czogJHtyZXR1cm5TdGF0dXN9YClcclxuXHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX1JFVF9DT1VOVCwgZXZlbnRQUmV0dXJuQ291bnQpXHJcblx0XHRsZXQgZXZlbnRSZXR1cm5Db3VudCA9IGV2ZW50UFJldHVybkNvdW50LnJlYWRJbnQzMkxFKClcclxuXHRcdC8vY29uc29sZS5sb2coYGV2ZW50UmV0dXJuQ291bnQ6ICR7ZXZlbnRSZXR1cm5Db3VudH1gKVxyXG5cclxuXHRcdC8vc3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9CVUZGRVIsIGJ1ZmZlcilcclxuXHRcdGxldCBSZXR1cm5CdWZmZXIgPSBidWZmLnJlYWRDU3RyaW5nKClcclxuXHRcdC8vY29uc29sZS5sb2coYFJldHVybkJ1ZmZlcjogJHtSZXR1cm5CdWZmZXJ9YClcclxuXHJcblx0XHRpZiAoc3RhdHVzKSB7XHJcblx0XHRcdHJlamVjdChzdGF0dXMpXHJcblx0XHR9XHJcblx0XHQvLyBjbG9zZSBzZXNzaW9uIG9mIGRldmljZSBhbmQgcmVzb3VyY2UgbWFuYWdlclxyXG5cdFx0YWdWaXNhLnZpQ2xvc2UoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCkpO1xyXG5cdFx0YWdWaXNhLnZpQ2xvc2UoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpKTtcclxuXHRcdGFnVmlzYS52aUNsb3NlKHBTZXNuLnJlYWRJbnQzMkxFKCkpO1xyXG5cdFx0Ly8gcmV0dXJuIHF1ZXJ5IHJlc3VsdFxyXG5cdFx0cmVzb2x2ZShSZXR1cm5CdWZmZXIpO1xyXG5cclxuXHR9KVxyXG59IiwiZXhwb3J0IGVudW0gVmlBY2Nlc3NNb2RlIHtcclxuXHRWSV9OT19MT0NLID0gKDApLFxyXG5cdFZJX0VYQ0xVU0lWRV9MT0NLID0gKDEpLFxyXG5cdFZJX1NIQVJFRF9MT0NLID0gKDIpLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBOaVZpc2FDb25zdGFudHMge1xyXG5cclxuXHRWSV9OVUxMID0gKDB4MCksXHJcbiAgICBWSV9FUlJPUiA9IDB4ODAwMDAwMDAsXHJcblxyXG5cdFZJX1NQRUNfVkVSU0lPTiA9ICgweDAwNTAwODAwKSxcclxuXHJcblx0VklfQVRUUl9SU1JDX0NMQVNTID0gKDB4QkZGRjAwMDEpLFxyXG5cdFZJX0FUVFJfUlNSQ19OQU1FID0gKDB4QkZGRjAwMDIpLFxyXG5cdFZJX0FUVFJfUlNSQ19JTVBMX1ZFUlNJT04gPSAoMHgzRkZGMDAwMyksXHJcblx0VklfQVRUUl9SU1JDX0xPQ0tfU1RBVEUgPSAoMHgzRkZGMDAwNCksXHJcblx0VklfQVRUUl9NQVhfUVVFVUVfTEVOR1RIID0gKDB4M0ZGRjAwMDUpLFxyXG5cdFZJX0FUVFJfVVNFUl9EQVRBXzMyID0gKDB4M0ZGRjAwMDcpLFxyXG5cdFZJX0FUVFJfRkRDX0NITkwgPSAoMHgzRkZGMDAwRCksXHJcblx0VklfQVRUUl9GRENfTU9ERSA9ICgweDNGRkYwMDBGKSxcclxuXHRWSV9BVFRSX0ZEQ19HRU5fU0lHTkFMX0VOID0gKDB4M0ZGRjAwMTEpLFxyXG5cdFZJX0FUVFJfRkRDX1VTRV9QQUlSID0gKDB4M0ZGRjAwMTMpLFxyXG5cdFZJX0FUVFJfU0VORF9FTkRfRU4gPSAoMHgzRkZGMDAxNiksXHJcblx0VklfQVRUUl9URVJNQ0hBUiA9ICgweDNGRkYwMDE4KSxcclxuXHRWSV9BVFRSX1RNT19WQUxVRSA9ICgweDNGRkYwMDFBKSxcclxuXHRWSV9BVFRSX0dQSUJfUkVBRERSX0VOID0gKDB4M0ZGRjAwMUIpLFxyXG5cdFZJX0FUVFJfSU9fUFJPVCA9ICgweDNGRkYwMDFDKSxcclxuXHRWSV9BVFRSX0RNQV9BTExPV19FTiA9ICgweDNGRkYwMDFFKSxcclxuXHRWSV9BVFRSX0FTUkxfQkFVRCA9ICgweDNGRkYwMDIxKSxcclxuXHRWSV9BVFRSX0FTUkxfREFUQV9CSVRTID0gKDB4M0ZGRjAwMjIpLFxyXG5cdFZJX0FUVFJfQVNSTF9QQVJJVFkgPSAoMHgzRkZGMDAyMyksXHJcblx0VklfQVRUUl9BU1JMX1NUT1BfQklUUyA9ICgweDNGRkYwMDI0KSxcclxuXHRWSV9BVFRSX0FTUkxfRkxPV19DTlRSTCA9ICgweDNGRkYwMDI1KSxcclxuXHRWSV9BVFRSX1JEX0JVRl9PUEVSX01PREUgPSAoMHgzRkZGMDAyQSksXHJcblx0VklfQVRUUl9SRF9CVUZfU0laRSA9ICgweDNGRkYwMDJCKSxcclxuXHRWSV9BVFRSX1dSX0JVRl9PUEVSX01PREUgPSAoMHgzRkZGMDAyRCksXHJcblx0VklfQVRUUl9XUl9CVUZfU0laRSA9ICgweDNGRkYwMDJFKSxcclxuXHRWSV9BVFRSX1NVUFBSRVNTX0VORF9FTiA9ICgweDNGRkYwMDM2KSxcclxuXHRWSV9BVFRSX1RFUk1DSEFSX0VOID0gKDB4M0ZGRjAwMzgpLFxyXG5cdFZJX0FUVFJfREVTVF9BQ0NFU1NfUFJJViA9ICgweDNGRkYwMDM5KSxcclxuXHRWSV9BVFRSX0RFU1RfQllURV9PUkRFUiA9ICgweDNGRkYwMDNBKSxcclxuXHRWSV9BVFRSX1NSQ19BQ0NFU1NfUFJJViA9ICgweDNGRkYwMDNDKSxcclxuXHRWSV9BVFRSX1NSQ19CWVRFX09SREVSID0gKDB4M0ZGRjAwM0QpLFxyXG5cdFZJX0FUVFJfU1JDX0lOQ1JFTUVOVCA9ICgweDNGRkYwMDQwKSxcclxuXHRWSV9BVFRSX0RFU1RfSU5DUkVNRU5UID0gKDB4M0ZGRjAwNDEpLFxyXG5cdFZJX0FUVFJfV0lOX0FDQ0VTU19QUklWID0gKDB4M0ZGRjAwNDUpLFxyXG5cdFZJX0FUVFJfV0lOX0JZVEVfT1JERVIgPSAoMHgzRkZGMDA0NyksXHJcblx0VklfQVRUUl9HUElCX0FUTl9TVEFURSA9ICgweDNGRkYwMDU3KSxcclxuXHRWSV9BVFRSX0dQSUJfQUREUl9TVEFURSA9ICgweDNGRkYwMDVDKSxcclxuXHRWSV9BVFRSX0dQSUJfQ0lDX1NUQVRFID0gKDB4M0ZGRjAwNUUpLFxyXG5cdFZJX0FUVFJfR1BJQl9OREFDX1NUQVRFID0gKDB4M0ZGRjAwNjIpLFxyXG5cdFZJX0FUVFJfR1BJQl9TUlFfU1RBVEUgPSAoMHgzRkZGMDA2NyksXHJcblx0VklfQVRUUl9HUElCX1NZU19DTlRSTF9TVEFURSA9ICgweDNGRkYwMDY4KSxcclxuXHRWSV9BVFRSX0dQSUJfSFM0ODhfQ0JMX0xFTiA9ICgweDNGRkYwMDY5KSxcclxuXHRWSV9BVFRSX0NNRFJfTEEgPSAoMHgzRkZGMDA2QiksXHJcblx0VklfQVRUUl9WWElfREVWX0NMQVNTID0gKDB4M0ZGRjAwNkMpLFxyXG5cdFZJX0FUVFJfTUFJTkZSQU1FX0xBID0gKDB4M0ZGRjAwNzApLFxyXG5cdFZJX0FUVFJfTUFORl9OQU1FID0gKDB4QkZGRjAwNzIpLFxyXG5cdFZJX0FUVFJfTU9ERUxfTkFNRSA9ICgweEJGRkYwMDc3KSxcclxuXHRWSV9BVFRSX1ZYSV9WTUVfSU5UUl9TVEFUVVMgPSAoMHgzRkZGMDA4QiksXHJcblx0VklfQVRUUl9WWElfVFJJR19TVEFUVVMgPSAoMHgzRkZGMDA4RCksXHJcblx0VklfQVRUUl9WWElfVk1FX1NZU0ZBSUxfU1RBVEUgPSAoMHgzRkZGMDA5NCksXHJcblx0VklfQVRUUl9XSU5fQkFTRV9BRERSXzMyID0gKDB4M0ZGRjAwOTgpLFxyXG5cdFZJX0FUVFJfV0lOX1NJWkVfMzIgPSAoMHgzRkZGMDA5QSksXHJcblx0VklfQVRUUl9BU1JMX0FWQUlMX05VTSA9ICgweDNGRkYwMEFDKSxcclxuXHRWSV9BVFRSX01FTV9CQVNFXzMyID0gKDB4M0ZGRjAwQUQpLFxyXG5cdFZJX0FUVFJfQVNSTF9DVFNfU1RBVEUgPSAoMHgzRkZGMDBBRSksXHJcblx0VklfQVRUUl9BU1JMX0RDRF9TVEFURSA9ICgweDNGRkYwMEFGKSxcclxuXHRWSV9BVFRSX0FTUkxfRFNSX1NUQVRFID0gKDB4M0ZGRjAwQjEpLFxyXG5cdFZJX0FUVFJfQVNSTF9EVFJfU1RBVEUgPSAoMHgzRkZGMDBCMiksXHJcblx0VklfQVRUUl9BU1JMX0VORF9JTiA9ICgweDNGRkYwMEIzKSxcclxuXHRWSV9BVFRSX0FTUkxfRU5EX09VVCA9ICgweDNGRkYwMEI0KSxcclxuXHRWSV9BVFRSX0FTUkxfUkVQTEFDRV9DSEFSID0gKDB4M0ZGRjAwQkUpLFxyXG5cdFZJX0FUVFJfQVNSTF9SSV9TVEFURSA9ICgweDNGRkYwMEJGKSxcclxuXHRWSV9BVFRSX0FTUkxfUlRTX1NUQVRFID0gKDB4M0ZGRjAwQzApLFxyXG5cdFZJX0FUVFJfQVNSTF9YT05fQ0hBUiA9ICgweDNGRkYwMEMxKSxcclxuXHRWSV9BVFRSX0FTUkxfWE9GRl9DSEFSID0gKDB4M0ZGRjAwQzIpLFxyXG5cdFZJX0FUVFJfV0lOX0FDQ0VTUyA9ICgweDNGRkYwMEMzKSxcclxuXHRWSV9BVFRSX1JNX1NFU1NJT04gPSAoMHgzRkZGMDBDNCksXHJcblx0VklfQVRUUl9WWElfTEEgPSAoMHgzRkZGMDBENSksXHJcblx0VklfQVRUUl9NQU5GX0lEID0gKDB4M0ZGRjAwRDkpLFxyXG5cdFZJX0FUVFJfTUVNX1NJWkVfMzIgPSAoMHgzRkZGMDBERCksXHJcblx0VklfQVRUUl9NRU1fU1BBQ0UgPSAoMHgzRkZGMDBERSksXHJcblx0VklfQVRUUl9NT0RFTF9DT0RFID0gKDB4M0ZGRjAwREYpLFxyXG5cdFZJX0FUVFJfU0xPVCA9ICgweDNGRkYwMEU4KSxcclxuXHRWSV9BVFRSX0lOVEZfSU5TVF9OQU1FID0gKDB4QkZGRjAwRTkpLFxyXG5cdFZJX0FUVFJfSU1NRURJQVRFX1NFUlYgPSAoMHgzRkZGMDEwMCksXHJcblx0VklfQVRUUl9JTlRGX1BBUkVOVF9OVU0gPSAoMHgzRkZGMDEwMSksXHJcblx0VklfQVRUUl9SU1JDX1NQRUNfVkVSU0lPTiA9ICgweDNGRkYwMTcwKSxcclxuXHRWSV9BVFRSX0lOVEZfVFlQRSA9ICgweDNGRkYwMTcxKSxcclxuXHRWSV9BVFRSX0dQSUJfUFJJTUFSWV9BRERSID0gKDB4M0ZGRjAxNzIpLFxyXG5cdFZJX0FUVFJfR1BJQl9TRUNPTkRBUllfQUREUiA9ICgweDNGRkYwMTczKSxcclxuXHRWSV9BVFRSX1JTUkNfTUFORl9OQU1FID0gKDB4QkZGRjAxNzQpLFxyXG5cdFZJX0FUVFJfUlNSQ19NQU5GX0lEID0gKDB4M0ZGRjAxNzUpLFxyXG5cdFZJX0FUVFJfSU5URl9OVU0gPSAoMHgzRkZGMDE3NiksXHJcblx0VklfQVRUUl9UUklHX0lEID0gKDB4M0ZGRjAxNzcpLFxyXG5cdFZJX0FUVFJfR1BJQl9SRU5fU1RBVEUgPSAoMHgzRkZGMDE4MSksXHJcblx0VklfQVRUUl9HUElCX1VOQUREUl9FTiA9ICgweDNGRkYwMTg0KSxcclxuXHRWSV9BVFRSX0RFVl9TVEFUVVNfQllURSA9ICgweDNGRkYwMTg5KSxcclxuXHRWSV9BVFRSX0ZJTEVfQVBQRU5EX0VOID0gKDB4M0ZGRjAxOTIpLFxyXG5cdFZJX0FUVFJfVlhJX1RSSUdfU1VQUE9SVCA9ICgweDNGRkYwMTk0KSxcclxuXHRWSV9BVFRSX1RDUElQX0FERFIgPSAoMHhCRkZGMDE5NSksXHJcblx0VklfQVRUUl9UQ1BJUF9IT1NUTkFNRSA9ICgweEJGRkYwMTk2KSxcclxuXHRWSV9BVFRSX1RDUElQX1BPUlQgPSAoMHgzRkZGMDE5NyksXHJcblx0VklfQVRUUl9UQ1BJUF9ERVZJQ0VfTkFNRSA9ICgweEJGRkYwMTk5KSxcclxuXHRWSV9BVFRSX1RDUElQX05PREVMQVkgPSAoMHgzRkZGMDE5QSksXHJcblx0VklfQVRUUl9UQ1BJUF9LRUVQQUxJVkUgPSAoMHgzRkZGMDE5QiksXHJcblx0VklfQVRUUl80ODgyX0NPTVBMSUFOVCA9ICgweDNGRkYwMTlGKSxcclxuXHRWSV9BVFRSX1VTQl9TRVJJQUxfTlVNID0gKDB4QkZGRjAxQTApLFxyXG5cdFZJX0FUVFJfVVNCX0lOVEZDX05VTSA9ICgweDNGRkYwMUExKSxcclxuXHRWSV9BVFRSX1VTQl9QUk9UT0NPTCA9ICgweDNGRkYwMUE3KSxcclxuXHRWSV9BVFRSX1VTQl9NQVhfSU5UUl9TSVpFID0gKDB4M0ZGRjAxQUYpLFxyXG5cdFZJX0FUVFJfUFhJX0RFVl9OVU0gPSAoMHgzRkZGMDIwMSksXHJcblx0VklfQVRUUl9QWElfRlVOQ19OVU0gPSAoMHgzRkZGMDIwMiksXHJcblx0VklfQVRUUl9QWElfQlVTX05VTSA9ICgweDNGRkYwMjA1KSxcclxuXHRWSV9BVFRSX1BYSV9DSEFTU0lTID0gKDB4M0ZGRjAyMDYpLFxyXG5cdFZJX0FUVFJfUFhJX1NMT1RQQVRIID0gKDB4QkZGRjAyMDcpLFxyXG5cdFZJX0FUVFJfUFhJX1NMT1RfTEJVU19MRUZUID0gKDB4M0ZGRjAyMDgpLFxyXG5cdFZJX0FUVFJfUFhJX1NMT1RfTEJVU19SSUdIVCA9ICgweDNGRkYwMjA5KSxcclxuXHRWSV9BVFRSX1BYSV9UUklHX0JVUyA9ICgweDNGRkYwMjBBKSxcclxuXHRWSV9BVFRSX1BYSV9TVEFSX1RSSUdfQlVTID0gKDB4M0ZGRjAyMEIpLFxyXG5cdFZJX0FUVFJfUFhJX1NUQVJfVFJJR19MSU5FID0gKDB4M0ZGRjAyMEMpLFxyXG5cdFZJX0FUVFJfUFhJX1NSQ19UUklHX0JVUyA9ICgweDNGRkYwMjBEKSxcclxuXHRWSV9BVFRSX1BYSV9ERVNUX1RSSUdfQlVTID0gKDB4M0ZGRjAyMEUpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9UWVBFX0JBUjAgPSAoMHgzRkZGMDIxMSksXHJcblx0VklfQVRUUl9QWElfTUVNX1RZUEVfQkFSMSA9ICgweDNGRkYwMjEyKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fVFlQRV9CQVIyID0gKDB4M0ZGRjAyMTMpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9UWVBFX0JBUjMgPSAoMHgzRkZGMDIxNCksXHJcblx0VklfQVRUUl9QWElfTUVNX1RZUEVfQkFSNCA9ICgweDNGRkYwMjE1KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fVFlQRV9CQVI1ID0gKDB4M0ZGRjAyMTYpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjBfMzIgPSAoMHgzRkZGMDIyMSksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSMV8zMiA9ICgweDNGRkYwMjIyKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVIyXzMyID0gKDB4M0ZGRjAyMjMpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjNfMzIgPSAoMHgzRkZGMDIyNCksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSNF8zMiA9ICgweDNGRkYwMjI1KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVI1XzMyID0gKDB4M0ZGRjAyMjYpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjBfNjQgPSAoMHgzRkZGMDIyOCksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSMV82NCA9ICgweDNGRkYwMjI5KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVIyXzY0ID0gKDB4M0ZGRjAyMkEpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjNfNjQgPSAoMHgzRkZGMDIyQiksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSNF82NCA9ICgweDNGRkYwMjJDKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVI1XzY0ID0gKDB4M0ZGRjAyMkQpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjBfMzIgPSAoMHgzRkZGMDIzMSksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSMV8zMiA9ICgweDNGRkYwMjMyKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVIyXzMyID0gKDB4M0ZGRjAyMzMpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjNfMzIgPSAoMHgzRkZGMDIzNCksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSNF8zMiA9ICgweDNGRkYwMjM1KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVI1XzMyID0gKDB4M0ZGRjAyMzYpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjBfNjQgPSAoMHgzRkZGMDIzOCksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSMV82NCA9ICgweDNGRkYwMjM5KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVIyXzY0ID0gKDB4M0ZGRjAyM0EpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjNfNjQgPSAoMHgzRkZGMDIzQiksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSNF82NCA9ICgweDNGRkYwMjNDKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVI1XzY0ID0gKDB4M0ZGRjAyM0QpLFxyXG5cdFZJX0FUVFJfUFhJX0lTX0VYUFJFU1MgPSAoMHgzRkZGMDI0MCksXHJcblx0VklfQVRUUl9QWElfU0xPVF9MV0lEVEggPSAoMHgzRkZGMDI0MSksXHJcblx0VklfQVRUUl9QWElfTUFYX0xXSURUSCA9ICgweDNGRkYwMjQyKSxcclxuXHRWSV9BVFRSX1BYSV9BQ1RVQUxfTFdJRFRIID0gKDB4M0ZGRjAyNDMpLFxyXG5cdFZJX0FUVFJfUFhJX0RTVEFSX0JVUyA9ICgweDNGRkYwMjQ0KSxcclxuXHRWSV9BVFRSX1BYSV9EU1RBUl9TRVQgPSAoMHgzRkZGMDI0NSksXHJcblx0VklfQVRUUl9QWElfQUxMT1dfV1JJVEVfQ09NQklORSA9ICgweDNGRkYwMjQ2KSxcclxuXHRWSV9BVFRSX1RDUElQX0hJU0xJUF9PVkVSTEFQX0VOID0gKDB4M0ZGRjAzMDApLFxyXG5cdFZJX0FUVFJfVENQSVBfSElTTElQX1ZFUlNJT04gPSAoMHgzRkZGMDMwMSksXHJcblx0VklfQVRUUl9UQ1BJUF9ISVNMSVBfTUFYX01FU1NBR0VfS0IgPSAoMHgzRkZGMDMwMiksXHJcblx0VklfQVRUUl9UQ1BJUF9JU19ISVNMSVAgPSAoMHgzRkZGMDMwMyksXHJcblxyXG5cdFZJX0FUVFJfSk9CX0lEID0gKDB4M0ZGRjQwMDYpLFxyXG5cdFZJX0FUVFJfRVZFTlRfVFlQRSA9ICgweDNGRkY0MDEwKSxcclxuXHRWSV9BVFRSX1NJR1BfU1RBVFVTX0lEID0gKDB4M0ZGRjQwMTEpLFxyXG5cdFZJX0FUVFJfUkVDVl9UUklHX0lEID0gKDB4M0ZGRjQwMTIpLFxyXG5cdFZJX0FUVFJfSU5UUl9TVEFUVVNfSUQgPSAoMHgzRkZGNDAyMyksXHJcblx0VklfQVRUUl9TVEFUVVMgPSAoMHgzRkZGNDAyNSksXHJcblx0VklfQVRUUl9SRVRfQ09VTlRfMzIgPSAoMHgzRkZGNDAyNiksXHJcblx0VklfQVRUUl9CVUZGRVIgPSAoMHgzRkZGNDAyNyksXHJcblx0VklfQVRUUl9SRUNWX0lOVFJfTEVWRUwgPSAoMHgzRkZGNDA0MSksXHJcblx0VklfQVRUUl9PUEVSX05BTUUgPSAoMHhCRkZGNDA0MiksXHJcblx0VklfQVRUUl9HUElCX1JFQ1ZfQ0lDX1NUQVRFID0gKDB4M0ZGRjQxOTMpLFxyXG5cdFZJX0FUVFJfUkVDVl9UQ1BJUF9BRERSID0gKDB4QkZGRjQxOTgpLFxyXG5cdFZJX0FUVFJfVVNCX1JFQ1ZfSU5UUl9TSVpFID0gKDB4M0ZGRjQxQjApLFxyXG5cdFZJX0FUVFJfVVNCX1JFQ1ZfSU5UUl9EQVRBID0gKDB4QkZGRjQxQjEpLFxyXG5cdFZJX0FUVFJfUFhJX1JFQ1ZfSU5UUl9TRVEgPSAoMHgzRkZGNDI0MCksXHJcblx0VklfQVRUUl9QWElfUkVDVl9JTlRSX0RBVEEgPSAoMHgzRkZGNDI0MSksXHJcblxyXG4vKi0gQXR0cmlidXRlcyAocGxhdGZvcm0gZGVwZW5kZW50IHNpemUpIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdFZJX0FUVFJfVVNFUl9EQVRBXzY0ID0gKDB4M0ZGRjAwMEEpLFxyXG5cdFZJX0FUVFJfUkVUX0NPVU5UXzY0ID0gKDB4M0ZGRjQwMjgpLFxyXG5cdFZJX0FUVFJfVVNFUl9EQVRBID0gKDB4M0ZGRjAwMEEpLFxyXG5cdFZJX0FUVFJfUkVUX0NPVU5UID0gKDB4M0ZGRjQwMjgpLFxyXG5cclxuXHJcbi8qLSBFdmVudCBUeXBlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0VklfRVZFTlRfSU9fQ09NUExFVElPTiA9ICgweDNGRkYyMDA5KSxcclxuXHRWSV9FVkVOVF9UUklHID0gKDB4QkZGRjIwMEEpLFxyXG5cdFZJX0VWRU5UX1NFUlZJQ0VfUkVRID0gKDB4M0ZGRjIwMEIpLFxyXG5cdFZJX0VWRU5UX0NMRUFSID0gKDB4M0ZGRjIwMEQpLFxyXG5cdFZJX0VWRU5UX0VYQ0VQVElPTiA9ICgweEJGRkYyMDBFKSxcclxuXHRWSV9FVkVOVF9HUElCX0NJQyA9ICgweDNGRkYyMDEyKSxcclxuXHRWSV9FVkVOVF9HUElCX1RBTEsgPSAoMHgzRkZGMjAxMyksXHJcblx0VklfRVZFTlRfR1BJQl9MSVNURU4gPSAoMHgzRkZGMjAxNCksXHJcblx0VklfRVZFTlRfVlhJX1ZNRV9TWVNGQUlMID0gKDB4M0ZGRjIwMUQpLFxyXG5cdFZJX0VWRU5UX1ZYSV9WTUVfU1lTUkVTRVQgPSAoMHgzRkZGMjAxRSksXHJcblx0VklfRVZFTlRfVlhJX1NJR1AgPSAoMHgzRkZGMjAyMCksXHJcblx0VklfRVZFTlRfVlhJX1ZNRV9JTlRSID0gKDB4QkZGRjIwMjEpLFxyXG5cdFZJX0VWRU5UX1BYSV9JTlRSID0gKDB4M0ZGRjIwMjIpLFxyXG5cdFZJX0VWRU5UX1RDUElQX0NPTk5FQ1QgPSAoMHgzRkZGMjAzNiksXHJcblx0VklfRVZFTlRfVVNCX0lOVFIgPSAoMHgzRkZGMjAzNyksXHJcblxyXG5cdFZJX0FMTF9FTkFCTEVEX0VWRU5UUyA9ICgweDNGRkY3RkZGKSxcclxuXHJcbi8qLSBDb21wbGV0aW9uIGFuZCBFcnJvciBDb2RlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0VklfU1VDQ0VTU19FVkVOVF9FTiA9ICgweDNGRkYwMDAyKSxcclxuXHRWSV9TVUNDRVNTX0VWRU5UX0RJUyA9ICgweDNGRkYwMDAzKSxcclxuXHRWSV9TVUNDRVNTX1FVRVVFX0VNUFRZID0gKDB4M0ZGRjAwMDQpLFxyXG5cdFZJX1NVQ0NFU1NfVEVSTV9DSEFSID0gKDB4M0ZGRjAwMDUpLFxyXG5cdFZJX1NVQ0NFU1NfTUFYX0NOVCA9ICgweDNGRkYwMDA2KSxcclxuXHRWSV9TVUNDRVNTX0RFVl9OUFJFU0VOVCA9ICgweDNGRkYwMDdEKSxcclxuXHRWSV9TVUNDRVNTX1RSSUdfTUFQUEVEID0gKDB4M0ZGRjAwN0UpLFxyXG5cdFZJX1NVQ0NFU1NfUVVFVUVfTkVNUFRZID0gKDB4M0ZGRjAwODApLFxyXG5cdFZJX1NVQ0NFU1NfTkNIQUlOID0gKDB4M0ZGRjAwOTgpLFxyXG5cdFZJX1NVQ0NFU1NfTkVTVEVEX1NIQVJFRCA9ICgweDNGRkYwMDk5KSxcclxuXHRWSV9TVUNDRVNTX05FU1RFRF9FWENMVVNJVkUgPSAoMHgzRkZGMDA5QSksXHJcblx0VklfU1VDQ0VTU19TWU5DID0gKDB4M0ZGRjAwOUIpLFxyXG5cclxuXHRWSV9XQVJOX1FVRVVFX09WRVJGTE9XID0gKDB4M0ZGRjAwMEMpLFxyXG5cdFZJX1dBUk5fQ09ORklHX05MT0FERUQgPSAoMHgzRkZGMDA3NyksXHJcblx0VklfV0FSTl9OVUxMX09CSkVDVCA9ICgweDNGRkYwMDgyKSxcclxuXHRWSV9XQVJOX05TVVBfQVRUUl9TVEFURSA9ICgweDNGRkYwMDg0KSxcclxuXHRWSV9XQVJOX1VOS05PV05fU1RBVFVTID0gKDB4M0ZGRjAwODUpLFxyXG5cdFZJX1dBUk5fTlNVUF9CVUYgPSAoMHgzRkZGMDA4OCksXHJcblx0VklfV0FSTl9FWFRfRlVOQ19OSU1QTCA9ICgweDNGRkYwMEE5KSxcclxuXHJcblx0VklfRVJST1JfU1lTVEVNX0VSUk9SID0gKDB4ODAwMDAwMDArMHgzRkZGMDAwMCksXHJcblx0VklfRVJST1JfSU5WX09CSkVDVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMEUpLFxyXG5cdFZJX0VSUk9SX1JTUkNfTE9DS0VEID0gKDB4ODAwMDAwMDArMHgzRkZGMDAwRiksXHJcblx0VklfRVJST1JfSU5WX0VYUFIgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDEwKSxcclxuXHRWSV9FUlJPUl9SU1JDX05GT1VORCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMTEpLFxyXG5cdFZJX0VSUk9SX0lOVl9SU1JDX05BTUUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDEyKSxcclxuXHRWSV9FUlJPUl9JTlZfQUNDX01PREUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDEzKSxcclxuXHRWSV9FUlJPUl9UTU8gPSAoMHg4MDAwMDAwMCsweDNGRkYwMDE1KSxcclxuXHRWSV9FUlJPUl9DTE9TSU5HX0ZBSUxFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMTYpLFxyXG5cdFZJX0VSUk9SX0lOVl9ERUdSRUUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDFCKSxcclxuXHRWSV9FUlJPUl9JTlZfSk9CX0lEID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxQyksXHJcblx0VklfRVJST1JfTlNVUF9BVFRSID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxRCksXHJcblx0VklfRVJST1JfTlNVUF9BVFRSX1NUQVRFID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxRSksXHJcblx0VklfRVJST1JfQVRUUl9SRUFET05MWSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMUYpLFxyXG5cdFZJX0VSUk9SX0lOVl9MT0NLX1RZUEUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDIwKSxcclxuXHRWSV9FUlJPUl9JTlZfQUNDRVNTX0tFWSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMjEpLFxyXG5cdFZJX0VSUk9SX0lOVl9FVkVOVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMjYpLFxyXG5cdFZJX0VSUk9SX0lOVl9NRUNIID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyNyksXHJcblx0VklfRVJST1JfSE5ETFJfTklOU1RBTExFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMjgpLFxyXG5cdFZJX0VSUk9SX0lOVl9ITkRMUl9SRUYgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDI5KSxcclxuXHRWSV9FUlJPUl9JTlZfQ09OVEVYVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMkEpLFxyXG5cdFZJX0VSUk9SX1FVRVVFX09WRVJGTE9XID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyRCksXHJcblx0VklfRVJST1JfTkVOQUJMRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDJGKSxcclxuXHRWSV9FUlJPUl9BQk9SVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMzApLFxyXG5cdFZJX0VSUk9SX1JBV19XUl9QUk9UX1ZJT0wgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDM0KSxcclxuXHRWSV9FUlJPUl9SQVdfUkRfUFJPVF9WSU9MID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzNSksXHJcblx0VklfRVJST1JfT1VUUF9QUk9UX1ZJT0wgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDM2KSxcclxuXHRWSV9FUlJPUl9JTlBfUFJPVF9WSU9MID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzNyksXHJcblx0VklfRVJST1JfQkVSUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMzgpLFxyXG5cdFZJX0VSUk9SX0lOX1BST0dSRVNTID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzOSksXHJcblx0VklfRVJST1JfSU5WX1NFVFVQID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzQSksXHJcblx0VklfRVJST1JfUVVFVUVfRVJST1IgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDNCKSxcclxuXHRWSV9FUlJPUl9BTExPQyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwM0MpLFxyXG5cdFZJX0VSUk9SX0lOVl9NQVNLID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzRCksXHJcblx0VklfRVJST1JfSU8gPSAoMHg4MDAwMDAwMCsweDNGRkYwMDNFKSxcclxuXHRWSV9FUlJPUl9JTlZfRk1UID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzRiksXHJcblx0VklfRVJST1JfTlNVUF9GTVQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDQxKSxcclxuXHRWSV9FUlJPUl9MSU5FX0lOX1VTRSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNDIpLFxyXG5cdFZJX0VSUk9SX0xJTkVfTlJFU0VSVkVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDA0MyksXHJcblx0VklfRVJST1JfTlNVUF9NT0RFID0gKDB4ODAwMDAwMDArMHgzRkZGMDA0NiksXHJcblx0VklfRVJST1JfU1JRX05PQ0NVUlJFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNEEpLFxyXG5cdFZJX0VSUk9SX0lOVl9TUEFDRSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNEUpLFxyXG5cdFZJX0VSUk9SX0lOVl9PRkZTRVQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDUxKSxcclxuXHRWSV9FUlJPUl9JTlZfV0lEVEggPSAoMHg4MDAwMDAwMCsweDNGRkYwMDUyKSxcclxuXHRWSV9FUlJPUl9OU1VQX09GRlNFVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNTQpLFxyXG5cdFZJX0VSUk9SX05TVVBfVkFSX1dJRFRIID0gKDB4ODAwMDAwMDArMHgzRkZGMDA1NSksXHJcblx0VklfRVJST1JfV0lORE9XX05NQVBQRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDU3KSxcclxuXHRWSV9FUlJPUl9SRVNQX1BFTkRJTkcgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDU5KSxcclxuXHRWSV9FUlJPUl9OTElTVEVORVJTID0gKDB4ODAwMDAwMDArMHgzRkZGMDA1RiksXHJcblx0VklfRVJST1JfTkNJQyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNjApLFxyXG5cdFZJX0VSUk9SX05TWVNfQ05UTFIgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDYxKSxcclxuXHRWSV9FUlJPUl9OU1VQX09QRVIgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDY3KSxcclxuXHRWSV9FUlJPUl9JTlRSX1BFTkRJTkcgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDY4KSxcclxuXHRWSV9FUlJPUl9BU1JMX1BBUklUWSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNkEpLFxyXG5cdFZJX0VSUk9SX0FTUkxfRlJBTUlORyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNkIpLFxyXG5cdFZJX0VSUk9SX0FTUkxfT1ZFUlJVTiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNkMpLFxyXG5cdFZJX0VSUk9SX1RSSUdfTk1BUFBFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNkUpLFxyXG5cdFZJX0VSUk9SX05TVVBfQUxJR05fT0ZGU0VUID0gKDB4ODAwMDAwMDArMHgzRkZGMDA3MCksXHJcblx0VklfRVJST1JfVVNFUl9CVUYgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDcxKSxcclxuXHRWSV9FUlJPUl9SU1JDX0JVU1kgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDcyKSxcclxuXHRWSV9FUlJPUl9OU1VQX1dJRFRIID0gKDB4ODAwMDAwMDArMHgzRkZGMDA3NiksXHJcblx0VklfRVJST1JfSU5WX1BBUkFNRVRFUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNzgpLFxyXG5cdFZJX0VSUk9SX0lOVl9QUk9UID0gKDB4ODAwMDAwMDArMHgzRkZGMDA3OSksXHJcblx0VklfRVJST1JfSU5WX1NJWkUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDdCKSxcclxuXHRWSV9FUlJPUl9XSU5ET1dfTUFQUEVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDA4MCksXHJcblx0VklfRVJST1JfTklNUExfT1BFUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwODEpLFxyXG5cdFZJX0VSUk9SX0lOVl9MRU5HVEggPSAoMHg4MDAwMDAwMCsweDNGRkYwMDgzKSxcclxuXHRWSV9FUlJPUl9JTlZfTU9ERSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwOTEpLFxyXG5cdFZJX0VSUk9SX1NFU05fTkxPQ0tFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwOUMpLFxyXG5cdFZJX0VSUk9SX01FTV9OU0hBUkVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDA5RCksXHJcblx0VklfRVJST1JfTElCUkFSWV9ORk9VTkQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDlFKSxcclxuXHRWSV9FUlJPUl9OU1VQX0lOVFIgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDlGKSxcclxuXHRWSV9FUlJPUl9JTlZfTElORSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTApLFxyXG5cdFZJX0VSUk9SX0ZJTEVfQUNDRVNTID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBMSksXHJcblx0VklfRVJST1JfRklMRV9JTyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTIpLFxyXG5cdFZJX0VSUk9SX05TVVBfTElORSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTMpLFxyXG5cdFZJX0VSUk9SX05TVVBfTUVDSCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTQpLFxyXG5cdFZJX0VSUk9SX0lOVEZfTlVNX05DT05GSUcgPSAoMHg4MDAwMDAwMCsweDNGRkYwMEE1KSxcclxuXHRWSV9FUlJPUl9DT05OX0xPU1QgPSAoMHg4MDAwMDAwMCsweDNGRkYwMEE2KSxcclxuXHRWSV9FUlJPUl9NQUNISU5FX05BVkFJTCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTcpLFxyXG5cdFZJX0VSUk9SX05QRVJNSVNTSU9OID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBOCksXHJcblxyXG4vKi0gT3RoZXIgVklTQSBEZWZpbml0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdFZJX1ZFUlNJT05fTUFKT1IgPSAgICAoKDB4MDA1MDA4MDAgJiAweEZGRjAwMDAwKSA+PiAyMCksXHJcblx0VklfVkVSU0lPTl9NSU5PUiA9ICAgICgoMHgwMDUwMDgwMCAmIDB4MDAwRkZGMDApID4+ICA4KSxcclxuXHRWSV9WRVJTSU9OX1NVQk1JTk9SID0gKCgweDAwNTAwODAwICYgMHgwMDAwMDBGRikgICAgICApLFxyXG5cclxuXHRWSV9GSU5EX0JVRkxFTiA9ICgyNTYpLFxyXG5cclxuXHRWSV9JTlRGX0dQSUIgPSAoMSksXHJcblx0VklfSU5URl9WWEkgPSAoMiksXHJcblx0VklfSU5URl9HUElCX1ZYSSA9ICgzKSxcclxuXHRWSV9JTlRGX0FTUkwgPSAoNCksXHJcblx0VklfSU5URl9QWEkgPSAoNSksXHJcblx0VklfSU5URl9UQ1BJUCA9ICg2KSxcclxuXHRWSV9JTlRGX1VTQiA9ICg3KSxcclxuXHJcblx0VklfUFJPVF9OT1JNQUwgPSAoMSksXHJcblx0VklfUFJPVF9GREMgPSAoMiksXHJcblx0VklfUFJPVF9IUzQ4OCA9ICgzKSxcclxuXHRWSV9QUk9UXzQ4ODJfU1RSUyA9ICg0KSxcclxuXHRWSV9QUk9UX1VTQlRNQ19WRU5ET1IgPSAoNSksXHJcblxyXG5cdFZJX0ZEQ19OT1JNQUwgPSAoMSksXHJcblx0VklfRkRDX1NUUkVBTSA9ICgyKSxcclxuXHJcblx0VklfTE9DQUxfU1BBQ0UgPSAoMCksXHJcblx0VklfQTE2X1NQQUNFID0gKDEpLFxyXG5cdFZJX0EyNF9TUEFDRSA9ICgyKSxcclxuXHRWSV9BMzJfU1BBQ0UgPSAoMyksXHJcblx0VklfQTY0X1NQQUNFID0gKDQpLFxyXG5cdFZJX1BYSV9BTExPQ19TUEFDRSA9ICg5KSxcclxuXHRWSV9QWElfQ0ZHX1NQQUNFID0gKDEwKSxcclxuXHRWSV9QWElfQkFSMF9TUEFDRSA9ICgxMSksXHJcblx0VklfUFhJX0JBUjFfU1BBQ0UgPSAoMTIpLFxyXG5cdFZJX1BYSV9CQVIyX1NQQUNFID0gKDEzKSxcclxuXHRWSV9QWElfQkFSM19TUEFDRSA9ICgxNCksXHJcblx0VklfUFhJX0JBUjRfU1BBQ0UgPSAoMTUpLFxyXG5cdFZJX1BYSV9CQVI1X1NQQUNFID0gKDE2KSxcclxuXHRWSV9PUEFRVUVfU1BBQ0UgPSAoMHhGRkZGKSxcclxuXHJcblx0VklfVU5LTk9XTl9MQSA9ICgtMSksXHJcblx0VklfVU5LTk9XTl9TTE9UID0gKC0xKSxcclxuXHRWSV9VTktOT1dOX0xFVkVMID0gKC0xKSxcclxuXHRWSV9VTktOT1dOX0NIQVNTSVMgPSAoLTEpLFxyXG5cclxuXHRWSV9RVUVVRSA9ICgxKSxcclxuXHRWSV9ITkRMUiA9ICgyKSxcclxuXHRWSV9TVVNQRU5EX0hORExSID0gKDQpLFxyXG5cdFZJX0FMTF9NRUNIID0gKDB4RkZGRiksXHJcblxyXG5cdFZJX0FOWV9ITkRMUiA9ICgwKSxcclxuXHJcblx0VklfVFJJR19BTEwgPSAoLTIpLFxyXG5cdFZJX1RSSUdfU1cgPSAoLTEpLFxyXG5cdFZJX1RSSUdfVFRMMCA9ICgwKSxcclxuXHRWSV9UUklHX1RUTDEgPSAoMSksXHJcblx0VklfVFJJR19UVEwyID0gKDIpLFxyXG5cdFZJX1RSSUdfVFRMMyA9ICgzKSxcclxuXHRWSV9UUklHX1RUTDQgPSAoNCksXHJcblx0VklfVFJJR19UVEw1ID0gKDUpLFxyXG5cdFZJX1RSSUdfVFRMNiA9ICg2KSxcclxuXHRWSV9UUklHX1RUTDcgPSAoNyksXHJcblx0VklfVFJJR19FQ0wwID0gKDgpLFxyXG5cdFZJX1RSSUdfRUNMMSA9ICg5KSxcclxuXHRWSV9UUklHX0VDTDIgPSAoMTApLFxyXG5cdFZJX1RSSUdfRUNMMyA9ICgxMSksXHJcblx0VklfVFJJR19FQ0w0ID0gKDEyKSxcclxuXHRWSV9UUklHX0VDTDUgPSAoMTMpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UMSA9ICgxNCksXHJcblx0VklfVFJJR19TVEFSX1NMT1QyID0gKDE1KSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDMgPSAoMTYpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UNCA9ICgxNyksXHJcblx0VklfVFJJR19TVEFSX1NMT1Q1ID0gKDE4KSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDYgPSAoMTkpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UNyA9ICgyMCksXHJcblx0VklfVFJJR19TVEFSX1NMT1Q4ID0gKDIxKSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDkgPSAoMjIpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UMTAgPSAoMjMpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UMTEgPSAoMjQpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UMTIgPSAoMjUpLFxyXG5cdFZJX1RSSUdfU1RBUl9JTlNUUiA9ICgyNiksXHJcblx0VklfVFJJR19QQU5FTF9JTiA9ICgyNyksXHJcblx0VklfVFJJR19QQU5FTF9PVVQgPSAoMjgpLFxyXG5cdFZJX1RSSUdfU1RBUl9WWEkwID0gKDI5KSxcclxuXHRWSV9UUklHX1NUQVJfVlhJMSA9ICgzMCksXHJcblx0VklfVFJJR19TVEFSX1ZYSTIgPSAoMzEpLFxyXG5cdFZJX1RSSUdfVFRMOCA9ICgzMiksXHJcblx0VklfVFJJR19UVEw5ID0gKDMzKSxcclxuXHRWSV9UUklHX1RUTDEwID0gKDM0KSxcclxuXHRWSV9UUklHX1RUTDExID0gKDM1KSxcclxuXHJcblx0VklfVFJJR19QUk9UX0RFRkFVTFQgPSAoMCksXHJcblx0VklfVFJJR19QUk9UX09OID0gKDEpLFxyXG5cdFZJX1RSSUdfUFJPVF9PRkYgPSAoMiksXHJcblx0VklfVFJJR19QUk9UX1NZTkMgPSAoNSksXHJcblx0VklfVFJJR19QUk9UX1JFU0VSVkUgPSAoNiksXHJcblx0VklfVFJJR19QUk9UX1VOUkVTRVJWRSA9ICg3KSxcclxuXHJcblx0VklfUkVBRF9CVUYgPSAoMSksXHJcblx0VklfV1JJVEVfQlVGID0gKDIpLFxyXG5cdFZJX1JFQURfQlVGX0RJU0NBUkQgPSAoNCksXHJcblx0VklfV1JJVEVfQlVGX0RJU0NBUkQgPSAoOCksXHJcblx0VklfSU9fSU5fQlVGID0gKDE2KSxcclxuXHRWSV9JT19PVVRfQlVGID0gKDMyKSxcclxuXHRWSV9JT19JTl9CVUZfRElTQ0FSRCA9ICg2NCksXHJcblx0VklfSU9fT1VUX0JVRl9ESVNDQVJEID0gKDEyOCksXHJcblxyXG5cdFZJX0ZMVVNIX09OX0FDQ0VTUyA9ICgxKSxcclxuXHRWSV9GTFVTSF9XSEVOX0ZVTEwgPSAoMiksXHJcblx0VklfRkxVU0hfRElTQUJMRSA9ICgzKSxcclxuXHJcblx0VklfTk1BUFBFRCA9ICgxKSxcclxuXHRWSV9VU0VfT1BFUlMgPSAoMiksXHJcblx0VklfREVSRUZfQUREUiA9ICgzKSxcclxuXHRWSV9ERVJFRl9BRERSX0JZVEVfU1dBUCA9ICg0KSxcclxuXHJcblx0VklfVE1PX0lNTUVESUFURSA9ICgwKSxcclxuXHRWSV9UTU9fSU5GSU5JVEUgPSAoMHhGRkZGRkZGRiksXHJcblxyXG5cdFZJX05PX0xPQ0sgPSAoMCksXHJcblx0VklfRVhDTFVTSVZFX0xPQ0sgPSAoMSksXHJcblx0VklfU0hBUkVEX0xPQ0sgPSAoMiksXHJcblx0VklfTE9BRF9DT05GSUcgPSAoNCksXHJcblxyXG5cdFZJX05PX1NFQ19BRERSID0gKDB4RkZGRiksXHJcblxyXG5cdFZJX0FTUkxfUEFSX05PTkUgPSAoMCksXHJcblx0VklfQVNSTF9QQVJfT0REID0gKDEpLFxyXG5cdFZJX0FTUkxfUEFSX0VWRU4gPSAoMiksXHJcblx0VklfQVNSTF9QQVJfTUFSSyA9ICgzKSxcclxuXHRWSV9BU1JMX1BBUl9TUEFDRSA9ICg0KSxcclxuXHJcblx0VklfQVNSTF9TVE9QX09ORSA9ICgxMCksXHJcblx0VklfQVNSTF9TVE9QX09ORTUgPSAoMTUpLFxyXG5cdFZJX0FTUkxfU1RPUF9UV08gPSAoMjApLFxyXG5cclxuXHRWSV9BU1JMX0ZMT1dfTk9ORSA9ICgwKSxcclxuXHRWSV9BU1JMX0ZMT1dfWE9OX1hPRkYgPSAoMSksXHJcblx0VklfQVNSTF9GTE9XX1JUU19DVFMgPSAoMiksXHJcblx0VklfQVNSTF9GTE9XX0RUUl9EU1IgPSAoNCksXHJcblxyXG5cdFZJX0FTUkxfRU5EX05PTkUgPSAoMCksXHJcblx0VklfQVNSTF9FTkRfTEFTVF9CSVQgPSAoMSksXHJcblx0VklfQVNSTF9FTkRfVEVSTUNIQVIgPSAoMiksXHJcblx0VklfQVNSTF9FTkRfQlJFQUsgPSAoMyksXHJcblxyXG5cdFZJX1NUQVRFX0FTU0VSVEVEID0gKDEpLFxyXG5cdFZJX1NUQVRFX1VOQVNTRVJURUQgPSAoMCksXHJcblx0VklfU1RBVEVfVU5LTk9XTiA9ICgtMSksXHJcblxyXG5cdFZJX0JJR19FTkRJQU4gPSAoMCksXHJcblx0VklfTElUVExFX0VORElBTiA9ICgxKSxcclxuXHJcblx0VklfREFUQV9QUklWID0gKDApLFxyXG5cdFZJX0RBVEFfTlBSSVYgPSAoMSksXHJcblx0VklfUFJPR19QUklWID0gKDIpLFxyXG5cdFZJX1BST0dfTlBSSVYgPSAoMyksXHJcblx0VklfQkxDS19QUklWID0gKDQpLFxyXG5cdFZJX0JMQ0tfTlBSSVYgPSAoNSksXHJcblx0VklfRDY0X1BSSVYgPSAoNiksXHJcblx0VklfRDY0X05QUklWID0gKDcpLFxyXG5cdFZJX0Q2NF8yRVZNRSA9ICg4KSxcclxuXHRWSV9ENjRfU1NUMTYwID0gKDkpLFxyXG5cdFZJX0Q2NF9TU1QyNjcgPSAoMTApLFxyXG5cdFZJX0Q2NF9TU1QzMjAgPSAoMTEpLFxyXG5cclxuXHRWSV9XSURUSF84ID0gKDEpLFxyXG5cdFZJX1dJRFRIXzE2ID0gKDIpLFxyXG5cdFZJX1dJRFRIXzMyID0gKDQpLFxyXG5cdFZJX1dJRFRIXzY0ID0gKDgpLFxyXG5cclxuXHRWSV9HUElCX1JFTl9ERUFTU0VSVCA9ICgwKSxcclxuXHRWSV9HUElCX1JFTl9BU1NFUlQgPSAoMSksXHJcblx0VklfR1BJQl9SRU5fREVBU1NFUlRfR1RMID0gKDIpLFxyXG5cdFZJX0dQSUJfUkVOX0FTU0VSVF9BRERSRVNTID0gKDMpLFxyXG5cdFZJX0dQSUJfUkVOX0FTU0VSVF9MTE8gPSAoNCksXHJcblx0VklfR1BJQl9SRU5fQVNTRVJUX0FERFJFU1NfTExPID0gKDUpLFxyXG5cdFZJX0dQSUJfUkVOX0FERFJFU1NfR1RMID0gKDYpLFxyXG5cclxuXHRWSV9HUElCX0FUTl9ERUFTU0VSVCA9ICgwKSxcclxuXHRWSV9HUElCX0FUTl9BU1NFUlQgPSAoMSksXHJcblx0VklfR1BJQl9BVE5fREVBU1NFUlRfSEFORFNIQUtFID0gKDIpLFxyXG5cdFZJX0dQSUJfQVROX0FTU0VSVF9JTU1FRElBVEUgPSAoMyksXHJcblxyXG5cdFZJX0dQSUJfSFM0ODhfRElTQUJMRUQgPSAoMCksXHJcblx0VklfR1BJQl9IUzQ4OF9OSU1QTCA9ICgtMSksXHJcblxyXG5cdFZJX0dQSUJfVU5BRERSRVNTRUQgPSAoMCksXHJcblx0VklfR1BJQl9UQUxLRVIgPSAoMSksXHJcblx0VklfR1BJQl9MSVNURU5FUiA9ICgyKSxcclxuXHJcblx0VklfVlhJX0NNRDE2ID0gKDB4MDIwMCksXHJcblx0VklfVlhJX0NNRDE2X1JFU1AxNiA9ICgweDAyMDIpLFxyXG5cdFZJX1ZYSV9SRVNQMTYgPSAoMHgwMDAyKSxcclxuXHRWSV9WWElfQ01EMzIgPSAoMHgwNDAwKSxcclxuXHRWSV9WWElfQ01EMzJfUkVTUDE2ID0gKDB4MDQwMiksXHJcblx0VklfVlhJX0NNRDMyX1JFU1AzMiA9ICgweDA0MDQpLFxyXG5cdFZJX1ZYSV9SRVNQMzIgPSAoMHgwMDA0KSxcclxuXHJcblx0VklfQVNTRVJUX1NJR05BTCA9ICgtMSksXHJcblx0VklfQVNTRVJUX1VTRV9BU1NJR05FRCA9ICgwKSxcclxuXHRWSV9BU1NFUlRfSVJRMSA9ICgxKSxcclxuXHRWSV9BU1NFUlRfSVJRMiA9ICgyKSxcclxuXHRWSV9BU1NFUlRfSVJRMyA9ICgzKSxcclxuXHRWSV9BU1NFUlRfSVJRNCA9ICg0KSxcclxuXHRWSV9BU1NFUlRfSVJRNSA9ICg1KSxcclxuXHRWSV9BU1NFUlRfSVJRNiA9ICg2KSxcclxuXHRWSV9BU1NFUlRfSVJRNyA9ICg3KSxcclxuXHJcblx0VklfVVRJTF9BU1NFUlRfU1lTUkVTRVQgPSAoMSksXHJcblx0VklfVVRJTF9BU1NFUlRfU1lTRkFJTCA9ICgyKSxcclxuXHRWSV9VVElMX0RFQVNTRVJUX1NZU0ZBSUwgPSAoMyksXHJcblxyXG5cdFZJX1ZYSV9DTEFTU19NRU1PUlkgPSAoMCksXHJcblx0VklfVlhJX0NMQVNTX0VYVEVOREVEID0gKDEpLFxyXG5cdFZJX1ZYSV9DTEFTU19NRVNTQUdFID0gKDIpLFxyXG5cdFZJX1ZYSV9DTEFTU19SRUdJU1RFUiA9ICgzKSxcclxuXHRWSV9WWElfQ0xBU1NfT1RIRVIgPSAoNCksXHJcblxyXG5cdFZJX1BYSV9BRERSX05PTkUgPSAoMCksXHJcblx0VklfUFhJX0FERFJfTUVNID0gKDEpLFxyXG5cdFZJX1BYSV9BRERSX0lPID0gKDIpLFxyXG5cdFZJX1BYSV9BRERSX0NGRyA9ICgzKSxcclxuXHJcblx0VklfVFJJR19VTktOT1dOID0gKC0xKSxcclxuXHJcblx0VklfUFhJX0xCVVNfVU5LTk9XTiA9ICgtMSksXHJcblx0VklfUFhJX0xCVVNfTk9ORSA9ICgwKSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzAgPSAoMTAwMCksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU18xID0gKDEwMDEpLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfMiA9ICgxMDAyKSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzMgPSAoMTAwMyksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU180ID0gKDEwMDQpLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfNSA9ICgxMDA1KSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzYgPSAoMTAwNiksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU183ID0gKDEwMDcpLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfOCA9ICgxMDA4KSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzkgPSAoMTAwOSksXHJcblx0VklfUFhJX1NUQVJfVFJJR19DT05UUk9MTEVSID0gKDE0MTMpLFxyXG5cclxuLyotIE5hdGlvbmFsIEluc3RydW1lbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRWSV9FUlJPUl9IV19OR0VOVUlORSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQUEpLFxyXG5cclxuXHRWSV9JTlRGX1JJTyA9ICg4KSxcclxuXHRWSV9JTlRGX0ZJUkVXSVJFID0gKDkpLFxyXG5cclxuXHRWSV9BVFRSX1NZTkNfTVhJX0FMTE9XX0VOID0gKDB4M0ZGRjAxNjEpLFxyXG5cclxuLyogVGhpcyBpcyBmb3IgVlhJIFNFUlZBTlQgcmVzb3VyY2VzICovXHJcblxyXG5cdFZJX0VWRU5UX1ZYSV9ERVZfQ01EID0gKDB4QkZGRjIwMEYpLFxyXG5cdFZJX0FUVFJfVlhJX0RFVl9DTURfVFlQRSA9ICgweDNGRkY0MDM3KSxcclxuXHRWSV9BVFRSX1ZYSV9ERVZfQ01EX1ZBTFVFID0gKDB4M0ZGRjQwMzgpLFxyXG5cclxuXHRWSV9WWElfREVWX0NNRF9UWVBFXzE2ID0gKDE2KSxcclxuXHRWSV9WWElfREVWX0NNRF9UWVBFXzMyID0gKDMyKSxcclxuXHJcbi8qIG1vZGUgdmFsdWVzIGluY2x1ZGUgVklfVlhJX1JFU1AxNiwgVklfVlhJX1JFU1AzMiwgYW5kIHRoZSBuZXh0IDIgdmFsdWVzICovXHJcblx0VklfVlhJX1JFU1BfTk9ORSA9ICgwKSxcclxuXHRWSV9WWElfUkVTUF9QUk9UX0VSUk9SID0gKC0xKSxcclxuXHJcbi8qIFRoaXMgaXMgZm9yIFZYSSBUVEwgVHJpZ2dlciByb3V0aW5nICovXHJcblxyXG5cdFZJX0FUVFJfVlhJX1RSSUdfTElORVNfRU4gPSAoMHgzRkZGNDA0MyksXHJcblx0VklfQVRUUl9WWElfVFJJR19ESVIgPSAoMHgzRkZGNDA0NCksXHJcblxyXG4vKiBUaGlzIGFsbG93cyBleHRlbmRlZCBTZXJpYWwgc3VwcG9ydCBvbiBXaW4zMiBhbmQgb24gTkkgRU5FVCBTZXJpYWwgcHJvZHVjdHMgKi9cclxuXHJcblx0VklfQVRUUl9BU1JMX0RJU0NBUkRfTlVMTCA9ICgweDNGRkYwMEIwKSxcclxuXHRWSV9BVFRSX0FTUkxfQ09OTkVDVEVEID0gKDB4M0ZGRjAxQkIpLFxyXG5cdFZJX0FUVFJfQVNSTF9CUkVBS19TVEFURSA9ICgweDNGRkYwMUJDKSxcclxuXHRWSV9BVFRSX0FTUkxfQlJFQUtfTEVOID0gKDB4M0ZGRjAxQkQpLFxyXG5cdFZJX0FUVFJfQVNSTF9BTExPV19UUkFOU01JVCA9ICgweDNGRkYwMUJFKSxcclxuXHRWSV9BVFRSX0FTUkxfV0lSRV9NT0RFID0gKDB4M0ZGRjAxQkYpLFxyXG5cclxuXHRWSV9BU1JMX1dJUkVfNDg1XzQgPSAoMCksXHJcblx0VklfQVNSTF9XSVJFXzQ4NV8yX0RUUl9FQ0hPID0gKDEpLFxyXG5cdFZJX0FTUkxfV0lSRV80ODVfMl9EVFJfQ1RSTCA9ICgyKSxcclxuXHRWSV9BU1JMX1dJUkVfNDg1XzJfQVVUTyA9ICgzKSxcclxuXHRWSV9BU1JMX1dJUkVfMjMyX0RURSA9ICgxMjgpLFxyXG5cdFZJX0FTUkxfV0lSRV8yMzJfRENFID0gKDEyOSksXHJcblx0VklfQVNSTF9XSVJFXzIzMl9BVVRPID0gKDEzMCksXHJcblxyXG5cdFZJX0VWRU5UX0FTUkxfQlJFQUsgPSAoMHgzRkZGMjAyMyksXHJcblx0VklfRVZFTlRfQVNSTF9DVFMgPSAoMHgzRkZGMjAyOSksXHJcblx0VklfRVZFTlRfQVNSTF9EU1IgPSAoMHgzRkZGMjAyQSksXHJcblx0VklfRVZFTlRfQVNSTF9EQ0QgPSAoMHgzRkZGMjAyQyksXHJcblx0VklfRVZFTlRfQVNSTF9SSSA9ICgweDNGRkYyMDJFKSxcclxuXHRWSV9FVkVOVF9BU1JMX0NIQVIgPSAoMHgzRkZGMjAzNSksXHJcblx0VklfRVZFTlRfQVNSTF9URVJNQ0hBUiA9ICgweDNGRkYyMDI0KSxcclxuXHJcbi8qIFRoaXMgaXMgZm9yIGZhc3QgdmlQZWVrL3ZpUG9rZSBtYWNyb3MgKi9cclxuXHJcblx0VklfQVRUUl9QWElfU1VCX01BTkZfSUQgPSAoMHgzRkZGMDIwMyksXHJcblx0VklfQVRUUl9QWElfU1VCX01PREVMX0NPREUgPSAoMHgzRkZGMDIwNCksXHJcblxyXG5cdFZJX0FUVFJfUFhJX1VTRV9QUkVBTExPQ19QT09MID0gKDB4M0ZGRjAyMEYpLFxyXG5cclxuXHRWSV9BVFRSX1VTQl9CVUxLX09VVF9QSVBFID0gKDB4M0ZGRjAxQTIpLFxyXG5cdFZJX0FUVFJfVVNCX0JVTEtfSU5fUElQRSA9ICgweDNGRkYwMUEzKSxcclxuXHRWSV9BVFRSX1VTQl9JTlRSX0lOX1BJUEUgPSAoMHgzRkZGMDFBNCksXHJcblx0VklfQVRUUl9VU0JfQ0xBU1MgPSAoMHgzRkZGMDFBNSksXHJcblx0VklfQVRUUl9VU0JfU1VCQ0xBU1MgPSAoMHgzRkZGMDFBNiksXHJcblx0VklfQVRUUl9VU0JfQUxUX1NFVFRJTkcgPSAoMHgzRkZGMDFBOCksXHJcblx0VklfQVRUUl9VU0JfRU5EX0lOID0gKDB4M0ZGRjAxQTkpLFxyXG5cdFZJX0FUVFJfVVNCX05VTV9JTlRGQ1MgPSAoMHgzRkZGMDFBQSksXHJcblx0VklfQVRUUl9VU0JfTlVNX1BJUEVTID0gKDB4M0ZGRjAxQUIpLFxyXG5cdFZJX0FUVFJfVVNCX0JVTEtfT1VUX1NUQVRVUyA9ICgweDNGRkYwMUFDKSxcclxuXHRWSV9BVFRSX1VTQl9CVUxLX0lOX1NUQVRVUyA9ICgweDNGRkYwMUFEKSxcclxuXHRWSV9BVFRSX1VTQl9JTlRSX0lOX1NUQVRVUyA9ICgweDNGRkYwMUFFKSxcclxuXHRWSV9BVFRSX1VTQl9DVFJMX1BJUEUgPSAoMHgzRkZGMDFCMCksXHJcblxyXG5cdFZJX1VTQl9QSVBFX1NUQVRFX1VOS05PV04gPSAoLTEpLFxyXG5cdFZJX1VTQl9QSVBFX1JFQURZID0gKDApLFxyXG5cdFZJX1VTQl9QSVBFX1NUQUxMRUQgPSAoMSksXHJcblxyXG5cdFZJX1VTQl9FTkRfTk9ORSA9ICgwKSxcclxuXHRWSV9VU0JfRU5EX1NIT1JUID0gKDQpLFxyXG5cdFZJX1VTQl9FTkRfU0hPUlRfT1JfQ09VTlQgPSAoNSksXHJcblxyXG5cdFZJX0FUVFJfRklSRVdJUkVfREVTVF9VUFBFUl9PRkZTRVQgPSAoMHgzRkZGMDFGMCksXHJcblx0VklfQVRUUl9GSVJFV0lSRV9TUkNfVVBQRVJfT0ZGU0VUID0gKDB4M0ZGRjAxRjEpLFxyXG5cdFZJX0FUVFJfRklSRVdJUkVfV0lOX1VQUEVSX09GRlNFVCA9ICgweDNGRkYwMUYyKSxcclxuXHRWSV9BVFRSX0ZJUkVXSVJFX1ZFTkRPUl9JRCA9ICgweDNGRkYwMUYzKSxcclxuXHRWSV9BVFRSX0ZJUkVXSVJFX0xPV0VSX0NISVBfSUQgPSAoMHgzRkZGMDFGNCksXHJcblx0VklfQVRUUl9GSVJFV0lSRV9VUFBFUl9DSElQX0lEID0gKDB4M0ZGRjAxRjUpLFxyXG5cclxuXHRWSV9GSVJFV0lSRV9ERkxUX1NQQUNFID0gKDUpLFxyXG59OyIsImltcG9ydCByZWYgZnJvbSAncmVmLW5hcGknXHJcbmV4cG9ydCBjb25zdCBWaUludDE2ID0gcmVmLnR5cGVzLmludDE2O1xyXG5leHBvcnQgY29uc3QgVmlJbnQzMiA9IHJlZi50eXBlcy5pbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpUEludDMyID0gcmVmLnJlZlR5cGUoVmlJbnQzMik7XHJcblxyXG5leHBvcnQgY29uc3QgVmlVSW50MzIgPSByZWYudHlwZXMudWludDMyO1xyXG5leHBvcnQgY29uc3QgVmlQVUludDMyID0gcmVmLnJlZlR5cGUoVmlVSW50MzIpO1xyXG5leHBvcnQgY29uc3QgVmlQSW50MTYgPSByZWYucmVmVHlwZShWaUludDE2KTtcclxuZXhwb3J0IGNvbnN0IFZpVUludDE2ID0gcmVmLnR5cGVzLnVpbnQxNjtcclxuZXhwb3J0IGNvbnN0IFZpUFVJbnQxNiA9IHJlZi5yZWZUeXBlKFZpVUludDE2KTtcclxuZXhwb3J0IGNvbnN0IFZpQ2hhciA9IHJlZi50eXBlcy5jaGFyO1xyXG5leHBvcnQgY29uc3QgVmlQQ2hhciA9IHJlZi5yZWZUeXBlKFZpQ2hhcik7XHJcbmV4cG9ydCBjb25zdCBWaUJ5dGUgPSByZWYudHlwZXMudWNoYXI7XHJcbmV4cG9ydCBjb25zdCBWaVBCeXRlID0gcmVmLnJlZlR5cGUoVmlCeXRlKTtcclxuXHJcbi8vIE5vdGUsIHRoaXMgbmVlZHMgdG8gYmUgVmlVSW50MzIsIG5vdCBWaUludDMyIG90aGVyIHdlIGdldCBuZWdhdGl2ZSBoZXhcclxuZXhwb3J0IGNvbnN0IFZpU3RhdHVzID0gVmlVSW50MzI7XHJcbmV4cG9ydCBjb25zdCBWaVBTdGF0dXMgPSByZWYucmVmVHlwZShWaVN0YXR1cylcclxuZXhwb3J0IGNvbnN0IFZpT2JqZWN0ID0gVmlVSW50MzI7XHJcbmV4cG9ydCBjb25zdCBWaVBPYmplY3QgPSByZWYucmVmVHlwZShWaU9iamVjdClcclxuZXhwb3J0IGNvbnN0IFZpU2Vzc2lvbiA9IFZpVUludDMyO1xyXG5leHBvcnQgY29uc3QgVmlFdmVudCA9IFZpT2JqZWN0O1xyXG5cclxuZXhwb3J0IGNvbnN0IFZpUEV2ZW50ID0gcmVmLnJlZlR5cGUoVmlFdmVudCk7XHJcbmV4cG9ydCBjb25zdCBWaUF0dHIgPSBWaVVJbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpUFNlc3Npb24gPSByZWYucmVmVHlwZShWaVNlc3Npb24pO1xyXG5leHBvcnQgY29uc3QgVmlTdHJpbmcgPSBWaVBDaGFyO1xyXG5leHBvcnQgY29uc3QgVmlDb25zdFN0cmluZyA9IFZpU3RyaW5nO1xyXG5leHBvcnQgY29uc3QgVmlSc3JjID0gVmlTdHJpbmc7XHJcbmV4cG9ydCBjb25zdCBWaUNvbnN0UnNyYyA9IFZpQ29uc3RTdHJpbmc7XHJcbmV4cG9ydCBjb25zdCBWaUFjY2Vzc01vZGUgPSBWaVVJbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpQnVmID0gVmlQQnl0ZTtcclxuZXhwb3J0IGNvbnN0IFZpUEJ1ZiA9IFZpUEJ5dGU7XHJcbmV4cG9ydCBjb25zdCBWaUNvbnN0QnVmID0gVmlQQnl0ZTtcclxuZXhwb3J0IGNvbnN0IFZpRmluZExpc3QgPSBWaU9iamVjdDtcclxuZXhwb3J0IGNvbnN0IFZpUEZpbmRMaXN0ID0gcmVmLnJlZlR5cGUoVmlGaW5kTGlzdCk7XHJcblxyXG5leHBvcnQgY29uc3QgVmlKb2JJZCA9IFZpVUludDMyXHJcbmV4cG9ydCBjb25zdCBWaVBKb2JJZCA9IHJlZi5yZWZUeXBlKFZpSm9iSWQpXHJcblxyXG5leHBvcnQgY29uc3QgVmlFdmVudFR5cGUgPSBWaVVJbnQzMlxyXG5leHBvcnQgY29uc3QgVmlQRXZlbnRUeXBlID0gcmVmLnJlZlR5cGUoVmlFdmVudFR5cGUpXHJcblxyXG5leHBvcnQgY29uc3QgVmlFdmVudEZpbHRlciA9IFZpVUludDMyIiwiaW1wb3J0IHsgYWdWaXNhIH0gZnJvbSBcIi4vbmlfdmlzYVwiXHJcblxyXG5jb25zdCBWSV9FUlJPUiA9IDB4ODAwMDAwMDBcclxuZXhwb3J0IGVudW0gVmlDbG9zZUNvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwLCAvL1Nlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgIFZJX1dBUk5fTlVMTF9PQkpFQ1QgPSAweDNGRkYwMDgyLy8gVGhlIHNwZWNpZmllZCBvYmplY3QgcmVmZXJlbmNlIGlzIHVuaW5pdGlhbGl6ZWQuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZpQ2xvc2VFcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfQ0xPU0lOR19GQUlMRUQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTYsIC8vIFVuYWJsZSB0byBkZWFsbG9jYXRlIHRoZSBwcmV2aW91c2x5IGFsbG9jYXRlZCBkYXRhIHN0cnVjdHVyZXMgY29ycmVzcG9uZGluZyB0byB0aGlzIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZS5cclxuICAgIFZJX0VSUk9SX0lOVl9TRVNTSU9OID0gVklfRVJST1IgKyAweDNGRkYwMDBFLCAvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS5cclxuICAgIFZJX0VSUk9SX0lOVl9PQkpFQ1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpQ2xvc2UodmlPYmplY3Q6IG51bWJlcik6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gVklfRVJST1JcclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpQ2xvc2UodmlPYmplY3QpXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaUNsb3NlQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTUzpcclxuICAgICAgICAgICAgY2FzZSBWaUNsb3NlQ29tcGxldGlvbkNvZGUuVklfV0FSTl9OVUxMX09CSkVDVDoge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGB2aUNsb3NlIEVycm9yOiBzdGF0dXM6ICR7c3RhdHVzfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgYWdWaXNhIH0gZnJvbSBcIi4vbmlfdmlzYVwiXHJcblxyXG5jb25zdCBWSV9FUlJPUiA9IDB4ODAwMDAwMDBcclxuZXhwb3J0IGVudW0gVmlPcGVuQ29tcGxldGlvbkNvZGUge1xyXG4gICAgVklfU1VDQ0VTUyA9IDAsIC8vU2Vzc2lvbiB0byB0aGUgRGVmYXVsdCBSZXNvdXJjZSBNYW5hZ2VyIHJlc291cmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgVklfU1VDQ0VTU19ERVZfTlBSRVNFTlQgPSAweDNGRkYwMDdELCAvLyBTZXNzaW9uIG9wZW5lZCBzdWNjZXNzZnVsbHksIGJ1dCB0aGUgZGV2aWNlIGF0IHRoZSBzcGVjaWZpZWQgYWRkcmVzcyBpcyBub3QgcmVzcG9uZGluZy5cclxuICAgIFZJX1dBUk5fQ09ORklHX05MT0FERUQgPSAweDNGRkYwMDc3LCAvLyBUaGUgc3BlY2lmaWVkIGNvbmZpZ3VyYXRpb24gZWl0aGVyIGRvZXMgbm90IGV4aXN0IG9yIGNvdWxkIG5vdCBiZSBsb2FkZWQgdXNpbmcgVklTQS1zcGVjaWZpZWQgZGVmYXVsdHMuXHJcbiAgICBWSV9XQVJOX1NFUlZFUl9DRVJUX1VOVFJVU1RFRCA9IDB4M0ZGRjAwRjAsIC8vIEEgSGlTTElQIFZJU0EgY2xpZW50IGRvZXMgbm90IHRydXN0IHRoZSBzZXJ2ZXIgY2VydGlmaWNhdGUuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZpT3BlbkVycm9yQ29kZSB7XHJcbiAgICBWSV9FUlJPUl9BTExPQyA9IFZJX0VSUk9SICsgMHgzRkZGMDAzQywgLy8gSW5zdWZmaWNpZW50IHN5c3RlbSByZXNvdXJjZXMgdG8gb3BlbiBhIHNlc3Npb24uXHJcbiAgICBWSV9FUlJPUl9JTlRGX05VTV9OQ09ORklHID0gVklfRVJST1IgKyAweDNGRkYwMEE1LCAvLyBUaGUgaW50ZXJmYWNlIHR5cGUgaXMgdmFsaWQgYnV0IHRoZSBzcGVjaWZpZWQgaW50ZXJmYWNlIG51bWJlciBpcyBub3QgY29uZmlndXJlZC5cclxuICAgIFZJX0VSUk9SX0lOVl9BQ0NfTU9ERSA9IFZJX0VSUk9SICsgMHgzRkZGMDAxMywgLy8gSW52YWxpZCBhY2Nlc3MgbW9kZS5cclxuICAgIFZJX0VSUk9SX0lOVl9SU1JDX05BTUUgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTIsIC8vIEludmFsaWQgcmVzb3VyY2UgcmVmZXJlbmNlIHNwZWNpZmllZC4gUGFyc2luZyBlcnJvci5cclxuICAgIFZJX0VSUk9SX0lOVl9TRVNTSU9OID0gVklfRVJST1IgKyAweDNGRkYwMDBFLCAvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS5cclxuICAgIFZJX0VSUk9SX0lOVl9PQkpFQ1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX1BST1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNzksIC8vIFRoZSByZXNvdXJjZSBkZXNjcmlwdG9yIHNwZWNpZmllcyBhIHNlY3VyZSBjb25uZWN0aW9uLCBidXQgdGhlIGRldmljZSBvciBWSVNBIGltcGxlbWVudGF0aW9uIGRvZXMgbm90IHN1cHBvcnQgc2VjdXJlIGNvbm5lY3Rpb25zLCBvciBzZWN1cml0eSBoYXMgYmVlbiBkaXNhYmxlZCBvbiB0aGUgZGV2aWNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gb3IgdGhlIGFkZHJlc3Mgc3RyaW5nIGluZGljYXRlcyBhIHNlY3VyZSBjb25uZWN0aW9uIHNob3VsZCBiZSBtYWRlLCBidXQgdGhlIGRlc2lnbmF0ZWQgcG9ydCBpcyBub3QgZm9yIGEgVExTIHNlcnZlci4gXHJcbiAgICBWSV9FUlJPUl9MSUJSQVJZX05GT1VORCA9IFZJX0VSUk9SICsgMHgzRkZGMDA5RSwgLy8gQSBjb2RlIGxpYnJhcnkgcmVxdWlyZWQgYnkgVklTQSBjb3VsZCBub3QgYmUgbG9jYXRlZCBvciBsb2FkZWQuXHJcbiAgICBWSV9FUlJPUl9OUEVSTUlTU0lPTiA9IFZJX0VSUk9SICsgMHgzRkZGMDBBOCwgLy8gQSBzZWN1cmUgY29ubmVjdGlvbiBjb3VsZCBub3QgYmUgY3JlYXRlZCBiZWNhdXNlIHRoZSBpbnN0cnVtZW50IHJlZnVzZWQgdGhlIGNyZWRlbnRpYWxzIHByb2ZmZXJlZCBieSBWSVNBIG9yIHRoZSBjcmVkZW50aWFsIGluZm9ybWF0aW9uIGNvdWxkIG5vdCBiZSBtYXBwZWQgdG8gdmFsaWQgY3JlZGVudGlhbHMuIFxyXG4gICAgVklfRVJST1JfTlNVUF9PUEVSID0gVklfRVJST1IgKyAweDNGRkYwMDY3LCAvLyBUaGUgZ2l2ZW4gc2VzbiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgZnVuY3Rpb24uIEZvciBWSVNBLCB0aGlzIGZ1bmN0aW9uIGlzIHN1cHBvcnRlZCBvbmx5IGJ5IHRoZSBEZWZhdWx0IFJlc291cmNlIE1hbmFnZXIgc2Vzc2lvbi5cclxuICAgIFZJX0VSUk9SX1JTUkNfQlVTWSA9IFZJX0VSUk9SICsgMHgzRkZGMDA3MiwgLy8gVGhlIHJlc291cmNlIGlzIHZhbGlkIGJ1dCBWSVNBIGNhbm5vdCBjdXJyZW50bHkgYWNjZXNzIGl0LlxyXG4gICAgVklfRVJST1JfUlNSQ19MT0NLRUQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEYsIC8vIFNwZWNpZmllZCB0eXBlIG9mIGxvY2sgY2Fubm90IGJlIG9idGFpbmVkIGJlY2F1c2UgdGhlIHJlc291cmNlIGlzIGFscmVhZHkgbG9ja2VkIHdpdGggYSBsb2NrIHR5cGUgaW5jb21wYXRpYmxlIHdpdGggdGhlIGxvY2sgcmVxdWVzdGVkLlxyXG4gICAgVklfRVJST1JfUlNSQ19ORk9VTkQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTEsIC8vIEluc3VmZmljaWVudCBsb2NhdGlvbiBpbmZvcm1hdGlvbiBvciByZXNvdXJjZSBub3QgcHJlc2VudCBpbiB0aGUgc3lzdGVtLlxyXG4gICAgVklfRVJST1JfU0VSVkVSX0NFUlQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwQjAsIC8vIEEgc2VjdXJlIGNvbm5lY3Rpb24gY291bGQgbm90IGJlIGNyZWF0ZWQgZHVlIHRvIHRoZSBpbnN0cnVtZW50IGNlcnRpZmljYXRlIGJlaW5nIGludmFsaWQgb3IgdW50cnVzdGVkLiBcclxuICAgIFZJX0VSUk9SX1RNTyA9IFZJX0VSUk9SICsgMHgzRkZGMDAxNSwgLy8gQSBzZXNzaW9uIHRvIHRoZSByZXNvdXJjZSBjb3VsZCBub3QgYmUgb2J0YWluZWQgd2l0aGluIHRoZSBzcGVjaWZpZWQgdGltZW91dCBwZXJpb2QuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlPcGVuKHZpU2Vzc2lvbjogbnVtYmVyLCB2aXNhX3Jlc291cmNlOiBzdHJpbmcsIHZpQWNjZXNzTW9kZTogbnVtYmVyLCB0aW1lb3V0OiBudW1iZXIpOiBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIHNlc3Npb246IG51bWJlciB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgc2Vzc2lvbjogbnVtYmVyIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG5cclxuICAgICAgICBsZXQgYnVmZmVyU2Vzc2lvbiA9IEJ1ZmZlci5hbGxvYyg0KSAvL3UzMlxyXG5cclxuICAgICAgICBzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuKHZpU2Vzc2lvbiwgdmlzYV9yZXNvdXJjZSwgdmlBY2Nlc3NNb2RlLCB0aW1lb3V0LCBidWZmZXJTZXNzaW9uIGFzIGFueSlcclxuXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5Db21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkNvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1NfREVWX05QUkVTRU5UOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkNvbXBsZXRpb25Db2RlLlZJX1dBUk5fQ09ORklHX05MT0FERUQ6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuQ29tcGxldGlvbkNvZGUuVklfV0FSTl9TRVJWRVJfQ0VSVF9VTlRSVVNURUQ6IHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXNzaW9uOiBudW1iZXIgPSBidWZmZXJTZXNzaW9uLnJlYWRVSW50MzJMRSgpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiBzdGF0dXMsIHNlc3Npb246IHNlc3Npb24gfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoYHZpT3BlbiBFcnJvcjogc3RhdHVzOiAke3N0YXR1c31gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iLCJpbXBvcnQgeyBhZ1Zpc2EgfSBmcm9tIFwiLi9uaV92aXNhXCJcclxuXHJcbmNvbnN0IFZJX0VSUk9SID0gMHg4MDAwMDAwMFxyXG5leHBvcnQgZW51bSBWaU9wZW5EZWZhdWx0Uk1Db21wbGV0aW9uQ29kZSB7XHJcbiAgICBWSV9TVUNDRVNTID0gMCAvL1Nlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlPcGVuRGVmYXVsdFJNRXJyb3JDb2RlIHtcclxuICAgIFZJX0VSUk9SX0FMTE9DID0gVklfRVJST1IgKyAweDNGRkYwMDNDLCAvLyBJbnN1ZmZpY2llbnQgc3lzdGVtIHJlc291cmNlcyB0byBjcmVhdGUgYSBzZXNzaW9uIHRvIHRoZSBEZWZhdWx0IFJlc291cmNlIE1hbmFnZXIgcmVzb3VyY2UuXHJcbiAgICBWSV9FUlJPUl9JTlZfU0VUVVAgPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0EsIC8vIFNvbWUgaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmaWxlIGlzIGNvcnJ1cHQgb3IgZG9lcyBub3QgZXhpc3QuXHJcbiAgICBWSV9FUlJPUl9TWVNURU1fRVJST1IgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMDAsIC8vVGhlIFZJU0Egc3lzdGVtIGZhaWxlZCB0byBpbml0aWFsaXplLlxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlPcGVuRGVmYXVsdFJNKCk6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgZGVmYXVsdFJNOiBudW1iZXIgfT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIGRlZmF1bHRSTTogbnVtYmVyIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG4gICAgICAgIC8vIGFsbG9jYXRlIGEgYnVmZmVyIGZvciB0aGUgc2Vzc2lvbiByZXNwb25zZVxyXG4gICAgICAgIGxldCBidWZmZXIgPSBCdWZmZXIuYWxsb2MoNClcclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpT3BlbkRlZmF1bHRSTShidWZmZXIgYXMgYW55KVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzID09PSBWaU9wZW5EZWZhdWx0Uk1Db21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXNzaW9uOiBudW1iZXIgPSBidWZmZXIucmVhZFVJbnQzMkxFKClcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCBkZWZhdWx0Uk06IHNlc3Npb24gfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlamVjdChgdmlPcGVuRGVmYXVsdFJNIEVycm9yOiBzdGF0dXM6ICR7c3RhdHVzfWApXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsImltcG9ydCB7IGFnVmlzYSB9IGZyb20gXCIuL25pX3Zpc2FcIlxyXG5cclxuY29uc3QgVklfRVJST1IgPSAweDgwMDAwMDAwXHJcblxyXG5leHBvcnQgZW51bSBWaVJlYWRDb21wbGV0aW9uQ29kZSB7XHJcbiAgICBWSV9TVUNDRVNTID0gMCwgLy9TZXNzaW9uIHRvIHRoZSBEZWZhdWx0IFJlc291cmNlIE1hbmFnZXIgcmVzb3VyY2UgY3JlYXRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICBWSV9TVUNDRVNTX1RFUk1fQ0hBUiA9IDB4M0ZGRjAwMDUsLy8gVGhlIHNwZWNpZmllZCB0ZXJtaW5hdGlvbiBjaGFyYWN0ZXIgd2FzIHJlYWQuXHJcbiAgICBWSV9TVUNDRVNTX01BWF9DTlQgPSAweDNGRkYwMDA2LC8vIFRoZSBudW1iZXIgb2YgYnl0ZXMgcmVhZCBpcyBlcXVhbCB0byBjb3VudC5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWaVJlYWRFcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfQVNSTF9GUkFNSU5HID0gVklfRVJST1IgKyAweDNGRkYwMDZCLCAvLyBBIGZyYW1pbmcgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfQVNSTF9PVkVSUlVOID0gVklfRVJST1IgKyAweDNGRkYwMDZDLCAvLyBBbiBvdmVycnVuIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci4gQSBjaGFyYWN0ZXIgd2FzIG5vdCByZWFkIGZyb20gdGhlIGhhcmR3YXJlIGJlZm9yZSB0aGUgbmV4dCBjaGFyYWN0ZXIgYXJyaXZlZC5cclxuICAgIFZJX0VSUk9SX0FTUkxfUEFSSVRZID0gVklfRVJST1IgKyAweDNGRkYwMDZBLCAvLyBBIHBhcml0eSBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9CRVJSID0gVklfRVJST1IgKyAweDNGRkYwMDM4LCAvLyBCdXMgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfQ09OTl9MT1NUID0gVklfRVJST1IgKyAweDNGRkYwMEE2LCAgLy8gVGhlIEkvTyBjb25uZWN0aW9uIGZvciB0aGUgZ2l2ZW4gc2Vzc2lvbiBoYXMgYmVlbiBsb3N0LlxyXG4gICAgVklfRVJST1JfSU5WX1NFU1NJT04gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX09CSkVDVCA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9JTlZfU0VUVVAgPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0EsIC8vIFVuYWJsZSB0byBzdGFydCB3cml0ZSBmdW5jdGlvbiBiZWNhdXNlIHNldHVwIGlzIGludmFsaWQgKGR1ZSB0byBhdHRyaWJ1dGVzIGJlaW5nIHNldCB0byBhbiBpbmNvbnNpc3RlbnQgc3RhdGUpLlxyXG4gICAgVklfRVJST1JfSU8gPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0UsIC8vIFVua25vd24gSS9PIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX05DSUMgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNjAsIC8vIFRoZSBpbnRlcmZhY2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiB2aSBpcyBub3QgY3VycmVudGx5IHRoZSBjb250cm9sbGVyIGluIGNoYXJnZS5cclxuICAgIFZJX0VSUk9SX05MSVNURU5FUlMgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNUYsIC8vIE5vIExpc3RlbmVycyBjb25kaXRpb24gaXMgZGV0ZWN0ZWQgKGJvdGggTlJGRCBhbmQgTkRBQyBhcmUgZGUtYXNzZXJ0ZWQpLlxyXG4gICAgVklfRVJST1JfTlNVUF9PUEVSID0gVklfRVJST1IgKyAweDNGRkYwMDY3LCAvLyBUaGUgZ2l2ZW4gdmkgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIGZ1bmN0aW9uLlxyXG4gICAgVklfRVJST1JfT1VUUF9QUk9UX1ZJT0wgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzYsIC8vICBEZXZpY2UgcmVwb3J0ZWQgYW4gb3V0cHV0IHByb3RvY29sIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX1JBV19SRF9QUk9UX1ZJT0wgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzUsIC8vIFZpb2xhdGlvbiBvZiByYXcgcmVhZCBwcm90b2NvbCBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9SQVdfV1JfUFJPVF9WSU9MID0gVklfRVJST1IgKyAweDNGRkYwMDM0LCAvLyBWaW9sYXRpb24gb2YgcmF3IHdyaXRlIHByb3RvY29sIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX1JTUkNfTE9DS0VEID0gVklfRVJST1IgKyAweDNGRkYwMDBGLCAvLyBTcGVjaWZpZWQgb3BlcmF0aW9uIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgYmVjYXVzZSB0aGUgcmVzb3VyY2UgaWRlbnRpZmllZCBieSB2aSBoYXMgYmVlbiBsb2NrZWQgZm9yIHRoaXMga2luZCBvZiBhY2Nlc3MuXHJcbiAgICBWSV9FUlJPUl9UTU8gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTUsIC8vIEEgc2Vzc2lvbiB0byB0aGUgcmVzb3VyY2UgY291bGQgbm90IGJlIG9idGFpbmVkIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHRpbWVvdXQgcGVyaW9kLlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpUmVhZCh2aVNlc3Npb246IG51bWJlciwgY291bnQ6bnVtYmVyICk6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgcmV0Q291bnQ6IG51bWJlciwgYnVmOnN0cmluZyB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgcmV0Q291bnQ6IG51bWJlciwgYnVmOiBzdHJpbmcgfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGxldCBzdGF0dXM6IG51bWJlciA9IFZJX0VSUk9SXHJcblxyXG4gICAgICAgIGxldCBidWZmZXJSZXRDb3VudCA9IEJ1ZmZlci5hbGxvYyg0KSAvL3UzMlxyXG4gICAgICAgIGxldCBidWZmZXJCdWYgPSBCdWZmZXIuYWxsb2MoY291bnQpIC8vdTMyXHJcblxyXG4gICAgICAgIHN0YXR1cyA9IGFnVmlzYS52aVJlYWQodmlTZXNzaW9uLCBidWZmZXJCdWYgYXMgYW55LCBjb3VudCwgYnVmZmVyUmV0Q291bnQgYXMgYW55KVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFZpUmVhZENvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1M6XHJcbiAgICAgICAgICAgIGNhc2UgVmlSZWFkQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTU19NQVhfQ05UOlxyXG4gICAgICAgICAgICBjYXNlIFZpUmVhZENvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1NfVEVSTV9DSEFSOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0Q291bnQ6IG51bWJlciA9IGJ1ZmZlclJldENvdW50LnJlYWRVSW50MzJMRSgpXHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmOiBzdHJpbmcgPSBidWZmZXJCdWYucmVhZENTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCByZXRDb3VudDogcmV0Q291bnQsIGJ1ZjogYnVmICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChgdmlSZWFkIEVycm9yOiBzdGF0dXM6ICR7c3RhdHVzfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgYWdWaXNhIH0gZnJvbSBcIi4vbmlfdmlzYVwiXHJcblxyXG5jb25zdCBWSV9FUlJPUiA9IDB4ODAwMDAwMDBcclxuZXhwb3J0IGVudW0gVmlXcml0ZUNvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwLCAvL1Nlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlXcml0ZUVycm9yQ29kZSB7XHJcbiAgICBWSV9FUlJPUl9CRVJSID0gVklfRVJST1IgKyAweDNGRkYwMDM4LCAvLyBCdXMgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfQ09OTl9MT1NUID0gVklfRVJST1IgKyAweDNGRkYwMEE2LCAgLy8gVGhlIEkvTyBjb25uZWN0aW9uIGZvciB0aGUgZ2l2ZW4gc2Vzc2lvbiBoYXMgYmVlbiBsb3N0LlxyXG4gICAgVklfRVJST1JfSU5QX1BST1RfVklPTCA9IFZJX0VSUk9SICsgMHgzRkZGMDAzNywgLy8gRGV2aWNlIHJlcG9ydGVkIGFuIGlucHV0IHByb3RvY29sIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX0lOVl9TRVNTSU9OID0gVklfRVJST1IgKyAweDNGRkYwMDBFLCAvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS5cclxuICAgIFZJX0VSUk9SX0lOVl9PQkpFQ1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX1NFVFVQID0gVklfRVJST1IgKyAweDNGRkYwMDNBLCAvLyBVbmFibGUgdG8gc3RhcnQgd3JpdGUgZnVuY3Rpb24gYmVjYXVzZSBzZXR1cCBpcyBpbnZhbGlkIChkdWUgdG8gYXR0cmlidXRlcyBiZWluZyBzZXQgdG8gYW4gaW5jb25zaXN0ZW50IHN0YXRlKS5cclxuICAgIFZJX0VSUk9SX0lPID0gVklfRVJST1IgKyAweDNGRkYwMDNFLCAvLyBVbmtub3duIEkvTyBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9OQ0lDID0gVklfRVJST1IgKyAweDNGRkYwMDYwLCAvLyBUaGUgaW50ZXJmYWNlIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gdmkgaXMgbm90IGN1cnJlbnRseSB0aGUgY29udHJvbGxlciBpbiBjaGFyZ2UuXHJcbiAgICBWSV9FUlJPUl9OTElTVEVORVJTID0gVklfRVJST1IgKyAweDNGRkYwMDVGLCAvLyBObyBMaXN0ZW5lcnMgY29uZGl0aW9uIGlzIGRldGVjdGVkIChib3RoIE5SRkQgYW5kIE5EQUMgYXJlIGRlLWFzc2VydGVkKS5cclxuICAgIFZJX0VSUk9SX05TVVBfT1BFUiA9IFZJX0VSUk9SICsgMHgzRkZGMDA2NywgLy8gVGhlIGdpdmVuIHZpIGRvZXMgbm90IHN1cHBvcnQgdGhpcyBmdW5jdGlvbi5cclxuICAgIFZJX0VSUk9SX1JBV19SRF9QUk9UX1ZJT0wgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzUsIC8vIFZpb2xhdGlvbiBvZiByYXcgcmVhZCBwcm90b2NvbCBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9SQVdfV1JfUFJPVF9WSU9MID0gVklfRVJST1IgKyAweDNGRkYwMDM0LCAvLyBWaW9sYXRpb24gb2YgcmF3IHdyaXRlIHByb3RvY29sIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX1JTUkNfTE9DS0VEID0gVklfRVJST1IgKyAweDNGRkYwMDBGLCAvLyBTcGVjaWZpZWQgb3BlcmF0aW9uIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgYmVjYXVzZSB0aGUgcmVzb3VyY2UgaWRlbnRpZmllZCBieSB2aSBoYXMgYmVlbiBsb2NrZWQgZm9yIHRoaXMga2luZCBvZiBhY2Nlc3MuXHJcbiAgICBWSV9FUlJPUl9UTU8gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTUsIC8vIEEgc2Vzc2lvbiB0byB0aGUgcmVzb3VyY2UgY291bGQgbm90IGJlIG9idGFpbmVkIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHRpbWVvdXQgcGVyaW9kLlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpV3JpdGUodmlTZXNzaW9uOiBudW1iZXIsIGJ1ZmY6IHN0cmluZyk6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgcmV0Q291bnQ6IG51bWJlciB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgcmV0Q291bnQ6IG51bWJlciB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gVklfRVJST1JcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlclJldENvdW50ID0gQnVmZmVyLmFsbG9jKDQpIC8vdTMyXHJcblxyXG4gICAgICAgIHN0YXR1cyA9IGFnVmlzYS52aVdyaXRlKHZpU2Vzc2lvbiwgYnVmZiwgYnVmZi5sZW5ndGgsIGJ1ZmZlclJldENvdW50IGFzIGFueSlcclxuXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaVdyaXRlQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTUzoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJldENvdW50OiBudW1iZXIgPSBidWZmZXJSZXRDb3VudC5yZWFkVUludDMyTEUoKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCByZXRDb3VudDogcmV0Q291bnQgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoYHZpV3JpdGUgRXJyb3I6IHN0YXR1czogJHtzdGF0dXN9YClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmZmktbmFwaVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWYtbmFwaVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=