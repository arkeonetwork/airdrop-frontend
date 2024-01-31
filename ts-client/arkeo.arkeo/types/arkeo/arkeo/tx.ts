/* eslint-disable */
import {
  ProviderStatus,
  ContractType,
  ContractAuthorization,
  providerStatusFromJSON,
  providerStatusToJSON,
  contractTypeFromJSON,
  contractAuthorizationFromJSON,
  contractTypeToJSON,
  contractAuthorizationToJSON,
} from "../../arkeo/arkeo/keeper";
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "arkeo.arkeo";

export interface MsgBondProvider {
  creator: Uint8Array;
  provider: Uint8Array;
  service: string;
  bond: string;
}

export interface MsgBondProviderResponse {}

export interface MsgModProvider {
  creator: Uint8Array;
  provider: Uint8Array;
  service: string;
  metadataUri: string;
  metadataNonce: number;
  status: ProviderStatus;
  minContractDuration: number;
  maxContractDuration: number;
  subscriptionRate: Coin[];
  payAsYouGoRate: Coin[];
  settlementDuration: number;
}

export interface MsgModProviderResponse {}

export interface MsgOpenContract {
  creator: Uint8Array;
  provider: Uint8Array;
  service: string;
  client: Uint8Array;
  delegate: Uint8Array;
  contractType: ContractType;
  duration: number;
  rate: Coin | undefined;
  deposit: string;
  settlementDuration: number;
  authorization: ContractAuthorization;
  queriesPerMinute: number;
}

export interface MsgOpenContractResponse {}

export interface MsgCloseContract {
  creator: Uint8Array;
  contractId: number;
}

export interface MsgCloseContractResponse {}

export interface MsgClaimContractIncome {
  creator: Uint8Array;
  contractId: number;
  signature: Uint8Array;
  nonce: number;
}

export interface MsgClaimContractIncomeResponse {}

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgSetVersion {
  creator: Uint8Array;
  version: number;
}

export interface MsgSetVersionResponse {}

const baseMsgBondProvider: object = { service: "", bond: "" };

export const MsgBondProvider = {
  encode(message: MsgBondProvider, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.provider.length !== 0) {
      writer.uint32(18).bytes(message.provider);
    }
    if (message.service !== "") {
      writer.uint32(26).string(message.service);
    }
    if (message.bond !== "") {
      writer.uint32(34).string(message.bond);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBondProvider {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgBondProvider } as MsgBondProvider;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.provider = reader.bytes();
          break;
        case 3:
          message.service = reader.string();
          break;
        case 4:
          message.bond = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBondProvider {
    const message = { ...baseMsgBondProvider } as MsgBondProvider;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = bytesFromBase64(object.provider);
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = String(object.service);
    } else {
      message.service = "";
    }
    if (object.bond !== undefined && object.bond !== null) {
      message.bond = String(object.bond);
    } else {
      message.bond = "";
    }
    return message;
  },

  toJSON(message: MsgBondProvider): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.provider !== undefined &&
      (obj.provider = base64FromBytes(
        message.provider !== undefined ? message.provider : new Uint8Array()
      ));
    message.service !== undefined && (obj.service = message.service);
    message.bond !== undefined && (obj.bond = message.bond);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgBondProvider>): MsgBondProvider {
    const message = { ...baseMsgBondProvider } as MsgBondProvider;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = new Uint8Array();
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = "";
    }
    if (object.bond !== undefined && object.bond !== null) {
      message.bond = object.bond;
    } else {
      message.bond = "";
    }
    return message;
  },
};

const baseMsgBondProviderResponse: object = {};

export const MsgBondProviderResponse = {
  encode(_: MsgBondProviderResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBondProviderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgBondProviderResponse,
    } as MsgBondProviderResponse;
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

  fromJSON(_: any): MsgBondProviderResponse {
    const message = {
      ...baseMsgBondProviderResponse,
    } as MsgBondProviderResponse;
    return message;
  },

  toJSON(_: MsgBondProviderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgBondProviderResponse>
  ): MsgBondProviderResponse {
    const message = {
      ...baseMsgBondProviderResponse,
    } as MsgBondProviderResponse;
    return message;
  },
};

const baseMsgModProvider: object = {
  service: "",
  metadataUri: "",
  metadataNonce: 0,
  status: 0,
  minContractDuration: 0,
  maxContractDuration: 0,
  settlementDuration: 0,
};

export const MsgModProvider = {
  encode(message: MsgModProvider, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.provider.length !== 0) {
      writer.uint32(18).bytes(message.provider);
    }
    if (message.service !== "") {
      writer.uint32(26).string(message.service);
    }
    if (message.metadataUri !== "") {
      writer.uint32(34).string(message.metadataUri);
    }
    if (message.metadataNonce !== 0) {
      writer.uint32(40).uint64(message.metadataNonce);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    if (message.minContractDuration !== 0) {
      writer.uint32(56).int64(message.minContractDuration);
    }
    if (message.maxContractDuration !== 0) {
      writer.uint32(64).int64(message.maxContractDuration);
    }
    for (const v of message.subscriptionRate) {
      Coin.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.payAsYouGoRate) {
      Coin.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.settlementDuration !== 0) {
      writer.uint32(88).int64(message.settlementDuration);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgModProvider {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgModProvider } as MsgModProvider;
    message.subscriptionRate = [];
    message.payAsYouGoRate = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.provider = reader.bytes();
          break;
        case 3:
          message.service = reader.string();
          break;
        case 4:
          message.metadataUri = reader.string();
          break;
        case 5:
          message.metadataNonce = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.status = reader.int32() as any;
          break;
        case 7:
          message.minContractDuration = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.maxContractDuration = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.subscriptionRate.push(Coin.decode(reader, reader.uint32()));
          break;
        case 10:
          message.payAsYouGoRate.push(Coin.decode(reader, reader.uint32()));
          break;
        case 11:
          message.settlementDuration = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgModProvider {
    const message = { ...baseMsgModProvider } as MsgModProvider;
    message.subscriptionRate = [];
    message.payAsYouGoRate = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = bytesFromBase64(object.provider);
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = String(object.service);
    } else {
      message.service = "";
    }
    if (object.metadataUri !== undefined && object.metadataUri !== null) {
      message.metadataUri = String(object.metadataUri);
    } else {
      message.metadataUri = "";
    }
    if (object.metadataNonce !== undefined && object.metadataNonce !== null) {
      message.metadataNonce = Number(object.metadataNonce);
    } else {
      message.metadataNonce = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = providerStatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (
      object.minContractDuration !== undefined &&
      object.minContractDuration !== null
    ) {
      message.minContractDuration = Number(object.minContractDuration);
    } else {
      message.minContractDuration = 0;
    }
    if (
      object.maxContractDuration !== undefined &&
      object.maxContractDuration !== null
    ) {
      message.maxContractDuration = Number(object.maxContractDuration);
    } else {
      message.maxContractDuration = 0;
    }
    if (
      object.subscriptionRate !== undefined &&
      object.subscriptionRate !== null
    ) {
      for (const e of object.subscriptionRate) {
        message.subscriptionRate.push(Coin.fromJSON(e));
      }
    }
    if (object.payAsYouGoRate !== undefined && object.payAsYouGoRate !== null) {
      for (const e of object.payAsYouGoRate) {
        message.payAsYouGoRate.push(Coin.fromJSON(e));
      }
    }
    if (
      object.settlementDuration !== undefined &&
      object.settlementDuration !== null
    ) {
      message.settlementDuration = Number(object.settlementDuration);
    } else {
      message.settlementDuration = 0;
    }
    return message;
  },

  toJSON(message: MsgModProvider): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.provider !== undefined &&
      (obj.provider = base64FromBytes(
        message.provider !== undefined ? message.provider : new Uint8Array()
      ));
    message.service !== undefined && (obj.service = message.service);
    message.metadataUri !== undefined &&
      (obj.metadataUri = message.metadataUri);
    message.metadataNonce !== undefined &&
      (obj.metadataNonce = message.metadataNonce);
    message.status !== undefined &&
      (obj.status = providerStatusToJSON(message.status));
    message.minContractDuration !== undefined &&
      (obj.minContractDuration = message.minContractDuration);
    message.maxContractDuration !== undefined &&
      (obj.maxContractDuration = message.maxContractDuration);
    if (message.subscriptionRate) {
      obj.subscriptionRate = message.subscriptionRate.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.subscriptionRate = [];
    }
    if (message.payAsYouGoRate) {
      obj.payAsYouGoRate = message.payAsYouGoRate.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.payAsYouGoRate = [];
    }
    message.settlementDuration !== undefined &&
      (obj.settlementDuration = message.settlementDuration);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgModProvider>): MsgModProvider {
    const message = { ...baseMsgModProvider } as MsgModProvider;
    message.subscriptionRate = [];
    message.payAsYouGoRate = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = new Uint8Array();
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = "";
    }
    if (object.metadataUri !== undefined && object.metadataUri !== null) {
      message.metadataUri = object.metadataUri;
    } else {
      message.metadataUri = "";
    }
    if (object.metadataNonce !== undefined && object.metadataNonce !== null) {
      message.metadataNonce = object.metadataNonce;
    } else {
      message.metadataNonce = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (
      object.minContractDuration !== undefined &&
      object.minContractDuration !== null
    ) {
      message.minContractDuration = object.minContractDuration;
    } else {
      message.minContractDuration = 0;
    }
    if (
      object.maxContractDuration !== undefined &&
      object.maxContractDuration !== null
    ) {
      message.maxContractDuration = object.maxContractDuration;
    } else {
      message.maxContractDuration = 0;
    }
    if (
      object.subscriptionRate !== undefined &&
      object.subscriptionRate !== null
    ) {
      for (const e of object.subscriptionRate) {
        message.subscriptionRate.push(Coin.fromPartial(e));
      }
    }
    if (object.payAsYouGoRate !== undefined && object.payAsYouGoRate !== null) {
      for (const e of object.payAsYouGoRate) {
        message.payAsYouGoRate.push(Coin.fromPartial(e));
      }
    }
    if (
      object.settlementDuration !== undefined &&
      object.settlementDuration !== null
    ) {
      message.settlementDuration = object.settlementDuration;
    } else {
      message.settlementDuration = 0;
    }
    return message;
  },
};

const baseMsgModProviderResponse: object = {};

export const MsgModProviderResponse = {
  encode(_: MsgModProviderResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgModProviderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgModProviderResponse } as MsgModProviderResponse;
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

  fromJSON(_: any): MsgModProviderResponse {
    const message = { ...baseMsgModProviderResponse } as MsgModProviderResponse;
    return message;
  },

  toJSON(_: MsgModProviderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgModProviderResponse>): MsgModProviderResponse {
    const message = { ...baseMsgModProviderResponse } as MsgModProviderResponse;
    return message;
  },
};

const baseMsgOpenContract: object = {
  service: "",
  contractType: 0,
  duration: 0,
  deposit: "",
  settlementDuration: 0,
  authorization: 0,
  queriesPerMinute: 0,
};

export const MsgOpenContract = {
  encode(message: MsgOpenContract, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.provider.length !== 0) {
      writer.uint32(18).bytes(message.provider);
    }
    if (message.service !== "") {
      writer.uint32(26).string(message.service);
    }
    if (message.client.length !== 0) {
      writer.uint32(34).bytes(message.client);
    }
    if (message.delegate.length !== 0) {
      writer.uint32(42).bytes(message.delegate);
    }
    if (message.contractType !== 0) {
      writer.uint32(48).int32(message.contractType);
    }
    if (message.duration !== 0) {
      writer.uint32(56).int64(message.duration);
    }
    if (message.rate !== undefined) {
      Coin.encode(message.rate, writer.uint32(66).fork()).ldelim();
    }
    if (message.deposit !== "") {
      writer.uint32(74).string(message.deposit);
    }
    if (message.settlementDuration !== 0) {
      writer.uint32(80).int64(message.settlementDuration);
    }
    if (message.authorization !== 0) {
      writer.uint32(88).int32(message.authorization);
    }
    if (message.queriesPerMinute !== 0) {
      writer.uint32(96).int64(message.queriesPerMinute);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgOpenContract {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgOpenContract } as MsgOpenContract;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.provider = reader.bytes();
          break;
        case 3:
          message.service = reader.string();
          break;
        case 4:
          message.client = reader.bytes();
          break;
        case 5:
          message.delegate = reader.bytes();
          break;
        case 6:
          message.contractType = reader.int32() as any;
          break;
        case 7:
          message.duration = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.rate = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.deposit = reader.string();
          break;
        case 10:
          message.settlementDuration = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.authorization = reader.int32() as any;
          break;
        case 12:
          message.queriesPerMinute = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgOpenContract {
    const message = { ...baseMsgOpenContract } as MsgOpenContract;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = bytesFromBase64(object.provider);
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = String(object.service);
    } else {
      message.service = "";
    }
    if (object.client !== undefined && object.client !== null) {
      message.client = bytesFromBase64(object.client);
    }
    if (object.delegate !== undefined && object.delegate !== null) {
      message.delegate = bytesFromBase64(object.delegate);
    }
    if (object.contractType !== undefined && object.contractType !== null) {
      message.contractType = contractTypeFromJSON(object.contractType);
    } else {
      message.contractType = 0;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Number(object.duration);
    } else {
      message.duration = 0;
    }
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = Coin.fromJSON(object.rate);
    } else {
      message.rate = undefined;
    }
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = String(object.deposit);
    } else {
      message.deposit = "";
    }
    if (
      object.settlementDuration !== undefined &&
      object.settlementDuration !== null
    ) {
      message.settlementDuration = Number(object.settlementDuration);
    } else {
      message.settlementDuration = 0;
    }
    if (object.authorization !== undefined && object.authorization !== null) {
      message.authorization = contractAuthorizationFromJSON(
        object.authorization
      );
    } else {
      message.authorization = 0;
    }
    if (
      object.queriesPerMinute !== undefined &&
      object.queriesPerMinute !== null
    ) {
      message.queriesPerMinute = Number(object.queriesPerMinute);
    } else {
      message.queriesPerMinute = 0;
    }
    return message;
  },

  toJSON(message: MsgOpenContract): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.provider !== undefined &&
      (obj.provider = base64FromBytes(
        message.provider !== undefined ? message.provider : new Uint8Array()
      ));
    message.service !== undefined && (obj.service = message.service);
    message.client !== undefined &&
      (obj.client = base64FromBytes(
        message.client !== undefined ? message.client : new Uint8Array()
      ));
    message.delegate !== undefined &&
      (obj.delegate = base64FromBytes(
        message.delegate !== undefined ? message.delegate : new Uint8Array()
      ));
    message.contractType !== undefined &&
      (obj.contractType = contractTypeToJSON(message.contractType));
    message.duration !== undefined && (obj.duration = message.duration);
    message.rate !== undefined &&
      (obj.rate = message.rate ? Coin.toJSON(message.rate) : undefined);
    message.deposit !== undefined && (obj.deposit = message.deposit);
    message.settlementDuration !== undefined &&
      (obj.settlementDuration = message.settlementDuration);
    message.authorization !== undefined &&
      (obj.authorization = contractAuthorizationToJSON(message.authorization));
    message.queriesPerMinute !== undefined &&
      (obj.queriesPerMinute = message.queriesPerMinute);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgOpenContract>): MsgOpenContract {
    const message = { ...baseMsgOpenContract } as MsgOpenContract;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = new Uint8Array();
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = "";
    }
    if (object.client !== undefined && object.client !== null) {
      message.client = object.client;
    } else {
      message.client = new Uint8Array();
    }
    if (object.delegate !== undefined && object.delegate !== null) {
      message.delegate = object.delegate;
    } else {
      message.delegate = new Uint8Array();
    }
    if (object.contractType !== undefined && object.contractType !== null) {
      message.contractType = object.contractType;
    } else {
      message.contractType = 0;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = object.duration;
    } else {
      message.duration = 0;
    }
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = Coin.fromPartial(object.rate);
    } else {
      message.rate = undefined;
    }
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = object.deposit;
    } else {
      message.deposit = "";
    }
    if (
      object.settlementDuration !== undefined &&
      object.settlementDuration !== null
    ) {
      message.settlementDuration = object.settlementDuration;
    } else {
      message.settlementDuration = 0;
    }
    if (object.authorization !== undefined && object.authorization !== null) {
      message.authorization = object.authorization;
    } else {
      message.authorization = 0;
    }
    if (
      object.queriesPerMinute !== undefined &&
      object.queriesPerMinute !== null
    ) {
      message.queriesPerMinute = object.queriesPerMinute;
    } else {
      message.queriesPerMinute = 0;
    }
    return message;
  },
};

const baseMsgOpenContractResponse: object = {};

export const MsgOpenContractResponse = {
  encode(_: MsgOpenContractResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgOpenContractResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgOpenContractResponse,
    } as MsgOpenContractResponse;
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

  fromJSON(_: any): MsgOpenContractResponse {
    const message = {
      ...baseMsgOpenContractResponse,
    } as MsgOpenContractResponse;
    return message;
  },

  toJSON(_: MsgOpenContractResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgOpenContractResponse>
  ): MsgOpenContractResponse {
    const message = {
      ...baseMsgOpenContractResponse,
    } as MsgOpenContractResponse;
    return message;
  },
};

const baseMsgCloseContract: object = { contractId: 0 };

export const MsgCloseContract = {
  encode(message: MsgCloseContract, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.contractId !== 0) {
      writer.uint32(16).uint64(message.contractId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCloseContract {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCloseContract } as MsgCloseContract;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.contractId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCloseContract {
    const message = { ...baseMsgCloseContract } as MsgCloseContract;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = Number(object.contractId);
    } else {
      message.contractId = 0;
    }
    return message;
  },

  toJSON(message: MsgCloseContract): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.contractId !== undefined && (obj.contractId = message.contractId);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCloseContract>): MsgCloseContract {
    const message = { ...baseMsgCloseContract } as MsgCloseContract;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = object.contractId;
    } else {
      message.contractId = 0;
    }
    return message;
  },
};

const baseMsgCloseContractResponse: object = {};

export const MsgCloseContractResponse = {
  encode(
    _: MsgCloseContractResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCloseContractResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCloseContractResponse,
    } as MsgCloseContractResponse;
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

  fromJSON(_: any): MsgCloseContractResponse {
    const message = {
      ...baseMsgCloseContractResponse,
    } as MsgCloseContractResponse;
    return message;
  },

  toJSON(_: MsgCloseContractResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCloseContractResponse>
  ): MsgCloseContractResponse {
    const message = {
      ...baseMsgCloseContractResponse,
    } as MsgCloseContractResponse;
    return message;
  },
};

const baseMsgClaimContractIncome: object = { contractId: 0, nonce: 0 };

export const MsgClaimContractIncome = {
  encode(
    message: MsgClaimContractIncome,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.contractId !== 0) {
      writer.uint32(16).uint64(message.contractId);
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    if (message.nonce !== 0) {
      writer.uint32(40).int64(message.nonce);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimContractIncome {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimContractIncome } as MsgClaimContractIncome;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.contractId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.signature = reader.bytes();
          break;
        case 5:
          message.nonce = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimContractIncome {
    const message = { ...baseMsgClaimContractIncome } as MsgClaimContractIncome;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = Number(object.contractId);
    } else {
      message.contractId = 0;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = bytesFromBase64(object.signature);
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = Number(object.nonce);
    } else {
      message.nonce = 0;
    }
    return message;
  },

  toJSON(message: MsgClaimContractIncome): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array()
      ));
    message.nonce !== undefined && (obj.nonce = message.nonce);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgClaimContractIncome>
  ): MsgClaimContractIncome {
    const message = { ...baseMsgClaimContractIncome } as MsgClaimContractIncome;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = object.contractId;
    } else {
      message.contractId = 0;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = new Uint8Array();
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    } else {
      message.nonce = 0;
    }
    return message;
  },
};

const baseMsgClaimContractIncomeResponse: object = {};

export const MsgClaimContractIncomeResponse = {
  encode(
    _: MsgClaimContractIncomeResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgClaimContractIncomeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgClaimContractIncomeResponse,
    } as MsgClaimContractIncomeResponse;
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

  fromJSON(_: any): MsgClaimContractIncomeResponse {
    const message = {
      ...baseMsgClaimContractIncomeResponse,
    } as MsgClaimContractIncomeResponse;
    return message;
  },

  toJSON(_: MsgClaimContractIncomeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgClaimContractIncomeResponse>
  ): MsgClaimContractIncomeResponse {
    const message = {
      ...baseMsgClaimContractIncomeResponse,
    } as MsgClaimContractIncomeResponse;
    return message;
  },
};

const baseMsgSetVersion: object = { version: 0 };

export const MsgSetVersion = {
  encode(message: MsgSetVersion, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.version !== 0) {
      writer.uint32(16).int64(message.version);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetVersion {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetVersion } as MsgSetVersion;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.version = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetVersion {
    const message = { ...baseMsgSetVersion } as MsgSetVersion;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version);
    } else {
      message.version = 0;
    }
    return message;
  },

  toJSON(message: MsgSetVersion): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetVersion>): MsgSetVersion {
    const message = { ...baseMsgSetVersion } as MsgSetVersion;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = 0;
    }
    return message;
  },
};

const baseMsgSetVersionResponse: object = {};

export const MsgSetVersionResponse = {
  encode(_: MsgSetVersionResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetVersionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetVersionResponse } as MsgSetVersionResponse;
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

  fromJSON(_: any): MsgSetVersionResponse {
    const message = { ...baseMsgSetVersionResponse } as MsgSetVersionResponse;
    return message;
  },

  toJSON(_: MsgSetVersionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSetVersionResponse>): MsgSetVersionResponse {
    const message = { ...baseMsgSetVersionResponse } as MsgSetVersionResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  BondProvider(request: MsgBondProvider): Promise<MsgBondProviderResponse>;
  ModProvider(request: MsgModProvider): Promise<MsgModProviderResponse>;
  OpenContract(request: MsgOpenContract): Promise<MsgOpenContractResponse>;
  CloseContract(request: MsgCloseContract): Promise<MsgCloseContractResponse>;
  ClaimContractIncome(
    request: MsgClaimContractIncome
  ): Promise<MsgClaimContractIncomeResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SetVersion(request: MsgSetVersion): Promise<MsgSetVersionResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  BondProvider(request: MsgBondProvider): Promise<MsgBondProviderResponse> {
    const data = MsgBondProvider.encode(request).finish();
    const promise = this.rpc.request("arkeo.arkeo.Msg", "BondProvider", data);
    return promise.then((data) =>
      MsgBondProviderResponse.decode(new Reader(data))
    );
  }

  ModProvider(request: MsgModProvider): Promise<MsgModProviderResponse> {
    const data = MsgModProvider.encode(request).finish();
    const promise = this.rpc.request("arkeo.arkeo.Msg", "ModProvider", data);
    return promise.then((data) =>
      MsgModProviderResponse.decode(new Reader(data))
    );
  }

  OpenContract(request: MsgOpenContract): Promise<MsgOpenContractResponse> {
    const data = MsgOpenContract.encode(request).finish();
    const promise = this.rpc.request("arkeo.arkeo.Msg", "OpenContract", data);
    return promise.then((data) =>
      MsgOpenContractResponse.decode(new Reader(data))
    );
  }

  CloseContract(request: MsgCloseContract): Promise<MsgCloseContractResponse> {
    const data = MsgCloseContract.encode(request).finish();
    const promise = this.rpc.request("arkeo.arkeo.Msg", "CloseContract", data);
    return promise.then((data) =>
      MsgCloseContractResponse.decode(new Reader(data))
    );
  }

  ClaimContractIncome(
    request: MsgClaimContractIncome
  ): Promise<MsgClaimContractIncomeResponse> {
    const data = MsgClaimContractIncome.encode(request).finish();
    const promise = this.rpc.request(
      "arkeo.arkeo.Msg",
      "ClaimContractIncome",
      data
    );
    return promise.then((data) =>
      MsgClaimContractIncomeResponse.decode(new Reader(data))
    );
  }

  SetVersion(request: MsgSetVersion): Promise<MsgSetVersionResponse> {
    const data = MsgSetVersion.encode(request).finish();
    const promise = this.rpc.request("arkeo.arkeo.Msg", "SetVersion", data);
    return promise.then((data) =>
      MsgSetVersionResponse.decode(new Reader(data))
    );
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
