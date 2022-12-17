export class RequestError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    // because we are extending a built-in class
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
