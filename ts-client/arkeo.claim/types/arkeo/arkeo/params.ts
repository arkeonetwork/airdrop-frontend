// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: arkeo/arkeo/params.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "cosmjs-types/binary";

export const protobufPackage = "arkeo.arkeo";

/** Params defines the parameters for the module. */
export interface Params {
  blockPerYear: number;
  emissionCurve: number;
}

function createBaseParams(): Params {
  return { blockPerYear: 0, emissionCurve: 0 };
}

export const Params: MessageFns<Params> = {
  encode(message: Params, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.blockPerYear !== 0) {
      writer.uint32(64).uint64(message.blockPerYear);
    }
    if (message.emissionCurve !== 0) {
      writer.uint32(72).uint64(message.emissionCurve);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          if (tag !== 64) {
            break;
          }

          message.blockPerYear = longToNumber(reader.uint64());
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.emissionCurve = longToNumber(reader.uint64());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      blockPerYear: isSet(object.blockPerYear) ? globalThis.Number(object.blockPerYear) : 0,
      emissionCurve: isSet(object.emissionCurve) ? globalThis.Number(object.emissionCurve) : 0,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.blockPerYear !== 0) {
      obj.blockPerYear = Math.round(message.blockPerYear);
    }
    if (message.emissionCurve !== 0) {
      obj.emissionCurve = Math.round(message.emissionCurve);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.blockPerYear = object.blockPerYear ?? 0;
    message.emissionCurve = object.emissionCurve ?? 0;
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
