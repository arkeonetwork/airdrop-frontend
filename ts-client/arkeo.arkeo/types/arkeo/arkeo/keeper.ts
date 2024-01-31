/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "arkeo.arkeo";

export enum ProviderStatus {
  OFFLINE = 0,
  ONLINE = 1,
  UNRECOGNIZED = -1,
}

export function providerStatusFromJSON(object: any): ProviderStatus {
  switch (object) {
    case 0:
    case "OFFLINE":
      return ProviderStatus.OFFLINE;
    case 1:
    case "ONLINE":
      return ProviderStatus.ONLINE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProviderStatus.UNRECOGNIZED;
  }
}

export function providerStatusToJSON(object: ProviderStatus): string {
  switch (object) {
    case ProviderStatus.OFFLINE:
      return "OFFLINE";
    case ProviderStatus.ONLINE:
      return "ONLINE";
    default:
      return "UNKNOWN";
  }
}

export enum ContractType {
  SUBSCRIPTION = 0,
  PAY_AS_YOU_GO = 1,
  UNRECOGNIZED = -1,
}

export function contractTypeFromJSON(object: any): ContractType {
  switch (object) {
    case 0:
    case "SUBSCRIPTION":
      return ContractType.SUBSCRIPTION;
    case 1:
    case "PAY_AS_YOU_GO":
      return ContractType.PAY_AS_YOU_GO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContractType.UNRECOGNIZED;
  }
}

export function contractTypeToJSON(object: ContractType): string {
  switch (object) {
    case ContractType.SUBSCRIPTION:
      return "SUBSCRIPTION";
    case ContractType.PAY_AS_YOU_GO:
      return "PAY_AS_YOU_GO";
    default:
      return "UNKNOWN";
  }
}

export enum ContractAuthorization {
  STRICT = 0,
  OPEN = 1,
  UNRECOGNIZED = -1,
}

export function contractAuthorizationFromJSON(
  object: any
): ContractAuthorization {
  switch (object) {
    case 0:
    case "STRICT":
      return ContractAuthorization.STRICT;
    case 1:
    case "OPEN":
      return ContractAuthorization.OPEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContractAuthorization.UNRECOGNIZED;
  }
}

export function contractAuthorizationToJSON(
  object: ContractAuthorization
): string {
  switch (object) {
    case ContractAuthorization.STRICT:
      return "STRICT";
    case ContractAuthorization.OPEN:
      return "OPEN";
    default:
      return "UNKNOWN";
  }
}

export interface Provider {
  pubKey: Uint8Array;
  service: number;
  metadataUri: string;
  metadataNonce: number;
  status: ProviderStatus;
  minContractDuration: number;
  maxContractDuration: number;
  subscriptionRate: Coin[];
  payAsYouGoRate: Coin[];
  bond: string;
  lastUpdate: number;
  settlementDuration: number;
}

export interface Contract {
  provider: Uint8Array;
  service: number;
  client: Uint8Array;
  delegate: Uint8Array;
  type: ContractType;
  height: number;
  duration: number;
  rate: Coin | undefined;
  deposit: string;
  paid: string;
  nonce: number;
  settlementHeight: number;
  id: number;
  settlementDuration: number;
  authorization: ContractAuthorization;
  queriesPerMinute: number;
}

export interface ContractSet {
  contractIds: number[];
}

export interface ContractExpirationSet {
  height: number;
  contractSet: ContractSet | undefined;
}

export interface UserContractSet {
  user: Uint8Array;
  contractSet: ContractSet | undefined;
}

const baseProvider: object = {
  service: 0,
  metadataUri: "",
  metadataNonce: 0,
  status: 0,
  minContractDuration: 0,
  maxContractDuration: 0,
  bond: "",
  lastUpdate: 0,
  settlementDuration: 0,
};

export const Provider = {
  encode(message: Provider, writer: Writer = Writer.create()): Writer {
    if (message.pubKey.length !== 0) {
      writer.uint32(10).bytes(message.pubKey);
    }
    if (message.service !== 0) {
      writer.uint32(16).int32(message.service);
    }
    if (message.metadataUri !== "") {
      writer.uint32(26).string(message.metadataUri);
    }
    if (message.metadataNonce !== 0) {
      writer.uint32(32).uint64(message.metadataNonce);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.minContractDuration !== 0) {
      writer.uint32(48).int64(message.minContractDuration);
    }
    if (message.maxContractDuration !== 0) {
      writer.uint32(56).int64(message.maxContractDuration);
    }
    for (const v of message.subscriptionRate) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.payAsYouGoRate) {
      Coin.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.bond !== "") {
      writer.uint32(82).string(message.bond);
    }
    if (message.lastUpdate !== 0) {
      writer.uint32(88).int64(message.lastUpdate);
    }
    if (message.settlementDuration !== 0) {
      writer.uint32(96).int64(message.settlementDuration);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Provider {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProvider } as Provider;
    message.subscriptionRate = [];
    message.payAsYouGoRate = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubKey = reader.bytes();
          break;
        case 2:
          message.service = reader.int32();
          break;
        case 3:
          message.metadataUri = reader.string();
          break;
        case 4:
          message.metadataNonce = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.minContractDuration = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.maxContractDuration = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.subscriptionRate.push(Coin.decode(reader, reader.uint32()));
          break;
        case 9:
          message.payAsYouGoRate.push(Coin.decode(reader, reader.uint32()));
          break;
        case 10:
          message.bond = reader.string();
          break;
        case 11:
          message.lastUpdate = longToNumber(reader.int64() as Long);
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

  fromJSON(object: any): Provider {
    const message = { ...baseProvider } as Provider;
    message.subscriptionRate = [];
    message.payAsYouGoRate = [];
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = bytesFromBase64(object.pubKey);
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = Number(object.service);
    } else {
      message.service = 0;
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
    if (object.lastUpdate !== undefined && object.lastUpdate !== null) {
      message.lastUpdate = Number(object.lastUpdate);
    } else {
      message.lastUpdate = 0;
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

  toJSON(message: Provider): unknown {
    const obj: any = {};
    message.pubKey !== undefined &&
      (obj.pubKey = base64FromBytes(
        message.pubKey !== undefined ? message.pubKey : new Uint8Array()
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
    message.lastUpdate !== undefined && (obj.lastUpdate = message.lastUpdate);
    message.settlementDuration !== undefined &&
      (obj.settlementDuration = message.settlementDuration);
    return obj;
  },

  fromPartial(object: DeepPartial<Provider>): Provider {
    const message = { ...baseProvider } as Provider;
    message.subscriptionRate = [];
    message.payAsYouGoRate = [];
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = object.pubKey;
    } else {
      message.pubKey = new Uint8Array();
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = 0;
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
    if (object.lastUpdate !== undefined && object.lastUpdate !== null) {
      message.lastUpdate = object.lastUpdate;
    } else {
      message.lastUpdate = 0;
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

const baseContract: object = {
  service: 0,
  type: 0,
  height: 0,
  duration: 0,
  deposit: "",
  paid: "",
  nonce: 0,
  settlementHeight: 0,
  id: 0,
  settlementDuration: 0,
  authorization: 0,
  queriesPerMinute: 0,
};

export const Contract = {
  encode(message: Contract, writer: Writer = Writer.create()): Writer {
    if (message.provider.length !== 0) {
      writer.uint32(10).bytes(message.provider);
    }
    if (message.service !== 0) {
      writer.uint32(16).int32(message.service);
    }
    if (message.client.length !== 0) {
      writer.uint32(26).bytes(message.client);
    }
    if (message.delegate.length !== 0) {
      writer.uint32(34).bytes(message.delegate);
    }
    if (message.type !== 0) {
      writer.uint32(40).int32(message.type);
    }
    if (message.height !== 0) {
      writer.uint32(48).int64(message.height);
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
    if (message.paid !== "") {
      writer.uint32(82).string(message.paid);
    }
    if (message.nonce !== 0) {
      writer.uint32(88).int64(message.nonce);
    }
    if (message.settlementHeight !== 0) {
      writer.uint32(96).int64(message.settlementHeight);
    }
    if (message.id !== 0) {
      writer.uint32(104).uint64(message.id);
    }
    if (message.settlementDuration !== 0) {
      writer.uint32(112).int64(message.settlementDuration);
    }
    if (message.authorization !== 0) {
      writer.uint32(120).int32(message.authorization);
    }
    if (message.queriesPerMinute !== 0) {
      writer.uint32(128).int64(message.queriesPerMinute);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Contract {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContract } as Contract;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider = reader.bytes();
          break;
        case 2:
          message.service = reader.int32();
          break;
        case 3:
          message.client = reader.bytes();
          break;
        case 4:
          message.delegate = reader.bytes();
          break;
        case 5:
          message.type = reader.int32() as any;
          break;
        case 6:
          message.height = longToNumber(reader.int64() as Long);
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
          message.paid = reader.string();
          break;
        case 11:
          message.nonce = longToNumber(reader.int64() as Long);
          break;
        case 12:
          message.settlementHeight = longToNumber(reader.int64() as Long);
          break;
        case 13:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 14:
          message.settlementDuration = longToNumber(reader.int64() as Long);
          break;
        case 15:
          message.authorization = reader.int32() as any;
          break;
        case 16:
          message.queriesPerMinute = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Contract {
    const message = { ...baseContract } as Contract;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = bytesFromBase64(object.provider);
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = Number(object.service);
    } else {
      message.service = 0;
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
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = String(object.deposit);
    } else {
      message.deposit = "";
    }
    if (object.paid !== undefined && object.paid !== null) {
      message.paid = String(object.paid);
    } else {
      message.paid = "";
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = Number(object.nonce);
    } else {
      message.nonce = 0;
    }
    if (
      object.settlementHeight !== undefined &&
      object.settlementHeight !== null
    ) {
      message.settlementHeight = Number(object.settlementHeight);
    } else {
      message.settlementHeight = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
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

  toJSON(message: Contract): unknown {
    const obj: any = {};
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
    message.type !== undefined && (obj.type = contractTypeToJSON(message.type));
    message.height !== undefined && (obj.height = message.height);
    message.duration !== undefined && (obj.duration = message.duration);
    message.rate !== undefined &&
      (obj.rate = message.rate ? Coin.toJSON(message.rate) : undefined);
    message.deposit !== undefined && (obj.deposit = message.deposit);
    message.paid !== undefined && (obj.paid = message.paid);
    message.nonce !== undefined && (obj.nonce = message.nonce);
    message.settlementHeight !== undefined &&
      (obj.settlementHeight = message.settlementHeight);
    message.id !== undefined && (obj.id = message.id);
    message.settlementDuration !== undefined &&
      (obj.settlementDuration = message.settlementDuration);
    message.authorization !== undefined &&
      (obj.authorization = contractAuthorizationToJSON(message.authorization));
    message.queriesPerMinute !== undefined &&
      (obj.queriesPerMinute = message.queriesPerMinute);
    return obj;
  },

  fromPartial(object: DeepPartial<Contract>): Contract {
    const message = { ...baseContract } as Contract;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = new Uint8Array();
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = 0;
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
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = object.deposit;
    } else {
      message.deposit = "";
    }
    if (object.paid !== undefined && object.paid !== null) {
      message.paid = object.paid;
    } else {
      message.paid = "";
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    } else {
      message.nonce = 0;
    }
    if (
      object.settlementHeight !== undefined &&
      object.settlementHeight !== null
    ) {
      message.settlementHeight = object.settlementHeight;
    } else {
      message.settlementHeight = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
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

const baseContractSet: object = { contractIds: 0 };

export const ContractSet = {
  encode(message: ContractSet, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork();
    for (const v of message.contractIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ContractSet {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContractSet } as ContractSet;
    message.contractIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.contractIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.contractIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractSet {
    const message = { ...baseContractSet } as ContractSet;
    message.contractIds = [];
    if (object.contractIds !== undefined && object.contractIds !== null) {
      for (const e of object.contractIds) {
        message.contractIds.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: ContractSet): unknown {
    const obj: any = {};
    if (message.contractIds) {
      obj.contractIds = message.contractIds.map((e) => e);
    } else {
      obj.contractIds = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ContractSet>): ContractSet {
    const message = { ...baseContractSet } as ContractSet;
    message.contractIds = [];
    if (object.contractIds !== undefined && object.contractIds !== null) {
      for (const e of object.contractIds) {
        message.contractIds.push(e);
      }
    }
    return message;
  },
};

const baseContractExpirationSet: object = { height: 0 };

export const ContractExpirationSet = {
  encode(
    message: ContractExpirationSet,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    if (message.contractSet !== undefined) {
      ContractSet.encode(
        message.contractSet,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ContractExpirationSet {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContractExpirationSet } as ContractExpirationSet;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.contractSet = ContractSet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractExpirationSet {
    const message = { ...baseContractExpirationSet } as ContractExpirationSet;
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = 0;
    }
    if (object.contractSet !== undefined && object.contractSet !== null) {
      message.contractSet = ContractSet.fromJSON(object.contractSet);
    } else {
      message.contractSet = undefined;
    }
    return message;
  },

  toJSON(message: ContractExpirationSet): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.contractSet !== undefined &&
      (obj.contractSet = message.contractSet
        ? ContractSet.toJSON(message.contractSet)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ContractExpirationSet>
  ): ContractExpirationSet {
    const message = { ...baseContractExpirationSet } as ContractExpirationSet;
    if (object.height !== undefined && object.height !== null) {
      message.height = object.height;
    } else {
      message.height = 0;
    }
    if (object.contractSet !== undefined && object.contractSet !== null) {
      message.contractSet = ContractSet.fromPartial(object.contractSet);
    } else {
      message.contractSet = undefined;
    }
    return message;
  },
};

const baseUserContractSet: object = {};

export const UserContractSet = {
  encode(message: UserContractSet, writer: Writer = Writer.create()): Writer {
    if (message.user.length !== 0) {
      writer.uint32(10).bytes(message.user);
    }
    if (message.contractSet !== undefined) {
      ContractSet.encode(
        message.contractSet,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UserContractSet {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUserContractSet } as UserContractSet;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.bytes();
          break;
        case 2:
          message.contractSet = ContractSet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserContractSet {
    const message = { ...baseUserContractSet } as UserContractSet;
    if (object.user !== undefined && object.user !== null) {
      message.user = bytesFromBase64(object.user);
    }
    if (object.contractSet !== undefined && object.contractSet !== null) {
      message.contractSet = ContractSet.fromJSON(object.contractSet);
    } else {
      message.contractSet = undefined;
    }
    return message;
  },

  toJSON(message: UserContractSet): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = base64FromBytes(
        message.user !== undefined ? message.user : new Uint8Array()
      ));
    message.contractSet !== undefined &&
      (obj.contractSet = message.contractSet
        ? ContractSet.toJSON(message.contractSet)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UserContractSet>): UserContractSet {
    const message = { ...baseUserContractSet } as UserContractSet;
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = new Uint8Array();
    }
    if (object.contractSet !== undefined && object.contractSet !== null) {
      message.contractSet = ContractSet.fromPartial(object.contractSet);
    } else {
      message.contractSet = undefined;
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
