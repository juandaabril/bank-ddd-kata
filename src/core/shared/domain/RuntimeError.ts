export class RuntimeError extends Error {
    constructor (m?: string) {
        super (m);
        Object.setPrototypeOf (this, new.target.prototype);
    }
}
