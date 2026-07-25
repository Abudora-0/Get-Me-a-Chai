"use client"

import { useRef, useState, useCallback } from 'react'

const CROP_SIZE = 220
const OUTPUT_SIZE = 320

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const AvatarUpload = ({ value, onChange }) => {
  const [source, setSource] = useState(null)
  const [natural, setNatural] = useState({ w: 0, h: 0 })
  const [userScale, setUserScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 })
  const fileInputRef = useRef(null)

  const baseScale = natural.w && natural.h ? CROP_SIZE / Math.min(natural.w, natural.h) : 1
  const eff = baseScale * userScale
  const displayedW = natural.w * eff
  const displayedH = natural.h * eff
  const maxPanX = Math.max(0, (displayedW - CROP_SIZE) / 2)
  const maxPanY = Math.max(0, (displayedH - CROP_SIZE) / 2)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setSource(url)
    setUserScale(1)
    setPan({ x: 0, y: 0 })
  }

  const handleImgLoad = (e) => {
    setNatural({ w: e.target.naturalWidth, h: e.target.naturalHeight })
  }

  const onPointerDown = (e) => {
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y }
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPan({
      x: clamp(dragStart.current.panX + dx, -maxPanX, maxPanX),
      y: clamp(dragStart.current.panY + dy, -maxPanY, maxPanY),
    })
  }

  const onPointerUp = () => setDragging(false)

  const handleScaleChange = (e) => {
    const next = Number(e.target.value)
    setUserScale(next)
    const nextEff = baseScale * next
    const nextMaxPanX = Math.max(0, (natural.w * nextEff - CROP_SIZE) / 2)
    const nextMaxPanY = Math.max(0, (natural.h * nextEff - CROP_SIZE) / 2)
    setPan(p => ({ x: clamp(p.x, -nextMaxPanX, nextMaxPanX), y: clamp(p.y, -nextMaxPanY, nextMaxPanY) }))
  }

  const confirmCrop = useCallback(() => {
    const img = new Image()
    img.onload = () => {
      const cropNatural = CROP_SIZE / eff
      const cx = natural.w / 2 - pan.x / eff
      const cy = natural.h / 2 - pan.y / eff
      const sx = cx - cropNatural / 2
      const sy = cy - cropNatural / 2

      const canvas = document.createElement('canvas')
      canvas.width = OUTPUT_SIZE
      canvas.height = OUTPUT_SIZE
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, sx, sy, cropNatural, cropNatural, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE)
      onChange(canvas.toDataURL('image/jpeg', 0.88))
      setSource(null)
    }
    img.src = source
  }, [source, natural, pan, eff, onChange])

  const cancelCrop = () => {
    setSource(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div>
      <label className="deco-label block mb-2">Profile Picture</label>

      {!source ? (
        <div className="flex items-center gap-4">
          <img
            src={value || '/avatar.gif'}
            onError={(e) => { e.currentTarget.src = '/avatar.gif' }}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-[#c9a227] object-cover"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-deco-outline !px-4 !py-2 !text-[0.65rem]"
          >
            {value ? 'Change Photo' : 'Upload Photo'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      ) : (
        <div className="deco-card p-5 flex flex-col items-center gap-4">
          <div
            className="rounded-full overflow-hidden border-2 border-[#c9a227] cursor-move select-none"
            style={{ width: CROP_SIZE, height: CROP_SIZE, touchAction: 'none' }}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
          >
            <div className="w-full h-full flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source}
                onLoad={handleImgLoad}
                draggable={false}
                alt="Choose crop area"
                style={{
                  width: displayedW || 'auto',
                  height: displayedH || 'auto',
                  transform: `translate(${pan.x}px, ${pan.y}px)`,
                  maxWidth: 'none',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full max-w-[220px]">
            <span className="text-xs text-[#8fa199]">−</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={userScale}
              onChange={handleScaleChange}
              className="w-full accent-[#a8841c]"
            />
            <span className="text-xs text-[#8fa199]">+</span>
          </div>

          <p className="text-xs text-[#8fa199]">Drag to reposition, use the slider to zoom</p>

          <div className="flex gap-3">
            <button type="button" onClick={cancelCrop} className="btn-deco-outline !px-5 !py-2 !text-[0.65rem]">
              Cancel
            </button>
            <button type="button" onClick={confirmCrop} className="btn-deco-gold !px-5 !py-2 !text-[0.65rem]">
              Use This Photo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AvatarUpload
