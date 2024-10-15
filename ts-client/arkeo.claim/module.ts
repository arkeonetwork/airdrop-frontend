// Generated by Ignite ignite.com/cli

import { SigningStargateClient, DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
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


export { QueryParamsResponse, MsgAddClaim, MsgClaimArkeo, MsgClaimArkeoResponse, MsgTransferClaimResponse, GenesisState, QueryParamsRequest, MsgClaimThorchain, MsgClaimEth, MsgClaimEthResponse, MsgClaimThorchainResponse, ClaimRecord, QueryClaimRecordResponse, Params, QueryClaimRecordRequest, MsgTransferClaim, MsgAddClaimResponse };

type sendQueryParamsResponseParams = {
  value: QueryParamsResponse,
  fee?: StdFee,
  memo?: string
};

type sendMsgAddClaimParams = {
  value: MsgAddClaim,
  fee?: StdFee,
  memo?: string
};

type sendMsgClaimArkeoParams = {
  value: MsgClaimArkeo,
  fee?: StdFee,
  memo?: string
};

type sendMsgClaimArkeoResponseParams = {
  value: MsgClaimArkeoResponse,
  fee?: StdFee,
  memo?: string
};

type sendMsgTransferClaimResponseParams = {
  value: MsgTransferClaimResponse,
  fee?: StdFee,
  memo?: string
};

type sendGenesisStateParams = {
  value: GenesisState,
  fee?: StdFee,
  memo?: string
};

type sendQueryParamsRequestParams = {
  value: QueryParamsRequest,
  fee?: StdFee,
  memo?: string
};

type sendMsgClaimThorchainParams = {
  value: MsgClaimThorchain,
  fee?: StdFee,
  memo?: string
};

type sendMsgClaimEthParams = {
  value: MsgClaimEth,
  fee?: StdFee,
  memo?: string
};

type sendMsgClaimEthResponseParams = {
  value: MsgClaimEthResponse,
  fee?: StdFee,
  memo?: string
};

type sendMsgClaimThorchainResponseParams = {
  value: MsgClaimThorchainResponse,
  fee?: StdFee,
  memo?: string
};

type sendClaimRecordParams = {
  value: ClaimRecord,
  fee?: StdFee,
  memo?: string
};

type sendQueryClaimRecordResponseParams = {
  value: QueryClaimRecordResponse,
  fee?: StdFee,
  memo?: string
};

type sendParamsParams = {
  value: Params,
  fee?: StdFee,
  memo?: string
};

type sendQueryClaimRecordRequestParams = {
  value: QueryClaimRecordRequest,
  fee?: StdFee,
  memo?: string
};

type sendMsgTransferClaimParams = {
  value: MsgTransferClaim,
  fee?: StdFee,
  memo?: string
};

type sendMsgAddClaimResponseParams = {
  value: MsgAddClaimResponse,
  fee?: StdFee,
  memo?: string
};


type queryParamsResponseParams = {
  value: QueryParamsResponse,
};

type msgAddClaimParams = {
  value: MsgAddClaim,
};

type msgClaimArkeoParams = {
  value: MsgClaimArkeo,
};

type msgClaimArkeoResponseParams = {
  value: MsgClaimArkeoResponse,
};

type msgTransferClaimResponseParams = {
  value: MsgTransferClaimResponse,
};

type genesisStateParams = {
  value: GenesisState,
};

type queryParamsRequestParams = {
  value: QueryParamsRequest,
};

type msgClaimThorchainParams = {
  value: MsgClaimThorchain,
};

type msgClaimEthParams = {
  value: MsgClaimEth,
};

type msgClaimEthResponseParams = {
  value: MsgClaimEthResponse,
};

type msgClaimThorchainResponseParams = {
  value: MsgClaimThorchainResponse,
};

type claimRecordParams = {
  value: ClaimRecord,
};

type queryClaimRecordResponseParams = {
  value: QueryClaimRecordResponse,
};

type paramsParams = {
  value: Params,
};

type queryClaimRecordRequestParams = {
  value: QueryClaimRecordRequest,
};

type msgTransferClaimParams = {
  value: MsgTransferClaim,
};

type msgAddClaimResponseParams = {
  value: MsgAddClaimResponse,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendQueryParamsResponse: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.queryParamsResponse({ value: QueryParamsResponse.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendQueryParamsResponse: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgAddClaim({ value, fee, memo }: sendMsgAddClaimParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgAddClaim: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgAddClaim({ value: MsgAddClaim.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgAddClaim: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgClaimArkeo({ value, fee, memo }: sendMsgClaimArkeoParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgClaimArkeo: Unable to sign Tx. Signer is not present.')
			}
			try {			
				console.log(signer.getAccounts())
				const { address } = (await signer.getAccounts())[0]; 
				console.log(address)
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				console.log(signingClient);
				let msg = this.msgClaimArkeo({ value: MsgClaimArkeo.fromPartial(value) })
				console.log(msg);
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				console.log(e)
				throw new Error('TxClient:sendMsgClaimArkeo: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgClaimArkeoResponse({ value, fee, memo }: sendMsgClaimArkeoResponseParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgClaimArkeoResponse: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgClaimArkeoResponse({ value: MsgClaimArkeoResponse.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				console.log(e)
				throw new Error('TxClient:sendMsgClaimArkeoResponse: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgTransferClaimResponse({ value, fee, memo }: sendMsgTransferClaimResponseParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgTransferClaimResponse: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgTransferClaimResponse({ value: MsgTransferClaimResponse.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgTransferClaimResponse: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendGenesisState: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.genesisState({ value: GenesisState.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendGenesisState: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendQueryParamsRequest: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.queryParamsRequest({ value: QueryParamsRequest.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendQueryParamsRequest: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgClaimThorchain({ value, fee, memo }: sendMsgClaimThorchainParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgClaimThorchain: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgClaimThorchain({ value: MsgClaimThorchain.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgClaimThorchain: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgClaimEth({ value, fee, memo }: sendMsgClaimEthParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgTransferClaim: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgClaimEth({ value: MsgClaimEth.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgTransferClaim: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgClaimEthResponse({ value, fee, memo }: sendMsgClaimEthResponseParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgClaimEthResponse: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgClaimEthResponse({ value: MsgClaimEthResponse.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgClaimEthResponse: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgClaimThorchainResponse({ value, fee, memo }: sendMsgClaimThorchainResponseParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgClaimThorchainResponse: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgClaimThorchainResponse({ value: MsgClaimThorchainResponse.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgClaimThorchainResponse: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendClaimRecord({ value, fee, memo }: sendClaimRecordParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendClaimRecord: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.claimRecord({ value: ClaimRecord.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendClaimRecord: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendQueryClaimRecordResponse({ value, fee, memo }: sendQueryClaimRecordResponseParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendQueryClaimRecordResponse: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.queryClaimRecordResponse({ value: QueryClaimRecordResponse.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendQueryClaimRecordResponse: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendParams: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.params({ value: Params.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendParams: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendQueryClaimRecordRequest({ value, fee, memo }: sendQueryClaimRecordRequestParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendQueryClaimRecordRequest: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.queryClaimRecordRequest({ value: QueryClaimRecordRequest.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendQueryClaimRecordRequest: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgTransferClaim({ value, fee, memo }: sendMsgTransferClaimParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgClaimEth: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgTransferClaim({ value: MsgTransferClaim.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgClaimEth: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgAddClaimResponse({ value, fee, memo }: sendMsgAddClaimResponseParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgAddClaimResponse: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry});
				let msg = this.msgAddClaimResponse({ value: MsgAddClaimResponse.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgAddClaimResponse: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.QueryParamsResponse", value: QueryParamsResponse.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:QueryParamsResponse: Could not create message: ' + e.message)
			}
		},
		
		msgAddClaim({ value }: msgAddClaimParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgAddClaim", value: MsgAddClaim.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgAddClaim: Could not create message: ' + e.message)
			}
		},
		
		msgClaimArkeo({ value }: msgClaimArkeoParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgClaimArkeo", value: MsgClaimArkeo.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgClaimArkeo: Could not create message: ' + e.message)
			}
		},
		
		msgClaimArkeoResponse({ value }: msgClaimArkeoResponseParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgClaimArkeoResponse", value: MsgClaimArkeoResponse.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgClaimArkeoResponse: Could not create message: ' + e.message)
			}
		},
		
		msgTransferClaimResponse({ value }: msgTransferClaimResponseParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgTransferClaimResponse", value: MsgTransferClaimResponse.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgTransferClaimResponse: Could not create message: ' + e.message)
			}
		},
		
		genesisState({ value }: genesisStateParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.GenesisState", value: GenesisState.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:GenesisState: Could not create message: ' + e.message)
			}
		},
		
		queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.QueryParamsRequest", value: QueryParamsRequest.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:QueryParamsRequest: Could not create message: ' + e.message)
			}
		},
		
		msgClaimThorchain({ value }: msgClaimThorchainParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgClaimThorchain", value: MsgClaimThorchain.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgClaimThorchain: Could not create message: ' + e.message)
			}
		},
		
		msgClaimEth({ value }: msgClaimEthParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgTransferClaim", value: MsgTransferClaim.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgTransferClaim: Could not create message: ' + e.message)
			}
		},
		
		msgClaimEthResponse({ value }: msgClaimEthResponseParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgClaimEthResponse", value: MsgClaimEthResponse.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgClaimEthResponse: Could not create message: ' + e.message)
			}
		},
		
		msgClaimThorchainResponse({ value }: msgClaimThorchainResponseParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgClaimThorchainResponse", value: MsgClaimThorchainResponse.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgClaimThorchainResponse: Could not create message: ' + e.message)
			}
		},
		
		claimRecord({ value }: claimRecordParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.ClaimRecord", value: ClaimRecord.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:ClaimRecord: Could not create message: ' + e.message)
			}
		},
		
		queryClaimRecordResponse({ value }: queryClaimRecordResponseParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.QueryClaimRecordResponse", value: QueryClaimRecordResponse.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:QueryClaimRecordResponse: Could not create message: ' + e.message)
			}
		},
		
		params({ value }: paramsParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.Params", value: Params.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:Params: Could not create message: ' + e.message)
			}
		},
		
		queryClaimRecordRequest({ value }: queryClaimRecordRequestParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.QueryClaimRecordRequest", value: QueryClaimRecordRequest.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:QueryClaimRecordRequest: Could not create message: ' + e.message)
			}
		},
		
		msgTransferClaim({ value }: msgTransferClaimParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgClaimEth", value: MsgClaimEth.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgClaimEth: Could not create message: ' + e.message)
			}
		},
		
		msgAddClaimResponse({ value }: msgAddClaimResponseParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgAddClaimResponse", value: MsgAddClaimResponse.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgAddClaimResponse: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const IgntModule = (test: IgniteClient) => {
	return {
		module: {
			ArkeoClaim: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default IgntModule;