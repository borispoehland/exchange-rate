export class DigestError extends Error {
  digest: object;

  constructor(message: string, digest: object) {
    super(message);
    this.digest = digest;
    this.name = "DigestError";
  }
}
