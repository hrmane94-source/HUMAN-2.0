import React, { useState, useEffect } from 'react'
import { Menu, X, Box, ExternalLink } from 'lucide-react'

interface ResearchNavProps {
  onOpenResearch?: () => void
  isOperational?: boolean
}

export const ResearchNav: React.FC<ResearchNavProps> = ({
  onOpenResearch,
  isOperational = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: '01 // SPECIMEN', href: '#specimen' },
    { label: '02 // EVOLUTION', href: '#evolution' },
    { label: '03 // AUGMENTATION', href: '#augmentation' },
    { label: '04 // FUTURE', href: '#future' },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        aria-label="Research Facility Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isOperational ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        } ${
          isScrolled
            ? 'bg-[#F4F5F2]/90 backdrop-blur-md border-b border-[#15191D]/10 shadow-[0_4px_24px_rgba(21,25,29,0.06)]'
            : 'bg-[#F4F5F2]/60 backdrop-blur-sm border-b border-[#15191D]/05'
        }`}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          {/* Brand Identity */}
          <a
            href="#specimen"
            onClick={handleLinkClick}
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#15191D] transition-opacity hover:opacity-90"
          >
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-[1px] bg-[#315BFF] transition-transform group-hover:scale-125" />
            <span className="font-sans font-black tracking-tight text-sm text-[#15191D]">
              HUMAN 2.0
            </span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.3em] text-[#555C63] border-l border-[#15191D]/15 pl-3">
              RESEARCH DIVISION
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 font-mono text-[10px] tracking-[0.25em] text-[#555C63]">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#15191D] hover:border-b-2 border-[#315BFF] pb-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3 font-mono text-[9px]">
            {/* Techfest Badge */}
            <a
              href="#techfest"
              className="flex items-center gap-1.5 rounded border border-[#315BFF]/30 bg-[#315BFF]/10 px-2.5 py-1 text-[#315BFF] font-semibold transition-colors hover:bg-[#315BFF] hover:text-white"
            >
              <span>TECHFEST 2025</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>

            {/* 3D Model Modal Trigger */}
            {onOpenResearch && (
              <button
                onClick={onOpenResearch}
                className="flex items-center gap-1.5 rounded border border-[#15191D]/15 bg-white px-2.5 py-1 text-[#15191D] transition-colors hover:border-[#315BFF] hover:text-[#315BFF] shadow-xs cursor-pointer"
              >
                <Box className="h-3 w-3 text-[#315BFF]" />
                <span>3D MODEL / ASSETS</span>
              </button>
            )}

            {/* Facility Status Indicator */}
            <div className="flex items-center gap-2 border-l border-[#15191D]/10 pl-3 text-[#555C63]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="font-semibold text-[#15191D]">FACILITY ACTIVE</span>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded border border-[#15191D]/15 bg-white text-[#15191D] lg:hidden hover:border-[#315BFF] cursor-pointer shadow-xs"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Fullscreen Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-[#15191D]/15 bg-[#F4F5F2]/98 px-6 py-6 font-mono lg:hidden backdrop-blur-xl shadow-lg">
            <div className="flex flex-col gap-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#555C63]">
                RESEARCH FACILITY NAVIGATION
              </span>
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="border-b border-[#15191D]/10 pb-2 text-xs uppercase tracking-wider text-[#15191D] font-semibold hover:text-[#315BFF]"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-3 pt-2">
                {onOpenResearch && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onOpenResearch()
                    }}
                    className="flex items-center gap-1.5 rounded border border-[#15191D]/20 bg-white px-3 py-1.5 text-xs text-[#15191D] font-semibold"
                  >
                    <Box className="h-3 w-3 text-[#315BFF]" />
                    <span>3D MODEL / ASSETS</span>
                  </button>
                )}
                <a
                  href="#techfest"
                  onClick={handleLinkClick}
                  className="rounded border border-[#315BFF]/40 bg-[#315BFF]/10 px-3 py-1.5 text-xs text-[#315BFF] font-semibold"
                >
                  TECHFEST DOSSIER
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
