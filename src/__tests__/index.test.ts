import { expandMultiplyShorthand } from "../index"
import parseFile from "../parseFile"

const parsedFile = parseFile('./patterns/basic-ball.txt')

describe('expandMultiplyShorthand', () => {
  it('should match the expected output', () => {
    const expanded = expandMultiplyShorthand(parsedFile)
    const expected = [
      {
        stepNumber: 1,
        endCount: 6,
        instructions: '6sc in magic circle',
        expandedInstructions: []
      },
      {
        stepNumber: 2,
        endCount: 12,
        instructions: '(inc)x6',
        expandedInstructions: ['inc', 'inc', 'inc', 'inc', 'inc', 'inc']
      },
      {
        stepNumber: 3,
        endCount: 18,
        instructions: '(sc, inc)x6',
        expandedInstructions: [
          'sc', 'inc', 'sc',
          'inc', 'sc', 'inc',
          'sc', 'inc', 'sc',
          'inc', 'sc', 'inc'
        ]
      },
      {
        stepNumber: 4,
        endCount: 24,
        instructions: 'sc, inc, (2sc, inc)x5, sc',
        expandedInstructions: [
          'sc', 'inc', 'sc', 'sc',
          'inc', 'sc', 'sc', 'inc',
          'sc', 'sc', 'inc', 'sc',
          'sc', 'inc', 'sc', 'sc',
          'inc', 'sc'
        ]
      },
      {
        stepNumber: 5,
        endCount: 30,
        instructions: '(3sc, inc)x6',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'inc',
          'sc', 'sc', 'sc', 'inc',
          'sc', 'sc', 'sc', 'inc',
          'sc', 'sc', 'sc', 'inc',
          'sc', 'sc', 'sc', 'inc',
          'sc', 'sc', 'sc', 'inc'
        ]
      },
      {
        stepNumber: 6,
        endCount: 30,
        instructions: '(sc)x30',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc'
        ]
      },
      {
        stepNumber: 7,
        endCount: 30,
        instructions: '(sc)x30',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc'
        ]
      },
      {
        stepNumber: 8,
        endCount: 36,
        instructions: '2sc, inc, (4sc, inc)x5, 2sc',
        expandedInstructions: [
          'sc', 'sc', 'inc', 'sc', 'sc',
          'sc', 'sc', 'inc', 'sc', 'sc',
          'sc', 'sc', 'inc', 'sc', 'sc',
          'sc', 'sc', 'inc', 'sc', 'sc',
          'sc', 'sc', 'inc', 'sc', 'sc',
          'sc', 'sc', 'inc', 'sc', 'sc'
        ]
      },
      {
        stepNumber: 9,
        endCount: 36,
        instructions: '(sc)x36',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc'
        ]
      },
      {
        stepNumber: 10,
        endCount: 36,
        instructions: '(sc)x36',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc'
        ]
      },
      {
        stepNumber: 11,
        endCount: 36,
        instructions: '(sc)x36',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc'
        ]
      },
      {
        stepNumber: 12,
        endCount: 30,
        instructions: '2sc, dec, (4sc, dec)x5, 2sc',
        expandedInstructions: [
          'sc', 'sc', 'dec', 'sc', 'sc',
          'sc', 'sc', 'dec', 'sc', 'sc',
          'sc', 'sc', 'dec', 'sc', 'sc',
          'sc', 'sc', 'dec', 'sc', 'sc',
          'sc', 'sc', 'dec', 'sc', 'sc',
          'sc', 'sc', 'dec', 'sc', 'sc'
        ]
      },
      {
        stepNumber: 13,
        endCount: 30,
        instructions: '(sc)x30',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc'
        ]
      },
      {
        stepNumber: 14,
        endCount: 30,
        instructions: '(sc)x30',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc',
          'sc', 'sc', 'sc', 'sc', 'sc'
        ]
      },
      {
        stepNumber: 15,
        endCount: 24,
        instructions: '(3sc, dec)x6',
        expandedInstructions: [
          'sc', 'sc', 'sc', 'dec',
          'sc', 'sc', 'sc', 'dec',
          'sc', 'sc', 'sc', 'dec',
          'sc', 'sc', 'sc', 'dec',
          'sc', 'sc', 'sc', 'dec',
          'sc', 'sc', 'sc', 'dec'
        ]
      },
      {
        stepNumber: 16,
        endCount: 18,
        instructions: 'sc, dec, (2sc, dec)x5, sc',
        expandedInstructions: [
          'sc', 'dec', 'sc', 'sc',
          'dec', 'sc', 'sc', 'dec',
          'sc', 'sc', 'dec', 'sc',
          'sc', 'dec', 'sc', 'sc',
          'dec', 'sc'
        ]
      },
      {
        stepNumber: 17,
        endCount: 12,
        instructions: '(sc, dec)x6',
        expandedInstructions: [
          'sc', 'dec', 'sc',
          'dec', 'sc', 'dec',
          'sc', 'dec', 'sc',
          'dec', 'sc', 'dec'
        ]
      }
    ]

    expect(expanded.steps).toMatchObject(expected)
  })
})