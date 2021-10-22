export default class HttpError extends Error {
  constructor(message, status, ok) {
    super(message);
    this.status = status;
    this.ok = ok;
  }
}