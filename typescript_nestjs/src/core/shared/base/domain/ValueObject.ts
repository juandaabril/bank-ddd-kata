export interface ValueObject {
    equals(object: any): boolean;
    toString(): string;
}
