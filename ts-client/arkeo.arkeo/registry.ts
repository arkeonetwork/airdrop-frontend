import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCloseContractResponse } from "./types/arkeo/arkeo/tx";
import { MsgClaimContractIncomeResponse } from "./types/arkeo/arkeo/tx";
import { EventBondProvider } from "./types/arkeo/arkeo/events";
import { EventModProvider } from "./types/arkeo/arkeo/events";
import { UserContractSet } from "./types/arkeo/arkeo/keeper";
import { QueryParamsRequest } from "./types/arkeo/arkeo/query";
import { QueryAllProviderResponse } from "./types/arkeo/arkeo/query";
import { QueryAllContractResponse } from "./types/arkeo/arkeo/query";
import { MsgBondProviderResponse } from "./types/arkeo/arkeo/tx";
import { MsgOpenContractResponse } from "./types/arkeo/arkeo/tx";
import { MsgClaimContractIncome } from "./types/arkeo/arkeo/tx";
import { ProtoInt64 } from "./types/arkeo/arkeo/misc";
import { ProtoAccAddresses } from "./types/arkeo/arkeo/misc";
import { EventCloseContract } from "./types/arkeo/arkeo/events";
import { QueryParamsResponse } from "./types/arkeo/arkeo/query";
import { QueryAllProviderRequest } from "./types/arkeo/arkeo/query";
import { MsgCloseContract } from "./types/arkeo/arkeo/tx";
import { GenesisState } from "./types/arkeo/arkeo/genesis";
import { EventSettleContract } from "./types/arkeo/arkeo/events";
import { Contract } from "./types/arkeo/arkeo/keeper";
import { QueryFetchProviderResponse } from "./types/arkeo/arkeo/query";
import { MsgModProvider } from "./types/arkeo/arkeo/tx";
import { MsgSetVersion } from "./types/arkeo/arkeo/tx";
import { EventValidatorPayout } from "./types/arkeo/arkeo/events";
import { Provider } from "./types/arkeo/arkeo/keeper";
import { QueryFetchProviderRequest } from "./types/arkeo/arkeo/query";
import { EventOpenContract } from "./types/arkeo/arkeo/events";
import { ContractSet } from "./types/arkeo/arkeo/keeper";
import { MsgOpenContract } from "./types/arkeo/arkeo/tx";
import { MsgBondProvider } from "./types/arkeo/arkeo/tx";
import { ProtoBools } from "./types/arkeo/arkeo/misc";
import { QueryFetchContractRequest } from "./types/arkeo/arkeo/query";
import { QueryActiveContractResponse } from "./types/arkeo/arkeo/query";
import { MsgModProviderResponse } from "./types/arkeo/arkeo/tx";
import { Params } from "./types/arkeo/arkeo/params";
import { ProtoUint64 } from "./types/arkeo/arkeo/misc";
import { ContractExpirationSet } from "./types/arkeo/arkeo/keeper";
import { QueryActiveContractRequest } from "./types/arkeo/arkeo/query";
import { MsgSetVersionResponse } from "./types/arkeo/arkeo/tx";
import { ProtoStrings } from "./types/arkeo/arkeo/misc";
import { QueryFetchContractResponse } from "./types/arkeo/arkeo/query";
import { QueryAllContractRequest } from "./types/arkeo/arkeo/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/arkeo.arkeo.MsgCloseContractResponse", MsgCloseContractResponse],
    ["/arkeo.arkeo.MsgClaimContractIncomeResponse", MsgClaimContractIncomeResponse],
    ["/arkeo.arkeo.EventBondProvider", EventBondProvider],
    ["/arkeo.arkeo.EventModProvider", EventModProvider],
    ["/arkeo.arkeo.UserContractSet", UserContractSet],
    ["/arkeo.arkeo.QueryParamsRequest", QueryParamsRequest],
    ["/arkeo.arkeo.QueryAllProviderResponse", QueryAllProviderResponse],
    ["/arkeo.arkeo.QueryAllContractResponse", QueryAllContractResponse],
    ["/arkeo.arkeo.MsgBondProviderResponse", MsgBondProviderResponse],
    ["/arkeo.arkeo.MsgOpenContractResponse", MsgOpenContractResponse],
    ["/arkeo.arkeo.MsgClaimContractIncome", MsgClaimContractIncome],
    ["/arkeo.arkeo.ProtoInt64", ProtoInt64],
    ["/arkeo.arkeo.ProtoAccAddresses", ProtoAccAddresses],
    ["/arkeo.arkeo.EventCloseContract", EventCloseContract],
    ["/arkeo.arkeo.QueryParamsResponse", QueryParamsResponse],
    ["/arkeo.arkeo.QueryAllProviderRequest", QueryAllProviderRequest],
    ["/arkeo.arkeo.MsgCloseContract", MsgCloseContract],
    ["/arkeo.arkeo.GenesisState", GenesisState],
    ["/arkeo.arkeo.EventSettleContract", EventSettleContract],
    ["/arkeo.arkeo.Contract", Contract],
    ["/arkeo.arkeo.QueryFetchProviderResponse", QueryFetchProviderResponse],
    ["/arkeo.arkeo.MsgModProvider", MsgModProvider],
    ["/arkeo.arkeo.MsgSetVersion", MsgSetVersion],
    ["/arkeo.arkeo.EventValidatorPayout", EventValidatorPayout],
    ["/arkeo.arkeo.Provider", Provider],
    ["/arkeo.arkeo.QueryFetchProviderRequest", QueryFetchProviderRequest],
    ["/arkeo.arkeo.EventOpenContract", EventOpenContract],
    ["/arkeo.arkeo.ContractSet", ContractSet],
    ["/arkeo.arkeo.MsgOpenContract", MsgOpenContract],
    ["/arkeo.arkeo.MsgBondProvider", MsgBondProvider],
    ["/arkeo.arkeo.ProtoBools", ProtoBools],
    ["/arkeo.arkeo.QueryFetchContractRequest", QueryFetchContractRequest],
    ["/arkeo.arkeo.QueryActiveContractResponse", QueryActiveContractResponse],
    ["/arkeo.arkeo.MsgModProviderResponse", MsgModProviderResponse],
    ["/arkeo.arkeo.Params", Params],
    ["/arkeo.arkeo.ProtoUint64", ProtoUint64],
    ["/arkeo.arkeo.ContractExpirationSet", ContractExpirationSet],
    ["/arkeo.arkeo.QueryActiveContractRequest", QueryActiveContractRequest],
    ["/arkeo.arkeo.MsgSetVersionResponse", MsgSetVersionResponse],
    ["/arkeo.arkeo.ProtoStrings", ProtoStrings],
    ["/arkeo.arkeo.QueryFetchContractResponse", QueryFetchContractResponse],
    ["/arkeo.arkeo.QueryAllContractRequest", QueryAllContractRequest],    
];

export { msgTypes }