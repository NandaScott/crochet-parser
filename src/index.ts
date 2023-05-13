import parseFile, { NormalizedTokens } from './parseFile';

/**
 * Transforms a multiplier and a value into an array with that many elements.
 * 
 * @param multiplier The number to multiply by
 * @param fill The value the array should be filled with
 * @returns An array with as many items as specified by the multiplier
 */
function multiplyIntoArray<T>(multiplier: number, fill: T): Array<T> {
  return new Array<T>(multiplier).fill(fill)
}

interface ExpandedStep extends Pick<NormalizedTokens, 'title' | 'fastenOff'> {
  steps: Array<{ stepNumber: number, endCount: number, instructions: string, expandedInstructions: string[] }>
}

/**
 * This function takes the normalized file and parses the written instructions into expanded instructions.
 * (e.g.) sc, dec, (2sc, dec)x5, sc
 * 
 * turns into
 * 
 * [
      'sc',  'dec', 'sc',  'sc',
      'dec', 'sc',  'sc',  'dec',
      'sc',  'sc',  'dec', 'sc',
      'sc',  'dec', 'sc',  'sc',
      'dec', 'sc'
    ]
 * 
 * Given the complexity of the file below, the comments should be read with the
 * following instruction for context: sc, dec, (2sc, dec)x5, sc
 * 
 * @param file A parsed file with normalized tokens
 * @returns A parsed file with the expanded steps added
 */
export function expandMultiplyShorthand(file: NormalizedTokens): ExpandedStep {
  const { steps } = file;
  const expandedSteps = steps.map(({ instructions, stepNumber, endCount }) => {
    // Since almost all patterns start with a few single crochets in a magic ring,
    // we can skip the first instruction.
    if (stepNumber === 1) {
      return {
        stepNumber,
        endCount,
        instructions,
        expandedInstructions: []
      }
    }

    const matchBlockMultiplier = new RegExp(/(\(.*\)x\d+)/, 'g'); // matches text like (2sc, dec)x5
    const matchParenthesis = new RegExp(/[\(\)]+/, 'g') // '(2sc, dec)' => '2sc, dec'
    const matchShorthand = new RegExp(/([\d]+|[A-Za-z]+)/, 'g') // matches 2sc into ['2', 'sc']

    // First we need to get the block multiply instructions and expand that e.g. (2sc, dec)x5
    const [blockRepeat, blockMultiplier] = instructions
      .match(matchBlockMultiplier)
      ?.[0] // returns the match element
      .split('x') ?? [] // split the matched string into ['(2sc, dec)', '5']; coalecse into an array for destructuring

    if (!blockRepeat || !blockMultiplier)
      throw new Error(`Something went wrong when getting blockRepeat (${blockRepeat}), and blockMultiplier (${blockMultiplier})`)

    const blockRepeatClean = blockRepeat.replace(matchParenthesis, '');

    // creates array of length equal to the multiplier (e.g. 5)
    // fills the array with the block of repeated instructions (e.g. '2sc, dec')
    const expanded = multiplyIntoArray(parseInt(blockMultiplier), blockRepeatClean)
      .map((val) => val.split(', ')) // splits each instruction into a single instruction, if applicable (e.g. ['2sc', 'dec'])
      .reduce((prev, curr) => [...prev, ...curr], []) // flattens into a single array

    // We can now take our expanded value and insert it into our instruction string.
    const insertExpandedIntoInstructions = instructions
      .replace(matchBlockMultiplier, expanded.join(', '))
      .split(', ') // split the whole line into tokens
      // This block handles the smaller notation for stitch repeats. (e.g. 2sc)
      .map((token) => {
        const expandedShorthand = token
          .split(matchShorthand) // splits 2sc into ['2', 'sc']
          .filter(token => token.length > 0); // Cleans up empty string from the splitting

        // handles a case where there isn't a number for the stitch, so we just add '1' for data consistency.
        if (expandedShorthand.length === 1) {
          expandedShorthand.unshift('1')
        }

        const [miniMutliplier, miniRepeat] = expandedShorthand;
        return multiplyIntoArray(parseInt(miniMutliplier), miniRepeat) // effectively multiplies our stitch by the appropriate amount.
      })
      .reduce((prev, curr) => [...prev, ...curr], []) // flattens into a single array

    return {
      stepNumber,
      endCount,
      instructions,
      expandedInstructions: insertExpandedIntoInstructions
    }
  })

  return {
    ...file,
    steps: expandedSteps
  }
}

const parsedFile = parseFile('./patterns/basic-ball.txt')
const expanded = expandMultiplyShorthand(parsedFile)
