// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: arkeo/arkeo/genesis.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "cosmjs-types/binary";
import { Contract, ContractExpirationSet, Provider, UserContractSet } from "./keeper";
import { Params } from "./params";

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

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    providers: [],
    contracts: [],
    nextContractId: 0,
    contractExpirationSets: [],
    userContractSets: [],
    version: 0,
  };
}

export const GenesisState: MessageFns<GenesisState> = {
  encode(message: GenesisState, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).join();
    }
    for (const v of message.providers) {
      Provider.encode(v!, writer.uint32(18).fork()).join();
    }
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(26).fork()).join();
    }
    if (message.nextContractId !== 0) {
      writer.uint32(32).uint64(message.nextContractId);
    }
    for (const v of message.contractExpirationSets) {
      ContractExpirationSet.encode(v!, writer.uint32(42).fork()).join();
    }
    for (const v of message.userContractSets) {
      UserContractSet.encode(v!, writer.uint32(50).fork()).join();
    }
    if (message.version !== 0) {
      writer.uint32(56).int64(message.version);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.providers.push(Provider.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contracts.push(Contract.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.nextContractId = longToNumber(reader.uint64());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.contractExpirationSets.push(ContractExpirationSet.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.userContractSets.push(UserContractSet.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.version = longToNumber(reader.int64());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      providers: globalThis.Array.isArray(object?.providers)
        ? object.providers.map((e: any) => Provider.fromJSON(e))
        : [],
      contracts: globalThis.Array.isArray(object?.contracts)
        ? object.contracts.map((e: any) => Contract.fromJSON(e))
        : [],
      nextContractId: isSet(object.nextContractId) ? globalThis.Number(object.nextContractId) : 0,
      contractExpirationSets: globalThis.Array.isArray(object?.contractExpirationSets)
        ? object.contractExpirationSets.map((e: any) => ContractExpirationSet.fromJSON(e))
        : [],
      userContractSets: globalThis.Array.isArray(object?.userContractSets)
        ? object.userContractSets.map((e: any) => UserContractSet.fromJSON(e))
        : [],
      version: isSet(object.version) ? globalThis.Number(object.version) : 0,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.providers?.length) {
      obj.providers = message.providers.map((e) => Provider.toJSON(e));
    }
    if (message.contracts?.length) {
      obj.contracts = message.contracts.map((e) => Contract.toJSON(e));
    }
    if (message.nextContractId !== 0) {
      obj.nextContractId = Math.round(message.nextContractId);
    }
    if (message.contractExpirationSets?.length) {
      obj.contractExpirationSets = message.contractExpirationSets.map((e) => ContractExpirationSet.toJSON(e));
    }
    if (message.userContractSets?.length) {
      obj.userContractSets = message.userContractSets.map((e) => UserContractSet.toJSON(e));
    }
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.providers = object.providers?.map((e) => Provider.fromPartial(e)) || [];
    message.contracts = object.contracts?.map((e) => Contract.fromPartial(e)) || [];
    message.nextContractId = object.nextContractId ?? 0;
    message.contractExpirationSets = object.contractExpirationSets?.map((e) => ContractExpirationSet.fromPartial(e)) ||
      [];
    message.userContractSets = object.userContractSets?.map((e) => UserContractSet.fromPartial(e)) || [];
    message.version = object.version ?? 0;
    return message;
  },
};

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
