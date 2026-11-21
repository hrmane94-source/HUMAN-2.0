import React, { useState, useEffect } from 'react'
import { ArrowRight, X, Menu } from 'lucide-react'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Evolution', href: '#evolution' },
  { label: 'Augmentation', href: '#augmentation' },
  { label: 'Future', href: '#future' },
]

interface HeroNavProps {
  navRef: React.RefObject<HTMLElement | null>
}

export const HeroNav: React.FC<HeroNavProps> = ({ navRef }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        aria-label="Primary navigation"
        data-cursor="nav"
      >
        {/* Subtle glass backdrop */}
        <div className="absolute inset-0 bg-[#080808]/75 backdrop-blur-md border-b border-[#F2F0EA]/[0.04]" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">

          {/* Wordmark */}
          <a
            href="#hero"
            onClick={handleNavClick}
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63936]/60"
            aria-label="HUMAN 2.0 — return to top"
          >
            {/* Signal red glyph mark */}
            <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
              <span className="absolute h-full w-full border border-[#E63936]/50 transition-colors duration-300 group-hover:border-[#E63936]/90" />
              <span className="h-2 w-2 bg-[#E63936] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="font-mono text-[13px] font-semibold tracking-[0.3em] text-[#F2F0EA] uppercase">
              HUMAN 2.0
            </span>
          </a>

          {/* Center links — desktop */}
          <ul className="hidden items-center gap-10 md:flex" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative font-mono text-[11px] tracking-[0.22em] text-[#9a9890] uppercase transition-colors duration-300 hover:text-[#F2F0EA] focus-visible:outline-none focus-visible:text-[#F2F0EA]"
                >
                  {item.label}
                  {/* Underline slide indicator */}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#E63936] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="hidden font-mono text-[10px] tracking-[0.18em] text-[#E63936]/60 lg:block" aria-hidden="true">
              SYS://001
            </span>

            {/* Explore CTA */}
            <a
              href="#evolution"
              className="group hidden sm:flex items-center gap-2.5 border border-[#F2F0EA]/15 bg-[#F2F0EA]/[0.02] px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-[#F2F0EA]/70 uppercase transition-all duration-300 hover:border-[#E63936]/60 hover:text-[#F2F0EA] hover:bg-[#E63936]/10 focus-visible:border-[#E63936]/70 focus-visible:outline-none focus-visible:text-[#F2F0EA]"
              data-cursor="cta"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E63936] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              Explore
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded border border-[#F2F0EA]/15 text-[#F2F0EA] md:hidden transition-colors hover:border-[#E63936]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63936]/60"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 text-[#E63936]" />
              ) : (
                <Menu className="h-4 w-4 text-[#F2F0EA]/80" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 flex flex-col bg-[#080808]/95 px-6 pt-24 pb-8 backdrop-blur-xl md:hidden transition-all duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col gap-6 pt-4 border-t border-[#F2F0EA]/10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="font-mono text-base tracking-[0.25em] text-[#9a9890] uppercase transition-colors hover:text-[#F2F0EA] py-2 border-b border-[#F2F0EA]/5"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#evolution"
              onClick={handleNavClick}
              className="mt-4 flex items-center justify-between border border-[#E63936] bg-[#E63936]/15 px-5 py-3.5 font-mono text-xs tracking-[0.25em] text-[#F2F0EA] uppercase"
            >
              <span>Explore the Evolution</span>
              <ArrowRight className="h-4 w-4 text-[#E63936]" />
            </a>

            <div className="mt-auto pt-6 border-t border-[#F2F0EA]/5 flex items-center justify-between font-mono text-[10px] text-[#5a5856]">
              <span>HUMAN 2.0 // ARCHITECTURE</span>
              <span className="text-[#E63936]/70">SYS://001 • ACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
