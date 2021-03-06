export declare enum ViAccessMode {
    VI_NO_LOCK = 0,
    VI_EXCLUSIVE_LOCK = 1,
    VI_SHARED_LOCK = 2
}
export declare enum NiVisaConstants {
    VI_NULL = 0,
    VI_ERROR = 2147483648,
    VI_SPEC_VERSION = 5244928,
    VI_ATTR_RSRC_CLASS = 3221159937,
    VI_ATTR_RSRC_NAME = 3221159938,
    VI_ATTR_RSRC_IMPL_VERSION = 1073676291,
    VI_ATTR_RSRC_LOCK_STATE = 1073676292,
    VI_ATTR_MAX_QUEUE_LENGTH = 1073676293,
    VI_ATTR_USER_DATA_32 = 1073676295,
    VI_ATTR_FDC_CHNL = 1073676301,
    VI_ATTR_FDC_MODE = 1073676303,
    VI_ATTR_FDC_GEN_SIGNAL_EN = 1073676305,
    VI_ATTR_FDC_USE_PAIR = 1073676307,
    VI_ATTR_SEND_END_EN = 1073676310,
    VI_ATTR_TERMCHAR = 1073676312,
    VI_ATTR_TMO_VALUE = 1073676314,
    VI_ATTR_GPIB_READDR_EN = 1073676315,
    VI_ATTR_IO_PROT = 1073676316,
    VI_ATTR_DMA_ALLOW_EN = 1073676318,
    VI_ATTR_ASRL_BAUD = 1073676321,
    VI_ATTR_ASRL_DATA_BITS = 1073676322,
    VI_ATTR_ASRL_PARITY = 1073676323,
    VI_ATTR_ASRL_STOP_BITS = 1073676324,
    VI_ATTR_ASRL_FLOW_CNTRL = 1073676325,
    VI_ATTR_RD_BUF_OPER_MODE = 1073676330,
    VI_ATTR_RD_BUF_SIZE = 1073676331,
    VI_ATTR_WR_BUF_OPER_MODE = 1073676333,
    VI_ATTR_WR_BUF_SIZE = 1073676334,
    VI_ATTR_SUPPRESS_END_EN = 1073676342,
    VI_ATTR_TERMCHAR_EN = 1073676344,
    VI_ATTR_DEST_ACCESS_PRIV = 1073676345,
    VI_ATTR_DEST_BYTE_ORDER = 1073676346,
    VI_ATTR_SRC_ACCESS_PRIV = 1073676348,
    VI_ATTR_SRC_BYTE_ORDER = 1073676349,
    VI_ATTR_SRC_INCREMENT = 1073676352,
    VI_ATTR_DEST_INCREMENT = 1073676353,
    VI_ATTR_WIN_ACCESS_PRIV = 1073676357,
    VI_ATTR_WIN_BYTE_ORDER = 1073676359,
    VI_ATTR_GPIB_ATN_STATE = 1073676375,
    VI_ATTR_GPIB_ADDR_STATE = 1073676380,
    VI_ATTR_GPIB_CIC_STATE = 1073676382,
    VI_ATTR_GPIB_NDAC_STATE = 1073676386,
    VI_ATTR_GPIB_SRQ_STATE = 1073676391,
    VI_ATTR_GPIB_SYS_CNTRL_STATE = 1073676392,
    VI_ATTR_GPIB_HS488_CBL_LEN = 1073676393,
    VI_ATTR_CMDR_LA = 1073676395,
    VI_ATTR_VXI_DEV_CLASS = 1073676396,
    VI_ATTR_MAINFRAME_LA = 1073676400,
    VI_ATTR_MANF_NAME = 3221160050,
    VI_ATTR_MODEL_NAME = 3221160055,
    VI_ATTR_VXI_VME_INTR_STATUS = 1073676427,
    VI_ATTR_VXI_TRIG_STATUS = 1073676429,
    VI_ATTR_VXI_VME_SYSFAIL_STATE = 1073676436,
    VI_ATTR_WIN_BASE_ADDR_32 = 1073676440,
    VI_ATTR_WIN_SIZE_32 = 1073676442,
    VI_ATTR_ASRL_AVAIL_NUM = 1073676460,
    VI_ATTR_MEM_BASE_32 = 1073676461,
    VI_ATTR_ASRL_CTS_STATE = 1073676462,
    VI_ATTR_ASRL_DCD_STATE = 1073676463,
    VI_ATTR_ASRL_DSR_STATE = 1073676465,
    VI_ATTR_ASRL_DTR_STATE = 1073676466,
    VI_ATTR_ASRL_END_IN = 1073676467,
    VI_ATTR_ASRL_END_OUT = 1073676468,
    VI_ATTR_ASRL_REPLACE_CHAR = 1073676478,
    VI_ATTR_ASRL_RI_STATE = 1073676479,
    VI_ATTR_ASRL_RTS_STATE = 1073676480,
    VI_ATTR_ASRL_XON_CHAR = 1073676481,
    VI_ATTR_ASRL_XOFF_CHAR = 1073676482,
    VI_ATTR_WIN_ACCESS = 1073676483,
    VI_ATTR_RM_SESSION = 1073676484,
    VI_ATTR_VXI_LA = 1073676501,
    VI_ATTR_MANF_ID = 1073676505,
    VI_ATTR_MEM_SIZE_32 = 1073676509,
    VI_ATTR_MEM_SPACE = 1073676510,
    VI_ATTR_MODEL_CODE = 1073676511,
    VI_ATTR_SLOT = 1073676520,
    VI_ATTR_INTF_INST_NAME = 3221160169,
    VI_ATTR_IMMEDIATE_SERV = 1073676544,
    VI_ATTR_INTF_PARENT_NUM = 1073676545,
    VI_ATTR_RSRC_SPEC_VERSION = 1073676656,
    VI_ATTR_INTF_TYPE = 1073676657,
    VI_ATTR_GPIB_PRIMARY_ADDR = 1073676658,
    VI_ATTR_GPIB_SECONDARY_ADDR = 1073676659,
    VI_ATTR_RSRC_MANF_NAME = 3221160308,
    VI_ATTR_RSRC_MANF_ID = 1073676661,
    VI_ATTR_INTF_NUM = 1073676662,
    VI_ATTR_TRIG_ID = 1073676663,
    VI_ATTR_GPIB_REN_STATE = 1073676673,
    VI_ATTR_GPIB_UNADDR_EN = 1073676676,
    VI_ATTR_DEV_STATUS_BYTE = 1073676681,
    VI_ATTR_FILE_APPEND_EN = 1073676690,
    VI_ATTR_VXI_TRIG_SUPPORT = 1073676692,
    VI_ATTR_TCPIP_ADDR = 3221160341,
    VI_ATTR_TCPIP_HOSTNAME = 3221160342,
    VI_ATTR_TCPIP_PORT = 1073676695,
    VI_ATTR_TCPIP_DEVICE_NAME = 3221160345,
    VI_ATTR_TCPIP_NODELAY = 1073676698,
    VI_ATTR_TCPIP_KEEPALIVE = 1073676699,
    VI_ATTR_4882_COMPLIANT = 1073676703,
    VI_ATTR_USB_SERIAL_NUM = 3221160352,
    VI_ATTR_USB_INTFC_NUM = 1073676705,
    VI_ATTR_USB_PROTOCOL = 1073676711,
    VI_ATTR_USB_MAX_INTR_SIZE = 1073676719,
    VI_ATTR_PXI_DEV_NUM = 1073676801,
    VI_ATTR_PXI_FUNC_NUM = 1073676802,
    VI_ATTR_PXI_BUS_NUM = 1073676805,
    VI_ATTR_PXI_CHASSIS = 1073676806,
    VI_ATTR_PXI_SLOTPATH = 3221160455,
    VI_ATTR_PXI_SLOT_LBUS_LEFT = 1073676808,
    VI_ATTR_PXI_SLOT_LBUS_RIGHT = 1073676809,
    VI_ATTR_PXI_TRIG_BUS = 1073676810,
    VI_ATTR_PXI_STAR_TRIG_BUS = 1073676811,
    VI_ATTR_PXI_STAR_TRIG_LINE = 1073676812,
    VI_ATTR_PXI_SRC_TRIG_BUS = 1073676813,
    VI_ATTR_PXI_DEST_TRIG_BUS = 1073676814,
    VI_ATTR_PXI_MEM_TYPE_BAR0 = 1073676817,
    VI_ATTR_PXI_MEM_TYPE_BAR1 = 1073676818,
    VI_ATTR_PXI_MEM_TYPE_BAR2 = 1073676819,
    VI_ATTR_PXI_MEM_TYPE_BAR3 = 1073676820,
    VI_ATTR_PXI_MEM_TYPE_BAR4 = 1073676821,
    VI_ATTR_PXI_MEM_TYPE_BAR5 = 1073676822,
    VI_ATTR_PXI_MEM_BASE_BAR0_32 = 1073676833,
    VI_ATTR_PXI_MEM_BASE_BAR1_32 = 1073676834,
    VI_ATTR_PXI_MEM_BASE_BAR2_32 = 1073676835,
    VI_ATTR_PXI_MEM_BASE_BAR3_32 = 1073676836,
    VI_ATTR_PXI_MEM_BASE_BAR4_32 = 1073676837,
    VI_ATTR_PXI_MEM_BASE_BAR5_32 = 1073676838,
    VI_ATTR_PXI_MEM_BASE_BAR0_64 = 1073676840,
    VI_ATTR_PXI_MEM_BASE_BAR1_64 = 1073676841,
    VI_ATTR_PXI_MEM_BASE_BAR2_64 = 1073676842,
    VI_ATTR_PXI_MEM_BASE_BAR3_64 = 1073676843,
    VI_ATTR_PXI_MEM_BASE_BAR4_64 = 1073676844,
    VI_ATTR_PXI_MEM_BASE_BAR5_64 = 1073676845,
    VI_ATTR_PXI_MEM_SIZE_BAR0_32 = 1073676849,
    VI_ATTR_PXI_MEM_SIZE_BAR1_32 = 1073676850,
    VI_ATTR_PXI_MEM_SIZE_BAR2_32 = 1073676851,
    VI_ATTR_PXI_MEM_SIZE_BAR3_32 = 1073676852,
    VI_ATTR_PXI_MEM_SIZE_BAR4_32 = 1073676853,
    VI_ATTR_PXI_MEM_SIZE_BAR5_32 = 1073676854,
    VI_ATTR_PXI_MEM_SIZE_BAR0_64 = 1073676856,
    VI_ATTR_PXI_MEM_SIZE_BAR1_64 = 1073676857,
    VI_ATTR_PXI_MEM_SIZE_BAR2_64 = 1073676858,
    VI_ATTR_PXI_MEM_SIZE_BAR3_64 = 1073676859,
    VI_ATTR_PXI_MEM_SIZE_BAR4_64 = 1073676860,
    VI_ATTR_PXI_MEM_SIZE_BAR5_64 = 1073676861,
    VI_ATTR_PXI_IS_EXPRESS = 1073676864,
    VI_ATTR_PXI_SLOT_LWIDTH = 1073676865,
    VI_ATTR_PXI_MAX_LWIDTH = 1073676866,
    VI_ATTR_PXI_ACTUAL_LWIDTH = 1073676867,
    VI_ATTR_PXI_DSTAR_BUS = 1073676868,
    VI_ATTR_PXI_DSTAR_SET = 1073676869,
    VI_ATTR_PXI_ALLOW_WRITE_COMBINE = 1073676870,
    VI_ATTR_TCPIP_HISLIP_OVERLAP_EN = 1073677056,
    VI_ATTR_TCPIP_HISLIP_VERSION = 1073677057,
    VI_ATTR_TCPIP_HISLIP_MAX_MESSAGE_KB = 1073677058,
    VI_ATTR_TCPIP_IS_HISLIP = 1073677059,
    VI_ATTR_JOB_ID = 1073692678,
    VI_ATTR_EVENT_TYPE = 1073692688,
    VI_ATTR_SIGP_STATUS_ID = 1073692689,
    VI_ATTR_RECV_TRIG_ID = 1073692690,
    VI_ATTR_INTR_STATUS_ID = 1073692707,
    VI_ATTR_STATUS = 1073692709,
    VI_ATTR_RET_COUNT_32 = 1073692710,
    VI_ATTR_BUFFER = 1073692711,
    VI_ATTR_RECV_INTR_LEVEL = 1073692737,
    VI_ATTR_OPER_NAME = 3221176386,
    VI_ATTR_GPIB_RECV_CIC_STATE = 1073693075,
    VI_ATTR_RECV_TCPIP_ADDR = 3221176728,
    VI_ATTR_USB_RECV_INTR_SIZE = 1073693104,
    VI_ATTR_USB_RECV_INTR_DATA = 3221176753,
    VI_ATTR_PXI_RECV_INTR_SEQ = 1073693248,
    VI_ATTR_PXI_RECV_INTR_DATA = 1073693249,
    VI_ATTR_USER_DATA_64 = 1073676298,
    VI_ATTR_RET_COUNT_64 = 1073692712,
    VI_ATTR_USER_DATA = 1073676298,
    VI_ATTR_RET_COUNT = 1073692712,
    VI_EVENT_IO_COMPLETION = 1073684489,
    VI_EVENT_TRIG = 3221168138,
    VI_EVENT_SERVICE_REQ = 1073684491,
    VI_EVENT_CLEAR = 1073684493,
    VI_EVENT_EXCEPTION = 3221168142,
    VI_EVENT_GPIB_CIC = 1073684498,
    VI_EVENT_GPIB_TALK = 1073684499,
    VI_EVENT_GPIB_LISTEN = 1073684500,
    VI_EVENT_VXI_VME_SYSFAIL = 1073684509,
    VI_EVENT_VXI_VME_SYSRESET = 1073684510,
    VI_EVENT_VXI_SIGP = 1073684512,
    VI_EVENT_VXI_VME_INTR = 3221168161,
    VI_EVENT_PXI_INTR = 1073684514,
    VI_EVENT_TCPIP_CONNECT = 1073684534,
    VI_EVENT_USB_INTR = 1073684535,
    VI_ALL_ENABLED_EVENTS = 1073709055,
    VI_SUCCESS_EVENT_EN = 1073676290,
    VI_SUCCESS_EVENT_DIS = 1073676291,
    VI_SUCCESS_QUEUE_EMPTY = 1073676292,
    VI_SUCCESS_TERM_CHAR = 1073676293,
    VI_SUCCESS_MAX_CNT = 1073676294,
    VI_SUCCESS_DEV_NPRESENT = 1073676413,
    VI_SUCCESS_TRIG_MAPPED = 1073676414,
    VI_SUCCESS_QUEUE_NEMPTY = 1073676416,
    VI_SUCCESS_NCHAIN = 1073676440,
    VI_SUCCESS_NESTED_SHARED = 1073676441,
    VI_SUCCESS_NESTED_EXCLUSIVE = 1073676442,
    VI_SUCCESS_SYNC = 1073676443,
    VI_WARN_QUEUE_OVERFLOW = 1073676300,
    VI_WARN_CONFIG_NLOADED = 1073676407,
    VI_WARN_NULL_OBJECT = 1073676418,
    VI_WARN_NSUP_ATTR_STATE = 1073676420,
    VI_WARN_UNKNOWN_STATUS = 1073676421,
    VI_WARN_NSUP_BUF = 1073676424,
    VI_WARN_EXT_FUNC_NIMPL = 1073676457,
    VI_ERROR_SYSTEM_ERROR = 3221159936,
    VI_ERROR_INV_OBJECT = 3221159950,
    VI_ERROR_RSRC_LOCKED = 3221159951,
    VI_ERROR_INV_EXPR = 3221159952,
    VI_ERROR_RSRC_NFOUND = 3221159953,
    VI_ERROR_INV_RSRC_NAME = 3221159954,
    VI_ERROR_INV_ACC_MODE = 3221159955,
    VI_ERROR_TMO = 3221159957,
    VI_ERROR_CLOSING_FAILED = 3221159958,
    VI_ERROR_INV_DEGREE = 3221159963,
    VI_ERROR_INV_JOB_ID = 3221159964,
    VI_ERROR_NSUP_ATTR = 3221159965,
    VI_ERROR_NSUP_ATTR_STATE = 3221159966,
    VI_ERROR_ATTR_READONLY = 3221159967,
    VI_ERROR_INV_LOCK_TYPE = 3221159968,
    VI_ERROR_INV_ACCESS_KEY = 3221159969,
    VI_ERROR_INV_EVENT = 3221159974,
    VI_ERROR_INV_MECH = 3221159975,
    VI_ERROR_HNDLR_NINSTALLED = 3221159976,
    VI_ERROR_INV_HNDLR_REF = 3221159977,
    VI_ERROR_INV_CONTEXT = 3221159978,
    VI_ERROR_QUEUE_OVERFLOW = 3221159981,
    VI_ERROR_NENABLED = 3221159983,
    VI_ERROR_ABORT = 3221159984,
    VI_ERROR_RAW_WR_PROT_VIOL = 3221159988,
    VI_ERROR_RAW_RD_PROT_VIOL = 3221159989,
    VI_ERROR_OUTP_PROT_VIOL = 3221159990,
    VI_ERROR_INP_PROT_VIOL = 3221159991,
    VI_ERROR_BERR = 3221159992,
    VI_ERROR_IN_PROGRESS = 3221159993,
    VI_ERROR_INV_SETUP = 3221159994,
    VI_ERROR_QUEUE_ERROR = 3221159995,
    VI_ERROR_ALLOC = 3221159996,
    VI_ERROR_INV_MASK = 3221159997,
    VI_ERROR_IO = 3221159998,
    VI_ERROR_INV_FMT = 3221159999,
    VI_ERROR_NSUP_FMT = 3221160001,
    VI_ERROR_LINE_IN_USE = 3221160002,
    VI_ERROR_LINE_NRESERVED = 3221160003,
    VI_ERROR_NSUP_MODE = 3221160006,
    VI_ERROR_SRQ_NOCCURRED = 3221160010,
    VI_ERROR_INV_SPACE = 3221160014,
    VI_ERROR_INV_OFFSET = 3221160017,
    VI_ERROR_INV_WIDTH = 3221160018,
    VI_ERROR_NSUP_OFFSET = 3221160020,
    VI_ERROR_NSUP_VAR_WIDTH = 3221160021,
    VI_ERROR_WINDOW_NMAPPED = 3221160023,
    VI_ERROR_RESP_PENDING = 3221160025,
    VI_ERROR_NLISTENERS = 3221160031,
    VI_ERROR_NCIC = 3221160032,
    VI_ERROR_NSYS_CNTLR = 3221160033,
    VI_ERROR_NSUP_OPER = 3221160039,
    VI_ERROR_INTR_PENDING = 3221160040,
    VI_ERROR_ASRL_PARITY = 3221160042,
    VI_ERROR_ASRL_FRAMING = 3221160043,
    VI_ERROR_ASRL_OVERRUN = 3221160044,
    VI_ERROR_TRIG_NMAPPED = 3221160046,
    VI_ERROR_NSUP_ALIGN_OFFSET = 3221160048,
    VI_ERROR_USER_BUF = 3221160049,
    VI_ERROR_RSRC_BUSY = 3221160050,
    VI_ERROR_NSUP_WIDTH = 3221160054,
    VI_ERROR_INV_PARAMETER = 3221160056,
    VI_ERROR_INV_PROT = 3221160057,
    VI_ERROR_INV_SIZE = 3221160059,
    VI_ERROR_WINDOW_MAPPED = 3221160064,
    VI_ERROR_NIMPL_OPER = 3221160065,
    VI_ERROR_INV_LENGTH = 3221160067,
    VI_ERROR_INV_MODE = 3221160081,
    VI_ERROR_SESN_NLOCKED = 3221160092,
    VI_ERROR_MEM_NSHARED = 3221160093,
    VI_ERROR_LIBRARY_NFOUND = 3221160094,
    VI_ERROR_NSUP_INTR = 3221160095,
    VI_ERROR_INV_LINE = 3221160096,
    VI_ERROR_FILE_ACCESS = 3221160097,
    VI_ERROR_FILE_IO = 3221160098,
    VI_ERROR_NSUP_LINE = 3221160099,
    VI_ERROR_NSUP_MECH = 3221160100,
    VI_ERROR_INTF_NUM_NCONFIG = 3221160101,
    VI_ERROR_CONN_LOST = 3221160102,
    VI_ERROR_MACHINE_NAVAIL = 3221160103,
    VI_ERROR_NPERMISSION = 3221160104,
    VI_VERSION_MAJOR = 5,
    VI_VERSION_MINOR = 8,
    VI_VERSION_SUBMINOR = 0,
    VI_FIND_BUFLEN = 256,
    VI_INTF_GPIB = 1,
    VI_INTF_VXI = 2,
    VI_INTF_GPIB_VXI = 3,
    VI_INTF_ASRL = 4,
    VI_INTF_PXI = 5,
    VI_INTF_TCPIP = 6,
    VI_INTF_USB = 7,
    VI_PROT_NORMAL = 1,
    VI_PROT_FDC = 2,
    VI_PROT_HS488 = 3,
    VI_PROT_4882_STRS = 4,
    VI_PROT_USBTMC_VENDOR = 5,
    VI_FDC_NORMAL = 1,
    VI_FDC_STREAM = 2,
    VI_LOCAL_SPACE = 0,
    VI_A16_SPACE = 1,
    VI_A24_SPACE = 2,
    VI_A32_SPACE = 3,
    VI_A64_SPACE = 4,
    VI_PXI_ALLOC_SPACE = 9,
    VI_PXI_CFG_SPACE = 10,
    VI_PXI_BAR0_SPACE = 11,
    VI_PXI_BAR1_SPACE = 12,
    VI_PXI_BAR2_SPACE = 13,
    VI_PXI_BAR3_SPACE = 14,
    VI_PXI_BAR4_SPACE = 15,
    VI_PXI_BAR5_SPACE = 16,
    VI_OPAQUE_SPACE = 65535,
    VI_UNKNOWN_LA = -1,
    VI_UNKNOWN_SLOT = -1,
    VI_UNKNOWN_LEVEL = -1,
    VI_UNKNOWN_CHASSIS = -1,
    VI_QUEUE = 1,
    VI_HNDLR = 2,
    VI_SUSPEND_HNDLR = 4,
    VI_ALL_MECH = 65535,
    VI_ANY_HNDLR = 0,
    VI_TRIG_ALL = -2,
    VI_TRIG_SW = -1,
    VI_TRIG_TTL0 = 0,
    VI_TRIG_TTL1 = 1,
    VI_TRIG_TTL2 = 2,
    VI_TRIG_TTL3 = 3,
    VI_TRIG_TTL4 = 4,
    VI_TRIG_TTL5 = 5,
    VI_TRIG_TTL6 = 6,
    VI_TRIG_TTL7 = 7,
    VI_TRIG_ECL0 = 8,
    VI_TRIG_ECL1 = 9,
    VI_TRIG_ECL2 = 10,
    VI_TRIG_ECL3 = 11,
    VI_TRIG_ECL4 = 12,
    VI_TRIG_ECL5 = 13,
    VI_TRIG_STAR_SLOT1 = 14,
    VI_TRIG_STAR_SLOT2 = 15,
    VI_TRIG_STAR_SLOT3 = 16,
    VI_TRIG_STAR_SLOT4 = 17,
    VI_TRIG_STAR_SLOT5 = 18,
    VI_TRIG_STAR_SLOT6 = 19,
    VI_TRIG_STAR_SLOT7 = 20,
    VI_TRIG_STAR_SLOT8 = 21,
    VI_TRIG_STAR_SLOT9 = 22,
    VI_TRIG_STAR_SLOT10 = 23,
    VI_TRIG_STAR_SLOT11 = 24,
    VI_TRIG_STAR_SLOT12 = 25,
    VI_TRIG_STAR_INSTR = 26,
    VI_TRIG_PANEL_IN = 27,
    VI_TRIG_PANEL_OUT = 28,
    VI_TRIG_STAR_VXI0 = 29,
    VI_TRIG_STAR_VXI1 = 30,
    VI_TRIG_STAR_VXI2 = 31,
    VI_TRIG_TTL8 = 32,
    VI_TRIG_TTL9 = 33,
    VI_TRIG_TTL10 = 34,
    VI_TRIG_TTL11 = 35,
    VI_TRIG_PROT_DEFAULT = 0,
    VI_TRIG_PROT_ON = 1,
    VI_TRIG_PROT_OFF = 2,
    VI_TRIG_PROT_SYNC = 5,
    VI_TRIG_PROT_RESERVE = 6,
    VI_TRIG_PROT_UNRESERVE = 7,
    VI_READ_BUF = 1,
    VI_WRITE_BUF = 2,
    VI_READ_BUF_DISCARD = 4,
    VI_WRITE_BUF_DISCARD = 8,
    VI_IO_IN_BUF = 16,
    VI_IO_OUT_BUF = 32,
    VI_IO_IN_BUF_DISCARD = 64,
    VI_IO_OUT_BUF_DISCARD = 128,
    VI_FLUSH_ON_ACCESS = 1,
    VI_FLUSH_WHEN_FULL = 2,
    VI_FLUSH_DISABLE = 3,
    VI_NMAPPED = 1,
    VI_USE_OPERS = 2,
    VI_DEREF_ADDR = 3,
    VI_DEREF_ADDR_BYTE_SWAP = 4,
    VI_TMO_IMMEDIATE = 0,
    VI_TMO_INFINITE = 4294967295,
    VI_NO_LOCK = 0,
    VI_EXCLUSIVE_LOCK = 1,
    VI_SHARED_LOCK = 2,
    VI_LOAD_CONFIG = 4,
    VI_NO_SEC_ADDR = 65535,
    VI_ASRL_PAR_NONE = 0,
    VI_ASRL_PAR_ODD = 1,
    VI_ASRL_PAR_EVEN = 2,
    VI_ASRL_PAR_MARK = 3,
    VI_ASRL_PAR_SPACE = 4,
    VI_ASRL_STOP_ONE = 10,
    VI_ASRL_STOP_ONE5 = 15,
    VI_ASRL_STOP_TWO = 20,
    VI_ASRL_FLOW_NONE = 0,
    VI_ASRL_FLOW_XON_XOFF = 1,
    VI_ASRL_FLOW_RTS_CTS = 2,
    VI_ASRL_FLOW_DTR_DSR = 4,
    VI_ASRL_END_NONE = 0,
    VI_ASRL_END_LAST_BIT = 1,
    VI_ASRL_END_TERMCHAR = 2,
    VI_ASRL_END_BREAK = 3,
    VI_STATE_ASSERTED = 1,
    VI_STATE_UNASSERTED = 0,
    VI_STATE_UNKNOWN = -1,
    VI_BIG_ENDIAN = 0,
    VI_LITTLE_ENDIAN = 1,
    VI_DATA_PRIV = 0,
    VI_DATA_NPRIV = 1,
    VI_PROG_PRIV = 2,
    VI_PROG_NPRIV = 3,
    VI_BLCK_PRIV = 4,
    VI_BLCK_NPRIV = 5,
    VI_D64_PRIV = 6,
    VI_D64_NPRIV = 7,
    VI_D64_2EVME = 8,
    VI_D64_SST160 = 9,
    VI_D64_SST267 = 10,
    VI_D64_SST320 = 11,
    VI_WIDTH_8 = 1,
    VI_WIDTH_16 = 2,
    VI_WIDTH_32 = 4,
    VI_WIDTH_64 = 8,
    VI_GPIB_REN_DEASSERT = 0,
    VI_GPIB_REN_ASSERT = 1,
    VI_GPIB_REN_DEASSERT_GTL = 2,
    VI_GPIB_REN_ASSERT_ADDRESS = 3,
    VI_GPIB_REN_ASSERT_LLO = 4,
    VI_GPIB_REN_ASSERT_ADDRESS_LLO = 5,
    VI_GPIB_REN_ADDRESS_GTL = 6,
    VI_GPIB_ATN_DEASSERT = 0,
    VI_GPIB_ATN_ASSERT = 1,
    VI_GPIB_ATN_DEASSERT_HANDSHAKE = 2,
    VI_GPIB_ATN_ASSERT_IMMEDIATE = 3,
    VI_GPIB_HS488_DISABLED = 0,
    VI_GPIB_HS488_NIMPL = -1,
    VI_GPIB_UNADDRESSED = 0,
    VI_GPIB_TALKER = 1,
    VI_GPIB_LISTENER = 2,
    VI_VXI_CMD16 = 512,
    VI_VXI_CMD16_RESP16 = 514,
    VI_VXI_RESP16 = 2,
    VI_VXI_CMD32 = 1024,
    VI_VXI_CMD32_RESP16 = 1026,
    VI_VXI_CMD32_RESP32 = 1028,
    VI_VXI_RESP32 = 4,
    VI_ASSERT_SIGNAL = -1,
    VI_ASSERT_USE_ASSIGNED = 0,
    VI_ASSERT_IRQ1 = 1,
    VI_ASSERT_IRQ2 = 2,
    VI_ASSERT_IRQ3 = 3,
    VI_ASSERT_IRQ4 = 4,
    VI_ASSERT_IRQ5 = 5,
    VI_ASSERT_IRQ6 = 6,
    VI_ASSERT_IRQ7 = 7,
    VI_UTIL_ASSERT_SYSRESET = 1,
    VI_UTIL_ASSERT_SYSFAIL = 2,
    VI_UTIL_DEASSERT_SYSFAIL = 3,
    VI_VXI_CLASS_MEMORY = 0,
    VI_VXI_CLASS_EXTENDED = 1,
    VI_VXI_CLASS_MESSAGE = 2,
    VI_VXI_CLASS_REGISTER = 3,
    VI_VXI_CLASS_OTHER = 4,
    VI_PXI_ADDR_NONE = 0,
    VI_PXI_ADDR_MEM = 1,
    VI_PXI_ADDR_IO = 2,
    VI_PXI_ADDR_CFG = 3,
    VI_TRIG_UNKNOWN = -1,
    VI_PXI_LBUS_UNKNOWN = -1,
    VI_PXI_LBUS_NONE = 0,
    VI_PXI_LBUS_STAR_TRIG_BUS_0 = 1000,
    VI_PXI_LBUS_STAR_TRIG_BUS_1 = 1001,
    VI_PXI_LBUS_STAR_TRIG_BUS_2 = 1002,
    VI_PXI_LBUS_STAR_TRIG_BUS_3 = 1003,
    VI_PXI_LBUS_STAR_TRIG_BUS_4 = 1004,
    VI_PXI_LBUS_STAR_TRIG_BUS_5 = 1005,
    VI_PXI_LBUS_STAR_TRIG_BUS_6 = 1006,
    VI_PXI_LBUS_STAR_TRIG_BUS_7 = 1007,
    VI_PXI_LBUS_STAR_TRIG_BUS_8 = 1008,
    VI_PXI_LBUS_STAR_TRIG_BUS_9 = 1009,
    VI_PXI_STAR_TRIG_CONTROLLER = 1413,
    VI_ERROR_HW_NGENUINE = 3221160106,
    VI_INTF_RIO = 8,
    VI_INTF_FIREWIRE = 9,
    VI_ATTR_SYNC_MXI_ALLOW_EN = 1073676641,
    VI_EVENT_VXI_DEV_CMD = 3221168143,
    VI_ATTR_VXI_DEV_CMD_TYPE = 1073692727,
    VI_ATTR_VXI_DEV_CMD_VALUE = 1073692728,
    VI_VXI_DEV_CMD_TYPE_16 = 16,
    VI_VXI_DEV_CMD_TYPE_32 = 32,
    VI_VXI_RESP_NONE = 0,
    VI_VXI_RESP_PROT_ERROR = -1,
    VI_ATTR_VXI_TRIG_LINES_EN = 1073692739,
    VI_ATTR_VXI_TRIG_DIR = 1073692740,
    VI_ATTR_ASRL_DISCARD_NULL = 1073676464,
    VI_ATTR_ASRL_CONNECTED = 1073676731,
    VI_ATTR_ASRL_BREAK_STATE = 1073676732,
    VI_ATTR_ASRL_BREAK_LEN = 1073676733,
    VI_ATTR_ASRL_ALLOW_TRANSMIT = 1073676734,
    VI_ATTR_ASRL_WIRE_MODE = 1073676735,
    VI_ASRL_WIRE_485_4 = 0,
    VI_ASRL_WIRE_485_2_DTR_ECHO = 1,
    VI_ASRL_WIRE_485_2_DTR_CTRL = 2,
    VI_ASRL_WIRE_485_2_AUTO = 3,
    VI_ASRL_WIRE_232_DTE = 128,
    VI_ASRL_WIRE_232_DCE = 129,
    VI_ASRL_WIRE_232_AUTO = 130,
    VI_EVENT_ASRL_BREAK = 1073684515,
    VI_EVENT_ASRL_CTS = 1073684521,
    VI_EVENT_ASRL_DSR = 1073684522,
    VI_EVENT_ASRL_DCD = 1073684524,
    VI_EVENT_ASRL_RI = 1073684526,
    VI_EVENT_ASRL_CHAR = 1073684533,
    VI_EVENT_ASRL_TERMCHAR = 1073684516,
    VI_ATTR_PXI_SUB_MANF_ID = 1073676803,
    VI_ATTR_PXI_SUB_MODEL_CODE = 1073676804,
    VI_ATTR_PXI_USE_PREALLOC_POOL = 1073676815,
    VI_ATTR_USB_BULK_OUT_PIPE = 1073676706,
    VI_ATTR_USB_BULK_IN_PIPE = 1073676707,
    VI_ATTR_USB_INTR_IN_PIPE = 1073676708,
    VI_ATTR_USB_CLASS = 1073676709,
    VI_ATTR_USB_SUBCLASS = 1073676710,
    VI_ATTR_USB_ALT_SETTING = 1073676712,
    VI_ATTR_USB_END_IN = 1073676713,
    VI_ATTR_USB_NUM_INTFCS = 1073676714,
    VI_ATTR_USB_NUM_PIPES = 1073676715,
    VI_ATTR_USB_BULK_OUT_STATUS = 1073676716,
    VI_ATTR_USB_BULK_IN_STATUS = 1073676717,
    VI_ATTR_USB_INTR_IN_STATUS = 1073676718,
    VI_ATTR_USB_CTRL_PIPE = 1073676720,
    VI_USB_PIPE_STATE_UNKNOWN = -1,
    VI_USB_PIPE_READY = 0,
    VI_USB_PIPE_STALLED = 1,
    VI_USB_END_NONE = 0,
    VI_USB_END_SHORT = 4,
    VI_USB_END_SHORT_OR_COUNT = 5,
    VI_ATTR_FIREWIRE_DEST_UPPER_OFFSET = 1073676784,
    VI_ATTR_FIREWIRE_SRC_UPPER_OFFSET = 1073676785,
    VI_ATTR_FIREWIRE_WIN_UPPER_OFFSET = 1073676786,
    VI_ATTR_FIREWIRE_VENDOR_ID = 1073676787,
    VI_ATTR_FIREWIRE_LOWER_CHIP_ID = 1073676788,
    VI_ATTR_FIREWIRE_UPPER_CHIP_ID = 1073676789,
    VI_FIREWIRE_DFLT_SPACE = 5,
    VI_KTATTR_RETURN_ALL = 268370018
}
