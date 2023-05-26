// deno-lint-ignore no-explicit-any
export const readJson = async (payload: any) => {
  const decoder = new TextDecoder();
  for await (const chunk of payload) {
    return JSON.parse(decoder.decode(chunk));
  }
};

export const isValidName = (name: string) => {
  const format = /^[0-9a-z-_\.]{1,64}$/g;
  return format.test(name);
};

export const isValidPubkey = (pubkey: string) => {
  const format = /^[0-9a-f]{1,64}$/g;
  return format.test(pubkey);
};
