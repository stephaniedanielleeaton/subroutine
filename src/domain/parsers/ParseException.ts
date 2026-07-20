export interface ParseError {
  line: number;
  message: string;
}

export class ParseException extends Error {
  public readonly errors: ParseError[];

  constructor(errors: ParseError[]) {
    super(errors.map((error) => `Line ${error.line}: ${error.message}`).join('\n'));

    this.name = 'ParseException';
    this.errors = errors;

    Object.setPrototypeOf(this, ParseException.prototype);
  }
}
