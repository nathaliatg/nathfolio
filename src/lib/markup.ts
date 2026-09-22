/** `**text**` to <strong> (trusted content only). */
export function bold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
