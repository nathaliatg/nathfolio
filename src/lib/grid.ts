export interface Placed {
  span: number;
  row: number;
  col: number;
}

/** Packs cards into rows that fill every column. */
export function layoutRows(spans: number[], cols: number): Placed[] {
  const out: Placed[] = spans.map((span) => ({ span, row: 0, col: 0 }));
  let i = 0;
  let row = 0;

  while (i < out.length) {
    const indices: number[] = [];
    let total = 0;

    while (i < out.length && total + out[i]!.span <= cols) {
      out[i]!.row = row;
      out[i]!.col = indices.length;
      total += out[i]!.span;
      indices.push(i);
      i++;
    }

    // card wider than a row: clamp it
    if (indices.length === 0) {
      out[i]!.span = cols;
      out[i]!.row = row;
      out[i]!.col = 0;
      total = cols;
      indices.push(i);
      i++;
    }

    // spread leftover columns
    let rest = cols - total;
    let k = 0;
    while (rest > 0) {
      out[indices[k % indices.length]!]!.span += 1;
      rest--;
      k++;
    }

    row++;
  }

  return out;
}
