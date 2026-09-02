'use client'

/**
 * Decorative globe artwork exported from the approved Global Coverage Figma node.
 * Region selection remains available through the adjacent accessible controls.
 */
export function CoverageGlobe() {
  return (
    <div className="coverage-globe-canvas" aria-hidden="true">
      <img src="/images/coverage-globe-figma.webp" alt="" className="coverage-globe-art" />
    </div>
  )
}
