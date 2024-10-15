// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: arkeo/claim/tx.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "cosmjs-types/binary";
import { Chain, chainFromJSON, chainToJSON } from "./claim_record";

export const protobufPackage = "arkeo.claim";

export interface MsgClaimEth {
  creator: string;
  /** the address the claim is for */
  ethAddress: string;
  /** EIP712 signature that has to be signed by ethAddress */
  signature: string;
}

export interface MsgClaimEthResponse {
}

export interface MsgClaimArkeo {
  creator: string;
}

export interface MsgClaimArkeoResponse {
}

export interface MsgClaimThorchain {
  creator: Uint8Array;
  /** the address that is delegating the claim */
  fromAddress: string;
  /** the address to delegate the claim to */
  toAddress: string;
}

export interface MsgClaimThorchainResponse {
}

export interface MsgTransferClaim {
  creator: string;
  toAddress: string;
}

export interface MsgTransferClaimResponse {
}

export interface MsgAddClaim {
  creator: string;
  chain: Chain;
  address: string;
  amount: number;
}

export interface MsgAddClaimResponse {
}

export interface MsgClaimThorchain {
  creator: string;
  /** the address that is delegating the claim */
  fromAddress: string;
  /** the address to delegate the claim to */
  toAddress: string;
}

export interface MsgClaimThorchainResponse {
}

function createBaseMsgClaimEth(): MsgClaimEth {
  return { creator: "", ethAddress: "", signature: "" };
}

export const MsgClaimEth: MessageFns<MsgClaimEth> = {
  encode(message: MsgClaimEth, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.ethAddress !== "") {
      writer.uint32(18).string(message.ethAddress);
    }
    if (message.signature !== "") {
      writer.uint32(26).string(message.signature);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimEth {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimEth();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ethAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signature = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgClaimEth {
    return {
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      ethAddress: isSet(object.ethAddress) ? globalThis.String(object.ethAddress) : "",
      signature: isSet(object.signature) ? globalThis.String(object.signature) : "",
    };
  },

  toJSON(message: MsgClaimEth): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.ethAddress !== "") {
      obj.ethAddress = message.ethAddress;
    }
    if (message.signature !== "") {
      obj.signature = message.signature;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimEth>, I>>(base?: I): MsgClaimEth {
    return MsgClaimEth.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgClaimEth>, I>>(object: I): MsgClaimEth {
    const message = createBaseMsgClaimEth();
    message.creator = object.creator ?? "";
    message.ethAddress = object.ethAddress ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
};

function createBaseMsgClaimEthResponse(): MsgClaimEthResponse {
  return {};
}

export const MsgClaimEthResponse: MessageFns<MsgClaimEthResponse> = {
  encode(_: MsgClaimEthResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimEthResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimEthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgClaimEthResponse {
    return {};
  },

  toJSON(_: MsgClaimEthResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimEthResponse>, I>>(base?: I): MsgClaimEthResponse {
    return MsgClaimEthResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgClaimEthResponse>, I>>(_: I): MsgClaimEthResponse {
    const message = createBaseMsgClaimEthResponse();
    return message;
  },
};

function createBaseMsgClaimArkeo(): MsgClaimArkeo {
  return { creator: "" };
}

export const MsgClaimArkeo: MessageFns<MsgClaimArkeo> = {
  encode(message: MsgClaimArkeo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimArkeo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimArkeo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgClaimArkeo {
    return { creator: isSet(object.creator) ? globalThis.String(object.creator) : "" };
  },

  toJSON(message: MsgClaimArkeo): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimArkeo>, I>>(base?: I): MsgClaimArkeo {
    return MsgClaimArkeo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgClaimArkeo>, I>>(object: I): MsgClaimArkeo {
    const message = createBaseMsgClaimArkeo();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseMsgClaimArkeoResponse(): MsgClaimArkeoResponse {
  return {};
}

export const MsgClaimArkeoResponse: MessageFns<MsgClaimArkeoResponse> = {
  encode(_: MsgClaimArkeoResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimArkeoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimArkeoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgClaimArkeoResponse {
    return {};
  },

  toJSON(_: MsgClaimArkeoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimArkeoResponse>, I>>(base?: I): MsgClaimArkeoResponse {
    return MsgClaimArkeoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgClaimArkeoResponse>, I>>(_: I): MsgClaimArkeoResponse {
    const message = createBaseMsgClaimArkeoResponse();
    return message;
  },
};

function createBaseMsgClaimThorchain(): MsgClaimThorchain {
  return { creator: new Uint8Array(), fromAddress: "", toAddress: "" };
}

export const MsgClaimThorchain = {
  encode(message: MsgClaimThorchain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.fromAddress !== "") {
      writer.uint32(18).string(message.fromAddress);
    }
    if (message.toAddress !== "") {
      writer.uint32(26).string(message.toAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimThorchain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimThorchain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.fromAddress = reader.string();
          break;
        case 3:
          message.toAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimThorchain {
    return {
      creator: isSet(object.creator) ? bytesFromBase64(object.creator) : new Uint8Array(),
      fromAddress: isSet(object.fromAddress) ? String(object.fromAddress) : "",
      toAddress: isSet(object.toAddress) ? String(object.toAddress) : "",
    };
  },

  toJSON(message: MsgClaimThorchain): unknown {
    const obj: any = {};
    message.creator !== undefined
      && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
    message.fromAddress !== undefined && (obj.fromAddress = message.fromAddress);
    message.toAddress !== undefined && (obj.toAddress = message.toAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimThorchain>, I>>(object: I): MsgClaimThorchain {
    const message = createBaseMsgClaimThorchain();
    message.creator = object.creator ?? new Uint8Array();
    message.fromAddress = object.fromAddress ?? "";
    message.toAddress = object.toAddress ?? "";
    return message;
  },
};

function createBaseMsgClaimThorchainResponse(): MsgClaimThorchainResponse {
  return {};
}

export const MsgClaimThorchainResponse = {
  encode(_: MsgClaimThorchainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimThorchainResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimThorchainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgClaimThorchainResponse {
    return {};
  },

  toJSON(_: MsgClaimThorchainResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimThorchainResponse>, I>>(_: I): MsgClaimThorchainResponse {
    const message = createBaseMsgClaimThorchainResponse();
    return message;
  },
};

function createBaseMsgTransferClaim(): MsgTransferClaim {
  return { creator: "", toAddress: "" };
}

export const MsgTransferClaim: MessageFns<MsgTransferClaim> = {
  encode(message: MsgTransferClaim, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.toAddress !== "") {
      writer.uint32(18).string(message.toAddress);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgTransferClaim {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.toAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTransferClaim {
    return {
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      toAddress: isSet(object.toAddress) ? globalThis.String(object.toAddress) : "",
    };
  },

  toJSON(message: MsgTransferClaim): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.toAddress !== "") {
      obj.toAddress = message.toAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferClaim>, I>>(base?: I): MsgTransferClaim {
    return MsgTransferClaim.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferClaim>, I>>(object: I): MsgTransferClaim {
    const message = createBaseMsgTransferClaim();
    message.creator = object.creator ?? "";
    message.toAddress = object.toAddress ?? "";
    return message;
  },
};

function createBaseMsgTransferClaimResponse(): MsgTransferClaimResponse {
  return {};
}

export const MsgTransferClaimResponse: MessageFns<MsgTransferClaimResponse> = {
  encode(_: MsgTransferClaimResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgTransferClaimResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferClaimResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgTransferClaimResponse {
    return {};
  },

  toJSON(_: MsgTransferClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferClaimResponse>, I>>(base?: I): MsgTransferClaimResponse {
    return MsgTransferClaimResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferClaimResponse>, I>>(_: I): MsgTransferClaimResponse {
    const message = createBaseMsgTransferClaimResponse();
    return message;
  },
};

function createBaseMsgAddClaim(): MsgAddClaim {
  return { creator: "", chain: 0, address: "", amount: 0 };
}

export const MsgAddClaim: MessageFns<MsgAddClaim> = {
  encode(message: MsgAddClaim, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chain !== 0) {
      writer.uint32(16).int32(message.chain);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.amount !== 0) {
      writer.uint32(32).int64(message.amount);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddClaim {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.chain = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.address = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.amount = longToNumber(reader.int64());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddClaim {
    return {
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      chain: isSet(object.chain) ? chainFromJSON(object.chain) : 0,
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      amount: isSet(object.amount) ? globalThis.Number(object.amount) : 0,
    };
  },

  toJSON(message: MsgAddClaim): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.chain !== 0) {
      obj.chain = chainToJSON(message.chain);
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.amount !== 0) {
      obj.amount = Math.round(message.amount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddClaim>, I>>(base?: I): MsgAddClaim {
    return MsgAddClaim.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddClaim>, I>>(object: I): MsgAddClaim {
    const message = createBaseMsgAddClaim();
    message.creator = object.creator ?? "";
    message.chain = object.chain ?? 0;
    message.address = object.address ?? "";
    message.amount = object.amount ?? 0;
    return message;
  },
};

function createBaseMsgAddClaimResponse(): MsgAddClaimResponse {
  return {};
}

export const MsgAddClaimResponse: MessageFns<MsgAddClaimResponse> = {
  encode(_: MsgAddClaimResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddClaimResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddClaimResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgAddClaimResponse {
    return {};
  },

  toJSON(_: MsgAddClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddClaimResponse>, I>>(base?: I): MsgAddClaimResponse {
    return MsgAddClaimResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddClaimResponse>, I>>(_: I): MsgAddClaimResponse {
    const message = createBaseMsgAddClaimResponse();
    return message;
  },
};

function createBaseMsgClaimThorchain(): MsgClaimThorchain {
  return { creator: "", fromAddress: "", toAddress: "" };
}

export const MsgClaimThorchain: MessageFns<MsgClaimThorchain> = {
  encode(message: MsgClaimThorchain, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.fromAddress !== "") {
      writer.uint32(18).string(message.fromAddress);
    }
    if (message.toAddress !== "") {
      writer.uint32(26).string(message.toAddress);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimThorchain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimThorchain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fromAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.toAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgClaimThorchain {
    return {
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      fromAddress: isSet(object.fromAddress) ? globalThis.String(object.fromAddress) : "",
      toAddress: isSet(object.toAddress) ? globalThis.String(object.toAddress) : "",
    };
  },

  toJSON(message: MsgClaimThorchain): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.fromAddress !== "") {
      obj.fromAddress = message.fromAddress;
    }
    if (message.toAddress !== "") {
      obj.toAddress = message.toAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimThorchain>, I>>(base?: I): MsgClaimThorchain {
    return MsgClaimThorchain.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgClaimThorchain>, I>>(object: I): MsgClaimThorchain {
    const message = createBaseMsgClaimThorchain();
    message.creator = object.creator ?? "";
    message.fromAddress = object.fromAddress ?? "";
    message.toAddress = object.toAddress ?? "";
    return message;
  },
};

function createBaseMsgClaimThorchainResponse(): MsgClaimThorchainResponse {
  return {};
}

export const MsgClaimThorchainResponse: MessageFns<MsgClaimThorchainResponse> = {
  encode(_: MsgClaimThorchainResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimThorchainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimThorchainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgClaimThorchainResponse {
    return {};
  },

  toJSON(_: MsgClaimThorchainResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimThorchainResponse>, I>>(base?: I): MsgClaimThorchainResponse {
    return MsgClaimThorchainResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgClaimThorchainResponse>, I>>(_: I): MsgClaimThorchainResponse {
    const message = createBaseMsgClaimThorchainResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  ClaimEth(request: MsgClaimEth): Promise<MsgClaimEthResponse>;
  ClaimArkeo(request: MsgClaimArkeo): Promise<MsgClaimArkeoResponse>;
  ClaimThorchain(request: MsgClaimThorchain): Promise<MsgClaimThorchainResponse>;
  TransferClaim(request: MsgTransferClaim): Promise<MsgTransferClaimResponse>;
  AddClaim(request: MsgAddClaim): Promise<MsgAddClaimResponse>;
  ClaimThorchain(request: MsgClaimThorchain): Promise<MsgClaimThorchainResponse>;
}

export const MsgServiceName = "arkeo.claim.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.ClaimEth = this.ClaimEth.bind(this);
    this.ClaimArkeo = this.ClaimArkeo.bind(this);
    this.ClaimThorchain = this.ClaimThorchain.bind(this);
    this.TransferClaim = this.TransferClaim.bind(this);
    this.AddClaim = this.AddClaim.bind(this);
    this.ClaimThorchain = this.ClaimThorchain.bind(this);
  }
  ClaimEth(request: MsgClaimEth): Promise<MsgClaimEthResponse> {
    const data = MsgClaimEth.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClaimEth", data);
    return promise.then((data) => MsgClaimEthResponse.decode(new BinaryReader(data)));
  }

  ClaimArkeo(request: MsgClaimArkeo): Promise<MsgClaimArkeoResponse> {
    const data = MsgClaimArkeo.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClaimArkeo", data);
    return promise.then((data) => MsgClaimArkeoResponse.decode(new BinaryReader(data)));
  }

  ClaimThorchain(request: MsgClaimThorchain): Promise<MsgClaimThorchainResponse> {
    const data = MsgClaimThorchain.encode(request).finish();
    const promise = this.rpc.request("arkeo.claim.Msg", "ClaimThorchain", data);
    return promise.then((data) => MsgClaimThorchainResponse.decode(new _m0.Reader(data)));
  }

  TransferClaim(request: MsgTransferClaim): Promise<MsgTransferClaimResponse> {
    const data = MsgTransferClaim.encode(request).finish();
    const promise = this.rpc.request(this.service, "TransferClaim", data);
    return promise.then((data) => MsgTransferClaimResponse.decode(new BinaryReader(data)));
  }

  AddClaim(request: MsgAddClaim): Promise<MsgAddClaimResponse> {
    const data = MsgAddClaim.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddClaim", data);
    return promise.then((data) => MsgAddClaimResponse.decode(new BinaryReader(data)));
  }

  ClaimThorchain(request: MsgClaimThorchain): Promise<MsgClaimThorchainResponse> {
    const data = MsgClaimThorchain.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClaimThorchain", data);
    return promise.then((data) => MsgClaimThorchainResponse.decode(new BinaryReader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
