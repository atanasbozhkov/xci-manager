import { HactoolRunner } from '../../src/hactool-runner/hactool-runner';

describe('GIVEN a hactool-runner', () => {
    it('SHOULD be defined', () => {
        expect(HactoolRunner).toBeDefined();
    });

    it('SHOULD instantiate successfully', () => {
        const runner = new HactoolRunner('testKeyfile');
        expect(runner).toBeDefined();
    });
});