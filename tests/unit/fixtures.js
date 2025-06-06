import { test as ctBase, expect } from '@playwright/experimental-ct-vue'
import { addCoverageReport } from 'monocart-reporter'

const test = ctBase.extend({
  autoTestFixture: [async ({ page }, use) => {
    if (test.info().project.name === 'chromium') {
      await Promise.all([
        page.coverage.startJSCoverage({ resetOnNavigation: false }),
        page.coverage.startCSSCoverage({ resetOnNavigation: false })
      ])
    }

    await use('autoTestFixture')

    if (test.info().project.name === 'chromium') {
      const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage()
      ])
      const coverageList = [...jsCoverage, ...cssCoverage]
      await addCoverageReport(coverageList, test.info())
    }
  }, {
    scope: 'test',
    auto: true
  }]
})

export { test, expect }