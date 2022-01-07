import ref from 'ref-napi'
export const ViInt16 = ref.types.int16;
export const ViInt32 = ref.types.int32;
export const ViPInt32 = ref.refType(ViInt32);

export const ViUInt32 = ref.types.uint32;
export const ViPUInt32 = ref.refType(ViUInt32);
export const ViPInt16 = ref.refType(ViInt16);
export const ViUInt16 = ref.types.uint16;
export const ViPUInt16 = ref.refType(ViUInt16);
export const ViChar = ref.types.char;
export const ViPChar = ref.refType(ViChar);
export const ViByte = ref.types.uchar;
export const ViPByte = ref.refType(ViByte);

// Note, this needs to be ViUInt32, not ViInt32 other we get negative hex
export const ViStatus = ViUInt32;
export const ViPStatus = ref.refType(ViStatus)
export const ViObject = ViUInt32;
export const ViPObject = ref.refType(ViObject)
export const ViSession = ViUInt32;
export const ViEvent = ViObject;

export const ViPEvent = ref.refType(ViEvent);
export const ViAttr = ViUInt32;
export const ViPSession = ref.refType(ViSession);
export const ViString = ViPChar;
export const ViConstString = ViString;
export const ViRsrc = ViString;
export const ViConstRsrc = ViConstString;
export const ViAccessMode = ViUInt32;
export const ViBuf = ViPByte;
export const ViPBuf = ViPByte;
export const ViConstBuf = ViPByte;
export const ViFindList = ViObject;
export const ViPFindList = ref.refType(ViFindList);

export const ViJobId = ViUInt32
export const ViPJobId = ref.refType(ViJobId)

export const ViEventType = ViUInt32
export const ViPEventType = ref.refType(ViEventType)

export const ViEventFilter = ViUInt32