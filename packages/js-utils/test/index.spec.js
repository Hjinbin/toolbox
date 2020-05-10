import { isNullValue } from '@/index'

test('is null value?', () => {
  expect(isNullValue(0)).toBeFalsy()
  expect(isNullValue({})).toBeFalsy()
  expect(isNullValue('')).toBeTruthy()
  expect(isNullValue('12')).toBeFalsy()
  expect(isNullValue(undefined)).toBeTruthy()
  expect(isNullValue(null)).toBeTruthy()
  expect(isNullValue(+'abc')).toBeTruthy()
})
