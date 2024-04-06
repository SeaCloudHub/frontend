export function getFirstCharacters(input: string): string {
  const words = input.split(' ');
  let result = '';

  for (const word of words) {
    if (word.length > 0) {
      result += word[0].toUpperCase();
    }
  }
  return result;
}
