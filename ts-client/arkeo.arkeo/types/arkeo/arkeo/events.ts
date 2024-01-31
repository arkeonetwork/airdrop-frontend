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
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "arkeo.arkeo";

export interface EventBondProvider {
  provider: Uint8Array;
  service: string;
  bondRel: string;
  bondAbs: string;
}

export interface EventModProvider {
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
  bond: string;
  settlementDuration: number;
}

export interface EventOpenContract {
  provider: Uint8Array;
  contractId: number;
  service: string;
  client: Uint8Array;
  delegate: Uint8Array;
  type: ContractType;
  height: number;
  duration: number;
  rate: Coin | undefined;
  openCost: number;
  deposit: string;
  settlementDuration: number;
  authorization: ContractAuthorization;
  queriesPerMinute: number;
}

export interface EventSettleContract {
  provider: Uint8Array;
  contractId: number;
  service: string;
  client: Uint8Array;
  delegate: Uint8Array;
  type: ContractType;
  nonce: number;
  height: number;
  paid: string;
  reserve: string;
}

export interface EventCloseContract {
  contractId: number;
  provider: Uint8Array;
  service: string;
  client: Uint8Array;
  delegate: Uint8Array;
}

export interface EventValidatorPayout {
  validator: Uint8Array;
  reward: string;
}

const baseEventBondProvider: object = { service: "", bondRel: "", bondAbs: "" };

export const EventBondProvider = {
  encode(message: EventBondProvider, writer: Writer = Writer.create()): Writer {
    if (message.provider.length !== 0) {
      writer.uint32(10).bytes(message.provider);
    }
    if (message.service !== "") {
      writer.uint32(18).string(message.service);
    }
    if (message.bondRel !== "") {
      writer.uint32(26).string(message.bondRel);
    }
    if (message.bondAbs !== "") {
      writer.uint32(34).string(message.bondAbs);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EventBondProvider {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventBondProvider } as EventBondProvider;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider = reader.bytes();
          break;
        case 2:
          message.service = reader.string();
          break;
        case 3:
          message.bondRel = reader.string();
          break;
        case 4:
          message.bondAbs = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventBondProvider {
    const message = { ...baseEventBondProvider } as EventBondProvider;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = bytesFromBase64(object.provider);
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = String(object.service);
    } else {
      message.service = "";
    }
    if (object.bondRel !== undefined && object.bondRel !== null) {
      message.bondRel = String(object.bondRel);
    } else {
      message.bondRel = "";
    }
    if (object.bondAbs !== undefined && object.bondAbs !== null) {
      message.bondAbs = String(object.bondAbs);
    } else {
      message.bondAbs = "";
    }
    return message;
  },

  toJSON(message: EventBondProvider): unknown {
    const obj: any = {};
    message.provider !== undefined &&
      (obj.provider = base64FromBytes(
        message.provider !== undefined ? message.provider : new Uint8Array()
      ));
    message.service !== undefined && (obj.service = message.service);
    message.bondRel !== undefined && (obj.bondRel = message.bondRel);
    message.bondAbs !== undefined && (obj.bondAbs = message.bondAbs);
    return obj;
  },

  fromPartial(object: DeepPartial<EventBondProvider>): EventBondProvider {
    const message = { ...baseEventBondProvider } as EventBondProvider;
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
    if (object.bondRel !== undefined && object.bondRel !== null) {
      message.bondRel = object.bondRel;
    } else {
      message.bondRel = "";
    }
    if (object.bondAbs !== undefined && object.bondAbs !== null) {
      message.bondAbs = object.bondAbs;
    } else {
      message.bondAbs = "";
    }
    return message;
  },
};

const baseEventModProvider: object = {
  service: "",
  metadataUri: "",
  metadataNonce: 0,
  status: 0,
  minContractDuration: 0,
  maxContractDuration: 0,
  bond: "",
  settlementDuration: 0,
};

export const EventModProvider = {
  encode(message: EventModProvider, writer: Writer = Writer.create()): Writer {
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
    if (message.bond !== "") {
      writer.uint32(90).string(message.bond);
    }
    if (message.settlementDuration !== 0) {
      writer.uint32(96).int64(message.settlementDuration);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EventModProvider {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventModProvider } as EventModProvider;
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
          message.bond = reader.string();
          break;
        case 12:
          message.settlementDuration = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventModProvider {
    const message = { ...baseEventModProvider } as EventModProvider;
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
    if (object.bond !== undefined && object.bond !== null) {
      message.bond = String(object.bond);
    } else {
      message.bond = "";
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

  toJSON(message: EventModProvider): unknown {
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
    message.bond !== undefined && (obj.bond = message.bond);
    message.settlementDuration !== undefined &&
      (obj.settlementDuration = message.settlementDuration);
    return obj;
  },

  fromPartial(object: DeepPartial<EventModProvider>): EventModProvider {
    const message = { ...baseEventModProvider } as EventModProvider;
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
    if (object.bond !== undefined && object.bond !== null) {
      message.bond = object.bond;
    } else {
      message.bond = "";
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

const baseEventOpenContract: object = {
  contractId: 0,
  service: "",
  type: 0,
  height: 0,
  duration: 0,
  openCost: 0,
  deposit: "",
  settlementDuration: 0,
  authorization: 0,
  queriesPerMinute: 0,
};

export const EventOpenContract = {
  encode(message: EventOpenContract, writer: Writer = Writer.create()): Writer {
    if (message.provider.length !== 0) {
      writer.uint32(10).bytes(message.provider);
    }
    if (message.contractId !== 0) {
      writer.uint32(16).uint64(message.contractId);
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
    if (message.type !== 0) {
      writer.uint32(48).int32(message.type);
    }
    if (message.height !== 0) {
      writer.uint32(56).int64(message.height);
    }
    if (message.duration !== 0) {
      writer.uint32(64).int64(message.duration);
    }
    if (message.rate !== undefined) {
      Coin.encode(message.rate, writer.uint32(74).fork()).ldelim();
    }
    if (message.openCost !== 0) {
      writer.uint32(80).int64(message.openCost);
    }
    if (message.deposit !== "") {
      writer.uint32(90).string(message.deposit);
    }
    if (message.settlementDuration !== 0) {
      writer.uint32(96).int64(message.settlementDuration);
    }
    if (message.authorization !== 0) {
      writer.uint32(104).int32(message.authorization);
    }
    if (message.queriesPerMinute !== 0) {
      writer.uint32(112).int64(message.queriesPerMinute);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EventOpenContract {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventOpenContract } as EventOpenContract;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider = reader.bytes();
          break;
        case 2:
          message.contractId = longToNumber(reader.uint64() as Long);
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
          message.type = reader.int32() as any;
          break;
        case 7:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.duration = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.rate = Coin.decode(reader, reader.uint32());
          break;
        case 10:
          message.openCost = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.deposit = reader.string();
          break;
        case 12:
          message.settlementDuration = longToNumber(reader.int64() as Long);
          break;
        case 13:
          message.authorization = reader.int32() as any;
          break;
        case 14:
          message.queriesPerMinute = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventOpenContract {
    const message = { ...baseEventOpenContract } as EventOpenContract;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = bytesFromBase64(object.provider);
    }
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = Number(object.contractId);
    } else {
      message.contractId = 0;
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
    if (object.type !== undefined && object.type !== null) {
      message.type = contractTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = 0;
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
    if (object.openCost !== undefined && object.openCost !== null) {
      message.openCost = Number(object.openCost);
    } else {
      message.openCost = 0;
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

  toJSON(message: EventOpenContract): unknown {
    const obj: any = {};
    message.provider !== undefined &&
      (obj.provider = base64FromBytes(
        message.provider !== undefined ? message.provider : new Uint8Array()
      ));
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.service !== undefined && (obj.service = message.service);
    message.client !== undefined &&
      (obj.client = base64FromBytes(
        message.client !== undefined ? message.client : new Uint8Array()
      ));
    message.delegate !== undefined &&
      (obj.delegate = base64FromBytes(
        message.delegate !== undefined ? message.delegate : new Uint8Array()
      ));
    message.type !== undefined && (obj.type = contractTypeToJSON(message.type));
    message.height !== undefined && (obj.height = message.height);
    message.duration !== undefined && (obj.duration = message.duration);
    message.rate !== undefined &&
      (obj.rate = message.rate ? Coin.toJSON(message.rate) : undefined);
    message.openCost !== undefined && (obj.openCost = message.openCost);
    message.deposit !== undefined && (obj.deposit = message.deposit);
    message.settlementDuration !== undefined &&
      (obj.settlementDuration = message.settlementDuration);
    message.authorization !== undefined &&
      (obj.authorization = contractAuthorizationToJSON(message.authorization));
    message.queriesPerMinute !== undefined &&
      (obj.queriesPerMinute = message.queriesPerMinute);
    return obj;
  },

  fromPartial(object: DeepPartial<EventOpenContract>): EventOpenContract {
    const message = { ...baseEventOpenContract } as EventOpenContract;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = new Uint8Array();
    }
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = object.contractId;
    } else {
      message.contractId = 0;
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
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = object.height;
    } else {
      message.height = 0;
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
    if (object.openCost !== undefined && object.openCost !== null) {
      message.openCost = object.openCost;
    } else {
      message.openCost = 0;
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

const baseEventSettleContract: object = {
  contractId: 0,
  service: "",
  type: 0,
  nonce: 0,
  height: 0,
  paid: "",
  reserve: "",
};

export const EventSettleContract = {
  encode(
    message: EventSettleContract,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.provider.length !== 0) {
      writer.uint32(10).bytes(message.provider);
    }
    if (message.contractId !== 0) {
      writer.uint32(16).uint64(message.contractId);
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
    if (message.type !== 0) {
      writer.uint32(48).int32(message.type);
    }
    if (message.nonce !== 0) {
      writer.uint32(56).int64(message.nonce);
    }
    if (message.height !== 0) {
      writer.uint32(64).int64(message.height);
    }
    if (message.paid !== "") {
      writer.uint32(74).string(message.paid);
    }
    if (message.reserve !== "") {
      writer.uint32(82).string(message.reserve);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EventSettleContract {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventSettleContract } as EventSettleContract;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider = reader.bytes();
          break;
        case 2:
          message.contractId = longToNumber(reader.uint64() as Long);
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
          message.type = reader.int32() as any;
          break;
        case 7:
          message.nonce = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.paid = reader.string();
          break;
        case 10:
          message.reserve = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSettleContract {
    const message = { ...baseEventSettleContract } as EventSettleContract;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = bytesFromBase64(object.provider);
    }
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = Number(object.contractId);
    } else {
      message.contractId = 0;
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
    if (object.type !== undefined && object.type !== null) {
      message.type = contractTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = Number(object.nonce);
    } else {
      message.nonce = 0;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = 0;
    }
    if (object.paid !== undefined && object.paid !== null) {
      message.paid = String(object.paid);
    } else {
      message.paid = "";
    }
    if (object.reserve !== undefined && object.reserve !== null) {
      message.reserve = String(object.reserve);
    } else {
      message.reserve = "";
    }
    return message;
  },

  toJSON(message: EventSettleContract): unknown {
    const obj: any = {};
    message.provider !== undefined &&
      (obj.provider = base64FromBytes(
        message.provider !== undefined ? message.provider : new Uint8Array()
      ));
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.service !== undefined && (obj.service = message.service);
    message.client !== undefined &&
      (obj.client = base64FromBytes(
        message.client !== undefined ? message.client : new Uint8Array()
      ));
    message.delegate !== undefined &&
      (obj.delegate = base64FromBytes(
        message.delegate !== undefined ? message.delegate : new Uint8Array()
      ));
    message.type !== undefined && (obj.type = contractTypeToJSON(message.type));
    message.nonce !== undefined && (obj.nonce = message.nonce);
    message.height !== undefined && (obj.height = message.height);
    message.paid !== undefined && (obj.paid = message.paid);
    message.reserve !== undefined && (obj.reserve = message.reserve);
    return obj;
  },

  fromPartial(object: DeepPartial<EventSettleContract>): EventSettleContract {
    const message = { ...baseEventSettleContract } as EventSettleContract;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = new Uint8Array();
    }
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = object.contractId;
    } else {
      message.contractId = 0;
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
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    } else {
      message.nonce = 0;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = object.height;
    } else {
      message.height = 0;
    }
    if (object.paid !== undefined && object.paid !== null) {
      message.paid = object.paid;
    } else {
      message.paid = "";
    }
    if (object.reserve !== undefined && object.reserve !== null) {
      message.reserve = object.reserve;
    } else {
      message.reserve = "";
    }
    return message;
  },
};

const baseEventCloseContract: object = { contractId: 0, service: "" };

export const EventCloseContract = {
  encode(
    message: EventCloseContract,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.contractId !== 0) {
      writer.uint32(8).uint64(message.contractId);
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EventCloseContract {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventCloseContract } as EventCloseContract;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractId = longToNumber(reader.uint64() as Long);
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventCloseContract {
    const message = { ...baseEventCloseContract } as EventCloseContract;
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = Number(object.contractId);
    } else {
      message.contractId = 0;
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
    return message;
  },

  toJSON(message: EventCloseContract): unknown {
    const obj: any = {};
    message.contractId !== undefined && (obj.contractId = message.contractId);
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
    return obj;
  },

  fromPartial(object: DeepPartial<EventCloseContract>): EventCloseContract {
    const message = { ...baseEventCloseContract } as EventCloseContract;
    if (object.contractId !== undefined && object.contractId !== null) {
      message.contractId = object.contractId;
    } else {
      message.contractId = 0;
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
    return message;
  },
};

const baseEventValidatorPayout: object = { reward: "" };

export const EventValidatorPayout = {
  encode(
    message: EventValidatorPayout,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.validator.length !== 0) {
      writer.uint32(10).bytes(message.validator);
    }
    if (message.reward !== "") {
      writer.uint32(18).string(message.reward);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EventValidatorPayout {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventValidatorPayout } as EventValidatorPayout;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = reader.bytes();
          break;
        case 2:
          message.reward = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventValidatorPayout {
    const message = { ...baseEventValidatorPayout } as EventValidatorPayout;
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = bytesFromBase64(object.validator);
    }
    if (object.reward !== undefined && object.reward !== null) {
      message.reward = String(object.reward);
    } else {
      message.reward = "";
    }
    return message;
  },

  toJSON(message: EventValidatorPayout): unknown {
    const obj: any = {};
    message.validator !== undefined &&
      (obj.validator = base64FromBytes(
        message.validator !== undefined ? message.validator : new Uint8Array()
      ));
    message.reward !== undefined && (obj.reward = message.reward);
    return obj;
  },

  fromPartial(object: DeepPartial<EventValidatorPayout>): EventValidatorPayout {
    const message = { ...baseEventValidatorPayout } as EventValidatorPayout;
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    } else {
      message.validator = new Uint8Array();
    }
    if (object.reward !== undefined && object.reward !== null) {
      message.reward = object.reward;
    } else {
      message.reward = "";
    }
    return message;
  },
};

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
