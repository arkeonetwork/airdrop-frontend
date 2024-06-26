import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgModProvider } from "./types/arkeo/arkeo/tx";
import { MsgBondProvider } from "./types/arkeo/arkeo/tx";
import { MsgOpenContract } from "./types/arkeo/arkeo/tx";
import { MsgCloseContract } from "./types/arkeo/arkeo/tx";
import { MsgClaimContractIncome } from "./types/arkeo/arkeo/tx";
import { MsgSetVersion } from "./types/arkeo/arkeo/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/arkeo.arkeo.MsgModProvider", MsgModProvider],
    ["/arkeo.arkeo.MsgBondProvider", MsgBondProvider],
    ["/arkeo.arkeo.MsgOpenContract", MsgOpenContract],
    ["/arkeo.arkeo.MsgCloseContract", MsgCloseContract],
    ["/arkeo.arkeo.MsgClaimContractIncome", MsgClaimContractIncome],
    ["/arkeo.arkeo.MsgSetVersion", MsgSetVersion],
    
];

export { msgTypes }