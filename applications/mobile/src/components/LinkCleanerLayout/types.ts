export type TProcessedLink =
  | {
      link: null
      error: string
    }
  | {
      link: URL
      error: null
    }
