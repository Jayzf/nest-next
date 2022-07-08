import { isDefined } from '@shared/utils/common';

describe('utils', () => {
  describe('isDefined()', () => {
    it('input undefined, return false', () => {
      expect(isDefined(undefined)).toEqual(false);
    });

    it('input null, return false', () => {
      expect(isDefined(null)).toEqual(false);
    });

    it('input false, return true', () => {
      expect(isDefined(false)).toEqual(true);
    });

    it('input true, return true', () => {
      expect(isDefined(true)).toEqual(true);
    });

    it('input 0, return true', () => {
      expect(isDefined(0)).toEqual(true);
    });

    it('input "", return true', () => {
      expect(isDefined('')).toEqual(true);
    });

    it('input {}, return true', () => {
      expect(isDefined({})).toEqual(true);
    });

    it('input function, return true', () => {
      expect(isDefined(() => {})).toEqual(true);
    });
  });
});
