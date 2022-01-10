(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Svisa", [], factory);
	else if(typeof exports === 'object')
		exports["Svisa"] = factory();
	else
		root["Svisa"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ni-visa/get_resources.ts":
/*!**************************************!*\
  !*** ./src/ni-visa/get_resources.ts ***!
  \**************************************/
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
exports.getResources = exports.viWrite = exports.viRead = exports.viOpenDefaultRM = exports.viOpen = exports.viClose = void 0;
//import { visaAsyncQuery, visaQuery, visaQueryToPromise } from './ni-visa/ni_visa'
var vi_close_1 = __webpack_require__(/*! ./vi_close */ "./src/ni-visa/vi_close.ts");
Object.defineProperty(exports, "viClose", ({ enumerable: true, get: function () { return vi_close_1.viClose; } }));
var vi_open_1 = __webpack_require__(/*! ./vi_open */ "./src/ni-visa/vi_open.ts");
Object.defineProperty(exports, "viOpen", ({ enumerable: true, get: function () { return vi_open_1.viOpen; } }));
var vi_open_default_r_m_1 = __webpack_require__(/*! ./vi_open_default_r_m */ "./src/ni-visa/vi_open_default_r_m.ts");
Object.defineProperty(exports, "viOpenDefaultRM", ({ enumerable: true, get: function () { return vi_open_default_r_m_1.viOpenDefaultRM; } }));
var vi_read_1 = __webpack_require__(/*! ./vi_read */ "./src/ni-visa/vi_read.ts");
Object.defineProperty(exports, "viRead", ({ enumerable: true, get: function () { return vi_read_1.viRead; } }));
var vi_write_1 = __webpack_require__(/*! ./vi_write */ "./src/ni-visa/vi_write.ts");
Object.defineProperty(exports, "viWrite", ({ enumerable: true, get: function () { return vi_write_1.viWrite; } }));
const ni_visa_constants_1 = __webpack_require__(/*! ./ni_visa_constants */ "./src/ni-visa/ni_visa_constants.ts");
const vi_close_2 = __webpack_require__(/*! ./vi_close */ "./src/ni-visa/vi_close.ts");
const vi_find_next_1 = __webpack_require__(/*! ./vi_find_next */ "./src/ni-visa/vi_find_next.ts");
const vi_find_rsrc_1 = __webpack_require__(/*! ./vi_find_rsrc */ "./src/ni-visa/vi_find_rsrc.ts");
const vi_get_attribute_1 = __webpack_require__(/*! ./vi_get_attribute */ "./src/ni-visa/vi_get_attribute.ts");
const vi_open_2 = __webpack_require__(/*! ./vi_open */ "./src/ni-visa/vi_open.ts");
const vi_open_default_r_m_2 = __webpack_require__(/*! ./vi_open_default_r_m */ "./src/ni-visa/vi_open_default_r_m.ts");
const getResources = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let viResources = [];
        let viResources_with_present = [];
        try {
            // open default session
            let defaultRM = yield (0, vi_open_default_r_m_2.viOpenDefaultRM)();
            console.log(defaultRM);
            let attr = yield (0, vi_get_attribute_1.viGetAttribute)(defaultRM.defaultRM, ni_visa_constants_1.NiVisaConstants.VI_KTATTR_RETURN_ALL);
            console.log(attr);
            // get the list of equipment seen by pc
            let findList = yield (0, vi_find_rsrc_1.ViFindRsrc)(defaultRM.defaultRM, "?*");
            console.log(findList);
            viResources.push(findList.instrDesc);
            // loop through list of resource collection the resource name
            for (let i = 0; i < findList.retcnt - 1; i++) {
                let next = yield (0, vi_find_next_1.ViFindNext)(findList.findList);
                viResources.push(next.instrDesc);
            }
            // verify the resources are present
            for (let i = 0; i < viResources.length; i++) {
                // console.log(`attempting to open ${viResources[i]}`)
                // attempting to open  
                let openAttempt = yield (0, vi_open_2.viOpen)(defaultRM.defaultRM, viResources[i], ni_visa_constants_1.NiVisaConstants.VI_NULL, ni_visa_constants_1.NiVisaConstants.VI_NULL);
                if (openAttempt.status == 0) {
                    viResources_with_present.push({ resourceName: viResources[i], present: true });
                    (0, vi_close_2.viClose)(openAttempt.session);
                }
                else {
                    viResources_with_present.push({ resourceName: viResources[i], present: false });
                }
            }
            (0, vi_close_2.viClose)(defaultRM.defaultRM);
            resolve(viResources_with_present);
        }
        catch (err) {
            console.log(err);
        }
    }));
});
exports.getResources = getResources;


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
exports.visaQueryToPromise = exports.visaAsyncQuery = exports.visaQuery = exports.agVisa = void 0;
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
    // Get and Set Attributes
    'viSetAttribute': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, ni_visa_types_1.ViAttr, ni_visa_types_1.ViAttrState]],
    'viGetAttribute': [ni_visa_types_1.ViStatus, [ni_visa_types_1.ViSession, ni_visa_types_1.ViAttr, ni_visa_types_1.ViPAttrState]],
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
    NiVisaConstants[NiVisaConstants["VI_KTATTR_RETURN_ALL"] = 268370018] = "VI_KTATTR_RETURN_ALL";
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
exports.ViEventFilter = exports.ViPEventType = exports.ViEventType = exports.ViPJobId = exports.ViJobId = exports.ViPFindList = exports.ViFindList = exports.ViConstBuf = exports.ViPBuf = exports.ViBuf = exports.ViAccessMode = exports.ViConstRsrc = exports.ViRsrc = exports.ViConstString = exports.ViString = exports.ViPSession = exports.ViPAttrState = exports.ViAttrState = exports.ViAttr = exports.ViPEvent = exports.ViEvent = exports.ViSession = exports.ViPObject = exports.ViObject = exports.ViPStatus = exports.ViStatus = exports.ViPByte = exports.ViByte = exports.ViPChar = exports.ViChar = exports.ViPUInt16 = exports.ViUInt16 = exports.ViPInt16 = exports.ViPUInt32 = exports.ViUInt32 = exports.ViPInt32 = exports.ViInt32 = exports.ViInt16 = void 0;
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
exports.ViAttrState = exports.ViUInt32;
exports.ViPAttrState = ref_napi_1.default.refType(exports.ViUInt32);
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

/***/ "./src/ni-visa/vi_find_next.ts":
/*!*************************************!*\
  !*** ./src/ni-visa/vi_find_next.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViFindNext = exports.ViFindNextErrorCode = exports.ViFindNextCompletionCode = void 0;
const ni_visa_1 = __webpack_require__(/*! ./ni_visa */ "./src/ni-visa/ni_visa.ts");
const VI_ERROR = 0x80000000;
var ViFindNextCompletionCode;
(function (ViFindNextCompletionCode) {
    ViFindNextCompletionCode[ViFindNextCompletionCode["VI_SUCCESS"] = 0] = "VI_SUCCESS";
})(ViFindNextCompletionCode = exports.ViFindNextCompletionCode || (exports.ViFindNextCompletionCode = {}));
var ViFindNextErrorCode;
(function (ViFindNextErrorCode) {
    ViFindNextErrorCode[ViFindNextErrorCode["VI_ERROR_INV_SESSION"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_SESSION";
    ViFindNextErrorCode[ViFindNextErrorCode["VI_ERROR_INV_OBJECT"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_OBJECT";
    ViFindNextErrorCode[ViFindNextErrorCode["VI_ERROR_NSUP_OPER"] = VI_ERROR + 0x3FFF0067] = "VI_ERROR_NSUP_OPER";
    ViFindNextErrorCode[ViFindNextErrorCode["VI_ERROR_RSRC_NFOUND"] = VI_ERROR + 0x3FFF0011] = "VI_ERROR_RSRC_NFOUND"; // Specified expression does not match any devices.
})(ViFindNextErrorCode = exports.ViFindNextErrorCode || (exports.ViFindNextErrorCode = {}));
function ViFindNext(viSession) {
    return new Promise((resolve, reject) => {
        let status = VI_ERROR;
        let buffer_instrDesc = Buffer.alloc(512); // CString description
        status = ni_visa_1.agVisa.viFindNext(viSession, buffer_instrDesc);
        switch (status) {
            case ViFindNextCompletionCode.VI_SUCCESS: {
                let instrDesc = buffer_instrDesc.readCString();
                resolve({ status: status, instrDesc: instrDesc });
            }
            default: {
                reject(`viFindNext Error: status: ${status}`);
            }
        }
    });
}
exports.ViFindNext = ViFindNext;


/***/ }),

/***/ "./src/ni-visa/vi_find_rsrc.ts":
/*!*************************************!*\
  !*** ./src/ni-visa/vi_find_rsrc.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViFindRsrc = exports.ViFindRsrcErrorCode = exports.ViFindRsrcCompletionCode = void 0;
const ni_visa_1 = __webpack_require__(/*! ./ni_visa */ "./src/ni-visa/ni_visa.ts");
const VI_ERROR = 0x80000000;
var ViFindRsrcCompletionCode;
(function (ViFindRsrcCompletionCode) {
    ViFindRsrcCompletionCode[ViFindRsrcCompletionCode["VI_SUCCESS"] = 0] = "VI_SUCCESS";
})(ViFindRsrcCompletionCode = exports.ViFindRsrcCompletionCode || (exports.ViFindRsrcCompletionCode = {}));
var ViFindRsrcErrorCode;
(function (ViFindRsrcErrorCode) {
    ViFindRsrcErrorCode[ViFindRsrcErrorCode["VI_ERROR_INV_EXPR"] = VI_ERROR + 0x3FFF0010] = "VI_ERROR_INV_EXPR";
    ViFindRsrcErrorCode[ViFindRsrcErrorCode["VI_ERROR_INV_SESSION"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_SESSION";
    ViFindRsrcErrorCode[ViFindRsrcErrorCode["VI_ERROR_INV_OBJECT"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_OBJECT";
    ViFindRsrcErrorCode[ViFindRsrcErrorCode["VI_ERROR_NSUP_OPER"] = VI_ERROR + 0x3FFF0067] = "VI_ERROR_NSUP_OPER";
    ViFindRsrcErrorCode[ViFindRsrcErrorCode["VI_ERROR_RSRC_NFOUND"] = VI_ERROR + 0x3FFF0011] = "VI_ERROR_RSRC_NFOUND"; // Specified expression does not match any devices.
})(ViFindRsrcErrorCode = exports.ViFindRsrcErrorCode || (exports.ViFindRsrcErrorCode = {}));
function ViFindRsrc(viSession, expr) {
    return new Promise((resolve, reject) => {
        let status = VI_ERROR;
        let bufferFindList = Buffer.alloc(4); //u32
        let buffer_retcnt = Buffer.alloc(4); //u32
        let buffer_instrDesc = Buffer.alloc(512); // CString description
        status = ni_visa_1.agVisa.viFindRsrc(viSession, expr, bufferFindList, buffer_retcnt, buffer_instrDesc);
        switch (status) {
            case ViFindRsrcCompletionCode.VI_SUCCESS: {
                let findList = bufferFindList.readUInt32LE();
                let retcnt = buffer_retcnt.readUInt32LE();
                let instrDesc = buffer_instrDesc.readCString();
                resolve({ status: status, findList: findList, retcnt: retcnt, instrDesc: instrDesc });
            }
            default: {
                reject(`viFindRsrc Error: status: ${status}`);
            }
        }
    });
}
exports.ViFindRsrc = ViFindRsrc;


/***/ }),

/***/ "./src/ni-visa/vi_get_attribute.ts":
/*!*****************************************!*\
  !*** ./src/ni-visa/vi_get_attribute.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viGetAttribute = exports.ViGetAttributeErrorCode = exports.ViGetAttributeCompletionCode = void 0;
const ni_visa_1 = __webpack_require__(/*! ./ni_visa */ "./src/ni-visa/ni_visa.ts");
const VI_ERROR = 0x80000000;
var ViGetAttributeCompletionCode;
(function (ViGetAttributeCompletionCode) {
    ViGetAttributeCompletionCode[ViGetAttributeCompletionCode["VI_SUCCESS"] = 0] = "VI_SUCCESS";
})(ViGetAttributeCompletionCode = exports.ViGetAttributeCompletionCode || (exports.ViGetAttributeCompletionCode = {}));
var ViGetAttributeErrorCode;
(function (ViGetAttributeErrorCode) {
    ViGetAttributeErrorCode[ViGetAttributeErrorCode["VI_ERROR_INV_SESSION"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_SESSION";
    ViGetAttributeErrorCode[ViGetAttributeErrorCode["VI_ERROR_INV_OBJECT"] = VI_ERROR + 0x3FFF000E] = "VI_ERROR_INV_OBJECT";
    ViGetAttributeErrorCode[ViGetAttributeErrorCode["VI_ERROR_NSUP_ATTR"] = VI_ERROR + 0x3FFF001D] = "VI_ERROR_NSUP_ATTR";
})(ViGetAttributeErrorCode = exports.ViGetAttributeErrorCode || (exports.ViGetAttributeErrorCode = {}));
function viGetAttribute(viSession, attribute) {
    return new Promise((resolve, reject) => {
        let status = VI_ERROR;
        let bufferAttrState = Buffer.alloc(4); //u32
        status = ni_visa_1.agVisa.viGetAttribute(viSession, attribute, bufferAttrState);
        switch (status) {
            case ViGetAttributeCompletionCode.VI_SUCCESS: {
                let attrState = bufferAttrState.readUInt32LE();
                resolve({ status: status, attrState: attrState });
            }
            default: {
                reject(`viGetAttribute Error: status: ${status}`);
            }
        }
    });
}
exports.viGetAttribute = viGetAttribute;


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
    ViOpenErrorCode[ViOpenErrorCode["VI_ERROR_NCIC"] = VI_ERROR + 0x3FFF0060] = "VI_ERROR_NCIC";
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
                break;
            }
            case ViOpenErrorCode.VI_ERROR_ALLOC:
            case ViOpenErrorCode.VI_ERROR_INTF_NUM_NCONFIG:
            case ViOpenErrorCode.VI_ERROR_INV_ACC_MODE:
            case ViOpenErrorCode.VI_ERROR_INV_RSRC_NAME:
            case ViOpenErrorCode.VI_ERROR_INV_SESSION:
            case ViOpenErrorCode.VI_ERROR_INV_OBJECT:
            case ViOpenErrorCode.VI_ERROR_INV_PROT:
            case ViOpenErrorCode.VI_ERROR_LIBRARY_NFOUND:
            case ViOpenErrorCode.VI_ERROR_NPERMISSION:
            case ViOpenErrorCode.VI_ERROR_NSUP_OPER:
            case ViOpenErrorCode.VI_ERROR_RSRC_BUSY:
            case ViOpenErrorCode.VI_ERROR_RSRC_LOCKED:
            case ViOpenErrorCode.VI_ERROR_RSRC_NFOUND:
            case ViOpenErrorCode.VI_ERROR_SERVER_CERT:
            case ViOpenErrorCode.VI_ERROR_NCIC:
            case ViOpenErrorCode.VI_ERROR_TMO: {
                resolve({ status: status, session: -1 });
                break;
            }
            default: {
                reject(`ViOpen: Error: Status ${status}`);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getResources = exports.viWrite = exports.viRead = exports.viOpenDefaultRM = exports.viOpen = exports.viClose = void 0;
//import { visaAsyncQuery, visaQuery, visaQueryToPromise } from './ni-visa/ni_visa'
var vi_close_1 = __webpack_require__(/*! ./ni-visa/vi_close */ "./src/ni-visa/vi_close.ts");
Object.defineProperty(exports, "viClose", ({ enumerable: true, get: function () { return vi_close_1.viClose; } }));
var vi_open_1 = __webpack_require__(/*! ./ni-visa/vi_open */ "./src/ni-visa/vi_open.ts");
Object.defineProperty(exports, "viOpen", ({ enumerable: true, get: function () { return vi_open_1.viOpen; } }));
var vi_open_default_r_m_1 = __webpack_require__(/*! ./ni-visa/vi_open_default_r_m */ "./src/ni-visa/vi_open_default_r_m.ts");
Object.defineProperty(exports, "viOpenDefaultRM", ({ enumerable: true, get: function () { return vi_open_default_r_m_1.viOpenDefaultRM; } }));
var vi_read_1 = __webpack_require__(/*! ./ni-visa/vi_read */ "./src/ni-visa/vi_read.ts");
Object.defineProperty(exports, "viRead", ({ enumerable: true, get: function () { return vi_read_1.viRead; } }));
var vi_write_1 = __webpack_require__(/*! ./ni-visa/vi_write */ "./src/ni-visa/vi_write.ts");
Object.defineProperty(exports, "viWrite", ({ enumerable: true, get: function () { return vi_write_1.viWrite; } }));
var get_resources_1 = __webpack_require__(/*! ./ni-visa/get_resources */ "./src/ni-visa/get_resources.ts");
Object.defineProperty(exports, "getResources", ({ enumerable: true, get: function () { return get_resources_1.getResources; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQSxtRkFBbUY7QUFDbkYsb0ZBQXFDO0FBQTVCLDJHQUFPO0FBQ2hCLGlGQUFtQztBQUExQix3R0FBTTtBQUNmLHFIQUF3RDtBQUEvQyxzSUFBZTtBQUN4QixpRkFBbUM7QUFBMUIsd0dBQU07QUFDZixvRkFBcUM7QUFBNUIsMkdBQU87QUFDaEIsaUhBQXNEO0FBQ3RELHNGQUFxQztBQUNyQyxrR0FBNEM7QUFDNUMsa0dBQTRDO0FBQzVDLDhHQUFvRDtBQUNwRCxtRkFBbUM7QUFDbkMsdUhBQXdEO0FBSWpELE1BQU0sWUFBWSxHQUFHLEdBQWlDLEVBQUU7SUFDM0QsT0FBTyxJQUFJLE9BQU8sQ0FBa0IsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDMUQsSUFBSSxXQUFXLEdBQUcsRUFBRTtRQUN4QixJQUFJLHdCQUF3QixHQUFHLEVBQUU7UUFDakMsSUFBSTtZQUNBLHVCQUF1QjtZQUN2QixJQUFJLFNBQVMsR0FBRyxNQUFNLHlDQUFlLEdBQUU7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFFdEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxxQ0FBYyxFQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsbUNBQWUsQ0FBQyxvQkFBb0IsQ0FBQztZQUN6RixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUVqQix1Q0FBdUM7WUFDdkMsSUFBSSxRQUFRLEdBQUcsTUFBTSw2QkFBVSxFQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ3JCLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUNwQyw2REFBNkQ7WUFDN0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLElBQUksR0FBRyxNQUFNLDZCQUFVLEVBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDOUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ25DO1lBRUQsbUNBQW1DO1lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxzREFBc0Q7Z0JBQ3RELHVCQUF1QjtnQkFDdkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxvQkFBTSxFQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFDLG1DQUFlLENBQUMsT0FBTyxFQUFDLG1DQUFlLENBQUMsT0FBTyxDQUFDO2dCQUNsSCxJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUN6Qix3QkFBd0IsQ0FBQyxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQztvQkFDNUUsc0JBQU8sRUFBQyxXQUFXLENBQUMsT0FBTyxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDSCx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQztpQkFDaEY7YUFDSjtZQUNELHNCQUFPLEVBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUM1QixPQUFPLENBQUMsd0JBQXdCLENBQUM7U0FFcEM7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ25CO0lBQ0QsQ0FBQyxFQUFDO0FBQ04sQ0FBQztBQXpDWSxvQkFBWSxnQkF5Q3hCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hERCxtRUFBa0M7QUFDbEMscUdBQW9TO0FBQ3BTLG9GQUE0QztBQUU1QyxpSEFBc0Q7QUFDdEQscURBQXFEO0FBQ3JELDZCQUE2QjtBQUM3QiwrQ0FBK0M7QUFDL0MsNEJBQTRCO0FBQzVCLGlEQUFpRDtBQUNqRCxpREFBaUQ7QUFDakQsdUZBQXVGO0FBQ3ZGLHNEQUFzRDtBQUN0RCw0RUFBNEU7QUFDNUUsNEdBQTRHO0FBQzVHLHFGQUFxRjtBQUNyRixvQ0FBb0M7QUFDcEMsdUNBQXVDO0FBQ3ZDLDRCQUE0QjtBQUM1QixvRUFBb0U7QUFDcEUsNEVBQTRFO0FBQzVFLHVFQUF1RTtBQUN2RSxNQUFNO0FBQ04sSUFBSTtBQUNTLGNBQU0sR0FBRyxzQkFBTyxFQUFDLFlBQVksRUFBRTtJQUMzQyw0Q0FBNEM7SUFDNUMsaUJBQWlCLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLENBQUMsMEJBQVUsQ0FBQyxDQUFDO0lBQzNDLFlBQVksRUFBRSxDQUFDLHdCQUFRLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLFFBQVEsRUFBRSwyQkFBVyxFQUFFLHlCQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEYsWUFBWSxFQUFFLENBQUMsd0JBQVEsRUFBRSxDQUFDLDBCQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsYUFBYSxFQUFFLENBQUMsd0JBQVEsRUFBRSxDQUFDLHlCQUFTLEVBQUUsUUFBUSxFQUFFLHlCQUFTLEVBQUUseUJBQVMsQ0FBQyxDQUFDO0lBQ3RFLGVBQWUsRUFBRSxDQUFDLHdCQUFRLEVBQUUsQ0FBQyx5QkFBUyxFQUFFLFFBQVEsRUFBRSx5QkFBUyxFQUFFLHlCQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0RyxRQUFRLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLENBQUMseUJBQVMsRUFBRSxRQUFRLEVBQUUsNEJBQVksRUFBRSx3QkFBUSxFQUFFLDBCQUFVLENBQUMsQ0FBQztJQUMvRSx5QkFBeUI7SUFDekIsZ0JBQWdCLEVBQUUsQ0FBQyx3QkFBUSxFQUFDLENBQUMseUJBQVMsRUFBRSxzQkFBTSxFQUFFLDJCQUFXLENBQUMsQ0FBQztJQUM3RCxnQkFBZ0IsRUFBRSxDQUFDLHdCQUFRLEVBQUMsQ0FBQyx5QkFBUyxFQUFFLHNCQUFNLEVBQUUsNEJBQVksQ0FBQyxDQUFDO0lBQzlELCtCQUErQjtJQUMvQixTQUFTLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLENBQUMsd0JBQVEsQ0FBQyxDQUFDO0lBQ2pDLHdCQUF3QjtJQUN4QixRQUFRLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLENBQUMseUJBQVMsRUFBRSxzQkFBTSxFQUFFLHdCQUFRLEVBQUUseUJBQVMsQ0FBQyxDQUFDO0lBQzlELGNBQWMsRUFBRSxDQUFDLHdCQUFRLEVBQUUsQ0FBQyx5QkFBUyxFQUFFLFFBQVEsRUFBRSx3QkFBUSxFQUFFLHlCQUFTLENBQUMsQ0FBQztJQUN0RSxTQUFTLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLENBQUMseUJBQVMsRUFBRSxRQUFRLEVBQUUsd0JBQVEsRUFBRSx5QkFBUyxDQUFDLENBQUM7SUFDakUsY0FBYztJQUNkLGFBQWEsRUFBRSxDQUFDLHdCQUFRLEVBQUUsQ0FBQyx5QkFBUyxFQUFFLFFBQVEsRUFBRSx3QkFBUSxFQUFFLHdCQUFRLENBQUMsQ0FBQztJQUNwRSxjQUFjLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLENBQUMseUJBQVMsRUFBRSxRQUFRLEVBQUUsd0JBQVEsRUFBRSx3QkFBUSxDQUFDLENBQUM7SUFFckUsU0FBUztJQUNULGVBQWUsRUFBRSxDQUFDLHdCQUFRLEVBQUUsQ0FBQyx5QkFBUyxFQUFFLDJCQUFXLEVBQUUsd0JBQVEsRUFBRSw2QkFBYSxDQUFDLENBQUM7SUFDOUUsZ0JBQWdCLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLENBQUMseUJBQVMsRUFBRSwyQkFBVyxFQUFFLHdCQUFRLENBQUMsQ0FBQztJQUNoRSxlQUFlLEVBQUUsQ0FBQyx3QkFBUSxFQUFFLENBQUMseUJBQVMsRUFBRSwyQkFBVyxFQUFFLHdCQUFRLEVBQUUsNEJBQVksRUFBRSx3QkFBUSxDQUFDLENBQUM7Q0FHdkYsQ0FBQztBQUVGLDZFQUE2RTtBQUU3RSwwQkFBMEI7QUFDMUIsc0NBQXNDO0FBQ3RDLDBDQUEwQztBQUMxQyw2REFBNkQ7QUFDN0QsSUFBSTtBQUVKLG1KQUFtSjtBQUVuSixrQ0FBa0M7QUFDbEMsMEJBQTBCO0FBQzFCLDhFQUE4RTtBQUM5RSx5REFBeUQ7QUFFekQsSUFBSTtBQUVKLElBQUk7QUFDSixvSEFBb0g7QUFFcEgsMEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyx3Q0FBd0M7QUFDeEMsNERBQTREO0FBQzVELFlBQVk7QUFDWixvQkFBb0I7QUFDcEIsc0VBQXNFO0FBQ3RFLHFDQUFxQztBQUNyQyxLQUFLO0FBQ0wsSUFBSTtBQUVKLGtFQUFrRTtBQUNsRSx5Q0FBeUM7QUFDekMsNkJBQTZCO0FBQzdCLElBQUk7QUFFSixTQUFnQixTQUFTLENBQUMsV0FBbUIsRUFBRSxXQUFtQixFQUFFLFFBQXdEO0lBRTNILE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BCLElBQUksUUFBUSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFFbEMsSUFBSSxNQUFNLEdBQVcsQ0FBQztJQUN0QixJQUFJLEtBQUssR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQywwQkFBVSxDQUFDLENBQUM7SUFDbEMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBRXRDLElBQUksTUFBTTtRQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV6Qyx5QkFBeUI7SUFFekIsSUFBSSxhQUFhLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQVUsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sR0FBRyxjQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUM7SUFFaEYsSUFBSSxNQUFNO1FBQUUsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBR3pDLHdCQUF3QjtJQUN4QixJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTTtJQUM5QixJQUFJLFFBQVEsR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQyx5QkFBUyxDQUFDLENBQUM7SUFDcEMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO0lBRWxGLElBQUksTUFBTTtRQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6Qyx5QkFBeUI7SUFHekIsSUFBSSxJQUFJLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQU0sQ0FBQyxDQUFDO0lBQzdCLFFBQVEsR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQyx5QkFBUyxDQUFDLENBQUM7SUFFaEMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDO0lBQ3hFLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDdkMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRTFFLElBQUksTUFBTTtRQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QywrQ0FBK0M7SUFDL0MsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM1QyxjQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLHNCQUFzQjtJQUN0QixRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUF6Q0QsOEJBeUNDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLFdBQW1CLEVBQUUsV0FBbUIsRUFBRSxRQUF3RDtJQUVoSSxzQkFBc0I7SUFDdEIsSUFBSSxRQUFRLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQztJQUVsQyxJQUFJLE1BQU0sR0FBVyxDQUFDO0lBQ3RCLElBQUksS0FBSyxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLDBCQUFVLENBQUMsQ0FBQztJQUNsQyxNQUFNLEdBQUcsY0FBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFFdEMsSUFBSSxNQUFNO1FBQUUsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXpDLHlCQUF5QjtJQUV6QixJQUFJLGFBQWEsR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQywwQkFBVSxDQUFDLENBQUM7SUFDMUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQztJQUVoRixJQUFJLE1BQU07UUFBRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFHekMsd0JBQXdCO0lBQ3hCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNO0lBQzlCLElBQUksUUFBUSxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLHlCQUFTLENBQUMsQ0FBQztJQUNwQyx1QkFBdUI7SUFFdkIsTUFBTSxHQUFHLGNBQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1DQUFlLENBQUMsc0JBQXNCLEVBQUUsbUNBQWUsQ0FBQyxRQUFRLEVBQUUsbUNBQWUsQ0FBQyxPQUFPLENBQUM7SUFFckosTUFBTSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO0lBRWxGLElBQUksTUFBTTtRQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6Qyx5QkFBeUI7SUFJekIsSUFBSSxJQUFJLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQU0sQ0FBQyxDQUFDO0lBQzdCLElBQUksR0FBRyxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLHdCQUFRLENBQUMsQ0FBQztJQUU5QixNQUFNLEdBQUcsY0FBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFFL0UsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRTtJQUM3QixnQ0FBZ0M7SUFFaEMsSUFBSSxTQUFTLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsNEJBQVksQ0FBQyxDQUFDO0lBQ3hDLElBQUksWUFBWSxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLHdCQUFRLENBQUM7SUFFdEMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1DQUFlLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUM7SUFDakksRUFBRTtJQUVGLDJFQUEyRTtJQUUzRSwwQkFBMEI7SUFFMUIsSUFBSSx1QkFBdUIsR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQyx5QkFBUyxDQUFDO0lBQ2xELElBQUksV0FBVyxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLHdCQUFRLENBQUM7SUFDckMsSUFBSSxtQkFBbUIsR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQyx5QkFBUyxDQUFDO0lBQzlDLElBQUksaUJBQWlCLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMseUJBQVMsQ0FBQztJQUM1QyxJQUFJLG9CQUFvQixHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLHNCQUFNLENBQUM7SUFFNUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1DQUFlLENBQUMsa0JBQWtCLEVBQUUsdUJBQXVCLENBQUM7SUFDdkgsSUFBSSxzQkFBc0IsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUU7SUFDbEUsa0VBQWtFO0lBRWxFLE1BQU0sR0FBRyxjQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxtQ0FBZSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUM7SUFDdkcsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRTtJQUMxQywwQ0FBMEM7SUFFMUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1DQUFlLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDO0lBQy9HLElBQUksWUFBWSxHQUFHLG1CQUFtQixDQUFDLFdBQVcsRUFBRTtJQUNwRCw4Q0FBOEM7SUFFOUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1DQUFlLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7SUFDaEgsSUFBSSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7SUFDdEQsc0RBQXNEO0lBRXRELE1BQU0sR0FBRyxjQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxtQ0FBZSxDQUFDLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQztJQUNoSCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQztJQUNwRSw4Q0FBOEM7SUFFOUMsSUFBSSxNQUFNO1FBQUUsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLCtDQUErQztJQUMvQyxjQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDNUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNwQyxzQkFBc0I7SUFDdEIsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBcEZELHdDQW9GQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLFdBQW1CLEVBQUUsV0FBbUI7SUFDMUUsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM5QyxzQkFBc0I7UUFDdEIsSUFBSSxRQUFRLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQztRQUVsQyxJQUFJLE1BQU0sR0FBVyxDQUFDO1FBQ3RCLElBQUksS0FBSyxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLDBCQUFVLENBQUMsQ0FBQztRQUNsQyxNQUFNLEdBQUcsY0FBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFFdEMsSUFBSSxNQUFNLEVBQUU7WUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2Q7UUFFRCx5QkFBeUI7UUFFekIsSUFBSSxhQUFhLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQVUsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sR0FBRyxjQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUM7UUFFaEYsSUFBSSxNQUFNLEVBQUU7WUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2Q7UUFFRCx3QkFBd0I7UUFDeEIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU07UUFDOUIsSUFBSSxRQUFRLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMseUJBQVMsQ0FBQyxDQUFDO1FBQ3BDLHVCQUF1QjtRQUV2QixNQUFNLEdBQUcsY0FBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUUsbUNBQWUsQ0FBQyxzQkFBc0IsRUFBRSxtQ0FBZSxDQUFDLFFBQVEsRUFBRSxtQ0FBZSxDQUFDLE9BQU8sQ0FBQztRQUVySixNQUFNLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7UUFFbEYsSUFBSSxNQUFNLEVBQUU7WUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2Q7UUFHRCwrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsd0JBQVEsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sR0FBRyxjQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFXLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUUvRSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFO1FBQzdCLGdDQUFnQztRQUVoQyxJQUFJLFNBQVMsR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQyw0QkFBWSxDQUFDLENBQUM7UUFDeEMsSUFBSSxZQUFZLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsd0JBQVEsQ0FBQztRQUV0QyxNQUFNLEdBQUcsY0FBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUUsbUNBQWUsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQztRQUNqSSxFQUFFO1FBRUYsMkVBQTJFO1FBRTNFLDBCQUEwQjtRQUUxQixJQUFJLHVCQUF1QixHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLHlCQUFTLENBQUM7UUFDbEQsSUFBSSxXQUFXLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsd0JBQVEsQ0FBQztRQUNyQyxJQUFJLG1CQUFtQixHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLHlCQUFTLENBQUM7UUFDOUMsSUFBSSxpQkFBaUIsR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQyx5QkFBUyxDQUFDO1FBQzVDLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUM1Qiw0Q0FBNEM7UUFFNUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1DQUFlLENBQUMsa0JBQWtCLEVBQUUsdUJBQXVCLENBQUM7UUFDdkgsSUFBSSxzQkFBc0IsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUU7UUFDbEUsa0VBQWtFO1FBRWxFLE1BQU0sR0FBRyxjQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxtQ0FBZSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUM7UUFDdkcsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRTtRQUMxQywwQ0FBMEM7UUFFMUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1DQUFlLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDO1FBQy9HLElBQUksWUFBWSxHQUFHLG1CQUFtQixDQUFDLFdBQVcsRUFBRTtRQUNwRCw4Q0FBOEM7UUFFOUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1DQUFlLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7UUFDaEgsSUFBSSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7UUFDdEQsc0RBQXNEO1FBRXRELG9HQUFvRztRQUNwRyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ3JDLDhDQUE4QztRQUU5QyxJQUFJLE1BQU0sRUFBRTtZQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDZDtRQUNELCtDQUErQztRQUMvQyxjQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDNUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwQyxzQkFBc0I7UUFDdEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXZCLENBQUMsQ0FBQztBQUNILENBQUM7QUE3RkQsZ0RBNkZDOzs7Ozs7Ozs7Ozs7OztBQ3hURCxJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDdkIsMkRBQWdCO0lBQ2hCLHlFQUF1QjtJQUN2QixtRUFBb0I7QUFDckIsQ0FBQyxFQUpXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBSXZCO0FBRUQsSUFBWSxlQWtvQlg7QUFsb0JELFdBQVksZUFBZTtJQUUxQiwyREFBZTtJQUNaLHNFQUFxQjtJQUV4QixpRkFBOEI7SUFFOUIsMEZBQWlDO0lBQ2pDLHdGQUFnQztJQUNoQyx3R0FBd0M7SUFDeEMsb0dBQXNDO0lBQ3RDLHNHQUF1QztJQUN2Qyw4RkFBbUM7SUFDbkMsc0ZBQStCO0lBQy9CLHNGQUErQjtJQUMvQix3R0FBd0M7SUFDeEMsOEZBQW1DO0lBQ25DLDRGQUFrQztJQUNsQyxzRkFBK0I7SUFDL0Isd0ZBQWdDO0lBQ2hDLGtHQUFxQztJQUNyQyxvRkFBOEI7SUFDOUIsOEZBQW1DO0lBQ25DLHdGQUFnQztJQUNoQyxrR0FBcUM7SUFDckMsNEZBQWtDO0lBQ2xDLGtHQUFxQztJQUNyQyxvR0FBc0M7SUFDdEMsc0dBQXVDO0lBQ3ZDLDRGQUFrQztJQUNsQyxzR0FBdUM7SUFDdkMsNEZBQWtDO0lBQ2xDLG9HQUFzQztJQUN0Qyw0RkFBa0M7SUFDbEMsc0dBQXVDO0lBQ3ZDLG9HQUFzQztJQUN0QyxvR0FBc0M7SUFDdEMsa0dBQXFDO0lBQ3JDLGdHQUFvQztJQUNwQyxrR0FBcUM7SUFDckMsb0dBQXNDO0lBQ3RDLGtHQUFxQztJQUNyQyxrR0FBcUM7SUFDckMsb0dBQXNDO0lBQ3RDLGtHQUFxQztJQUNyQyxvR0FBc0M7SUFDdEMsa0dBQXFDO0lBQ3JDLDhHQUEyQztJQUMzQywwR0FBeUM7SUFDekMsb0ZBQThCO0lBQzlCLGdHQUFvQztJQUNwQyw4RkFBbUM7SUFDbkMsd0ZBQWdDO0lBQ2hDLDBGQUFpQztJQUNqQyw0R0FBMEM7SUFDMUMsb0dBQXNDO0lBQ3RDLGdIQUE0QztJQUM1QyxzR0FBdUM7SUFDdkMsNEZBQWtDO0lBQ2xDLGtHQUFxQztJQUNyQyw0RkFBa0M7SUFDbEMsa0dBQXFDO0lBQ3JDLGtHQUFxQztJQUNyQyxrR0FBcUM7SUFDckMsa0dBQXFDO0lBQ3JDLDRGQUFrQztJQUNsQyw4RkFBbUM7SUFDbkMsd0dBQXdDO0lBQ3hDLGdHQUFvQztJQUNwQyxrR0FBcUM7SUFDckMsZ0dBQW9DO0lBQ3BDLGtHQUFxQztJQUNyQywwRkFBaUM7SUFDakMsMEZBQWlDO0lBQ2pDLGtGQUE2QjtJQUM3QixvRkFBOEI7SUFDOUIsNEZBQWtDO0lBQ2xDLHdGQUFnQztJQUNoQywwRkFBaUM7SUFDakMsOEVBQTJCO0lBQzNCLGtHQUFxQztJQUNyQyxrR0FBcUM7SUFDckMsb0dBQXNDO0lBQ3RDLHdHQUF3QztJQUN4Qyx3RkFBZ0M7SUFDaEMsd0dBQXdDO0lBQ3hDLDRHQUEwQztJQUMxQyxrR0FBcUM7SUFDckMsOEZBQW1DO0lBQ25DLHNGQUErQjtJQUMvQixvRkFBOEI7SUFDOUIsa0dBQXFDO0lBQ3JDLGtHQUFxQztJQUNyQyxvR0FBc0M7SUFDdEMsa0dBQXFDO0lBQ3JDLHNHQUF1QztJQUN2QywwRkFBaUM7SUFDakMsa0dBQXFDO0lBQ3JDLDBGQUFpQztJQUNqQyx3R0FBd0M7SUFDeEMsZ0dBQW9DO0lBQ3BDLG9HQUFzQztJQUN0QyxrR0FBcUM7SUFDckMsa0dBQXFDO0lBQ3JDLGdHQUFvQztJQUNwQyw4RkFBbUM7SUFDbkMsd0dBQXdDO0lBQ3hDLDRGQUFrQztJQUNsQyw4RkFBbUM7SUFDbkMsNEZBQWtDO0lBQ2xDLDRGQUFrQztJQUNsQyw4RkFBbUM7SUFDbkMsMEdBQXlDO0lBQ3pDLDRHQUEwQztJQUMxQyw4RkFBbUM7SUFDbkMsd0dBQXdDO0lBQ3hDLDBHQUF5QztJQUN6QyxzR0FBdUM7SUFDdkMsd0dBQXdDO0lBQ3hDLHdHQUF3QztJQUN4Qyx3R0FBd0M7SUFDeEMsd0dBQXdDO0lBQ3hDLHdHQUF3QztJQUN4Qyx3R0FBd0M7SUFDeEMsd0dBQXdDO0lBQ3hDLDhHQUEyQztJQUMzQyw4R0FBMkM7SUFDM0MsOEdBQTJDO0lBQzNDLDhHQUEyQztJQUMzQyw4R0FBMkM7SUFDM0MsOEdBQTJDO0lBQzNDLDhHQUEyQztJQUMzQyw4R0FBMkM7SUFDM0MsOEdBQTJDO0lBQzNDLDhHQUEyQztJQUMzQyw4R0FBMkM7SUFDM0MsOEdBQTJDO0lBQzNDLDhHQUEyQztJQUMzQyw4R0FBMkM7SUFDM0MsOEdBQTJDO0lBQzNDLDhHQUEyQztJQUMzQyw4R0FBMkM7SUFDM0MsOEdBQTJDO0lBQzNDLDhHQUEyQztJQUMzQyw4R0FBMkM7SUFDM0MsOEdBQTJDO0lBQzNDLDhHQUEyQztJQUMzQyw4R0FBMkM7SUFDM0MsOEdBQTJDO0lBQzNDLGtHQUFxQztJQUNyQyxvR0FBc0M7SUFDdEMsa0dBQXFDO0lBQ3JDLHdHQUF3QztJQUN4QyxnR0FBb0M7SUFDcEMsZ0dBQW9DO0lBQ3BDLG9IQUE4QztJQUM5QyxvSEFBOEM7SUFDOUMsOEdBQTJDO0lBQzNDLDRIQUFrRDtJQUNsRCxvR0FBc0M7SUFFdEMsa0ZBQTZCO0lBQzdCLDBGQUFpQztJQUNqQyxrR0FBcUM7SUFDckMsOEZBQW1DO0lBQ25DLGtHQUFxQztJQUNyQyxrRkFBNkI7SUFDN0IsOEZBQW1DO0lBQ25DLGtGQUE2QjtJQUM3QixvR0FBc0M7SUFDdEMsd0ZBQWdDO0lBQ2hDLDRHQUEwQztJQUMxQyxvR0FBc0M7SUFDdEMsMEdBQXlDO0lBQ3pDLDBHQUF5QztJQUN6Qyx3R0FBd0M7SUFDeEMsMEdBQXlDO0lBRTFDLCtFQUErRTtJQUU5RSw4RkFBbUM7SUFDbkMsOEZBQW1DO0lBQ25DLHdGQUFnQztJQUNoQyx3RkFBZ0M7SUFHakMsK0VBQStFO0lBRTlFLGtHQUFxQztJQUNyQyxnRkFBNEI7SUFDNUIsOEZBQW1DO0lBQ25DLGtGQUE2QjtJQUM3QiwwRkFBaUM7SUFDakMsd0ZBQWdDO0lBQ2hDLDBGQUFpQztJQUNqQyw4RkFBbUM7SUFDbkMsc0dBQXVDO0lBQ3ZDLHdHQUF3QztJQUN4Qyx3RkFBZ0M7SUFDaEMsZ0dBQW9DO0lBQ3BDLHdGQUFnQztJQUNoQyxrR0FBcUM7SUFDckMsd0ZBQWdDO0lBRWhDLGdHQUFvQztJQUVyQywrRUFBK0U7SUFFOUUsNEZBQWtDO0lBQ2xDLDhGQUFtQztJQUNuQyxrR0FBcUM7SUFDckMsOEZBQW1DO0lBQ25DLDBGQUFpQztJQUNqQyxvR0FBc0M7SUFDdEMsa0dBQXFDO0lBQ3JDLG9HQUFzQztJQUN0Qyx3RkFBZ0M7SUFDaEMsc0dBQXVDO0lBQ3ZDLDRHQUEwQztJQUMxQyxvRkFBOEI7SUFFOUIsa0dBQXFDO0lBQ3JDLGtHQUFxQztJQUNyQyw0RkFBa0M7SUFDbEMsb0dBQXNDO0lBQ3RDLGtHQUFxQztJQUNyQyxzRkFBK0I7SUFDL0Isa0dBQXFDO0lBRXJDLGdHQUErQztJQUMvQyw0RkFBNkM7SUFDN0MsOEZBQThDO0lBQzlDLHdGQUEyQztJQUMzQyw4RkFBOEM7SUFDOUMsa0dBQWdEO0lBQ2hELGdHQUErQztJQUMvQyw4RUFBc0M7SUFDdEMsb0dBQWlEO0lBQ2pELDRGQUE2QztJQUM3Qyw0RkFBNkM7SUFDN0MsMEZBQTRDO0lBQzVDLHNHQUFrRDtJQUNsRCxrR0FBZ0Q7SUFDaEQsa0dBQWdEO0lBQ2hELG9HQUFpRDtJQUNqRCwwRkFBNEM7SUFDNUMsd0ZBQTJDO0lBQzNDLHdHQUFtRDtJQUNuRCxrR0FBZ0Q7SUFDaEQsOEZBQThDO0lBQzlDLG9HQUFpRDtJQUNqRCx3RkFBMkM7SUFDM0Msa0ZBQXdDO0lBQ3hDLHdHQUFtRDtJQUNuRCx3R0FBbUQ7SUFDbkQsb0dBQWlEO0lBQ2pELGtHQUFnRDtJQUNoRCxnRkFBdUM7SUFDdkMsOEZBQThDO0lBQzlDLDBGQUE0QztJQUM1Qyw4RkFBOEM7SUFDOUMsa0ZBQXdDO0lBQ3hDLHdGQUEyQztJQUMzQyw0RUFBcUM7SUFDckMsc0ZBQTBDO0lBQzFDLHdGQUEyQztJQUMzQyw4RkFBOEM7SUFDOUMsb0dBQWlEO0lBQ2pELDBGQUE0QztJQUM1QyxrR0FBZ0Q7SUFDaEQsMEZBQTRDO0lBQzVDLDRGQUE2QztJQUM3QywwRkFBNEM7SUFDNUMsOEZBQThDO0lBQzlDLG9HQUFpRDtJQUNqRCxvR0FBaUQ7SUFDakQsZ0dBQStDO0lBQy9DLDRGQUE2QztJQUM3QyxnRkFBdUM7SUFDdkMsNEZBQTZDO0lBQzdDLDBGQUE0QztJQUM1QyxnR0FBK0M7SUFDL0MsOEZBQThDO0lBQzlDLGdHQUErQztJQUMvQyxnR0FBK0M7SUFDL0MsZ0dBQStDO0lBQy9DLDBHQUFvRDtJQUNwRCx3RkFBMkM7SUFDM0MsMEZBQTRDO0lBQzVDLDRGQUE2QztJQUM3QyxrR0FBZ0Q7SUFDaEQsd0ZBQTJDO0lBQzNDLHdGQUEyQztJQUMzQyxrR0FBZ0Q7SUFDaEQsNEZBQTZDO0lBQzdDLDRGQUE2QztJQUM3Qyx3RkFBMkM7SUFDM0MsZ0dBQStDO0lBQy9DLDhGQUE4QztJQUM5QyxvR0FBaUQ7SUFDakQsMEZBQTRDO0lBQzVDLHdGQUEyQztJQUMzQyw4RkFBOEM7SUFDOUMsc0ZBQTBDO0lBQzFDLDBGQUE0QztJQUM1QywwRkFBNEM7SUFDNUMsd0dBQW1EO0lBQ25ELDBGQUE0QztJQUM1QyxvR0FBaUQ7SUFDakQsOEZBQThDO0lBRS9DLCtFQUErRTtJQUU5RSw2RUFBdUQ7SUFDdkQsNkVBQXVEO0lBQ3ZELG1GQUF1RDtJQUV2RCwyRUFBc0I7SUFFdEIscUVBQWtCO0lBQ2xCLG1FQUFpQjtJQUNqQiw2RUFBc0I7SUFDdEIscUVBQWtCO0lBQ2xCLG1FQUFpQjtJQUNqQix1RUFBbUI7SUFDbkIsbUVBQWlCO0lBRWpCLHlFQUFvQjtJQUNwQixtRUFBaUI7SUFDakIsdUVBQW1CO0lBQ25CLCtFQUF1QjtJQUN2Qix1RkFBMkI7SUFFM0IsdUVBQW1CO0lBQ25CLHVFQUFtQjtJQUVuQix5RUFBb0I7SUFDcEIscUVBQWtCO0lBQ2xCLHFFQUFrQjtJQUNsQixxRUFBa0I7SUFDbEIscUVBQWtCO0lBQ2xCLGlGQUF3QjtJQUN4Qiw4RUFBdUI7SUFDdkIsZ0ZBQXdCO0lBQ3hCLGdGQUF3QjtJQUN4QixnRkFBd0I7SUFDeEIsZ0ZBQXdCO0lBQ3hCLGdGQUF3QjtJQUN4QixnRkFBd0I7SUFDeEIsK0VBQTBCO0lBRTFCLHdFQUFvQjtJQUNwQiw0RUFBc0I7SUFDdEIsOEVBQXVCO0lBQ3ZCLGtGQUF5QjtJQUV6Qiw2REFBYztJQUNkLDZEQUFjO0lBQ2QsNkVBQXNCO0lBQ3RCLHVFQUFzQjtJQUV0QixxRUFBa0I7SUFFbEIsb0VBQWtCO0lBQ2xCLGtFQUFpQjtJQUNqQixxRUFBa0I7SUFDbEIscUVBQWtCO0lBQ2xCLHFFQUFrQjtJQUNsQixxRUFBa0I7SUFDbEIscUVBQWtCO0lBQ2xCLHFFQUFrQjtJQUNsQixxRUFBa0I7SUFDbEIscUVBQWtCO0lBQ2xCLHFFQUFrQjtJQUNsQixxRUFBa0I7SUFDbEIsc0VBQW1CO0lBQ25CLHNFQUFtQjtJQUNuQixzRUFBbUI7SUFDbkIsc0VBQW1CO0lBQ25CLGtGQUF5QjtJQUN6QixrRkFBeUI7SUFDekIsa0ZBQXlCO0lBQ3pCLGtGQUF5QjtJQUN6QixrRkFBeUI7SUFDekIsa0ZBQXlCO0lBQ3pCLGtGQUF5QjtJQUN6QixrRkFBeUI7SUFDekIsa0ZBQXlCO0lBQ3pCLG9GQUEwQjtJQUMxQixvRkFBMEI7SUFDMUIsb0ZBQTBCO0lBQzFCLGtGQUF5QjtJQUN6Qiw4RUFBdUI7SUFDdkIsZ0ZBQXdCO0lBQ3hCLGdGQUF3QjtJQUN4QixnRkFBd0I7SUFDeEIsZ0ZBQXdCO0lBQ3hCLHNFQUFtQjtJQUNuQixzRUFBbUI7SUFDbkIsd0VBQW9CO0lBQ3BCLHdFQUFvQjtJQUVwQixxRkFBMEI7SUFDMUIsMkVBQXFCO0lBQ3JCLDZFQUFzQjtJQUN0QiwrRUFBdUI7SUFDdkIscUZBQTBCO0lBQzFCLHlGQUE0QjtJQUU1QixtRUFBaUI7SUFDakIscUVBQWtCO0lBQ2xCLG1GQUF5QjtJQUN6QixxRkFBMEI7SUFDMUIsc0VBQW1CO0lBQ25CLHdFQUFvQjtJQUNwQixzRkFBMkI7SUFDM0IseUZBQTZCO0lBRTdCLGlGQUF3QjtJQUN4QixpRkFBd0I7SUFDeEIsNkVBQXNCO0lBRXRCLGlFQUFnQjtJQUNoQixxRUFBa0I7SUFDbEIsdUVBQW1CO0lBQ25CLDJGQUE2QjtJQUU3Qiw2RUFBc0I7SUFDdEIsb0ZBQThCO0lBRTlCLGlFQUFnQjtJQUNoQiwrRUFBdUI7SUFDdkIseUVBQW9CO0lBQ3BCLHlFQUFvQjtJQUVwQiw2RUFBeUI7SUFFekIsNkVBQXNCO0lBQ3RCLDJFQUFxQjtJQUNyQiw2RUFBc0I7SUFDdEIsNkVBQXNCO0lBQ3RCLCtFQUF1QjtJQUV2Qiw4RUFBdUI7SUFDdkIsZ0ZBQXdCO0lBQ3hCLDhFQUF1QjtJQUV2QiwrRUFBdUI7SUFDdkIsdUZBQTJCO0lBQzNCLHFGQUEwQjtJQUMxQixxRkFBMEI7SUFFMUIsNkVBQXNCO0lBQ3RCLHFGQUEwQjtJQUMxQixxRkFBMEI7SUFDMUIsK0VBQXVCO0lBRXZCLCtFQUF1QjtJQUN2QixtRkFBeUI7SUFDekIsOEVBQXVCO0lBRXZCLHVFQUFtQjtJQUNuQiw2RUFBc0I7SUFFdEIscUVBQWtCO0lBQ2xCLHVFQUFtQjtJQUNuQixxRUFBa0I7SUFDbEIsdUVBQW1CO0lBQ25CLHFFQUFrQjtJQUNsQix1RUFBbUI7SUFDbkIsbUVBQWlCO0lBQ2pCLHFFQUFrQjtJQUNsQixxRUFBa0I7SUFDbEIsdUVBQW1CO0lBQ25CLHdFQUFvQjtJQUNwQix3RUFBb0I7SUFFcEIsaUVBQWdCO0lBQ2hCLG1FQUFpQjtJQUNqQixtRUFBaUI7SUFDakIsbUVBQWlCO0lBRWpCLHFGQUEwQjtJQUMxQixpRkFBd0I7SUFDeEIsNkZBQThCO0lBQzlCLGlHQUFnQztJQUNoQyx5RkFBNEI7SUFDNUIseUdBQW9DO0lBQ3BDLDJGQUE2QjtJQUU3QixxRkFBMEI7SUFDMUIsaUZBQXdCO0lBQ3hCLHlHQUFvQztJQUNwQyxxR0FBa0M7SUFFbEMseUZBQTRCO0lBQzVCLG9GQUEwQjtJQUUxQixtRkFBeUI7SUFDekIseUVBQW9CO0lBQ3BCLDZFQUFzQjtJQUV0Qix1RUFBdUI7SUFDdkIscUZBQThCO0lBQzlCLHVFQUF3QjtJQUN4Qix3RUFBdUI7SUFDdkIsc0ZBQThCO0lBQzlCLHNGQUE4QjtJQUM5Qix1RUFBd0I7SUFFeEIsOEVBQXVCO0lBQ3ZCLHlGQUE0QjtJQUM1Qix5RUFBb0I7SUFDcEIseUVBQW9CO0lBQ3BCLHlFQUFvQjtJQUNwQix5RUFBb0I7SUFDcEIseUVBQW9CO0lBQ3BCLHlFQUFvQjtJQUNwQix5RUFBb0I7SUFFcEIsMkZBQTZCO0lBQzdCLHlGQUE0QjtJQUM1Qiw2RkFBOEI7SUFFOUIsbUZBQXlCO0lBQ3pCLHVGQUEyQjtJQUMzQixxRkFBMEI7SUFDMUIsdUZBQTJCO0lBQzNCLGlGQUF3QjtJQUV4Qiw2RUFBc0I7SUFDdEIsMkVBQXFCO0lBQ3JCLHlFQUFvQjtJQUNwQiwyRUFBcUI7SUFFckIsNEVBQXNCO0lBRXRCLG9GQUEwQjtJQUMxQiw2RUFBc0I7SUFDdEIsc0dBQW9DO0lBQ3BDLHNHQUFvQztJQUNwQyxzR0FBb0M7SUFDcEMsc0dBQW9DO0lBQ3BDLHNHQUFvQztJQUNwQyxzR0FBb0M7SUFDcEMsc0dBQW9DO0lBQ3BDLHNHQUFvQztJQUNwQyxzR0FBb0M7SUFDcEMsc0dBQW9DO0lBQ3BDLHNHQUFvQztJQUVyQywrRUFBK0U7SUFFOUUsOEZBQThDO0lBRTlDLG1FQUFpQjtJQUNqQiw2RUFBc0I7SUFFdEIsd0dBQXdDO0lBRXpDLHVDQUF1QztJQUV0Qyw4RkFBbUM7SUFDbkMsc0dBQXVDO0lBQ3ZDLHdHQUF3QztJQUV4QywwRkFBNkI7SUFDN0IsMEZBQTZCO0lBRTlCLDZFQUE2RTtJQUM1RSw2RUFBc0I7SUFDdEIsMEZBQTZCO0lBRTlCLHlDQUF5QztJQUV4Qyx3R0FBd0M7SUFDeEMsOEZBQW1DO0lBRXBDLGlGQUFpRjtJQUVoRix3R0FBd0M7SUFDeEMsa0dBQXFDO0lBQ3JDLHNHQUF1QztJQUN2QyxrR0FBcUM7SUFDckMsNEdBQTBDO0lBQzFDLGtHQUFxQztJQUVyQyxpRkFBd0I7SUFDeEIsbUdBQWlDO0lBQ2pDLG1HQUFpQztJQUNqQywyRkFBNkI7SUFDN0IsdUZBQTRCO0lBQzVCLHVGQUE0QjtJQUM1Qix5RkFBNkI7SUFFN0IsNEZBQWtDO0lBQ2xDLHdGQUFnQztJQUNoQyx3RkFBZ0M7SUFDaEMsd0ZBQWdDO0lBQ2hDLHNGQUErQjtJQUMvQiwwRkFBaUM7SUFDakMsa0dBQXFDO0lBRXRDLDJDQUEyQztJQUUxQyxvR0FBc0M7SUFDdEMsMEdBQXlDO0lBRXpDLGdIQUE0QztJQUU1Qyx3R0FBd0M7SUFDeEMsc0dBQXVDO0lBQ3ZDLHNHQUF1QztJQUN2Qyx3RkFBZ0M7SUFDaEMsOEZBQW1DO0lBQ25DLG9HQUFzQztJQUN0QywwRkFBaUM7SUFDakMsa0dBQXFDO0lBQ3JDLGdHQUFvQztJQUNwQyw0R0FBMEM7SUFDMUMsMEdBQXlDO0lBQ3pDLDBHQUF5QztJQUN6QyxnR0FBb0M7SUFFcEMsZ0dBQWdDO0lBQ2hDLCtFQUF1QjtJQUN2QixtRkFBeUI7SUFFekIsMkVBQXFCO0lBQ3JCLDZFQUFzQjtJQUN0QiwrRkFBK0I7SUFFL0IsMEhBQWlEO0lBQ2pELHdIQUFnRDtJQUNoRCx3SEFBZ0Q7SUFDaEQsMEdBQXlDO0lBQ3pDLGtIQUE2QztJQUM3QyxrSEFBNkM7SUFFN0MseUZBQTRCO0lBRTVCLDZGQUFpQztBQUNsQyxDQUFDLEVBbG9CVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQWtvQjFCO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4b0JGLG9GQUEwQjtBQUNiLGVBQU8sR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDMUIsZUFBTyxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUMxQixnQkFBUSxHQUFHLGtCQUFHLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxDQUFDO0FBRWhDLGdCQUFRLEdBQUcsa0JBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzVCLGlCQUFTLEdBQUcsa0JBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO0FBQ2xDLGdCQUFRLEdBQUcsa0JBQUcsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLENBQUM7QUFDaEMsZ0JBQVEsR0FBRyxrQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDNUIsaUJBQVMsR0FBRyxrQkFBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBUSxDQUFDLENBQUM7QUFDbEMsY0FBTSxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN4QixlQUFPLEdBQUcsa0JBQUcsQ0FBQyxPQUFPLENBQUMsY0FBTSxDQUFDLENBQUM7QUFDOUIsY0FBTSxHQUFHLGtCQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUN6QixlQUFPLEdBQUcsa0JBQUcsQ0FBQyxPQUFPLENBQUMsY0FBTSxDQUFDLENBQUM7QUFFM0MseUVBQXlFO0FBQzVELGdCQUFRLEdBQUcsZ0JBQVEsQ0FBQztBQUNwQixpQkFBUyxHQUFHLGtCQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFRLENBQUM7QUFDakMsZ0JBQVEsR0FBRyxnQkFBUSxDQUFDO0FBQ3BCLGlCQUFTLEdBQUcsa0JBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQVEsQ0FBQztBQUNqQyxpQkFBUyxHQUFHLGdCQUFRLENBQUM7QUFDckIsZUFBTyxHQUFHLGdCQUFRLENBQUM7QUFFbkIsZ0JBQVEsR0FBRyxrQkFBRyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsQ0FBQztBQUNoQyxjQUFNLEdBQUcsZ0JBQVEsQ0FBQztBQUNsQixtQkFBVyxHQUFHLGdCQUFRLENBQUM7QUFDdkIsb0JBQVksR0FBRyxrQkFBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBUSxDQUFDLENBQUM7QUFDckMsa0JBQVUsR0FBRyxrQkFBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBUyxDQUFDLENBQUM7QUFDcEMsZ0JBQVEsR0FBRyxlQUFPLENBQUM7QUFDbkIscUJBQWEsR0FBRyxnQkFBUSxDQUFDO0FBQ3pCLGNBQU0sR0FBRyxnQkFBUSxDQUFDO0FBQ2xCLG1CQUFXLEdBQUcscUJBQWEsQ0FBQztBQUM1QixvQkFBWSxHQUFHLGdCQUFRLENBQUM7QUFDeEIsYUFBSyxHQUFHLGVBQU8sQ0FBQztBQUNoQixjQUFNLEdBQUcsZUFBTyxDQUFDO0FBQ2pCLGtCQUFVLEdBQUcsZUFBTyxDQUFDO0FBQ3JCLGtCQUFVLEdBQUcsZ0JBQVEsQ0FBQztBQUN0QixtQkFBVyxHQUFHLGtCQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFVLENBQUMsQ0FBQztBQUV0QyxlQUFPLEdBQUcsZ0JBQVE7QUFDbEIsZ0JBQVEsR0FBRyxrQkFBRyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUM7QUFFL0IsbUJBQVcsR0FBRyxnQkFBUTtBQUN0QixvQkFBWSxHQUFHLGtCQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFXLENBQUM7QUFFdkMscUJBQWEsR0FBRyxnQkFBUTs7Ozs7Ozs7Ozs7Ozs7QUM3Q3JDLG1GQUFrQztBQUVsQyxNQUFNLFFBQVEsR0FBRyxVQUFVO0FBQzNCLElBQVkscUJBR1g7QUFIRCxXQUFZLHFCQUFxQjtJQUM3Qiw2RUFBYztJQUNkLHdHQUFnQyxxREFBbUQ7QUFDdkYsQ0FBQyxFQUhXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR2hDO0FBRUQsSUFBWSxnQkFJWDtBQUpELFdBQVksZ0JBQWdCO0lBQ3hCLCtEQUEwQixRQUFRLEdBQUcsVUFBVTtJQUMvQyw0REFBdUIsUUFBUSxHQUFHLFVBQVU7SUFDNUMsMkRBQXNCLFFBQVEsR0FBRyxVQUFVO0FBQy9DLENBQUMsRUFKVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQUkzQjtBQUdELFNBQWdCLE9BQU8sQ0FBQyxRQUFnQjtJQUNwQyxPQUFPLElBQUksT0FBTyxDQUFxQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN2RCxJQUFJLE1BQU0sR0FBVyxRQUFRO1FBRTdCLE1BQU0sR0FBRyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsUUFBUSxNQUFNLEVBQUU7WUFDWixLQUFLLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztZQUN0QyxLQUFLLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUM5QjtZQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNMLE1BQU0sQ0FBQywwQkFBMEIsTUFBTSxFQUFFLENBQUM7YUFDN0M7U0FDSjtJQUNMLENBQUMsQ0FBQztBQUNOLENBQUM7QUFmRCwwQkFlQzs7Ozs7Ozs7Ozs7Ozs7QUM5QkQsbUZBQWtDO0FBRWxDLE1BQU0sUUFBUSxHQUFHLFVBQVU7QUFFM0IsSUFBWSx3QkFFWDtBQUZELFdBQVksd0JBQXdCO0lBQ2hDLG1GQUFjO0FBQ2xCLENBQUMsRUFGVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQUVuQztBQUVELElBQVksbUJBS1g7QUFMRCxXQUFZLG1CQUFtQjtJQUMzQixrRUFBdUIsUUFBUSxHQUFHLFVBQVU7SUFDNUMsaUVBQXNCLFFBQVEsR0FBRyxVQUFVO0lBQzNDLGdFQUFxQixRQUFRLEdBQUcsVUFBVTtJQUMxQyxrRUFBdUIsUUFBUSxHQUFHLFVBQVUsK0VBQW1EO0FBQ25HLENBQUMsRUFMVyxtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQUs5QjtBQUVELFNBQWdCLFVBQVUsQ0FBQyxTQUFpQjtJQUN4QyxPQUFPLElBQUksT0FBTyxDQUF3QyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMxRSxJQUFJLE1BQU0sR0FBVyxRQUFRO1FBRTdCLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQyxzQkFBc0I7UUFHL0QsTUFBTSxHQUFHLGdCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxnQkFBdUIsQ0FBQztRQUU5RCxRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLElBQUksU0FBUyxHQUFXLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtnQkFDdEQsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDcEQ7WUFDRCxPQUFPLENBQUMsQ0FBQztnQkFDTCxNQUFNLENBQUMsNkJBQTZCLE1BQU0sRUFBRSxDQUFDO2FBQ2hEO1NBQ0o7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDO0FBbkJELGdDQW1CQzs7Ozs7Ozs7Ozs7Ozs7QUNsQ0QsbUZBQWtDO0FBRWxDLE1BQU0sUUFBUSxHQUFHLFVBQVU7QUFFM0IsSUFBWSx3QkFFWDtBQUZELFdBQVksd0JBQXdCO0lBQ2hDLG1GQUFjO0FBQ2xCLENBQUMsRUFGVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQUVuQztBQUVELElBQVksbUJBTVg7QUFORCxXQUFZLG1CQUFtQjtJQUMzQiwrREFBb0IsUUFBUSxHQUFHLFVBQVU7SUFDekMsa0VBQXVCLFFBQVEsR0FBRyxVQUFVO0lBQzVDLGlFQUFzQixRQUFRLEdBQUcsVUFBVTtJQUMzQyxnRUFBcUIsUUFBUSxHQUFHLFVBQVU7SUFDMUMsa0VBQXVCLFFBQVEsR0FBRyxVQUFVLCtFQUFtRDtBQUNuRyxDQUFDLEVBTlcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFNOUI7QUFHRCxTQUFnQixVQUFVLENBQUMsU0FBaUIsRUFBRSxJQUFZO0lBQ3RELE9BQU8sSUFBSSxPQUFPLENBQTBFLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzVHLElBQUksTUFBTSxHQUFXLFFBQVE7UUFFN0IsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLO1FBQzFDLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSztRQUN6QyxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUMsc0JBQXNCO1FBRy9ELE1BQU0sR0FBRyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQXFCLEVBQUUsYUFBb0IsRUFBRSxnQkFBdUIsQ0FBQztRQUVqSCxRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxZQUFZLEVBQUU7Z0JBQzVDLElBQUksTUFBTSxHQUFXLGFBQWEsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pELElBQUksU0FBUyxHQUFXLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtnQkFDdEQsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDO2FBQ3hGO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ0wsTUFBTSxDQUFDLDZCQUE2QixNQUFNLEVBQUUsQ0FBQzthQUNoRDtTQUNKO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQXZCRCxnQ0F1QkM7Ozs7Ozs7Ozs7Ozs7O0FDeENELG1GQUFrQztBQUVsQyxNQUFNLFFBQVEsR0FBRyxVQUFVO0FBQzNCLElBQVksNEJBRVg7QUFGRCxXQUFZLDRCQUE0QjtJQUNwQywyRkFBYztBQUNsQixDQUFDLEVBRlcsNEJBQTRCLEdBQTVCLG9DQUE0QixLQUE1QixvQ0FBNEIsUUFFdkM7QUFFRCxJQUFZLHVCQUlYO0FBSkQsV0FBWSx1QkFBdUI7SUFDL0IsMEVBQXVCLFFBQVEsR0FBRyxVQUFVO0lBQzVDLHlFQUFzQixRQUFRLEdBQUksVUFBVTtJQUM1Qyx3RUFBcUIsUUFBUSxHQUFJLFVBQVU7QUFDL0MsQ0FBQyxFQUpXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBSWxDO0FBR0QsU0FBZ0IsY0FBYyxDQUFDLFNBQWlCLEVBQUUsU0FBaUI7SUFDL0QsT0FBTyxJQUFJLE9BQU8sQ0FBd0MsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDMUUsSUFBSSxNQUFNLEdBQVcsUUFBUTtRQUU3QixJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUs7UUFFM0MsTUFBTSxHQUFHLGdCQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsZUFBc0IsQ0FBQztRQUU1RSxRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFDLElBQUksU0FBUyxHQUFHLGVBQWUsQ0FBQyxZQUFZLEVBQUU7Z0JBQzlDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUcsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDO2FBQ3BEO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ0wsTUFBTSxDQUFDLGlDQUFpQyxNQUFNLEVBQUUsQ0FBQzthQUNwRDtTQUNKO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQWxCRCx3Q0FrQkM7Ozs7Ozs7Ozs7Ozs7O0FDaENELG1GQUFrQztBQUVsQyxNQUFNLFFBQVEsR0FBRyxVQUFVO0FBQzNCLElBQVksb0JBS1g7QUFMRCxXQUFZLG9CQUFvQjtJQUM1QiwyRUFBYztJQUNkLDhHQUFvQztJQUNwQyw0R0FBbUM7SUFDbkMsMEhBQTBDO0FBQzlDLENBQUMsRUFMVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQUsvQjtBQUVELElBQVksZUFrQlg7QUFsQkQsV0FBWSxlQUFlO0lBQ3ZCLG9EQUFpQixRQUFRLEdBQUcsVUFBVTtJQUN0QywrREFBNEIsUUFBUSxHQUFHLFVBQVU7SUFDakQsMkRBQXdCLFFBQVEsR0FBRyxVQUFVO0lBQzdDLDREQUF5QixRQUFRLEdBQUcsVUFBVTtJQUM5QywwREFBdUIsUUFBUSxHQUFHLFVBQVU7SUFDNUMseURBQXNCLFFBQVEsR0FBRyxVQUFVO0lBQzNDLHVEQUFvQixRQUFRLEdBQUcsVUFBVTtJQUN2Qix3SEFBd0g7SUFDMUksNkRBQTBCLFFBQVEsR0FBRyxVQUFVO0lBQy9DLDBEQUF1QixRQUFRLEdBQUcsVUFBVTtJQUM1Qyx3REFBcUIsUUFBUSxHQUFHLFVBQVU7SUFDMUMsd0RBQXFCLFFBQVEsR0FBRyxVQUFVO0lBQzFDLDBEQUF1QixRQUFRLEdBQUcsVUFBVTtJQUM1QywwREFBdUIsUUFBUSxHQUFHLFVBQVU7SUFDNUMsMERBQXVCLFFBQVEsR0FBRyxVQUFVO0lBQzVDLG1EQUFnQixRQUFRLEdBQUcsVUFBVTtJQUNyQyxrREFBZSxRQUFRLEdBQUcsVUFBVTtBQUN4QyxDQUFDLEVBbEJXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBa0IxQjtBQUdELFNBQWdCLE1BQU0sQ0FBQyxTQUFpQixFQUFFLGFBQXFCLEVBQUUsWUFBb0IsRUFBRSxPQUFlO0lBQ2xHLE9BQU8sSUFBSSxPQUFPLENBQXNDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3hFLElBQUksTUFBTSxHQUFXLFFBQVE7UUFFN0IsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLO1FBRXpDLE1BQU0sR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsYUFBb0IsQ0FBQztRQUU3RixRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssb0JBQW9CLENBQUMsVUFBVSxDQUFDO1lBQ3JDLEtBQUssb0JBQW9CLENBQUMsdUJBQXVCLENBQUM7WUFDbEQsS0FBSyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQztZQUNqRCxLQUFLLG9CQUFvQixDQUFDLDZCQUE2QixDQUFDLENBQUM7Z0JBQ3JELElBQUksT0FBTyxHQUFXLGFBQWEsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xELE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2dCQUM3QyxNQUFLO2FBQ1I7WUFDRCxLQUFLLGVBQWUsQ0FBQyxjQUFjLENBQUM7WUFDcEMsS0FBSyxlQUFlLENBQUMseUJBQXlCLENBQUM7WUFDL0MsS0FBSyxlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDM0MsS0FBSyxlQUFlLENBQUMsc0JBQXNCLENBQUM7WUFDNUMsS0FBSyxlQUFlLENBQUMsb0JBQW9CLENBQUM7WUFDMUMsS0FBSyxlQUFlLENBQUMsbUJBQW1CLENBQUM7WUFDekMsS0FBSyxlQUFlLENBQUMsaUJBQWlCLENBQUM7WUFDdkMsS0FBSyxlQUFlLENBQUMsdUJBQXVCLENBQUM7WUFDN0MsS0FBSyxlQUFlLENBQUMsb0JBQW9CLENBQUM7WUFDMUMsS0FBSyxlQUFlLENBQUMsa0JBQWtCLENBQUM7WUFDeEMsS0FBSyxlQUFlLENBQUMsa0JBQWtCLENBQUM7WUFDeEMsS0FBSyxlQUFlLENBQUMsb0JBQW9CLENBQUM7WUFDMUMsS0FBSyxlQUFlLENBQUMsb0JBQW9CLENBQUM7WUFDMUMsS0FBSyxlQUFlLENBQUMsb0JBQW9CLENBQUM7WUFDMUMsS0FBSyxlQUFlLENBQUMsYUFBYSxDQUFDO1lBQ25DLEtBQUssZUFBZSxDQUFDLFlBQVksQ0FBQztnQkFDOUIsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDeEMsTUFBSzthQUNSO1lBR0QsT0FBTyxDQUFDLENBQUM7Z0JBQ0wsTUFBTSxDQUFDLHlCQUF5QixNQUFNLEVBQUUsQ0FBQzthQUM1QztTQUNKO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQTNDRCx3QkEyQ0M7Ozs7Ozs7Ozs7Ozs7O0FDMUVELG1GQUFrQztBQUVsQyxNQUFNLFFBQVEsR0FBRyxVQUFVO0FBQzNCLElBQVksNkJBRVg7QUFGRCxXQUFZLDZCQUE2QjtJQUNyQyw2RkFBYyxFQUFDLHdFQUF3RTtBQUMzRixDQUFDLEVBRlcsNkJBQTZCLEdBQTdCLHFDQUE2QixLQUE3QixxQ0FBNkIsUUFFeEM7QUFFRCxJQUFZLHdCQUlYO0FBSkQsV0FBWSx3QkFBd0I7SUFDaEMsc0VBQWlCLFFBQVEsR0FBRyxVQUFVO0lBQ3RDLDBFQUFxQixRQUFRLEdBQUcsVUFBVTtJQUMxQyw2RUFBd0IsUUFBUSxHQUFHLFVBQVU7QUFDakQsQ0FBQyxFQUpXLHdCQUF3QixHQUF4QixnQ0FBd0IsS0FBeEIsZ0NBQXdCLFFBSW5DO0FBRUQsU0FBZ0IsZUFBZTtJQUMzQixPQUFPLElBQUksT0FBTyxDQUF3QyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMxRSxJQUFJLE1BQU0sR0FBVyxRQUFRO1FBQzdCLDZDQUE2QztRQUM3QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU1QixNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsTUFBYSxDQUFDO1FBRTlDLElBQUksTUFBTSxLQUFLLDZCQUE2QixDQUFDLFVBQVUsRUFBRTtZQUNyRCxJQUFJLE9BQU8sR0FBVyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDO1NBQ2xEO2FBQ0k7WUFDRCxNQUFNLENBQUMsa0NBQWtDLE1BQU0sRUFBRSxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQWhCRCwwQ0FnQkM7Ozs7Ozs7Ozs7Ozs7O0FDN0JELG1GQUFrQztBQUVsQyxNQUFNLFFBQVEsR0FBRyxVQUFVO0FBRTNCLElBQVksb0JBTVg7QUFORCxXQUFZLG9CQUFvQjtJQUM1QiwyRUFBYztJQUNkLHdHQUFpQztJQUNqQyxvR0FBK0I7QUFHbkMsQ0FBQyxFQU5XLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBTS9CO0FBRUQsSUFBWSxlQWtCWDtBQWxCRCxXQUFZLGVBQWU7SUFDdkIsMkRBQXdCLFFBQVEsR0FBRyxVQUFVO0lBQzdDLDJEQUF3QixRQUFRLEdBQUcsVUFBVTtJQUM3QywwREFBdUIsUUFBUSxHQUFHLFVBQVU7SUFDNUMsbURBQWdCLFFBQVEsR0FBRyxVQUFVO0lBQ3JDLHdEQUFxQixRQUFRLEdBQUcsVUFBVTtJQUMxQywwREFBdUIsUUFBUSxHQUFHLFVBQVU7SUFDNUMseURBQXNCLFFBQVEsR0FBRyxVQUFVO0lBQzNDLHdEQUFxQixRQUFRLEdBQUcsVUFBVTtJQUMxQyxpREFBYyxRQUFRLEdBQUcsVUFBVTtJQUNuQyxtREFBZ0IsUUFBUSxHQUFHLFVBQVU7SUFDckMseURBQXNCLFFBQVEsR0FBRyxVQUFVO0lBQzNDLHdEQUFxQixRQUFRLEdBQUcsVUFBVTtJQUMxQyw2REFBMEIsUUFBUSxHQUFHLFVBQVU7SUFDL0MsK0RBQTRCLFFBQVEsR0FBRyxVQUFVO0lBQ2pELCtEQUE0QixRQUFRLEdBQUcsVUFBVTtJQUNqRCwwREFBdUIsUUFBUSxHQUFHLFVBQVU7SUFDNUMsa0RBQWUsUUFBUSxHQUFHLFVBQVU7QUFDeEMsQ0FBQyxFQWxCVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQWtCMUI7QUFHRCxTQUFnQixNQUFNLENBQUMsU0FBaUIsRUFBRSxLQUFZO0lBQ2xELE9BQU8sSUFBSSxPQUFPLENBQW9ELENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RGLElBQUksTUFBTSxHQUFXLFFBQVE7UUFFN0IsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLO1FBQzFDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSztRQUV6QyxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQWdCLEVBQUUsS0FBSyxFQUFFLGNBQXFCLENBQUM7UUFFakYsUUFBUSxNQUFNLEVBQUU7WUFDWixLQUFLLG9CQUFvQixDQUFDLFVBQVUsQ0FBQztZQUNyQyxLQUFLLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO1lBQzdDLEtBQUssb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxRQUFRLEdBQVcsY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFDcEQsSUFBSSxHQUFHLEdBQVcsU0FBUyxDQUFDLFdBQVcsRUFBRTtnQkFDekMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUcsQ0FBQzthQUM3RDtZQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNMLE1BQU0sQ0FBQyx5QkFBeUIsTUFBTSxFQUFFLENBQUM7YUFDNUM7U0FDSjtJQUNMLENBQUMsQ0FBQztBQUNOLENBQUM7QUF0QkQsd0JBc0JDOzs7Ozs7Ozs7Ozs7OztBQ3ZERCxtRkFBa0M7QUFFbEMsTUFBTSxRQUFRLEdBQUcsVUFBVTtBQUMzQixJQUFZLHFCQUVYO0FBRkQsV0FBWSxxQkFBcUI7SUFDN0IsNkVBQWM7QUFDbEIsQ0FBQyxFQUZXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBRWhDO0FBRUQsSUFBWSxnQkFlWDtBQWZELFdBQVksZ0JBQWdCO0lBQ3hCLHFEQUFnQixRQUFRLEdBQUcsVUFBVTtJQUNyQywwREFBcUIsUUFBUSxHQUFHLFVBQVU7SUFDMUMsOERBQXlCLFFBQVEsR0FBRyxVQUFVO0lBQzlDLDREQUF1QixRQUFRLEdBQUcsVUFBVTtJQUM1QywyREFBc0IsUUFBUSxHQUFHLFVBQVU7SUFDM0MsMERBQXFCLFFBQVEsR0FBRyxVQUFVO0lBQzFDLG1EQUFjLFFBQVEsR0FBRyxVQUFVO0lBQ25DLHFEQUFnQixRQUFRLEdBQUcsVUFBVTtJQUNyQywyREFBc0IsUUFBUSxHQUFHLFVBQVU7SUFDM0MsMERBQXFCLFFBQVEsR0FBRyxVQUFVO0lBQzFDLGlFQUE0QixRQUFRLEdBQUcsVUFBVTtJQUNqRCxpRUFBNEIsUUFBUSxHQUFHLFVBQVU7SUFDakQsNERBQXVCLFFBQVEsR0FBRyxVQUFVO0lBQzVDLG9EQUFlLFFBQVEsR0FBRyxVQUFVO0FBQ3hDLENBQUMsRUFmVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQWUzQjtBQUdELFNBQWdCLE9BQU8sQ0FBQyxTQUFpQixFQUFFLElBQVk7SUFDbkQsT0FBTyxJQUFJLE9BQU8sQ0FBdUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDekUsSUFBSSxNQUFNLEdBQVcsUUFBUTtRQUU3QixJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUs7UUFFMUMsTUFBTSxHQUFHLGdCQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFxQixDQUFDO1FBRTVFLFFBQVEsTUFBTSxFQUFFO1lBQ1osS0FBSyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxRQUFRLEdBQVcsY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFDcEQsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDbEQ7WUFDRCxPQUFPLENBQUMsQ0FBQztnQkFDTCxNQUFNLENBQUMsMEJBQTBCLE1BQU0sRUFBRSxDQUFDO2FBQzdDO1NBQ0o7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDO0FBbEJELDBCQWtCQzs7Ozs7Ozs7Ozs7QUMzQ0Q7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSxtRkFBbUY7QUFDbkYsNEZBQTZDO0FBQXBDLDJHQUFPO0FBQ2hCLHlGQUEyQztBQUFsQyx3R0FBTTtBQUNmLDZIQUFnRTtBQUF2RCxzSUFBZTtBQUN4Qix5RkFBMkM7QUFBbEMsd0dBQU07QUFDZiw0RkFBNkM7QUFBcEMsMkdBQU87QUFDaEIsMkdBQXNEO0FBQTdDLDBIQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU3Zpc2Evd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1N2aXNhLy4vc3JjL25pLXZpc2EvZ2V0X3Jlc291cmNlcy50cyIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9uaS12aXNhL25pX3Zpc2EudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS9uaV92aXNhX2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9uaS12aXNhL25pX3Zpc2FfdHlwZXMudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS92aV9jbG9zZS50cyIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9uaS12aXNhL3ZpX2ZpbmRfbmV4dC50cyIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9uaS12aXNhL3ZpX2ZpbmRfcnNyYy50cyIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9uaS12aXNhL3ZpX2dldF9hdHRyaWJ1dGUudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS92aV9vcGVuLnRzIiwid2VicGFjazovL1N2aXNhLy4vc3JjL25pLXZpc2Evdmlfb3Blbl9kZWZhdWx0X3JfbS50cyIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9uaS12aXNhL3ZpX3JlYWQudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS92aV93cml0ZS50cyIsIndlYnBhY2s6Ly9TdmlzYS9leHRlcm5hbCBjb21tb25qcyBcImZmaS1uYXBpXCIiLCJ3ZWJwYWNrOi8vU3Zpc2EvZXh0ZXJuYWwgY29tbW9uanMgXCJyZWYtbmFwaVwiIiwid2VicGFjazovL1N2aXNhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N2aXNhLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiU3Zpc2FcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU3Zpc2FcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU3Zpc2FcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIvL2ltcG9ydCB7IHZpc2FBc3luY1F1ZXJ5LCB2aXNhUXVlcnksIHZpc2FRdWVyeVRvUHJvbWlzZSB9IGZyb20gJy4vbmktdmlzYS9uaV92aXNhJ1xyXG5leHBvcnQgeyB2aUNsb3NlIH0gZnJvbSAnLi92aV9jbG9zZSc7XHJcbmV4cG9ydCB7IHZpT3BlbiB9IGZyb20gJy4vdmlfb3Blbic7XHJcbmV4cG9ydCB7IHZpT3BlbkRlZmF1bHRSTSB9IGZyb20gJy4vdmlfb3Blbl9kZWZhdWx0X3JfbSc7XHJcbmV4cG9ydCB7IHZpUmVhZCB9IGZyb20gJy4vdmlfcmVhZCc7XHJcbmV4cG9ydCB7IHZpV3JpdGUgfSBmcm9tICcuL3ZpX3dyaXRlJztcclxuaW1wb3J0IHsgTmlWaXNhQ29uc3RhbnRzIH0gZnJvbSAnLi9uaV92aXNhX2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IHZpQ2xvc2UgfSBmcm9tICcuL3ZpX2Nsb3NlJztcclxuaW1wb3J0IHsgVmlGaW5kTmV4dCB9IGZyb20gJy4vdmlfZmluZF9uZXh0JztcclxuaW1wb3J0IHsgVmlGaW5kUnNyYyB9IGZyb20gJy4vdmlfZmluZF9yc3JjJztcclxuaW1wb3J0IHsgdmlHZXRBdHRyaWJ1dGUgfSBmcm9tICcuL3ZpX2dldF9hdHRyaWJ1dGUnO1xyXG5pbXBvcnQgeyB2aU9wZW4gfSBmcm9tICcuL3ZpX29wZW4nO1xyXG5pbXBvcnQgeyB2aU9wZW5EZWZhdWx0Uk0gfSBmcm9tICcuL3ZpX29wZW5fZGVmYXVsdF9yX20nO1xyXG5cclxuZXhwb3J0IHR5cGUgUmVzb3VyY2VMaXN0ID0ge3Jlc291cmNlTmFtZTogc3RyaW5nLCBwcmVzZW50OiBib29sZWFufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFJlc291cmNlcyA9IGFzeW5jICgpOlByb21pc2U8UmVzb3VyY2VMaXN0W10+ID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSZXNvdXJjZUxpc3RbXT4gKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgdmlSZXNvdXJjZXMgPSBbXVxyXG4gICAgbGV0IHZpUmVzb3VyY2VzX3dpdGhfcHJlc2VudCA9IFtdXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIG9wZW4gZGVmYXVsdCBzZXNzaW9uXHJcbiAgICAgICAgbGV0IGRlZmF1bHRSTSA9IGF3YWl0IHZpT3BlbkRlZmF1bHRSTSgpXHJcbiAgICAgICAgY29uc29sZS5sb2coZGVmYXVsdFJNKVxyXG5cclxuICAgICAgICBsZXQgYXR0ciA9IGF3YWl0IHZpR2V0QXR0cmlidXRlKGRlZmF1bHRSTS5kZWZhdWx0Uk0sTmlWaXNhQ29uc3RhbnRzLlZJX0tUQVRUUl9SRVRVUk5fQUxMKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF0dHIpXHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbGlzdCBvZiBlcXVpcG1lbnQgc2VlbiBieSBwY1xyXG4gICAgICAgIGxldCBmaW5kTGlzdCA9IGF3YWl0IFZpRmluZFJzcmMoZGVmYXVsdFJNLmRlZmF1bHRSTSwgXCI/KlwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbmRMaXN0KVxyXG4gICAgICAgIHZpUmVzb3VyY2VzLnB1c2goZmluZExpc3QuaW5zdHJEZXNjKVxyXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBsaXN0IG9mIHJlc291cmNlIGNvbGxlY3Rpb24gdGhlIHJlc291cmNlIG5hbWVcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbmRMaXN0LnJldGNudCAtMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0ID0gYXdhaXQgVmlGaW5kTmV4dChmaW5kTGlzdC5maW5kTGlzdClcclxuICAgICAgICAgICAgdmlSZXNvdXJjZXMucHVzaChuZXh0Lmluc3RyRGVzYylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHZlcmlmeSB0aGUgcmVzb3VyY2VzIGFyZSBwcmVzZW50XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aVJlc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgYXR0ZW1wdGluZyB0byBvcGVuICR7dmlSZXNvdXJjZXNbaV19YClcclxuICAgICAgICAgICAgLy8gYXR0ZW1wdGluZyB0byBvcGVuICBcclxuICAgICAgICAgICAgbGV0IG9wZW5BdHRlbXB0ID0gYXdhaXQgdmlPcGVuKGRlZmF1bHRSTS5kZWZhdWx0Uk0sdmlSZXNvdXJjZXNbaV0sTmlWaXNhQ29uc3RhbnRzLlZJX05VTEwsTmlWaXNhQ29uc3RhbnRzLlZJX05VTEwpICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChvcGVuQXR0ZW1wdC5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmlSZXNvdXJjZXNfd2l0aF9wcmVzZW50LnB1c2goe3Jlc291cmNlTmFtZTogdmlSZXNvdXJjZXNbaV0sIHByZXNlbnQ6IHRydWV9KVxyXG4gICAgICAgICAgICAgICAgdmlDbG9zZShvcGVuQXR0ZW1wdC5zZXNzaW9uKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmlSZXNvdXJjZXNfd2l0aF9wcmVzZW50LnB1c2goe3Jlc291cmNlTmFtZTogdmlSZXNvdXJjZXNbaV0sIHByZXNlbnQ6IGZhbHNlfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2aUNsb3NlKGRlZmF1bHRSTS5kZWZhdWx0Uk0pXHJcbiAgICAgICAgcmVzb2x2ZSh2aVJlc291cmNlc193aXRoX3ByZXNlbnQpXHJcbiAgICAgICAgXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgcGxhdGZvcm0sIGFyY2ggfSBmcm9tICdvcydcclxuaW1wb3J0IHsgTGlicmFyeSB9IGZyb20gJ2ZmaS1uYXBpJ1xyXG5pbXBvcnQgeyBWaUFjY2Vzc01vZGUsIFZpQXR0ciwgVmlBdHRyU3RhdGUsIFZpRXZlbnQsIFZpRXZlbnRGaWx0ZXIsIFZpRXZlbnRUeXBlLCBWaUZpbmRMaXN0LCBWaU9iamVjdCwgVmlQQXR0clN0YXRlLCBWaVBCdWYsIFZpUEV2ZW50LCBWaVBFdmVudFR5cGUsIFZpUEZpbmRMaXN0LCBWaVBKb2JJZCwgVmlQT2JqZWN0LCBWaVBTZXNzaW9uLCBWaVBTdGF0dXMsIFZpUFVJbnQxNiwgVmlQVUludDMyLCBWaVNlc3Npb24sIFZpU3RhdHVzLCBWaVVJbnQxNiwgVmlVSW50MzIgfSBmcm9tICcuL25pX3Zpc2FfdHlwZXMnXHJcbmltcG9ydCByZWYsIHsgcmVhZEludDY0TEUgfSBmcm9tICdyZWYtbmFwaSc7XHJcblxyXG5pbXBvcnQgeyBOaVZpc2FDb25zdGFudHMgfSBmcm9tICcuL25pX3Zpc2FfY29uc3RhbnRzJztcclxuLy9pbXBvcnQgeyBWaUFjY2Vzc01vZGUgfSBmcm9tICcuL25pX3Zpc2FfY29uc3RhbnRzJztcclxuLy8gQ2hvb3NlIHRoZSBwcm9wZXIgRExMIG5hbWVcclxuLy8gZXhwb3J0IGNvbnN0IG5pVmlzYSA9IChkbGxOYW1lOiBzdHJpbmcpID0+IHtcclxuLy8gXHRyZXR1cm5MaWJyYXJ5KGRsbE5hbWUsIHtcclxuLy8gXHRcdC8vIFJlc291cmNlIE1hbmFnZXIgRnVuY3Rpb25zIGFuZCBPcGVyYXRpb25zXHJcbi8vIFx0XHQndmlPcGVuRGVmYXVsdFJNJzogW1ZpU3RhdHVzLCBbVmlQU2Vzc2lvbl1dLFxyXG4vLyBcdFx0J3ZpRmluZFJzcmMnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVBGaW5kTGlzdCwgVmlQVUludDMyLCAnc3RyaW5nJ11dLFxyXG4vLyBcdFx0J3ZpRmluZE5leHQnOiBbVmlTdGF0dXMsIFtWaUZpbmRMaXN0LCAnc3RyaW5nJ11dLFxyXG4vLyBcdFx0J3ZpUGFyc2VSc3JjJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlQVUludDE2LCBWaVBVSW50MTZdXSxcclxuLy8gXHRcdCd2aVBhcnNlUnNyY0V4JzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlQVUludDE2LCBWaVBVSW50MTYsICdzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZyddXSxcclxuLy8gXHRcdCd2aU9wZW4nOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaUFjY2Vzc01vZGUsIFZpVUludDMyLCBWaVBTZXNzaW9uXV0sXHJcbi8vIFx0XHQvLyBSZXNvdXJjZSBUZW1wbGF0ZSBPcGVyYXRpb25zXHJcbi8vIFx0XHQndmlDbG9zZSc6IFtWaVN0YXR1cywgW1ZpT2JqZWN0XV0sXHJcbi8vIFx0XHQvLyBCYXNpYyBJL08gT3BlcmF0aW9uc1xyXG4vLyBcdFx0J3ZpUmVhZCc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgVmlQQnVmLCBWaVVJbnQzMiwgVmlQVUludDMyXV0sXHJcbi8vIFx0XHQndmlSZWFkVG9GaWxlJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlVSW50MzIsIFZpUFVJbnQzMl1dLFxyXG4vLyBcdFx0J3ZpV3JpdGUnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVVJbnQzMiwgVmlQVUludDMyXV0sXHJcbi8vIFx0fSlcclxuLy8gfVxyXG5leHBvcnQgY29uc3QgYWdWaXNhID0gTGlicmFyeSgnLi9hZ3Zpc2EzMicsIHtcclxuXHQvLyBSZXNvdXJjZSBNYW5hZ2VyIEZ1bmN0aW9ucyBhbmQgT3BlcmF0aW9uc1xyXG5cdCd2aU9wZW5EZWZhdWx0Uk0nOiBbVmlTdGF0dXMsIFtWaVBTZXNzaW9uXV0sXHJcblx0J3ZpRmluZFJzcmMnOiBbVmlTdGF0dXMsIFtWaVVJbnQzMiwgJ3N0cmluZycsIFZpUEZpbmRMaXN0LCBWaVBVSW50MzIsICdzdHJpbmcnXV0sXHJcblx0J3ZpRmluZE5leHQnOiBbVmlTdGF0dXMsIFtWaUZpbmRMaXN0LCAnc3RyaW5nJ11dLFxyXG5cdCd2aVBhcnNlUnNyYyc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpUFVJbnQxNiwgVmlQVUludDE2XV0sXHJcblx0J3ZpUGFyc2VSc3JjRXgnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVBVSW50MTYsIFZpUFVJbnQxNiwgJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJ11dLFxyXG5cdCd2aU9wZW4nOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaUFjY2Vzc01vZGUsIFZpVUludDMyLCBWaVBTZXNzaW9uXV0sXHJcblx0Ly8gR2V0IGFuZCBTZXQgQXR0cmlidXRlc1xyXG5cdCd2aVNldEF0dHJpYnV0ZSc6IFtWaVN0YXR1cyxbVmlTZXNzaW9uLCBWaUF0dHIsIFZpQXR0clN0YXRlXV0sXHJcblx0J3ZpR2V0QXR0cmlidXRlJzogW1ZpU3RhdHVzLFtWaVNlc3Npb24sIFZpQXR0ciwgVmlQQXR0clN0YXRlXV0sXHJcblx0Ly8gUmVzb3VyY2UgVGVtcGxhdGUgT3BlcmF0aW9uc1xyXG5cdCd2aUNsb3NlJzogW1ZpU3RhdHVzLCBbVmlPYmplY3RdXSxcclxuXHQvLyBCYXNpYyBJL08gT3BlcmF0aW9uc2BcclxuXHQndmlSZWFkJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCBWaVBCdWYsIFZpVUludDMyLCBWaVBVSW50MzJdXSxcclxuXHQndmlSZWFkVG9GaWxlJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlVSW50MzIsIFZpUFVJbnQzMl1dLFxyXG5cdCd2aVdyaXRlJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlVSW50MzIsIFZpUFVJbnQzMl1dLFxyXG5cdC8vIEFzeW5jIHN0dWZmXHJcblx0J3ZpUmVhZEFzeW5jJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlVSW50MzIsIFZpUEpvYklkXV0sXHJcblx0J3ZpV3JpdGVBc3luYyc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpVUludDMyLCBWaVBKb2JJZF1dLFxyXG5cclxuXHQvLyBFdmVudHNcclxuXHQndmlFbmFibGVFdmVudCc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgVmlFdmVudFR5cGUsIFZpVUludDE2LCBWaUV2ZW50RmlsdGVyXV0sXHJcblx0J3ZpRGlzYWJsZUV2ZW50JzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCBWaUV2ZW50VHlwZSwgVmlVSW50MTZdXSxcclxuXHQndmlXYWl0T25FdmVudCc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgVmlFdmVudFR5cGUsIFZpVUludDMyLCBWaVBFdmVudFR5cGUsIFZpUEV2ZW50XV0sXHJcblxyXG5cclxufSlcclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiB2aU9wZW5EZWZhdWx0Uk0oKTogeyBzdGF0dXM6IG51bWJlciwgZGVmYXVsdFJNOiBudW1iZXIgfSB7XHJcblxyXG4vLyBcdGxldCBzdGF0dXM6IG51bWJlciA9IDFcclxuLy8gXHRsZXQgcFNlc24gPSByZWYuYWxsb2MoVmlQU2Vzc2lvbik7XHJcbi8vIFx0c3RhdHVzID0gYWdWaXNhLnZpT3BlbkRlZmF1bHRSTShwU2VzbilcclxuLy8gXHRyZXR1cm4geyBzdGF0dXM6IHN0YXR1cywgZGVmYXVsdFJNOiBwU2Vzbi5yZWFkSW50MzJMRSgpIH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHZpT3Blbih2aVNlc3Npb246IG51bWJlciwgdmlzYV9yZXNvdXJjZTogc3RyaW5nLCB2aUFjY2Vzc01vZGU6IG51bWJlciwgdGltZW91dDogbnVtYmVyKTogeyBzdGF0dXM6IG51bWJlciwgdmlTZXNzaW9uOiBudW1iZXIgfSB7XHJcblxyXG4vLyBcdGxldCBwID0gcmVmLmFsbG9jKFZpUFNlc3Npb24pO1xyXG4vLyBcdGxldCBzdGF0dXM6IG51bWJlciA9IDFcclxuLy8gXHRzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuKHZpU2Vzc2lvbiwgdmlzYV9yZXNvdXJjZSwgdmlBY2Nlc3NNb2RlLCB0aW1lb3V0LCBwKVxyXG4vLyBcdHJldHVybiB7IHN0YXR1czogc3RhdHVzLCB2aVNlc3Npb246IHAucmVhZEludDMyTEUoKSB9XHJcblxyXG4vLyB9XHJcblxyXG4vLyBzXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiB2aVJlYWQodmlTZXNzaW9uOiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiB7IHN0YXR1czogbnVtYmVyLCByZXRCdWZmOiBzdHJpbmcsIHJldENvdW50OiBudW1iZXIgfSB7XHJcblxyXG4vLyBcdGxldCBzdGF0dXM6IG51bWJlciA9IDFcclxuLy8gXHRsZXQgYnVmZiA9IHJlZi5hbGxvYyhWaVBCdWYpO1xyXG4vLyBcdGxldCByZXRDb3VudCA9IHJlZi5hbGxvYyhWaVBVSW50MzIpO1xyXG4vLyBcdHN0YXR1cyA9IGFnVmlzYS52aVJlYWQodmlTZXNzaW9uLCBidWZmLCBjb3VudCwgcmV0Q291bnQpXHJcbi8vIFx0cmV0dXJuIHtcclxuLy8gXHRcdHN0YXR1czogc3RhdHVzLFxyXG4vLyBcdFx0cmV0QnVmZjogYnVmZi5yZWFkQ1N0cmluZygpLnN1YnN0cmluZygwLCByZXRDb3VudC5yZWFkSW50MzJMRSgpKSxcclxuLy8gXHRcdHJldENvdW50OiByZXRDb3VudC5yZWFkSW50MzJMRSgpXHJcbi8vIFx0fVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdmlDbG9zZSh2aU9iamVjdDogbnVtYmVyKTogeyBzdGF0dXM6IG51bWJlciB9IHtcclxuLy8gXHRsZXQgc3RhdHVzID0gYWdWaXNhLnZpQ2xvc2UodmlPYmplY3QpXHJcbi8vIFx0cmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMgfVxyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlzYVF1ZXJ5KHZpc2FBZGRyZXNzOiBzdHJpbmcsIHF1ZXJ5U3RyaW5nOiBzdHJpbmcsIGNhbGxiYWNrOiAoc3RhdHVzOiBudW1iZXIsIHJldHVybkJ1ZmZlcjogc3RyaW5nKSA9PiB2b2lkKSB7XHJcblxyXG5cdGNvbnNvbGUubG9nKFwiaGVsbG9cIilcclxuXHRsZXQgcXVlcnlTdHIgPSBxdWVyeVN0cmluZyArICdcXG4nO1xyXG5cclxuXHRsZXQgc3RhdHVzOiBudW1iZXIgPSAxXHJcblx0bGV0IHBTZXNuID0gcmVmLmFsbG9jKFZpUFNlc3Npb24pO1xyXG5cdHN0YXR1cyA9IGFnVmlzYS52aU9wZW5EZWZhdWx0Uk0ocFNlc24pXHJcblxyXG5cdGlmIChzdGF0dXMpIHJldHVybiBjYWxsYmFjayhzdGF0dXMsIFwiMVwiKTtcclxuXHJcblx0Ly8gb3BlbiBzZXNzaW9uIHRvIGRldmljZVxyXG5cclxuXHRsZXQgZGV2aWNlU2Vzc2lvbiA9IHJlZi5hbGxvYyhWaVBTZXNzaW9uKTtcclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuKHBTZXNuLnJlYWRJbnQzMkxFKCksIHZpc2FBZGRyZXNzLCAwLCAyMDAwLCBkZXZpY2VTZXNzaW9uKVxyXG5cclxuXHRpZiAoc3RhdHVzKSByZXR1cm4gY2FsbGJhY2soc3RhdHVzLCBcIjJcIik7XHJcblxyXG5cclxuXHQvLyB3cml0ZSBxdWVyeSB0byBkZXZpY2VcclxuXHRsZXQgY291bnQgPSBxdWVyeVN0cmluZy5sZW5ndGhcclxuXHRsZXQgcmV0Q291bnQgPSByZWYuYWxsb2MoVmlQVUludDMyKTtcclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlXcml0ZShkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIHF1ZXJ5U3RyaW5nLCBjb3VudCwgcmV0Q291bnQpXHJcblxyXG5cdGlmIChzdGF0dXMpIHJldHVybiBjYWxsYmFjayhzdGF0dXMsIFwiM1wiKTtcclxuXHQvLyByZWFkIGJhY2sgcXVlcnkgcmVzdWx0XHJcblxyXG5cclxuXHRsZXQgYnVmZiA9IHJlZi5hbGxvYyhWaVBCdWYpO1xyXG5cdHJldENvdW50ID0gcmVmLmFsbG9jKFZpUFVJbnQzMik7XHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aVJlYWQoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBidWZmLCA1MTIsIHJldENvdW50KVxyXG5cdGxldCBidWZmZXJTaXplID0gcmV0Q291bnQucmVhZEludDMyTEUoKVxyXG5cdGxldCByZXR1cm5CdWZmZXIgPSBidWZmLnJlYWRDU3RyaW5nKCkuc3Vic3RyaW5nKDAsIHJldENvdW50LnJlYWRJbnQzMkxFKCkpXHJcblxyXG5cdGlmIChzdGF0dXMpIHJldHVybiBjYWxsYmFjayhzdGF0dXMsIFwiNFwiKTtcclxuXHQvLyBjbG9zZSBzZXNzaW9uIG9mIGRldmljZSBhbmQgcmVzb3VyY2UgbWFuYWdlclxyXG5cdGFnVmlzYS52aUNsb3NlKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSk7XHJcblx0YWdWaXNhLnZpQ2xvc2UocFNlc24ucmVhZEludDMyTEUoKSk7XHJcblx0Ly8gcmV0dXJuIHF1ZXJ5IHJlc3VsdFxyXG5cdGNhbGxiYWNrKHN0YXR1cywgcmV0dXJuQnVmZmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpc2FBc3luY1F1ZXJ5KHZpc2FBZGRyZXNzOiBzdHJpbmcsIHF1ZXJ5U3RyaW5nOiBzdHJpbmcsIGNhbGxiYWNrOiAoc3RhdHVzOiBudW1iZXIsIHJldHVybkJ1ZmZlcjogc3RyaW5nKSA9PiB2b2lkKSB7XHJcblxyXG5cdC8vY29uc29sZS5sb2coXCJoZWxsb1wiKVxyXG5cdGxldCBxdWVyeVN0ciA9IHF1ZXJ5U3RyaW5nICsgJ1xcbic7XHJcblxyXG5cdGxldCBzdGF0dXM6IG51bWJlciA9IDFcclxuXHRsZXQgcFNlc24gPSByZWYuYWxsb2MoVmlQU2Vzc2lvbik7XHJcblx0c3RhdHVzID0gYWdWaXNhLnZpT3BlbkRlZmF1bHRSTShwU2VzbilcclxuXHJcblx0aWYgKHN0YXR1cykgcmV0dXJuIGNhbGxiYWNrKHN0YXR1cywgXCIxXCIpO1xyXG5cclxuXHQvLyBvcGVuIHNlc3Npb24gdG8gZGV2aWNlXHJcblxyXG5cdGxldCBkZXZpY2VTZXNzaW9uID0gcmVmLmFsbG9jKFZpUFNlc3Npb24pO1xyXG5cdHN0YXR1cyA9IGFnVmlzYS52aU9wZW4ocFNlc24ucmVhZEludDMyTEUoKSwgdmlzYUFkZHJlc3MsIDAsIDIwMDAsIGRldmljZVNlc3Npb24pXHJcblxyXG5cdGlmIChzdGF0dXMpIHJldHVybiBjYWxsYmFjayhzdGF0dXMsIFwiMlwiKTtcclxuXHJcblxyXG5cdC8vIHdyaXRlIHF1ZXJ5IHRvIGRldmljZVxyXG5cdGxldCBjb3VudCA9IHF1ZXJ5U3RyaW5nLmxlbmd0aFxyXG5cdGxldCByZXRDb3VudCA9IHJlZi5hbGxvYyhWaVBVSW50MzIpO1xyXG5cdC8vIEVuYWJsZSB0aGUgdGhlIGV2ZW50XHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aUVuYWJsZUV2ZW50KGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0VWRU5UX0lPX0NPTVBMRVRJT04sIE5pVmlzYUNvbnN0YW50cy5WSV9RVUVVRSwgTmlWaXNhQ29uc3RhbnRzLlZJX05VTEwpXHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aVdyaXRlKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgcXVlcnlTdHJpbmcsIGNvdW50LCByZXRDb3VudClcclxuXHJcblx0aWYgKHN0YXR1cykgcmV0dXJuIGNhbGxiYWNrKHN0YXR1cywgXCIzXCIpO1xyXG5cdC8vIHJlYWQgYmFjayBxdWVyeSByZXN1bHRcclxuXHJcblxyXG5cclxuXHRsZXQgYnVmZiA9IHJlZi5hbGxvYyhWaVBCdWYpO1xyXG5cdGxldCBqSWQgPSByZWYuYWxsb2MoVmlQSm9iSWQpO1xyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlSZWFkQXN5bmMoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBidWZmIGFzIGFueSwgNTEyLCBqSWQpXHJcblxyXG5cdGxldCBqb2JJZCA9IGpJZC5yZWFkSW50MzJMRSgpXHJcblx0Ly9jb25zb2xlLmxvZyhgSm9iSWQ6ICR7am9iSWR9YClcclxuXHJcblx0bGV0IGV2ZW50VHlwZSA9IHJlZi5hbGxvYyhWaVBFdmVudFR5cGUpO1xyXG5cdGxldCBldmVudENvbnRleHQgPSByZWYuYWxsb2MoVmlQRXZlbnQpXHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aVdhaXRPbkV2ZW50KGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0VWRU5UX0lPX0NPTVBMRVRJT04sIDIwMDAsIGV2ZW50VHlwZSwgZXZlbnRDb250ZXh0KVxyXG5cdC8vXHJcblxyXG5cdC8vbGV0IHJldHVybkJ1ZmZlciA9IGJ1ZmYucmVhZENTdHJpbmcoKS5zdWJzdHJpbmcoMCxyZXRDb3VudC5yZWFkSW50MzJMRSgpKVxyXG5cclxuXHQvL2NvbnNvbGUubG9nKGBDb21wbGV0ZWRgKVxyXG5cclxuXHRsZXQgZXZlbnRQUmV0dXJuZWRFdmVudFR5cGUgPSByZWYuYWxsb2MoVmlQT2JqZWN0KVxyXG5cdGxldCBldmVudFBKb2JJZCA9IHJlZi5hbGxvYyhWaVBKb2JJZClcclxuXHRsZXQgZXZlbnRQUmV0dXJuUFN0YXR1cyA9IHJlZi5hbGxvYyhWaVBTdGF0dXMpXHJcblx0bGV0IGV2ZW50UFJldHVybkNvdW50ID0gcmVmLmFsbG9jKFZpUFVJbnQzMilcclxuXHRsZXQgZXZlbnRQUmV0dXJuZWRCdWZmZXIgPSByZWYuYWxsb2MoVmlQQnVmKVxyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX0VWRU5UX1RZUEUsIGV2ZW50UFJldHVybmVkRXZlbnRUeXBlKVxyXG5cdGxldCBldmVudFJldHVybmVkRXZlbnRUeXBlID0gZXZlbnRQUmV0dXJuZWRFdmVudFR5cGUucmVhZEludDMyTEUoKVxyXG5cdC8vY29uc29sZS5sb2coYGV2ZW50UmV0dXJuZWRFdmVudFR5cGU6ICR7ZXZlbnRSZXR1cm5lZEV2ZW50VHlwZX1gKVxyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX0pPQl9JRCwgZXZlbnRQSm9iSWQpXHJcblx0bGV0IGV2ZW50Sm9iSWQgPSBldmVudFBKb2JJZC5yZWFkSW50MzJMRSgpXHJcblx0Ly9jb25zb2xlLmxvZyhgZXZlbnRKb2JJZDogJHtldmVudEpvYklkfWApXHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfU1RBVFVTLCBldmVudFBSZXR1cm5QU3RhdHVzKVxyXG5cdGxldCByZXR1cm5TdGF0dXMgPSBldmVudFBSZXR1cm5QU3RhdHVzLnJlYWRJbnQzMkxFKClcclxuXHQvL2NvbnNvbGUubG9nKGByZXR1cm5TdGF0dXM6ICR7cmV0dXJuU3RhdHVzfWApXHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfUkVUX0NPVU5ULCBldmVudFBSZXR1cm5Db3VudClcclxuXHRsZXQgZXZlbnRSZXR1cm5Db3VudCA9IGV2ZW50UFJldHVybkNvdW50LnJlYWRJbnQzMkxFKClcclxuXHQvL2NvbnNvbGUubG9nKGBldmVudFJldHVybkNvdW50OiAke2V2ZW50UmV0dXJuQ291bnR9YClcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9CVUZGRVIsIGV2ZW50UFJldHVybmVkQnVmZmVyKVxyXG5cdGxldCBSZXR1cm5CdWZmZXIgPSBidWZmLnJlYWRDU3RyaW5nKCkuc3Vic3RyaW5nKDAsIGV2ZW50UmV0dXJuQ291bnQpXHJcblx0Ly9jb25zb2xlLmxvZyhgUmV0dXJuQnVmZmVyOiAke1JldHVybkJ1ZmZlcn1gKVxyXG5cclxuXHRpZiAoc3RhdHVzKSByZXR1cm4gY2FsbGJhY2soc3RhdHVzLCBcIjRcIik7XHJcblx0Ly8gY2xvc2Ugc2Vzc2lvbiBvZiBkZXZpY2UgYW5kIHJlc291cmNlIG1hbmFnZXJcclxuXHRhZ1Zpc2EudmlDbG9zZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSk7XHJcblx0YWdWaXNhLnZpQ2xvc2UoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpKTtcclxuXHRhZ1Zpc2EudmlDbG9zZShwU2Vzbi5yZWFkSW50MzJMRSgpKTtcclxuXHQvLyByZXR1cm4gcXVlcnkgcmVzdWx0XHJcblx0Y2FsbGJhY2soc3RhdHVzLCBSZXR1cm5CdWZmZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlzYVF1ZXJ5VG9Qcm9taXNlKHZpc2FBZGRyZXNzOiBzdHJpbmcsIHF1ZXJ5U3RyaW5nOiBzdHJpbmcsKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRyZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHQvL2NvbnNvbGUubG9nKFwiaGVsbG9cIilcclxuXHRcdGxldCBxdWVyeVN0ciA9IHF1ZXJ5U3RyaW5nICsgJ1xcbic7XHJcblxyXG5cdFx0bGV0IHN0YXR1czogbnVtYmVyID0gMVxyXG5cdFx0bGV0IHBTZXNuID0gcmVmLmFsbG9jKFZpUFNlc3Npb24pO1xyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpT3BlbkRlZmF1bHRSTShwU2VzbilcclxuXHJcblx0XHRpZiAoc3RhdHVzKSB7XHJcblx0XHRcdHJlamVjdChzdGF0dXMpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gb3BlbiBzZXNzaW9uIHRvIGRldmljZVxyXG5cclxuXHRcdGxldCBkZXZpY2VTZXNzaW9uID0gcmVmLmFsbG9jKFZpUFNlc3Npb24pO1xyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpT3BlbihwU2Vzbi5yZWFkSW50MzJMRSgpLCB2aXNhQWRkcmVzcywgMCwgMjAwMCwgZGV2aWNlU2Vzc2lvbilcclxuXHJcblx0XHRpZiAoc3RhdHVzKSB7XHJcblx0XHRcdHJlamVjdChzdGF0dXMpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gd3JpdGUgcXVlcnkgdG8gZGV2aWNlXHJcblx0XHRsZXQgY291bnQgPSBxdWVyeVN0cmluZy5sZW5ndGhcclxuXHRcdGxldCByZXRDb3VudCA9IHJlZi5hbGxvYyhWaVBVSW50MzIpO1xyXG5cdFx0Ly8gRW5hYmxlIHRoZSB0aGUgZXZlbnRcclxuXHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlFbmFibGVFdmVudChkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9FVkVOVF9JT19DT01QTEVUSU9OLCBOaVZpc2FDb25zdGFudHMuVklfUVVFVUUsIE5pVmlzYUNvbnN0YW50cy5WSV9OVUxMKVxyXG5cclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aVdyaXRlKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgcXVlcnlTdHJpbmcsIGNvdW50LCByZXRDb3VudClcclxuXHJcblx0XHRpZiAoc3RhdHVzKSB7XHJcblx0XHRcdHJlamVjdChzdGF0dXMpXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vbGV0IGJ1ZmYgPSByZWYuYWxsb2MoVmlQQnVmKTtcclxuXHRcdGxldCBidWZmID0gbmV3IEJ1ZmZlcig1MTIpO1xyXG5cdFx0bGV0IGpJZCA9IHJlZi5hbGxvYyhWaVBKb2JJZCk7XHJcblxyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpUmVhZEFzeW5jKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgYnVmZiBhcyBhbnksIDUxMiwgaklkKVxyXG5cclxuXHRcdGxldCBqb2JJZCA9IGpJZC5yZWFkSW50MzJMRSgpXHJcblx0XHQvL2NvbnNvbGUubG9nKGBKb2JJZDogJHtqb2JJZH1gKVxyXG5cclxuXHRcdGxldCBldmVudFR5cGUgPSByZWYuYWxsb2MoVmlQRXZlbnRUeXBlKTtcclxuXHRcdGxldCBldmVudENvbnRleHQgPSByZWYuYWxsb2MoVmlQRXZlbnQpXHJcblxyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpV2FpdE9uRXZlbnQoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfRVZFTlRfSU9fQ09NUExFVElPTiwgMjAwMCwgZXZlbnRUeXBlLCBldmVudENvbnRleHQpXHJcblx0XHQvL1xyXG5cclxuXHRcdC8vbGV0IHJldHVybkJ1ZmZlciA9IGJ1ZmYucmVhZENTdHJpbmcoKS5zdWJzdHJpbmcoMCxyZXRDb3VudC5yZWFkSW50MzJMRSgpKVxyXG5cclxuXHRcdC8vY29uc29sZS5sb2coYENvbXBsZXRlZGApXHJcblxyXG5cdFx0bGV0IGV2ZW50UFJldHVybmVkRXZlbnRUeXBlID0gcmVmLmFsbG9jKFZpUE9iamVjdClcclxuXHRcdGxldCBldmVudFBKb2JJZCA9IHJlZi5hbGxvYyhWaVBKb2JJZClcclxuXHRcdGxldCBldmVudFBSZXR1cm5QU3RhdHVzID0gcmVmLmFsbG9jKFZpUFN0YXR1cylcclxuXHRcdGxldCBldmVudFBSZXR1cm5Db3VudCA9IHJlZi5hbGxvYyhWaVBVSW50MzIpXHJcblx0XHRsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigyNTApXHJcblx0XHQvL2xldCBldmVudFBSZXR1cm5lZEJ1ZmZlciA9IHJlZi5yZWYoVmlQQnVmKVxyXG5cclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfRVZFTlRfVFlQRSwgZXZlbnRQUmV0dXJuZWRFdmVudFR5cGUpXHJcblx0XHRsZXQgZXZlbnRSZXR1cm5lZEV2ZW50VHlwZSA9IGV2ZW50UFJldHVybmVkRXZlbnRUeXBlLnJlYWRJbnQzMkxFKClcclxuXHRcdC8vY29uc29sZS5sb2coYGV2ZW50UmV0dXJuZWRFdmVudFR5cGU6ICR7ZXZlbnRSZXR1cm5lZEV2ZW50VHlwZX1gKVxyXG5cclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfSk9CX0lELCBldmVudFBKb2JJZClcclxuXHRcdGxldCBldmVudEpvYklkID0gZXZlbnRQSm9iSWQucmVhZEludDMyTEUoKVxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgZXZlbnRKb2JJZDogJHtldmVudEpvYklkfWApXHJcblxyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9TVEFUVVMsIGV2ZW50UFJldHVyblBTdGF0dXMpXHJcblx0XHRsZXQgcmV0dXJuU3RhdHVzID0gZXZlbnRQUmV0dXJuUFN0YXR1cy5yZWFkSW50MzJMRSgpXHJcblx0XHQvL2NvbnNvbGUubG9nKGByZXR1cm5TdGF0dXM6ICR7cmV0dXJuU3RhdHVzfWApXHJcblxyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9SRVRfQ09VTlQsIGV2ZW50UFJldHVybkNvdW50KVxyXG5cdFx0bGV0IGV2ZW50UmV0dXJuQ291bnQgPSBldmVudFBSZXR1cm5Db3VudC5yZWFkSW50MzJMRSgpXHJcblx0XHQvL2NvbnNvbGUubG9nKGBldmVudFJldHVybkNvdW50OiAke2V2ZW50UmV0dXJuQ291bnR9YClcclxuXHJcblx0XHQvL3N0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfQlVGRkVSLCBidWZmZXIpXHJcblx0XHRsZXQgUmV0dXJuQnVmZmVyID0gYnVmZi5yZWFkQ1N0cmluZygpXHJcblx0XHQvL2NvbnNvbGUubG9nKGBSZXR1cm5CdWZmZXI6ICR7UmV0dXJuQnVmZmVyfWApXHJcblxyXG5cdFx0aWYgKHN0YXR1cykge1xyXG5cdFx0XHRyZWplY3Qoc3RhdHVzKVxyXG5cdFx0fVxyXG5cdFx0Ly8gY2xvc2Ugc2Vzc2lvbiBvZiBkZXZpY2UgYW5kIHJlc291cmNlIG1hbmFnZXJcclxuXHRcdGFnVmlzYS52aUNsb3NlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpKTtcclxuXHRcdGFnVmlzYS52aUNsb3NlKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSk7XHJcblx0XHRhZ1Zpc2EudmlDbG9zZShwU2Vzbi5yZWFkSW50MzJMRSgpKTtcclxuXHRcdC8vIHJldHVybiBxdWVyeSByZXN1bHRcclxuXHRcdHJlc29sdmUoUmV0dXJuQnVmZmVyKTtcclxuXHJcblx0fSlcclxufSIsImV4cG9ydCBlbnVtIFZpQWNjZXNzTW9kZSB7XHJcblx0VklfTk9fTE9DSyA9ICgwKSxcclxuXHRWSV9FWENMVVNJVkVfTE9DSyA9ICgxKSxcclxuXHRWSV9TSEFSRURfTE9DSyA9ICgyKSxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTmlWaXNhQ29uc3RhbnRzIHtcclxuXHJcblx0VklfTlVMTCA9ICgweDApLFxyXG4gICAgVklfRVJST1IgPSAweDgwMDAwMDAwLFxyXG5cclxuXHRWSV9TUEVDX1ZFUlNJT04gPSAoMHgwMDUwMDgwMCksXHJcblxyXG5cdFZJX0FUVFJfUlNSQ19DTEFTUyA9ICgweEJGRkYwMDAxKSxcclxuXHRWSV9BVFRSX1JTUkNfTkFNRSA9ICgweEJGRkYwMDAyKSxcclxuXHRWSV9BVFRSX1JTUkNfSU1QTF9WRVJTSU9OID0gKDB4M0ZGRjAwMDMpLFxyXG5cdFZJX0FUVFJfUlNSQ19MT0NLX1NUQVRFID0gKDB4M0ZGRjAwMDQpLFxyXG5cdFZJX0FUVFJfTUFYX1FVRVVFX0xFTkdUSCA9ICgweDNGRkYwMDA1KSxcclxuXHRWSV9BVFRSX1VTRVJfREFUQV8zMiA9ICgweDNGRkYwMDA3KSxcclxuXHRWSV9BVFRSX0ZEQ19DSE5MID0gKDB4M0ZGRjAwMEQpLFxyXG5cdFZJX0FUVFJfRkRDX01PREUgPSAoMHgzRkZGMDAwRiksXHJcblx0VklfQVRUUl9GRENfR0VOX1NJR05BTF9FTiA9ICgweDNGRkYwMDExKSxcclxuXHRWSV9BVFRSX0ZEQ19VU0VfUEFJUiA9ICgweDNGRkYwMDEzKSxcclxuXHRWSV9BVFRSX1NFTkRfRU5EX0VOID0gKDB4M0ZGRjAwMTYpLFxyXG5cdFZJX0FUVFJfVEVSTUNIQVIgPSAoMHgzRkZGMDAxOCksXHJcblx0VklfQVRUUl9UTU9fVkFMVUUgPSAoMHgzRkZGMDAxQSksXHJcblx0VklfQVRUUl9HUElCX1JFQUREUl9FTiA9ICgweDNGRkYwMDFCKSxcclxuXHRWSV9BVFRSX0lPX1BST1QgPSAoMHgzRkZGMDAxQyksXHJcblx0VklfQVRUUl9ETUFfQUxMT1dfRU4gPSAoMHgzRkZGMDAxRSksXHJcblx0VklfQVRUUl9BU1JMX0JBVUQgPSAoMHgzRkZGMDAyMSksXHJcblx0VklfQVRUUl9BU1JMX0RBVEFfQklUUyA9ICgweDNGRkYwMDIyKSxcclxuXHRWSV9BVFRSX0FTUkxfUEFSSVRZID0gKDB4M0ZGRjAwMjMpLFxyXG5cdFZJX0FUVFJfQVNSTF9TVE9QX0JJVFMgPSAoMHgzRkZGMDAyNCksXHJcblx0VklfQVRUUl9BU1JMX0ZMT1dfQ05UUkwgPSAoMHgzRkZGMDAyNSksXHJcblx0VklfQVRUUl9SRF9CVUZfT1BFUl9NT0RFID0gKDB4M0ZGRjAwMkEpLFxyXG5cdFZJX0FUVFJfUkRfQlVGX1NJWkUgPSAoMHgzRkZGMDAyQiksXHJcblx0VklfQVRUUl9XUl9CVUZfT1BFUl9NT0RFID0gKDB4M0ZGRjAwMkQpLFxyXG5cdFZJX0FUVFJfV1JfQlVGX1NJWkUgPSAoMHgzRkZGMDAyRSksXHJcblx0VklfQVRUUl9TVVBQUkVTU19FTkRfRU4gPSAoMHgzRkZGMDAzNiksXHJcblx0VklfQVRUUl9URVJNQ0hBUl9FTiA9ICgweDNGRkYwMDM4KSxcclxuXHRWSV9BVFRSX0RFU1RfQUNDRVNTX1BSSVYgPSAoMHgzRkZGMDAzOSksXHJcblx0VklfQVRUUl9ERVNUX0JZVEVfT1JERVIgPSAoMHgzRkZGMDAzQSksXHJcblx0VklfQVRUUl9TUkNfQUNDRVNTX1BSSVYgPSAoMHgzRkZGMDAzQyksXHJcblx0VklfQVRUUl9TUkNfQllURV9PUkRFUiA9ICgweDNGRkYwMDNEKSxcclxuXHRWSV9BVFRSX1NSQ19JTkNSRU1FTlQgPSAoMHgzRkZGMDA0MCksXHJcblx0VklfQVRUUl9ERVNUX0lOQ1JFTUVOVCA9ICgweDNGRkYwMDQxKSxcclxuXHRWSV9BVFRSX1dJTl9BQ0NFU1NfUFJJViA9ICgweDNGRkYwMDQ1KSxcclxuXHRWSV9BVFRSX1dJTl9CWVRFX09SREVSID0gKDB4M0ZGRjAwNDcpLFxyXG5cdFZJX0FUVFJfR1BJQl9BVE5fU1RBVEUgPSAoMHgzRkZGMDA1NyksXHJcblx0VklfQVRUUl9HUElCX0FERFJfU1RBVEUgPSAoMHgzRkZGMDA1QyksXHJcblx0VklfQVRUUl9HUElCX0NJQ19TVEFURSA9ICgweDNGRkYwMDVFKSxcclxuXHRWSV9BVFRSX0dQSUJfTkRBQ19TVEFURSA9ICgweDNGRkYwMDYyKSxcclxuXHRWSV9BVFRSX0dQSUJfU1JRX1NUQVRFID0gKDB4M0ZGRjAwNjcpLFxyXG5cdFZJX0FUVFJfR1BJQl9TWVNfQ05UUkxfU1RBVEUgPSAoMHgzRkZGMDA2OCksXHJcblx0VklfQVRUUl9HUElCX0hTNDg4X0NCTF9MRU4gPSAoMHgzRkZGMDA2OSksXHJcblx0VklfQVRUUl9DTURSX0xBID0gKDB4M0ZGRjAwNkIpLFxyXG5cdFZJX0FUVFJfVlhJX0RFVl9DTEFTUyA9ICgweDNGRkYwMDZDKSxcclxuXHRWSV9BVFRSX01BSU5GUkFNRV9MQSA9ICgweDNGRkYwMDcwKSxcclxuXHRWSV9BVFRSX01BTkZfTkFNRSA9ICgweEJGRkYwMDcyKSxcclxuXHRWSV9BVFRSX01PREVMX05BTUUgPSAoMHhCRkZGMDA3NyksXHJcblx0VklfQVRUUl9WWElfVk1FX0lOVFJfU1RBVFVTID0gKDB4M0ZGRjAwOEIpLFxyXG5cdFZJX0FUVFJfVlhJX1RSSUdfU1RBVFVTID0gKDB4M0ZGRjAwOEQpLFxyXG5cdFZJX0FUVFJfVlhJX1ZNRV9TWVNGQUlMX1NUQVRFID0gKDB4M0ZGRjAwOTQpLFxyXG5cdFZJX0FUVFJfV0lOX0JBU0VfQUREUl8zMiA9ICgweDNGRkYwMDk4KSxcclxuXHRWSV9BVFRSX1dJTl9TSVpFXzMyID0gKDB4M0ZGRjAwOUEpLFxyXG5cdFZJX0FUVFJfQVNSTF9BVkFJTF9OVU0gPSAoMHgzRkZGMDBBQyksXHJcblx0VklfQVRUUl9NRU1fQkFTRV8zMiA9ICgweDNGRkYwMEFEKSxcclxuXHRWSV9BVFRSX0FTUkxfQ1RTX1NUQVRFID0gKDB4M0ZGRjAwQUUpLFxyXG5cdFZJX0FUVFJfQVNSTF9EQ0RfU1RBVEUgPSAoMHgzRkZGMDBBRiksXHJcblx0VklfQVRUUl9BU1JMX0RTUl9TVEFURSA9ICgweDNGRkYwMEIxKSxcclxuXHRWSV9BVFRSX0FTUkxfRFRSX1NUQVRFID0gKDB4M0ZGRjAwQjIpLFxyXG5cdFZJX0FUVFJfQVNSTF9FTkRfSU4gPSAoMHgzRkZGMDBCMyksXHJcblx0VklfQVRUUl9BU1JMX0VORF9PVVQgPSAoMHgzRkZGMDBCNCksXHJcblx0VklfQVRUUl9BU1JMX1JFUExBQ0VfQ0hBUiA9ICgweDNGRkYwMEJFKSxcclxuXHRWSV9BVFRSX0FTUkxfUklfU1RBVEUgPSAoMHgzRkZGMDBCRiksXHJcblx0VklfQVRUUl9BU1JMX1JUU19TVEFURSA9ICgweDNGRkYwMEMwKSxcclxuXHRWSV9BVFRSX0FTUkxfWE9OX0NIQVIgPSAoMHgzRkZGMDBDMSksXHJcblx0VklfQVRUUl9BU1JMX1hPRkZfQ0hBUiA9ICgweDNGRkYwMEMyKSxcclxuXHRWSV9BVFRSX1dJTl9BQ0NFU1MgPSAoMHgzRkZGMDBDMyksXHJcblx0VklfQVRUUl9STV9TRVNTSU9OID0gKDB4M0ZGRjAwQzQpLFxyXG5cdFZJX0FUVFJfVlhJX0xBID0gKDB4M0ZGRjAwRDUpLFxyXG5cdFZJX0FUVFJfTUFORl9JRCA9ICgweDNGRkYwMEQ5KSxcclxuXHRWSV9BVFRSX01FTV9TSVpFXzMyID0gKDB4M0ZGRjAwREQpLFxyXG5cdFZJX0FUVFJfTUVNX1NQQUNFID0gKDB4M0ZGRjAwREUpLFxyXG5cdFZJX0FUVFJfTU9ERUxfQ09ERSA9ICgweDNGRkYwMERGKSxcclxuXHRWSV9BVFRSX1NMT1QgPSAoMHgzRkZGMDBFOCksXHJcblx0VklfQVRUUl9JTlRGX0lOU1RfTkFNRSA9ICgweEJGRkYwMEU5KSxcclxuXHRWSV9BVFRSX0lNTUVESUFURV9TRVJWID0gKDB4M0ZGRjAxMDApLFxyXG5cdFZJX0FUVFJfSU5URl9QQVJFTlRfTlVNID0gKDB4M0ZGRjAxMDEpLFxyXG5cdFZJX0FUVFJfUlNSQ19TUEVDX1ZFUlNJT04gPSAoMHgzRkZGMDE3MCksXHJcblx0VklfQVRUUl9JTlRGX1RZUEUgPSAoMHgzRkZGMDE3MSksXHJcblx0VklfQVRUUl9HUElCX1BSSU1BUllfQUREUiA9ICgweDNGRkYwMTcyKSxcclxuXHRWSV9BVFRSX0dQSUJfU0VDT05EQVJZX0FERFIgPSAoMHgzRkZGMDE3MyksXHJcblx0VklfQVRUUl9SU1JDX01BTkZfTkFNRSA9ICgweEJGRkYwMTc0KSxcclxuXHRWSV9BVFRSX1JTUkNfTUFORl9JRCA9ICgweDNGRkYwMTc1KSxcclxuXHRWSV9BVFRSX0lOVEZfTlVNID0gKDB4M0ZGRjAxNzYpLFxyXG5cdFZJX0FUVFJfVFJJR19JRCA9ICgweDNGRkYwMTc3KSxcclxuXHRWSV9BVFRSX0dQSUJfUkVOX1NUQVRFID0gKDB4M0ZGRjAxODEpLFxyXG5cdFZJX0FUVFJfR1BJQl9VTkFERFJfRU4gPSAoMHgzRkZGMDE4NCksXHJcblx0VklfQVRUUl9ERVZfU1RBVFVTX0JZVEUgPSAoMHgzRkZGMDE4OSksXHJcblx0VklfQVRUUl9GSUxFX0FQUEVORF9FTiA9ICgweDNGRkYwMTkyKSxcclxuXHRWSV9BVFRSX1ZYSV9UUklHX1NVUFBPUlQgPSAoMHgzRkZGMDE5NCksXHJcblx0VklfQVRUUl9UQ1BJUF9BRERSID0gKDB4QkZGRjAxOTUpLFxyXG5cdFZJX0FUVFJfVENQSVBfSE9TVE5BTUUgPSAoMHhCRkZGMDE5NiksXHJcblx0VklfQVRUUl9UQ1BJUF9QT1JUID0gKDB4M0ZGRjAxOTcpLFxyXG5cdFZJX0FUVFJfVENQSVBfREVWSUNFX05BTUUgPSAoMHhCRkZGMDE5OSksXHJcblx0VklfQVRUUl9UQ1BJUF9OT0RFTEFZID0gKDB4M0ZGRjAxOUEpLFxyXG5cdFZJX0FUVFJfVENQSVBfS0VFUEFMSVZFID0gKDB4M0ZGRjAxOUIpLFxyXG5cdFZJX0FUVFJfNDg4Ml9DT01QTElBTlQgPSAoMHgzRkZGMDE5RiksXHJcblx0VklfQVRUUl9VU0JfU0VSSUFMX05VTSA9ICgweEJGRkYwMUEwKSxcclxuXHRWSV9BVFRSX1VTQl9JTlRGQ19OVU0gPSAoMHgzRkZGMDFBMSksXHJcblx0VklfQVRUUl9VU0JfUFJPVE9DT0wgPSAoMHgzRkZGMDFBNyksXHJcblx0VklfQVRUUl9VU0JfTUFYX0lOVFJfU0laRSA9ICgweDNGRkYwMUFGKSxcclxuXHRWSV9BVFRSX1BYSV9ERVZfTlVNID0gKDB4M0ZGRjAyMDEpLFxyXG5cdFZJX0FUVFJfUFhJX0ZVTkNfTlVNID0gKDB4M0ZGRjAyMDIpLFxyXG5cdFZJX0FUVFJfUFhJX0JVU19OVU0gPSAoMHgzRkZGMDIwNSksXHJcblx0VklfQVRUUl9QWElfQ0hBU1NJUyA9ICgweDNGRkYwMjA2KSxcclxuXHRWSV9BVFRSX1BYSV9TTE9UUEFUSCA9ICgweEJGRkYwMjA3KSxcclxuXHRWSV9BVFRSX1BYSV9TTE9UX0xCVVNfTEVGVCA9ICgweDNGRkYwMjA4KSxcclxuXHRWSV9BVFRSX1BYSV9TTE9UX0xCVVNfUklHSFQgPSAoMHgzRkZGMDIwOSksXHJcblx0VklfQVRUUl9QWElfVFJJR19CVVMgPSAoMHgzRkZGMDIwQSksXHJcblx0VklfQVRUUl9QWElfU1RBUl9UUklHX0JVUyA9ICgweDNGRkYwMjBCKSxcclxuXHRWSV9BVFRSX1BYSV9TVEFSX1RSSUdfTElORSA9ICgweDNGRkYwMjBDKSxcclxuXHRWSV9BVFRSX1BYSV9TUkNfVFJJR19CVVMgPSAoMHgzRkZGMDIwRCksXHJcblx0VklfQVRUUl9QWElfREVTVF9UUklHX0JVUyA9ICgweDNGRkYwMjBFKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fVFlQRV9CQVIwID0gKDB4M0ZGRjAyMTEpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9UWVBFX0JBUjEgPSAoMHgzRkZGMDIxMiksXHJcblx0VklfQVRUUl9QWElfTUVNX1RZUEVfQkFSMiA9ICgweDNGRkYwMjEzKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fVFlQRV9CQVIzID0gKDB4M0ZGRjAyMTQpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9UWVBFX0JBUjQgPSAoMHgzRkZGMDIxNSksXHJcblx0VklfQVRUUl9QWElfTUVNX1RZUEVfQkFSNSA9ICgweDNGRkYwMjE2KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVIwXzMyID0gKDB4M0ZGRjAyMjEpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjFfMzIgPSAoMHgzRkZGMDIyMiksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSMl8zMiA9ICgweDNGRkYwMjIzKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVIzXzMyID0gKDB4M0ZGRjAyMjQpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjRfMzIgPSAoMHgzRkZGMDIyNSksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSNV8zMiA9ICgweDNGRkYwMjI2KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVIwXzY0ID0gKDB4M0ZGRjAyMjgpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjFfNjQgPSAoMHgzRkZGMDIyOSksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSMl82NCA9ICgweDNGRkYwMjJBKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVIzXzY0ID0gKDB4M0ZGRjAyMkIpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjRfNjQgPSAoMHgzRkZGMDIyQyksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSNV82NCA9ICgweDNGRkYwMjJEKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVIwXzMyID0gKDB4M0ZGRjAyMzEpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjFfMzIgPSAoMHgzRkZGMDIzMiksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSMl8zMiA9ICgweDNGRkYwMjMzKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVIzXzMyID0gKDB4M0ZGRjAyMzQpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjRfMzIgPSAoMHgzRkZGMDIzNSksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSNV8zMiA9ICgweDNGRkYwMjM2KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVIwXzY0ID0gKDB4M0ZGRjAyMzgpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjFfNjQgPSAoMHgzRkZGMDIzOSksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSMl82NCA9ICgweDNGRkYwMjNBKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVIzXzY0ID0gKDB4M0ZGRjAyM0IpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjRfNjQgPSAoMHgzRkZGMDIzQyksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSNV82NCA9ICgweDNGRkYwMjNEKSxcclxuXHRWSV9BVFRSX1BYSV9JU19FWFBSRVNTID0gKDB4M0ZGRjAyNDApLFxyXG5cdFZJX0FUVFJfUFhJX1NMT1RfTFdJRFRIID0gKDB4M0ZGRjAyNDEpLFxyXG5cdFZJX0FUVFJfUFhJX01BWF9MV0lEVEggPSAoMHgzRkZGMDI0MiksXHJcblx0VklfQVRUUl9QWElfQUNUVUFMX0xXSURUSCA9ICgweDNGRkYwMjQzKSxcclxuXHRWSV9BVFRSX1BYSV9EU1RBUl9CVVMgPSAoMHgzRkZGMDI0NCksXHJcblx0VklfQVRUUl9QWElfRFNUQVJfU0VUID0gKDB4M0ZGRjAyNDUpLFxyXG5cdFZJX0FUVFJfUFhJX0FMTE9XX1dSSVRFX0NPTUJJTkUgPSAoMHgzRkZGMDI0NiksXHJcblx0VklfQVRUUl9UQ1BJUF9ISVNMSVBfT1ZFUkxBUF9FTiA9ICgweDNGRkYwMzAwKSxcclxuXHRWSV9BVFRSX1RDUElQX0hJU0xJUF9WRVJTSU9OID0gKDB4M0ZGRjAzMDEpLFxyXG5cdFZJX0FUVFJfVENQSVBfSElTTElQX01BWF9NRVNTQUdFX0tCID0gKDB4M0ZGRjAzMDIpLFxyXG5cdFZJX0FUVFJfVENQSVBfSVNfSElTTElQID0gKDB4M0ZGRjAzMDMpLFxyXG5cclxuXHRWSV9BVFRSX0pPQl9JRCA9ICgweDNGRkY0MDA2KSxcclxuXHRWSV9BVFRSX0VWRU5UX1RZUEUgPSAoMHgzRkZGNDAxMCksXHJcblx0VklfQVRUUl9TSUdQX1NUQVRVU19JRCA9ICgweDNGRkY0MDExKSxcclxuXHRWSV9BVFRSX1JFQ1ZfVFJJR19JRCA9ICgweDNGRkY0MDEyKSxcclxuXHRWSV9BVFRSX0lOVFJfU1RBVFVTX0lEID0gKDB4M0ZGRjQwMjMpLFxyXG5cdFZJX0FUVFJfU1RBVFVTID0gKDB4M0ZGRjQwMjUpLFxyXG5cdFZJX0FUVFJfUkVUX0NPVU5UXzMyID0gKDB4M0ZGRjQwMjYpLFxyXG5cdFZJX0FUVFJfQlVGRkVSID0gKDB4M0ZGRjQwMjcpLFxyXG5cdFZJX0FUVFJfUkVDVl9JTlRSX0xFVkVMID0gKDB4M0ZGRjQwNDEpLFxyXG5cdFZJX0FUVFJfT1BFUl9OQU1FID0gKDB4QkZGRjQwNDIpLFxyXG5cdFZJX0FUVFJfR1BJQl9SRUNWX0NJQ19TVEFURSA9ICgweDNGRkY0MTkzKSxcclxuXHRWSV9BVFRSX1JFQ1ZfVENQSVBfQUREUiA9ICgweEJGRkY0MTk4KSxcclxuXHRWSV9BVFRSX1VTQl9SRUNWX0lOVFJfU0laRSA9ICgweDNGRkY0MUIwKSxcclxuXHRWSV9BVFRSX1VTQl9SRUNWX0lOVFJfREFUQSA9ICgweEJGRkY0MUIxKSxcclxuXHRWSV9BVFRSX1BYSV9SRUNWX0lOVFJfU0VRID0gKDB4M0ZGRjQyNDApLFxyXG5cdFZJX0FUVFJfUFhJX1JFQ1ZfSU5UUl9EQVRBID0gKDB4M0ZGRjQyNDEpLFxyXG5cclxuLyotIEF0dHJpYnV0ZXMgKHBsYXRmb3JtIGRlcGVuZGVudCBzaXplKSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRWSV9BVFRSX1VTRVJfREFUQV82NCA9ICgweDNGRkYwMDBBKSxcclxuXHRWSV9BVFRSX1JFVF9DT1VOVF82NCA9ICgweDNGRkY0MDI4KSxcclxuXHRWSV9BVFRSX1VTRVJfREFUQSA9ICgweDNGRkYwMDBBKSxcclxuXHRWSV9BVFRSX1JFVF9DT1VOVCA9ICgweDNGRkY0MDI4KSxcclxuXHJcblxyXG4vKi0gRXZlbnQgVHlwZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdFZJX0VWRU5UX0lPX0NPTVBMRVRJT04gPSAoMHgzRkZGMjAwOSksXHJcblx0VklfRVZFTlRfVFJJRyA9ICgweEJGRkYyMDBBKSxcclxuXHRWSV9FVkVOVF9TRVJWSUNFX1JFUSA9ICgweDNGRkYyMDBCKSxcclxuXHRWSV9FVkVOVF9DTEVBUiA9ICgweDNGRkYyMDBEKSxcclxuXHRWSV9FVkVOVF9FWENFUFRJT04gPSAoMHhCRkZGMjAwRSksXHJcblx0VklfRVZFTlRfR1BJQl9DSUMgPSAoMHgzRkZGMjAxMiksXHJcblx0VklfRVZFTlRfR1BJQl9UQUxLID0gKDB4M0ZGRjIwMTMpLFxyXG5cdFZJX0VWRU5UX0dQSUJfTElTVEVOID0gKDB4M0ZGRjIwMTQpLFxyXG5cdFZJX0VWRU5UX1ZYSV9WTUVfU1lTRkFJTCA9ICgweDNGRkYyMDFEKSxcclxuXHRWSV9FVkVOVF9WWElfVk1FX1NZU1JFU0VUID0gKDB4M0ZGRjIwMUUpLFxyXG5cdFZJX0VWRU5UX1ZYSV9TSUdQID0gKDB4M0ZGRjIwMjApLFxyXG5cdFZJX0VWRU5UX1ZYSV9WTUVfSU5UUiA9ICgweEJGRkYyMDIxKSxcclxuXHRWSV9FVkVOVF9QWElfSU5UUiA9ICgweDNGRkYyMDIyKSxcclxuXHRWSV9FVkVOVF9UQ1BJUF9DT05ORUNUID0gKDB4M0ZGRjIwMzYpLFxyXG5cdFZJX0VWRU5UX1VTQl9JTlRSID0gKDB4M0ZGRjIwMzcpLFxyXG5cclxuXHRWSV9BTExfRU5BQkxFRF9FVkVOVFMgPSAoMHgzRkZGN0ZGRiksXHJcblxyXG4vKi0gQ29tcGxldGlvbiBhbmQgRXJyb3IgQ29kZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdFZJX1NVQ0NFU1NfRVZFTlRfRU4gPSAoMHgzRkZGMDAwMiksXHJcblx0VklfU1VDQ0VTU19FVkVOVF9ESVMgPSAoMHgzRkZGMDAwMyksXHJcblx0VklfU1VDQ0VTU19RVUVVRV9FTVBUWSA9ICgweDNGRkYwMDA0KSxcclxuXHRWSV9TVUNDRVNTX1RFUk1fQ0hBUiA9ICgweDNGRkYwMDA1KSxcclxuXHRWSV9TVUNDRVNTX01BWF9DTlQgPSAoMHgzRkZGMDAwNiksXHJcblx0VklfU1VDQ0VTU19ERVZfTlBSRVNFTlQgPSAoMHgzRkZGMDA3RCksXHJcblx0VklfU1VDQ0VTU19UUklHX01BUFBFRCA9ICgweDNGRkYwMDdFKSxcclxuXHRWSV9TVUNDRVNTX1FVRVVFX05FTVBUWSA9ICgweDNGRkYwMDgwKSxcclxuXHRWSV9TVUNDRVNTX05DSEFJTiA9ICgweDNGRkYwMDk4KSxcclxuXHRWSV9TVUNDRVNTX05FU1RFRF9TSEFSRUQgPSAoMHgzRkZGMDA5OSksXHJcblx0VklfU1VDQ0VTU19ORVNURURfRVhDTFVTSVZFID0gKDB4M0ZGRjAwOUEpLFxyXG5cdFZJX1NVQ0NFU1NfU1lOQyA9ICgweDNGRkYwMDlCKSxcclxuXHJcblx0VklfV0FSTl9RVUVVRV9PVkVSRkxPVyA9ICgweDNGRkYwMDBDKSxcclxuXHRWSV9XQVJOX0NPTkZJR19OTE9BREVEID0gKDB4M0ZGRjAwNzcpLFxyXG5cdFZJX1dBUk5fTlVMTF9PQkpFQ1QgPSAoMHgzRkZGMDA4MiksXHJcblx0VklfV0FSTl9OU1VQX0FUVFJfU1RBVEUgPSAoMHgzRkZGMDA4NCksXHJcblx0VklfV0FSTl9VTktOT1dOX1NUQVRVUyA9ICgweDNGRkYwMDg1KSxcclxuXHRWSV9XQVJOX05TVVBfQlVGID0gKDB4M0ZGRjAwODgpLFxyXG5cdFZJX1dBUk5fRVhUX0ZVTkNfTklNUEwgPSAoMHgzRkZGMDBBOSksXHJcblxyXG5cdFZJX0VSUk9SX1NZU1RFTV9FUlJPUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMDApLFxyXG5cdFZJX0VSUk9SX0lOVl9PQkpFQ1QgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDBFKSxcclxuXHRWSV9FUlJPUl9SU1JDX0xPQ0tFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMEYpLFxyXG5cdFZJX0VSUk9SX0lOVl9FWFBSID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxMCksXHJcblx0VklfRVJST1JfUlNSQ19ORk9VTkQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDExKSxcclxuXHRWSV9FUlJPUl9JTlZfUlNSQ19OQU1FID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxMiksXHJcblx0VklfRVJST1JfSU5WX0FDQ19NT0RFID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxMyksXHJcblx0VklfRVJST1JfVE1PID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxNSksXHJcblx0VklfRVJST1JfQ0xPU0lOR19GQUlMRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDE2KSxcclxuXHRWSV9FUlJPUl9JTlZfREVHUkVFID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxQiksXHJcblx0VklfRVJST1JfSU5WX0pPQl9JRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMUMpLFxyXG5cdFZJX0VSUk9SX05TVVBfQVRUUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMUQpLFxyXG5cdFZJX0VSUk9SX05TVVBfQVRUUl9TVEFURSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMUUpLFxyXG5cdFZJX0VSUk9SX0FUVFJfUkVBRE9OTFkgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDFGKSxcclxuXHRWSV9FUlJPUl9JTlZfTE9DS19UWVBFID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyMCksXHJcblx0VklfRVJST1JfSU5WX0FDQ0VTU19LRVkgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDIxKSxcclxuXHRWSV9FUlJPUl9JTlZfRVZFTlQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDI2KSxcclxuXHRWSV9FUlJPUl9JTlZfTUVDSCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMjcpLFxyXG5cdFZJX0VSUk9SX0hORExSX05JTlNUQUxMRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDI4KSxcclxuXHRWSV9FUlJPUl9JTlZfSE5ETFJfUkVGID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyOSksXHJcblx0VklfRVJST1JfSU5WX0NPTlRFWFQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDJBKSxcclxuXHRWSV9FUlJPUl9RVUVVRV9PVkVSRkxPVyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMkQpLFxyXG5cdFZJX0VSUk9SX05FTkFCTEVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyRiksXHJcblx0VklfRVJST1JfQUJPUlQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDMwKSxcclxuXHRWSV9FUlJPUl9SQVdfV1JfUFJPVF9WSU9MID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzNCksXHJcblx0VklfRVJST1JfUkFXX1JEX1BST1RfVklPTCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMzUpLFxyXG5cdFZJX0VSUk9SX09VVFBfUFJPVF9WSU9MID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzNiksXHJcblx0VklfRVJST1JfSU5QX1BST1RfVklPTCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMzcpLFxyXG5cdFZJX0VSUk9SX0JFUlIgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDM4KSxcclxuXHRWSV9FUlJPUl9JTl9QUk9HUkVTUyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMzkpLFxyXG5cdFZJX0VSUk9SX0lOVl9TRVRVUCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwM0EpLFxyXG5cdFZJX0VSUk9SX1FVRVVFX0VSUk9SID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzQiksXHJcblx0VklfRVJST1JfQUxMT0MgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDNDKSxcclxuXHRWSV9FUlJPUl9JTlZfTUFTSyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwM0QpLFxyXG5cdFZJX0VSUk9SX0lPID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzRSksXHJcblx0VklfRVJST1JfSU5WX0ZNVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwM0YpLFxyXG5cdFZJX0VSUk9SX05TVVBfRk1UID0gKDB4ODAwMDAwMDArMHgzRkZGMDA0MSksXHJcblx0VklfRVJST1JfTElORV9JTl9VU0UgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDQyKSxcclxuXHRWSV9FUlJPUl9MSU5FX05SRVNFUlZFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNDMpLFxyXG5cdFZJX0VSUk9SX05TVVBfTU9ERSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNDYpLFxyXG5cdFZJX0VSUk9SX1NSUV9OT0NDVVJSRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDRBKSxcclxuXHRWSV9FUlJPUl9JTlZfU1BBQ0UgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDRFKSxcclxuXHRWSV9FUlJPUl9JTlZfT0ZGU0VUID0gKDB4ODAwMDAwMDArMHgzRkZGMDA1MSksXHJcblx0VklfRVJST1JfSU5WX1dJRFRIID0gKDB4ODAwMDAwMDArMHgzRkZGMDA1MiksXHJcblx0VklfRVJST1JfTlNVUF9PRkZTRVQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDU0KSxcclxuXHRWSV9FUlJPUl9OU1VQX1ZBUl9XSURUSCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNTUpLFxyXG5cdFZJX0VSUk9SX1dJTkRPV19OTUFQUEVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDA1NyksXHJcblx0VklfRVJST1JfUkVTUF9QRU5ESU5HID0gKDB4ODAwMDAwMDArMHgzRkZGMDA1OSksXHJcblx0VklfRVJST1JfTkxJU1RFTkVSUyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNUYpLFxyXG5cdFZJX0VSUk9SX05DSUMgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDYwKSxcclxuXHRWSV9FUlJPUl9OU1lTX0NOVExSID0gKDB4ODAwMDAwMDArMHgzRkZGMDA2MSksXHJcblx0VklfRVJST1JfTlNVUF9PUEVSID0gKDB4ODAwMDAwMDArMHgzRkZGMDA2NyksXHJcblx0VklfRVJST1JfSU5UUl9QRU5ESU5HID0gKDB4ODAwMDAwMDArMHgzRkZGMDA2OCksXHJcblx0VklfRVJST1JfQVNSTF9QQVJJVFkgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDZBKSxcclxuXHRWSV9FUlJPUl9BU1JMX0ZSQU1JTkcgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDZCKSxcclxuXHRWSV9FUlJPUl9BU1JMX09WRVJSVU4gPSAoMHg4MDAwMDAwMCsweDNGRkYwMDZDKSxcclxuXHRWSV9FUlJPUl9UUklHX05NQVBQRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDZFKSxcclxuXHRWSV9FUlJPUl9OU1VQX0FMSUdOX09GRlNFVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNzApLFxyXG5cdFZJX0VSUk9SX1VTRVJfQlVGID0gKDB4ODAwMDAwMDArMHgzRkZGMDA3MSksXHJcblx0VklfRVJST1JfUlNSQ19CVVNZID0gKDB4ODAwMDAwMDArMHgzRkZGMDA3MiksXHJcblx0VklfRVJST1JfTlNVUF9XSURUSCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNzYpLFxyXG5cdFZJX0VSUk9SX0lOVl9QQVJBTUVURVIgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDc4KSxcclxuXHRWSV9FUlJPUl9JTlZfUFJPVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNzkpLFxyXG5cdFZJX0VSUk9SX0lOVl9TSVpFID0gKDB4ODAwMDAwMDArMHgzRkZGMDA3QiksXHJcblx0VklfRVJST1JfV0lORE9XX01BUFBFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwODApLFxyXG5cdFZJX0VSUk9SX05JTVBMX09QRVIgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDgxKSxcclxuXHRWSV9FUlJPUl9JTlZfTEVOR1RIID0gKDB4ODAwMDAwMDArMHgzRkZGMDA4MyksXHJcblx0VklfRVJST1JfSU5WX01PREUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDkxKSxcclxuXHRWSV9FUlJPUl9TRVNOX05MT0NLRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDlDKSxcclxuXHRWSV9FUlJPUl9NRU1fTlNIQVJFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwOUQpLFxyXG5cdFZJX0VSUk9SX0xJQlJBUllfTkZPVU5EID0gKDB4ODAwMDAwMDArMHgzRkZGMDA5RSksXHJcblx0VklfRVJST1JfTlNVUF9JTlRSID0gKDB4ODAwMDAwMDArMHgzRkZGMDA5RiksXHJcblx0VklfRVJST1JfSU5WX0xJTkUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMEEwKSxcclxuXHRWSV9FUlJPUl9GSUxFX0FDQ0VTUyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTEpLFxyXG5cdFZJX0VSUk9SX0ZJTEVfSU8gPSAoMHg4MDAwMDAwMCsweDNGRkYwMEEyKSxcclxuXHRWSV9FUlJPUl9OU1VQX0xJTkUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMEEzKSxcclxuXHRWSV9FUlJPUl9OU1VQX01FQ0ggPSAoMHg4MDAwMDAwMCsweDNGRkYwMEE0KSxcclxuXHRWSV9FUlJPUl9JTlRGX05VTV9OQ09ORklHID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBNSksXHJcblx0VklfRVJST1JfQ09OTl9MT1NUID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBNiksXHJcblx0VklfRVJST1JfTUFDSElORV9OQVZBSUwgPSAoMHg4MDAwMDAwMCsweDNGRkYwMEE3KSxcclxuXHRWSV9FUlJPUl9OUEVSTUlTU0lPTiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTgpLFxyXG5cclxuLyotIE90aGVyIFZJU0EgRGVmaW5pdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRWSV9WRVJTSU9OX01BSk9SID0gICAgKCgweDAwNTAwODAwICYgMHhGRkYwMDAwMCkgPj4gMjApLFxyXG5cdFZJX1ZFUlNJT05fTUlOT1IgPSAgICAoKDB4MDA1MDA4MDAgJiAweDAwMEZGRjAwKSA+PiAgOCksXHJcblx0VklfVkVSU0lPTl9TVUJNSU5PUiA9ICgoMHgwMDUwMDgwMCAmIDB4MDAwMDAwRkYpICAgICAgKSxcclxuXHJcblx0VklfRklORF9CVUZMRU4gPSAoMjU2KSxcclxuXHJcblx0VklfSU5URl9HUElCID0gKDEpLFxyXG5cdFZJX0lOVEZfVlhJID0gKDIpLFxyXG5cdFZJX0lOVEZfR1BJQl9WWEkgPSAoMyksXHJcblx0VklfSU5URl9BU1JMID0gKDQpLFxyXG5cdFZJX0lOVEZfUFhJID0gKDUpLFxyXG5cdFZJX0lOVEZfVENQSVAgPSAoNiksXHJcblx0VklfSU5URl9VU0IgPSAoNyksXHJcblxyXG5cdFZJX1BST1RfTk9STUFMID0gKDEpLFxyXG5cdFZJX1BST1RfRkRDID0gKDIpLFxyXG5cdFZJX1BST1RfSFM0ODggPSAoMyksXHJcblx0VklfUFJPVF80ODgyX1NUUlMgPSAoNCksXHJcblx0VklfUFJPVF9VU0JUTUNfVkVORE9SID0gKDUpLFxyXG5cclxuXHRWSV9GRENfTk9STUFMID0gKDEpLFxyXG5cdFZJX0ZEQ19TVFJFQU0gPSAoMiksXHJcblxyXG5cdFZJX0xPQ0FMX1NQQUNFID0gKDApLFxyXG5cdFZJX0ExNl9TUEFDRSA9ICgxKSxcclxuXHRWSV9BMjRfU1BBQ0UgPSAoMiksXHJcblx0VklfQTMyX1NQQUNFID0gKDMpLFxyXG5cdFZJX0E2NF9TUEFDRSA9ICg0KSxcclxuXHRWSV9QWElfQUxMT0NfU1BBQ0UgPSAoOSksXHJcblx0VklfUFhJX0NGR19TUEFDRSA9ICgxMCksXHJcblx0VklfUFhJX0JBUjBfU1BBQ0UgPSAoMTEpLFxyXG5cdFZJX1BYSV9CQVIxX1NQQUNFID0gKDEyKSxcclxuXHRWSV9QWElfQkFSMl9TUEFDRSA9ICgxMyksXHJcblx0VklfUFhJX0JBUjNfU1BBQ0UgPSAoMTQpLFxyXG5cdFZJX1BYSV9CQVI0X1NQQUNFID0gKDE1KSxcclxuXHRWSV9QWElfQkFSNV9TUEFDRSA9ICgxNiksXHJcblx0VklfT1BBUVVFX1NQQUNFID0gKDB4RkZGRiksXHJcblxyXG5cdFZJX1VOS05PV05fTEEgPSAoLTEpLFxyXG5cdFZJX1VOS05PV05fU0xPVCA9ICgtMSksXHJcblx0VklfVU5LTk9XTl9MRVZFTCA9ICgtMSksXHJcblx0VklfVU5LTk9XTl9DSEFTU0lTID0gKC0xKSxcclxuXHJcblx0VklfUVVFVUUgPSAoMSksXHJcblx0VklfSE5ETFIgPSAoMiksXHJcblx0VklfU1VTUEVORF9ITkRMUiA9ICg0KSxcclxuXHRWSV9BTExfTUVDSCA9ICgweEZGRkYpLFxyXG5cclxuXHRWSV9BTllfSE5ETFIgPSAoMCksXHJcblxyXG5cdFZJX1RSSUdfQUxMID0gKC0yKSxcclxuXHRWSV9UUklHX1NXID0gKC0xKSxcclxuXHRWSV9UUklHX1RUTDAgPSAoMCksXHJcblx0VklfVFJJR19UVEwxID0gKDEpLFxyXG5cdFZJX1RSSUdfVFRMMiA9ICgyKSxcclxuXHRWSV9UUklHX1RUTDMgPSAoMyksXHJcblx0VklfVFJJR19UVEw0ID0gKDQpLFxyXG5cdFZJX1RSSUdfVFRMNSA9ICg1KSxcclxuXHRWSV9UUklHX1RUTDYgPSAoNiksXHJcblx0VklfVFJJR19UVEw3ID0gKDcpLFxyXG5cdFZJX1RSSUdfRUNMMCA9ICg4KSxcclxuXHRWSV9UUklHX0VDTDEgPSAoOSksXHJcblx0VklfVFJJR19FQ0wyID0gKDEwKSxcclxuXHRWSV9UUklHX0VDTDMgPSAoMTEpLFxyXG5cdFZJX1RSSUdfRUNMNCA9ICgxMiksXHJcblx0VklfVFJJR19FQ0w1ID0gKDEzKSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDEgPSAoMTQpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UMiA9ICgxNSksXHJcblx0VklfVFJJR19TVEFSX1NMT1QzID0gKDE2KSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDQgPSAoMTcpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UNSA9ICgxOCksXHJcblx0VklfVFJJR19TVEFSX1NMT1Q2ID0gKDE5KSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDcgPSAoMjApLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UOCA9ICgyMSksXHJcblx0VklfVFJJR19TVEFSX1NMT1Q5ID0gKDIyKSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDEwID0gKDIzKSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDExID0gKDI0KSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDEyID0gKDI1KSxcclxuXHRWSV9UUklHX1NUQVJfSU5TVFIgPSAoMjYpLFxyXG5cdFZJX1RSSUdfUEFORUxfSU4gPSAoMjcpLFxyXG5cdFZJX1RSSUdfUEFORUxfT1VUID0gKDI4KSxcclxuXHRWSV9UUklHX1NUQVJfVlhJMCA9ICgyOSksXHJcblx0VklfVFJJR19TVEFSX1ZYSTEgPSAoMzApLFxyXG5cdFZJX1RSSUdfU1RBUl9WWEkyID0gKDMxKSxcclxuXHRWSV9UUklHX1RUTDggPSAoMzIpLFxyXG5cdFZJX1RSSUdfVFRMOSA9ICgzMyksXHJcblx0VklfVFJJR19UVEwxMCA9ICgzNCksXHJcblx0VklfVFJJR19UVEwxMSA9ICgzNSksXHJcblxyXG5cdFZJX1RSSUdfUFJPVF9ERUZBVUxUID0gKDApLFxyXG5cdFZJX1RSSUdfUFJPVF9PTiA9ICgxKSxcclxuXHRWSV9UUklHX1BST1RfT0ZGID0gKDIpLFxyXG5cdFZJX1RSSUdfUFJPVF9TWU5DID0gKDUpLFxyXG5cdFZJX1RSSUdfUFJPVF9SRVNFUlZFID0gKDYpLFxyXG5cdFZJX1RSSUdfUFJPVF9VTlJFU0VSVkUgPSAoNyksXHJcblxyXG5cdFZJX1JFQURfQlVGID0gKDEpLFxyXG5cdFZJX1dSSVRFX0JVRiA9ICgyKSxcclxuXHRWSV9SRUFEX0JVRl9ESVNDQVJEID0gKDQpLFxyXG5cdFZJX1dSSVRFX0JVRl9ESVNDQVJEID0gKDgpLFxyXG5cdFZJX0lPX0lOX0JVRiA9ICgxNiksXHJcblx0VklfSU9fT1VUX0JVRiA9ICgzMiksXHJcblx0VklfSU9fSU5fQlVGX0RJU0NBUkQgPSAoNjQpLFxyXG5cdFZJX0lPX09VVF9CVUZfRElTQ0FSRCA9ICgxMjgpLFxyXG5cclxuXHRWSV9GTFVTSF9PTl9BQ0NFU1MgPSAoMSksXHJcblx0VklfRkxVU0hfV0hFTl9GVUxMID0gKDIpLFxyXG5cdFZJX0ZMVVNIX0RJU0FCTEUgPSAoMyksXHJcblxyXG5cdFZJX05NQVBQRUQgPSAoMSksXHJcblx0VklfVVNFX09QRVJTID0gKDIpLFxyXG5cdFZJX0RFUkVGX0FERFIgPSAoMyksXHJcblx0VklfREVSRUZfQUREUl9CWVRFX1NXQVAgPSAoNCksXHJcblxyXG5cdFZJX1RNT19JTU1FRElBVEUgPSAoMCksXHJcblx0VklfVE1PX0lORklOSVRFID0gKDB4RkZGRkZGRkYpLFxyXG5cclxuXHRWSV9OT19MT0NLID0gKDApLFxyXG5cdFZJX0VYQ0xVU0lWRV9MT0NLID0gKDEpLFxyXG5cdFZJX1NIQVJFRF9MT0NLID0gKDIpLFxyXG5cdFZJX0xPQURfQ09ORklHID0gKDQpLFxyXG5cclxuXHRWSV9OT19TRUNfQUREUiA9ICgweEZGRkYpLFxyXG5cclxuXHRWSV9BU1JMX1BBUl9OT05FID0gKDApLFxyXG5cdFZJX0FTUkxfUEFSX09ERCA9ICgxKSxcclxuXHRWSV9BU1JMX1BBUl9FVkVOID0gKDIpLFxyXG5cdFZJX0FTUkxfUEFSX01BUksgPSAoMyksXHJcblx0VklfQVNSTF9QQVJfU1BBQ0UgPSAoNCksXHJcblxyXG5cdFZJX0FTUkxfU1RPUF9PTkUgPSAoMTApLFxyXG5cdFZJX0FTUkxfU1RPUF9PTkU1ID0gKDE1KSxcclxuXHRWSV9BU1JMX1NUT1BfVFdPID0gKDIwKSxcclxuXHJcblx0VklfQVNSTF9GTE9XX05PTkUgPSAoMCksXHJcblx0VklfQVNSTF9GTE9XX1hPTl9YT0ZGID0gKDEpLFxyXG5cdFZJX0FTUkxfRkxPV19SVFNfQ1RTID0gKDIpLFxyXG5cdFZJX0FTUkxfRkxPV19EVFJfRFNSID0gKDQpLFxyXG5cclxuXHRWSV9BU1JMX0VORF9OT05FID0gKDApLFxyXG5cdFZJX0FTUkxfRU5EX0xBU1RfQklUID0gKDEpLFxyXG5cdFZJX0FTUkxfRU5EX1RFUk1DSEFSID0gKDIpLFxyXG5cdFZJX0FTUkxfRU5EX0JSRUFLID0gKDMpLFxyXG5cclxuXHRWSV9TVEFURV9BU1NFUlRFRCA9ICgxKSxcclxuXHRWSV9TVEFURV9VTkFTU0VSVEVEID0gKDApLFxyXG5cdFZJX1NUQVRFX1VOS05PV04gPSAoLTEpLFxyXG5cclxuXHRWSV9CSUdfRU5ESUFOID0gKDApLFxyXG5cdFZJX0xJVFRMRV9FTkRJQU4gPSAoMSksXHJcblxyXG5cdFZJX0RBVEFfUFJJViA9ICgwKSxcclxuXHRWSV9EQVRBX05QUklWID0gKDEpLFxyXG5cdFZJX1BST0dfUFJJViA9ICgyKSxcclxuXHRWSV9QUk9HX05QUklWID0gKDMpLFxyXG5cdFZJX0JMQ0tfUFJJViA9ICg0KSxcclxuXHRWSV9CTENLX05QUklWID0gKDUpLFxyXG5cdFZJX0Q2NF9QUklWID0gKDYpLFxyXG5cdFZJX0Q2NF9OUFJJViA9ICg3KSxcclxuXHRWSV9ENjRfMkVWTUUgPSAoOCksXHJcblx0VklfRDY0X1NTVDE2MCA9ICg5KSxcclxuXHRWSV9ENjRfU1NUMjY3ID0gKDEwKSxcclxuXHRWSV9ENjRfU1NUMzIwID0gKDExKSxcclxuXHJcblx0VklfV0lEVEhfOCA9ICgxKSxcclxuXHRWSV9XSURUSF8xNiA9ICgyKSxcclxuXHRWSV9XSURUSF8zMiA9ICg0KSxcclxuXHRWSV9XSURUSF82NCA9ICg4KSxcclxuXHJcblx0VklfR1BJQl9SRU5fREVBU1NFUlQgPSAoMCksXHJcblx0VklfR1BJQl9SRU5fQVNTRVJUID0gKDEpLFxyXG5cdFZJX0dQSUJfUkVOX0RFQVNTRVJUX0dUTCA9ICgyKSxcclxuXHRWSV9HUElCX1JFTl9BU1NFUlRfQUREUkVTUyA9ICgzKSxcclxuXHRWSV9HUElCX1JFTl9BU1NFUlRfTExPID0gKDQpLFxyXG5cdFZJX0dQSUJfUkVOX0FTU0VSVF9BRERSRVNTX0xMTyA9ICg1KSxcclxuXHRWSV9HUElCX1JFTl9BRERSRVNTX0dUTCA9ICg2KSxcclxuXHJcblx0VklfR1BJQl9BVE5fREVBU1NFUlQgPSAoMCksXHJcblx0VklfR1BJQl9BVE5fQVNTRVJUID0gKDEpLFxyXG5cdFZJX0dQSUJfQVROX0RFQVNTRVJUX0hBTkRTSEFLRSA9ICgyKSxcclxuXHRWSV9HUElCX0FUTl9BU1NFUlRfSU1NRURJQVRFID0gKDMpLFxyXG5cclxuXHRWSV9HUElCX0hTNDg4X0RJU0FCTEVEID0gKDApLFxyXG5cdFZJX0dQSUJfSFM0ODhfTklNUEwgPSAoLTEpLFxyXG5cclxuXHRWSV9HUElCX1VOQUREUkVTU0VEID0gKDApLFxyXG5cdFZJX0dQSUJfVEFMS0VSID0gKDEpLFxyXG5cdFZJX0dQSUJfTElTVEVORVIgPSAoMiksXHJcblxyXG5cdFZJX1ZYSV9DTUQxNiA9ICgweDAyMDApLFxyXG5cdFZJX1ZYSV9DTUQxNl9SRVNQMTYgPSAoMHgwMjAyKSxcclxuXHRWSV9WWElfUkVTUDE2ID0gKDB4MDAwMiksXHJcblx0VklfVlhJX0NNRDMyID0gKDB4MDQwMCksXHJcblx0VklfVlhJX0NNRDMyX1JFU1AxNiA9ICgweDA0MDIpLFxyXG5cdFZJX1ZYSV9DTUQzMl9SRVNQMzIgPSAoMHgwNDA0KSxcclxuXHRWSV9WWElfUkVTUDMyID0gKDB4MDAwNCksXHJcblxyXG5cdFZJX0FTU0VSVF9TSUdOQUwgPSAoLTEpLFxyXG5cdFZJX0FTU0VSVF9VU0VfQVNTSUdORUQgPSAoMCksXHJcblx0VklfQVNTRVJUX0lSUTEgPSAoMSksXHJcblx0VklfQVNTRVJUX0lSUTIgPSAoMiksXHJcblx0VklfQVNTRVJUX0lSUTMgPSAoMyksXHJcblx0VklfQVNTRVJUX0lSUTQgPSAoNCksXHJcblx0VklfQVNTRVJUX0lSUTUgPSAoNSksXHJcblx0VklfQVNTRVJUX0lSUTYgPSAoNiksXHJcblx0VklfQVNTRVJUX0lSUTcgPSAoNyksXHJcblxyXG5cdFZJX1VUSUxfQVNTRVJUX1NZU1JFU0VUID0gKDEpLFxyXG5cdFZJX1VUSUxfQVNTRVJUX1NZU0ZBSUwgPSAoMiksXHJcblx0VklfVVRJTF9ERUFTU0VSVF9TWVNGQUlMID0gKDMpLFxyXG5cclxuXHRWSV9WWElfQ0xBU1NfTUVNT1JZID0gKDApLFxyXG5cdFZJX1ZYSV9DTEFTU19FWFRFTkRFRCA9ICgxKSxcclxuXHRWSV9WWElfQ0xBU1NfTUVTU0FHRSA9ICgyKSxcclxuXHRWSV9WWElfQ0xBU1NfUkVHSVNURVIgPSAoMyksXHJcblx0VklfVlhJX0NMQVNTX09USEVSID0gKDQpLFxyXG5cclxuXHRWSV9QWElfQUREUl9OT05FID0gKDApLFxyXG5cdFZJX1BYSV9BRERSX01FTSA9ICgxKSxcclxuXHRWSV9QWElfQUREUl9JTyA9ICgyKSxcclxuXHRWSV9QWElfQUREUl9DRkcgPSAoMyksXHJcblxyXG5cdFZJX1RSSUdfVU5LTk9XTiA9ICgtMSksXHJcblxyXG5cdFZJX1BYSV9MQlVTX1VOS05PV04gPSAoLTEpLFxyXG5cdFZJX1BYSV9MQlVTX05PTkUgPSAoMCksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU18wID0gKDEwMDApLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfMSA9ICgxMDAxKSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzIgPSAoMTAwMiksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU18zID0gKDEwMDMpLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfNCA9ICgxMDA0KSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzUgPSAoMTAwNSksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU182ID0gKDEwMDYpLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfNyA9ICgxMDA3KSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzggPSAoMTAwOCksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU185ID0gKDEwMDkpLFxyXG5cdFZJX1BYSV9TVEFSX1RSSUdfQ09OVFJPTExFUiA9ICgxNDEzKSxcclxuXHJcbi8qLSBOYXRpb25hbCBJbnN0cnVtZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0VklfRVJST1JfSFdfTkdFTlVJTkUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMEFBKSxcclxuXHJcblx0VklfSU5URl9SSU8gPSAoOCksXHJcblx0VklfSU5URl9GSVJFV0lSRSA9ICg5KSxcclxuXHJcblx0VklfQVRUUl9TWU5DX01YSV9BTExPV19FTiA9ICgweDNGRkYwMTYxKSxcclxuXHJcbi8qIFRoaXMgaXMgZm9yIFZYSSBTRVJWQU5UIHJlc291cmNlcyAqL1xyXG5cclxuXHRWSV9FVkVOVF9WWElfREVWX0NNRCA9ICgweEJGRkYyMDBGKSxcclxuXHRWSV9BVFRSX1ZYSV9ERVZfQ01EX1RZUEUgPSAoMHgzRkZGNDAzNyksXHJcblx0VklfQVRUUl9WWElfREVWX0NNRF9WQUxVRSA9ICgweDNGRkY0MDM4KSxcclxuXHJcblx0VklfVlhJX0RFVl9DTURfVFlQRV8xNiA9ICgxNiksXHJcblx0VklfVlhJX0RFVl9DTURfVFlQRV8zMiA9ICgzMiksXHJcblxyXG4vKiBtb2RlIHZhbHVlcyBpbmNsdWRlIFZJX1ZYSV9SRVNQMTYsIFZJX1ZYSV9SRVNQMzIsIGFuZCB0aGUgbmV4dCAyIHZhbHVlcyAqL1xyXG5cdFZJX1ZYSV9SRVNQX05PTkUgPSAoMCksXHJcblx0VklfVlhJX1JFU1BfUFJPVF9FUlJPUiA9ICgtMSksXHJcblxyXG4vKiBUaGlzIGlzIGZvciBWWEkgVFRMIFRyaWdnZXIgcm91dGluZyAqL1xyXG5cclxuXHRWSV9BVFRSX1ZYSV9UUklHX0xJTkVTX0VOID0gKDB4M0ZGRjQwNDMpLFxyXG5cdFZJX0FUVFJfVlhJX1RSSUdfRElSID0gKDB4M0ZGRjQwNDQpLFxyXG5cclxuLyogVGhpcyBhbGxvd3MgZXh0ZW5kZWQgU2VyaWFsIHN1cHBvcnQgb24gV2luMzIgYW5kIG9uIE5JIEVORVQgU2VyaWFsIHByb2R1Y3RzICovXHJcblxyXG5cdFZJX0FUVFJfQVNSTF9ESVNDQVJEX05VTEwgPSAoMHgzRkZGMDBCMCksXHJcblx0VklfQVRUUl9BU1JMX0NPTk5FQ1RFRCA9ICgweDNGRkYwMUJCKSxcclxuXHRWSV9BVFRSX0FTUkxfQlJFQUtfU1RBVEUgPSAoMHgzRkZGMDFCQyksXHJcblx0VklfQVRUUl9BU1JMX0JSRUFLX0xFTiA9ICgweDNGRkYwMUJEKSxcclxuXHRWSV9BVFRSX0FTUkxfQUxMT1dfVFJBTlNNSVQgPSAoMHgzRkZGMDFCRSksXHJcblx0VklfQVRUUl9BU1JMX1dJUkVfTU9ERSA9ICgweDNGRkYwMUJGKSxcclxuXHJcblx0VklfQVNSTF9XSVJFXzQ4NV80ID0gKDApLFxyXG5cdFZJX0FTUkxfV0lSRV80ODVfMl9EVFJfRUNITyA9ICgxKSxcclxuXHRWSV9BU1JMX1dJUkVfNDg1XzJfRFRSX0NUUkwgPSAoMiksXHJcblx0VklfQVNSTF9XSVJFXzQ4NV8yX0FVVE8gPSAoMyksXHJcblx0VklfQVNSTF9XSVJFXzIzMl9EVEUgPSAoMTI4KSxcclxuXHRWSV9BU1JMX1dJUkVfMjMyX0RDRSA9ICgxMjkpLFxyXG5cdFZJX0FTUkxfV0lSRV8yMzJfQVVUTyA9ICgxMzApLFxyXG5cclxuXHRWSV9FVkVOVF9BU1JMX0JSRUFLID0gKDB4M0ZGRjIwMjMpLFxyXG5cdFZJX0VWRU5UX0FTUkxfQ1RTID0gKDB4M0ZGRjIwMjkpLFxyXG5cdFZJX0VWRU5UX0FTUkxfRFNSID0gKDB4M0ZGRjIwMkEpLFxyXG5cdFZJX0VWRU5UX0FTUkxfRENEID0gKDB4M0ZGRjIwMkMpLFxyXG5cdFZJX0VWRU5UX0FTUkxfUkkgPSAoMHgzRkZGMjAyRSksXHJcblx0VklfRVZFTlRfQVNSTF9DSEFSID0gKDB4M0ZGRjIwMzUpLFxyXG5cdFZJX0VWRU5UX0FTUkxfVEVSTUNIQVIgPSAoMHgzRkZGMjAyNCksXHJcblxyXG4vKiBUaGlzIGlzIGZvciBmYXN0IHZpUGVlay92aVBva2UgbWFjcm9zICovXHJcblxyXG5cdFZJX0FUVFJfUFhJX1NVQl9NQU5GX0lEID0gKDB4M0ZGRjAyMDMpLFxyXG5cdFZJX0FUVFJfUFhJX1NVQl9NT0RFTF9DT0RFID0gKDB4M0ZGRjAyMDQpLFxyXG5cclxuXHRWSV9BVFRSX1BYSV9VU0VfUFJFQUxMT0NfUE9PTCA9ICgweDNGRkYwMjBGKSxcclxuXHJcblx0VklfQVRUUl9VU0JfQlVMS19PVVRfUElQRSA9ICgweDNGRkYwMUEyKSxcclxuXHRWSV9BVFRSX1VTQl9CVUxLX0lOX1BJUEUgPSAoMHgzRkZGMDFBMyksXHJcblx0VklfQVRUUl9VU0JfSU5UUl9JTl9QSVBFID0gKDB4M0ZGRjAxQTQpLFxyXG5cdFZJX0FUVFJfVVNCX0NMQVNTID0gKDB4M0ZGRjAxQTUpLFxyXG5cdFZJX0FUVFJfVVNCX1NVQkNMQVNTID0gKDB4M0ZGRjAxQTYpLFxyXG5cdFZJX0FUVFJfVVNCX0FMVF9TRVRUSU5HID0gKDB4M0ZGRjAxQTgpLFxyXG5cdFZJX0FUVFJfVVNCX0VORF9JTiA9ICgweDNGRkYwMUE5KSxcclxuXHRWSV9BVFRSX1VTQl9OVU1fSU5URkNTID0gKDB4M0ZGRjAxQUEpLFxyXG5cdFZJX0FUVFJfVVNCX05VTV9QSVBFUyA9ICgweDNGRkYwMUFCKSxcclxuXHRWSV9BVFRSX1VTQl9CVUxLX09VVF9TVEFUVVMgPSAoMHgzRkZGMDFBQyksXHJcblx0VklfQVRUUl9VU0JfQlVMS19JTl9TVEFUVVMgPSAoMHgzRkZGMDFBRCksXHJcblx0VklfQVRUUl9VU0JfSU5UUl9JTl9TVEFUVVMgPSAoMHgzRkZGMDFBRSksXHJcblx0VklfQVRUUl9VU0JfQ1RSTF9QSVBFID0gKDB4M0ZGRjAxQjApLFxyXG5cclxuXHRWSV9VU0JfUElQRV9TVEFURV9VTktOT1dOID0gKC0xKSxcclxuXHRWSV9VU0JfUElQRV9SRUFEWSA9ICgwKSxcclxuXHRWSV9VU0JfUElQRV9TVEFMTEVEID0gKDEpLFxyXG5cclxuXHRWSV9VU0JfRU5EX05PTkUgPSAoMCksXHJcblx0VklfVVNCX0VORF9TSE9SVCA9ICg0KSxcclxuXHRWSV9VU0JfRU5EX1NIT1JUX09SX0NPVU5UID0gKDUpLFxyXG5cclxuXHRWSV9BVFRSX0ZJUkVXSVJFX0RFU1RfVVBQRVJfT0ZGU0VUID0gKDB4M0ZGRjAxRjApLFxyXG5cdFZJX0FUVFJfRklSRVdJUkVfU1JDX1VQUEVSX09GRlNFVCA9ICgweDNGRkYwMUYxKSxcclxuXHRWSV9BVFRSX0ZJUkVXSVJFX1dJTl9VUFBFUl9PRkZTRVQgPSAoMHgzRkZGMDFGMiksXHJcblx0VklfQVRUUl9GSVJFV0lSRV9WRU5ET1JfSUQgPSAoMHgzRkZGMDFGMyksXHJcblx0VklfQVRUUl9GSVJFV0lSRV9MT1dFUl9DSElQX0lEID0gKDB4M0ZGRjAxRjQpLFxyXG5cdFZJX0FUVFJfRklSRVdJUkVfVVBQRVJfQ0hJUF9JRCA9ICgweDNGRkYwMUY1KSxcclxuXHJcblx0VklfRklSRVdJUkVfREZMVF9TUEFDRSA9ICg1KSxcclxuXHJcblx0VklfS1RBVFRSX1JFVFVSTl9BTEwgPSAweDBGRkYwMDYyXHJcbn07XHJcblxyXG4iLCJpbXBvcnQgcmVmIGZyb20gJ3JlZi1uYXBpJ1xyXG5leHBvcnQgY29uc3QgVmlJbnQxNiA9IHJlZi50eXBlcy5pbnQxNjtcclxuZXhwb3J0IGNvbnN0IFZpSW50MzIgPSByZWYudHlwZXMuaW50MzI7XHJcbmV4cG9ydCBjb25zdCBWaVBJbnQzMiA9IHJlZi5yZWZUeXBlKFZpSW50MzIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IFZpVUludDMyID0gcmVmLnR5cGVzLnVpbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpUFVJbnQzMiA9IHJlZi5yZWZUeXBlKFZpVUludDMyKTtcclxuZXhwb3J0IGNvbnN0IFZpUEludDE2ID0gcmVmLnJlZlR5cGUoVmlJbnQxNik7XHJcbmV4cG9ydCBjb25zdCBWaVVJbnQxNiA9IHJlZi50eXBlcy51aW50MTY7XHJcbmV4cG9ydCBjb25zdCBWaVBVSW50MTYgPSByZWYucmVmVHlwZShWaVVJbnQxNik7XHJcbmV4cG9ydCBjb25zdCBWaUNoYXIgPSByZWYudHlwZXMuY2hhcjtcclxuZXhwb3J0IGNvbnN0IFZpUENoYXIgPSByZWYucmVmVHlwZShWaUNoYXIpO1xyXG5leHBvcnQgY29uc3QgVmlCeXRlID0gcmVmLnR5cGVzLnVjaGFyO1xyXG5leHBvcnQgY29uc3QgVmlQQnl0ZSA9IHJlZi5yZWZUeXBlKFZpQnl0ZSk7XHJcblxyXG4vLyBOb3RlLCB0aGlzIG5lZWRzIHRvIGJlIFZpVUludDMyLCBub3QgVmlJbnQzMiBvdGhlciB3ZSBnZXQgbmVnYXRpdmUgaGV4XHJcbmV4cG9ydCBjb25zdCBWaVN0YXR1cyA9IFZpVUludDMyO1xyXG5leHBvcnQgY29uc3QgVmlQU3RhdHVzID0gcmVmLnJlZlR5cGUoVmlTdGF0dXMpXHJcbmV4cG9ydCBjb25zdCBWaU9iamVjdCA9IFZpVUludDMyO1xyXG5leHBvcnQgY29uc3QgVmlQT2JqZWN0ID0gcmVmLnJlZlR5cGUoVmlPYmplY3QpXHJcbmV4cG9ydCBjb25zdCBWaVNlc3Npb24gPSBWaVVJbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpRXZlbnQgPSBWaU9iamVjdDtcclxuXHJcbmV4cG9ydCBjb25zdCBWaVBFdmVudCA9IHJlZi5yZWZUeXBlKFZpRXZlbnQpO1xyXG5leHBvcnQgY29uc3QgVmlBdHRyID0gVmlVSW50MzI7XHJcbmV4cG9ydCBjb25zdCBWaUF0dHJTdGF0ZSA9IFZpVUludDMyO1xyXG5leHBvcnQgY29uc3QgVmlQQXR0clN0YXRlID0gcmVmLnJlZlR5cGUoVmlVSW50MzIpO1xyXG5leHBvcnQgY29uc3QgVmlQU2Vzc2lvbiA9IHJlZi5yZWZUeXBlKFZpU2Vzc2lvbik7XHJcbmV4cG9ydCBjb25zdCBWaVN0cmluZyA9IFZpUENoYXI7XHJcbmV4cG9ydCBjb25zdCBWaUNvbnN0U3RyaW5nID0gVmlTdHJpbmc7XHJcbmV4cG9ydCBjb25zdCBWaVJzcmMgPSBWaVN0cmluZztcclxuZXhwb3J0IGNvbnN0IFZpQ29uc3RSc3JjID0gVmlDb25zdFN0cmluZztcclxuZXhwb3J0IGNvbnN0IFZpQWNjZXNzTW9kZSA9IFZpVUludDMyO1xyXG5leHBvcnQgY29uc3QgVmlCdWYgPSBWaVBCeXRlO1xyXG5leHBvcnQgY29uc3QgVmlQQnVmID0gVmlQQnl0ZTtcclxuZXhwb3J0IGNvbnN0IFZpQ29uc3RCdWYgPSBWaVBCeXRlO1xyXG5leHBvcnQgY29uc3QgVmlGaW5kTGlzdCA9IFZpT2JqZWN0O1xyXG5leHBvcnQgY29uc3QgVmlQRmluZExpc3QgPSByZWYucmVmVHlwZShWaUZpbmRMaXN0KTtcclxuXHJcbmV4cG9ydCBjb25zdCBWaUpvYklkID0gVmlVSW50MzJcclxuZXhwb3J0IGNvbnN0IFZpUEpvYklkID0gcmVmLnJlZlR5cGUoVmlKb2JJZClcclxuXHJcbmV4cG9ydCBjb25zdCBWaUV2ZW50VHlwZSA9IFZpVUludDMyXHJcbmV4cG9ydCBjb25zdCBWaVBFdmVudFR5cGUgPSByZWYucmVmVHlwZShWaUV2ZW50VHlwZSlcclxuXHJcbmV4cG9ydCBjb25zdCBWaUV2ZW50RmlsdGVyID0gVmlVSW50MzIiLCJpbXBvcnQgeyBhZ1Zpc2EgfSBmcm9tIFwiLi9uaV92aXNhXCJcclxuXHJcbmNvbnN0IFZJX0VSUk9SID0gMHg4MDAwMDAwMFxyXG5leHBvcnQgZW51bSBWaUNsb3NlQ29tcGxldGlvbkNvZGUge1xyXG4gICAgVklfU1VDQ0VTUyA9IDAsIC8vU2Vzc2lvbiB0byB0aGUgRGVmYXVsdCBSZXNvdXJjZSBNYW5hZ2VyIHJlc291cmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgVklfV0FSTl9OVUxMX09CSkVDVCA9IDB4M0ZGRjAwODIvLyBUaGUgc3BlY2lmaWVkIG9iamVjdCByZWZlcmVuY2UgaXMgdW5pbml0aWFsaXplZC5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlDbG9zZUVycm9yQ29kZSB7XHJcbiAgICBWSV9FUlJPUl9DTE9TSU5HX0ZBSUxFRCA9IFZJX0VSUk9SICsgMHgzRkZGMDAxNiwgLy8gVW5hYmxlIHRvIGRlYWxsb2NhdGUgdGhlIHByZXZpb3VzbHkgYWxsb2NhdGVkIGRhdGEgc3RydWN0dXJlcyBjb3JyZXNwb25kaW5nIHRvIHRoaXMgc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlLlxyXG4gICAgVklfRVJST1JfSU5WX1NFU1NJT04gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX09CSkVDVCA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlDbG9zZSh2aU9iamVjdDogbnVtYmVyKTogUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyIH0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG5cclxuICAgICAgICBzdGF0dXMgPSBhZ1Zpc2EudmlDbG9zZSh2aU9iamVjdClcclxuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFZpQ2xvc2VDb21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTOlxyXG4gICAgICAgICAgICBjYXNlIFZpQ2xvc2VDb21wbGV0aW9uQ29kZS5WSV9XQVJOX05VTExfT0JKRUNUOiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiBzdGF0dXMgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoYHZpQ2xvc2UgRXJyb3I6IHN0YXR1czogJHtzdGF0dXN9YClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iLCJpbXBvcnQgeyBhZ1Zpc2EgfSBmcm9tIFwiLi9uaV92aXNhXCJcclxuXHJcbmNvbnN0IFZJX0VSUk9SID0gMHg4MDAwMDAwMFxyXG5cclxuZXhwb3J0IGVudW0gVmlGaW5kTmV4dENvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwLCAvL1RoaXMgaXMgdGhlIGZ1bmN0aW9uIHJldHVybiBzdGF0dXMuIEl0IHJldHVybnMgZWl0aGVyIGEgY29tcGxldGlvbiBjb2RlIG9yIGFuIGVycm9yIGNvZGUgYXMgZm9sbG93cy4gICBcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlGaW5kTmV4dEVycm9yQ29kZSB7XHJcbiAgICBWSV9FUlJPUl9JTlZfU0VTU0lPTiA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSAsLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuIFxyXG4gICAgVklfRVJST1JfSU5WX09CSkVDVCA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSAsLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9OU1VQX09QRVIgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNjcgLC8vIFRoZSBnaXZlbiBzZXNuIGRvZXMgbm90IHN1cHBvcnQgdGhpcyBmdW5jdGlvbi5cclxuICAgIFZJX0VSUk9SX1JTUkNfTkZPVU5EID0gVklfRVJST1IgKyAweDNGRkYwMDExLy8gU3BlY2lmaWVkIGV4cHJlc3Npb24gZG9lcyBub3QgbWF0Y2ggYW55IGRldmljZXMuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWaUZpbmROZXh0KHZpU2Vzc2lvbjogbnVtYmVyKTogUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCBpbnN0ckRlc2M6IHN0cmluZyB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgaW5zdHJEZXNjOiBzdHJpbmcgfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGxldCBzdGF0dXM6IG51bWJlciA9IFZJX0VSUk9SXHJcblxyXG4gICAgICAgIGxldCBidWZmZXJfaW5zdHJEZXNjID0gQnVmZmVyLmFsbG9jKDUxMikgLy8gQ1N0cmluZyBkZXNjcmlwdGlvblxyXG5cclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpRmluZE5leHQodmlTZXNzaW9uLCBidWZmZXJfaW5zdHJEZXNjIGFzIGFueSlcclxuXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaUZpbmROZXh0Q29tcGxldGlvbkNvZGUuVklfU1VDQ0VTUzoge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluc3RyRGVzYzogc3RyaW5nID0gYnVmZmVyX2luc3RyRGVzYy5yZWFkQ1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiBzdGF0dXMsIGluc3RyRGVzYzogaW5zdHJEZXNjIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGB2aUZpbmROZXh0IEVycm9yOiBzdGF0dXM6ICR7c3RhdHVzfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgYWdWaXNhIH0gZnJvbSBcIi4vbmlfdmlzYVwiXHJcblxyXG5jb25zdCBWSV9FUlJPUiA9IDB4ODAwMDAwMDBcclxuXHJcbmV4cG9ydCBlbnVtIFZpRmluZFJzcmNDb21wbGV0aW9uQ29kZSB7XHJcbiAgICBWSV9TVUNDRVNTID0gMCwgLy9UaGlzIGlzIHRoZSBmdW5jdGlvbiByZXR1cm4gc3RhdHVzLiBJdCByZXR1cm5zIGVpdGhlciBhIGNvbXBsZXRpb24gY29kZSBvciBhbiBlcnJvciBjb2RlIGFzIGZvbGxvd3MuICAgXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZpRmluZFJzcmNFcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfSU5WX0VYUFIgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTAgLC8vIEludmFsaWQgZXhwcmVzc2lvbiBzcGVjaWZpZWQgZm9yIHNlYXJjaC5cclxuICAgIFZJX0VSUk9SX0lOVl9TRVNTSU9OID0gVklfRVJST1IgKyAweDNGRkYwMDBFICwvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS4gXHJcbiAgICBWSV9FUlJPUl9JTlZfT0JKRUNUID0gVklfRVJST1IgKyAweDNGRkYwMDBFICwvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS5cclxuICAgIFZJX0VSUk9SX05TVVBfT1BFUiA9IFZJX0VSUk9SICsgMHgzRkZGMDA2NyAsLy8gVGhlIGdpdmVuIHNlc24gZG9lcyBub3Qgc3VwcG9ydCB0aGlzIGZ1bmN0aW9uLlxyXG4gICAgVklfRVJST1JfUlNSQ19ORk9VTkQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTEvLyBTcGVjaWZpZWQgZXhwcmVzc2lvbiBkb2VzIG5vdCBtYXRjaCBhbnkgZGV2aWNlcy5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWaUZpbmRSc3JjKHZpU2Vzc2lvbjogbnVtYmVyLCBleHByOiBzdHJpbmcpOiBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIGZpbmRMaXN0OiBudW1iZXIsIHJldGNudDogbnVtYmVyLCBpbnN0ckRlc2M6IHN0cmluZyB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgZmluZExpc3Q6IG51bWJlciwgcmV0Y250OiBudW1iZXIsIGluc3RyRGVzYzogc3RyaW5nIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG5cclxuICAgICAgICBsZXQgYnVmZmVyRmluZExpc3QgPSBCdWZmZXIuYWxsb2MoNCkgLy91MzJcclxuICAgICAgICBsZXQgYnVmZmVyX3JldGNudCA9IEJ1ZmZlci5hbGxvYyg0KSAvL3UzMlxyXG4gICAgICAgIGxldCBidWZmZXJfaW5zdHJEZXNjID0gQnVmZmVyLmFsbG9jKDUxMikgLy8gQ1N0cmluZyBkZXNjcmlwdGlvblxyXG5cclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpRmluZFJzcmModmlTZXNzaW9uLCBleHByLCBidWZmZXJGaW5kTGlzdCBhcyBhbnksIGJ1ZmZlcl9yZXRjbnQgYXMgYW55LCBidWZmZXJfaW5zdHJEZXNjIGFzIGFueSlcclxuXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaUZpbmRSc3JjQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTUzoge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbmRMaXN0ID0gYnVmZmVyRmluZExpc3QucmVhZFVJbnQzMkxFKClcclxuICAgICAgICAgICAgICAgIGxldCByZXRjbnQ6IG51bWJlciA9IGJ1ZmZlcl9yZXRjbnQucmVhZFVJbnQzMkxFKClcclxuICAgICAgICAgICAgICAgIGxldCBpbnN0ckRlc2M6IHN0cmluZyA9IGJ1ZmZlcl9pbnN0ckRlc2MucmVhZENTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCBmaW5kTGlzdDogZmluZExpc3QsIHJldGNudDogcmV0Y250LCBpbnN0ckRlc2M6IGluc3RyRGVzYyB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChgdmlGaW5kUnNyYyBFcnJvcjogc3RhdHVzOiAke3N0YXR1c31gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsImltcG9ydCB7IGFnVmlzYSB9IGZyb20gXCIuL25pX3Zpc2FcIlxyXG5cclxuY29uc3QgVklfRVJST1IgPSAweDgwMDAwMDAwXHJcbmV4cG9ydCBlbnVtIFZpR2V0QXR0cmlidXRlQ29tcGxldGlvbkNvZGUge1xyXG4gICAgVklfU1VDQ0VTUyA9IDAsIC8vIFJlc291cmNlIGF0dHJpYnV0ZSByZXRyaWV2ZWQgc3VjY2Vzc2Z1bGx5LlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWaUdldEF0dHJpYnV0ZUVycm9yQ29kZSB7XHJcbiAgICBWSV9FUlJPUl9JTlZfU0VTU0lPTiA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9JTlZfT0JKRUNUID0gVklfRVJST1IgKyAgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9OU1VQX0FUVFIgPSBWSV9FUlJPUiArICAweDNGRkYwMDFELCAvLyBUaGUgc3BlY2lmaWVkIGF0dHJpYnV0ZSBpcyBub3QgZGVmaW5lZCBieSB0aGUgcmVmZXJlbmNlZCByZXNvdXJjZS5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2aUdldEF0dHJpYnV0ZSh2aVNlc3Npb246IG51bWJlciwgYXR0cmlidXRlOiBudW1iZXIpOiBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIGF0dHJTdGF0ZTogbnVtYmVyfT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIgLCBhdHRyU3RhdGU6IG51bWJlcn0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG5cclxuICAgICAgICBsZXQgYnVmZmVyQXR0clN0YXRlID0gQnVmZmVyLmFsbG9jKDQpIC8vdTMyXHJcblxyXG4gICAgICAgIHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZSh2aVNlc3Npb24sIGF0dHJpYnV0ZSwgYnVmZmVyQXR0clN0YXRlIGFzIGFueSlcclxuXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaUdldEF0dHJpYnV0ZUNvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1M6IHtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRyU3RhdGUgPSBidWZmZXJBdHRyU3RhdGUucmVhZFVJbnQzMkxFKClcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoeyBzdGF0dXM6IHN0YXR1cyAsIGF0dHJTdGF0ZTogYXR0clN0YXRlfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoYHZpR2V0QXR0cmlidXRlIEVycm9yOiBzdGF0dXM6ICR7c3RhdHVzfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiIsImltcG9ydCB7IGFnVmlzYSB9IGZyb20gXCIuL25pX3Zpc2FcIlxyXG5cclxuY29uc3QgVklfRVJST1IgPSAweDgwMDAwMDAwXHJcbmV4cG9ydCBlbnVtIFZpT3BlbkNvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwLCAvL1Nlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgIFZJX1NVQ0NFU1NfREVWX05QUkVTRU5UID0gMHgzRkZGMDA3RCwgLy8gU2Vzc2lvbiBvcGVuZWQgc3VjY2Vzc2Z1bGx5LCBidXQgdGhlIGRldmljZSBhdCB0aGUgc3BlY2lmaWVkIGFkZHJlc3MgaXMgbm90IHJlc3BvbmRpbmcuXHJcbiAgICBWSV9XQVJOX0NPTkZJR19OTE9BREVEID0gMHgzRkZGMDA3NywgLy8gVGhlIHNwZWNpZmllZCBjb25maWd1cmF0aW9uIGVpdGhlciBkb2VzIG5vdCBleGlzdCBvciBjb3VsZCBub3QgYmUgbG9hZGVkIHVzaW5nIFZJU0Etc3BlY2lmaWVkIGRlZmF1bHRzLlxyXG4gICAgVklfV0FSTl9TRVJWRVJfQ0VSVF9VTlRSVVNURUQgPSAweDNGRkYwMEYwLCAvLyBBIEhpU0xJUCBWSVNBIGNsaWVudCBkb2VzIG5vdCB0cnVzdCB0aGUgc2VydmVyIGNlcnRpZmljYXRlLlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWaU9wZW5FcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfQUxMT0MgPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0MsIC8vIEluc3VmZmljaWVudCBzeXN0ZW0gcmVzb3VyY2VzIHRvIG9wZW4gYSBzZXNzaW9uLlxyXG4gICAgVklfRVJST1JfSU5URl9OVU1fTkNPTkZJRyA9IFZJX0VSUk9SICsgMHgzRkZGMDBBNSwgLy8gVGhlIGludGVyZmFjZSB0eXBlIGlzIHZhbGlkIGJ1dCB0aGUgc3BlY2lmaWVkIGludGVyZmFjZSBudW1iZXIgaXMgbm90IGNvbmZpZ3VyZWQuXHJcbiAgICBWSV9FUlJPUl9JTlZfQUNDX01PREUgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTMsIC8vIEludmFsaWQgYWNjZXNzIG1vZGUuXHJcbiAgICBWSV9FUlJPUl9JTlZfUlNSQ19OQU1FID0gVklfRVJST1IgKyAweDNGRkYwMDEyLCAvLyBJbnZhbGlkIHJlc291cmNlIHJlZmVyZW5jZSBzcGVjaWZpZWQuIFBhcnNpbmcgZXJyb3IuXHJcbiAgICBWSV9FUlJPUl9JTlZfU0VTU0lPTiA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9JTlZfT0JKRUNUID0gVklfRVJST1IgKyAweDNGRkYwMDBFLCAvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS5cclxuICAgIFZJX0VSUk9SX0lOVl9QUk9UID0gVklfRVJST1IgKyAweDNGRkYwMDc5LCAvLyBUaGUgcmVzb3VyY2UgZGVzY3JpcHRvciBzcGVjaWZpZXMgYSBzZWN1cmUgY29ubmVjdGlvbiwgYnV0IHRoZSBkZXZpY2Ugb3IgVklTQSBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdCBzdXBwb3J0IHNlY3VyZSBjb25uZWN0aW9ucywgb3Igc2VjdXJpdHkgaGFzIGJlZW4gZGlzYWJsZWQgb24gdGhlIGRldmljZS5cclxuICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIHRoZSBhZGRyZXNzIHN0cmluZyBpbmRpY2F0ZXMgYSBzZWN1cmUgY29ubmVjdGlvbiBzaG91bGQgYmUgbWFkZSwgYnV0IHRoZSBkZXNpZ25hdGVkIHBvcnQgaXMgbm90IGZvciBhIFRMUyBzZXJ2ZXIuIFxyXG4gICAgVklfRVJST1JfTElCUkFSWV9ORk9VTkQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwOUUsIC8vIEEgY29kZSBsaWJyYXJ5IHJlcXVpcmVkIGJ5IFZJU0EgY291bGQgbm90IGJlIGxvY2F0ZWQgb3IgbG9hZGVkLlxyXG4gICAgVklfRVJST1JfTlBFUk1JU1NJT04gPSBWSV9FUlJPUiArIDB4M0ZGRjAwQTgsIC8vIEEgc2VjdXJlIGNvbm5lY3Rpb24gY291bGQgbm90IGJlIGNyZWF0ZWQgYmVjYXVzZSB0aGUgaW5zdHJ1bWVudCByZWZ1c2VkIHRoZSBjcmVkZW50aWFscyBwcm9mZmVyZWQgYnkgVklTQSBvciB0aGUgY3JlZGVudGlhbCBpbmZvcm1hdGlvbiBjb3VsZCBub3QgYmUgbWFwcGVkIHRvIHZhbGlkIGNyZWRlbnRpYWxzLiBcclxuICAgIFZJX0VSUk9SX05TVVBfT1BFUiA9IFZJX0VSUk9SICsgMHgzRkZGMDA2NywgLy8gVGhlIGdpdmVuIHNlc24gZG9lcyBub3Qgc3VwcG9ydCB0aGlzIGZ1bmN0aW9uLiBGb3IgVklTQSwgdGhpcyBmdW5jdGlvbiBpcyBzdXBwb3J0ZWQgb25seSBieSB0aGUgRGVmYXVsdCBSZXNvdXJjZSBNYW5hZ2VyIHNlc3Npb24uXHJcbiAgICBWSV9FUlJPUl9SU1JDX0JVU1kgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNzIsIC8vIFRoZSByZXNvdXJjZSBpcyB2YWxpZCBidXQgVklTQSBjYW5ub3QgY3VycmVudGx5IGFjY2VzcyBpdC5cclxuICAgIFZJX0VSUk9SX1JTUkNfTE9DS0VEID0gVklfRVJST1IgKyAweDNGRkYwMDBGLCAvLyBTcGVjaWZpZWQgdHlwZSBvZiBsb2NrIGNhbm5vdCBiZSBvYnRhaW5lZCBiZWNhdXNlIHRoZSByZXNvdXJjZSBpcyBhbHJlYWR5IGxvY2tlZCB3aXRoIGEgbG9jayB0eXBlIGluY29tcGF0aWJsZSB3aXRoIHRoZSBsb2NrIHJlcXVlc3RlZC5cclxuICAgIFZJX0VSUk9SX1JTUkNfTkZPVU5EID0gVklfRVJST1IgKyAweDNGRkYwMDExLCAvLyBJbnN1ZmZpY2llbnQgbG9jYXRpb24gaW5mb3JtYXRpb24gb3IgcmVzb3VyY2Ugbm90IHByZXNlbnQgaW4gdGhlIHN5c3RlbS5cclxuICAgIFZJX0VSUk9SX1NFUlZFUl9DRVJUID0gVklfRVJST1IgKyAweDNGRkYwMEIwLCAvLyBBIHNlY3VyZSBjb25uZWN0aW9uIGNvdWxkIG5vdCBiZSBjcmVhdGVkIGR1ZSB0byB0aGUgaW5zdHJ1bWVudCBjZXJ0aWZpY2F0ZSBiZWluZyBpbnZhbGlkIG9yIHVudHJ1c3RlZC4gXHJcbiAgICBWSV9FUlJPUl9OQ0lDID0gVklfRVJST1IgKyAweDNGRkYwMDYwLCAvL1RoZSBpbnRlcmZhY2UgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc2Vzc2lvbiBpcyBub3QgY3VycmVudGx5IHRoZSBjb250cm9sbGVyIGluIGNoYXJnZS5cclxuICAgIFZJX0VSUk9SX1RNTyA9IFZJX0VSUk9SICsgMHgzRkZGMDAxNSwgLy8gQSBzZXNzaW9uIHRvIHRoZSByZXNvdXJjZSBjb3VsZCBub3QgYmUgb2J0YWluZWQgd2l0aGluIHRoZSBzcGVjaWZpZWQgdGltZW91dCBwZXJpb2QuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlPcGVuKHZpU2Vzc2lvbjogbnVtYmVyLCB2aXNhX3Jlc291cmNlOiBzdHJpbmcsIHZpQWNjZXNzTW9kZTogbnVtYmVyLCB0aW1lb3V0OiBudW1iZXIpOiBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIHNlc3Npb246IG51bWJlciB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgc2Vzc2lvbjogbnVtYmVyIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG5cclxuICAgICAgICBsZXQgYnVmZmVyU2Vzc2lvbiA9IEJ1ZmZlci5hbGxvYyg0KSAvL3UzMlxyXG5cclxuICAgICAgICBzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuKHZpU2Vzc2lvbiwgdmlzYV9yZXNvdXJjZSwgdmlBY2Nlc3NNb2RlLCB0aW1lb3V0LCBidWZmZXJTZXNzaW9uIGFzIGFueSlcclxuXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5Db21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkNvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1NfREVWX05QUkVTRU5UOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkNvbXBsZXRpb25Db2RlLlZJX1dBUk5fQ09ORklHX05MT0FERUQ6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuQ29tcGxldGlvbkNvZGUuVklfV0FSTl9TRVJWRVJfQ0VSVF9VTlRSVVNURUQ6IHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXNzaW9uOiBudW1iZXIgPSBidWZmZXJTZXNzaW9uLnJlYWRVSW50MzJMRSgpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiBzdGF0dXMsIHNlc3Npb246IHNlc3Npb24gfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfQUxMT0M6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX0lOVEZfTlVNX05DT05GSUc6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX0lOVl9BQ0NfTU9ERTpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfSU5WX1JTUkNfTkFNRTpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfSU5WX1NFU1NJT046XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX0lOVl9PQkpFQ1Q6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX0lOVl9QUk9UOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9MSUJSQVJZX05GT1VORDpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfTlBFUk1JU1NJT046XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX05TVVBfT1BFUjpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfUlNSQ19CVVNZOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9SU1JDX0xPQ0tFRDpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfUlNSQ19ORk9VTkQ6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX1NFUlZFUl9DRVJUOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9OQ0lDOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9UTU86e1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCBzZXNzaW9uOiAtMSB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChgVmlPcGVuOiBFcnJvcjogU3RhdHVzICR7c3RhdHVzfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiIsImltcG9ydCB7IGFnVmlzYSB9IGZyb20gXCIuL25pX3Zpc2FcIlxyXG5cclxuY29uc3QgVklfRVJST1IgPSAweDgwMDAwMDAwXHJcbmV4cG9ydCBlbnVtIFZpT3BlbkRlZmF1bHRSTUNvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwIC8vU2Vzc2lvbiB0byB0aGUgRGVmYXVsdCBSZXNvdXJjZSBNYW5hZ2VyIHJlc291cmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWaU9wZW5EZWZhdWx0Uk1FcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfQUxMT0MgPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0MsIC8vIEluc3VmZmljaWVudCBzeXN0ZW0gcmVzb3VyY2VzIHRvIGNyZWF0ZSBhIHNlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZS5cclxuICAgIFZJX0VSUk9SX0lOVl9TRVRVUCA9IFZJX0VSUk9SICsgMHgzRkZGMDAzQSwgLy8gU29tZSBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBjb25maWd1cmF0aW9uIGZpbGUgaXMgY29ycnVwdCBvciBkb2VzIG5vdCBleGlzdC5cclxuICAgIFZJX0VSUk9SX1NZU1RFTV9FUlJPUiA9IFZJX0VSUk9SICsgMHgzRkZGMDAwMCwgLy9UaGUgVklTQSBzeXN0ZW0gZmFpbGVkIHRvIGluaXRpYWxpemUuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2aU9wZW5EZWZhdWx0Uk0oKTogUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCBkZWZhdWx0Uk06IG51bWJlciB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgZGVmYXVsdFJNOiBudW1iZXIgfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGxldCBzdGF0dXM6IG51bWJlciA9IFZJX0VSUk9SXHJcbiAgICAgICAgLy8gYWxsb2NhdGUgYSBidWZmZXIgZm9yIHRoZSBzZXNzaW9uIHJlc3BvbnNlXHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvYyg0KVxyXG5cclxuICAgICAgICBzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuRGVmYXVsdFJNKGJ1ZmZlciBhcyBhbnkpXHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IFZpT3BlbkRlZmF1bHRSTUNvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1MpIHtcclxuICAgICAgICAgICAgbGV0IHNlc3Npb246IG51bWJlciA9IGJ1ZmZlci5yZWFkVUludDMyTEUoKVxyXG4gICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiBzdGF0dXMsIGRlZmF1bHRSTTogc2Vzc2lvbiB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVqZWN0KGB2aU9wZW5EZWZhdWx0Uk0gRXJyb3I6IHN0YXR1czogJHtzdGF0dXN9YClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgYWdWaXNhIH0gZnJvbSBcIi4vbmlfdmlzYVwiXHJcblxyXG5jb25zdCBWSV9FUlJPUiA9IDB4ODAwMDAwMDBcclxuXHJcbmV4cG9ydCBlbnVtIFZpUmVhZENvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwLCAvL1Nlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgIFZJX1NVQ0NFU1NfVEVSTV9DSEFSID0gMHgzRkZGMDAwNSwvLyBUaGUgc3BlY2lmaWVkIHRlcm1pbmF0aW9uIGNoYXJhY3RlciB3YXMgcmVhZC5cclxuICAgIFZJX1NVQ0NFU1NfTUFYX0NOVCA9IDB4M0ZGRjAwMDYsLy8gVGhlIG51bWJlciBvZiBieXRlcyByZWFkIGlzIGVxdWFsIHRvIGNvdW50LlxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZpUmVhZEVycm9yQ29kZSB7XHJcbiAgICBWSV9FUlJPUl9BU1JMX0ZSQU1JTkcgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNkIsIC8vIEEgZnJhbWluZyBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9BU1JMX09WRVJSVU4gPSBWSV9FUlJPUiArIDB4M0ZGRjAwNkMsIC8vIEFuIG92ZXJydW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLiBBIGNoYXJhY3RlciB3YXMgbm90IHJlYWQgZnJvbSB0aGUgaGFyZHdhcmUgYmVmb3JlIHRoZSBuZXh0IGNoYXJhY3RlciBhcnJpdmVkLlxyXG4gICAgVklfRVJST1JfQVNSTF9QQVJJVFkgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNkEsIC8vIEEgcGFyaXR5IGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX0JFUlIgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzgsIC8vIEJ1cyBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9DT05OX0xPU1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwQTYsICAvLyBUaGUgSS9PIGNvbm5lY3Rpb24gZm9yIHRoZSBnaXZlbiBzZXNzaW9uIGhhcyBiZWVuIGxvc3QuXHJcbiAgICBWSV9FUlJPUl9JTlZfU0VTU0lPTiA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9JTlZfT0JKRUNUID0gVklfRVJST1IgKyAweDNGRkYwMDBFLCAvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS5cclxuICAgIFZJX0VSUk9SX0lOVl9TRVRVUCA9IFZJX0VSUk9SICsgMHgzRkZGMDAzQSwgLy8gVW5hYmxlIHRvIHN0YXJ0IHdyaXRlIGZ1bmN0aW9uIGJlY2F1c2Ugc2V0dXAgaXMgaW52YWxpZCAoZHVlIHRvIGF0dHJpYnV0ZXMgYmVpbmcgc2V0IHRvIGFuIGluY29uc2lzdGVudCBzdGF0ZSkuXHJcbiAgICBWSV9FUlJPUl9JTyA9IFZJX0VSUk9SICsgMHgzRkZGMDAzRSwgLy8gVW5rbm93biBJL08gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfTkNJQyA9IFZJX0VSUk9SICsgMHgzRkZGMDA2MCwgLy8gVGhlIGludGVyZmFjZSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIHZpIGlzIG5vdCBjdXJyZW50bHkgdGhlIGNvbnRyb2xsZXIgaW4gY2hhcmdlLlxyXG4gICAgVklfRVJST1JfTkxJU1RFTkVSUyA9IFZJX0VSUk9SICsgMHgzRkZGMDA1RiwgLy8gTm8gTGlzdGVuZXJzIGNvbmRpdGlvbiBpcyBkZXRlY3RlZCAoYm90aCBOUkZEIGFuZCBOREFDIGFyZSBkZS1hc3NlcnRlZCkuXHJcbiAgICBWSV9FUlJPUl9OU1VQX09QRVIgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNjcsIC8vIFRoZSBnaXZlbiB2aSBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgZnVuY3Rpb24uXHJcbiAgICBWSV9FUlJPUl9PVVRQX1BST1RfVklPTCA9IFZJX0VSUk9SICsgMHgzRkZGMDAzNiwgLy8gIERldmljZSByZXBvcnRlZCBhbiBvdXRwdXQgcHJvdG9jb2wgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfUkFXX1JEX1BST1RfVklPTCA9IFZJX0VSUk9SICsgMHgzRkZGMDAzNSwgLy8gVmlvbGF0aW9uIG9mIHJhdyByZWFkIHByb3RvY29sIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX1JBV19XUl9QUk9UX1ZJT0wgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzQsIC8vIFZpb2xhdGlvbiBvZiByYXcgd3JpdGUgcHJvdG9jb2wgb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfUlNSQ19MT0NLRUQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEYsIC8vIFNwZWNpZmllZCBvcGVyYXRpb24gY291bGQgbm90IGJlIHBlcmZvcm1lZCBiZWNhdXNlIHRoZSByZXNvdXJjZSBpZGVudGlmaWVkIGJ5IHZpIGhhcyBiZWVuIGxvY2tlZCBmb3IgdGhpcyBraW5kIG9mIGFjY2Vzcy5cclxuICAgIFZJX0VSUk9SX1RNTyA9IFZJX0VSUk9SICsgMHgzRkZGMDAxNSwgLy8gQSBzZXNzaW9uIHRvIHRoZSByZXNvdXJjZSBjb3VsZCBub3QgYmUgb2J0YWluZWQgd2l0aGluIHRoZSBzcGVjaWZpZWQgdGltZW91dCBwZXJpb2QuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlSZWFkKHZpU2Vzc2lvbjogbnVtYmVyLCBjb3VudDpudW1iZXIgKTogUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCByZXRDb3VudDogbnVtYmVyLCBidWY6c3RyaW5nIH0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCByZXRDb3VudDogbnVtYmVyLCBidWY6IHN0cmluZyB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gVklfRVJST1JcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlclJldENvdW50ID0gQnVmZmVyLmFsbG9jKDQpIC8vdTMyXHJcbiAgICAgICAgbGV0IGJ1ZmZlckJ1ZiA9IEJ1ZmZlci5hbGxvYyhjb3VudCkgLy91MzJcclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpUmVhZCh2aVNlc3Npb24sIGJ1ZmZlckJ1ZiBhcyBhbnksIGNvdW50LCBidWZmZXJSZXRDb3VudCBhcyBhbnkpXHJcblxyXG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVmlSZWFkQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTUzpcclxuICAgICAgICAgICAgY2FzZSBWaVJlYWRDb21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTX01BWF9DTlQ6XHJcbiAgICAgICAgICAgIGNhc2UgVmlSZWFkQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTU19URVJNX0NIQVI6IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXRDb3VudDogbnVtYmVyID0gYnVmZmVyUmV0Q291bnQucmVhZFVJbnQzMkxFKClcclxuICAgICAgICAgICAgICAgIGxldCBidWY6IHN0cmluZyA9IGJ1ZmZlckJ1Zi5yZWFkQ1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiBzdGF0dXMsIHJldENvdW50OiByZXRDb3VudCwgYnVmOiBidWYgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGB2aVJlYWQgRXJyb3I6IHN0YXR1czogJHtzdGF0dXN9YClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iLCJpbXBvcnQgeyBhZ1Zpc2EgfSBmcm9tIFwiLi9uaV92aXNhXCJcclxuXHJcbmNvbnN0IFZJX0VSUk9SID0gMHg4MDAwMDAwMFxyXG5leHBvcnQgZW51bSBWaVdyaXRlQ29tcGxldGlvbkNvZGUge1xyXG4gICAgVklfU1VDQ0VTUyA9IDAsIC8vU2Vzc2lvbiB0byB0aGUgRGVmYXVsdCBSZXNvdXJjZSBNYW5hZ2VyIHJlc291cmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWaVdyaXRlRXJyb3JDb2RlIHtcclxuICAgIFZJX0VSUk9SX0JFUlIgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzgsIC8vIEJ1cyBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9DT05OX0xPU1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwQTYsICAvLyBUaGUgSS9PIGNvbm5lY3Rpb24gZm9yIHRoZSBnaXZlbiBzZXNzaW9uIGhhcyBiZWVuIGxvc3QuXHJcbiAgICBWSV9FUlJPUl9JTlBfUFJPVF9WSU9MID0gVklfRVJST1IgKyAweDNGRkYwMDM3LCAvLyBEZXZpY2UgcmVwb3J0ZWQgYW4gaW5wdXQgcHJvdG9jb2wgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfSU5WX1NFU1NJT04gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX09CSkVDVCA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9JTlZfU0VUVVAgPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0EsIC8vIFVuYWJsZSB0byBzdGFydCB3cml0ZSBmdW5jdGlvbiBiZWNhdXNlIHNldHVwIGlzIGludmFsaWQgKGR1ZSB0byBhdHRyaWJ1dGVzIGJlaW5nIHNldCB0byBhbiBpbmNvbnNpc3RlbnQgc3RhdGUpLlxyXG4gICAgVklfRVJST1JfSU8gPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0UsIC8vIFVua25vd24gSS9PIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX05DSUMgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNjAsIC8vIFRoZSBpbnRlcmZhY2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiB2aSBpcyBub3QgY3VycmVudGx5IHRoZSBjb250cm9sbGVyIGluIGNoYXJnZS5cclxuICAgIFZJX0VSUk9SX05MSVNURU5FUlMgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNUYsIC8vIE5vIExpc3RlbmVycyBjb25kaXRpb24gaXMgZGV0ZWN0ZWQgKGJvdGggTlJGRCBhbmQgTkRBQyBhcmUgZGUtYXNzZXJ0ZWQpLlxyXG4gICAgVklfRVJST1JfTlNVUF9PUEVSID0gVklfRVJST1IgKyAweDNGRkYwMDY3LCAvLyBUaGUgZ2l2ZW4gdmkgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIGZ1bmN0aW9uLlxyXG4gICAgVklfRVJST1JfUkFXX1JEX1BST1RfVklPTCA9IFZJX0VSUk9SICsgMHgzRkZGMDAzNSwgLy8gVmlvbGF0aW9uIG9mIHJhdyByZWFkIHByb3RvY29sIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX1JBV19XUl9QUk9UX1ZJT0wgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzQsIC8vIFZpb2xhdGlvbiBvZiByYXcgd3JpdGUgcHJvdG9jb2wgb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfUlNSQ19MT0NLRUQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEYsIC8vIFNwZWNpZmllZCBvcGVyYXRpb24gY291bGQgbm90IGJlIHBlcmZvcm1lZCBiZWNhdXNlIHRoZSByZXNvdXJjZSBpZGVudGlmaWVkIGJ5IHZpIGhhcyBiZWVuIGxvY2tlZCBmb3IgdGhpcyBraW5kIG9mIGFjY2Vzcy5cclxuICAgIFZJX0VSUk9SX1RNTyA9IFZJX0VSUk9SICsgMHgzRkZGMDAxNSwgLy8gQSBzZXNzaW9uIHRvIHRoZSByZXNvdXJjZSBjb3VsZCBub3QgYmUgb2J0YWluZWQgd2l0aGluIHRoZSBzcGVjaWZpZWQgdGltZW91dCBwZXJpb2QuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlXcml0ZSh2aVNlc3Npb246IG51bWJlciwgYnVmZjogc3RyaW5nKTogUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCByZXRDb3VudDogbnVtYmVyIH0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCByZXRDb3VudDogbnVtYmVyIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG5cclxuICAgICAgICBsZXQgYnVmZmVyUmV0Q291bnQgPSBCdWZmZXIuYWxsb2MoNCkgLy91MzJcclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpV3JpdGUodmlTZXNzaW9uLCBidWZmLCBidWZmLmxlbmd0aCwgYnVmZmVyUmV0Q291bnQgYXMgYW55KVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFZpV3JpdGVDb21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0Q291bnQ6IG51bWJlciA9IGJ1ZmZlclJldENvdW50LnJlYWRVSW50MzJMRSgpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiBzdGF0dXMsIHJldENvdW50OiByZXRDb3VudCB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChgdmlXcml0ZSBFcnJvcjogc3RhdHVzOiAke3N0YXR1c31gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZmaS1uYXBpXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZi1uYXBpXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvL2ltcG9ydCB7IHZpc2FBc3luY1F1ZXJ5LCB2aXNhUXVlcnksIHZpc2FRdWVyeVRvUHJvbWlzZSB9IGZyb20gJy4vbmktdmlzYS9uaV92aXNhJ1xyXG5leHBvcnQgeyB2aUNsb3NlIH0gZnJvbSAnLi9uaS12aXNhL3ZpX2Nsb3NlJztcclxuZXhwb3J0IHsgdmlPcGVuIH0gZnJvbSAnLi9uaS12aXNhL3ZpX29wZW4nO1xyXG5leHBvcnQgeyB2aU9wZW5EZWZhdWx0Uk0gfSBmcm9tICcuL25pLXZpc2Evdmlfb3Blbl9kZWZhdWx0X3JfbSc7XHJcbmV4cG9ydCB7IHZpUmVhZCB9IGZyb20gJy4vbmktdmlzYS92aV9yZWFkJztcclxuZXhwb3J0IHsgdmlXcml0ZSB9IGZyb20gJy4vbmktdmlzYS92aV93cml0ZSc7XHJcbmV4cG9ydCB7IGdldFJlc291cmNlcyB9IGZyb20gJy4vbmktdmlzYS9nZXRfcmVzb3VyY2VzJyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==