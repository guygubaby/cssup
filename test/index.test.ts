import { describe, expect, it } from 'vitest'
import { one } from '../src/index'

describe('start test', () => {
  it('should be one', () => {
    expect(one).toEqual(1)
  })
})
