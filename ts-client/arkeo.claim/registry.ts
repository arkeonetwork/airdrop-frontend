import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgAddClaim } from "./types/arkeo/claim/tx";
import { MsgClaimEth } from "./types/arkeo/claim/tx";
import { MsgClaimArkeo } from "./types/arkeo/claim/tx";
import { MsgTransferClaim } from "./types/arkeo/claim/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/arkeo.claim.MsgAddClaim", MsgAddClaim],
    ["/arkeo.claim.MsgClaimEth", MsgClaimEth],
    ["/arkeo.claim.MsgClaimArkeo", MsgClaimArkeo],
    ["/arkeo.claim.MsgTransferClaim", MsgTransferClaim],
    
];

export { msgTypes }