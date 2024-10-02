import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getBoard' : ActorMethod<[], Array<Array<[] | [boolean]>>>,
  'getCurrentPlayer' : ActorMethod<[], boolean>,
  'isGameOver' : ActorMethod<[], boolean>,
  'makeMove' : ActorMethod<[bigint, bigint], boolean>,
  'resetGame' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
