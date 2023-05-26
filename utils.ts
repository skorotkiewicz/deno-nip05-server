// deno-lint-ignore no-explicit-any
export const readJson = async (payload: any) => {
  const decoder = new TextDecoder();
  for await (const chunk of payload) {
    return JSON.parse(decoder.decode(chunk));
  }
};
