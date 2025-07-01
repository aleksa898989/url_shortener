const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const base = characters.length;

export function encodeBase62(num: number): string {
  if (num === 0) return characters[0];

  let result = "";

  while (num > 0) {
    result = characters[num % base] + result;
    num = Math.floor(num / base);
  }

  return result;
}

export function decodeBase62(str: string): number {
  return [...str].reduce(
    (acc, char) => acc * base + characters.indexOf(char),
    0
  );
}
