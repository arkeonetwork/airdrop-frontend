/* eslint-disable */
import {
  Chain,
  chainFromJSON,
  chainToJSON,
} from "../../arkeo/claim/claim_record";
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "arkeo.claim";

export interface MsgClaimEth {
  creator: Uint8Array;
  /** the adress the claim is for */
  ethAddress: string;
  /** EIP712 signature that has to be signed by ethAddress */
  signature: string;
}

export interface MsgClaimEthResponse {}

export interface MsgClaimArkeo {
  creator: Uint8Array;
}

export interface MsgClaimArkeoResponse {}

export interface MsgTransferClaim {
  creator: Uint8Array;
  toAddress: Uint8Array;
}

export interface MsgTransferClaimResponse {}

export interface MsgAddClaim {
  creator: Uint8Array;
  chain: Chain;
  address: string;
  amount: number;
}

export interface MsgAddClaimResponse {}

const baseMsgClaimEth: object = { ethAddress: "", signature: "" };

export const MsgClaimEth = {
  encode(message: MsgClaimEth, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.ethAddress !== "") {
      writer.uint32(18).string(message.ethAddress);
    }
    if (message.signature !== "") {
      writer.uint32(26).string(message.signature);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimEth {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimEth } as MsgClaimEth;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.ethAddress = reader.string();
          break;
        case 3:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimEth {
    const message = { ...baseMsgClaimEth } as MsgClaimEth;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.ethAddress !== undefined && object.ethAddress !== null) {
      message.ethAddress = String(object.ethAddress);
    } else {
      message.ethAddress = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = String(object.signature);
    } else {
      message.signature = "";
    }
    return message;
  },

  toJSON(message: MsgClaimEth): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.ethAddress !== undefined && (obj.ethAddress = message.ethAddress);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgClaimEth>): MsgClaimEth {
    const message = { ...baseMsgClaimEth } as MsgClaimEth;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.ethAddress !== undefined && object.ethAddress !== null) {
      message.ethAddress = object.ethAddress;
    } else {
      message.ethAddress = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = "";
    }
    return message;
  },
};

const baseMsgClaimEthResponse: object = {};

export const MsgClaimEthResponse = {
  encode(_: MsgClaimEthResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimEthResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimEthResponse } as MsgClaimEthResponse;
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

  fromJSON(_: any): MsgClaimEthResponse {
    const message = { ...baseMsgClaimEthResponse } as MsgClaimEthResponse;
    return message;
  },

  toJSON(_: MsgClaimEthResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgClaimEthResponse>): MsgClaimEthResponse {
    const message = { ...baseMsgClaimEthResponse } as MsgClaimEthResponse;
    return message;
  },
};

const baseMsgClaimArkeo: object = {};

export const MsgClaimArkeo = {
  encode(message: MsgClaimArkeo, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimArkeo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimArkeo } as MsgClaimArkeo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimArkeo {
    const message = { ...baseMsgClaimArkeo } as MsgClaimArkeo;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    return message;
  },

  toJSON(message: MsgClaimArkeo): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgClaimArkeo>): MsgClaimArkeo {
    const message = { ...baseMsgClaimArkeo } as MsgClaimArkeo;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    return message;
  },
};

const baseMsgClaimArkeoResponse: object = {};

export const MsgClaimArkeoResponse = {
  encode(_: MsgClaimArkeoResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimArkeoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimArkeoResponse } as MsgClaimArkeoResponse;
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

  fromJSON(_: any): MsgClaimArkeoResponse {
    const message = { ...baseMsgClaimArkeoResponse } as MsgClaimArkeoResponse;
    return message;
  },

  toJSON(_: MsgClaimArkeoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgClaimArkeoResponse>): MsgClaimArkeoResponse {
    const message = { ...baseMsgClaimArkeoResponse } as MsgClaimArkeoResponse;
    return message;
  },
};

const baseMsgTransferClaim: object = {};

export const MsgTransferClaim = {
  encode(message: MsgTransferClaim, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.toAddress.length !== 0) {
      writer.uint32(18).bytes(message.toAddress);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTransferClaim {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgTransferClaim } as MsgTransferClaim;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.toAddress = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferClaim {
    const message = { ...baseMsgTransferClaim } as MsgTransferClaim;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.toAddress !== undefined && object.toAddress !== null) {
      message.toAddress = bytesFromBase64(object.toAddress);
    }
    return message;
  },

  toJSON(message: MsgTransferClaim): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.toAddress !== undefined &&
      (obj.toAddress = base64FromBytes(
        message.toAddress !== undefined ? message.toAddress : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgTransferClaim>): MsgTransferClaim {
    const message = { ...baseMsgTransferClaim } as MsgTransferClaim;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.toAddress !== undefined && object.toAddress !== null) {
      message.toAddress = object.toAddress;
    } else {
      message.toAddress = new Uint8Array();
    }
    return message;
  },
};

const baseMsgTransferClaimResponse: object = {};

export const MsgTransferClaimResponse = {
  encode(
    _: MsgTransferClaimResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgTransferClaimResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgTransferClaimResponse,
    } as MsgTransferClaimResponse;
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

  fromJSON(_: any): MsgTransferClaimResponse {
    const message = {
      ...baseMsgTransferClaimResponse,
    } as MsgTransferClaimResponse;
    return message;
  },

  toJSON(_: MsgTransferClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgTransferClaimResponse>
  ): MsgTransferClaimResponse {
    const message = {
      ...baseMsgTransferClaimResponse,
    } as MsgTransferClaimResponse;
    return message;
  },
};

const baseMsgAddClaim: object = { chain: 0, address: "", amount: 0 };

export const MsgAddClaim = {
  encode(message: MsgAddClaim, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
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

  decode(input: Reader | Uint8Array, length?: number): MsgAddClaim {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddClaim } as MsgAddClaim;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.chain = reader.int32() as any;
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.amount = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddClaim {
    const message = { ...baseMsgAddClaim } as MsgAddClaim;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.chain !== undefined && object.chain !== null) {
      message.chain = chainFromJSON(object.chain);
    } else {
      message.chain = 0;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Number(object.amount);
    } else {
      message.amount = 0;
    }
    return message;
  },

  toJSON(message: MsgAddClaim): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.chain !== undefined && (obj.chain = chainToJSON(message.chain));
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddClaim>): MsgAddClaim {
    const message = { ...baseMsgAddClaim } as MsgAddClaim;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.chain !== undefined && object.chain !== null) {
      message.chain = object.chain;
    } else {
      message.chain = 0;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    } else {
      message.amount = 0;
    }
    return message;
  },
};

const baseMsgAddClaimResponse: object = {};

export const MsgAddClaimResponse = {
  encode(_: MsgAddClaimResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddClaimResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddClaimResponse } as MsgAddClaimResponse;
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

  fromJSON(_: any): MsgAddClaimResponse {
    const message = { ...baseMsgAddClaimResponse } as MsgAddClaimResponse;
    return message;
  },

  toJSON(_: MsgAddClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgAddClaimResponse>): MsgAddClaimResponse {
    const message = { ...baseMsgAddClaimResponse } as MsgAddClaimResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  ClaimEth(request: MsgClaimEth): Promise<MsgClaimEthResponse>;
  ClaimArkeo(request: MsgClaimArkeo): Promise<MsgClaimArkeoResponse>;
  TransferClaim(request: MsgTransferClaim): Promise<MsgTransferClaimResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  AddClaim(request: MsgAddClaim): Promise<MsgAddClaimResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  ClaimEth(request: MsgClaimEth): Promise<MsgClaimEthResponse> {
    const data = MsgClaimEth.encode(request).finish();
    const promise = this.rpc.request("arkeo.claim.Msg", "ClaimEth", data);
    return promise.then((data) => MsgClaimEthResponse.decode(new Reader(data)));
  }

  ClaimArkeo(request: MsgClaimArkeo): Promise<MsgClaimArkeoResponse> {
    const data = MsgClaimArkeo.encode(request).finish();
    const promise = this.rpc.request("arkeo.claim.Msg", "ClaimArkeo", data);
    return promise.then((data) =>
      MsgClaimArkeoResponse.decode(new Reader(data))
    );
  }

  TransferClaim(request: MsgTransferClaim): Promise<MsgTransferClaimResponse> {
    const data = MsgTransferClaim.encode(request).finish();
    const promise = this.rpc.request("arkeo.claim.Msg", "TransferClaim", data);
    return promise.then((data) =>
      MsgTransferClaimResponse.decode(new Reader(data))
    );
  }

  AddClaim(request: MsgAddClaim): Promise<MsgAddClaimResponse> {
    const data = MsgAddClaim.encode(request).finish();
    const promise = this.rpc.request("arkeo.claim.Msg", "AddClaim", data);
    return promise.then((data) => MsgAddClaimResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
