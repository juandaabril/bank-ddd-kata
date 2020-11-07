// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import { ValueObject } from '@app/core/shared/base/domain/ValueObject';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toBeEquals(expected: ValueObject): CustomMatcherResult;
        }
    }
}

expect.extend({
    toBeEquals(
        received: ValueObject,
        expected: ValueObject,
    ): jest.CustomMatcherResult {
        const pass = received.equals(expected);
        const message: () => string = () =>
            pass
                ? ''
                : `received (${received.toString()}) is not the same as expected (${expected.toString()})`;

        return {
            message,
            pass,
        };
    },
});
