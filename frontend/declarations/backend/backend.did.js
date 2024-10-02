export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getBoard' : IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Opt(IDL.Bool)))], ['query']),
    'getCurrentPlayer' : IDL.Func([], [IDL.Bool], ['query']),
    'isGameOver' : IDL.Func([], [IDL.Bool], ['query']),
    'makeMove' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
    'resetGame' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
