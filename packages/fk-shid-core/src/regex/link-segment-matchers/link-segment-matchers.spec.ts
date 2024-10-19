import { vendorLinkCanonicalRegex, CanonicalRegexVendors } from './index'

const matchingFixtureData = {
  amazon: [
    '/some-product-Descript-ME34-Large/dp/PR0DUC11D',
    '/Amazon-Basics-Microphone-Podcasting-Adjustable/dp/B0CL9BTQRF/ref=mp_s_a_1_1_ffob_sspa?_encoding=UTF8&content-id=amzn1.sym.0378fdb7-e424-421a-b6b3-645afbff7d23&dib=eyJ2IjoiMSJ9.0I1O7EzwmTa72X0nx5uRQ6m67kVagjdZzydtk0R5U6zv3_SjWXr4-U8gHvUwDxPXDrs5YJMkniQTrMPlCLjzDMGMsp_6JYn3cLhgqC-AqEYO6ZmEj_0Lg8GZix1chHL6gjjbMufBwTyKE42Erxicwblri8hAoNU_mRaBrsLHQAjvWvtp7K33nrVzJfc6KnyMaYdRGRTmO58WfX3FtyZP9Q.PbIa_4JnjCIurztpalxuLLVixQaKfIWpd3DeTjIvmyI&dib_tag=se&keywords=gaming&pd_rd_r=4cf8b72f-397d-4598-9dc1-77af59f8a0e3&pd_rd_w=Dh4s6&pd_rd_wg=REb4j&pf_rd_p=0378fdb7-e424-421a-b6b3-645afbff7d23&pf_rd_r=47JT9HTZB112RHWZV4Q2&qid=1727563432&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9waG9uZV9zZWFyY2hfYXRm&psc=1',
  ],
  facebook: [
    '/reel/878972984798472', // Reel
    '/groups/112233445566/permalink/112233445566', // Group post
  ],
  instagram: [
    '/p/postId-Djasd8934bn', // Post without username segment
    '/someInstaUser/p/postId-Djasd8934bn', // Post with username segment
    '/reel/postId-Djasd8934bn', // Reel
  ],
  youtube: ['/s0mEv1d30ID', '/shorts/s0mEv1d30ID'],
  youtubeShortener: ['/s0mEv1d30ID', '/shorts/s0mEv1d30ID'],
}

const queryOnly =
  '?arcu=nulla&sed=nisl&augue=nunc&aliquam=nisl&erat=duis&volutpat=bibendum'

const firstSegmentOnly = '/first-segment'

const firstSegmentWithQuery = `/first-segment${queryOnly}`

const nonMatchingFixtureData = {
  amazon: [queryOnly],
  facebook: [queryOnly],
  instagram: [queryOnly, firstSegmentOnly, firstSegmentWithQuery],
  youtube: [queryOnly],
  youtubeShortener: [queryOnly],
}

const testLinkCanonicalRegex = (
  regexQueries: RegExp[],
  matching: string[],
  nonMatching: string[]
) => {
  it('should match matching fixture data', () => {
    matching.forEach((link) => {
      const match = regexQueries.some((regex) => {
        return regex.test(link)
      })
      expect(match).toBe(true)
    })
  })

  it('should not match matching fixture data', () => {
    nonMatching.forEach((link) => {
      const match = regexQueries.some((regex) => regex.test(link))
      expect(match).toBe(false)
    })
  })
}

describe('Generated link canonical regex tests', () => {
  const vendorKeys = Object.keys(vendorLinkCanonicalRegex)
  vendorKeys.forEach((vendor) => {
    describe(vendor, () => {
      testLinkCanonicalRegex(
        vendorLinkCanonicalRegex[vendor as CanonicalRegexVendors],
        matchingFixtureData[vendor as CanonicalRegexVendors],
        nonMatchingFixtureData[vendor as CanonicalRegexVendors]
      )
    })
  })
})
