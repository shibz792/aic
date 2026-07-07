import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const contactEmail = 'khalid@aicatlyst.com'
const groupLine = 'A Knights Move Consulting Group Company'
const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`
const logoSrc = assetPath('aicatlyst-logo-true.png')
const heroImageSrc = assetPath('hero-image.png')
const contactImageSrc = assetPath('contact-image.png')
const strategyImageSrc = assetPath('strategy-image.png')

const routes = [
  ['Home', 'home'],
  ['Strategy', 'strategy'],
  ['Solutions', 'solutions'],
  ['Contact', 'contact'],
]

const meta = {
  home: {
    pageTitle: 'AI Catlyst | Home',
    eyebrow: 'A Knights Move Consulting Group Company',
    title: 'Crisis-Proof Strategy. Exceptional Delivery. ',
    accent: 'Exponential Bottom-Line Growth.',
    text: 'We focus entirely on the foundational health of your business first. By anchoring our solutions in immediate growth, structural efficiencies, and rapid ROI, we ensure next-gen AI implementation remains accessible and highly affordable for businesses of any size. When market crisis hits, our systems protect your capital.',
    cta: 'Talk to Our Experts',
  },
  strategy: {
    pageTitle: 'AI Catlyst | Strategy',
    eyebrow: 'Your Business Growth with AI',
    title: 'Crisis-Proof, Future-Proof Application of AI for ',
    accent: 'Optimal Results.',
    text: 'We analyze your business layout first, deploying AI to accelerate growth and manufacture rapid efficiencies.',
    cta: 'View solutions',
  },
  solutions: {
    pageTitle: 'AI Catlyst | Solutions',
    eyebrow: 'Immediate Growth & Efficiencies',
    title: '',
    accent: 'Ready to Deploy Solutions',
    text: 'Strategy handles the complex architecture; our ready-to-run solutions deliver immediate, practical outcomes.',
    cta: 'Explore solutions',
  },
  contact: {
    pageTitle: 'AI Catlyst | Contact',
    eyebrow: 'Contact Our Experts',
    title: '',
    accent: 'Take Action Today',
    text: 'Speak with our experts and find out how we can simplify your operations, reduce pressure, and support smarter growth.',
    cta: 'Talk to Our Experts',
  },
}

const triad = [
  ['01', 'The Foundation: Business Leaders', "Multi-industry veterans who natively navigate market volatility, complex corporate cash flows, and tight operational cost structures. We don't guess your business, we leverage your internal experts and apply rigorous financial discipline to build affordable roadmaps that scale businesses of any size."],
  ['02', 'The Delivery: Solution Transformers', 'Master enterprise architects who map processes, eliminate operational friction, and guarantee completely seamless, non-disruptive integration workflows into your current software infrastructure.'],
  ['03', 'The Catalyst: Next-Gen Technologists', 'Engineers focused purely on the pragmatic monetization of cutting-edge tech. We design autonomous digital tools, structured LLMs, and intelligent AI data systems built for rapid bottom-line results.'],
]

const advisory = [
  ['Business Assessment & AI Roadmap Architecture', 'We begin by deeply auditing your operations to locate immediate opportunities for growth and cost reduction. From there, our architects build a highly effective, capital-efficient deployment roadmap utilizing cutting-edge technology and tailored AI systems designed to deliver bottom-line value as quickly as possible.', 'End-to-End Operational Friction Report, Actionable AI Deployment Matrix, and Accelerated ROI Roadmap.'],
  ['Workflow & Operational Audits', 'We map your manual resource drags and hidden cost leakages first. Our Solution Transformers then connect your legacy databases with automated AI capabilities, designing the secure AI layer around legacy systems without interrupting your daily operations.', 'Target Operating Model Design, Automated Workflow Schematics, and System Integration Protocols.'],
  ['Corporate AI Governance & Risk Frameworks', 'Ethical execution protects your downside during rapid scaling. We design robust corporate AI policies, data compliance guardrails, and risk mitigation frameworks tailored to your regulatory landscape. We ensure your proprietary enterprise data remains completely secure and fully compliant with emerging industry standards.', 'Custom Corporate AI Blueprint, Data Privacy & Security Guardrails, and Executive Compliance Sign-off.'],
]

const solutions = [
  ['AIC Sales Grow', 'Sales Grow', 'Automated Sales Tracking & Lead Management', "Stops your sales team from wasting hours on manual CRM data entry. By securely connecting to your team's day-to-day communication stack, the system automatically reads incoming inquiries, creates customer profiles, scores lead interest, and instantly drafts tailored replies. It cuts down expensive software clutter and accelerates your pipeline without expanding headcount.", 'growth'],
  ['AIC Media Grow', 'Media Grow', 'Instant Marketing & Ad Creation', 'Replaces slow, high-cost marketing studio production with rapid, high-margin software processing power. Simply input a link to a high-performing industry benchmark, and the system forensically analyzes why it works, writing fresh scripts, generating realistic voiceovers, assembling video variations, and dropping production-ready drafts straight into your campaign ad manager instantly.', 'growth'],
  ['AIC Web Moderniser', 'Web Moderniser', 'Next-Gen B2B Website Redesign & Optimization', 'Transforms your slow corporate website into a premium, high-converting digital storefront built for the New Zealand market. Engineered to strip out clunky legacy code, implement lightning-fast layouts, and map smart customer journeys that turn casual clicks into immediate, qualified business leads without relying on ongoing developer fees.', 'growth'],
  ['AIC Qual Leads', 'Qual Leads', 'Automated High-Conversion Lead Generation', 'Delivers ready-to-buy prospects straight to your pipeline without the stress of cold-calling. Once you input your exact target profile and highly convertible audience parameters, the system automatically crawls public records, open networks, and business indices to filter out noise, providing fully verified, highly qualified sales leads built to convert immediately.', 'growth'],
  ['AIC Lead Magnet LinkedIn', 'Lead Magnet LinkedIn', 'LinkedIn Outreach & Social Selling Automation', 'Builds a high-volume LinkedIn prospecting engine for B2B teams. The system organizes audience targeting, AI-personalized outreach, campaign sequencing, reply management, performance analytics, A/B testing, and CRM handoff so your pipeline grows without manual profile-by-profile chasing.', 'growth'],
  ['AIC Comms Grow', 'Comms Grow', 'Searchable Corporate Memory & Task Tracker', 'Prevents crucial details and client decisions from vanishing the second a meeting ends. The system securely logs internal and external discussions to build a private, fully searchable memory engine for your managers. It automatically extracts project commitments, sets interactive tracking tasks, and ensures client handover data is never lost when staff members leave.', 'efficiency'],
  ['AIC Fin Master', 'Fin Master', 'Continuous Live Expense Auditing & Cash Flow Forecaster', 'Acts as a continuous Digital CFO to eliminate operational blindspots. The system scans bank accounts and financial entries every 6 hours to catch administrative overcharges or fraud immediately, alerts the team via Slack in plain English, runs advanced cash flow projections, and drafts professional, investor-ready updates in seconds.', 'efficiency'],
  ['AIC Data Access', 'Data Access', 'Real-Time Enterprise Answers & Search Hub', "Safely links your company's records, operational archives, and historical documentation into one clear interface. Allows leadership and staff to instantly search corporate information and pull up accurate, decision-ready answers in seconds, completely removing operational friction and saving hours of administrative searching.", 'efficiency'],
]

const solutionIcons = ['pipeline', 'media', 'web', 'lead', 'linkedin', 'memory', 'finance', 'search']

const journey = [
  ['Audit', 'Locate growth opportunities, cash leakage, manual drag, and duplicated software spend.'],
  ['Architect', 'Build the AI operating layer around your current business knowledge, data, and teams.'],
  ['Deploy', 'Launch focused systems with integration support, governance, and measurable ROI signals.'],
  ['Compound', 'Turn every workflow improvement into reusable intelligence across sales, finance, operations, and leadership.'],
]

function splitLead(text) {
  const idx = text.indexOf('. ')
  if (idx === -1) return [text, '']
  return [text.slice(0, idx + 1), text.slice(idx + 2)]
}

function splitList(text) {
  return text.replace(/\.$/, '').split(/,\s*(?:and\s+)?/).map((item) => item.trim()).filter(Boolean)
}

function getRoute() {
  const slug = window.location.hash.replace('#/', '').replace('#', '').split('?')[0] || 'home'
  if (slug === 'platform') return 'strategy'
  return meta[slug] ? slug : 'home'
}

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

function Reveal({ children, delay = 0, as = 'div', className = '' }) {
  const [ref, inView] = useInView()
  const Tag = as
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'in-view' : ''} ${className}`} style={{ '--delay': `${delay}s` }}>
      {children}
    </Tag>
  )
}

function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <span className="ambient-blob ambient-a" />
      <span className="ambient-blob ambient-b" />
      <span className="ambient-blob ambient-c" />
    </div>
  )
}

function App() {
  const [route, setRoute] = useState(getRoute)
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [initialInquirySolution, setInitialInquirySolution] = useState('')
  const [inquiryVersion, setInquiryVersion] = useState(0)
  const activeMeta = meta[route]

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute())
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = activeMeta.pageTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', activeMeta.text)
  }, [activeMeta])

  const openInquiry = (solution = '') => {
    setInitialInquirySolution(solution)
    setInquiryVersion((version) => version + 1)
    setInquiryOpen(true)
  }

  return (
    <div className="site-shell">
      <AmbientBackground />
      <Header active={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} openInquiry={openInquiry} />
      <main>
        {route === 'home' && <HomePage openInquiry={openInquiry} />}
        {route === 'strategy' && <StrategyPage openInquiry={openInquiry} />}
        {route === 'solutions' && <SolutionsPage openInquiry={openInquiry} />}
        {route === 'contact' && <ContactPage openInquiry={openInquiry} />}
      </main>
      <Footer openInquiry={openInquiry} />
      <InquiryModal key={inquiryVersion} open={inquiryOpen} initialSolution={initialInquirySolution} onClose={() => setInquiryOpen(false)} />
    </div>
  )
}

function Header({ active, menuOpen, setMenuOpen, openInquiry }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMobileInquiry = () => {
    setMenuOpen(false)
    openInquiry()
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a className={`brand ${active === 'home' ? 'brand-home' : ''}`} href="#/home" aria-label="AI Catlyst home">
          <img src={logoSrc} alt="AI Catlyst" className="brand-mark" width="220" height="61" loading="eager" decoding="async" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {routes.map(([label, slug]) => <a key={slug} className={active === slug ? 'active' : ''} href={`#/${slug}`}>{label}</a>)}
        </nav>
        <div className="header-action">
          <span>Driving Growth & Efficiencies with AI</span>
          <button type="button" className="button primary compact" onClick={() => openInquiry()}>Contact experts</button>
        </div>
        <button className="menu-button" type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
          <button className="menu-close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
          <div className="mobile-logo">
            <img src={logoSrc} alt="AI Catlyst" width="200" height="55" loading="lazy" decoding="async" />
          </div>
          {routes.map(([label, slug]) => <a key={slug} href={`#/${slug}`}>{label}</a>)}
          <button type="button" className="button primary" onClick={openMobileInquiry}>Contact experts</button>
        </div>
      )}
    </>
  )
}

function HomePage({ openInquiry }) {
  return (
    <>
      <Hero route="home" visual={<HomeVisual />} openInquiry={openInquiry} />
      <Triad />
      <OperatingJourney />
      <SolutionsPreview openInquiry={openInquiry} />
      <ExpertPartnership />
      <HomeCta openInquiry={openInquiry} />
    </>
  )
}

function StrategyPage({ openInquiry }) {
  return (
    <>
      <Hero route="strategy" visual={<StrategyVisual />} openInquiry={openInquiry} compact />
      <section className="section strategy-advisory-section">
        <div className="wrapper">
          <SectionHeader title="Strategy before software." text="Premium, outcome-led corporate consulting focused on bottom-line results, fast deployment, and risk mitigation." />
          <div className="advisory-grid">
            {advisory.map(([title, text, deliverable], index) => <AdvisoryCard key={title} title={title} text={text} deliverable={deliverable} index={index} />)}
          </div>
        </div>
      </section>
      <StrategySequencer />
      <GovernanceLab />
      <StrategyCta openInquiry={openInquiry} />
    </>
  )
}

function SolutionsPage({ openInquiry }) {
  return (
    <>
      <Hero route="solutions" visual={<SystemsMap />} openInquiry={openInquiry} compact />
      <section className="section solutions-section" id="solutions-groups">
        <div className="wrapper">
          <SectionHeader title="Plug-and-play business tools built to drive growth immediately instead of software overhead." text="Maintain a flexible, balanced grid of fast-acting operational tools built to erase manual tasks and deliver immediate monthly savings." />
          <SolutionsGroups openInquiry={openInquiry} />
          <div className="bespoke-note">
            <strong>Need something custom?</strong>
            <p>We also design bespoke or customised solutions for any business issue that can&rsquo;t be solved by the eight systems. We will continue expanding the library with more solutions in the future.</p>
          </div>
        </div>
      </section>
      <SolutionSelector />
      <ImplementationSprint />
      <SolutionsCta openInquiry={openInquiry} />
    </>
  )
}

function ContactPage({ openInquiry }) {
  return (
    <>
      <Hero route="contact" visual={<ContactVisual />} openInquiry={openInquiry} compact />
      <ContactFaq />
    </>
  )
}

const contactFaqs = [
  ['How quickly can we get started?', "We start with a short conversation to understand where the pressure sits in your business, then move at whatever pace makes sense for you."],
  ['Do I need to know exactly what I want first?', "No. Most people start with a general sense of the problem, pipeline, cost, or workflow, and we help narrow it down together."],
  ['What size businesses do you work with?', 'Our systems are built to scale from small teams to larger operations, so you only pay for what you actually need.'],
  ['Is this a long contract?', "We scope every engagement around outcomes, not lock-in. You'll always know what you're committing to before you start."],
]

function ContactFaq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section contact-faq-section">
      <div className="wrapper">
        <SectionHeader title="Common questions." />
        <div className="faq-list">
          {contactFaqs.map(([question, answer], index) => {
            const isOpen = open === index
            return (
              <div className={`faq-row ${isOpen ? 'open' : ''}`} key={question}>
                <button type="button" className="faq-question" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span>{question}</span>
                  <b aria-hidden="true">{isOpen ? '−' : '+'}</b>
                </button>
                {isOpen && <p className="faq-answer">{answer}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Hero({ route, visual, compact = false, openInquiry }) {
  const page = meta[route]
  const primaryIsInquiry = route !== 'solutions'
  return (
    <section className={`hero ${compact ? 'compact' : ''} hero-${route}`}>
      <div className="hero-glow" />
      <div className="wrapper hero-inner">
        <div className="hero-copy">
          <h1>
            {page.accent && page.title && <span className="title-lead">{page.title}</span>}
            {!page.accent && page.title}
            {page.accent && <span className="title-accent">{page.accent}</span>}
          </h1>
          <p>{page.text}</p>
          <div className="actions">
            {route === 'strategy' ? (
              <a className="button primary" href="#/solutions">View solutions</a>
            ) : (
              <>
                {primaryIsInquiry
                  ? <button className="button primary" type="button" onClick={() => openInquiry()}>{page.cta}</button>
                  : <a className="button primary" href="#solutions-groups">{page.cta}</a>}
                {route === 'solutions'
                  ? <button className="button secondary" type="button" onClick={() => openInquiry()}>Talk to experts</button>
                  : <a className="button secondary" href="#/solutions">View solutions</a>}
              </>
            )}
          </div>
        </div>
        <div className="hero-visual">{visual}</div>
      </div>
    </section>
  )
}

function SectionHeader({ title, text }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

const triadTones = ['indigo', 'blue', 'violet']
const triadIcons = ['target', 'workflow', 'node']

function Triad() {
  return (
    <section className="section triad-section">
      <div className="wrapper triad-layout">
        <div className="triad-intro">
          <h2>The Core Triad.</h2>
          <p>Business transformation requires commercial discipline, enterprise architecture, and next-gen technology working as one integrated delivery system.</p>
        </div>
        <div className="triad-list">
          {triad.map(([, title, text], index) => {
            const [kicker, role] = title.split(/:\s+/)
            const [lead, rest] = splitLead(text)
            return (
              <Reveal as="article" delay={index * 0.12} className={`triad-row tone-${triadTones[index]}`} key={title}>
                <div className="triad-row-head">
                  <i><Icon name={triadIcons[index]} /></i>
                  <div>
                    <span className="triad-tag">{kicker}</span>
                    <h3>{role}</h3>
                  </div>
                </div>
                <p><strong>{lead}</strong> {rest}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function OperatingJourney() {
  return (
    <section className="section journey-section">
      <div className="wrapper">
        <SectionHeader title="Operating Journey" />
        <Reveal className="journey-track">
          <div className="journey-line" />
          <div className="journey-steps">
            {journey.map(([title, text], index) => (
              <article key={title} style={{ '--step': index }}>
                <span className="journey-circle">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ExpertPartnership() {
  return (
    <section className="section validation-section">
      <div className="wrapper validation-panel">
        <div>
          <h2>Sector-Agnostic by Design. Expert-Driven by Partnership.</h2>
        </div>
        <div>
          <p>We do not claim to understand your unique daily market mechanics better than you do. Instead, we rely completely on the reliable insights of your own internal domain experts, the leaders who intimately understand your customers and specific legacy operational bottlenecks.</p>
          <p>Our core mastery is injecting world-class commercial strategy, flawless solutions architecture, and next-gen AI tools around your specific knowledge base. We audit your existing processes to manufacture unshakeable bottom-line efficiencies and secure quick, measurable ROI.</p>
        </div>
      </div>
    </section>
  )
}

function StrategySequencer() {
  return (
    <section className="section strategy-lane-section">
      <div className="wrapper strategy-lane">
        <SectionHeader title="Every recommendation moves through a clear decision lane." text="A premium AI roadmap should be easy for leadership to understand, fund, and sequence." />
        <Reveal><StrategyDecisionMatrix /></Reveal>
      </div>
    </section>
  )
}

const governancePillars = [
  ['target', 'Human approval', 'Nothing ships without a person signing off on the outcome.'],
  ['shield', 'Data privacy', 'Encrypted access paths keep sensitive records visible only to the people who need them.'],
  ['node', 'Access roles', 'Team-level visibility means each person sees only what their role requires.'],
  ['check', 'Compliance evidence', 'Every decision is logged, so audits and executive sign-off are straightforward.'],
]

function GovernanceLab() {
  return (
    <section className="section governance-lab-section">
      <div className="wrapper governance-lab">
        <div className="governance-lab-intro">
          <div>
            <h2>Governance that keeps AI useful, secure, and commercially accountable.</h2>
          </div>
          <div>
            <p>{advisory[2][1]}</p>
          </div>
        </div>
        <div className="governance-pillars">
          {governancePillars.map(([icon, title, text]) => (
            <article key={title} className="governance-pillar">
              <i><Icon name={icon} /></i>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionsPreview({ openInquiry }) {
  const [active, setActive] = useState(null)
  return (
    <section className="section">
      <div className="wrapper">
        <div className="section-split">
          <SectionHeader title="Ready to Deploy Solutions" text="Strategy handles the complex architecture; our ready-to-run solutions deliver immediate, practical outcomes. Tap a system to see what it does." />
          <a className="button secondary" href="#/solutions">Explore all systems</a>
        </div>
        <div className="solution-chip-grid">
          {solutions.map((item, index) => (
            <button type="button" className="solution-chip" key={item[0]} onClick={() => setActive(item)}>
              <i><Icon name={solutionIcons[index] || 'node'} /></i>
              <strong>{item[0]}</strong>
              <em>{item[2]}</em>
              <b className="solution-chip-plus" aria-hidden="true">+</b>
            </button>
          ))}
        </div>
      </div>
      <SolutionInfoModal item={active} onClose={() => setActive(null)} openInquiry={openInquiry} />
    </section>
  )
}

function AdvisoryCard({ title, text, deliverable, index }) {
  const [lead, rest] = splitLead(text)
  const iconName = ['target', 'workflow', 'shield'][index] || 'node'
  return (
    <article className="advisory-card">
      <i className="advisory-icon"><Icon name={iconName} /></i>
      <h3>{title}</h3>
      <p><strong>{lead}</strong> {rest}</p>
      <div className="advisory-deliverable">
        <span>Deliverables</span>
        <ul className="advisory-chip-list">
          {splitList(deliverable).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </article>
  )
}

function SolutionCard({ item, index, openInquiry }) {
  const [name, system, purpose, text] = item
  const iconName = solutionIcons[index] || 'node'
  const [lead, rest] = splitLead(text)

  return (
    <article className="solution-card">
      <div className="solution-top">
        <i><Icon name={iconName} /></i>
        <span className="solution-system-chip">{system}</span>
      </div>
      <h3>{name}</h3>
      <p className="solution-purpose-line">{purpose}</p>
      <p className="solution-benefit-line">{lead}</p>
      {rest && <p className="solution-detail-line">{rest}</p>}
      <button type="button" className="solution-link" onClick={() => openInquiry(name)}>
        Deploy {system}
        <Icon name="arrow" />
      </button>
    </article>
  )
}

function CategoryBanner({ title, text, count, tone, icon }) {
  return (
    <div className={`category-banner tone-${tone}`}>
      <div className="category-banner-icon"><Icon name={icon} /></div>
      <div className="category-banner-copy">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <span className="category-banner-count">{count} systems</span>
    </div>
  )
}

function SolutionsGroups({ openInquiry }) {
  const groups = [
    { key: 'growth', title: 'Growth', text: 'Systems that help you bring in more business.', icon: 'lead' },
    { key: 'efficiency', title: 'Efficiency', text: 'Systems that save time and reduce cost.', icon: 'finance' },
  ]
  return (
    <div className="solutions-groups">
      {groups.map((group) => {
        const items = solutions.filter((item) => item[4] === group.key)
        return (
          <div className={`solutions-group tone-${group.key}`} key={group.key}>
            <CategoryBanner title={group.title} text={group.text} count={items.length} tone={group.key} icon={group.icon} />
            <div className="solution-grid">
              {items.map((item, i) => {
                const index = solutions.indexOf(item)
                return (
                  <Reveal as="div" delay={i * 0.06} key={item[0]}>
                    <SolutionCard item={item} index={index} openInquiry={openInquiry} />
                  </Reveal>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SolutionSelector() {
  const pressureMap = [
    ['Revenue', 'Sales Grow, Qual Leads, Lead Magnet LinkedIn', 'Pipeline speed', 'pipeline'],
    ['Marketing', 'Media Grow, Web Moderniser', 'Campaign output', 'media'],
    ['Operations', 'Comms Grow, Data Access', 'Workflow memory', 'workflow'],
    ['Finance', 'Fin Master', 'Expense control', 'finance'],
  ]

  return (
    <section className="section solution-selector-section">
      <div className="wrapper selector-panel">
        <div>
          <h2>Pick the business pressure. The right system becomes obvious.</h2>
        </div>
        <div className="solution-fit-board">
          <div className="fit-board-head">
            <span>Business pressure</span>
            <span>Matched AIC systems</span>
            <span>Operating outcome</span>
          </div>
          {pressureMap.map(([title, systems, outcome, icon]) => (
            <article className="fit-row" key={title}>
              <div>
                <Icon name={icon} />
                <h3>{title}</h3>
              </div>
              <p>{systems}</p>
              <strong>{outcome}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImplementationSprint() {
  return (
    <section className="section risk-section">
      <div className="wrapper risk-banner sprint-banner">
        <div className="risk-banner-copy">
          <h2>How We Roll It Out</h2>
          <p>Every new system launches with a careful, hands-on rollout. Our Solution Transformers manage all integration points directly, ensuring zero legacy system downtime and verified data security pipelines.</p>
        </div>
        <RiskGovernanceVisual />
      </div>
    </section>
  )
}

function CtaVisual() {
  const particles = Array.from({ length: 8 }, (_, i) => i + 1)
  return (
    <div className="cta-visual" aria-hidden="true">
      <div className="cta-visual-blob blob-a" />
      <div className="cta-visual-blob blob-b" />
      <svg className="cta-wave" viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="cta-wave-track" d="M0,112 C40,64 72,142 112,92 C152,42 182,120 222,72 C252,36 282,88 320,58" />
        <path className="cta-wave-pulse" d="M0,112 C40,64 72,142 112,92 C152,42 182,120 222,72 C252,36 282,88 320,58" />
      </svg>
      {particles.map((i) => <span key={i} className={`cta-particle p-${i}`} />)}
    </div>
  )
}

function HomeCta({ openInquiry }) {
  return (
    <section className="section">
      <div className="wrapper cta-panel cta-panel-visual">
        <div className="cta-panel-content">
          <h2>Ready to Put AI to Work for Your Business?</h2>
          <p>No complexity, no confusion. Just direct growth and real cost-savings, engineered by seasoned specialists.</p>
          <button className="button primary" type="button" onClick={() => openInquiry()}>Talk to Our Experts</button>
        </div>
        <CtaVisual />
      </div>
    </section>
  )
}

function StrategyCta() {
  return (
    <section className="section">
      <div className="wrapper cta-panel strategy-cta">
        <div>
          <p>{meta.strategy.text}</p>
        </div>
      </div>
    </section>
  )
}

function SolutionsCta({ openInquiry }) {
  return (
    <section className="section">
      <div className="wrapper cta-panel solutions-cta">
        <div>
          <h2>Choose the area of your business creating the most pressure, and we'll help you find the right system to improve it.</h2>
          <p>{meta.solutions.text}</p>
        </div>
        <button className="button primary" type="button" onClick={() => openInquiry()}>Talk to experts</button>
      </div>
    </section>
  )
}

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }
  const paths = {
    pipeline: <><path d="M4 6h5l2 3h9" /><path d="M4 18h5l2-3h9" /><path d="M4 12h16" /></>,
    media: <><path d="M5 5h14v14H5z" /><path d="m10 9 5 3-5 3z" /></>,
    web: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c3 3 3 15 0 18" /><path d="M12 3c-3 3-3 15 0 18" /></>,
    lead: <><path d="M4 19c1.8-4 5-6 8-6s6.2 2 8 6" /><circle cx="12" cy="8" r="4" /><path d="m17 5 2-2" /></>,
    linkedin: <><path d="M5 9v10" /><path d="M5 5v.01" /><path d="M10 19v-7c0-2 1.2-3 3-3s3 1.2 3 3v7" /><path d="M10 9v10" /></>,
    memory: <><path d="M8 4h8v16H8z" /><path d="M4 8h4M4 12h4M4 16h4M16 8h4M16 12h4M16 16h4" /></>,
    finance: <><path d="M4 18V6" /><path d="M4 18h16" /><path d="m7 15 3-4 3 2 4-6" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /><path d="M8 10h5" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    node: <><circle cx="6" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="m8 11 8-4" /><path d="m8 13 8 4" /></>,
    shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" /><path d="m9 12 2 2 4-5" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" /></>,
    workflow: <><path d="M5 6h5v5H5z" /><path d="M14 13h5v5h-5z" /><path d="M10 8h3a3 3 0 0 1 3 3v2" /></>,
    camera: <><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></>,
    spark: <path d="M12 2c.9 4.2 2.9 6.2 7 7-4.1.9-6.1 2.9-7 7-.9-4.1-2.9-6.1-7-7 4.1-.8 6.1-2.8 7-7Z" fill="currentColor" stroke="none" />,
    chevron: <path d="M6 9l6 6 6-6" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  }
  return <svg className="icon" {...common}>{paths[name] || paths.node}</svg>
}

function HomeVisual() {
  return (
    <div className="home-hero-visual">
      <img src={heroImageSrc} alt="Diverse, confident founders and business owners supported by AI" width="1258" height="959" loading="eager" decoding="async" />
    </div>
  )
}

function StrategyVisual() {
  return (
    <div className="strategy-hero-visual">
      <img src={strategyImageSrc} alt="AI Catlyst strategists reviewing a roadmap and ROI metrics with a client team" width="1424" height="819" loading="eager" decoding="async" />
    </div>
  )
}

function SystemsMap() {
  const growthCount = solutions.filter(([, , , , tone]) => tone === 'growth').length
  const efficiencyCount = solutions.length - growthCount
  return (
    <div className="visual-panel systems-growth">
      <div className="growth-header">
        <span className="growth-header-icon"><Icon name="spark" /></span>
        AI Systems Impact
      </div>
      <div className="growth-chart">
        {solutions.map(([name, , , , tone], index) => (
          <span
            key={name}
            className={`growth-bar tone-${tone}`}
            style={{ '--h': `${34 + index * 8}%`, '--i': index }}
          />
        ))}
      </div>
      <div className="growth-legend">
        <span className="legend-item tone-growth" style={{ flex: growthCount }}><i />Growth</span>
        <span className="legend-item tone-efficiency" style={{ flex: efficiencyCount }}><i />Efficiency</span>
      </div>
    </div>
  )
}

function FlowFan({ points, direction }) {
  return (
    <div className="flow-fan" aria-hidden="true">
      <svg viewBox="0 0 100 64" preserveAspectRatio="none">
        {points.map((x, index) => {
          const d = direction === 'in' ? `M${x},0 L50,64` : `M50,0 L${x},64`
          return (
            <g key={x}>
              <path className="flow-fan-track" d={d} vectorEffect="non-scaling-stroke" />
              <path className="flow-fan-pulse" d={d} vectorEffect="non-scaling-stroke" style={{ animationDelay: `${index * 0.18}s` }} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function StrategyDecisionMatrix() {
  const inputs = ['Pressure', 'ROI score', 'Risk gate', 'Launch order']
  const outputs = ['Growth value', 'Cost removal', 'Risk exposure']
  const inXs = inputs.map((_, index) => ((index + 0.5) / inputs.length) * 100)
  const outXs = outputs.map((_, index) => ((index + 0.5) / outputs.length) * 100)
  return (
    <div className="decision-matrix roadmap-cockpit" aria-hidden="true">
      <span className="cockpit-label">Signals in</span>
      <div className="cockpit-lane">
        {inputs.map((item, index) => (
          <span key={item} style={{ '--step': index }}><b>{String(index + 1).padStart(2, '0')}</b>{item}</span>
        ))}
      </div>
      <FlowFan points={inXs} direction="in" />
      <div className="cockpit-core">
        <Icon name="target" />
        <strong>Roadmap engine</strong>
        <small>ranked investment sequence</small>
      </div>
      <FlowFan points={outXs} direction="out" />
      <span className="cockpit-label">Prioritized output</span>
      <div className="cockpit-bars">
        {outputs.map((item, index) => (
          <span key={item}><small>{item}</small><i><b style={{ '--score': `${86 - index * 14}%` }} /></i></span>
        ))}
      </div>
    </div>
  )
}

function RiskGovernanceVisual() {
  const steps = [
    ['Scope', 'Integration boundaries'],
    ['Secure', 'Data pipeline checks'],
    ['Govern', 'Approval controls'],
    ['Launch', 'Zero downtime'],
  ]
  return (
    <div className="risk-governance-visual" aria-hidden="true">
      <span className="risk-visual-label">
        <Icon name="shield" />
        Secure, guided launch
      </span>
      <div className="risk-steps">
        {steps.map(([title, text], index) => (
          <div className="risk-step" key={title}>
            <i>{String(index + 1).padStart(2, '0')}</i>
            <div>
              <strong>{title}</strong>
              <small>{text}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactVisual() {
  return (
    <div className="contact-panel">
      <div className="contact-glow" />
      <img
        className="contact-image"
        src={contactImageSrc}
        alt="A diverse team of AI Catlyst experts, ready to help with your business"
        width="1187"
        height="719"
        loading="eager"
        decoding="async"
      />
    </div>
  )
}

function SolutionInfoModal({ item, onClose, openInquiry }) {
  useEffect(() => {
    if (!item) return undefined
    document.body.classList.add('modal-open')
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  if (!item) return null
  const [name, system, purpose, text] = item

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="solution-info-title">
      <button className="modal-backdrop" type="button" aria-label="Close" onClick={onClose} />
      <div className="modal-panel solution-info-panel">
        <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>×</button>
        <span className="solution-system-chip">{system}</span>
        <h2 id="solution-info-title">{name}</h2>
        <p className="solution-info-purpose">{purpose}</p>
        <p>{text}</p>
        <div className="modal-actions solution-info-actions">
          <button className="button primary" type="button" onClick={() => { onClose(); openInquiry(name) }}>Deploy {system}</button>
        </div>
      </div>
    </div>
  )
}

function InquiryModal({ open, initialSolution, onClose }) {
  const [selected, setSelected] = useState(() => initialSolution ? [initialSolution] : [])
  const [note, setNote] = useState('')
  const solutionNames = useMemo(() => solutions.map(([name]) => name), [])

  useEffect(() => {
    if (!open) return undefined
    document.body.classList.add('modal-open')
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const toggle = (name) => {
    setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  }

  const submit = (event) => {
    event.preventDefault()
    const body = [
      'Hello AI Catlyst team,',
      '',
      'I would like to discuss the following solution interest:',
      selected.length ? selected.join(', ') : 'Not specified',
      '',
      'Notes:',
      note.trim() || 'No additional notes added.',
      '',
      'Please contact me to arrange the next step.',
    ].join('\n')
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent('AI Catlyst solution inquiry')}&body=${encodeURIComponent(body)}`
    onClose()
  }

  if (!open) return null

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
      <button className="modal-backdrop" type="button" aria-label="Close inquiry" onClick={onClose} />
      <form className="modal-panel" onSubmit={submit}>
        <button className="modal-close" type="button" aria-label="Close inquiry" onClick={onClose}>×</button>
        <h2 id="inquiry-title">What solutions are you looking for?</h2>
        <p>Select the systems you want to discuss and add a short note. We will open your email client with everything ready to send.</p>
        <div className="inquiry-options">
          {solutionNames.map((name) => (
            <label key={name} className={selected.includes(name) ? 'selected' : ''}>
              <input type="checkbox" checked={selected.includes(name)} onChange={() => toggle(name)} />
              <span>{name}</span>
            </label>
          ))}
        </div>
        <label className="note-field">
          <span>Notes</span>
          <textarea value={note} onChange={(event) => setNote(event.target.value)} rows="5" placeholder="Tell us what you want to improve, automate, or understand first." />
        </label>
        <div className="modal-actions">
          <button className="button secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="button primary" type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

function Footer({ openInquiry }) {
  return (
    <footer className="site-footer">
      <div className="wrapper footer-grid">
        <div>
          <div className="footer-logo-row">
            <img src={logoSrc} alt="AI Catlyst" width="170" height="47" loading="lazy" decoding="async" />
          </div>
          <p>{groupLine}</p>
          <p>Driving Growth & Efficiencies with AI for businesses that need practical strategy, rapid deployment, and measurable bottom-line outcomes.</p>
        </div>
        <nav aria-label="Footer navigation">
          <span>Explore</span>
          {routes.map(([label, slug]) => <a key={slug} href={`#/${slug}`}>{label}</a>)}
        </nav>
        <nav aria-label="Footer solutions">
          <span>Solutions</span>
          {solutions.slice(0, 5).map(([name]) => <a key={name} href="#/solutions">{name}</a>)}
        </nav>
        <div className="footer-contact">
          <span>Get in touch</span>
          <button type="button" onClick={() => openInquiry()}>Talk to Our Experts</button>
        </div>
      </div>
      <div className="wrapper footer-legal">
        <small className="footer-legal-left">© 2026 AI Catlyst Ltd. All Rights Reserved.</small>
        <small className="footer-legal-center"><a className="footer-legal-brand-link" href="https://knightsmoveconsulting.com/" target="_blank" rel="noreferrer">A Knights Move Consulting Group Company</a></small>
        <small className="footer-legal-right">Powered by <a className="footer-legal-plain-link" href="https://levatahq.com" target="_blank" rel="noreferrer">Levata</a></small>
      </div>
    </footer>
  )
}

createRoot(document.getElementById('root')).render(<App />)
