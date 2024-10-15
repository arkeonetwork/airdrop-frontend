import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryParamsResponse } from "./types/arkeo/claim/query";
import { MsgAddClaim } from "./types/arkeo/claim/tx";
import { MsgClaimArkeo } from "./types/arkeo/claim/tx";
import { MsgClaimArkeoResponse } from "./types/arkeo/claim/tx";
import { MsgTransferClaimResponse } from "./types/arkeo/claim/tx";
import { GenesisState } from "./types/arkeo/claim/genesis";
import { QueryParamsRequest } from "./types/arkeo/claim/query";
import { MsgClaimThorchain } from "./types/arkeo/claim/tx";
import { MsgClaimEth } from "./types/arkeo/claim/tx";
import { MsgClaimEthResponse } from "./types/arkeo/claim/tx";
import { MsgClaimThorchainResponse } from "./types/arkeo/claim/tx";
import { ClaimRecord } from "./types/arkeo/claim/claim_record";
import { QueryClaimRecordResponse } from "./types/arkeo/claim/query";
import { Params } from "./types/arkeo/claim/params";
import { QueryClaimRecordRequest } from "./types/arkeo/claim/query";
import { MsgTransferClaim } from "./types/arkeo/claim/tx";
import { MsgAddClaimResponse } from "./types/arkeo/claim/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/arkeo.claim.QueryParamsResponse", QueryParamsResponse],
    ["/arkeo.claim.MsgAddClaim", MsgAddClaim],
    ["/arkeo.claim.MsgClaimArkeo", MsgClaimArkeo],
    ["/arkeo.claim.MsgClaimArkeoResponse", MsgClaimArkeoResponse],
    ["/arkeo.claim.MsgTransferClaimResponse", MsgTransferClaimResponse],
    ["/arkeo.claim.GenesisState", GenesisState],
    ["/arkeo.claim.QueryParamsRequest", QueryParamsRequest],
    ["/arkeo.claim.MsgClaimThorchain", MsgClaimThorchain],
    ["/arkeo.claim.MsgClaimEth", MsgClaimEth],
    ["/arkeo.claim.MsgClaimEthResponse", MsgClaimEthResponse],
    ["/arkeo.claim.MsgClaimThorchainResponse", MsgClaimThorchainResponse],
    ["/arkeo.claim.ClaimRecord", ClaimRecord],
    ["/arkeo.claim.QueryClaimRecordResponse", QueryClaimRecordResponse],
    ["/arkeo.claim.Params", Params],
    ["/arkeo.claim.QueryClaimRecordRequest", QueryClaimRecordRequest],
    ["/arkeo.claim.MsgTransferClaim", MsgTransferClaim],
    ["/arkeo.claim.MsgAddClaimResponse", MsgAddClaimResponse],    
];

export { msgTypes }