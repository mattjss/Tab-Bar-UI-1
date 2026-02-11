import React from 'react'

export const TabBar: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>

      {/* #1 Recent Apps */}
      <div
        style={{
          width: 130,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Overlapping app icons */}
          <div style={{ position: 'relative', width: 52, height: 24 }}>
            {/* Purple icon - Discord */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#7829df',
                border: '0.857px solid #232525',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              <img src="/icons/app-purple.svg" alt="" style={{ width: 14, height: 14 }} />
            </div>
            {/* Red icon - YouTube */}
            <div
              style={{
                position: 'absolute',
                left: 13.71,
                top: 0,
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#ee0000',
                border: '0.857px solid #232525',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <img src="/icons/app-red.svg" alt="" style={{ width: 14, height: 14 }} />
            </div>
            {/* Green icon - Spotify */}
            <div
              style={{
                position: 'absolute',
                left: 27.43,
                top: 0,
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#10982b',
                border: '0.857px solid #232525',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
              }}
            >
              <img src="/icons/app-green.svg" alt="" style={{ width: 14, height: 14 }} />
            </div>
          </div>

          {/* Label */}
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
      </div>

      {/* #2 Tab Bar Menu */}
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
          <div style={{ width: 24, height: 24, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="/icons/tab-home.svg" alt="" style={{ width: 16, height: 16, display: 'block' }} />
          </div>
          <div style={{ width: 24, height: 24, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="/icons/tab-move.svg" alt="" style={{ width: 16, height: 16, display: 'block' }} />
          </div>
          <div style={{ width: 24, height: 24, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="/icons/tab-activity.svg" alt="" style={{ width: 16, height: 16, display: 'block' }} />
          </div>
          <div style={{ width: 24, height: 24, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="/icons/tab-menu.svg" alt="" style={{ width: 16, height: 16, display: 'block' }} />
          </div>
        </div>
      </div>

      {/* #3 Search */}
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
        <div style={{ width: 24, height: 24, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src="/icons/tab-search.svg" alt="" style={{ width: 16, height: 16, display: 'block' }} />
        </div>
      </div>
    </div>
  )
}
