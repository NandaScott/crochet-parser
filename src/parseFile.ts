import fs from 'node:fs';

function readFile(path: string): string[] {
  try {
    const file = fs.readFileSync(path, 'utf-8')
      .split('\n')
      .filter((line) => line.length > 0);
    return file
  } catch (e) {
    console.error(`Error reading file: ${e}`)
    return []
  }
}

export interface TokenizedFile {
  title: string;
  fastenOff: string;
  steps: Array<{ stepNumber: string, endCount: string, instructions: string }>;
}

function tokenizeFile(file: string[]): TokenizedFile {
  const title = file.shift()
  if (title === undefined) throw new Error('Error finding title')

  const fastenOff = file.pop()
  if (fastenOff === undefined) throw new Error('Error finding fastenOff')

  const steps = file.map((line) => {
    const stepNumber = line.match(/[\d.]+/g)?.[0]
    if (stepNumber === undefined) throw new Error('Could not parse step numbers');

    const endCount = line.match(/\[\d+\]/g)?.[0]
    if (endCount === undefined) throw new Error('Count not parse end count')

    const instructions = line
      .replace(stepNumber ?? '', '')
      .replace(endCount ?? '', '')
      .trim()

    return {
      stepNumber,
      endCount,
      instructions,
    }
  })

  return {
    title,
    fastenOff,
    steps
  }
}

export interface NormalizedTokens extends Pick<TokenizedFile, 'title' | 'fastenOff'> {
  steps: Array<{ stepNumber: number, endCount: number, instructions: string }>
}

function normalizeTokens(tokens: TokenizedFile): NormalizedTokens {
  const { title, fastenOff, steps: tokenSteps } = tokens;
  const steps = tokenSteps.map(({ stepNumber, endCount, instructions }) => ({
    stepNumber: parseInt(stepNumber.replace('.', '')),
    endCount: parseInt(endCount.replace('[', '').replace(']', '')),
    instructions,
  }))

  return {
    title,
    fastenOff,
    steps,
  }
}

export default function parseFile(path: string) {
  const fileLines = readFile(path)
  const tokens = tokenizeFile(fileLines);
  const normalizedTokens = normalizeTokens(tokens);

  return normalizedTokens;
}