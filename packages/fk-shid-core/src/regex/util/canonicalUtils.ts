/**
 * Get a regex pattern to match the first N number of segments in a URL pathname
 * @param segments Number of segments that should be matched
 * @returns A matching Regex pattern
 * @example <caption>To match `/one/two/three`</caption>
 // Returns /^((?:\/[^/]+){3})$/
 * firstNSegments(3)
 */
export const numberOfSegments = (
  segments: number,
  start = true,
  end = true
) => {
  const pattern = [
    start ? '^' : '',
    `((?:\/[^\/]+){${segments}})`,
    end ? '$' : '',
  ]
  return new RegExp(pattern.join(''))
}

/**
 * Get a regex pattern to match an exact path value and the segment after it
 * @param segmentValue Segment literal value
 * @param start Match only from the start of the path
 * @returns A matching regex pattern.
 * @example <caption>To match `/post/somePostId42342` from the start of the path</caption>
 // Returns /^\/post\/([^/?]+)/
 * pathAfterSegmentValue('post') 
 */
export const pathAfterSegmentValue = (
  segmentValue: string,
  start = true,
  end = true
) => {
  const pattern = [
    start ? '^' : '',
    `\/${segmentValue}\/([^/?]+)`,
    end ? '$' : '',
  ]
  return new RegExp(pattern.join(''))
}

numberOfSegments(3)
