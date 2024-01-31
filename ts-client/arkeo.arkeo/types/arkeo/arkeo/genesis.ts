/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Params } from "../../arkeo/arkeo/params";
import {
  Provider,
  Contract,
  ContractExpirationSet,
  UserContractSet,
} from "../../arkeo/arkeo/keeper";

export const protobufPackage = "arkeo.arkeo";

/** GenesisState defines the arkeo module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  providers: Provider[];
  contracts: Contract[];
  nextContractId: number;
  contractExpirationSets: ContractExpirationSet[];
  userContractSets: UserContractSet[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  version: number;
}

const baseGenesisState: object = { nextContractId: 0, version: 0 };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.providers) {
      Provider.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.nextContractId !== 0) {
      writer.uint32(32).uint64(message.nextContractId);
    }
    for (const v of message.contractExpirationSets) {
      ContractExpirationSet.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.userContractSets) {
      UserContractSet.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.version !== 0) {
      writer.uint32(56).int64(message.version);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.providers = [];
    message.contracts = [];
    message.contractExpirationSets = [];
    message.userContractSets = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.providers.push(Provider.decode(reader, reader.uint32()));
          break;
        case 3:
          message.contracts.push(Contract.decode(reader, reader.uint32()));
          break;
        case 4:
          message.nextContractId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.contractExpirationSets.push(
            ContractExpirationSet.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.userContractSets.push(
            UserContractSet.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.version = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.providers = [];
    message.contracts = [];
    message.contractExpirationSets = [];
    message.userContractSets = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.providers !== undefined && object.providers !== null) {
      for (const e of object.providers) {
        message.providers.push(Provider.fromJSON(e));
      }
    }
    if (object.contracts !== undefined && object.contracts !== null) {
      for (const e of object.contracts) {
        message.contracts.push(Contract.fromJSON(e));
      }
    }
    if (object.nextContractId !== undefined && object.nextContractId !== null) {
      message.nextContractId = Number(object.nextContractId);
    } else {
      message.nextContractId = 0;
    }
    if (
      object.contractExpirationSets !== undefined &&
      object.contractExpirationSets !== null
    ) {
      for (const e of object.contractExpirationSets) {
        message.contractExpirationSets.push(ContractExpirationSet.fromJSON(e));
      }
    }
    if (
      object.userContractSets !== undefined &&
      object.userContractSets !== null
    ) {
      for (const e of object.userContractSets) {
        message.userContractSets.push(UserContractSet.fromJSON(e));
      }
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version);
    } else {
      message.version = 0;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.providers) {
      obj.providers = message.providers.map((e) =>
        e ? Provider.toJSON(e) : undefined
      );
    } else {
      obj.providers = [];
    }
    if (message.contracts) {
      obj.contracts = message.contracts.map((e) =>
        e ? Contract.toJSON(e) : undefined
      );
    } else {
      obj.contracts = [];
    }
    message.nextContractId !== undefined &&
      (obj.nextContractId = message.nextContractId);
    if (message.contractExpirationSets) {
      obj.contractExpirationSets = message.contractExpirationSets.map((e) =>
        e ? ContractExpirationSet.toJSON(e) : undefined
      );
    } else {
      obj.contractExpirationSets = [];
    }
    if (message.userContractSets) {
      obj.userContractSets = message.userContractSets.map((e) =>
        e ? UserContractSet.toJSON(e) : undefined
      );
    } else {
      obj.userContractSets = [];
    }
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.providers = [];
    message.contracts = [];
    message.contractExpirationSets = [];
    message.userContractSets = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.providers !== undefined && object.providers !== null) {
      for (const e of object.providers) {
        message.providers.push(Provider.fromPartial(e));
      }
    }
    if (object.contracts !== undefined && object.contracts !== null) {
      for (const e of object.contracts) {
        message.contracts.push(Contract.fromPartial(e));
      }
    }
    if (object.nextContractId !== undefined && object.nextContractId !== null) {
      message.nextContractId = object.nextContractId;
    } else {
      message.nextContractId = 0;
    }
    if (
      object.contractExpirationSets !== undefined &&
      object.contractExpirationSets !== null
    ) {
      for (const e of object.contractExpirationSets) {
        message.contractExpirationSets.push(
          ContractExpirationSet.fromPartial(e)
        );
      }
    }
    if (
      object.userContractSets !== undefined &&
      object.userContractSets !== null
    ) {
      for (const e of object.userContractSets) {
        message.userContractSets.push(UserContractSet.fromPartial(e));
      }
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = 0;
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
