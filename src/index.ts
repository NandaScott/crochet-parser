import parseFile, { NormalizedTokens } from './parseFile';

interface ExpandedStep extends Pick<NormalizedTokens, 'title' | 'fastenOff'> {
  steps: Array<{ stepNumber: number, endCount: number, instructions: string, expandedInstructions: string[] }>
}

function expandMultiplyShorthand(file: NormalizedTokens): ExpandedStep {
  const { steps } = file;
  const expandedSteps = steps.map(({ instructions, stepNumber, endCount }) => {
    if (stepNumber === 1) {
      return {
        stepNumber,
        endCount,
        instructions,
        expandedInstructions: []
      }
    }

    const [blockRepeat, blockMultiplier] = instructions.match(/(\(.*\)x\d+)/g)?.[0].split('x') ?? [];
    const blockRepeatClean = blockRepeat.replace('(', '').replace(')', '');

    const expanded = new Array<string>(parseInt(blockMultiplier)) // creates array of length equal to the multiplier
      .fill(blockRepeatClean) // fills the array with the block of repeated instructions
      .map((val) => val.split(', ')) // splits each instruction into a single instruction, if applicable
      .reduce((prev, curr) => [...prev, ...curr], []) // flattens into a single array

    const insertExpandedIntoInstructions = instructions
      .replace(/(\(.*\)x\d+)/g, expanded.join(', '))
      .split(', ')
      // This block handles the smaller notation for stitch repeats
      .map<string[]>((token) => {
        const foo = token.split(/([\d]+|[A-Za-z]+)/g).filter(token => token.length > 0);

        if (foo.length === 1) {
          foo.unshift('1')
        }

        const [miniMutliplier, miniRepeat] = foo;
        const bar = new Array(parseInt(miniMutliplier)).fill(miniRepeat)
        return bar
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

console.log(expanded.steps)