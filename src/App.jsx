import { useState, useEffect, useCallback } from 'react'
import './index.css'

// ═══════════════════════════════════════
//  API ENDPOINTS — ALL FREE, NO SIGNUP
// ═══════════════════════════════════════
const API = {
  SPACEFLIGHT_NEWS: 'https://api.spaceflightnewsapi.net/v4/articles/?limit=8',
  NASA_APOD: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=6',
  ISS_POSITION: 'https://api.wheretheiss.at/v1/satellites/25544',
  SPACEX_LATEST: 'https://api.spacexdata.com/v4/launches/latest',
  SPACEX_NEXT: 'https://api.spacexdata.com/v4/launches/next',
  SPACEX_ROCKETS: 'https://api.spacexdata.com/v4/rockets',
  PEOPLE_IN_SPACE: 'http://api.open-notify.org/astros.json',
  LAUNCH_UPCOMING: 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&format=json',
  EXOPLANETS: 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+6+pl_name,hostname,disc_year,pl_bmasse,pl_orbper,pl_rade,pl_eqt,disc_facility+from+pscomppars+where+pl_eqt+between+180+and+400+and+pl_bmasse+is+not+null+and+pl_bmasse+between+0.1+and+50+order+by+disc_year+desc&format=json',
}

// ═══════════════════════════════════════
//  NAV HUD
// ═══════════════════════════════════════
function NavHud({ score, lives, apiCount }) {
  const sections = [
    { label: 'MISSIONS', href: '#missions' },
    { label: 'LAUNCHES', href: '#launches' },
    { label: 'SCANNER', href: '#scanner' },
    { label: 'CREW', href: '#crew' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'REPLAY', href: '#replay' },
  ]
  return (
    <nav className="bg-[#131318] fixed top-0 w-full z-50 border-b-4 border-black block-shadow flex justify-between items-center px-3 md:px-6 h-14 md:h-20">
      <div className="flex items-center gap-3 md:gap-6">
        <span className="font-pixel text-[10px] md:text-sm text-[#E60012] uppercase tracking-tighter">COSMIC.OBS</span>
        <div className="hidden lg:flex gap-3">
          {sections.map((item, i) => (
            <a key={item.label} href={item.href}
              className={`font-pixel text-[8px] uppercase ${i === 0 ? 'text-[#E60012] border-b-4 border-[#E60012] pb-1' : 'text-white hover:text-[#E60012]'}`}
              style={{ transition: 'none' }}>{item.label}</a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <span className="font-pixel text-[7px] md:text-[9px] text-[#FECB00] hidden sm:inline">
          SCORE: {String(score).padStart(6, '0')}
        </span>
        <div className="flex gap-0.5">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-[#E60012] text-base md:text-lg"
              style={{ fontVariationSettings: i < lives ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-[#0e0e13] px-2 py-1 border-2 border-black">
          <div className={`w-2 h-2 border border-black ${apiCount > 0 ? 'bg-[#00A651]' : 'bg-[#E60012]'}`}></div>
          <span className="font-pixel text-[6px] text-gray-500">{apiCount}/7</span>
        </div>
      </div>
    </nav>
  )
}

// ═══════════════════════════════════════
//  HERO
// ═══════════════════════════════════════
function HeroSection({ apod, onStart, peopleInSpace }) {
  const heroImage = Array.isArray(apod) ? apod[0] : apod
  return (
    <section className="relative min-h-[500px] md:min-h-[700px] flex items-center justify-center px-4 md:px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-35">
        {heroImage?.media_type === 'image' && (
          <img className="w-full h-full object-cover" src={heroImage.url} alt={heroImage.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d12] via-transparent to-[#0d0d12]"></div>
      </div>
      <div className="relative z-10 text-center max-w-5xl">
        <div className="inline-block bg-black px-3 py-1.5 border-4 border-[#E60012] mb-4 block-shadow">
          <span className="font-pixel text-[7px] md:text-[9px] text-[#E60012] uppercase tracking-widest">
            {peopleInSpace > 0 ? `${peopleInSpace} HUMANS IN ORBIT RIGHT NOW` : 'Incoming Transmission // Sector 7G'}
          </span>
        </div>
        <h1 className="font-pixel text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-white uppercase leading-none tracking-tighter mb-6"
          style={{ textShadow: '6px 6px 0px #000' }}>
          GALACTIC<br /><span className="text-[#E60012]">FRONTIER</span>
        </h1>
        {heroImage && (
          <div className="bg-[#1b1b20] border-4 border-black block-shadow px-4 py-2 mb-6 inline-block">
            <p className="font-pixel text-[6px] md:text-[8px] text-[#FECB00] mb-1">NASA PICTURE OF THE DAY</p>
            <p className="font-headline text-xs md:text-sm text-white font-bold uppercase">{heroImage.title}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button onClick={onStart}
            className="bg-[#E60012] text-white px-6 md:px-8 py-3 md:py-5 border-4 border-black block-shadow font-pixel text-xs md:text-base uppercase retro-press">
            <span className="animate-blink">PRESS START</span>
          </button>
          <div className="flex items-center gap-3 bg-[#1b1b20] p-3 border-4 border-black block-shadow">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FECB00] border-4 border-black flex items-center justify-center animate-float">
              <span className="material-symbols-outlined text-black font-bold text-base">star</span>
            </div>
            <div className="text-left">
              <p className="font-pixel text-[6px] text-white">7 LIVE FEEDS</p>
              <p className="font-headline text-xs font-bold text-[#FECB00]">ALL SYSTEMS GO</p>
            </div>
          </div>
        </div>
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 bg-white"
          style={{ left: `${8+i*16}%`, top: `${12+(i%3)*28}%`, animation: `twinkle ${1.5+i*0.4}s ease-in-out infinite`, animationDelay: `${i*0.3}s` }}></div>
      ))}
    </section>
  )
}

// ═══════════════════════════════════════
//  ISS DATA RIBBON
// ═══════════════════════════════════════
function ISSRibbon({ issData }) {
  if (!issData) return null
  return (
    <section className="bg-[#0e0e13] border-y-4 border-black py-2.5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between font-pixel text-[6px] md:text-[8px] tracking-wider text-[#5adf82] uppercase">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-[#5adf82] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-[#5adf82]"></span>
            </span>
            <span className="font-bold">LIVE</span>
          </div>
          <div className="flex gap-2 md:gap-5 whitespace-nowrap">
            <span>LAT {issData.latitude?.toFixed(2)}°</span>
            <span>LON {issData.longitude?.toFixed(2)}°</span>
            <span className="hidden sm:inline">ALT {issData.altitude?.toFixed(0)} KM</span>
            <span className="hidden md:inline">VEL {issData.velocity?.toFixed(0)} KM/H</span>
          </div>
        </div>
        <span className="hidden md:block text-gray-600">ISS TRACKER API</span>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
//  ARTICLE CARD
// ═══════════════════════════════════════
function ArticleCard({ article, variant = 'default', index = 0 }) {
  const accentColors = ['#E60012', '#00529B', '#00A651', '#FECB00']
  const accent = accentColors[index % accentColors.length]

  if (variant === 'featured') {
    return (
      <article className="md:col-span-8 bg-[#1f1f24] border-4 border-black block-shadow inner-glow group hover:-translate-y-1"
        style={{ transition: 'transform 200ms' }}>
        <div className="relative h-48 md:h-80 overflow-hidden border-b-4 border-black">
          <img className="w-full h-full object-cover grayscale group-hover:grayscale-0" style={{ transition: 'filter 500ms' }}
            alt={article.title} src={article.image_url}
            onError={(e) => { e.target.src = 'https://placehold.co/800x400/1f1f24/e4e1e9?text=NO+SIGNAL' }} />
          <div className="absolute top-3 left-3 bg-[#E60012] px-2 py-1 border-4 border-black">
            <span className="font-pixel text-[7px] text-white">★ {article.news_site}</span>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <h3 className="font-pixel text-xs md:text-base text-white mb-3 uppercase leading-tight">{article.title}</h3>
          <p className="font-headline text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{article.summary}</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-pixel text-[7px] text-gray-600">LOG: {new Date(article.published_at).toLocaleDateString()}</span>
            <a href={article.url} target="_blank" rel="noreferrer"
              className="bg-[#2a292f] px-4 py-2 border-4 border-black block-shadow font-pixel text-[7px] uppercase retro-press text-white inline-block">
              Read Full Logs</a>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'side') {
    return (
      <div className="md:col-span-4 bg-[#1b1b20] border-4 border-black block-shadow inner-glow p-4 md:p-6 flex flex-col justify-between hover:-translate-y-1"
        style={{ transition: 'transform 200ms' }}>
        <div>
          <div className="w-8 h-8 bg-[#FECB00] border-4 border-black mb-3 flex items-center justify-center animate-float">
            <span className="material-symbols-outlined text-black text-base">satellite_alt</span>
          </div>
          <h3 className="font-pixel text-[10px] text-white mb-2 uppercase leading-tight">{article.title}</h3>
          <p className="font-headline text-xs text-gray-400 mb-3 line-clamp-3">{article.summary}</p>
        </div>
        <a href={article.url} target="_blank" rel="noreferrer" className="block">
          <div className="bg-black p-3 border-4 border-[#5f3f3b]/30">
            <div className="flex justify-between font-pixel text-[7px] text-[#FECB00] mb-1.5">
              <span>{article.news_site}</span>
              <span>{new Date(article.published_at).toLocaleDateString()}</span>
            </div>
            <div className="w-full h-2.5 bg-[#131318] border-2 border-black overflow-hidden">
              <div className="h-full bg-[#FECB00] health-bar-chunks text-[#FECB00]" style={{ width: '78%' }}></div>
            </div>
          </div>
        </a>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A24] border-4 border-black block-shadow inner-glow p-4 group hover:-translate-y-1 flex flex-col"
      style={{ transition: 'transform 200ms' }}>
      <div className="aspect-[4/3] bg-black border-4 border-black mb-3 overflow-hidden">
        <img className="w-full h-full object-cover grayscale group-hover:grayscale-0" style={{ transition: 'filter 400ms' }}
          alt={article.title} src={article.image_url}
          onError={(e) => { e.target.src = 'https://placehold.co/400x300/1a1a24/e4e1e9?text=NO+SIGNAL' }} />
      </div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-2 h-2 border-2 border-black" style={{ backgroundColor: accent }}></div>
        <span className="font-pixel text-[6px] uppercase tracking-widest" style={{ color: accent }}>{article.news_site}</span>
      </div>
      <h4 className="font-pixel text-[9px] text-white mb-1.5 uppercase leading-tight line-clamp-2">{article.title}</h4>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{article.summary}</p>
      <a href={article.url} target="_blank" rel="noreferrer"
        className="mt-auto font-pixel text-[7px] uppercase hover:text-white" style={{ color: accent, transition: 'none' }}>
        VIEW LOG {'>'}{'>'}
      </a>
    </div>
  )
}

// ═══════════════════════════════════════
//  🚀 LAUNCHES SECTION — SpaceX + Launch Library 2
// ═══════════════════════════════════════
function LaunchesSection({ spacexLatest, spacexNext, upcomingLaunches, rockets }) {
  if (!spacexLatest && !upcomingLaunches?.length) return null

  const rocketMap = {}
  if (rockets) rockets.forEach(r => { rocketMap[r.id] = r })

  return (
    <section id="launches" className="max-w-7xl mx-auto px-4 md:px-6 my-14 md:my-20 space-y-6">
      <div className="flex items-end justify-between border-b-8 border-black pb-3">
        <div>
          <h2 className="font-pixel text-base md:text-xl text-white uppercase">Launch Pad</h2>
          <p className="font-headline text-xs text-gray-500 mt-1">SpaceX + Global Launch Schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#00529B] border-2 border-black"></div>
          <span className="font-pixel text-[7px] text-[#00529B]">2 APIs</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SpaceX Latest Launch */}
        {spacexLatest && (
          <div className="bg-[#1f1f24] border-4 border-black block-shadow inner-glow p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[8px] text-[#E60012] uppercase">LAST LAUNCH</span>
              <span className="font-pixel text-[7px] text-gray-600">{spacexLatest.date_utc?.slice(0, 10)}</span>
            </div>
            <div className="flex items-start gap-4">
              {spacexLatest.links?.patch?.small && (
                <img className="w-16 h-16 md:w-20 md:h-20 border-4 border-black bg-black object-contain p-1"
                  src={spacexLatest.links.patch.small} alt="Mission Patch" />
              )}
              <div className="flex-1 space-y-2">
                <h3 className="font-pixel text-xs md:text-sm text-white uppercase">{spacexLatest.name}</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 border-2 border-black ${spacexLatest.success ? 'bg-[#00A651]' : 'bg-[#E60012]'}`}></div>
                  <span className="font-pixel text-[8px]" style={{ color: spacexLatest.success ? '#00A651' : '#E60012' }}>
                    {spacexLatest.success ? 'SUCCESS' : 'FAILED'}
                  </span>
                </div>
                {spacexLatest.details && (
                  <p className="font-headline text-xs text-gray-400 line-clamp-3">{spacexLatest.details}</p>
                )}
              </div>
            </div>
            {spacexLatest.links?.webcast && (
              <a href={spacexLatest.links.webcast} target="_blank" rel="noreferrer"
                className="block bg-[#E60012] text-center py-2 border-4 border-black block-shadow font-pixel text-[8px] text-white uppercase retro-press">
                ▶ WATCH REPLAY
              </a>
            )}
          </div>
        )}

        {/* SpaceX Next Launch */}
        {spacexNext && (
          <div className="bg-[#1b1b20] border-4 border-black block-shadow inner-glow p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[8px] text-[#FECB00] uppercase animate-blink">UPCOMING</span>
              <span className="font-pixel text-[7px] text-gray-600">{spacexNext.date_utc?.slice(0, 10)}</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-black bg-[#0e0e13] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#FECB00] text-3xl">rocket_launch</span>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-pixel text-xs md:text-sm text-white uppercase">{spacexNext.name}</h3>
                <p className="font-headline text-xs text-gray-400">
                  {spacexNext.details || 'Mission details pending...'}
                </p>
              </div>
            </div>
            <div className="bg-black p-3 border-4 border-[#5f3f3b]/30">
              <p className="font-pixel text-[7px] text-[#FECB00] mb-1.5">COUNTDOWN</p>
              <div className="w-full h-3 bg-[#131318] border-2 border-black overflow-hidden">
                <div className="h-full bg-[#FECB00] health-bar-chunks text-[#FECB00] animate-pulse" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Launches from Launch Library 2 */}
      {upcomingLaunches && upcomingLaunches.length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="font-pixel text-xs text-gray-500 uppercase">Global Launch Schedule</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingLaunches.map((launch, idx) => {
              const statusColors = { 1: '#00A651', 2: '#FECB00', 3: '#E60012', 4: '#E60012', 6: '#00529B' }
              const sColor = statusColors[launch.status?.id] || '#5f3f3b'
              return (
                <div key={idx} className="bg-[#1A1A24] border-4 border-black block-shadow inner-glow p-4 hover:-translate-y-1 flex flex-col"
                  style={{ transition: 'transform 200ms' }}>
                  {launch.image && (
                    <div className="h-32 border-4 border-black mb-3 overflow-hidden bg-black">
                      <img className="w-full h-full object-cover" src={launch.image} alt={launch.name}
                        onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 border border-black" style={{ backgroundColor: sColor }}></div>
                    <span className="font-pixel text-[6px] uppercase" style={{ color: sColor }}>
                      {launch.status?.abbrev || 'TBD'}
                    </span>
                  </div>
                  <h4 className="font-pixel text-[8px] text-white uppercase leading-tight line-clamp-2 mb-2">{launch.name}</h4>
                  <p className="text-xs text-gray-500 mb-1">
                    {launch.net ? new Date(launch.net).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                  </p>
                  <p className="text-[10px] text-gray-600 line-clamp-1 mt-auto">
                    {launch.pad?.location?.name || 'Location TBD'}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Rocket Fleet */}
      {rockets && rockets.length > 0 && (
        <div className="mt-6 bg-[#0e0e13] border-4 border-black block-shadow p-4 md:p-6">
          <h3 className="font-pixel text-xs text-gray-500 uppercase mb-4">SpaceX Fleet</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {rockets.map((r) => (
              <div key={r.id} className="bg-[#1b1b20] border-4 border-black p-3 text-center space-y-2 inner-glow">
                <span className="material-symbols-outlined text-2xl" style={{ color: r.active ? '#00A651' : '#5f3f3b' }}>
                  {r.active ? 'rocket' : 'rocket'}
                </span>
                <p className="font-pixel text-[8px] text-white uppercase">{r.name}</p>
                <p className="font-pixel text-[6px]" style={{ color: r.active ? '#00A651' : '#E60012' }}>
                  {r.active ? 'ACTIVE' : 'RETIRED'}
                </p>
                <p className="font-headline text-[10px] text-[#FECB00]">${(r.cost_per_launch / 1e6).toFixed(0)}M</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ═══════════════════════════════════════
//  👨‍🚀 CREW SECTION — People in Space
// ═══════════════════════════════════════
function CrewSection({ crew }) {
  if (!crew || crew.length === 0) return null

  const crafts = {}
  crew.forEach(p => {
    if (!crafts[p.craft]) crafts[p.craft] = []
    crafts[p.craft].push(p.name)
  })

  const craftIcons = { ISS: 'space_dashboard', Tiangong: 'domain' }
  const craftColors = { ISS: '#00529B', Tiangong: '#E60012' }

  return (
    <section id="crew" className="max-w-7xl mx-auto px-4 md:px-6 my-14 md:my-20 space-y-6">
      <div className="flex items-end justify-between border-b-8 border-black pb-3">
        <div>
          <h2 className="font-pixel text-base md:text-xl text-white uppercase">Crew Manifest</h2>
          <p className="font-headline text-xs text-gray-500 mt-1">{crew.length} Humans Currently in Orbit</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#00A651] border-2 border-black"></div>
          <span className="font-pixel text-[7px] text-[#00A651]">OPEN-NOTIFY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(crafts).map(([craft, members]) => (
          <div key={craft} className="bg-[#1f1f24] border-4 border-black block-shadow inner-glow p-5 md:p-6">
            <div className="flex items-center gap-3 mb-4 border-b-4 border-[#5f3f3b]/30 pb-3">
              <div className="w-10 h-10 border-4 border-black flex items-center justify-center"
                style={{ backgroundColor: craftColors[craft] || '#5f3f3b' }}>
                <span className="material-symbols-outlined text-white text-lg">
                  {craftIcons[craft] || 'satellite'}
                </span>
              </div>
              <div>
                <h3 className="font-pixel text-sm text-white uppercase">{craft}</h3>
                <p className="font-pixel text-[7px] text-gray-500">{members.length} CREW ABOARD</p>
              </div>
            </div>
            <div className="space-y-2">
              {members.map((name, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-[#0e0e13] border-2 border-black hover:border-[#5f3f3b]"
                  style={{ transition: 'border-color 200ms' }}>
                  <div className="w-6 h-6 border-2 border-black flex items-center justify-center"
                    style={{ backgroundColor: craftColors[craft] || '#5f3f3b' }}>
                    <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <span className="font-headline text-sm text-white">{name}</span>
                  <span className="ml-auto font-pixel text-[6px] text-[#00A651]">ACTIVE</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
//  🔭 DEEP SPACE SCANNER
// ═══════════════════════════════════════
const CONSTELLATIONS = [
  { name: 'Orion', stars: 7, img: '/assets/constellations/orion_pixel_1774029078599.png' },
  { name: 'Ursa Major', stars: 7, img: '/assets/constellations/ursa_major_pixel_1774029095703.png' },
  { name: 'Cygnus', stars: 9, img: '/assets/constellations/cygnus_pixel_1774029118821.png' },
  { name: 'Draco', stars: 14, img: '/assets/constellations/draco_pixel_1774029134587.png' },
  { name: 'Cassiopeia', stars: 5, img: '/assets/constellations/cassiopeia_pixel_1774029152477.png' },
  { name: 'Lyra', stars: 5, img: '/assets/constellations/lyra_pixel_1774029170321.png' },
  { name: 'Phoenix', stars: 4, img: '/assets/constellations/phoenix_pixel_1774029186341.png' },
  { name: 'Pegasus', stars: 4, img: '/assets/constellations/pegasus_pixel_1774029202620.png' },
]

// Static fallback data for when NASA APIs are rate-limited
const ASTEROID_FALLBACK = [
  { name: '(99942) Apophis', diameterM: 370, velocityKmh: 30730, missKm: 31066, hazardous: true },
  { name: '(101955) Bennu', diameterM: 490, velocityKmh: 101389, missKm: 7480000, hazardous: true },
  { name: '2023 DW', diameterM: 50, velocityKmh: 87700, missKm: 4300000, hazardous: false },
  { name: '(7482) 1994 PC1', diameterM: 1052, velocityKmh: 70215, missKm: 1930000, hazardous: true },
  { name: '2024 YR4', diameterM: 42, velocityKmh: 12100, missKm: 980000, hazardous: false },
]

const SOLAR_FLARE_FALLBACK = [
  { classType: 'X4.2', time: '14:02 UTC', source: 'AR 3664', severity: 'critical' },
  { classType: 'M1.1', time: '12:45 UTC', source: 'AR 3590', severity: 'warning' },
  { classType: 'C9.0', time: '09:30 UTC', source: 'AR 3576', severity: 'normal' },
  { classType: 'M5.8', time: '06:12 UTC', source: 'AR 3664', severity: 'warning' },
]

function DeepSpaceScannerSection({ exoplanets, onAction }) {
  return (
    <section id="scanner" className="max-w-7xl mx-auto px-4 md:px-6 my-14 md:my-20 space-y-10">
      {/* Section Header */}
      <div className="flex items-end justify-between border-b-8 border-black pb-3">
        <div>
          <h2 className="font-pixel text-base md:text-xl text-white uppercase">Deep Space Scanner</h2>
          <p className="font-headline text-xs text-gray-500 mt-1">Stars • Constellations • Exoplanets • Anomalies</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#E60012] border-2 border-black animate-pulse"></div>
          <span className="font-pixel text-[7px] text-[#E60012]">SCANNING</span>
        </div>
      </div>

      {/* ── EXOPLANET REGISTRY ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#FECB00]">public</span>
          <h3 className="font-pixel text-xs text-white uppercase">Exoplanet_Registry</h3>
          <span className="font-pixel text-[6px] text-gray-600 ml-auto">NASA EXOPLANET ARCHIVE</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(exoplanets.length > 0 ? exoplanets : [
            { pl_name: 'Kepler-560 b', hostname: 'Kepler-560', disc_year: 2016, pl_bmasse: 3.6, pl_orbper: 56.4, pl_eqt: 298, disc_facility: 'Kepler' },
            { pl_name: 'TRAPPIST-1 e', hostname: 'TRAPPIST-1', disc_year: 2017, pl_bmasse: 0.7, pl_orbper: 6.1, pl_eqt: 251, disc_facility: 'Spitzer' },
            { pl_name: 'Kepler-62 e', hostname: 'Kepler-62', disc_year: 2013, pl_bmasse: 36.0, pl_orbper: 122.4, pl_eqt: 270, disc_facility: 'Kepler' },
          ]).map((p, idx) => {
            const temp = p.pl_eqt || 0
            const habPercent = temp >= 200 && temp <= 320 ? Math.min(100, Math.max(20, 100 - Math.abs(temp - 260) * 2)) : Math.max(5, 30 - Math.abs(temp - 260))
            const habColor = habPercent > 60 ? '#00A651' : habPercent > 30 ? '#FECB00' : '#E60012'
            const chunks = 5
            const filledChunks = Math.ceil((habPercent / 100) * chunks)

            return (
              <div key={idx} className="bg-[#1b1b20] border-4 border-black block-shadow inner-glow p-4 space-y-3 hover:-translate-y-1"
                style={{ transition: 'transform 200ms' }}>
                <div className="flex justify-between items-start">
                  <h4 className="font-pixel text-[9px] text-white uppercase">{p.pl_name}</h4>
                  <span className="font-pixel text-[6px]" style={{ color: habColor }}>
                    {habPercent > 60 ? 'PRIME' : habPercent > 30 ? 'CAUTION' : 'HOSTILE'}
                  </span>
                </div>
                <p className="font-headline text-[10px] text-gray-500">Host: {p.hostname}</p>
                <div className="space-y-1.5 font-pixel text-[7px]">
                  <div className="flex justify-between"><span className="text-gray-600">MASS:</span><span className="text-white">{p.pl_bmasse?.toFixed(1)} Earths</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">PERIOD:</span><span className="text-white">{p.pl_orbper?.toFixed(1)} Days</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">TEMP:</span><span style={{ color: habColor }}>{temp} K</span></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center font-pixel text-[6px]">
                    <span className="text-gray-600">HABITABILITY</span>
                    <span style={{ color: habColor }}>{habPercent}%</span>
                  </div>
                  <div className="h-3 bg-black flex gap-0.5 p-0.5">
                    {[...Array(chunks)].map((_, ci) => (
                      <div key={ci} className="flex-1 h-full" style={{ backgroundColor: ci < filledChunks ? habColor : '#35343a' }}></div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between font-pixel text-[5px] text-gray-700 pt-1">
                  <span>{p.disc_year}</span>
                  <span>{p.disc_facility || 'N/A'}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── ASTEROID WATCH + SOLAR MONITOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asteroid Terminal (2 cols wide) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#E60012]">radar</span>
            <h3 className="font-pixel text-xs text-white uppercase">Asteroid_Watch</h3>
          </div>
          <div className="bg-black border-4 border-black block-shadow relative overflow-hidden">
            {/* Scanning line */}
            <div className="absolute left-0 w-full h-0.5 bg-[#00A651] z-10" style={{ boxShadow: '0 0 8px #00A651', animation: 'scan 4s linear infinite' }}></div>
            <div className="overflow-x-auto p-4">
              <table className="w-full text-left font-pixel text-[7px]">
                <thead className="text-gray-600 border-b-2 border-[#35343a]">
                  <tr>
                    <th className="py-3 px-2">OBJECT</th>
                    <th className="py-3 px-2">DIAMETER</th>
                    <th className="py-3 px-2">VELOCITY</th>
                    <th className="py-3 px-2 hidden sm:table-cell">MISS DIST.</th>
                    <th className="py-3 px-2">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-[#5adf82]">
                  {ASTEROID_FALLBACK.map((a, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="py-3 px-2 text-white">{a.name}</td>
                      <td className="py-3 px-2">{a.diameterM}M</td>
                      <td className="py-3 px-2">{a.velocityKmh.toLocaleString()} KM/H</td>
                      <td className="py-3 px-2 hidden sm:table-cell">{(a.missKm / 1e6).toFixed(1)}M KM</td>
                      <td className="py-3 px-2">
                        <span style={{ color: a.hazardous ? '#E60012' : '#00A651' }}>
                          {a.hazardous ? '⚠ ALERT' : 'CLEAR'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 bg-[#35343a] font-pixel text-[6px] flex justify-between text-gray-500">
              <span>Terminal: ASTR-01</span>
              <span>NEO Database</span>
            </div>
          </div>
        </div>

        {/* Solar Flare Monitor (1 col) */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#FECB00]">sunny</span>
            <h3 className="font-pixel text-xs text-white uppercase">Solar_Flare</h3>
          </div>
          <div className="bg-[#1f1f24] border-4 border-black block-shadow inner-glow p-4 space-y-4 h-full">
            {/* Shield Status Bar */}
            <div className="bg-black p-3 border-2 border-[#35343a]">
              <span className="font-pixel text-[6px] text-gray-600 block mb-2">Shield Status</span>
              <div className="flex items-end gap-1 h-10">
                {[100, 90, 95, 60, 55, 20].map((h, i) => (
                  <div key={i} className="flex-1" style={{
                    height: `${h}%`,
                    backgroundColor: h > 80 ? '#00A651' : h > 40 ? '#FECB00' : '#E60012'
                  }}></div>
                ))}
              </div>
            </div>
            {/* Event Logs */}
            <div className="space-y-2">
              <span className="font-pixel text-[6px] text-gray-600">Event Logs</span>
              {SOLAR_FLARE_FALLBACK.map((f, i) => {
                const borderColor = f.severity === 'critical' ? '#E60012' : f.severity === 'warning' ? '#FECB00' : '#00A651'
                return (
                  <div key={i} className="flex justify-between items-center pl-2 font-pixel text-[7px]"
                    style={{ borderLeft: `4px solid ${borderColor}` }}>
                    <span className="text-white">{f.classType}</span>
                    <span className="text-gray-600">{f.time}</span>
                  </div>
                )
              })}
            </div>
            <button onClick={() => onAction && onAction(200)} className="w-full bg-[#E60012] border-4 border-black py-2.5 font-pixel text-[7px] text-white block-shadow retro-press uppercase">
              INITIATE_SHIELD
            </button>
          </div>
        </div>
      </div>

      {/* ── CONSTELLATION DATABASE ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#FECB00]">stars</span>
          <h3 className="font-pixel text-xs text-white uppercase">Constellation_DB</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONSTELLATIONS.map((c, idx) => (
            <div key={idx} onClick={() => onAction && onAction(50)} className="bg-[#0e0e13] border-4 border-[#FECB00] block-shadow inner-glow p-3 group cursor-pointer hover:bg-[#FECB00]/5 hover:-translate-y-1"
              style={{ transition: 'all 200ms' }}>
              <div className="aspect-square bg-black mb-3 border-2 border-[#35343a] overflow-hidden">
                <img className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                  style={{ transition: 'all 300ms' }}
                  src={c.img} alt={c.name}
                  onError={(e) => { e.target.src = 'https://placehold.co/200x200/0e0e13/FECB00?text=' + c.name }} />
              </div>
              <p className="font-pixel text-[8px] text-[#FECB00] uppercase text-center">{c.name}</p>
              <p className="font-pixel text-[5px] text-gray-600 text-center mt-1">{c.stars} STARS</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ASTRONOMER DIALOGUE ── */}
      <div className="bg-[#0E0E13] border-4 border-white block-shadow p-5 md:p-8 relative max-w-4xl mx-auto">
        <div className="absolute -top-2 -left-2 w-5 h-5 bg-white border-4 border-black"></div>
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-white border-4 border-black"></div>
        <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-white border-4 border-black"></div>
        <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-white border-4 border-black"></div>
        <div className="flex gap-4 items-start">
          <div className="w-14 h-14 md:w-20 md:h-20 border-4 border-white bg-[#2a292f] flex-shrink-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap justify-between items-center border-b-4 border-[#5f3f3b] pb-1.5 gap-2">
              <h3 className="font-pixel text-xs md:text-sm text-[#FECB00]">ASTRONOMER_BETA</h3>
              <span className="font-pixel text-[7px] text-gray-500">LEVEL 42</span>
            </div>
            <p className="font-headline text-sm md:text-base text-white leading-relaxed">
              "The deep space scanner is fully operational. All anomaly feeds are active. Exoplanet data streams are nominal. Proceed with caution, Commander."
            </p>
            <div className="flex gap-3">
              <button onClick={() => onAction && onAction(100)} className="bg-[#00A651] text-black px-4 py-2 font-pixel text-[7px] uppercase retro-press border-4 border-black block-shadow">
                ACKNOWLEDGE
              </button>
              <button onClick={() => onAction && onAction(10)} className="bg-transparent text-white border-4 border-white px-4 py-2 font-pixel text-[7px] uppercase retro-press">
                DISMISS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
//  GALLERY — NASA APOD / Fallback
// ═══════════════════════════════════════
function GallerySection({ apodImages, articles }) {
  const [selectedImage, setSelectedImage] = useState(null)
  let images = Array.isArray(apodImages) ? apodImages.filter(a => a.media_type === 'image') : []
  if (images.length === 0 && articles?.length > 0) {
    images = articles.slice(0, 6).map(a => ({
      url: a.image_url, title: a.title, explanation: a.summary,
      date: new Date(a.published_at).toLocaleDateString(), media_type: 'image',
    }))
  }
  if (images.length === 0) return null

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 md:px-6 my-14 md:my-20 space-y-6">
      <div className="flex items-end justify-between border-b-8 border-black pb-3">
        <div>
          <h2 className="font-pixel text-base md:text-xl text-white uppercase">Gallery</h2>
          <p className="font-headline text-xs text-gray-500 mt-1">NASA Astronomy Pictures</p>
        </div>
        <span className="font-pixel text-[7px] text-[#00529B]">NASA APOD</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div key={idx}
            className="group relative bg-[#1A1A24] border-4 border-black block-shadow inner-glow overflow-hidden cursor-pointer hover:-translate-y-1"
            style={{ transition: 'transform 200ms' }} onClick={() => setSelectedImage(img)}>
            <div className="aspect-square overflow-hidden">
              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0" style={{ transition: 'filter 500ms' }}
                src={img.url} alt={img.title}
                onError={(e) => { e.target.src = 'https://placehold.co/400x400/1a1a24/e4e1e9?text=NO+SIGNAL' }} />
            </div>
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-3"
              style={{ transition: 'opacity 300ms' }}>
              <span className="material-symbols-outlined text-[#FECB00] text-2xl mb-1">zoom_in</span>
              <p className="font-pixel text-[6px] text-white text-center uppercase leading-relaxed line-clamp-3">{img.title}</p>
            </div>
            <div className="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 border-2 border-black">
              <span className="font-pixel text-[5px] text-[#FECB00]">{img.date}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedImage(null)}>
          <div className="max-w-3xl w-full bg-[#0e0e13] border-4 border-white block-shadow relative" onClick={e => e.stopPropagation()}>
            <div className="absolute -top-2 -left-2 w-5 h-5 bg-white border-4 border-black"></div>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-white border-4 border-black"></div>
            <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-white border-4 border-black"></div>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-white border-4 border-black"></div>
            <div className="flex justify-between items-center px-3 py-1.5 border-b-4 border-white bg-[#E60012]">
              <span className="font-pixel text-[7px] text-white">IMAGE VIEWER</span>
              <button onClick={() => setSelectedImage(null)} className="font-pixel text-[8px] text-white hover:text-[#FECB00]">✕</button>
            </div>
            <img className="w-full max-h-[55vh] object-contain" src={selectedImage.url} alt={selectedImage.title} />
            <div className="p-4 space-y-2 border-t-4 border-white">
              <h3 className="font-pixel text-[9px] text-white uppercase">{selectedImage.title}</h3>
              <p className="font-headline text-xs text-gray-400 leading-relaxed line-clamp-3">{selectedImage.explanation}</p>
              <span className="font-pixel text-[7px] text-gray-600 block">{selectedImage.date}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ═══════════════════════════════════════
//  REPLAY — Mission Timeline
// ═══════════════════════════════════════
function ReplaySection({ articles }) {
  if (!articles?.length) return null
  const entries = articles.slice(0, 5).map((a, i) => ({
    ...a, missionCode: `M-${String(i+1).padStart(3,'0')}`,
    status: i === 0 ? 'ACTIVE' : i < 3 ? 'COMPLETE' : 'ARCHIVED',
    statusColor: i === 0 ? '#E60012' : i < 3 ? '#00A651' : '#5f3f3b',
  }))

  return (
    <section id="replay" className="max-w-7xl mx-auto px-4 md:px-6 my-14 md:my-20 space-y-6">
      <div className="flex items-end justify-between border-b-8 border-black pb-3">
        <h2 className="font-pixel text-base md:text-xl text-white uppercase">Replay</h2>
        <span className="font-pixel text-[7px] text-gray-600">{entries.length} ENTRIES</span>
      </div>

      {/* Commander Dialogue */}
      <div className="bg-[#0E0E13] border-4 border-white block-shadow p-5 md:p-8 relative">
        <div className="absolute -top-2 -left-2 w-5 h-5 bg-white border-4 border-black"></div>
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-white border-4 border-black"></div>
        <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-white border-4 border-black"></div>
        <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-white border-4 border-black"></div>
        <div className="flex gap-4 items-start">
          <div className="w-14 h-14 md:w-20 md:h-20 border-4 border-white bg-[#2a292f] flex-shrink-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap justify-between items-center border-b-4 border-[#5f3f3b] pb-1.5 gap-2">
              <h3 className="font-pixel text-xs md:text-sm text-[#E60012]">COMMANDER_ALPHA</h3>
              <span className="font-pixel text-[7px] text-gray-500">LEVEL 99</span>
            </div>
            <p className="font-headline text-sm md:text-base text-white leading-relaxed">
              "Review all completed missions below. Each entry links to the full briefing."
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-3 md:left-6 top-0 bottom-0 w-1 bg-[#2a292f]"></div>
        <div className="space-y-4">
          {entries.map((e, idx) => (
            <div key={idx} className="relative pl-10 md:pl-16 group">
              <div className="absolute left-1.5 md:left-4 top-5 w-3.5 h-3.5 border-4 border-black z-10" style={{ backgroundColor: e.statusColor }}></div>
              <div className="bg-[#1A1A24] border-4 border-black block-shadow inner-glow p-3 md:p-5 hover:-translate-y-1 flex flex-col md:flex-row gap-3 md:gap-5"
                style={{ transition: 'transform 200ms' }}>
                <div className="w-full md:w-24 h-20 md:h-24 bg-black border-4 border-black overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0" style={{ transition: 'filter 400ms' }}
                    src={e.image_url} alt={e.title}
                    onError={(ev) => { ev.target.src = 'https://placehold.co/200x200/1a1a24/e4e1e9?text=NO+SIGNAL' }} />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-pixel text-[6px] px-1.5 py-0.5 border-2 border-black text-white" style={{ backgroundColor: e.statusColor }}>{e.status}</span>
                    <span className="font-pixel text-[6px] text-gray-600">{e.missionCode}</span>
                  </div>
                  <h4 className="font-pixel text-[8px] text-white uppercase leading-tight line-clamp-2">{e.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{e.summary}</p>
                  <a href={e.url} target="_blank" rel="noreferrer" className="font-pixel text-[6px] text-[#FECB00] uppercase hover:text-white" style={{ transition: 'none' }}>
                    REPLAY {'>'}{'>'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
//  SYSTEM STATS
// ═══════════════════════════════════════
function SystemStats({ apiStatus }) {
  const stats = Object.entries(apiStatus).map(([key, val]) => ({
    label: key.replace(/_/g, ' ').toUpperCase(),
    online: val,
    color: val ? '#5adf82' : '#E60012',
  }))
  return (
    <section className="bg-[#1b1b20] border-y-4 border-black py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h3 className="font-pixel text-xs text-gray-600 uppercase mb-6 text-center">Systems Status — {stats.filter(s => s.online).length}/{stats.length} Online</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {stats.map(s => (
            <div key={s.label} className="space-y-2 bg-[#0e0e13] border-2 border-black p-3">
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 border border-black" style={{ backgroundColor: s.color }}></div>
                <span className="font-pixel text-[8px]" style={{ color: s.color }}>{s.online ? 'ON' : 'OFF'}</span>
              </div>
              <p className="font-pixel text-[5px] md:text-[6px] text-gray-500 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
//  FOOTER
// ═══════════════════════════════════════
function Footer() {
  return (
    <footer className="bg-[#0E0E13] w-full border-t-4 border-black mt-14 flex flex-col items-center py-8 md:py-10 px-4 space-y-5">
      <div className="text-[#E60012] font-pixel text-sm md:text-base uppercase tracking-tighter">COSMIC OBSERVER</div>
      <p className="font-pixel text-[5px] md:text-[7px] text-gray-600 text-center leading-relaxed uppercase max-w-xl">
        Spaceflight News API • NASA APOD • ISS Tracker • SpaceX API v4 • Open Notify • Launch Library 2 • NASA Exoplanet Archive
      </p>
      <p className="font-pixel text-[5px] text-gray-700 uppercase">© 198X-2024 COSMIC OBSERVER. ALL RIGHTS RESERVED.</p>
      <span className="material-symbols-outlined text-gray-700 text-2xl cursor-pointer hover:text-[#E60012]"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>keyboard_arrow_up</span>
    </footer>
  )
}

// ═══════════════════════════════════════
//  LOADING
// ═══════════════════════════════════════
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-[250px]">
      <div className="text-center space-y-4 bg-[#0e0e13] border-4 border-black block-shadow p-6 md:p-10">
        <div className="font-pixel text-sm text-[#FECB00] animate-blink">LOADING...</div>
        <div className="w-36 h-3 border-2 border-black bg-[#131318] mx-auto overflow-hidden">
          <div className="h-full bg-[#E60012] animate-pulse" style={{ width: '60%' }}></div>
        </div>
        <p className="font-headline text-xs text-gray-500 mt-1">CONNECTING TO 7 SPACE APIs</p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════
function App() {
  const [articles, setArticles] = useState([])
  const [apodImages, setApodImages] = useState([])
  const [issData, setIssData] = useState(null)
  const [spacexLatest, setSpacexLatest] = useState(null)
  const [spacexNext, setSpacexNext] = useState(null)
  const [rockets, setRockets] = useState([])
  const [crew, setCrew] = useState([])
  const [upcomingLaunches, setUpcomingLaunches] = useState([])
  const [exoplanets, setExoplanets] = useState([])
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [apiStatus, setApiStatus] = useState({
    spaceflight: false, nasa_apod: false, iss_tracker: false,
    spacex: false, open_notify: false, launch_library: false, exoplanet_archive: false,
  })

  const fetchISS = useCallback(() => {
    fetch(API.ISS_POSITION).then(r => r.json()).then(data => {
      setIssData(data)
      setApiStatus(prev => ({ ...prev, iss_tracker: true }))
    }).catch(() => {})
  }, [])

  useEffect(() => {
    Promise.allSettled([
      fetch(API.SPACEFLIGHT_NEWS).then(r => r.json()),
      fetch(API.NASA_APOD).then(r => r.json()),
      fetch(API.ISS_POSITION).then(r => r.json()),
      fetch(API.SPACEX_LATEST).then(r => r.json()),
      fetch(API.SPACEX_NEXT).then(r => r.json()),
      fetch(API.SPACEX_ROCKETS).then(r => r.json()),
      fetch(API.PEOPLE_IN_SPACE).then(r => r.json()),
      fetch(API.LAUNCH_UPCOMING).then(r => r.json()),
      fetch(API.EXOPLANETS).then(r => r.json()),
    ]).then(([newsRes, apodRes, issRes, sxLatestRes, sxNextRes, rocketsRes, crewRes, launchRes, exoRes]) => {
      if (newsRes.status === 'fulfilled' && newsRes.value.results) {
        setArticles(newsRes.value.results)
        setScore(prev => prev + newsRes.value.results.length * 500)
        setApiStatus(prev => ({ ...prev, spaceflight: true }))
      }
      if (apodRes.status === 'fulfilled') {
        const data = Array.isArray(apodRes.value) ? apodRes.value : [apodRes.value]
        if (!data[0]?.code) {
          setApodImages(data)
          setScore(prev => prev + 2000)
          setApiStatus(prev => ({ ...prev, nasa_apod: true }))
        }
      }
      if (issRes.status === 'fulfilled' && issRes.value.latitude) {
        setIssData(issRes.value)
        setApiStatus(prev => ({ ...prev, iss_tracker: true }))
      }
      if (sxLatestRes.status === 'fulfilled' && sxLatestRes.value.name) {
        setSpacexLatest(sxLatestRes.value)
        setScore(prev => prev + 1000)
        setApiStatus(prev => ({ ...prev, spacex: true }))
      }
      if (sxNextRes.status === 'fulfilled' && sxNextRes.value.name) {
        setSpacexNext(sxNextRes.value)
      }
      if (rocketsRes.status === 'fulfilled' && Array.isArray(rocketsRes.value)) {
        setRockets(rocketsRes.value)
      }
      if (crewRes.status === 'fulfilled' && crewRes.value.people) {
        setCrew(crewRes.value.people)
        setScore(prev => prev + crewRes.value.number * 100)
        setApiStatus(prev => ({ ...prev, open_notify: true }))
      }
      if (launchRes.status === 'fulfilled' && launchRes.value.results) {
        setUpcomingLaunches(launchRes.value.results)
        setScore(prev => prev + 1500)
        setApiStatus(prev => ({ ...prev, launch_library: true }))
      }
      if (exoRes.status === 'fulfilled' && Array.isArray(exoRes.value) && exoRes.value.length > 0) {
        setExoplanets(exoRes.value)
        setScore(prev => prev + exoRes.value.length * 300)
        setApiStatus(prev => ({ ...prev, exoplanet_archive: true }))
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchISS, 10000)
    return () => clearInterval(interval)
  }, [fetchISS])

  const handleStart = () => {
    setScore(prev => prev + 100)
    document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' })
  }

  const apiCount = Object.values(apiStatus).filter(Boolean).length

  return (
    <>
      <div className="crt-overlay"></div>
      <div className="pixel-stars"></div>

      <NavHud score={score} lives={3} apiCount={apiCount} />

      <main className="pt-14 md:pt-20">
        <HeroSection apod={apodImages} onStart={handleStart} peopleInSpace={crew.length} />
        <ISSRibbon issData={issData} />

        {/* MISSIONS */}
        <section id="missions" className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 my-14 md:my-20">
          <div className="flex items-end justify-between border-b-8 border-black pb-3">
            <h2 className="font-pixel text-base md:text-xl text-white uppercase">Latest Reports</h2>
            <span className="font-pixel text-[7px] text-gray-600">v5.0.0</span>
          </div>
          {loading ? <LoadingScreen /> : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {articles[0] && <ArticleCard article={articles[0]} variant="featured" index={0} />}
              {articles[1] && <ArticleCard article={articles[1]} variant="side" index={1} />}
              <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {articles.slice(2, 5).map((a, i) => <ArticleCard key={i} article={a} index={i} />)}
              </div>
            </div>
          )}
        </section>

        <LaunchesSection spacexLatest={spacexLatest} spacexNext={spacexNext} upcomingLaunches={upcomingLaunches} rockets={rockets} />
        <DeepSpaceScannerSection exoplanets={exoplanets} onAction={(pts) => setScore(s => s + pts)} />
        <CrewSection crew={crew} />
        <GallerySection apodImages={apodImages} articles={articles} />
        <ReplaySection articles={articles} />
        <SystemStats apiStatus={apiStatus} />
      </main>

      <Footer />
    </>
  )
}

export default App
