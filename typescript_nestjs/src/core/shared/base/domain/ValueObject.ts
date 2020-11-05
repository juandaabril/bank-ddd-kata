export interface ValueObject {
    equals(object: Object): boolean;
    toString(): string;
}