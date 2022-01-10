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
            //console.log(defaultRM)
            let attr = yield (0, vi_get_attribute_1.viGetAttribute)(defaultRM.defaultRM, ni_visa_constants_1.NiVisaConstants.VI_KTATTR_RETURN_ALL);
            //console.log(attr)
            // get the list of equipment seen by pc
            let findList = yield (0, vi_find_rsrc_1.ViFindRsrc)(defaultRM.defaultRM, "?*");
            // console.log(findList)
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
            reject(err);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsY0FBcUIsQ0FBQztRQUU1RSxRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUsscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25DLElBQUksUUFBUSxHQUFXLGNBQWMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BELE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQ2xEO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ0wsTUFBTSxDQUFDLDBCQUEwQixNQUFNLEVBQUUsQ0FBQzthQUM3QztTQUNKO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQWxCRCwwQkFrQkM7Ozs7Ozs7Ozs7O0FDM0NEOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkEsbUZBQW1GO0FBQ25GLDRGQUE2QztBQUFwQywyR0FBTztBQUNoQix5RkFBMkM7QUFBbEMsd0dBQU07QUFDZiw2SEFBZ0U7QUFBdkQsc0lBQWU7QUFDeEIseUZBQTJDO0FBQWxDLHdHQUFNO0FBQ2YsNEZBQTZDO0FBQXBDLDJHQUFPO0FBQ2hCLDJHQUFzRDtBQUE3QywwSEFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL1N2aXNhL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9uaS12aXNhL2dldF9yZXNvdXJjZXMudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS9uaV92aXNhLnRzIiwid2VicGFjazovL1N2aXNhLy4vc3JjL25pLXZpc2EvbmlfdmlzYV9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS9uaV92aXNhX3R5cGVzLnRzIiwid2VicGFjazovL1N2aXNhLy4vc3JjL25pLXZpc2EvdmlfY2xvc2UudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS92aV9maW5kX25leHQudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS92aV9maW5kX3JzcmMudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS92aV9nZXRfYXR0cmlidXRlLnRzIiwid2VicGFjazovL1N2aXNhLy4vc3JjL25pLXZpc2Evdmlfb3Blbi50cyIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9uaS12aXNhL3ZpX29wZW5fZGVmYXVsdF9yX20udHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvLi9zcmMvbmktdmlzYS92aV9yZWFkLnRzIiwid2VicGFjazovL1N2aXNhLy4vc3JjL25pLXZpc2Evdmlfd3JpdGUudHMiLCJ3ZWJwYWNrOi8vU3Zpc2EvZXh0ZXJuYWwgY29tbW9uanMgXCJmZmktbmFwaVwiIiwid2VicGFjazovL1N2aXNhL2V4dGVybmFsIGNvbW1vbmpzIFwicmVmLW5hcGlcIiIsIndlYnBhY2s6Ly9TdmlzYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TdmlzYS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIlN2aXNhXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlN2aXNhXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlN2aXNhXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiLy9pbXBvcnQgeyB2aXNhQXN5bmNRdWVyeSwgdmlzYVF1ZXJ5LCB2aXNhUXVlcnlUb1Byb21pc2UgfSBmcm9tICcuL25pLXZpc2EvbmlfdmlzYSdcclxuZXhwb3J0IHsgdmlDbG9zZSB9IGZyb20gJy4vdmlfY2xvc2UnO1xyXG5leHBvcnQgeyB2aU9wZW4gfSBmcm9tICcuL3ZpX29wZW4nO1xyXG5leHBvcnQgeyB2aU9wZW5EZWZhdWx0Uk0gfSBmcm9tICcuL3ZpX29wZW5fZGVmYXVsdF9yX20nO1xyXG5leHBvcnQgeyB2aVJlYWQgfSBmcm9tICcuL3ZpX3JlYWQnO1xyXG5leHBvcnQgeyB2aVdyaXRlIH0gZnJvbSAnLi92aV93cml0ZSc7XHJcbmltcG9ydCB7IE5pVmlzYUNvbnN0YW50cyB9IGZyb20gJy4vbmlfdmlzYV9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyB2aUNsb3NlIH0gZnJvbSAnLi92aV9jbG9zZSc7XHJcbmltcG9ydCB7IFZpRmluZE5leHQgfSBmcm9tICcuL3ZpX2ZpbmRfbmV4dCc7XHJcbmltcG9ydCB7IFZpRmluZFJzcmMgfSBmcm9tICcuL3ZpX2ZpbmRfcnNyYyc7XHJcbmltcG9ydCB7IHZpR2V0QXR0cmlidXRlIH0gZnJvbSAnLi92aV9nZXRfYXR0cmlidXRlJztcclxuaW1wb3J0IHsgdmlPcGVuIH0gZnJvbSAnLi92aV9vcGVuJztcclxuaW1wb3J0IHsgdmlPcGVuRGVmYXVsdFJNIH0gZnJvbSAnLi92aV9vcGVuX2RlZmF1bHRfcl9tJztcclxuXHJcbmV4cG9ydCB0eXBlIFJlc291cmNlTGlzdCA9IHtyZXNvdXJjZU5hbWU6IHN0cmluZywgcHJlc2VudDogYm9vbGVhbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRSZXNvdXJjZXMgPSBhc3luYyAoKTpQcm9taXNlPFJlc291cmNlTGlzdFtdPiA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8UmVzb3VyY2VMaXN0W10+IChhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHZpUmVzb3VyY2VzID0gW11cclxuICAgIGxldCB2aVJlc291cmNlc193aXRoX3ByZXNlbnQgPSBbXVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBvcGVuIGRlZmF1bHQgc2Vzc2lvblxyXG4gICAgICAgIGxldCBkZWZhdWx0Uk0gPSBhd2FpdCB2aU9wZW5EZWZhdWx0Uk0oKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coZGVmYXVsdFJNKVxyXG5cclxuICAgICAgICBsZXQgYXR0ciA9IGF3YWl0IHZpR2V0QXR0cmlidXRlKGRlZmF1bHRSTS5kZWZhdWx0Uk0sTmlWaXNhQ29uc3RhbnRzLlZJX0tUQVRUUl9SRVRVUk5fQUxMKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coYXR0cilcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBsaXN0IG9mIGVxdWlwbWVudCBzZWVuIGJ5IHBjXHJcbiAgICAgICAgbGV0IGZpbmRMaXN0ID0gYXdhaXQgVmlGaW5kUnNyYyhkZWZhdWx0Uk0uZGVmYXVsdFJNLCBcIj8qXCIpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmluZExpc3QpXHJcbiAgICAgICAgdmlSZXNvdXJjZXMucHVzaChmaW5kTGlzdC5pbnN0ckRlc2MpXHJcbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGxpc3Qgb2YgcmVzb3VyY2UgY29sbGVjdGlvbiB0aGUgcmVzb3VyY2UgbmFtZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmluZExpc3QucmV0Y250IC0xOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5leHQgPSBhd2FpdCBWaUZpbmROZXh0KGZpbmRMaXN0LmZpbmRMaXN0KVxyXG4gICAgICAgICAgICB2aVJlc291cmNlcy5wdXNoKG5leHQuaW5zdHJEZXNjKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5IHRoZSByZXNvdXJjZXMgYXJlIHByZXNlbnRcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpUmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhdHRlbXB0aW5nIHRvIG9wZW4gJHt2aVJlc291cmNlc1tpXX1gKVxyXG4gICAgICAgICAgICAvLyBhdHRlbXB0aW5nIHRvIG9wZW4gIFxyXG4gICAgICAgICAgICBsZXQgb3BlbkF0dGVtcHQgPSBhd2FpdCB2aU9wZW4oZGVmYXVsdFJNLmRlZmF1bHRSTSx2aVJlc291cmNlc1tpXSxOaVZpc2FDb25zdGFudHMuVklfTlVMTCxOaVZpc2FDb25zdGFudHMuVklfTlVMTCkgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKG9wZW5BdHRlbXB0LnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2aVJlc291cmNlc193aXRoX3ByZXNlbnQucHVzaCh7cmVzb3VyY2VOYW1lOiB2aVJlc291cmNlc1tpXSwgcHJlc2VudDogdHJ1ZX0pXHJcbiAgICAgICAgICAgICAgICB2aUNsb3NlKG9wZW5BdHRlbXB0LnNlc3Npb24pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2aVJlc291cmNlc193aXRoX3ByZXNlbnQucHVzaCh7cmVzb3VyY2VOYW1lOiB2aVJlc291cmNlc1tpXSwgcHJlc2VudDogZmFsc2V9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpQ2xvc2UoZGVmYXVsdFJNLmRlZmF1bHRSTSlcclxuICAgICAgICByZXNvbHZlKHZpUmVzb3VyY2VzX3dpdGhfcHJlc2VudClcclxuICAgICAgICBcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlamVjdCAoZXJyKVxyXG4gICAgfVxyXG4gICAgfSlcclxufSIsImltcG9ydCB7IHBsYXRmb3JtLCBhcmNoIH0gZnJvbSAnb3MnXHJcbmltcG9ydCB7IExpYnJhcnkgfSBmcm9tICdmZmktbmFwaSdcclxuaW1wb3J0IHsgVmlBY2Nlc3NNb2RlLCBWaUF0dHIsIFZpQXR0clN0YXRlLCBWaUV2ZW50LCBWaUV2ZW50RmlsdGVyLCBWaUV2ZW50VHlwZSwgVmlGaW5kTGlzdCwgVmlPYmplY3QsIFZpUEF0dHJTdGF0ZSwgVmlQQnVmLCBWaVBFdmVudCwgVmlQRXZlbnRUeXBlLCBWaVBGaW5kTGlzdCwgVmlQSm9iSWQsIFZpUE9iamVjdCwgVmlQU2Vzc2lvbiwgVmlQU3RhdHVzLCBWaVBVSW50MTYsIFZpUFVJbnQzMiwgVmlTZXNzaW9uLCBWaVN0YXR1cywgVmlVSW50MTYsIFZpVUludDMyIH0gZnJvbSAnLi9uaV92aXNhX3R5cGVzJ1xyXG5pbXBvcnQgcmVmLCB7IHJlYWRJbnQ2NExFIH0gZnJvbSAncmVmLW5hcGknO1xyXG5cclxuaW1wb3J0IHsgTmlWaXNhQ29uc3RhbnRzIH0gZnJvbSAnLi9uaV92aXNhX2NvbnN0YW50cyc7XHJcbi8vaW1wb3J0IHsgVmlBY2Nlc3NNb2RlIH0gZnJvbSAnLi9uaV92aXNhX2NvbnN0YW50cyc7XHJcbi8vIENob29zZSB0aGUgcHJvcGVyIERMTCBuYW1lXHJcbi8vIGV4cG9ydCBjb25zdCBuaVZpc2EgPSAoZGxsTmFtZTogc3RyaW5nKSA9PiB7XHJcbi8vIFx0cmV0dXJuTGlicmFyeShkbGxOYW1lLCB7XHJcbi8vIFx0XHQvLyBSZXNvdXJjZSBNYW5hZ2VyIEZ1bmN0aW9ucyBhbmQgT3BlcmF0aW9uc1xyXG4vLyBcdFx0J3ZpT3BlbkRlZmF1bHRSTSc6IFtWaVN0YXR1cywgW1ZpUFNlc3Npb25dXSxcclxuLy8gXHRcdCd2aUZpbmRSc3JjJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlQRmluZExpc3QsIFZpUFVJbnQzMiwgJ3N0cmluZyddXSxcclxuLy8gXHRcdCd2aUZpbmROZXh0JzogW1ZpU3RhdHVzLCBbVmlGaW5kTGlzdCwgJ3N0cmluZyddXSxcclxuLy8gXHRcdCd2aVBhcnNlUnNyYyc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpUFVJbnQxNiwgVmlQVUludDE2XV0sXHJcbi8vIFx0XHQndmlQYXJzZVJzcmNFeCc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpUFVJbnQxNiwgVmlQVUludDE2LCAnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnXV0sXHJcbi8vIFx0XHQndmlPcGVuJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlBY2Nlc3NNb2RlLCBWaVVJbnQzMiwgVmlQU2Vzc2lvbl1dLFxyXG4vLyBcdFx0Ly8gUmVzb3VyY2UgVGVtcGxhdGUgT3BlcmF0aW9uc1xyXG4vLyBcdFx0J3ZpQ2xvc2UnOiBbVmlTdGF0dXMsIFtWaU9iamVjdF1dLFxyXG4vLyBcdFx0Ly8gQmFzaWMgSS9PIE9wZXJhdGlvbnNcclxuLy8gXHRcdCd2aVJlYWQnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sIFZpUEJ1ZiwgVmlVSW50MzIsIFZpUFVJbnQzMl1dLFxyXG4vLyBcdFx0J3ZpUmVhZFRvRmlsZSc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpVUludDMyLCBWaVBVSW50MzJdXSxcclxuLy8gXHRcdCd2aVdyaXRlJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlVSW50MzIsIFZpUFVJbnQzMl1dLFxyXG4vLyBcdH0pXHJcbi8vIH1cclxuZXhwb3J0IGNvbnN0IGFnVmlzYSA9IExpYnJhcnkoJy4vYWd2aXNhMzInLCB7XHJcblx0Ly8gUmVzb3VyY2UgTWFuYWdlciBGdW5jdGlvbnMgYW5kIE9wZXJhdGlvbnNcclxuXHQndmlPcGVuRGVmYXVsdFJNJzogW1ZpU3RhdHVzLCBbVmlQU2Vzc2lvbl1dLFxyXG5cdCd2aUZpbmRSc3JjJzogW1ZpU3RhdHVzLCBbVmlVSW50MzIsICdzdHJpbmcnLCBWaVBGaW5kTGlzdCwgVmlQVUludDMyLCAnc3RyaW5nJ11dLFxyXG5cdCd2aUZpbmROZXh0JzogW1ZpU3RhdHVzLCBbVmlGaW5kTGlzdCwgJ3N0cmluZyddXSxcclxuXHQndmlQYXJzZVJzcmMnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVBVSW50MTYsIFZpUFVJbnQxNl1dLFxyXG5cdCd2aVBhcnNlUnNyY0V4JzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlQVUludDE2LCBWaVBVSW50MTYsICdzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZyddXSxcclxuXHQndmlPcGVuJzogW1ZpU3RhdHVzLCBbVmlTZXNzaW9uLCAnc3RyaW5nJywgVmlBY2Nlc3NNb2RlLCBWaVVJbnQzMiwgVmlQU2Vzc2lvbl1dLFxyXG5cdC8vIEdldCBhbmQgU2V0IEF0dHJpYnV0ZXNcclxuXHQndmlTZXRBdHRyaWJ1dGUnOiBbVmlTdGF0dXMsW1ZpU2Vzc2lvbiwgVmlBdHRyLCBWaUF0dHJTdGF0ZV1dLFxyXG5cdCd2aUdldEF0dHJpYnV0ZSc6IFtWaVN0YXR1cyxbVmlTZXNzaW9uLCBWaUF0dHIsIFZpUEF0dHJTdGF0ZV1dLFxyXG5cdC8vIFJlc291cmNlIFRlbXBsYXRlIE9wZXJhdGlvbnNcclxuXHQndmlDbG9zZSc6IFtWaVN0YXR1cywgW1ZpT2JqZWN0XV0sXHJcblx0Ly8gQmFzaWMgSS9PIE9wZXJhdGlvbnNgXHJcblx0J3ZpUmVhZCc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgVmlQQnVmLCBWaVVJbnQzMiwgVmlQVUludDMyXV0sXHJcblx0J3ZpUmVhZFRvRmlsZSc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpVUludDMyLCBWaVBVSW50MzJdXSxcclxuXHQndmlXcml0ZSc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpVUludDMyLCBWaVBVSW50MzJdXSxcclxuXHQvLyBBc3luYyBzdHVmZlxyXG5cdCd2aVJlYWRBc3luYyc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgJ3N0cmluZycsIFZpVUludDMyLCBWaVBKb2JJZF1dLFxyXG5cdCd2aVdyaXRlQXN5bmMnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sICdzdHJpbmcnLCBWaVVJbnQzMiwgVmlQSm9iSWRdXSxcclxuXHJcblx0Ly8gRXZlbnRzXHJcblx0J3ZpRW5hYmxlRXZlbnQnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sIFZpRXZlbnRUeXBlLCBWaVVJbnQxNiwgVmlFdmVudEZpbHRlcl1dLFxyXG5cdCd2aURpc2FibGVFdmVudCc6IFtWaVN0YXR1cywgW1ZpU2Vzc2lvbiwgVmlFdmVudFR5cGUsIFZpVUludDE2XV0sXHJcblx0J3ZpV2FpdE9uRXZlbnQnOiBbVmlTdGF0dXMsIFtWaVNlc3Npb24sIFZpRXZlbnRUeXBlLCBWaVVJbnQzMiwgVmlQRXZlbnRUeXBlLCBWaVBFdmVudF1dLFxyXG5cclxuXHJcbn0pXHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdmlPcGVuRGVmYXVsdFJNKCk6IHsgc3RhdHVzOiBudW1iZXIsIGRlZmF1bHRSTTogbnVtYmVyIH0ge1xyXG5cclxuLy8gXHRsZXQgc3RhdHVzOiBudW1iZXIgPSAxXHJcbi8vIFx0bGV0IHBTZXNuID0gcmVmLmFsbG9jKFZpUFNlc3Npb24pO1xyXG4vLyBcdHN0YXR1cyA9IGFnVmlzYS52aU9wZW5EZWZhdWx0Uk0ocFNlc24pXHJcbi8vIFx0cmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMsIGRlZmF1bHRSTTogcFNlc24ucmVhZEludDMyTEUoKSB9XHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiB2aU9wZW4odmlTZXNzaW9uOiBudW1iZXIsIHZpc2FfcmVzb3VyY2U6IHN0cmluZywgdmlBY2Nlc3NNb2RlOiBudW1iZXIsIHRpbWVvdXQ6IG51bWJlcik6IHsgc3RhdHVzOiBudW1iZXIsIHZpU2Vzc2lvbjogbnVtYmVyIH0ge1xyXG5cclxuLy8gXHRsZXQgcCA9IHJlZi5hbGxvYyhWaVBTZXNzaW9uKTtcclxuLy8gXHRsZXQgc3RhdHVzOiBudW1iZXIgPSAxXHJcbi8vIFx0c3RhdHVzID0gYWdWaXNhLnZpT3Blbih2aVNlc3Npb24sIHZpc2FfcmVzb3VyY2UsIHZpQWNjZXNzTW9kZSwgdGltZW91dCwgcClcclxuLy8gXHRyZXR1cm4geyBzdGF0dXM6IHN0YXR1cywgdmlTZXNzaW9uOiBwLnJlYWRJbnQzMkxFKCkgfVxyXG5cclxuLy8gfVxyXG5cclxuLy8gc1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gdmlSZWFkKHZpU2Vzc2lvbjogbnVtYmVyLCBjb3VudDogbnVtYmVyKTogeyBzdGF0dXM6IG51bWJlciwgcmV0QnVmZjogc3RyaW5nLCByZXRDb3VudDogbnVtYmVyIH0ge1xyXG5cclxuLy8gXHRsZXQgc3RhdHVzOiBudW1iZXIgPSAxXHJcbi8vIFx0bGV0IGJ1ZmYgPSByZWYuYWxsb2MoVmlQQnVmKTtcclxuLy8gXHRsZXQgcmV0Q291bnQgPSByZWYuYWxsb2MoVmlQVUludDMyKTtcclxuLy8gXHRzdGF0dXMgPSBhZ1Zpc2EudmlSZWFkKHZpU2Vzc2lvbiwgYnVmZiwgY291bnQsIHJldENvdW50KVxyXG4vLyBcdHJldHVybiB7XHJcbi8vIFx0XHRzdGF0dXM6IHN0YXR1cyxcclxuLy8gXHRcdHJldEJ1ZmY6IGJ1ZmYucmVhZENTdHJpbmcoKS5zdWJzdHJpbmcoMCwgcmV0Q291bnQucmVhZEludDMyTEUoKSksXHJcbi8vIFx0XHRyZXRDb3VudDogcmV0Q291bnQucmVhZEludDMyTEUoKVxyXG4vLyBcdH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHZpQ2xvc2UodmlPYmplY3Q6IG51bWJlcik6IHsgc3RhdHVzOiBudW1iZXIgfSB7XHJcbi8vIFx0bGV0IHN0YXR1cyA9IGFnVmlzYS52aUNsb3NlKHZpT2JqZWN0KVxyXG4vLyBcdHJldHVybiB7IHN0YXR1czogc3RhdHVzIH1cclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpc2FRdWVyeSh2aXNhQWRkcmVzczogc3RyaW5nLCBxdWVyeVN0cmluZzogc3RyaW5nLCBjYWxsYmFjazogKHN0YXR1czogbnVtYmVyLCByZXR1cm5CdWZmZXI6IHN0cmluZykgPT4gdm9pZCkge1xyXG5cclxuXHRjb25zb2xlLmxvZyhcImhlbGxvXCIpXHJcblx0bGV0IHF1ZXJ5U3RyID0gcXVlcnlTdHJpbmcgKyAnXFxuJztcclxuXHJcblx0bGV0IHN0YXR1czogbnVtYmVyID0gMVxyXG5cdGxldCBwU2VzbiA9IHJlZi5hbGxvYyhWaVBTZXNzaW9uKTtcclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuRGVmYXVsdFJNKHBTZXNuKVxyXG5cclxuXHRpZiAoc3RhdHVzKSByZXR1cm4gY2FsbGJhY2soc3RhdHVzLCBcIjFcIik7XHJcblxyXG5cdC8vIG9wZW4gc2Vzc2lvbiB0byBkZXZpY2VcclxuXHJcblx0bGV0IGRldmljZVNlc3Npb24gPSByZWYuYWxsb2MoVmlQU2Vzc2lvbik7XHJcblx0c3RhdHVzID0gYWdWaXNhLnZpT3BlbihwU2Vzbi5yZWFkSW50MzJMRSgpLCB2aXNhQWRkcmVzcywgMCwgMjAwMCwgZGV2aWNlU2Vzc2lvbilcclxuXHJcblx0aWYgKHN0YXR1cykgcmV0dXJuIGNhbGxiYWNrKHN0YXR1cywgXCIyXCIpO1xyXG5cclxuXHJcblx0Ly8gd3JpdGUgcXVlcnkgdG8gZGV2aWNlXHJcblx0bGV0IGNvdW50ID0gcXVlcnlTdHJpbmcubGVuZ3RoXHJcblx0bGV0IHJldENvdW50ID0gcmVmLmFsbG9jKFZpUFVJbnQzMik7XHJcblx0c3RhdHVzID0gYWdWaXNhLnZpV3JpdGUoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBxdWVyeVN0cmluZywgY291bnQsIHJldENvdW50KVxyXG5cclxuXHRpZiAoc3RhdHVzKSByZXR1cm4gY2FsbGJhY2soc3RhdHVzLCBcIjNcIik7XHJcblx0Ly8gcmVhZCBiYWNrIHF1ZXJ5IHJlc3VsdFxyXG5cclxuXHJcblx0bGV0IGJ1ZmYgPSByZWYuYWxsb2MoVmlQQnVmKTtcclxuXHRyZXRDb3VudCA9IHJlZi5hbGxvYyhWaVBVSW50MzIpO1xyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlSZWFkKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgYnVmZiwgNTEyLCByZXRDb3VudClcclxuXHRsZXQgYnVmZmVyU2l6ZSA9IHJldENvdW50LnJlYWRJbnQzMkxFKClcclxuXHRsZXQgcmV0dXJuQnVmZmVyID0gYnVmZi5yZWFkQ1N0cmluZygpLnN1YnN0cmluZygwLCByZXRDb3VudC5yZWFkSW50MzJMRSgpKVxyXG5cclxuXHRpZiAoc3RhdHVzKSByZXR1cm4gY2FsbGJhY2soc3RhdHVzLCBcIjRcIik7XHJcblx0Ly8gY2xvc2Ugc2Vzc2lvbiBvZiBkZXZpY2UgYW5kIHJlc291cmNlIG1hbmFnZXJcclxuXHRhZ1Zpc2EudmlDbG9zZShkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCkpO1xyXG5cdGFnVmlzYS52aUNsb3NlKHBTZXNuLnJlYWRJbnQzMkxFKCkpO1xyXG5cdC8vIHJldHVybiBxdWVyeSByZXN1bHRcclxuXHRjYWxsYmFjayhzdGF0dXMsIHJldHVybkJ1ZmZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2aXNhQXN5bmNRdWVyeSh2aXNhQWRkcmVzczogc3RyaW5nLCBxdWVyeVN0cmluZzogc3RyaW5nLCBjYWxsYmFjazogKHN0YXR1czogbnVtYmVyLCByZXR1cm5CdWZmZXI6IHN0cmluZykgPT4gdm9pZCkge1xyXG5cclxuXHQvL2NvbnNvbGUubG9nKFwiaGVsbG9cIilcclxuXHRsZXQgcXVlcnlTdHIgPSBxdWVyeVN0cmluZyArICdcXG4nO1xyXG5cclxuXHRsZXQgc3RhdHVzOiBudW1iZXIgPSAxXHJcblx0bGV0IHBTZXNuID0gcmVmLmFsbG9jKFZpUFNlc3Npb24pO1xyXG5cdHN0YXR1cyA9IGFnVmlzYS52aU9wZW5EZWZhdWx0Uk0ocFNlc24pXHJcblxyXG5cdGlmIChzdGF0dXMpIHJldHVybiBjYWxsYmFjayhzdGF0dXMsIFwiMVwiKTtcclxuXHJcblx0Ly8gb3BlbiBzZXNzaW9uIHRvIGRldmljZVxyXG5cclxuXHRsZXQgZGV2aWNlU2Vzc2lvbiA9IHJlZi5hbGxvYyhWaVBTZXNzaW9uKTtcclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlPcGVuKHBTZXNuLnJlYWRJbnQzMkxFKCksIHZpc2FBZGRyZXNzLCAwLCAyMDAwLCBkZXZpY2VTZXNzaW9uKVxyXG5cclxuXHRpZiAoc3RhdHVzKSByZXR1cm4gY2FsbGJhY2soc3RhdHVzLCBcIjJcIik7XHJcblxyXG5cclxuXHQvLyB3cml0ZSBxdWVyeSB0byBkZXZpY2VcclxuXHRsZXQgY291bnQgPSBxdWVyeVN0cmluZy5sZW5ndGhcclxuXHRsZXQgcmV0Q291bnQgPSByZWYuYWxsb2MoVmlQVUludDMyKTtcclxuXHQvLyBFbmFibGUgdGhlIHRoZSBldmVudFxyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlFbmFibGVFdmVudChkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9FVkVOVF9JT19DT01QTEVUSU9OLCBOaVZpc2FDb25zdGFudHMuVklfUVVFVUUsIE5pVmlzYUNvbnN0YW50cy5WSV9OVUxMKVxyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlXcml0ZShkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIHF1ZXJ5U3RyaW5nLCBjb3VudCwgcmV0Q291bnQpXHJcblxyXG5cdGlmIChzdGF0dXMpIHJldHVybiBjYWxsYmFjayhzdGF0dXMsIFwiM1wiKTtcclxuXHQvLyByZWFkIGJhY2sgcXVlcnkgcmVzdWx0XHJcblxyXG5cclxuXHJcblx0bGV0IGJ1ZmYgPSByZWYuYWxsb2MoVmlQQnVmKTtcclxuXHRsZXQgaklkID0gcmVmLmFsbG9jKFZpUEpvYklkKTtcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpUmVhZEFzeW5jKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgYnVmZiBhcyBhbnksIDUxMiwgaklkKVxyXG5cclxuXHRsZXQgam9iSWQgPSBqSWQucmVhZEludDMyTEUoKVxyXG5cdC8vY29uc29sZS5sb2coYEpvYklkOiAke2pvYklkfWApXHJcblxyXG5cdGxldCBldmVudFR5cGUgPSByZWYuYWxsb2MoVmlQRXZlbnRUeXBlKTtcclxuXHRsZXQgZXZlbnRDb250ZXh0ID0gcmVmLmFsbG9jKFZpUEV2ZW50KVxyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlXYWl0T25FdmVudChkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9FVkVOVF9JT19DT01QTEVUSU9OLCAyMDAwLCBldmVudFR5cGUsIGV2ZW50Q29udGV4dClcclxuXHQvL1xyXG5cclxuXHQvL2xldCByZXR1cm5CdWZmZXIgPSBidWZmLnJlYWRDU3RyaW5nKCkuc3Vic3RyaW5nKDAscmV0Q291bnQucmVhZEludDMyTEUoKSlcclxuXHJcblx0Ly9jb25zb2xlLmxvZyhgQ29tcGxldGVkYClcclxuXHJcblx0bGV0IGV2ZW50UFJldHVybmVkRXZlbnRUeXBlID0gcmVmLmFsbG9jKFZpUE9iamVjdClcclxuXHRsZXQgZXZlbnRQSm9iSWQgPSByZWYuYWxsb2MoVmlQSm9iSWQpXHJcblx0bGV0IGV2ZW50UFJldHVyblBTdGF0dXMgPSByZWYuYWxsb2MoVmlQU3RhdHVzKVxyXG5cdGxldCBldmVudFBSZXR1cm5Db3VudCA9IHJlZi5hbGxvYyhWaVBVSW50MzIpXHJcblx0bGV0IGV2ZW50UFJldHVybmVkQnVmZmVyID0gcmVmLmFsbG9jKFZpUEJ1ZilcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9FVkVOVF9UWVBFLCBldmVudFBSZXR1cm5lZEV2ZW50VHlwZSlcclxuXHRsZXQgZXZlbnRSZXR1cm5lZEV2ZW50VHlwZSA9IGV2ZW50UFJldHVybmVkRXZlbnRUeXBlLnJlYWRJbnQzMkxFKClcclxuXHQvL2NvbnNvbGUubG9nKGBldmVudFJldHVybmVkRXZlbnRUeXBlOiAke2V2ZW50UmV0dXJuZWRFdmVudFR5cGV9YClcclxuXHJcblx0c3RhdHVzID0gYWdWaXNhLnZpR2V0QXR0cmlidXRlKGV2ZW50Q29udGV4dC5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfQVRUUl9KT0JfSUQsIGV2ZW50UEpvYklkKVxyXG5cdGxldCBldmVudEpvYklkID0gZXZlbnRQSm9iSWQucmVhZEludDMyTEUoKVxyXG5cdC8vY29uc29sZS5sb2coYGV2ZW50Sm9iSWQ6ICR7ZXZlbnRKb2JJZH1gKVxyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX1NUQVRVUywgZXZlbnRQUmV0dXJuUFN0YXR1cylcclxuXHRsZXQgcmV0dXJuU3RhdHVzID0gZXZlbnRQUmV0dXJuUFN0YXR1cy5yZWFkSW50MzJMRSgpXHJcblx0Ly9jb25zb2xlLmxvZyhgcmV0dXJuU3RhdHVzOiAke3JldHVyblN0YXR1c31gKVxyXG5cclxuXHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX1JFVF9DT1VOVCwgZXZlbnRQUmV0dXJuQ291bnQpXHJcblx0bGV0IGV2ZW50UmV0dXJuQ291bnQgPSBldmVudFBSZXR1cm5Db3VudC5yZWFkSW50MzJMRSgpXHJcblx0Ly9jb25zb2xlLmxvZyhgZXZlbnRSZXR1cm5Db3VudDogJHtldmVudFJldHVybkNvdW50fWApXHJcblxyXG5cdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfQlVGRkVSLCBldmVudFBSZXR1cm5lZEJ1ZmZlcilcclxuXHRsZXQgUmV0dXJuQnVmZmVyID0gYnVmZi5yZWFkQ1N0cmluZygpLnN1YnN0cmluZygwLCBldmVudFJldHVybkNvdW50KVxyXG5cdC8vY29uc29sZS5sb2coYFJldHVybkJ1ZmZlcjogJHtSZXR1cm5CdWZmZXJ9YClcclxuXHJcblx0aWYgKHN0YXR1cykgcmV0dXJuIGNhbGxiYWNrKHN0YXR1cywgXCI0XCIpO1xyXG5cdC8vIGNsb3NlIHNlc3Npb24gb2YgZGV2aWNlIGFuZCByZXNvdXJjZSBtYW5hZ2VyXHJcblx0YWdWaXNhLnZpQ2xvc2UoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCkpO1xyXG5cdGFnVmlzYS52aUNsb3NlKGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSk7XHJcblx0YWdWaXNhLnZpQ2xvc2UocFNlc24ucmVhZEludDMyTEUoKSk7XHJcblx0Ly8gcmV0dXJuIHF1ZXJ5IHJlc3VsdFxyXG5cdGNhbGxiYWNrKHN0YXR1cywgUmV0dXJuQnVmZmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpc2FRdWVyeVRvUHJvbWlzZSh2aXNhQWRkcmVzczogc3RyaW5nLCBxdWVyeVN0cmluZzogc3RyaW5nLCk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcImhlbGxvXCIpXHJcblx0XHRsZXQgcXVlcnlTdHIgPSBxdWVyeVN0cmluZyArICdcXG4nO1xyXG5cclxuXHRcdGxldCBzdGF0dXM6IG51bWJlciA9IDFcclxuXHRcdGxldCBwU2VzbiA9IHJlZi5hbGxvYyhWaVBTZXNzaW9uKTtcclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aU9wZW5EZWZhdWx0Uk0ocFNlc24pXHJcblxyXG5cdFx0aWYgKHN0YXR1cykge1xyXG5cdFx0XHRyZWplY3Qoc3RhdHVzKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIG9wZW4gc2Vzc2lvbiB0byBkZXZpY2VcclxuXHJcblx0XHRsZXQgZGV2aWNlU2Vzc2lvbiA9IHJlZi5hbGxvYyhWaVBTZXNzaW9uKTtcclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aU9wZW4ocFNlc24ucmVhZEludDMyTEUoKSwgdmlzYUFkZHJlc3MsIDAsIDIwMDAsIGRldmljZVNlc3Npb24pXHJcblxyXG5cdFx0aWYgKHN0YXR1cykge1xyXG5cdFx0XHRyZWplY3Qoc3RhdHVzKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHdyaXRlIHF1ZXJ5IHRvIGRldmljZVxyXG5cdFx0bGV0IGNvdW50ID0gcXVlcnlTdHJpbmcubGVuZ3RoXHJcblx0XHRsZXQgcmV0Q291bnQgPSByZWYuYWxsb2MoVmlQVUludDMyKTtcclxuXHRcdC8vIEVuYWJsZSB0aGUgdGhlIGV2ZW50XHJcblxyXG5cdFx0c3RhdHVzID0gYWdWaXNhLnZpRW5hYmxlRXZlbnQoZGV2aWNlU2Vzc2lvbi5yZWFkSW50MzJMRSgpLCBOaVZpc2FDb25zdGFudHMuVklfRVZFTlRfSU9fQ09NUExFVElPTiwgTmlWaXNhQ29uc3RhbnRzLlZJX1FVRVVFLCBOaVZpc2FDb25zdGFudHMuVklfTlVMTClcclxuXHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlXcml0ZShkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIHF1ZXJ5U3RyaW5nLCBjb3VudCwgcmV0Q291bnQpXHJcblxyXG5cdFx0aWYgKHN0YXR1cykge1xyXG5cdFx0XHRyZWplY3Qoc3RhdHVzKVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvL2xldCBidWZmID0gcmVmLmFsbG9jKFZpUEJ1Zik7XHJcblx0XHRsZXQgYnVmZiA9IG5ldyBCdWZmZXIoNTEyKTtcclxuXHRcdGxldCBqSWQgPSByZWYuYWxsb2MoVmlQSm9iSWQpO1xyXG5cclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aVJlYWRBc3luYyhkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCksIGJ1ZmYgYXMgYW55LCA1MTIsIGpJZClcclxuXHJcblx0XHRsZXQgam9iSWQgPSBqSWQucmVhZEludDMyTEUoKVxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgSm9iSWQ6ICR7am9iSWR9YClcclxuXHJcblx0XHRsZXQgZXZlbnRUeXBlID0gcmVmLmFsbG9jKFZpUEV2ZW50VHlwZSk7XHJcblx0XHRsZXQgZXZlbnRDb250ZXh0ID0gcmVmLmFsbG9jKFZpUEV2ZW50KVxyXG5cclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aVdhaXRPbkV2ZW50KGRldmljZVNlc3Npb24ucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0VWRU5UX0lPX0NPTVBMRVRJT04sIDIwMDAsIGV2ZW50VHlwZSwgZXZlbnRDb250ZXh0KVxyXG5cdFx0Ly9cclxuXHJcblx0XHQvL2xldCByZXR1cm5CdWZmZXIgPSBidWZmLnJlYWRDU3RyaW5nKCkuc3Vic3RyaW5nKDAscmV0Q291bnQucmVhZEludDMyTEUoKSlcclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKGBDb21wbGV0ZWRgKVxyXG5cclxuXHRcdGxldCBldmVudFBSZXR1cm5lZEV2ZW50VHlwZSA9IHJlZi5hbGxvYyhWaVBPYmplY3QpXHJcblx0XHRsZXQgZXZlbnRQSm9iSWQgPSByZWYuYWxsb2MoVmlQSm9iSWQpXHJcblx0XHRsZXQgZXZlbnRQUmV0dXJuUFN0YXR1cyA9IHJlZi5hbGxvYyhWaVBTdGF0dXMpXHJcblx0XHRsZXQgZXZlbnRQUmV0dXJuQ291bnQgPSByZWYuYWxsb2MoVmlQVUludDMyKVxyXG5cdFx0bGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoMjUwKVxyXG5cdFx0Ly9sZXQgZXZlbnRQUmV0dXJuZWRCdWZmZXIgPSByZWYucmVmKFZpUEJ1ZilcclxuXHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX0VWRU5UX1RZUEUsIGV2ZW50UFJldHVybmVkRXZlbnRUeXBlKVxyXG5cdFx0bGV0IGV2ZW50UmV0dXJuZWRFdmVudFR5cGUgPSBldmVudFBSZXR1cm5lZEV2ZW50VHlwZS5yZWFkSW50MzJMRSgpXHJcblx0XHQvL2NvbnNvbGUubG9nKGBldmVudFJldHVybmVkRXZlbnRUeXBlOiAke2V2ZW50UmV0dXJuZWRFdmVudFR5cGV9YClcclxuXHJcblx0XHRzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX0pPQl9JRCwgZXZlbnRQSm9iSWQpXHJcblx0XHRsZXQgZXZlbnRKb2JJZCA9IGV2ZW50UEpvYklkLnJlYWRJbnQzMkxFKClcclxuXHRcdC8vY29uc29sZS5sb2coYGV2ZW50Sm9iSWQ6ICR7ZXZlbnRKb2JJZH1gKVxyXG5cclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfU1RBVFVTLCBldmVudFBSZXR1cm5QU3RhdHVzKVxyXG5cdFx0bGV0IHJldHVyblN0YXR1cyA9IGV2ZW50UFJldHVyblBTdGF0dXMucmVhZEludDMyTEUoKVxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgcmV0dXJuU3RhdHVzOiAke3JldHVyblN0YXR1c31gKVxyXG5cclxuXHRcdHN0YXR1cyA9IGFnVmlzYS52aUdldEF0dHJpYnV0ZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSwgTmlWaXNhQ29uc3RhbnRzLlZJX0FUVFJfUkVUX0NPVU5ULCBldmVudFBSZXR1cm5Db3VudClcclxuXHRcdGxldCBldmVudFJldHVybkNvdW50ID0gZXZlbnRQUmV0dXJuQ291bnQucmVhZEludDMyTEUoKVxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgZXZlbnRSZXR1cm5Db3VudDogJHtldmVudFJldHVybkNvdW50fWApXHJcblxyXG5cdFx0Ly9zdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUoZXZlbnRDb250ZXh0LnJlYWRJbnQzMkxFKCksIE5pVmlzYUNvbnN0YW50cy5WSV9BVFRSX0JVRkZFUiwgYnVmZmVyKVxyXG5cdFx0bGV0IFJldHVybkJ1ZmZlciA9IGJ1ZmYucmVhZENTdHJpbmcoKVxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgUmV0dXJuQnVmZmVyOiAke1JldHVybkJ1ZmZlcn1gKVxyXG5cclxuXHRcdGlmIChzdGF0dXMpIHtcclxuXHRcdFx0cmVqZWN0KHN0YXR1cylcclxuXHRcdH1cclxuXHRcdC8vIGNsb3NlIHNlc3Npb24gb2YgZGV2aWNlIGFuZCByZXNvdXJjZSBtYW5hZ2VyXHJcblx0XHRhZ1Zpc2EudmlDbG9zZShldmVudENvbnRleHQucmVhZEludDMyTEUoKSk7XHJcblx0XHRhZ1Zpc2EudmlDbG9zZShkZXZpY2VTZXNzaW9uLnJlYWRJbnQzMkxFKCkpO1xyXG5cdFx0YWdWaXNhLnZpQ2xvc2UocFNlc24ucmVhZEludDMyTEUoKSk7XHJcblx0XHQvLyByZXR1cm4gcXVlcnkgcmVzdWx0XHJcblx0XHRyZXNvbHZlKFJldHVybkJ1ZmZlcik7XHJcblxyXG5cdH0pXHJcbn0iLCJleHBvcnQgZW51bSBWaUFjY2Vzc01vZGUge1xyXG5cdFZJX05PX0xPQ0sgPSAoMCksXHJcblx0VklfRVhDTFVTSVZFX0xPQ0sgPSAoMSksXHJcblx0VklfU0hBUkVEX0xPQ0sgPSAoMiksXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE5pVmlzYUNvbnN0YW50cyB7XHJcblxyXG5cdFZJX05VTEwgPSAoMHgwKSxcclxuICAgIFZJX0VSUk9SID0gMHg4MDAwMDAwMCxcclxuXHJcblx0VklfU1BFQ19WRVJTSU9OID0gKDB4MDA1MDA4MDApLFxyXG5cclxuXHRWSV9BVFRSX1JTUkNfQ0xBU1MgPSAoMHhCRkZGMDAwMSksXHJcblx0VklfQVRUUl9SU1JDX05BTUUgPSAoMHhCRkZGMDAwMiksXHJcblx0VklfQVRUUl9SU1JDX0lNUExfVkVSU0lPTiA9ICgweDNGRkYwMDAzKSxcclxuXHRWSV9BVFRSX1JTUkNfTE9DS19TVEFURSA9ICgweDNGRkYwMDA0KSxcclxuXHRWSV9BVFRSX01BWF9RVUVVRV9MRU5HVEggPSAoMHgzRkZGMDAwNSksXHJcblx0VklfQVRUUl9VU0VSX0RBVEFfMzIgPSAoMHgzRkZGMDAwNyksXHJcblx0VklfQVRUUl9GRENfQ0hOTCA9ICgweDNGRkYwMDBEKSxcclxuXHRWSV9BVFRSX0ZEQ19NT0RFID0gKDB4M0ZGRjAwMEYpLFxyXG5cdFZJX0FUVFJfRkRDX0dFTl9TSUdOQUxfRU4gPSAoMHgzRkZGMDAxMSksXHJcblx0VklfQVRUUl9GRENfVVNFX1BBSVIgPSAoMHgzRkZGMDAxMyksXHJcblx0VklfQVRUUl9TRU5EX0VORF9FTiA9ICgweDNGRkYwMDE2KSxcclxuXHRWSV9BVFRSX1RFUk1DSEFSID0gKDB4M0ZGRjAwMTgpLFxyXG5cdFZJX0FUVFJfVE1PX1ZBTFVFID0gKDB4M0ZGRjAwMUEpLFxyXG5cdFZJX0FUVFJfR1BJQl9SRUFERFJfRU4gPSAoMHgzRkZGMDAxQiksXHJcblx0VklfQVRUUl9JT19QUk9UID0gKDB4M0ZGRjAwMUMpLFxyXG5cdFZJX0FUVFJfRE1BX0FMTE9XX0VOID0gKDB4M0ZGRjAwMUUpLFxyXG5cdFZJX0FUVFJfQVNSTF9CQVVEID0gKDB4M0ZGRjAwMjEpLFxyXG5cdFZJX0FUVFJfQVNSTF9EQVRBX0JJVFMgPSAoMHgzRkZGMDAyMiksXHJcblx0VklfQVRUUl9BU1JMX1BBUklUWSA9ICgweDNGRkYwMDIzKSxcclxuXHRWSV9BVFRSX0FTUkxfU1RPUF9CSVRTID0gKDB4M0ZGRjAwMjQpLFxyXG5cdFZJX0FUVFJfQVNSTF9GTE9XX0NOVFJMID0gKDB4M0ZGRjAwMjUpLFxyXG5cdFZJX0FUVFJfUkRfQlVGX09QRVJfTU9ERSA9ICgweDNGRkYwMDJBKSxcclxuXHRWSV9BVFRSX1JEX0JVRl9TSVpFID0gKDB4M0ZGRjAwMkIpLFxyXG5cdFZJX0FUVFJfV1JfQlVGX09QRVJfTU9ERSA9ICgweDNGRkYwMDJEKSxcclxuXHRWSV9BVFRSX1dSX0JVRl9TSVpFID0gKDB4M0ZGRjAwMkUpLFxyXG5cdFZJX0FUVFJfU1VQUFJFU1NfRU5EX0VOID0gKDB4M0ZGRjAwMzYpLFxyXG5cdFZJX0FUVFJfVEVSTUNIQVJfRU4gPSAoMHgzRkZGMDAzOCksXHJcblx0VklfQVRUUl9ERVNUX0FDQ0VTU19QUklWID0gKDB4M0ZGRjAwMzkpLFxyXG5cdFZJX0FUVFJfREVTVF9CWVRFX09SREVSID0gKDB4M0ZGRjAwM0EpLFxyXG5cdFZJX0FUVFJfU1JDX0FDQ0VTU19QUklWID0gKDB4M0ZGRjAwM0MpLFxyXG5cdFZJX0FUVFJfU1JDX0JZVEVfT1JERVIgPSAoMHgzRkZGMDAzRCksXHJcblx0VklfQVRUUl9TUkNfSU5DUkVNRU5UID0gKDB4M0ZGRjAwNDApLFxyXG5cdFZJX0FUVFJfREVTVF9JTkNSRU1FTlQgPSAoMHgzRkZGMDA0MSksXHJcblx0VklfQVRUUl9XSU5fQUNDRVNTX1BSSVYgPSAoMHgzRkZGMDA0NSksXHJcblx0VklfQVRUUl9XSU5fQllURV9PUkRFUiA9ICgweDNGRkYwMDQ3KSxcclxuXHRWSV9BVFRSX0dQSUJfQVROX1NUQVRFID0gKDB4M0ZGRjAwNTcpLFxyXG5cdFZJX0FUVFJfR1BJQl9BRERSX1NUQVRFID0gKDB4M0ZGRjAwNUMpLFxyXG5cdFZJX0FUVFJfR1BJQl9DSUNfU1RBVEUgPSAoMHgzRkZGMDA1RSksXHJcblx0VklfQVRUUl9HUElCX05EQUNfU1RBVEUgPSAoMHgzRkZGMDA2MiksXHJcblx0VklfQVRUUl9HUElCX1NSUV9TVEFURSA9ICgweDNGRkYwMDY3KSxcclxuXHRWSV9BVFRSX0dQSUJfU1lTX0NOVFJMX1NUQVRFID0gKDB4M0ZGRjAwNjgpLFxyXG5cdFZJX0FUVFJfR1BJQl9IUzQ4OF9DQkxfTEVOID0gKDB4M0ZGRjAwNjkpLFxyXG5cdFZJX0FUVFJfQ01EUl9MQSA9ICgweDNGRkYwMDZCKSxcclxuXHRWSV9BVFRSX1ZYSV9ERVZfQ0xBU1MgPSAoMHgzRkZGMDA2QyksXHJcblx0VklfQVRUUl9NQUlORlJBTUVfTEEgPSAoMHgzRkZGMDA3MCksXHJcblx0VklfQVRUUl9NQU5GX05BTUUgPSAoMHhCRkZGMDA3MiksXHJcblx0VklfQVRUUl9NT0RFTF9OQU1FID0gKDB4QkZGRjAwNzcpLFxyXG5cdFZJX0FUVFJfVlhJX1ZNRV9JTlRSX1NUQVRVUyA9ICgweDNGRkYwMDhCKSxcclxuXHRWSV9BVFRSX1ZYSV9UUklHX1NUQVRVUyA9ICgweDNGRkYwMDhEKSxcclxuXHRWSV9BVFRSX1ZYSV9WTUVfU1lTRkFJTF9TVEFURSA9ICgweDNGRkYwMDk0KSxcclxuXHRWSV9BVFRSX1dJTl9CQVNFX0FERFJfMzIgPSAoMHgzRkZGMDA5OCksXHJcblx0VklfQVRUUl9XSU5fU0laRV8zMiA9ICgweDNGRkYwMDlBKSxcclxuXHRWSV9BVFRSX0FTUkxfQVZBSUxfTlVNID0gKDB4M0ZGRjAwQUMpLFxyXG5cdFZJX0FUVFJfTUVNX0JBU0VfMzIgPSAoMHgzRkZGMDBBRCksXHJcblx0VklfQVRUUl9BU1JMX0NUU19TVEFURSA9ICgweDNGRkYwMEFFKSxcclxuXHRWSV9BVFRSX0FTUkxfRENEX1NUQVRFID0gKDB4M0ZGRjAwQUYpLFxyXG5cdFZJX0FUVFJfQVNSTF9EU1JfU1RBVEUgPSAoMHgzRkZGMDBCMSksXHJcblx0VklfQVRUUl9BU1JMX0RUUl9TVEFURSA9ICgweDNGRkYwMEIyKSxcclxuXHRWSV9BVFRSX0FTUkxfRU5EX0lOID0gKDB4M0ZGRjAwQjMpLFxyXG5cdFZJX0FUVFJfQVNSTF9FTkRfT1VUID0gKDB4M0ZGRjAwQjQpLFxyXG5cdFZJX0FUVFJfQVNSTF9SRVBMQUNFX0NIQVIgPSAoMHgzRkZGMDBCRSksXHJcblx0VklfQVRUUl9BU1JMX1JJX1NUQVRFID0gKDB4M0ZGRjAwQkYpLFxyXG5cdFZJX0FUVFJfQVNSTF9SVFNfU1RBVEUgPSAoMHgzRkZGMDBDMCksXHJcblx0VklfQVRUUl9BU1JMX1hPTl9DSEFSID0gKDB4M0ZGRjAwQzEpLFxyXG5cdFZJX0FUVFJfQVNSTF9YT0ZGX0NIQVIgPSAoMHgzRkZGMDBDMiksXHJcblx0VklfQVRUUl9XSU5fQUNDRVNTID0gKDB4M0ZGRjAwQzMpLFxyXG5cdFZJX0FUVFJfUk1fU0VTU0lPTiA9ICgweDNGRkYwMEM0KSxcclxuXHRWSV9BVFRSX1ZYSV9MQSA9ICgweDNGRkYwMEQ1KSxcclxuXHRWSV9BVFRSX01BTkZfSUQgPSAoMHgzRkZGMDBEOSksXHJcblx0VklfQVRUUl9NRU1fU0laRV8zMiA9ICgweDNGRkYwMEREKSxcclxuXHRWSV9BVFRSX01FTV9TUEFDRSA9ICgweDNGRkYwMERFKSxcclxuXHRWSV9BVFRSX01PREVMX0NPREUgPSAoMHgzRkZGMDBERiksXHJcblx0VklfQVRUUl9TTE9UID0gKDB4M0ZGRjAwRTgpLFxyXG5cdFZJX0FUVFJfSU5URl9JTlNUX05BTUUgPSAoMHhCRkZGMDBFOSksXHJcblx0VklfQVRUUl9JTU1FRElBVEVfU0VSViA9ICgweDNGRkYwMTAwKSxcclxuXHRWSV9BVFRSX0lOVEZfUEFSRU5UX05VTSA9ICgweDNGRkYwMTAxKSxcclxuXHRWSV9BVFRSX1JTUkNfU1BFQ19WRVJTSU9OID0gKDB4M0ZGRjAxNzApLFxyXG5cdFZJX0FUVFJfSU5URl9UWVBFID0gKDB4M0ZGRjAxNzEpLFxyXG5cdFZJX0FUVFJfR1BJQl9QUklNQVJZX0FERFIgPSAoMHgzRkZGMDE3MiksXHJcblx0VklfQVRUUl9HUElCX1NFQ09OREFSWV9BRERSID0gKDB4M0ZGRjAxNzMpLFxyXG5cdFZJX0FUVFJfUlNSQ19NQU5GX05BTUUgPSAoMHhCRkZGMDE3NCksXHJcblx0VklfQVRUUl9SU1JDX01BTkZfSUQgPSAoMHgzRkZGMDE3NSksXHJcblx0VklfQVRUUl9JTlRGX05VTSA9ICgweDNGRkYwMTc2KSxcclxuXHRWSV9BVFRSX1RSSUdfSUQgPSAoMHgzRkZGMDE3NyksXHJcblx0VklfQVRUUl9HUElCX1JFTl9TVEFURSA9ICgweDNGRkYwMTgxKSxcclxuXHRWSV9BVFRSX0dQSUJfVU5BRERSX0VOID0gKDB4M0ZGRjAxODQpLFxyXG5cdFZJX0FUVFJfREVWX1NUQVRVU19CWVRFID0gKDB4M0ZGRjAxODkpLFxyXG5cdFZJX0FUVFJfRklMRV9BUFBFTkRfRU4gPSAoMHgzRkZGMDE5MiksXHJcblx0VklfQVRUUl9WWElfVFJJR19TVVBQT1JUID0gKDB4M0ZGRjAxOTQpLFxyXG5cdFZJX0FUVFJfVENQSVBfQUREUiA9ICgweEJGRkYwMTk1KSxcclxuXHRWSV9BVFRSX1RDUElQX0hPU1ROQU1FID0gKDB4QkZGRjAxOTYpLFxyXG5cdFZJX0FUVFJfVENQSVBfUE9SVCA9ICgweDNGRkYwMTk3KSxcclxuXHRWSV9BVFRSX1RDUElQX0RFVklDRV9OQU1FID0gKDB4QkZGRjAxOTkpLFxyXG5cdFZJX0FUVFJfVENQSVBfTk9ERUxBWSA9ICgweDNGRkYwMTlBKSxcclxuXHRWSV9BVFRSX1RDUElQX0tFRVBBTElWRSA9ICgweDNGRkYwMTlCKSxcclxuXHRWSV9BVFRSXzQ4ODJfQ09NUExJQU5UID0gKDB4M0ZGRjAxOUYpLFxyXG5cdFZJX0FUVFJfVVNCX1NFUklBTF9OVU0gPSAoMHhCRkZGMDFBMCksXHJcblx0VklfQVRUUl9VU0JfSU5URkNfTlVNID0gKDB4M0ZGRjAxQTEpLFxyXG5cdFZJX0FUVFJfVVNCX1BST1RPQ09MID0gKDB4M0ZGRjAxQTcpLFxyXG5cdFZJX0FUVFJfVVNCX01BWF9JTlRSX1NJWkUgPSAoMHgzRkZGMDFBRiksXHJcblx0VklfQVRUUl9QWElfREVWX05VTSA9ICgweDNGRkYwMjAxKSxcclxuXHRWSV9BVFRSX1BYSV9GVU5DX05VTSA9ICgweDNGRkYwMjAyKSxcclxuXHRWSV9BVFRSX1BYSV9CVVNfTlVNID0gKDB4M0ZGRjAyMDUpLFxyXG5cdFZJX0FUVFJfUFhJX0NIQVNTSVMgPSAoMHgzRkZGMDIwNiksXHJcblx0VklfQVRUUl9QWElfU0xPVFBBVEggPSAoMHhCRkZGMDIwNyksXHJcblx0VklfQVRUUl9QWElfU0xPVF9MQlVTX0xFRlQgPSAoMHgzRkZGMDIwOCksXHJcblx0VklfQVRUUl9QWElfU0xPVF9MQlVTX1JJR0hUID0gKDB4M0ZGRjAyMDkpLFxyXG5cdFZJX0FUVFJfUFhJX1RSSUdfQlVTID0gKDB4M0ZGRjAyMEEpLFxyXG5cdFZJX0FUVFJfUFhJX1NUQVJfVFJJR19CVVMgPSAoMHgzRkZGMDIwQiksXHJcblx0VklfQVRUUl9QWElfU1RBUl9UUklHX0xJTkUgPSAoMHgzRkZGMDIwQyksXHJcblx0VklfQVRUUl9QWElfU1JDX1RSSUdfQlVTID0gKDB4M0ZGRjAyMEQpLFxyXG5cdFZJX0FUVFJfUFhJX0RFU1RfVFJJR19CVVMgPSAoMHgzRkZGMDIwRSksXHJcblx0VklfQVRUUl9QWElfTUVNX1RZUEVfQkFSMCA9ICgweDNGRkYwMjExKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fVFlQRV9CQVIxID0gKDB4M0ZGRjAyMTIpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9UWVBFX0JBUjIgPSAoMHgzRkZGMDIxMyksXHJcblx0VklfQVRUUl9QWElfTUVNX1RZUEVfQkFSMyA9ICgweDNGRkYwMjE0KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fVFlQRV9CQVI0ID0gKDB4M0ZGRjAyMTUpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9UWVBFX0JBUjUgPSAoMHgzRkZGMDIxNiksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSMF8zMiA9ICgweDNGRkYwMjIxKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVIxXzMyID0gKDB4M0ZGRjAyMjIpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjJfMzIgPSAoMHgzRkZGMDIyMyksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSM18zMiA9ICgweDNGRkYwMjI0KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVI0XzMyID0gKDB4M0ZGRjAyMjUpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjVfMzIgPSAoMHgzRkZGMDIyNiksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSMF82NCA9ICgweDNGRkYwMjI4KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVIxXzY0ID0gKDB4M0ZGRjAyMjkpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjJfNjQgPSAoMHgzRkZGMDIyQSksXHJcblx0VklfQVRUUl9QWElfTUVNX0JBU0VfQkFSM182NCA9ICgweDNGRkYwMjJCKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fQkFTRV9CQVI0XzY0ID0gKDB4M0ZGRjAyMkMpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9CQVNFX0JBUjVfNjQgPSAoMHgzRkZGMDIyRCksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSMF8zMiA9ICgweDNGRkYwMjMxKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVIxXzMyID0gKDB4M0ZGRjAyMzIpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjJfMzIgPSAoMHgzRkZGMDIzMyksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSM18zMiA9ICgweDNGRkYwMjM0KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVI0XzMyID0gKDB4M0ZGRjAyMzUpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjVfMzIgPSAoMHgzRkZGMDIzNiksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSMF82NCA9ICgweDNGRkYwMjM4KSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVIxXzY0ID0gKDB4M0ZGRjAyMzkpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjJfNjQgPSAoMHgzRkZGMDIzQSksXHJcblx0VklfQVRUUl9QWElfTUVNX1NJWkVfQkFSM182NCA9ICgweDNGRkYwMjNCKSxcclxuXHRWSV9BVFRSX1BYSV9NRU1fU0laRV9CQVI0XzY0ID0gKDB4M0ZGRjAyM0MpLFxyXG5cdFZJX0FUVFJfUFhJX01FTV9TSVpFX0JBUjVfNjQgPSAoMHgzRkZGMDIzRCksXHJcblx0VklfQVRUUl9QWElfSVNfRVhQUkVTUyA9ICgweDNGRkYwMjQwKSxcclxuXHRWSV9BVFRSX1BYSV9TTE9UX0xXSURUSCA9ICgweDNGRkYwMjQxKSxcclxuXHRWSV9BVFRSX1BYSV9NQVhfTFdJRFRIID0gKDB4M0ZGRjAyNDIpLFxyXG5cdFZJX0FUVFJfUFhJX0FDVFVBTF9MV0lEVEggPSAoMHgzRkZGMDI0MyksXHJcblx0VklfQVRUUl9QWElfRFNUQVJfQlVTID0gKDB4M0ZGRjAyNDQpLFxyXG5cdFZJX0FUVFJfUFhJX0RTVEFSX1NFVCA9ICgweDNGRkYwMjQ1KSxcclxuXHRWSV9BVFRSX1BYSV9BTExPV19XUklURV9DT01CSU5FID0gKDB4M0ZGRjAyNDYpLFxyXG5cdFZJX0FUVFJfVENQSVBfSElTTElQX09WRVJMQVBfRU4gPSAoMHgzRkZGMDMwMCksXHJcblx0VklfQVRUUl9UQ1BJUF9ISVNMSVBfVkVSU0lPTiA9ICgweDNGRkYwMzAxKSxcclxuXHRWSV9BVFRSX1RDUElQX0hJU0xJUF9NQVhfTUVTU0FHRV9LQiA9ICgweDNGRkYwMzAyKSxcclxuXHRWSV9BVFRSX1RDUElQX0lTX0hJU0xJUCA9ICgweDNGRkYwMzAzKSxcclxuXHJcblx0VklfQVRUUl9KT0JfSUQgPSAoMHgzRkZGNDAwNiksXHJcblx0VklfQVRUUl9FVkVOVF9UWVBFID0gKDB4M0ZGRjQwMTApLFxyXG5cdFZJX0FUVFJfU0lHUF9TVEFUVVNfSUQgPSAoMHgzRkZGNDAxMSksXHJcblx0VklfQVRUUl9SRUNWX1RSSUdfSUQgPSAoMHgzRkZGNDAxMiksXHJcblx0VklfQVRUUl9JTlRSX1NUQVRVU19JRCA9ICgweDNGRkY0MDIzKSxcclxuXHRWSV9BVFRSX1NUQVRVUyA9ICgweDNGRkY0MDI1KSxcclxuXHRWSV9BVFRSX1JFVF9DT1VOVF8zMiA9ICgweDNGRkY0MDI2KSxcclxuXHRWSV9BVFRSX0JVRkZFUiA9ICgweDNGRkY0MDI3KSxcclxuXHRWSV9BVFRSX1JFQ1ZfSU5UUl9MRVZFTCA9ICgweDNGRkY0MDQxKSxcclxuXHRWSV9BVFRSX09QRVJfTkFNRSA9ICgweEJGRkY0MDQyKSxcclxuXHRWSV9BVFRSX0dQSUJfUkVDVl9DSUNfU1RBVEUgPSAoMHgzRkZGNDE5MyksXHJcblx0VklfQVRUUl9SRUNWX1RDUElQX0FERFIgPSAoMHhCRkZGNDE5OCksXHJcblx0VklfQVRUUl9VU0JfUkVDVl9JTlRSX1NJWkUgPSAoMHgzRkZGNDFCMCksXHJcblx0VklfQVRUUl9VU0JfUkVDVl9JTlRSX0RBVEEgPSAoMHhCRkZGNDFCMSksXHJcblx0VklfQVRUUl9QWElfUkVDVl9JTlRSX1NFUSA9ICgweDNGRkY0MjQwKSxcclxuXHRWSV9BVFRSX1BYSV9SRUNWX0lOVFJfREFUQSA9ICgweDNGRkY0MjQxKSxcclxuXHJcbi8qLSBBdHRyaWJ1dGVzIChwbGF0Zm9ybSBkZXBlbmRlbnQgc2l6ZSkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0VklfQVRUUl9VU0VSX0RBVEFfNjQgPSAoMHgzRkZGMDAwQSksXHJcblx0VklfQVRUUl9SRVRfQ09VTlRfNjQgPSAoMHgzRkZGNDAyOCksXHJcblx0VklfQVRUUl9VU0VSX0RBVEEgPSAoMHgzRkZGMDAwQSksXHJcblx0VklfQVRUUl9SRVRfQ09VTlQgPSAoMHgzRkZGNDAyOCksXHJcblxyXG5cclxuLyotIEV2ZW50IFR5cGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRWSV9FVkVOVF9JT19DT01QTEVUSU9OID0gKDB4M0ZGRjIwMDkpLFxyXG5cdFZJX0VWRU5UX1RSSUcgPSAoMHhCRkZGMjAwQSksXHJcblx0VklfRVZFTlRfU0VSVklDRV9SRVEgPSAoMHgzRkZGMjAwQiksXHJcblx0VklfRVZFTlRfQ0xFQVIgPSAoMHgzRkZGMjAwRCksXHJcblx0VklfRVZFTlRfRVhDRVBUSU9OID0gKDB4QkZGRjIwMEUpLFxyXG5cdFZJX0VWRU5UX0dQSUJfQ0lDID0gKDB4M0ZGRjIwMTIpLFxyXG5cdFZJX0VWRU5UX0dQSUJfVEFMSyA9ICgweDNGRkYyMDEzKSxcclxuXHRWSV9FVkVOVF9HUElCX0xJU1RFTiA9ICgweDNGRkYyMDE0KSxcclxuXHRWSV9FVkVOVF9WWElfVk1FX1NZU0ZBSUwgPSAoMHgzRkZGMjAxRCksXHJcblx0VklfRVZFTlRfVlhJX1ZNRV9TWVNSRVNFVCA9ICgweDNGRkYyMDFFKSxcclxuXHRWSV9FVkVOVF9WWElfU0lHUCA9ICgweDNGRkYyMDIwKSxcclxuXHRWSV9FVkVOVF9WWElfVk1FX0lOVFIgPSAoMHhCRkZGMjAyMSksXHJcblx0VklfRVZFTlRfUFhJX0lOVFIgPSAoMHgzRkZGMjAyMiksXHJcblx0VklfRVZFTlRfVENQSVBfQ09OTkVDVCA9ICgweDNGRkYyMDM2KSxcclxuXHRWSV9FVkVOVF9VU0JfSU5UUiA9ICgweDNGRkYyMDM3KSxcclxuXHJcblx0VklfQUxMX0VOQUJMRURfRVZFTlRTID0gKDB4M0ZGRjdGRkYpLFxyXG5cclxuLyotIENvbXBsZXRpb24gYW5kIEVycm9yIENvZGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRWSV9TVUNDRVNTX0VWRU5UX0VOID0gKDB4M0ZGRjAwMDIpLFxyXG5cdFZJX1NVQ0NFU1NfRVZFTlRfRElTID0gKDB4M0ZGRjAwMDMpLFxyXG5cdFZJX1NVQ0NFU1NfUVVFVUVfRU1QVFkgPSAoMHgzRkZGMDAwNCksXHJcblx0VklfU1VDQ0VTU19URVJNX0NIQVIgPSAoMHgzRkZGMDAwNSksXHJcblx0VklfU1VDQ0VTU19NQVhfQ05UID0gKDB4M0ZGRjAwMDYpLFxyXG5cdFZJX1NVQ0NFU1NfREVWX05QUkVTRU5UID0gKDB4M0ZGRjAwN0QpLFxyXG5cdFZJX1NVQ0NFU1NfVFJJR19NQVBQRUQgPSAoMHgzRkZGMDA3RSksXHJcblx0VklfU1VDQ0VTU19RVUVVRV9ORU1QVFkgPSAoMHgzRkZGMDA4MCksXHJcblx0VklfU1VDQ0VTU19OQ0hBSU4gPSAoMHgzRkZGMDA5OCksXHJcblx0VklfU1VDQ0VTU19ORVNURURfU0hBUkVEID0gKDB4M0ZGRjAwOTkpLFxyXG5cdFZJX1NVQ0NFU1NfTkVTVEVEX0VYQ0xVU0lWRSA9ICgweDNGRkYwMDlBKSxcclxuXHRWSV9TVUNDRVNTX1NZTkMgPSAoMHgzRkZGMDA5QiksXHJcblxyXG5cdFZJX1dBUk5fUVVFVUVfT1ZFUkZMT1cgPSAoMHgzRkZGMDAwQyksXHJcblx0VklfV0FSTl9DT05GSUdfTkxPQURFRCA9ICgweDNGRkYwMDc3KSxcclxuXHRWSV9XQVJOX05VTExfT0JKRUNUID0gKDB4M0ZGRjAwODIpLFxyXG5cdFZJX1dBUk5fTlNVUF9BVFRSX1NUQVRFID0gKDB4M0ZGRjAwODQpLFxyXG5cdFZJX1dBUk5fVU5LTk9XTl9TVEFUVVMgPSAoMHgzRkZGMDA4NSksXHJcblx0VklfV0FSTl9OU1VQX0JVRiA9ICgweDNGRkYwMDg4KSxcclxuXHRWSV9XQVJOX0VYVF9GVU5DX05JTVBMID0gKDB4M0ZGRjAwQTkpLFxyXG5cclxuXHRWSV9FUlJPUl9TWVNURU1fRVJST1IgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDAwKSxcclxuXHRWSV9FUlJPUl9JTlZfT0JKRUNUID0gKDB4ODAwMDAwMDArMHgzRkZGMDAwRSksXHJcblx0VklfRVJST1JfUlNSQ19MT0NLRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDBGKSxcclxuXHRWSV9FUlJPUl9JTlZfRVhQUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMTApLFxyXG5cdFZJX0VSUk9SX1JTUkNfTkZPVU5EID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxMSksXHJcblx0VklfRVJST1JfSU5WX1JTUkNfTkFNRSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMTIpLFxyXG5cdFZJX0VSUk9SX0lOVl9BQ0NfTU9ERSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMTMpLFxyXG5cdFZJX0VSUk9SX1RNTyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMTUpLFxyXG5cdFZJX0VSUk9SX0NMT1NJTkdfRkFJTEVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxNiksXHJcblx0VklfRVJST1JfSU5WX0RFR1JFRSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMUIpLFxyXG5cdFZJX0VSUk9SX0lOVl9KT0JfSUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDFDKSxcclxuXHRWSV9FUlJPUl9OU1VQX0FUVFIgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDFEKSxcclxuXHRWSV9FUlJPUl9OU1VQX0FUVFJfU1RBVEUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDFFKSxcclxuXHRWSV9FUlJPUl9BVFRSX1JFQURPTkxZID0gKDB4ODAwMDAwMDArMHgzRkZGMDAxRiksXHJcblx0VklfRVJST1JfSU5WX0xPQ0tfVFlQRSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMjApLFxyXG5cdFZJX0VSUk9SX0lOVl9BQ0NFU1NfS0VZID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyMSksXHJcblx0VklfRVJST1JfSU5WX0VWRU5UID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyNiksXHJcblx0VklfRVJST1JfSU5WX01FQ0ggPSAoMHg4MDAwMDAwMCsweDNGRkYwMDI3KSxcclxuXHRWSV9FUlJPUl9ITkRMUl9OSU5TVEFMTEVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyOCksXHJcblx0VklfRVJST1JfSU5WX0hORExSX1JFRiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMjkpLFxyXG5cdFZJX0VSUk9SX0lOVl9DT05URVhUID0gKDB4ODAwMDAwMDArMHgzRkZGMDAyQSksXHJcblx0VklfRVJST1JfUVVFVUVfT1ZFUkZMT1cgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDJEKSxcclxuXHRWSV9FUlJPUl9ORU5BQkxFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMkYpLFxyXG5cdFZJX0VSUk9SX0FCT1JUID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzMCksXHJcblx0VklfRVJST1JfUkFXX1dSX1BST1RfVklPTCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMzQpLFxyXG5cdFZJX0VSUk9SX1JBV19SRF9QUk9UX1ZJT0wgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDM1KSxcclxuXHRWSV9FUlJPUl9PVVRQX1BST1RfVklPTCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwMzYpLFxyXG5cdFZJX0VSUk9SX0lOUF9QUk9UX1ZJT0wgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDM3KSxcclxuXHRWSV9FUlJPUl9CRVJSID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzOCksXHJcblx0VklfRVJST1JfSU5fUFJPR1JFU1MgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDM5KSxcclxuXHRWSV9FUlJPUl9JTlZfU0VUVVAgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDNBKSxcclxuXHRWSV9FUlJPUl9RVUVVRV9FUlJPUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwM0IpLFxyXG5cdFZJX0VSUk9SX0FMTE9DID0gKDB4ODAwMDAwMDArMHgzRkZGMDAzQyksXHJcblx0VklfRVJST1JfSU5WX01BU0sgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDNEKSxcclxuXHRWSV9FUlJPUl9JTyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwM0UpLFxyXG5cdFZJX0VSUk9SX0lOVl9GTVQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDNGKSxcclxuXHRWSV9FUlJPUl9OU1VQX0ZNVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNDEpLFxyXG5cdFZJX0VSUk9SX0xJTkVfSU5fVVNFID0gKDB4ODAwMDAwMDArMHgzRkZGMDA0MiksXHJcblx0VklfRVJST1JfTElORV9OUkVTRVJWRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDQzKSxcclxuXHRWSV9FUlJPUl9OU1VQX01PREUgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDQ2KSxcclxuXHRWSV9FUlJPUl9TUlFfTk9DQ1VSUkVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDA0QSksXHJcblx0VklfRVJST1JfSU5WX1NQQUNFID0gKDB4ODAwMDAwMDArMHgzRkZGMDA0RSksXHJcblx0VklfRVJST1JfSU5WX09GRlNFVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNTEpLFxyXG5cdFZJX0VSUk9SX0lOVl9XSURUSCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNTIpLFxyXG5cdFZJX0VSUk9SX05TVVBfT0ZGU0VUID0gKDB4ODAwMDAwMDArMHgzRkZGMDA1NCksXHJcblx0VklfRVJST1JfTlNVUF9WQVJfV0lEVEggPSAoMHg4MDAwMDAwMCsweDNGRkYwMDU1KSxcclxuXHRWSV9FUlJPUl9XSU5ET1dfTk1BUFBFRCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNTcpLFxyXG5cdFZJX0VSUk9SX1JFU1BfUEVORElORyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNTkpLFxyXG5cdFZJX0VSUk9SX05MSVNURU5FUlMgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDVGKSxcclxuXHRWSV9FUlJPUl9OQ0lDID0gKDB4ODAwMDAwMDArMHgzRkZGMDA2MCksXHJcblx0VklfRVJST1JfTlNZU19DTlRMUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNjEpLFxyXG5cdFZJX0VSUk9SX05TVVBfT1BFUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNjcpLFxyXG5cdFZJX0VSUk9SX0lOVFJfUEVORElORyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNjgpLFxyXG5cdFZJX0VSUk9SX0FTUkxfUEFSSVRZID0gKDB4ODAwMDAwMDArMHgzRkZGMDA2QSksXHJcblx0VklfRVJST1JfQVNSTF9GUkFNSU5HID0gKDB4ODAwMDAwMDArMHgzRkZGMDA2QiksXHJcblx0VklfRVJST1JfQVNSTF9PVkVSUlVOID0gKDB4ODAwMDAwMDArMHgzRkZGMDA2QyksXHJcblx0VklfRVJST1JfVFJJR19OTUFQUEVEID0gKDB4ODAwMDAwMDArMHgzRkZGMDA2RSksXHJcblx0VklfRVJST1JfTlNVUF9BTElHTl9PRkZTRVQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDcwKSxcclxuXHRWSV9FUlJPUl9VU0VSX0JVRiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNzEpLFxyXG5cdFZJX0VSUk9SX1JTUkNfQlVTWSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwNzIpLFxyXG5cdFZJX0VSUk9SX05TVVBfV0lEVEggPSAoMHg4MDAwMDAwMCsweDNGRkYwMDc2KSxcclxuXHRWSV9FUlJPUl9JTlZfUEFSQU1FVEVSID0gKDB4ODAwMDAwMDArMHgzRkZGMDA3OCksXHJcblx0VklfRVJST1JfSU5WX1BST1QgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDc5KSxcclxuXHRWSV9FUlJPUl9JTlZfU0laRSA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwN0IpLFxyXG5cdFZJX0VSUk9SX1dJTkRPV19NQVBQRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDgwKSxcclxuXHRWSV9FUlJPUl9OSU1QTF9PUEVSID0gKDB4ODAwMDAwMDArMHgzRkZGMDA4MSksXHJcblx0VklfRVJST1JfSU5WX0xFTkdUSCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwODMpLFxyXG5cdFZJX0VSUk9SX0lOVl9NT0RFID0gKDB4ODAwMDAwMDArMHgzRkZGMDA5MSksXHJcblx0VklfRVJST1JfU0VTTl9OTE9DS0VEID0gKDB4ODAwMDAwMDArMHgzRkZGMDA5QyksXHJcblx0VklfRVJST1JfTUVNX05TSEFSRUQgPSAoMHg4MDAwMDAwMCsweDNGRkYwMDlEKSxcclxuXHRWSV9FUlJPUl9MSUJSQVJZX05GT1VORCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwOUUpLFxyXG5cdFZJX0VSUk9SX05TVVBfSU5UUiA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwOUYpLFxyXG5cdFZJX0VSUk9SX0lOVl9MSU5FID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBMCksXHJcblx0VklfRVJST1JfRklMRV9BQ0NFU1MgPSAoMHg4MDAwMDAwMCsweDNGRkYwMEExKSxcclxuXHRWSV9FUlJPUl9GSUxFX0lPID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBMiksXHJcblx0VklfRVJST1JfTlNVUF9MSU5FID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBMyksXHJcblx0VklfRVJST1JfTlNVUF9NRUNIID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBNCksXHJcblx0VklfRVJST1JfSU5URl9OVU1fTkNPTkZJRyA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTUpLFxyXG5cdFZJX0VSUk9SX0NPTk5fTE9TVCA9ICgweDgwMDAwMDAwKzB4M0ZGRjAwQTYpLFxyXG5cdFZJX0VSUk9SX01BQ0hJTkVfTkFWQUlMID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBNyksXHJcblx0VklfRVJST1JfTlBFUk1JU1NJT04gPSAoMHg4MDAwMDAwMCsweDNGRkYwMEE4KSxcclxuXHJcbi8qLSBPdGhlciBWSVNBIERlZmluaXRpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0VklfVkVSU0lPTl9NQUpPUiA9ICAgICgoMHgwMDUwMDgwMCAmIDB4RkZGMDAwMDApID4+IDIwKSxcclxuXHRWSV9WRVJTSU9OX01JTk9SID0gICAgKCgweDAwNTAwODAwICYgMHgwMDBGRkYwMCkgPj4gIDgpLFxyXG5cdFZJX1ZFUlNJT05fU1VCTUlOT1IgPSAoKDB4MDA1MDA4MDAgJiAweDAwMDAwMEZGKSAgICAgICksXHJcblxyXG5cdFZJX0ZJTkRfQlVGTEVOID0gKDI1NiksXHJcblxyXG5cdFZJX0lOVEZfR1BJQiA9ICgxKSxcclxuXHRWSV9JTlRGX1ZYSSA9ICgyKSxcclxuXHRWSV9JTlRGX0dQSUJfVlhJID0gKDMpLFxyXG5cdFZJX0lOVEZfQVNSTCA9ICg0KSxcclxuXHRWSV9JTlRGX1BYSSA9ICg1KSxcclxuXHRWSV9JTlRGX1RDUElQID0gKDYpLFxyXG5cdFZJX0lOVEZfVVNCID0gKDcpLFxyXG5cclxuXHRWSV9QUk9UX05PUk1BTCA9ICgxKSxcclxuXHRWSV9QUk9UX0ZEQyA9ICgyKSxcclxuXHRWSV9QUk9UX0hTNDg4ID0gKDMpLFxyXG5cdFZJX1BST1RfNDg4Ml9TVFJTID0gKDQpLFxyXG5cdFZJX1BST1RfVVNCVE1DX1ZFTkRPUiA9ICg1KSxcclxuXHJcblx0VklfRkRDX05PUk1BTCA9ICgxKSxcclxuXHRWSV9GRENfU1RSRUFNID0gKDIpLFxyXG5cclxuXHRWSV9MT0NBTF9TUEFDRSA9ICgwKSxcclxuXHRWSV9BMTZfU1BBQ0UgPSAoMSksXHJcblx0VklfQTI0X1NQQUNFID0gKDIpLFxyXG5cdFZJX0EzMl9TUEFDRSA9ICgzKSxcclxuXHRWSV9BNjRfU1BBQ0UgPSAoNCksXHJcblx0VklfUFhJX0FMTE9DX1NQQUNFID0gKDkpLFxyXG5cdFZJX1BYSV9DRkdfU1BBQ0UgPSAoMTApLFxyXG5cdFZJX1BYSV9CQVIwX1NQQUNFID0gKDExKSxcclxuXHRWSV9QWElfQkFSMV9TUEFDRSA9ICgxMiksXHJcblx0VklfUFhJX0JBUjJfU1BBQ0UgPSAoMTMpLFxyXG5cdFZJX1BYSV9CQVIzX1NQQUNFID0gKDE0KSxcclxuXHRWSV9QWElfQkFSNF9TUEFDRSA9ICgxNSksXHJcblx0VklfUFhJX0JBUjVfU1BBQ0UgPSAoMTYpLFxyXG5cdFZJX09QQVFVRV9TUEFDRSA9ICgweEZGRkYpLFxyXG5cclxuXHRWSV9VTktOT1dOX0xBID0gKC0xKSxcclxuXHRWSV9VTktOT1dOX1NMT1QgPSAoLTEpLFxyXG5cdFZJX1VOS05PV05fTEVWRUwgPSAoLTEpLFxyXG5cdFZJX1VOS05PV05fQ0hBU1NJUyA9ICgtMSksXHJcblxyXG5cdFZJX1FVRVVFID0gKDEpLFxyXG5cdFZJX0hORExSID0gKDIpLFxyXG5cdFZJX1NVU1BFTkRfSE5ETFIgPSAoNCksXHJcblx0VklfQUxMX01FQ0ggPSAoMHhGRkZGKSxcclxuXHJcblx0VklfQU5ZX0hORExSID0gKDApLFxyXG5cclxuXHRWSV9UUklHX0FMTCA9ICgtMiksXHJcblx0VklfVFJJR19TVyA9ICgtMSksXHJcblx0VklfVFJJR19UVEwwID0gKDApLFxyXG5cdFZJX1RSSUdfVFRMMSA9ICgxKSxcclxuXHRWSV9UUklHX1RUTDIgPSAoMiksXHJcblx0VklfVFJJR19UVEwzID0gKDMpLFxyXG5cdFZJX1RSSUdfVFRMNCA9ICg0KSxcclxuXHRWSV9UUklHX1RUTDUgPSAoNSksXHJcblx0VklfVFJJR19UVEw2ID0gKDYpLFxyXG5cdFZJX1RSSUdfVFRMNyA9ICg3KSxcclxuXHRWSV9UUklHX0VDTDAgPSAoOCksXHJcblx0VklfVFJJR19FQ0wxID0gKDkpLFxyXG5cdFZJX1RSSUdfRUNMMiA9ICgxMCksXHJcblx0VklfVFJJR19FQ0wzID0gKDExKSxcclxuXHRWSV9UUklHX0VDTDQgPSAoMTIpLFxyXG5cdFZJX1RSSUdfRUNMNSA9ICgxMyksXHJcblx0VklfVFJJR19TVEFSX1NMT1QxID0gKDE0KSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDIgPSAoMTUpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UMyA9ICgxNiksXHJcblx0VklfVFJJR19TVEFSX1NMT1Q0ID0gKDE3KSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDUgPSAoMTgpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UNiA9ICgxOSksXHJcblx0VklfVFJJR19TVEFSX1NMT1Q3ID0gKDIwKSxcclxuXHRWSV9UUklHX1NUQVJfU0xPVDggPSAoMjEpLFxyXG5cdFZJX1RSSUdfU1RBUl9TTE9UOSA9ICgyMiksXHJcblx0VklfVFJJR19TVEFSX1NMT1QxMCA9ICgyMyksXHJcblx0VklfVFJJR19TVEFSX1NMT1QxMSA9ICgyNCksXHJcblx0VklfVFJJR19TVEFSX1NMT1QxMiA9ICgyNSksXHJcblx0VklfVFJJR19TVEFSX0lOU1RSID0gKDI2KSxcclxuXHRWSV9UUklHX1BBTkVMX0lOID0gKDI3KSxcclxuXHRWSV9UUklHX1BBTkVMX09VVCA9ICgyOCksXHJcblx0VklfVFJJR19TVEFSX1ZYSTAgPSAoMjkpLFxyXG5cdFZJX1RSSUdfU1RBUl9WWEkxID0gKDMwKSxcclxuXHRWSV9UUklHX1NUQVJfVlhJMiA9ICgzMSksXHJcblx0VklfVFJJR19UVEw4ID0gKDMyKSxcclxuXHRWSV9UUklHX1RUTDkgPSAoMzMpLFxyXG5cdFZJX1RSSUdfVFRMMTAgPSAoMzQpLFxyXG5cdFZJX1RSSUdfVFRMMTEgPSAoMzUpLFxyXG5cclxuXHRWSV9UUklHX1BST1RfREVGQVVMVCA9ICgwKSxcclxuXHRWSV9UUklHX1BST1RfT04gPSAoMSksXHJcblx0VklfVFJJR19QUk9UX09GRiA9ICgyKSxcclxuXHRWSV9UUklHX1BST1RfU1lOQyA9ICg1KSxcclxuXHRWSV9UUklHX1BST1RfUkVTRVJWRSA9ICg2KSxcclxuXHRWSV9UUklHX1BST1RfVU5SRVNFUlZFID0gKDcpLFxyXG5cclxuXHRWSV9SRUFEX0JVRiA9ICgxKSxcclxuXHRWSV9XUklURV9CVUYgPSAoMiksXHJcblx0VklfUkVBRF9CVUZfRElTQ0FSRCA9ICg0KSxcclxuXHRWSV9XUklURV9CVUZfRElTQ0FSRCA9ICg4KSxcclxuXHRWSV9JT19JTl9CVUYgPSAoMTYpLFxyXG5cdFZJX0lPX09VVF9CVUYgPSAoMzIpLFxyXG5cdFZJX0lPX0lOX0JVRl9ESVNDQVJEID0gKDY0KSxcclxuXHRWSV9JT19PVVRfQlVGX0RJU0NBUkQgPSAoMTI4KSxcclxuXHJcblx0VklfRkxVU0hfT05fQUNDRVNTID0gKDEpLFxyXG5cdFZJX0ZMVVNIX1dIRU5fRlVMTCA9ICgyKSxcclxuXHRWSV9GTFVTSF9ESVNBQkxFID0gKDMpLFxyXG5cclxuXHRWSV9OTUFQUEVEID0gKDEpLFxyXG5cdFZJX1VTRV9PUEVSUyA9ICgyKSxcclxuXHRWSV9ERVJFRl9BRERSID0gKDMpLFxyXG5cdFZJX0RFUkVGX0FERFJfQllURV9TV0FQID0gKDQpLFxyXG5cclxuXHRWSV9UTU9fSU1NRURJQVRFID0gKDApLFxyXG5cdFZJX1RNT19JTkZJTklURSA9ICgweEZGRkZGRkZGKSxcclxuXHJcblx0VklfTk9fTE9DSyA9ICgwKSxcclxuXHRWSV9FWENMVVNJVkVfTE9DSyA9ICgxKSxcclxuXHRWSV9TSEFSRURfTE9DSyA9ICgyKSxcclxuXHRWSV9MT0FEX0NPTkZJRyA9ICg0KSxcclxuXHJcblx0VklfTk9fU0VDX0FERFIgPSAoMHhGRkZGKSxcclxuXHJcblx0VklfQVNSTF9QQVJfTk9ORSA9ICgwKSxcclxuXHRWSV9BU1JMX1BBUl9PREQgPSAoMSksXHJcblx0VklfQVNSTF9QQVJfRVZFTiA9ICgyKSxcclxuXHRWSV9BU1JMX1BBUl9NQVJLID0gKDMpLFxyXG5cdFZJX0FTUkxfUEFSX1NQQUNFID0gKDQpLFxyXG5cclxuXHRWSV9BU1JMX1NUT1BfT05FID0gKDEwKSxcclxuXHRWSV9BU1JMX1NUT1BfT05FNSA9ICgxNSksXHJcblx0VklfQVNSTF9TVE9QX1RXTyA9ICgyMCksXHJcblxyXG5cdFZJX0FTUkxfRkxPV19OT05FID0gKDApLFxyXG5cdFZJX0FTUkxfRkxPV19YT05fWE9GRiA9ICgxKSxcclxuXHRWSV9BU1JMX0ZMT1dfUlRTX0NUUyA9ICgyKSxcclxuXHRWSV9BU1JMX0ZMT1dfRFRSX0RTUiA9ICg0KSxcclxuXHJcblx0VklfQVNSTF9FTkRfTk9ORSA9ICgwKSxcclxuXHRWSV9BU1JMX0VORF9MQVNUX0JJVCA9ICgxKSxcclxuXHRWSV9BU1JMX0VORF9URVJNQ0hBUiA9ICgyKSxcclxuXHRWSV9BU1JMX0VORF9CUkVBSyA9ICgzKSxcclxuXHJcblx0VklfU1RBVEVfQVNTRVJURUQgPSAoMSksXHJcblx0VklfU1RBVEVfVU5BU1NFUlRFRCA9ICgwKSxcclxuXHRWSV9TVEFURV9VTktOT1dOID0gKC0xKSxcclxuXHJcblx0VklfQklHX0VORElBTiA9ICgwKSxcclxuXHRWSV9MSVRUTEVfRU5ESUFOID0gKDEpLFxyXG5cclxuXHRWSV9EQVRBX1BSSVYgPSAoMCksXHJcblx0VklfREFUQV9OUFJJViA9ICgxKSxcclxuXHRWSV9QUk9HX1BSSVYgPSAoMiksXHJcblx0VklfUFJPR19OUFJJViA9ICgzKSxcclxuXHRWSV9CTENLX1BSSVYgPSAoNCksXHJcblx0VklfQkxDS19OUFJJViA9ICg1KSxcclxuXHRWSV9ENjRfUFJJViA9ICg2KSxcclxuXHRWSV9ENjRfTlBSSVYgPSAoNyksXHJcblx0VklfRDY0XzJFVk1FID0gKDgpLFxyXG5cdFZJX0Q2NF9TU1QxNjAgPSAoOSksXHJcblx0VklfRDY0X1NTVDI2NyA9ICgxMCksXHJcblx0VklfRDY0X1NTVDMyMCA9ICgxMSksXHJcblxyXG5cdFZJX1dJRFRIXzggPSAoMSksXHJcblx0VklfV0lEVEhfMTYgPSAoMiksXHJcblx0VklfV0lEVEhfMzIgPSAoNCksXHJcblx0VklfV0lEVEhfNjQgPSAoOCksXHJcblxyXG5cdFZJX0dQSUJfUkVOX0RFQVNTRVJUID0gKDApLFxyXG5cdFZJX0dQSUJfUkVOX0FTU0VSVCA9ICgxKSxcclxuXHRWSV9HUElCX1JFTl9ERUFTU0VSVF9HVEwgPSAoMiksXHJcblx0VklfR1BJQl9SRU5fQVNTRVJUX0FERFJFU1MgPSAoMyksXHJcblx0VklfR1BJQl9SRU5fQVNTRVJUX0xMTyA9ICg0KSxcclxuXHRWSV9HUElCX1JFTl9BU1NFUlRfQUREUkVTU19MTE8gPSAoNSksXHJcblx0VklfR1BJQl9SRU5fQUREUkVTU19HVEwgPSAoNiksXHJcblxyXG5cdFZJX0dQSUJfQVROX0RFQVNTRVJUID0gKDApLFxyXG5cdFZJX0dQSUJfQVROX0FTU0VSVCA9ICgxKSxcclxuXHRWSV9HUElCX0FUTl9ERUFTU0VSVF9IQU5EU0hBS0UgPSAoMiksXHJcblx0VklfR1BJQl9BVE5fQVNTRVJUX0lNTUVESUFURSA9ICgzKSxcclxuXHJcblx0VklfR1BJQl9IUzQ4OF9ESVNBQkxFRCA9ICgwKSxcclxuXHRWSV9HUElCX0hTNDg4X05JTVBMID0gKC0xKSxcclxuXHJcblx0VklfR1BJQl9VTkFERFJFU1NFRCA9ICgwKSxcclxuXHRWSV9HUElCX1RBTEtFUiA9ICgxKSxcclxuXHRWSV9HUElCX0xJU1RFTkVSID0gKDIpLFxyXG5cclxuXHRWSV9WWElfQ01EMTYgPSAoMHgwMjAwKSxcclxuXHRWSV9WWElfQ01EMTZfUkVTUDE2ID0gKDB4MDIwMiksXHJcblx0VklfVlhJX1JFU1AxNiA9ICgweDAwMDIpLFxyXG5cdFZJX1ZYSV9DTUQzMiA9ICgweDA0MDApLFxyXG5cdFZJX1ZYSV9DTUQzMl9SRVNQMTYgPSAoMHgwNDAyKSxcclxuXHRWSV9WWElfQ01EMzJfUkVTUDMyID0gKDB4MDQwNCksXHJcblx0VklfVlhJX1JFU1AzMiA9ICgweDAwMDQpLFxyXG5cclxuXHRWSV9BU1NFUlRfU0lHTkFMID0gKC0xKSxcclxuXHRWSV9BU1NFUlRfVVNFX0FTU0lHTkVEID0gKDApLFxyXG5cdFZJX0FTU0VSVF9JUlExID0gKDEpLFxyXG5cdFZJX0FTU0VSVF9JUlEyID0gKDIpLFxyXG5cdFZJX0FTU0VSVF9JUlEzID0gKDMpLFxyXG5cdFZJX0FTU0VSVF9JUlE0ID0gKDQpLFxyXG5cdFZJX0FTU0VSVF9JUlE1ID0gKDUpLFxyXG5cdFZJX0FTU0VSVF9JUlE2ID0gKDYpLFxyXG5cdFZJX0FTU0VSVF9JUlE3ID0gKDcpLFxyXG5cclxuXHRWSV9VVElMX0FTU0VSVF9TWVNSRVNFVCA9ICgxKSxcclxuXHRWSV9VVElMX0FTU0VSVF9TWVNGQUlMID0gKDIpLFxyXG5cdFZJX1VUSUxfREVBU1NFUlRfU1lTRkFJTCA9ICgzKSxcclxuXHJcblx0VklfVlhJX0NMQVNTX01FTU9SWSA9ICgwKSxcclxuXHRWSV9WWElfQ0xBU1NfRVhURU5ERUQgPSAoMSksXHJcblx0VklfVlhJX0NMQVNTX01FU1NBR0UgPSAoMiksXHJcblx0VklfVlhJX0NMQVNTX1JFR0lTVEVSID0gKDMpLFxyXG5cdFZJX1ZYSV9DTEFTU19PVEhFUiA9ICg0KSxcclxuXHJcblx0VklfUFhJX0FERFJfTk9ORSA9ICgwKSxcclxuXHRWSV9QWElfQUREUl9NRU0gPSAoMSksXHJcblx0VklfUFhJX0FERFJfSU8gPSAoMiksXHJcblx0VklfUFhJX0FERFJfQ0ZHID0gKDMpLFxyXG5cclxuXHRWSV9UUklHX1VOS05PV04gPSAoLTEpLFxyXG5cclxuXHRWSV9QWElfTEJVU19VTktOT1dOID0gKC0xKSxcclxuXHRWSV9QWElfTEJVU19OT05FID0gKDApLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfMCA9ICgxMDAwKSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzEgPSAoMTAwMSksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU18yID0gKDEwMDIpLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfMyA9ICgxMDAzKSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzQgPSAoMTAwNCksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU181ID0gKDEwMDUpLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfNiA9ICgxMDA2KSxcclxuXHRWSV9QWElfTEJVU19TVEFSX1RSSUdfQlVTXzcgPSAoMTAwNyksXHJcblx0VklfUFhJX0xCVVNfU1RBUl9UUklHX0JVU184ID0gKDEwMDgpLFxyXG5cdFZJX1BYSV9MQlVTX1NUQVJfVFJJR19CVVNfOSA9ICgxMDA5KSxcclxuXHRWSV9QWElfU1RBUl9UUklHX0NPTlRST0xMRVIgPSAoMTQxMyksXHJcblxyXG4vKi0gTmF0aW9uYWwgSW5zdHJ1bWVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdFZJX0VSUk9SX0hXX05HRU5VSU5FID0gKDB4ODAwMDAwMDArMHgzRkZGMDBBQSksXHJcblxyXG5cdFZJX0lOVEZfUklPID0gKDgpLFxyXG5cdFZJX0lOVEZfRklSRVdJUkUgPSAoOSksXHJcblxyXG5cdFZJX0FUVFJfU1lOQ19NWElfQUxMT1dfRU4gPSAoMHgzRkZGMDE2MSksXHJcblxyXG4vKiBUaGlzIGlzIGZvciBWWEkgU0VSVkFOVCByZXNvdXJjZXMgKi9cclxuXHJcblx0VklfRVZFTlRfVlhJX0RFVl9DTUQgPSAoMHhCRkZGMjAwRiksXHJcblx0VklfQVRUUl9WWElfREVWX0NNRF9UWVBFID0gKDB4M0ZGRjQwMzcpLFxyXG5cdFZJX0FUVFJfVlhJX0RFVl9DTURfVkFMVUUgPSAoMHgzRkZGNDAzOCksXHJcblxyXG5cdFZJX1ZYSV9ERVZfQ01EX1RZUEVfMTYgPSAoMTYpLFxyXG5cdFZJX1ZYSV9ERVZfQ01EX1RZUEVfMzIgPSAoMzIpLFxyXG5cclxuLyogbW9kZSB2YWx1ZXMgaW5jbHVkZSBWSV9WWElfUkVTUDE2LCBWSV9WWElfUkVTUDMyLCBhbmQgdGhlIG5leHQgMiB2YWx1ZXMgKi9cclxuXHRWSV9WWElfUkVTUF9OT05FID0gKDApLFxyXG5cdFZJX1ZYSV9SRVNQX1BST1RfRVJST1IgPSAoLTEpLFxyXG5cclxuLyogVGhpcyBpcyBmb3IgVlhJIFRUTCBUcmlnZ2VyIHJvdXRpbmcgKi9cclxuXHJcblx0VklfQVRUUl9WWElfVFJJR19MSU5FU19FTiA9ICgweDNGRkY0MDQzKSxcclxuXHRWSV9BVFRSX1ZYSV9UUklHX0RJUiA9ICgweDNGRkY0MDQ0KSxcclxuXHJcbi8qIFRoaXMgYWxsb3dzIGV4dGVuZGVkIFNlcmlhbCBzdXBwb3J0IG9uIFdpbjMyIGFuZCBvbiBOSSBFTkVUIFNlcmlhbCBwcm9kdWN0cyAqL1xyXG5cclxuXHRWSV9BVFRSX0FTUkxfRElTQ0FSRF9OVUxMID0gKDB4M0ZGRjAwQjApLFxyXG5cdFZJX0FUVFJfQVNSTF9DT05ORUNURUQgPSAoMHgzRkZGMDFCQiksXHJcblx0VklfQVRUUl9BU1JMX0JSRUFLX1NUQVRFID0gKDB4M0ZGRjAxQkMpLFxyXG5cdFZJX0FUVFJfQVNSTF9CUkVBS19MRU4gPSAoMHgzRkZGMDFCRCksXHJcblx0VklfQVRUUl9BU1JMX0FMTE9XX1RSQU5TTUlUID0gKDB4M0ZGRjAxQkUpLFxyXG5cdFZJX0FUVFJfQVNSTF9XSVJFX01PREUgPSAoMHgzRkZGMDFCRiksXHJcblxyXG5cdFZJX0FTUkxfV0lSRV80ODVfNCA9ICgwKSxcclxuXHRWSV9BU1JMX1dJUkVfNDg1XzJfRFRSX0VDSE8gPSAoMSksXHJcblx0VklfQVNSTF9XSVJFXzQ4NV8yX0RUUl9DVFJMID0gKDIpLFxyXG5cdFZJX0FTUkxfV0lSRV80ODVfMl9BVVRPID0gKDMpLFxyXG5cdFZJX0FTUkxfV0lSRV8yMzJfRFRFID0gKDEyOCksXHJcblx0VklfQVNSTF9XSVJFXzIzMl9EQ0UgPSAoMTI5KSxcclxuXHRWSV9BU1JMX1dJUkVfMjMyX0FVVE8gPSAoMTMwKSxcclxuXHJcblx0VklfRVZFTlRfQVNSTF9CUkVBSyA9ICgweDNGRkYyMDIzKSxcclxuXHRWSV9FVkVOVF9BU1JMX0NUUyA9ICgweDNGRkYyMDI5KSxcclxuXHRWSV9FVkVOVF9BU1JMX0RTUiA9ICgweDNGRkYyMDJBKSxcclxuXHRWSV9FVkVOVF9BU1JMX0RDRCA9ICgweDNGRkYyMDJDKSxcclxuXHRWSV9FVkVOVF9BU1JMX1JJID0gKDB4M0ZGRjIwMkUpLFxyXG5cdFZJX0VWRU5UX0FTUkxfQ0hBUiA9ICgweDNGRkYyMDM1KSxcclxuXHRWSV9FVkVOVF9BU1JMX1RFUk1DSEFSID0gKDB4M0ZGRjIwMjQpLFxyXG5cclxuLyogVGhpcyBpcyBmb3IgZmFzdCB2aVBlZWsvdmlQb2tlIG1hY3JvcyAqL1xyXG5cclxuXHRWSV9BVFRSX1BYSV9TVUJfTUFORl9JRCA9ICgweDNGRkYwMjAzKSxcclxuXHRWSV9BVFRSX1BYSV9TVUJfTU9ERUxfQ09ERSA9ICgweDNGRkYwMjA0KSxcclxuXHJcblx0VklfQVRUUl9QWElfVVNFX1BSRUFMTE9DX1BPT0wgPSAoMHgzRkZGMDIwRiksXHJcblxyXG5cdFZJX0FUVFJfVVNCX0JVTEtfT1VUX1BJUEUgPSAoMHgzRkZGMDFBMiksXHJcblx0VklfQVRUUl9VU0JfQlVMS19JTl9QSVBFID0gKDB4M0ZGRjAxQTMpLFxyXG5cdFZJX0FUVFJfVVNCX0lOVFJfSU5fUElQRSA9ICgweDNGRkYwMUE0KSxcclxuXHRWSV9BVFRSX1VTQl9DTEFTUyA9ICgweDNGRkYwMUE1KSxcclxuXHRWSV9BVFRSX1VTQl9TVUJDTEFTUyA9ICgweDNGRkYwMUE2KSxcclxuXHRWSV9BVFRSX1VTQl9BTFRfU0VUVElORyA9ICgweDNGRkYwMUE4KSxcclxuXHRWSV9BVFRSX1VTQl9FTkRfSU4gPSAoMHgzRkZGMDFBOSksXHJcblx0VklfQVRUUl9VU0JfTlVNX0lOVEZDUyA9ICgweDNGRkYwMUFBKSxcclxuXHRWSV9BVFRSX1VTQl9OVU1fUElQRVMgPSAoMHgzRkZGMDFBQiksXHJcblx0VklfQVRUUl9VU0JfQlVMS19PVVRfU1RBVFVTID0gKDB4M0ZGRjAxQUMpLFxyXG5cdFZJX0FUVFJfVVNCX0JVTEtfSU5fU1RBVFVTID0gKDB4M0ZGRjAxQUQpLFxyXG5cdFZJX0FUVFJfVVNCX0lOVFJfSU5fU1RBVFVTID0gKDB4M0ZGRjAxQUUpLFxyXG5cdFZJX0FUVFJfVVNCX0NUUkxfUElQRSA9ICgweDNGRkYwMUIwKSxcclxuXHJcblx0VklfVVNCX1BJUEVfU1RBVEVfVU5LTk9XTiA9ICgtMSksXHJcblx0VklfVVNCX1BJUEVfUkVBRFkgPSAoMCksXHJcblx0VklfVVNCX1BJUEVfU1RBTExFRCA9ICgxKSxcclxuXHJcblx0VklfVVNCX0VORF9OT05FID0gKDApLFxyXG5cdFZJX1VTQl9FTkRfU0hPUlQgPSAoNCksXHJcblx0VklfVVNCX0VORF9TSE9SVF9PUl9DT1VOVCA9ICg1KSxcclxuXHJcblx0VklfQVRUUl9GSVJFV0lSRV9ERVNUX1VQUEVSX09GRlNFVCA9ICgweDNGRkYwMUYwKSxcclxuXHRWSV9BVFRSX0ZJUkVXSVJFX1NSQ19VUFBFUl9PRkZTRVQgPSAoMHgzRkZGMDFGMSksXHJcblx0VklfQVRUUl9GSVJFV0lSRV9XSU5fVVBQRVJfT0ZGU0VUID0gKDB4M0ZGRjAxRjIpLFxyXG5cdFZJX0FUVFJfRklSRVdJUkVfVkVORE9SX0lEID0gKDB4M0ZGRjAxRjMpLFxyXG5cdFZJX0FUVFJfRklSRVdJUkVfTE9XRVJfQ0hJUF9JRCA9ICgweDNGRkYwMUY0KSxcclxuXHRWSV9BVFRSX0ZJUkVXSVJFX1VQUEVSX0NISVBfSUQgPSAoMHgzRkZGMDFGNSksXHJcblxyXG5cdFZJX0ZJUkVXSVJFX0RGTFRfU1BBQ0UgPSAoNSksXHJcblxyXG5cdFZJX0tUQVRUUl9SRVRVUk5fQUxMID0gMHgwRkZGMDA2MlxyXG59O1xyXG5cclxuIiwiaW1wb3J0IHJlZiBmcm9tICdyZWYtbmFwaSdcclxuZXhwb3J0IGNvbnN0IFZpSW50MTYgPSByZWYudHlwZXMuaW50MTY7XHJcbmV4cG9ydCBjb25zdCBWaUludDMyID0gcmVmLnR5cGVzLmludDMyO1xyXG5leHBvcnQgY29uc3QgVmlQSW50MzIgPSByZWYucmVmVHlwZShWaUludDMyKTtcclxuXHJcbmV4cG9ydCBjb25zdCBWaVVJbnQzMiA9IHJlZi50eXBlcy51aW50MzI7XHJcbmV4cG9ydCBjb25zdCBWaVBVSW50MzIgPSByZWYucmVmVHlwZShWaVVJbnQzMik7XHJcbmV4cG9ydCBjb25zdCBWaVBJbnQxNiA9IHJlZi5yZWZUeXBlKFZpSW50MTYpO1xyXG5leHBvcnQgY29uc3QgVmlVSW50MTYgPSByZWYudHlwZXMudWludDE2O1xyXG5leHBvcnQgY29uc3QgVmlQVUludDE2ID0gcmVmLnJlZlR5cGUoVmlVSW50MTYpO1xyXG5leHBvcnQgY29uc3QgVmlDaGFyID0gcmVmLnR5cGVzLmNoYXI7XHJcbmV4cG9ydCBjb25zdCBWaVBDaGFyID0gcmVmLnJlZlR5cGUoVmlDaGFyKTtcclxuZXhwb3J0IGNvbnN0IFZpQnl0ZSA9IHJlZi50eXBlcy51Y2hhcjtcclxuZXhwb3J0IGNvbnN0IFZpUEJ5dGUgPSByZWYucmVmVHlwZShWaUJ5dGUpO1xyXG5cclxuLy8gTm90ZSwgdGhpcyBuZWVkcyB0byBiZSBWaVVJbnQzMiwgbm90IFZpSW50MzIgb3RoZXIgd2UgZ2V0IG5lZ2F0aXZlIGhleFxyXG5leHBvcnQgY29uc3QgVmlTdGF0dXMgPSBWaVVJbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpUFN0YXR1cyA9IHJlZi5yZWZUeXBlKFZpU3RhdHVzKVxyXG5leHBvcnQgY29uc3QgVmlPYmplY3QgPSBWaVVJbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpUE9iamVjdCA9IHJlZi5yZWZUeXBlKFZpT2JqZWN0KVxyXG5leHBvcnQgY29uc3QgVmlTZXNzaW9uID0gVmlVSW50MzI7XHJcbmV4cG9ydCBjb25zdCBWaUV2ZW50ID0gVmlPYmplY3Q7XHJcblxyXG5leHBvcnQgY29uc3QgVmlQRXZlbnQgPSByZWYucmVmVHlwZShWaUV2ZW50KTtcclxuZXhwb3J0IGNvbnN0IFZpQXR0ciA9IFZpVUludDMyO1xyXG5leHBvcnQgY29uc3QgVmlBdHRyU3RhdGUgPSBWaVVJbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpUEF0dHJTdGF0ZSA9IHJlZi5yZWZUeXBlKFZpVUludDMyKTtcclxuZXhwb3J0IGNvbnN0IFZpUFNlc3Npb24gPSByZWYucmVmVHlwZShWaVNlc3Npb24pO1xyXG5leHBvcnQgY29uc3QgVmlTdHJpbmcgPSBWaVBDaGFyO1xyXG5leHBvcnQgY29uc3QgVmlDb25zdFN0cmluZyA9IFZpU3RyaW5nO1xyXG5leHBvcnQgY29uc3QgVmlSc3JjID0gVmlTdHJpbmc7XHJcbmV4cG9ydCBjb25zdCBWaUNvbnN0UnNyYyA9IFZpQ29uc3RTdHJpbmc7XHJcbmV4cG9ydCBjb25zdCBWaUFjY2Vzc01vZGUgPSBWaVVJbnQzMjtcclxuZXhwb3J0IGNvbnN0IFZpQnVmID0gVmlQQnl0ZTtcclxuZXhwb3J0IGNvbnN0IFZpUEJ1ZiA9IFZpUEJ5dGU7XHJcbmV4cG9ydCBjb25zdCBWaUNvbnN0QnVmID0gVmlQQnl0ZTtcclxuZXhwb3J0IGNvbnN0IFZpRmluZExpc3QgPSBWaU9iamVjdDtcclxuZXhwb3J0IGNvbnN0IFZpUEZpbmRMaXN0ID0gcmVmLnJlZlR5cGUoVmlGaW5kTGlzdCk7XHJcblxyXG5leHBvcnQgY29uc3QgVmlKb2JJZCA9IFZpVUludDMyXHJcbmV4cG9ydCBjb25zdCBWaVBKb2JJZCA9IHJlZi5yZWZUeXBlKFZpSm9iSWQpXHJcblxyXG5leHBvcnQgY29uc3QgVmlFdmVudFR5cGUgPSBWaVVJbnQzMlxyXG5leHBvcnQgY29uc3QgVmlQRXZlbnRUeXBlID0gcmVmLnJlZlR5cGUoVmlFdmVudFR5cGUpXHJcblxyXG5leHBvcnQgY29uc3QgVmlFdmVudEZpbHRlciA9IFZpVUludDMyIiwiaW1wb3J0IHsgYWdWaXNhIH0gZnJvbSBcIi4vbmlfdmlzYVwiXHJcblxyXG5jb25zdCBWSV9FUlJPUiA9IDB4ODAwMDAwMDBcclxuZXhwb3J0IGVudW0gVmlDbG9zZUNvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwLCAvL1Nlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgIFZJX1dBUk5fTlVMTF9PQkpFQ1QgPSAweDNGRkYwMDgyLy8gVGhlIHNwZWNpZmllZCBvYmplY3QgcmVmZXJlbmNlIGlzIHVuaW5pdGlhbGl6ZWQuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZpQ2xvc2VFcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfQ0xPU0lOR19GQUlMRUQgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTYsIC8vIFVuYWJsZSB0byBkZWFsbG9jYXRlIHRoZSBwcmV2aW91c2x5IGFsbG9jYXRlZCBkYXRhIHN0cnVjdHVyZXMgY29ycmVzcG9uZGluZyB0byB0aGlzIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZS5cclxuICAgIFZJX0VSUk9SX0lOVl9TRVNTSU9OID0gVklfRVJST1IgKyAweDNGRkYwMDBFLCAvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS5cclxuICAgIFZJX0VSUk9SX0lOVl9PQkpFQ1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpQ2xvc2UodmlPYmplY3Q6IG51bWJlcik6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gVklfRVJST1JcclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpQ2xvc2UodmlPYmplY3QpXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaUNsb3NlQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTUzpcclxuICAgICAgICAgICAgY2FzZSBWaUNsb3NlQ29tcGxldGlvbkNvZGUuVklfV0FSTl9OVUxMX09CSkVDVDoge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGB2aUNsb3NlIEVycm9yOiBzdGF0dXM6ICR7c3RhdHVzfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgYWdWaXNhIH0gZnJvbSBcIi4vbmlfdmlzYVwiXHJcblxyXG5jb25zdCBWSV9FUlJPUiA9IDB4ODAwMDAwMDBcclxuXHJcbmV4cG9ydCBlbnVtIFZpRmluZE5leHRDb21wbGV0aW9uQ29kZSB7XHJcbiAgICBWSV9TVUNDRVNTID0gMCwgLy9UaGlzIGlzIHRoZSBmdW5jdGlvbiByZXR1cm4gc3RhdHVzLiBJdCByZXR1cm5zIGVpdGhlciBhIGNvbXBsZXRpb24gY29kZSBvciBhbiBlcnJvciBjb2RlIGFzIGZvbGxvd3MuICAgXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZpRmluZE5leHRFcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfSU5WX1NFU1NJT04gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUgLC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLiBcclxuICAgIFZJX0VSUk9SX0lOVl9PQkpFQ1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUgLC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfTlNVUF9PUEVSID0gVklfRVJST1IgKyAweDNGRkYwMDY3ICwvLyBUaGUgZ2l2ZW4gc2VzbiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgZnVuY3Rpb24uXHJcbiAgICBWSV9FUlJPUl9SU1JDX05GT1VORCA9IFZJX0VSUk9SICsgMHgzRkZGMDAxMS8vIFNwZWNpZmllZCBleHByZXNzaW9uIGRvZXMgbm90IG1hdGNoIGFueSBkZXZpY2VzLlxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmlGaW5kTmV4dCh2aVNlc3Npb246IG51bWJlcik6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgaW5zdHJEZXNjOiBzdHJpbmcgfT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIGluc3RyRGVzYzogc3RyaW5nIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG5cclxuICAgICAgICBsZXQgYnVmZmVyX2luc3RyRGVzYyA9IEJ1ZmZlci5hbGxvYyg1MTIpIC8vIENTdHJpbmcgZGVzY3JpcHRpb25cclxuXHJcblxyXG4gICAgICAgIHN0YXR1cyA9IGFnVmlzYS52aUZpbmROZXh0KHZpU2Vzc2lvbiwgYnVmZmVyX2luc3RyRGVzYyBhcyBhbnkpXHJcblxyXG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVmlGaW5kTmV4dENvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1M6IHtcclxuICAgICAgICAgICAgICAgIGxldCBpbnN0ckRlc2M6IHN0cmluZyA9IGJ1ZmZlcl9pbnN0ckRlc2MucmVhZENTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCBpbnN0ckRlc2M6IGluc3RyRGVzYyB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChgdmlGaW5kTmV4dCBFcnJvcjogc3RhdHVzOiAke3N0YXR1c31gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsImltcG9ydCB7IGFnVmlzYSB9IGZyb20gXCIuL25pX3Zpc2FcIlxyXG5cclxuY29uc3QgVklfRVJST1IgPSAweDgwMDAwMDAwXHJcblxyXG5leHBvcnQgZW51bSBWaUZpbmRSc3JjQ29tcGxldGlvbkNvZGUge1xyXG4gICAgVklfU1VDQ0VTUyA9IDAsIC8vVGhpcyBpcyB0aGUgZnVuY3Rpb24gcmV0dXJuIHN0YXR1cy4gSXQgcmV0dXJucyBlaXRoZXIgYSBjb21wbGV0aW9uIGNvZGUgb3IgYW4gZXJyb3IgY29kZSBhcyBmb2xsb3dzLiAgIFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWaUZpbmRSc3JjRXJyb3JDb2RlIHtcclxuICAgIFZJX0VSUk9SX0lOVl9FWFBSID0gVklfRVJST1IgKyAweDNGRkYwMDEwICwvLyBJbnZhbGlkIGV4cHJlc3Npb24gc3BlY2lmaWVkIGZvciBzZWFyY2guXHJcbiAgICBWSV9FUlJPUl9JTlZfU0VTU0lPTiA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSAsLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuIFxyXG4gICAgVklfRVJST1JfSU5WX09CSkVDVCA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSAsLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9OU1VQX09QRVIgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNjcgLC8vIFRoZSBnaXZlbiBzZXNuIGRvZXMgbm90IHN1cHBvcnQgdGhpcyBmdW5jdGlvbi5cclxuICAgIFZJX0VSUk9SX1JTUkNfTkZPVU5EID0gVklfRVJST1IgKyAweDNGRkYwMDExLy8gU3BlY2lmaWVkIGV4cHJlc3Npb24gZG9lcyBub3QgbWF0Y2ggYW55IGRldmljZXMuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmlGaW5kUnNyYyh2aVNlc3Npb246IG51bWJlciwgZXhwcjogc3RyaW5nKTogUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCBmaW5kTGlzdDogbnVtYmVyLCByZXRjbnQ6IG51bWJlciwgaW5zdHJEZXNjOiBzdHJpbmcgfT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIGZpbmRMaXN0OiBudW1iZXIsIHJldGNudDogbnVtYmVyLCBpbnN0ckRlc2M6IHN0cmluZyB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gVklfRVJST1JcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlckZpbmRMaXN0ID0gQnVmZmVyLmFsbG9jKDQpIC8vdTMyXHJcbiAgICAgICAgbGV0IGJ1ZmZlcl9yZXRjbnQgPSBCdWZmZXIuYWxsb2MoNCkgLy91MzJcclxuICAgICAgICBsZXQgYnVmZmVyX2luc3RyRGVzYyA9IEJ1ZmZlci5hbGxvYyg1MTIpIC8vIENTdHJpbmcgZGVzY3JpcHRpb25cclxuXHJcblxyXG4gICAgICAgIHN0YXR1cyA9IGFnVmlzYS52aUZpbmRSc3JjKHZpU2Vzc2lvbiwgZXhwciwgYnVmZmVyRmluZExpc3QgYXMgYW55LCBidWZmZXJfcmV0Y250IGFzIGFueSwgYnVmZmVyX2luc3RyRGVzYyBhcyBhbnkpXHJcblxyXG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVmlGaW5kUnNyY0NvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1M6IHtcclxuICAgICAgICAgICAgICAgIGxldCBmaW5kTGlzdCA9IGJ1ZmZlckZpbmRMaXN0LnJlYWRVSW50MzJMRSgpXHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0Y250OiBudW1iZXIgPSBidWZmZXJfcmV0Y250LnJlYWRVSW50MzJMRSgpXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5zdHJEZXNjOiBzdHJpbmcgPSBidWZmZXJfaW5zdHJEZXNjLnJlYWRDU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoeyBzdGF0dXM6IHN0YXR1cywgZmluZExpc3Q6IGZpbmRMaXN0LCByZXRjbnQ6IHJldGNudCwgaW5zdHJEZXNjOiBpbnN0ckRlc2MgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoYHZpRmluZFJzcmMgRXJyb3I6IHN0YXR1czogJHtzdGF0dXN9YClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iLCJpbXBvcnQgeyBhZ1Zpc2EgfSBmcm9tIFwiLi9uaV92aXNhXCJcclxuXHJcbmNvbnN0IFZJX0VSUk9SID0gMHg4MDAwMDAwMFxyXG5leHBvcnQgZW51bSBWaUdldEF0dHJpYnV0ZUNvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwLCAvLyBSZXNvdXJjZSBhdHRyaWJ1dGUgcmV0cmlldmVkIHN1Y2Nlc3NmdWxseS5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlHZXRBdHRyaWJ1dGVFcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfSU5WX1NFU1NJT04gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX09CSkVDVCA9IFZJX0VSUk9SICsgIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfTlNVUF9BVFRSID0gVklfRVJST1IgKyAgMHgzRkZGMDAxRCwgLy8gVGhlIHNwZWNpZmllZCBhdHRyaWJ1dGUgaXMgbm90IGRlZmluZWQgYnkgdGhlIHJlZmVyZW5jZWQgcmVzb3VyY2UuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlHZXRBdHRyaWJ1dGUodmlTZXNzaW9uOiBudW1iZXIsIGF0dHJpYnV0ZTogbnVtYmVyKTogUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCBhdHRyU3RhdGU6IG51bWJlcn0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyICwgYXR0clN0YXRlOiBudW1iZXJ9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gVklfRVJST1JcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlckF0dHJTdGF0ZSA9IEJ1ZmZlci5hbGxvYyg0KSAvL3UzMlxyXG5cclxuICAgICAgICBzdGF0dXMgPSBhZ1Zpc2EudmlHZXRBdHRyaWJ1dGUodmlTZXNzaW9uLCBhdHRyaWJ1dGUsIGJ1ZmZlckF0dHJTdGF0ZSBhcyBhbnkpXHJcblxyXG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVmlHZXRBdHRyaWJ1dGVDb21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0clN0YXRlID0gYnVmZmVyQXR0clN0YXRlLnJlYWRVSW50MzJMRSgpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiBzdGF0dXMgLCBhdHRyU3RhdGU6IGF0dHJTdGF0ZX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGB2aUdldEF0dHJpYnV0ZSBFcnJvcjogc3RhdHVzOiAke3N0YXR1c31gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iLCJpbXBvcnQgeyBhZ1Zpc2EgfSBmcm9tIFwiLi9uaV92aXNhXCJcclxuXHJcbmNvbnN0IFZJX0VSUk9SID0gMHg4MDAwMDAwMFxyXG5leHBvcnQgZW51bSBWaU9wZW5Db21wbGV0aW9uQ29kZSB7XHJcbiAgICBWSV9TVUNDRVNTID0gMCwgLy9TZXNzaW9uIHRvIHRoZSBEZWZhdWx0IFJlc291cmNlIE1hbmFnZXIgcmVzb3VyY2UgY3JlYXRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICBWSV9TVUNDRVNTX0RFVl9OUFJFU0VOVCA9IDB4M0ZGRjAwN0QsIC8vIFNlc3Npb24gb3BlbmVkIHN1Y2Nlc3NmdWxseSwgYnV0IHRoZSBkZXZpY2UgYXQgdGhlIHNwZWNpZmllZCBhZGRyZXNzIGlzIG5vdCByZXNwb25kaW5nLlxyXG4gICAgVklfV0FSTl9DT05GSUdfTkxPQURFRCA9IDB4M0ZGRjAwNzcsIC8vIFRoZSBzcGVjaWZpZWQgY29uZmlndXJhdGlvbiBlaXRoZXIgZG9lcyBub3QgZXhpc3Qgb3IgY291bGQgbm90IGJlIGxvYWRlZCB1c2luZyBWSVNBLXNwZWNpZmllZCBkZWZhdWx0cy5cclxuICAgIFZJX1dBUk5fU0VSVkVSX0NFUlRfVU5UUlVTVEVEID0gMHgzRkZGMDBGMCwgLy8gQSBIaVNMSVAgVklTQSBjbGllbnQgZG9lcyBub3QgdHJ1c3QgdGhlIHNlcnZlciBjZXJ0aWZpY2F0ZS5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlPcGVuRXJyb3JDb2RlIHtcclxuICAgIFZJX0VSUk9SX0FMTE9DID0gVklfRVJST1IgKyAweDNGRkYwMDNDLCAvLyBJbnN1ZmZpY2llbnQgc3lzdGVtIHJlc291cmNlcyB0byBvcGVuIGEgc2Vzc2lvbi5cclxuICAgIFZJX0VSUk9SX0lOVEZfTlVNX05DT05GSUcgPSBWSV9FUlJPUiArIDB4M0ZGRjAwQTUsIC8vIFRoZSBpbnRlcmZhY2UgdHlwZSBpcyB2YWxpZCBidXQgdGhlIHNwZWNpZmllZCBpbnRlcmZhY2UgbnVtYmVyIGlzIG5vdCBjb25maWd1cmVkLlxyXG4gICAgVklfRVJST1JfSU5WX0FDQ19NT0RFID0gVklfRVJST1IgKyAweDNGRkYwMDEzLCAvLyBJbnZhbGlkIGFjY2VzcyBtb2RlLlxyXG4gICAgVklfRVJST1JfSU5WX1JTUkNfTkFNRSA9IFZJX0VSUk9SICsgMHgzRkZGMDAxMiwgLy8gSW52YWxpZCByZXNvdXJjZSByZWZlcmVuY2Ugc3BlY2lmaWVkLiBQYXJzaW5nIGVycm9yLlxyXG4gICAgVklfRVJST1JfSU5WX1NFU1NJT04gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX09CSkVDVCA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9JTlZfUFJPVCA9IFZJX0VSUk9SICsgMHgzRkZGMDA3OSwgLy8gVGhlIHJlc291cmNlIGRlc2NyaXB0b3Igc3BlY2lmaWVzIGEgc2VjdXJlIGNvbm5lY3Rpb24sIGJ1dCB0aGUgZGV2aWNlIG9yIFZJU0EgaW1wbGVtZW50YXRpb24gZG9lcyBub3Qgc3VwcG9ydCBzZWN1cmUgY29ubmVjdGlvbnMsIG9yIHNlY3VyaXR5IGhhcyBiZWVuIGRpc2FibGVkIG9uIHRoZSBkZXZpY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBvciB0aGUgYWRkcmVzcyBzdHJpbmcgaW5kaWNhdGVzIGEgc2VjdXJlIGNvbm5lY3Rpb24gc2hvdWxkIGJlIG1hZGUsIGJ1dCB0aGUgZGVzaWduYXRlZCBwb3J0IGlzIG5vdCBmb3IgYSBUTFMgc2VydmVyLiBcclxuICAgIFZJX0VSUk9SX0xJQlJBUllfTkZPVU5EID0gVklfRVJST1IgKyAweDNGRkYwMDlFLCAvLyBBIGNvZGUgbGlicmFyeSByZXF1aXJlZCBieSBWSVNBIGNvdWxkIG5vdCBiZSBsb2NhdGVkIG9yIGxvYWRlZC5cclxuICAgIFZJX0VSUk9SX05QRVJNSVNTSU9OID0gVklfRVJST1IgKyAweDNGRkYwMEE4LCAvLyBBIHNlY3VyZSBjb25uZWN0aW9uIGNvdWxkIG5vdCBiZSBjcmVhdGVkIGJlY2F1c2UgdGhlIGluc3RydW1lbnQgcmVmdXNlZCB0aGUgY3JlZGVudGlhbHMgcHJvZmZlcmVkIGJ5IFZJU0Egb3IgdGhlIGNyZWRlbnRpYWwgaW5mb3JtYXRpb24gY291bGQgbm90IGJlIG1hcHBlZCB0byB2YWxpZCBjcmVkZW50aWFscy4gXHJcbiAgICBWSV9FUlJPUl9OU1VQX09QRVIgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNjcsIC8vIFRoZSBnaXZlbiBzZXNuIGRvZXMgbm90IHN1cHBvcnQgdGhpcyBmdW5jdGlvbi4gRm9yIFZJU0EsIHRoaXMgZnVuY3Rpb24gaXMgc3VwcG9ydGVkIG9ubHkgYnkgdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciBzZXNzaW9uLlxyXG4gICAgVklfRVJST1JfUlNSQ19CVVNZID0gVklfRVJST1IgKyAweDNGRkYwMDcyLCAvLyBUaGUgcmVzb3VyY2UgaXMgdmFsaWQgYnV0IFZJU0EgY2Fubm90IGN1cnJlbnRseSBhY2Nlc3MgaXQuXHJcbiAgICBWSV9FUlJPUl9SU1JDX0xPQ0tFRCA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRiwgLy8gU3BlY2lmaWVkIHR5cGUgb2YgbG9jayBjYW5ub3QgYmUgb2J0YWluZWQgYmVjYXVzZSB0aGUgcmVzb3VyY2UgaXMgYWxyZWFkeSBsb2NrZWQgd2l0aCBhIGxvY2sgdHlwZSBpbmNvbXBhdGlibGUgd2l0aCB0aGUgbG9jayByZXF1ZXN0ZWQuXHJcbiAgICBWSV9FUlJPUl9SU1JDX05GT1VORCA9IFZJX0VSUk9SICsgMHgzRkZGMDAxMSwgLy8gSW5zdWZmaWNpZW50IGxvY2F0aW9uIGluZm9ybWF0aW9uIG9yIHJlc291cmNlIG5vdCBwcmVzZW50IGluIHRoZSBzeXN0ZW0uXHJcbiAgICBWSV9FUlJPUl9TRVJWRVJfQ0VSVCA9IFZJX0VSUk9SICsgMHgzRkZGMDBCMCwgLy8gQSBzZWN1cmUgY29ubmVjdGlvbiBjb3VsZCBub3QgYmUgY3JlYXRlZCBkdWUgdG8gdGhlIGluc3RydW1lbnQgY2VydGlmaWNhdGUgYmVpbmcgaW52YWxpZCBvciB1bnRydXN0ZWQuIFxyXG4gICAgVklfRVJST1JfTkNJQyA9IFZJX0VSUk9SICsgMHgzRkZGMDA2MCwgLy9UaGUgaW50ZXJmYWNlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHNlc3Npb24gaXMgbm90IGN1cnJlbnRseSB0aGUgY29udHJvbGxlciBpbiBjaGFyZ2UuXHJcbiAgICBWSV9FUlJPUl9UTU8gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTUsIC8vIEEgc2Vzc2lvbiB0byB0aGUgcmVzb3VyY2UgY291bGQgbm90IGJlIG9idGFpbmVkIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHRpbWVvdXQgcGVyaW9kLlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpT3Blbih2aVNlc3Npb246IG51bWJlciwgdmlzYV9yZXNvdXJjZTogc3RyaW5nLCB2aUFjY2Vzc01vZGU6IG51bWJlciwgdGltZW91dDogbnVtYmVyKTogUHJvbWlzZTx7IHN0YXR1czogbnVtYmVyLCBzZXNzaW9uOiBudW1iZXIgfT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIHNlc3Npb246IG51bWJlciB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gVklfRVJST1JcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlclNlc3Npb24gPSBCdWZmZXIuYWxsb2MoNCkgLy91MzJcclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpT3Blbih2aVNlc3Npb24sIHZpc2FfcmVzb3VyY2UsIHZpQWNjZXNzTW9kZSwgdGltZW91dCwgYnVmZmVyU2Vzc2lvbiBhcyBhbnkpXHJcblxyXG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTUzpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5Db21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTX0RFVl9OUFJFU0VOVDpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5Db21wbGV0aW9uQ29kZS5WSV9XQVJOX0NPTkZJR19OTE9BREVEOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkNvbXBsZXRpb25Db2RlLlZJX1dBUk5fU0VSVkVSX0NFUlRfVU5UUlVTVEVEOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Vzc2lvbjogbnVtYmVyID0gYnVmZmVyU2Vzc2lvbi5yZWFkVUludDMyTEUoKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCBzZXNzaW9uOiBzZXNzaW9uIH0pXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX0FMTE9DOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9JTlRGX05VTV9OQ09ORklHOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9JTlZfQUNDX01PREU6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX0lOVl9SU1JDX05BTUU6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX0lOVl9TRVNTSU9OOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9JTlZfT0JKRUNUOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9JTlZfUFJPVDpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfTElCUkFSWV9ORk9VTkQ6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX05QRVJNSVNTSU9OOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9OU1VQX09QRVI6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX1JTUkNfQlVTWTpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfUlNSQ19MT0NLRUQ6XHJcbiAgICAgICAgICAgIGNhc2UgVmlPcGVuRXJyb3JDb2RlLlZJX0VSUk9SX1JTUkNfTkZPVU5EOlxyXG4gICAgICAgICAgICBjYXNlIFZpT3BlbkVycm9yQ29kZS5WSV9FUlJPUl9TRVJWRVJfQ0VSVDpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfTkNJQzpcclxuICAgICAgICAgICAgY2FzZSBWaU9wZW5FcnJvckNvZGUuVklfRVJST1JfVE1POntcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoeyBzdGF0dXM6IHN0YXR1cywgc2Vzc2lvbjogLTEgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoYFZpT3BlbjogRXJyb3I6IFN0YXR1cyAke3N0YXR1c31gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iLCJpbXBvcnQgeyBhZ1Zpc2EgfSBmcm9tIFwiLi9uaV92aXNhXCJcclxuXHJcbmNvbnN0IFZJX0VSUk9SID0gMHg4MDAwMDAwMFxyXG5leHBvcnQgZW51bSBWaU9wZW5EZWZhdWx0Uk1Db21wbGV0aW9uQ29kZSB7XHJcbiAgICBWSV9TVUNDRVNTID0gMCAvL1Nlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlPcGVuRGVmYXVsdFJNRXJyb3JDb2RlIHtcclxuICAgIFZJX0VSUk9SX0FMTE9DID0gVklfRVJST1IgKyAweDNGRkYwMDNDLCAvLyBJbnN1ZmZpY2llbnQgc3lzdGVtIHJlc291cmNlcyB0byBjcmVhdGUgYSBzZXNzaW9uIHRvIHRoZSBEZWZhdWx0IFJlc291cmNlIE1hbmFnZXIgcmVzb3VyY2UuXHJcbiAgICBWSV9FUlJPUl9JTlZfU0VUVVAgPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0EsIC8vIFNvbWUgaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmaWxlIGlzIGNvcnJ1cHQgb3IgZG9lcyBub3QgZXhpc3QuXHJcbiAgICBWSV9FUlJPUl9TWVNURU1fRVJST1IgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMDAsIC8vVGhlIFZJU0Egc3lzdGVtIGZhaWxlZCB0byBpbml0aWFsaXplLlxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmlPcGVuRGVmYXVsdFJNKCk6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgZGVmYXVsdFJNOiBudW1iZXIgfT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3RhdHVzOiBudW1iZXIsIGRlZmF1bHRSTTogbnVtYmVyIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBWSV9FUlJPUlxyXG4gICAgICAgIC8vIGFsbG9jYXRlIGEgYnVmZmVyIGZvciB0aGUgc2Vzc2lvbiByZXNwb25zZVxyXG4gICAgICAgIGxldCBidWZmZXIgPSBCdWZmZXIuYWxsb2MoNClcclxuXHJcbiAgICAgICAgc3RhdHVzID0gYWdWaXNhLnZpT3BlbkRlZmF1bHRSTShidWZmZXIgYXMgYW55KVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzID09PSBWaU9wZW5EZWZhdWx0Uk1Db21wbGV0aW9uQ29kZS5WSV9TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXNzaW9uOiBudW1iZXIgPSBidWZmZXIucmVhZFVJbnQzMkxFKClcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCBkZWZhdWx0Uk06IHNlc3Npb24gfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlamVjdChgdmlPcGVuRGVmYXVsdFJNIEVycm9yOiBzdGF0dXM6ICR7c3RhdHVzfWApXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsImltcG9ydCB7IGFnVmlzYSB9IGZyb20gXCIuL25pX3Zpc2FcIlxyXG5cclxuY29uc3QgVklfRVJST1IgPSAweDgwMDAwMDAwXHJcblxyXG5leHBvcnQgZW51bSBWaVJlYWRDb21wbGV0aW9uQ29kZSB7XHJcbiAgICBWSV9TVUNDRVNTID0gMCwgLy9TZXNzaW9uIHRvIHRoZSBEZWZhdWx0IFJlc291cmNlIE1hbmFnZXIgcmVzb3VyY2UgY3JlYXRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICBWSV9TVUNDRVNTX1RFUk1fQ0hBUiA9IDB4M0ZGRjAwMDUsLy8gVGhlIHNwZWNpZmllZCB0ZXJtaW5hdGlvbiBjaGFyYWN0ZXIgd2FzIHJlYWQuXHJcbiAgICBWSV9TVUNDRVNTX01BWF9DTlQgPSAweDNGRkYwMDA2LC8vIFRoZSBudW1iZXIgb2YgYnl0ZXMgcmVhZCBpcyBlcXVhbCB0byBjb3VudC5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWaVJlYWRFcnJvckNvZGUge1xyXG4gICAgVklfRVJST1JfQVNSTF9GUkFNSU5HID0gVklfRVJST1IgKyAweDNGRkYwMDZCLCAvLyBBIGZyYW1pbmcgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfQVNSTF9PVkVSUlVOID0gVklfRVJST1IgKyAweDNGRkYwMDZDLCAvLyBBbiBvdmVycnVuIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci4gQSBjaGFyYWN0ZXIgd2FzIG5vdCByZWFkIGZyb20gdGhlIGhhcmR3YXJlIGJlZm9yZSB0aGUgbmV4dCBjaGFyYWN0ZXIgYXJyaXZlZC5cclxuICAgIFZJX0VSUk9SX0FTUkxfUEFSSVRZID0gVklfRVJST1IgKyAweDNGRkYwMDZBLCAvLyBBIHBhcml0eSBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9CRVJSID0gVklfRVJST1IgKyAweDNGRkYwMDM4LCAvLyBCdXMgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfQ09OTl9MT1NUID0gVklfRVJST1IgKyAweDNGRkYwMEE2LCAgLy8gVGhlIEkvTyBjb25uZWN0aW9uIGZvciB0aGUgZ2l2ZW4gc2Vzc2lvbiBoYXMgYmVlbiBsb3N0LlxyXG4gICAgVklfRVJST1JfSU5WX1NFU1NJT04gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX09CSkVDVCA9IFZJX0VSUk9SICsgMHgzRkZGMDAwRSwgLy8gVGhlIGdpdmVuIHNlc3Npb24gb3Igb2JqZWN0IHJlZmVyZW5jZSBpcyBpbnZhbGlkIChib3RoIGFyZSB0aGUgc2FtZSB2YWx1ZSkuXHJcbiAgICBWSV9FUlJPUl9JTlZfU0VUVVAgPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0EsIC8vIFVuYWJsZSB0byBzdGFydCB3cml0ZSBmdW5jdGlvbiBiZWNhdXNlIHNldHVwIGlzIGludmFsaWQgKGR1ZSB0byBhdHRyaWJ1dGVzIGJlaW5nIHNldCB0byBhbiBpbmNvbnNpc3RlbnQgc3RhdGUpLlxyXG4gICAgVklfRVJST1JfSU8gPSBWSV9FUlJPUiArIDB4M0ZGRjAwM0UsIC8vIFVua25vd24gSS9PIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX05DSUMgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNjAsIC8vIFRoZSBpbnRlcmZhY2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiB2aSBpcyBub3QgY3VycmVudGx5IHRoZSBjb250cm9sbGVyIGluIGNoYXJnZS5cclxuICAgIFZJX0VSUk9SX05MSVNURU5FUlMgPSBWSV9FUlJPUiArIDB4M0ZGRjAwNUYsIC8vIE5vIExpc3RlbmVycyBjb25kaXRpb24gaXMgZGV0ZWN0ZWQgKGJvdGggTlJGRCBhbmQgTkRBQyBhcmUgZGUtYXNzZXJ0ZWQpLlxyXG4gICAgVklfRVJST1JfTlNVUF9PUEVSID0gVklfRVJST1IgKyAweDNGRkYwMDY3LCAvLyBUaGUgZ2l2ZW4gdmkgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIGZ1bmN0aW9uLlxyXG4gICAgVklfRVJST1JfT1VUUF9QUk9UX1ZJT0wgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzYsIC8vICBEZXZpY2UgcmVwb3J0ZWQgYW4gb3V0cHV0IHByb3RvY29sIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX1JBV19SRF9QUk9UX1ZJT0wgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzUsIC8vIFZpb2xhdGlvbiBvZiByYXcgcmVhZCBwcm90b2NvbCBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9SQVdfV1JfUFJPVF9WSU9MID0gVklfRVJST1IgKyAweDNGRkYwMDM0LCAvLyBWaW9sYXRpb24gb2YgcmF3IHdyaXRlIHByb3RvY29sIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX1JTUkNfTE9DS0VEID0gVklfRVJST1IgKyAweDNGRkYwMDBGLCAvLyBTcGVjaWZpZWQgb3BlcmF0aW9uIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgYmVjYXVzZSB0aGUgcmVzb3VyY2UgaWRlbnRpZmllZCBieSB2aSBoYXMgYmVlbiBsb2NrZWQgZm9yIHRoaXMga2luZCBvZiBhY2Nlc3MuXHJcbiAgICBWSV9FUlJPUl9UTU8gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTUsIC8vIEEgc2Vzc2lvbiB0byB0aGUgcmVzb3VyY2UgY291bGQgbm90IGJlIG9idGFpbmVkIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHRpbWVvdXQgcGVyaW9kLlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpUmVhZCh2aVNlc3Npb246IG51bWJlciwgY291bnQ6bnVtYmVyICk6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgcmV0Q291bnQ6IG51bWJlciwgYnVmOnN0cmluZyB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgcmV0Q291bnQ6IG51bWJlciwgYnVmOiBzdHJpbmcgfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGxldCBzdGF0dXM6IG51bWJlciA9IFZJX0VSUk9SXHJcblxyXG4gICAgICAgIGxldCBidWZmZXJSZXRDb3VudCA9IEJ1ZmZlci5hbGxvYyg0KSAvL3UzMlxyXG4gICAgICAgIGxldCBidWZmZXJCdWYgPSBCdWZmZXIuYWxsb2MoY291bnQpIC8vdTMyXHJcblxyXG4gICAgICAgIHN0YXR1cyA9IGFnVmlzYS52aVJlYWQodmlTZXNzaW9uLCBidWZmZXJCdWYgYXMgYW55LCBjb3VudCwgYnVmZmVyUmV0Q291bnQgYXMgYW55KVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFZpUmVhZENvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1M6XHJcbiAgICAgICAgICAgIGNhc2UgVmlSZWFkQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTU19NQVhfQ05UOlxyXG4gICAgICAgICAgICBjYXNlIFZpUmVhZENvbXBsZXRpb25Db2RlLlZJX1NVQ0NFU1NfVEVSTV9DSEFSOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0Q291bnQ6IG51bWJlciA9IGJ1ZmZlclJldENvdW50LnJlYWRVSW50MzJMRSgpXHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmOiBzdHJpbmcgPSBidWZmZXJCdWYucmVhZENTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCByZXRDb3VudDogcmV0Q291bnQsIGJ1ZjogYnVmICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChgdmlSZWFkIEVycm9yOiBzdGF0dXM6ICR7c3RhdHVzfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgYWdWaXNhIH0gZnJvbSBcIi4vbmlfdmlzYVwiXHJcblxyXG5jb25zdCBWSV9FUlJPUiA9IDB4ODAwMDAwMDBcclxuZXhwb3J0IGVudW0gVmlXcml0ZUNvbXBsZXRpb25Db2RlIHtcclxuICAgIFZJX1NVQ0NFU1MgPSAwLCAvL1Nlc3Npb24gdG8gdGhlIERlZmF1bHQgUmVzb3VyY2UgTWFuYWdlciByZXNvdXJjZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlXcml0ZUVycm9yQ29kZSB7XHJcbiAgICBWSV9FUlJPUl9CRVJSID0gVklfRVJST1IgKyAweDNGRkYwMDM4LCAvLyBCdXMgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRyYW5zZmVyLlxyXG4gICAgVklfRVJST1JfQ09OTl9MT1NUID0gVklfRVJST1IgKyAweDNGRkYwMEE2LCAgLy8gVGhlIEkvTyBjb25uZWN0aW9uIGZvciB0aGUgZ2l2ZW4gc2Vzc2lvbiBoYXMgYmVlbiBsb3N0LlxyXG4gICAgVklfRVJST1JfSU5QX1BST1RfVklPTCA9IFZJX0VSUk9SICsgMHgzRkZGMDAzNywgLy8gRGV2aWNlIHJlcG9ydGVkIGFuIGlucHV0IHByb3RvY29sIGVycm9yIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX0lOVl9TRVNTSU9OID0gVklfRVJST1IgKyAweDNGRkYwMDBFLCAvLyBUaGUgZ2l2ZW4gc2Vzc2lvbiBvciBvYmplY3QgcmVmZXJlbmNlIGlzIGludmFsaWQgKGJvdGggYXJlIHRoZSBzYW1lIHZhbHVlKS5cclxuICAgIFZJX0VSUk9SX0lOVl9PQkpFQ1QgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMEUsIC8vIFRoZSBnaXZlbiBzZXNzaW9uIG9yIG9iamVjdCByZWZlcmVuY2UgaXMgaW52YWxpZCAoYm90aCBhcmUgdGhlIHNhbWUgdmFsdWUpLlxyXG4gICAgVklfRVJST1JfSU5WX1NFVFVQID0gVklfRVJST1IgKyAweDNGRkYwMDNBLCAvLyBVbmFibGUgdG8gc3RhcnQgd3JpdGUgZnVuY3Rpb24gYmVjYXVzZSBzZXR1cCBpcyBpbnZhbGlkIChkdWUgdG8gYXR0cmlidXRlcyBiZWluZyBzZXQgdG8gYW4gaW5jb25zaXN0ZW50IHN0YXRlKS5cclxuICAgIFZJX0VSUk9SX0lPID0gVklfRVJST1IgKyAweDNGRkYwMDNFLCAvLyBVbmtub3duIEkvTyBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9OQ0lDID0gVklfRVJST1IgKyAweDNGRkYwMDYwLCAvLyBUaGUgaW50ZXJmYWNlIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gdmkgaXMgbm90IGN1cnJlbnRseSB0aGUgY29udHJvbGxlciBpbiBjaGFyZ2UuXHJcbiAgICBWSV9FUlJPUl9OTElTVEVORVJTID0gVklfRVJST1IgKyAweDNGRkYwMDVGLCAvLyBObyBMaXN0ZW5lcnMgY29uZGl0aW9uIGlzIGRldGVjdGVkIChib3RoIE5SRkQgYW5kIE5EQUMgYXJlIGRlLWFzc2VydGVkKS5cclxuICAgIFZJX0VSUk9SX05TVVBfT1BFUiA9IFZJX0VSUk9SICsgMHgzRkZGMDA2NywgLy8gVGhlIGdpdmVuIHZpIGRvZXMgbm90IHN1cHBvcnQgdGhpcyBmdW5jdGlvbi5cclxuICAgIFZJX0VSUk9SX1JBV19SRF9QUk9UX1ZJT0wgPSBWSV9FUlJPUiArIDB4M0ZGRjAwMzUsIC8vIFZpb2xhdGlvbiBvZiByYXcgcmVhZCBwcm90b2NvbCBvY2N1cnJlZCBkdXJpbmcgdHJhbnNmZXIuXHJcbiAgICBWSV9FUlJPUl9SQVdfV1JfUFJPVF9WSU9MID0gVklfRVJST1IgKyAweDNGRkYwMDM0LCAvLyBWaW9sYXRpb24gb2YgcmF3IHdyaXRlIHByb3RvY29sIG9jY3VycmVkIGR1cmluZyB0cmFuc2Zlci5cclxuICAgIFZJX0VSUk9SX1JTUkNfTE9DS0VEID0gVklfRVJST1IgKyAweDNGRkYwMDBGLCAvLyBTcGVjaWZpZWQgb3BlcmF0aW9uIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgYmVjYXVzZSB0aGUgcmVzb3VyY2UgaWRlbnRpZmllZCBieSB2aSBoYXMgYmVlbiBsb2NrZWQgZm9yIHRoaXMga2luZCBvZiBhY2Nlc3MuXHJcbiAgICBWSV9FUlJPUl9UTU8gPSBWSV9FUlJPUiArIDB4M0ZGRjAwMTUsIC8vIEEgc2Vzc2lvbiB0byB0aGUgcmVzb3VyY2UgY291bGQgbm90IGJlIG9idGFpbmVkIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHRpbWVvdXQgcGVyaW9kLlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZpV3JpdGUodmlTZXNzaW9uOiBudW1iZXIsIGJ1ZmY6IHN0cmluZyk6IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgcmV0Q291bnQ6IG51bWJlciB9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGF0dXM6IG51bWJlciwgcmV0Q291bnQ6IG51bWJlciB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gVklfRVJST1JcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlclJldENvdW50ID0gQnVmZmVyLmFsbG9jKDQpIC8vdTMyXHJcblxyXG4gICAgICAgIHN0YXR1cyA9IGFnVmlzYS52aVdyaXRlKHZpU2Vzc2lvbiwgYnVmZiwgYnVmZi5sZW5ndGgsIGJ1ZmZlclJldENvdW50IGFzIGFueSlcclxuXHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBWaVdyaXRlQ29tcGxldGlvbkNvZGUuVklfU1VDQ0VTUzoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJldENvdW50OiBudW1iZXIgPSBidWZmZXJSZXRDb3VudC5yZWFkVUludDMyTEUoKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogc3RhdHVzLCByZXRDb3VudDogcmV0Q291bnQgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoYHZpV3JpdGUgRXJyb3I6IHN0YXR1czogJHtzdGF0dXN9YClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmZmktbmFwaVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWYtbmFwaVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy9pbXBvcnQgeyB2aXNhQXN5bmNRdWVyeSwgdmlzYVF1ZXJ5LCB2aXNhUXVlcnlUb1Byb21pc2UgfSBmcm9tICcuL25pLXZpc2EvbmlfdmlzYSdcclxuZXhwb3J0IHsgdmlDbG9zZSB9IGZyb20gJy4vbmktdmlzYS92aV9jbG9zZSc7XHJcbmV4cG9ydCB7IHZpT3BlbiB9IGZyb20gJy4vbmktdmlzYS92aV9vcGVuJztcclxuZXhwb3J0IHsgdmlPcGVuRGVmYXVsdFJNIH0gZnJvbSAnLi9uaS12aXNhL3ZpX29wZW5fZGVmYXVsdF9yX20nO1xyXG5leHBvcnQgeyB2aVJlYWQgfSBmcm9tICcuL25pLXZpc2EvdmlfcmVhZCc7XHJcbmV4cG9ydCB7IHZpV3JpdGUgfSBmcm9tICcuL25pLXZpc2Evdmlfd3JpdGUnO1xyXG5leHBvcnQgeyBnZXRSZXNvdXJjZXMgfSBmcm9tICcuL25pLXZpc2EvZ2V0X3Jlc291cmNlcyciXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=