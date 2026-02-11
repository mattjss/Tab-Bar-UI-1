import React, { useState, useEffect, useRef } from 'react'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion'

/* ─── App data ─────────────────────────────────────────────────── */
const recentApps = [
  { id: 'spotify', label: 'Spotify', icon: '/icons/app-green.svg', color: '#10982b', stackIndex: 3, stackLeft: 27.43 },
  { id: 'youtube', label: 'YouTube', icon: '/icons/app-red.svg', color: '#ee0000', stackIndex: 2, stackLeft: 13.71 },
  { id: 'twitch', label: 'Twitch', icon: '/icons/app-purple.svg', color: '#7829df', stackIndex: 1, stackLeft: 0 },
]

/* ─── Menu items ───────────────────────────────────────────────── */
const menuItems = [
  { id: 'home', label: 'Home', icon: '/icons/tab-home.svg', shortcut: 'H' },
  { id: 'move', label: 'Move', icon: '/icons/tab-move.svg', shortcut: 'M' },
  { id: 'activity', label: 'Activity', icon: '/icons/tab-activity.svg', shortcut: 'A' },
  { id: 'portfolio', label: 'Portfolio', icon: '/icons/menu-portfolio.svg' },
  { id: 'documents', label: 'Documents', icon: '/icons/menu-documents.svg' },
]

/* Menu item positions from Figma — all items are uniform 216px wide
   Container: 228px, p:10, gap:4  →  each row is 32px tall (16px content + 8px*2 padding) */
const menuItemLayout = [
  { top: 10, left: 6, width: 216, px: 12, py: 8 },
  { top: 46, left: 6, width: 216, px: 12, py: 8 },
  { top: 82, left: 6, width: 216, px: 12, py: 8 },
  { top: 118, left: 6, width: 216, px: 12, py: 8 },
  { top: 154, left: 6, width: 216, px: 12, py: 8 },
]

/* ─── Spring configs ──────────────────────────────────────────── */
const spring = { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.8 }
const gentleSpring = { type: 'spring' as const, stiffness: 280, damping: 26, mass: 0.9 }

/* ─── Shared icon (layoutId drives the fly animation) ─────────── */
const SharedIcon: React.FC<{
  id: string
  icon: string
  color: string
  layoutTransition?: object
}> = ({ id, icon, color, layoutTransition }) => (
  <motion.div
    layoutId={`icon-${id}`}
    transition={layoutTransition || spring}
    style={{
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: color,
      border: '0.857px solid #232525',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <img src={icon} alt="" style={{ width: 14, height: 14, display: 'block' }} />
  </motion.div>
)

/* ─── TabBar ──────────────────────────────────────────────────── */
export const TabBar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const tabBarRef = useRef<HTMLDivElement>(null)

  /* Close when clicking anywhere outside the tab bar */
  useEffect(() => {
    if (!open && !menuOpen && !searchOpen) return
    const handleClick = (e: MouseEvent) => {
      if (tabBarRef.current && !tabBarRef.current.contains(e.target as Node)) {
        setOpen(false)
        setMenuOpen(false)
        setSearchOpen(false)
        setHoveredItem(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, menuOpen, searchOpen])

  /* Clear hover when menu closes */
  useEffect(() => {
    if (!menuOpen) setHoveredItem(null)
  }, [menuOpen])

  const handleRecentAppsClick = () => {
    if (menuOpen) setMenuOpen(false)
    if (searchOpen) setSearchOpen(false)
    setOpen(!open)
  }

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (open) setOpen(false)
    if (searchOpen) setSearchOpen(false)
    setMenuOpen(!menuOpen)
  }

  const handleSearchClick = () => {
    if (open) setOpen(false)
    if (menuOpen) setMenuOpen(false)
    setSearchOpen(!searchOpen)
  }

  return (
    <LayoutGroup>
      <div ref={tabBarRef} style={{ position: 'relative' }}>

        {/* ═══════════════════════════════════════════════════════
            EXPANDED RECENT APP ROWS
           ═══════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            bottom: 52,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          {recentApps.map((app, i) => {
            const openStagger = (recentApps.length - 1 - i) * 0.06
            const closeStagger = i * 0.05

            return (
              <motion.div
                key={app.id}
                initial={false}
                animate={
                  open
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 20, scale: 0.92 }
                }
                transition={
                  open
                    ? { ...spring, delay: openStagger }
                    : { ...spring, delay: closeStagger }
                }
                style={{
                  borderRadius: 32,
                  backgroundColor: '#323232',
                  boxShadow: 'inset 0 0 0 1px #4a4a4a',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 10,
                  cursor: 'pointer',
                  transformOrigin: 'bottom left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {open && (
                    <SharedIcon
                      id={app.id}
                      icon={app.icon}
                      color={app.color}
                      layoutTransition={{ ...spring, delay: open ? openStagger : closeStagger }}
                    />
                  )}
                  <motion.span
                    initial={false}
                    animate={
                      open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={
                      open
                        ? { ...gentleSpring, delay: openStagger + 0.04 }
                        : { ...gentleSpring, delay: closeStagger }
                    }
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 12,
                      color: '#e4e4e4',
                      lineHeight: 'normal',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {app.label}
                  </motion.span>
                  <motion.img
                    src="/icons/arrow-right.svg"
                    alt=""
                    initial={false}
                    animate={
                      open ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }
                    }
                    transition={
                      open
                        ? { ...gentleSpring, delay: openStagger + 0.07 }
                        : { ...gentleSpring, delay: closeStagger }
                    }
                    style={{ width: 16, height: 16, display: 'block' }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════
            BOTTOM BAR
           ═══════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, position: 'relative' }}>

          {/* ── #1 Recent Apps pill ── */}
          <motion.div
            onClick={handleRecentAppsClick}
            animate={{ width: open ? 168 : 130, opacity: searchOpen ? 0 : 1 }}
            transition={gentleSpring}
            style={{
              height: 44,
              borderRadius: 32,
              backgroundColor: '#252727',
              boxShadow: 'inset 0 0 0 1px #323232',
              flexShrink: 0,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: 10,
              cursor: 'pointer',
            }}
          >
            <motion.div
              initial={false}
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15, delay: open ? 0 : 0.08 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                padding: 10,
                pointerEvents: open ? 'none' : 'auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {!open && (
                  <div style={{ position: 'relative', width: 52, height: 24 }}>
                    {recentApps.map((app) => (
                      <div
                        key={app.id}
                        style={{
                          position: 'absolute',
                          left: app.stackLeft,
                          top: 0,
                          zIndex: app.stackIndex,
                        }}
                      >
                        <SharedIcon id={app.id} icon={app.icon} color={app.color} />
                      </div>
                    ))}
                  </div>
                )}
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 12,
                    color: '#e4e4e4',
                    lineHeight: 'normal',
                    whiteSpace: 'nowrap',
                  }}
                >
                  3+ Apps
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: 0.15, delay: open ? 0.08 : 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                pointerEvents: open ? 'auto' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: '#A6A6A6',
                  lineHeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                Recently Opened Apps
              </span>
            </motion.div>
          </motion.div>

          {/* ── #2 Tab Bar Menu ── */}
          {/* Wrapper animates WIDTH in flex flow (pushes #1 & #3), height stays 44 */}
          <motion.div
            animate={{ width: menuOpen ? 228 : 146, opacity: searchOpen ? 0 : 1 }}
            transition={gentleSpring}
            style={{ position: 'relative', height: 44, flexShrink: 0 }}
          >
            {/* Expanding panel — grows upward from bottom, fills wrapper width */}
            <motion.div
              animate={{
                height: menuOpen ? 196 : 44,
                borderRadius: menuOpen ? 16 : 32,
              }}
              transition={gentleSpring}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#252727',
                boxShadow: menuOpen ? 'none' : 'inset 0 0 0 1px #323232',
                overflow: 'hidden',
              }}
            >
              {/* Closed: icon row pinned to bottom */}
              <motion.div
                initial={false}
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.12 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  padding: 10,
                  pointerEvents: menuOpen ? 'none' : 'auto',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {['tab-home', 'tab-move', 'tab-activity', 'tab-menu'].map((icon) => (
                    <motion.div
                      key={icon}
                      onClick={icon === 'tab-menu' ? handleMenuToggle : undefined}
                      onMouseEnter={() => setHoveredTab(icon)}
                      onMouseLeave={() => setHoveredTab(null)}
                      animate={{
                        backgroundColor: hoveredTab === icon ? '#323232' : 'rgba(50, 50, 50, 0)',
                      }}
                      transition={{ duration: 0.12 }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        src={`/icons/${icon}.svg`}
                        alt=""
                        style={{ width: 16, height: 16, display: 'block' }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Open: menu items with hover-only highlight */}
              <motion.div
                initial={false}
                animate={{ opacity: menuOpen ? 1 : 0 }}
                transition={{ duration: menuOpen ? 0.18 : 0.1, delay: menuOpen ? 0.06 : 0 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: menuOpen ? 'auto' : 'none',
                }}
              >
                {menuItems.map((item, i) => {
                  const pos = menuItemLayout[i]
                  const openStagger = i * 0.04
                  const closeStagger = (menuItems.length - 1 - i) * 0.03
                  const isHovered = hoveredItem === item.id

                  return (
                    <motion.div
                      key={item.id}
                      initial={false}
                      animate={
                        menuOpen
                          ? {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              backgroundColor: isHovered ? '#2f2f2f' : 'rgba(47, 47, 47, 0)',
                            }
                          : {
                              opacity: 0,
                              y: 14,
                              scale: 0.95,
                              backgroundColor: 'rgba(47, 47, 47, 0)',
                            }
                      }
                      transition={
                        menuOpen
                          ? {
                              ...spring,
                              delay: openStagger,
                              backgroundColor: { duration: 0.12 },
                            }
                          : {
                              ...spring,
                              delay: closeStagger,
                              backgroundColor: { duration: 0.08 },
                            }
                      }
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={() => menuOpen && setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        position: 'absolute',
                        top: pos.top,
                        left: pos.left,
                        width: pos.width,
                        paddingLeft: pos.px,
                        paddingRight: pos.px,
                        paddingTop: pos.py,
                        paddingBottom: pos.py,
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transformOrigin: 'top center',
                      }}
                    >
                      {/* Icon + Label */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <motion.div
                          initial={false}
                          animate={
                            menuOpen
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0.5, opacity: 0 }
                          }
                          transition={
                            menuOpen
                              ? { ...spring, delay: openStagger + 0.02 }
                              : { ...spring, delay: closeStagger }
                          }
                          style={{ flexShrink: 0 }}
                        >
                          <img
                            src={item.icon}
                            alt=""
                            style={{ width: 16, height: 16, display: 'block' }}
                          />
                        </motion.div>
                        <motion.span
                          initial={false}
                          animate={
                            menuOpen
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -6 }
                          }
                          transition={
                            menuOpen
                              ? { ...gentleSpring, delay: openStagger + 0.04 }
                              : { ...gentleSpring, delay: closeStagger }
                          }
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 12,
                            color: '#ffffff',
                            lineHeight: 'normal',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.label}
                        </motion.span>
                      </div>

                      {/* Shortcut badge */}
                      {item.shortcut && (
                        <motion.div
                          initial={false}
                          animate={
                            menuOpen
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.6 }
                          }
                          transition={
                            menuOpen
                              ? { ...spring, delay: openStagger + 0.06 }
                              : { ...spring, delay: closeStagger }
                          }
                          style={{
                            backgroundColor: '#515151',
                            borderRadius: 4,
                            height: 16,
                            minWidth: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Overpass Mono', 'IBM Plex Mono', monospace",
                              fontSize: 12,
                              color: '#ffffff',
                              lineHeight: '8px',
                              textAlign: 'center',
                            }}
                          >
                            {item.shortcut}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── #3 Search (invisible spacer in flex flow — overlay handles visuals) ── */}
          <div
            style={{
              width: 44,
              height: 44,
              flexShrink: 0,
              visibility: 'hidden',
            }}
          />

          {/* ── Search overlay — expands right-to-left over entire bar ── */}
          <motion.div
            initial={false}
            animate={{
              width: searchOpen ? 352 : 44,
            }}
            transition={
              searchOpen
                ? gentleSpring
                : { type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] }
            }
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              height: 44,
              borderRadius: 32,
              backgroundColor: '#252727',
              boxShadow: 'inset 0 0 0 1px #323232',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              padding: 10,
              cursor: 'pointer',
              zIndex: 10,
            }}
            onClick={handleSearchClick}
          >
            {/* Search icon — always visible */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src="/icons/tab-search.svg"
                alt=""
                style={{ width: 16, height: 16, display: 'block' }}
              />
            </div>

            {/* Placeholder text — smooth left-to-right reveal */}
            <motion.div
              initial={false}
              animate={{
                clipPath: searchOpen
                  ? 'inset(0 0% 0 0)'
                  : 'inset(0 100% 0 0)',
              }}
              transition={
                searchOpen
                  ? { duration: 0.4, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }
                  : { duration: 0.2, ease: [0.4, 0, 1, 1] }
              }
              style={{
                marginLeft: 10,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: '#e4e4e4',
                  lineHeight: 'normal',
                }}
              >
                What are you looking for?
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </LayoutGroup>
  )
}
