import React, { useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'

/* ─── App data ─────────────────────────────────────────────────── */
const recentApps = [
  { id: 'spotify', label: 'Spotify', icon: '/icons/app-green.svg', color: '#10982b', stackIndex: 3, stackLeft: 27.43 },
  { id: 'youtube', label: 'YouTube', icon: '/icons/app-red.svg', color: '#ee0000', stackIndex: 2, stackLeft: 13.71 },
  { id: 'twitch', label: 'Twitch', icon: '/icons/app-purple.svg', color: '#7829df', stackIndex: 1, stackLeft: 0 },
]

/* ─── Spring configs ──────────────────────────────────────────── */
const spring = { type: 'spring' as const, stiffness: 420, damping: 28, mass: 0.8 }
const gentleSpring = { type: 'spring' as const, stiffness: 300, damping: 26, mass: 0.9 }

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

  return (
    <LayoutGroup>
      <div style={{ position: 'relative' }}>

        {/* ═══════════════════════════════════════════════════════
            EXPANDED ROWS — always mounted, animated via state.
            Absolutely positioned → bar NEVER moves.
            No AnimatePresence needed → no layoutId conflicts.
           ═══════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            bottom: 52, /* 44px bar + 8px gap */
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          {recentApps.map((app, i) => {
            /* Open: bottom-up accordion (twitch first → spotify last) */
            const openStagger = (recentApps.length - 1 - i) * 0.07
            /* Close: top-down accordion (spotify first → twitch last) */
            const closeStagger = i * 0.07

            return (
              <motion.div
                key={app.id}
                initial={false}
                animate={
                  open
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 24, scale: 0.88 }
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
                  {/* ── Icon: layoutId flies between pile ↔ rows ── */}
                  {open && (
                    <SharedIcon
                      id={app.id}
                      icon={app.icon}
                      color={app.color}
                      layoutTransition={{ ...spring, delay: open ? openStagger : closeStagger }}
                    />
                  )}

                  {/* ── Label slides in/out ── */}
                  <motion.span
                    initial={false}
                    animate={
                      open
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={
                      open
                        ? { ...gentleSpring, delay: openStagger + 0.05 }
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

                  {/* ── Arrow fades in/out ── */}
                  <motion.img
                    src="/icons/arrow-right.svg"
                    alt=""
                    initial={false}
                    animate={
                      open
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -4 }
                    }
                    transition={
                      open
                        ? { ...gentleSpring, delay: openStagger + 0.09 }
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
            BOTTOM BAR — normal flex row, pinned at 120px mark.
           ═══════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

          {/* ── #1 Recent Apps pill ── */}
          <motion.div
            onClick={() => setOpen(!open)}
            animate={{ width: open ? 168 : 130 }}
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
            {/* Layer 1: collapsed — stacked icons + "3+ Apps" */}
            <motion.div
              initial={false}
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.18, delay: open ? 0 : 0.1 }}
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
                {/* Icons only rendered here when CLOSED (they fly away when opened) */}
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
                        <SharedIcon
                          id={app.id}
                          icon={app.icon}
                          color={app.color}
                        />
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

            {/* Layer 2: expanded — "Recently Opened Apps" */}
            <motion.div
              initial={false}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: 0.18, delay: open ? 0.1 : 0 }}
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
                  color: '#e4e4e4',
                  lineHeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                Recently Opened Apps
              </span>
            </motion.div>
          </motion.div>

          {/* ── #2 Tab Bar Menu ── */}
          <div
            style={{
              width: 146,
              height: 44,
              borderRadius: 32,
              backgroundColor: '#252727',
              boxShadow: 'inset 0 0 0 1px #323232',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              padding: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {['tab-home', 'tab-move', 'tab-activity', 'tab-menu'].map((icon) => (
                <div
                  key={icon}
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
                    src={`/icons/${icon}.svg`}
                    alt=""
                    style={{ width: 16, height: 16, display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── #3 Search ── */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 32,
              backgroundColor: '#252727',
              boxShadow: 'inset 0 0 0 1px #323232',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}
          >
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
          </div>
        </div>
      </div>
    </LayoutGroup>
  )
}
