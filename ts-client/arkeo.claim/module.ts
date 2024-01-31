// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgTransferClaim } from "./types/arkeo/claim/tx";
import { MsgAddClaim } from "./types/arkeo/claim/tx";
import { MsgClaimArkeo } from "./types/arkeo/claim/tx";
import { MsgClaimEth } from "./types/arkeo/claim/tx";

import { ClaimRecord as typeClaimRecord} from "./types"
import { Params as typeParams} from "./types"

export { MsgTransferClaim, MsgAddClaim, MsgClaimArkeo, MsgClaimEth };

type sendMsgTransferClaimParams = {
  value: MsgTransferClaim,
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

type sendMsgClaimEthParams = {
  value: MsgClaimEth,
  fee?: StdFee,
  memo?: string
};


type msgTransferClaimParams = {
  value: MsgTransferClaim,
};

type msgAddClaimParams = {
  value: MsgAddClaim,
};

type msgClaimArkeoParams = {
  value: MsgClaimArkeo,
};

type msgClaimEthParams = {
  value: MsgClaimEth,
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
		
		async sendMsgTransferClaim({ value, fee, memo }: sendMsgTransferClaimParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgTransferClaim: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgTransferClaim({ value: MsgTransferClaim.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgTransferClaim: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgAddClaim({ value, fee, memo }: sendMsgAddClaimParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgAddClaim: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
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
				const { address } = (await signer.getAccounts())[0]; 
				console.log("SIGNER ADDRESS", address)
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgClaimArkeo({ value: MsgClaimArkeo.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgClaimArkeo: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgClaimEth({ value, fee, memo }: sendMsgClaimEthParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgClaimEth: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgClaimEth({ value: MsgClaimEth.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgClaimEth: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgTransferClaim({ value }: msgTransferClaimParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgTransferClaim", value: MsgTransferClaim.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgTransferClaim: Could not create message: ' + e.message)
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
		
		msgClaimEth({ value }: msgClaimEthParams): EncodeObject {
			try {
				return { typeUrl: "/arkeo.claim.MsgClaimEth", value: MsgClaimEth.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgClaimEth: Could not create message: ' + e.message)
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
						ClaimRecord: getStructure(typeClaimRecord.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						
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

const Module = (test: IgniteClient) => {
	return {
		module: {
			ArkeoClaim: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;