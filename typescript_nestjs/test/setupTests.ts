// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import {ValueObject} from "../src/core/shared/domain/ValueObject";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toBeEquals<V>(expected:ValueObject<V>): CustomMatcherResult
        }
    }
}

expect.extend({
    toBeEquals<V>(received: ValueObject<V>, expected: ValueObject<V>): jest.CustomMatcherResult {
        const pass = received.equals(expected);
        const message: () => string = () => pass ? "" : `received (${received.toString()}) is not the same as expected (${expected.toString()})`;

        return {
            message,
            pass,
        };
    }
});

