import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const contactEmail = 'khalid@aicatlyst.com'
const groupLine = 'A Knights Move Consulting Group Co.'
const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`

const routes = [
  ['Home', 'home'],
  ['Strategy', 'strategy'],
  ['Solutions', 'solutions'],
  ['Platform', 'platform'],
  ['Contact', 'contact'],
]

const meta = {
  home: {
    pageTitle: 'AI Catlyst | Home',
    eyebrow: 'A Knights Move Consulting Group Company',
    title: 'Crisis-Proof Strategy. Exceptional Delivery. Exponential Bottom-Line Growth.',
    text: 'We focus entirely on the foundational health of your business first. By anchoring our solutions in immediate growth, structural efficiencies, and rapid ROI, we ensure next-gen AI implementation remains accessible and highly affordable for businesses of any size. When market crisis hits, our systems protect your capital.',
    cta: 'Contact Our Experts to Transform Your Business Today',
  },
  strategy: {
    pageTitle: 'AI Catlyst | Strategy',
    eyebrow: 'Your Business Growth with AI',
    title: 'Crisis-Proof, Future-Proof Application of AI for Optimal Results.',
    text: 'We analyze your business layout first, deploying AI to accelerate growth and manufacture rapid efficiencies.',
    cta: 'Architect the roadmap',
  },
  solutions: {
    pageTitle: 'AI Catlyst | Solutions',
    eyebrow: 'Immediate Growth & Efficiencies',
    title: 'Scalable Intelligence to Drive Growth and Efficiencies. Subscribed!',
    text: 'Strategy handles the complex architecture; our ready-to-run solutions deliver immediate, practical outcomes.',
    cta: 'Explore solutions',
  },
  platform: {
    pageTitle: 'AI Catlyst | Platform',
    eyebrow: 'Workflow Architecture',
    title: 'Interoperable systems architecture for legacy operations.',
    text: 'Before we deploy any tech, we map out your manual resource drags and hidden cost leakages, then bridge your legacy databases with automated AI capabilities without interrupting daily operations.',
    cta: 'Design the layer',
  },
  contact: {
    pageTitle: 'AI Catlyst | Contact',
    eyebrow: 'Contact Our Experts',
    title: 'Connect with Our Experts Today to Bring the Value of AI to Your Business',
    text: "No complex technical integration lists. No software confusion. Just direct, unshakeable growth and major cost-savings engineered by seasoned business specialists. Contact us now, and let's unlock real bottom-line efficiency together.",
    cta: 'Contact Our Experts to Transform Your Business Today',
  },
}

const triad = [
  ['01', 'The Foundation: Business Leaders', "Multi-industry veterans who natively navigate market volatility, complex corporate cash flows, and tight operational cost structures. We don't guess your business, we leverage your internal experts and apply rigorous financial discipline to build affordable roadmaps that scale businesses of any size."],
  ['02', 'The Delivery: Solution Transformers', 'Master enterprise architects who map processes, eliminate operational friction, and guarantee completely seamless, non-disruptive integration workflows into your current software infrastructure.'],
  ['03', 'The Catalyst: Next-Gen Technologists', 'Engineers focused purely on the pragmatic monetization of cutting-edge tech. We design autonomous digital tools, structured LLMs, and intelligent AI data systems built for rapid bottom-line results.'],
]

const advisory = [
  ['Business Assessment & AI Roadmap Architecture', 'We begin by deeply auditing your operations to locate immediate opportunities for growth and cost reduction. From there, our architects build a highly effective, capital-efficient deployment roadmap utilizing cutting-edge technology and tailored AI systems designed to deliver bottom-line value as quickly as possible.', 'End-to-End Operational Friction Report, Actionable AI Deployment Matrix, and Accelerated ROI Roadmap.'],
  ['Workflow Architecture & Operational Audits', 'Before we deploy any tech, we map out your manual resource drags and hidden cost leakages. Our Solution Transformers design an interoperable systems architecture that bridges your legacy databases with automated AI capabilities without interrupting your daily operations.', 'Target Operating Model Design, Automated Workflow Schematics, and System Integration Protocols.'],
  ['Corporate AI Governance & Risk Frameworks', 'Ethical execution protects your downside during rapid scaling. We design robust corporate AI policies, data compliance guardrails, and risk mitigation frameworks tailored to your regulatory landscape. We ensure your proprietary enterprise data remains completely secure and fully compliant with emerging industry standards.', 'Custom Corporate AI Blueprint, Data Privacy & Security Guardrails, and Executive Compliance Sign-off.'],
]

const solutions = [
  ['AIC SalesGrow', 'SalesOS', 'Automated Sales Tracking & Lead Management', "Stops your sales team from wasting hours on manual CRM data entry. By securely connecting to your team's day-to-day communication stack, the system automatically reads incoming inquiries, creates customer profiles, scores lead interest, and instantly drafts tailored replies. It cuts down expensive software clutter and accelerates your pipeline without expanding headcount."],
  ['AIC MediaGrow', 'MediaOS', 'Instant Marketing & Ad Creation', 'Replaces slow, high-cost marketing studio production with rapid, high-margin software processing power. Simply input a link to a high-performing industry benchmark, and the system forensically analyzes why it works, writing fresh scripts, generating realistic voiceovers, assembling video variations, and dropping production-ready drafts straight into your campaign ad manager instantly.'],
  ['AIC WebModerniser', 'WebOS', 'Next-Gen B2B Website Redesign & Optimization', 'Transforms your slow corporate website into a premium, high-converting digital storefront built for the New Zealand market. Engineered to strip out clunky legacy code, implement lightning-fast layouts, and map smart customer journeys that turn casual clicks into immediate, qualified business leads without relying on ongoing developer fees.'],
  ['AIC QualLeads', 'LeadOS', 'Automated High-Conversion Lead Generation', 'Delivers ready-to-buy prospects straight to your pipeline without the stress of cold-calling. Once you input your exact target profile and highly convertible audience parameters, the system automatically crawls public records, open networks, and business indices to filter out noise, providing fully verified, highly qualified sales leads built to convert immediately.'],
  ['AIC Lead Magnet Linkedin', 'LinkedInOS', 'LinkedIn Outreach & Social Selling Automation', 'Builds a high-volume LinkedIn prospecting engine for B2B teams. The system organizes audience targeting, AI-personalized outreach, campaign sequencing, reply management, performance analytics, A/B testing, and CRM handoff so your pipeline grows without manual profile-by-profile chasing.'],
  ['AIC CommsGrow', 'CommsOS', 'Searchable Corporate Memory & Task Tracker', 'Prevents crucial details and client decisions from vanishing the second a meeting ends. The system securely logs internal and external discussions to build a private, fully searchable memory engine for your managers. It automatically extracts project commitments, sets interactive tracking tasks, and ensures client handover data is never lost when staff members leave.'],
  ['AIC FinMaster', 'finOS', 'Continuous Live Expense Auditing & Cash Flow Forecaster', 'Acts as a continuous Digital CFO to eliminate operational blindspots. The system scans bank accounts and financial entries every 6 hours to catch administrative overcharges or fraud immediately, alerts the team via Slack in plain English, runs advanced cash flow projections, and drafts professional, investor-ready updates in seconds.'],
  ['AIC Data Access', 'Data Hub', 'Real-Time Enterprise Answers & Search Hub', "Safely links your company's records, operational archives, and historical documentation into one clear interface. Allows leadership and staff to instantly search corporate information and pull up accurate, decision-ready answers in seconds, completely removing operational friction and saving hours of administrative searching."],
]

const solutionIcons = ['pipeline', 'media', 'web', 'lead', 'linkedin', 'memory', 'finance', 'search']

const journey = [
  ['Audit', 'Locate growth opportunities, cash leakage, manual drag, and duplicated software spend.'],
  ['Architect', 'Build the AI operating layer around your current business knowledge, data, and teams.'],
  ['Deploy', 'Launch focused systems with integration support, governance, and measurable ROI signals.'],
  ['Compound', 'Turn every workflow improvement into reusable intelligence across sales, finance, operations, and leadership.'],
]

const readinessSignals = [
  'Immediate growth opportunities',
  'Structural efficiencies',
  'Rapid ROI roadmap',
  'Risk mitigation framework',
  'Legacy workflow integration',
  'Secure data access planning',
]

function getRoute() {
  const slug = window.location.hash.replace('#/', '').replace('#', '') || 'home'
  return meta[slug] ? slug : 'home'
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
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="matrix" />
      <div className="data-streams" aria-hidden="true"><span /><span /><span /><span /></div>
      <Header active={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} openInquiry={openInquiry} />
      <main>
        {route === 'home' && <HomePage openInquiry={openInquiry} />}
        {route === 'strategy' && <StrategyPage openInquiry={openInquiry} />}
        {route === 'solutions' && <SolutionsPage openInquiry={openInquiry} />}
        {route === 'platform' && <PlatformPage openInquiry={openInquiry} />}
        {route === 'contact' && <ContactPage openInquiry={openInquiry} />}
      </main>
      <Footer openInquiry={openInquiry} />
      <InquiryModal key={inquiryVersion} open={inquiryOpen} initialSolution={initialInquirySolution} onClose={() => setInquiryOpen(false)} />
    </div>
  )
}

function Header({ active, menuOpen, setMenuOpen, openInquiry }) {
  const openMobileInquiry = () => {
    setMenuOpen(false)
    openInquiry()
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#/home" aria-label="AI Catlyst home">
          <img src={assetPath('aicatlyst-long.png')} alt="AI Catlyst" />
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
            <img src={assetPath('aicatlyst-long.png')} alt="AI Catlyst" />
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
      <Hero route="home" visual={<GrowthEngine />} openInquiry={openInquiry} />
      <MetricStrip />
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
      <Hero route="strategy" visual={<RoadmapVisual />} openInquiry={openInquiry} compact />
      <section className="section strategy-advisory-section">
        <div className="wrapper">
          <SectionHeader eyebrow="Core advisory offerings" title="Strategy before software." text="Premium, outcome-led corporate consulting focused on bottom-line results, fast deployment, and risk mitigation." />
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
      <section className="section solutions-section">
        <div className="wrapper">
          <SectionHeader eyebrow="The Core 8 Business Solutions" title="Plug-and-play business tools built to slash software overhead." text="Maintain a flexible, balanced grid of fast-acting operational tools built to erase manual tasks and deliver immediate monthly savings." />
          <div className="solution-grid">
            {solutions.map((item, index) => <SolutionCard key={item[0]} item={item} index={index} openInquiry={openInquiry} />)}
          </div>
        </div>
      </section>
      <SolutionSelector />
      <ImplementationSprint />
      <SolutionsCta openInquiry={openInquiry} />
    </>
  )
}

function PlatformPage({ openInquiry }) {
  return (
    <>
      <Hero route="platform" visual={<PlatformVisual />} openInquiry={openInquiry} compact />
      <section className="section platform-flow-section">
        <div className="wrapper split">
          <SectionHeader eyebrow="Operational architecture" title="Workflow Architecture & Operational Audits." text={advisory[1][1]} />
          <FlowVisual />
        </div>
      </section>
      <section className="section platform-governance-section">
        <div className="wrapper split reverse">
          <PlatformGovernanceVisual />
          <SectionHeader eyebrow="Risk and governance" title="Corporate AI Governance & Risk Frameworks." text={advisory[2][1]} />
        </div>
      </section>
      <PlatformLayerMap />
      <PlatformCta openInquiry={openInquiry} />
    </>
  )
}

function ContactPage({ openInquiry }) {
  return (
    <>
      <Hero route="contact" visual={<ContactPanel openInquiry={openInquiry} />} openInquiry={openInquiry} compact />
      <section className="section contact-access-section">
        <div className="wrapper contact-grid">
          <div className="contact-card">
            <p className="eyebrow">Direct expert access</p>
            <h2>Contact Our Experts to Transform Your Business Today</h2>
            <p>{meta.contact.text}</p>
            <button type="button" className="email-card" onClick={() => openInquiry()}>
              <span>Email</span>
              <strong>{contactEmail}</strong>
            </button>
          </div>
          <div className="brief-list">
            {readinessSignals.map((item) => <div key={item}><Icon name="check" /><span>{item}</span></div>)}
          </div>
        </div>
      </section>
      <ContactPath openInquiry={openInquiry} />
    </>
  )
}

function Hero({ route, visual, compact = false, openInquiry }) {
  const page = meta[route]
  const primaryIsInquiry = route !== 'solutions'
  return (
    <section className={`hero ${compact ? 'compact' : ''}`}>
      <div className="hero-lines" />
      <div className="wrapper hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.text}</p>
          <div className="actions">
            {primaryIsInquiry
              ? <button className="button primary" type="button" onClick={() => openInquiry()}>{page.cta}</button>
              : <a className="button primary" href="#/solutions">{page.cta}</a>}
            {route === 'solutions'
              ? <button className="button secondary" type="button" onClick={() => openInquiry()}>Talk to experts</button>
              : <a className="button secondary" href="#/solutions">View solutions</a>}
          </div>
        </div>
        <div className="hero-visual">{visual}</div>
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function MetricStrip() {
  return (
    <section className="metric-strip wrapper">
      {[
        ['14 days', 'Implementation wrap-around sprint'],
        ['6 hrs', 'Live finance monitoring cadence'],
        ['8', 'Productized AI systems'],
        ['ROI', 'Rapid bottom-line value focus'],
      ].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
    </section>
  )
}

function Triad() {
  return (
    <section className="section">
      <div className="wrapper">
        <SectionHeader eyebrow="The Architecture of Execution" title="The Core Triad." text="Business transformation requires commercial discipline, enterprise architecture, and next-gen technology working as one integrated delivery system." />
        <div className="triad-grid">
          {triad.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function OperatingJourney() {
  return (
    <section className="section journey-section">
      <div className="wrapper journey-grid">
        <div>
          <SectionHeader eyebrow="The operating journey" title="From business pressure to AI operating advantage." text="The site journey should make the offer simple: understand the business, architect the right systems, deploy fast, and measure what changes." />
          <JourneyOrbit />
        </div>
        <div className="journey-steps">
          {journey.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function ExpertPartnership() {
  return (
    <section className="section validation-section">
      <div className="wrapper validation-panel">
        <div>
          <p className="eyebrow">The Expert-Led Framework</p>
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
        <SectionHeader eyebrow="Roadmap architecture" title="Every recommendation moves through a clear decision lane." text="A premium AI roadmap should be easy for leadership to understand, fund, and sequence." />
        <StrategyDecisionMatrix />
      </div>
    </section>
  )
}

function GovernanceLab() {
  return (
    <section className="section governance-lab-section">
      <div className="wrapper governance-lab">
        <StrategyControlVisual />
        <div>
          <p className="eyebrow">Executive control layer</p>
          <h2>Governance that keeps AI useful, secure, and commercially accountable.</h2>
          <p>{advisory[2][1]}</p>
          <div className="control-grid">
            {['Data privacy', 'Human approval', 'Access roles', 'Compliance evidence'].map((item) => <span key={item}><Icon name="shield" />{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionsPreview({ openInquiry }) {
  return (
    <section className="section">
      <div className="wrapper">
        <div className="section-split">
          <SectionHeader eyebrow="Immediate Growth & Efficiencies" title="Scalable intelligence, subscribed." text="Strategy handles the complex architecture; our ready-to-run solutions deliver immediate, practical outcomes." />
          <a className="button secondary" href="#/solutions">Explore all systems</a>
        </div>
        <div className="solution-grid preview">
          {solutions.slice(0, 3).map((item, index) => <SolutionCard key={item[0]} item={item} index={index} openInquiry={openInquiry} />)}
        </div>
      </div>
    </section>
  )
}

function AdvisoryCard({ title, text, deliverable, index }) {
  return (
    <article className="advisory-card">
      <span>{String(index + 1).padStart(2, '0')}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <strong>{deliverable}</strong>
    </article>
  )
}

function SolutionCard({ item, index, openInquiry }) {
  const [name, system, purpose, text] = item
  const iconName = solutionIcons[index] || 'node'
  return (
    <button className="solution-card" type="button" onClick={() => openInquiry(name)} aria-label={`Inquire about ${name}`}>
      <div className="card-grid" />
      <div className="solution-top"><span>{String(index + 1).padStart(2, '0')}</span><i><Icon name={iconName} /></i></div>
      <h3>{name}</h3>
      <strong>{system}</strong>
      <em>{purpose}</em>
      <p>{text}</p>
      <div className="system-ready"><span>System ready</span><b /></div>
    </button>
  )
}

function SolutionSelector() {
  const pressureMap = [
    ['Revenue', 'SalesGrow, QualLeads, Lead Magnet Linkedin', 'Pipeline speed', 'pipeline'],
    ['Marketing', 'MediaGrow, WebModerniser', 'Campaign output', 'media'],
    ['Operations', 'CommsGrow, Data Access', 'Workflow memory', 'workflow'],
    ['Finance', 'FinMaster', 'Expense control', 'finance'],
  ]

  return (
    <section className="section solution-selector-section">
      <div className="wrapper selector-panel">
        <div>
          <p className="eyebrow">Choose the starting point</p>
          <h2>Pick the business pressure. The right system becomes obvious.</h2>
        </div>
        <div className="solution-fit-board">
          <div className="fit-board-head">
            <span>Business pressure</span>
            <span>Matched AIC systems</span>
            <span>Operating outcome</span>
          </div>
          {pressureMap.map(([title, systems, outcome, icon], index) => (
            <article className="fit-row" key={title} style={{ '--row': index }}>
              <div>
                <Icon name={icon} />
                <h3>{title}</h3>
              </div>
              <p>{systems}</p>
              <strong>{outcome}</strong>
              <i />
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
        <div>
          <span>Risk Mitigation Protocol</span>
          <p>Every productized subscription model is launched with an initial 14-day implementation wrap-around sprint. Our Solution Transformers manage all integration points directly, ensuring zero legacy system downtime and verified data security pipelines.</p>
        </div>
        <RiskGovernanceVisual />
      </div>
    </section>
  )
}

function HomeCta({ openInquiry }) {
  return (
    <section className="section">
      <div className="wrapper cta-panel">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Connect with Our Experts Today to Bring the Value of AI to Your Business</h2>
          <p>{meta.contact.text}</p>
        </div>
        <button className="button primary" type="button" onClick={() => openInquiry()}>Contact Our Experts to Transform Your Business Today</button>
      </div>
    </section>
  )
}

function StrategyCta({ openInquiry }) {
  return (
    <section className="section">
      <div className="wrapper cta-panel strategy-cta">
        <div>
          <p className="eyebrow">Next strategic move</p>
          <h2>Architect the roadmap before software spend locks you in.</h2>
          <p>{meta.strategy.text}</p>
        </div>
        <button className="button primary" type="button" onClick={() => openInquiry()}>Architect the roadmap</button>
      </div>
    </section>
  )
}

function SolutionsCta({ openInquiry }) {
  return (
    <section className="section">
      <div className="wrapper cta-panel solutions-cta">
        <div>
          <p className="eyebrow">Solution inquiry</p>
          <h2>Select the system that matches your highest-friction workflow.</h2>
          <p>{meta.solutions.text}</p>
        </div>
        <button className="button primary" type="button" onClick={() => openInquiry()}>Talk to experts</button>
      </div>
    </section>
  )
}

function PlatformCta({ openInquiry }) {
  return (
    <section className="section">
      <div className="wrapper cta-panel platform-cta">
        <div>
          <p className="eyebrow">System design</p>
          <h2>Design the secure AI layer around the systems you already run.</h2>
          <p>{meta.platform.text}</p>
        </div>
        <button className="button primary" type="button" onClick={() => openInquiry()}>Design the layer</button>
      </div>
    </section>
  )
}

function PlatformLayerMap() {
  return (
    <section className="section layer-section">
      <div className="wrapper layer-map">
        <SectionHeader eyebrow="Data to decision flow" title="A clearer platform model for teams, systems, and leadership." text="Each layer has a role, so the page explains how AI becomes useful without making the business feel like a technical migration project." />
        <DecisionFlowVisual />
      </div>
    </section>
  )
}

function JourneyOrbit() {
  return (
    <div className="journey-orbit" aria-hidden="true">
      <div className="orbit-ring ring-one" />
      <div className="orbit-ring ring-two" />
      <div className="orbit-ray ray-one" />
      <div className="orbit-ray ray-two" />
      <span className="orbit-node node-a" />
      <span className="orbit-node node-b" />
      <span className="orbit-node node-c" />
      <strong>ROI</strong>
      <small>Growth</small>
      <small>Cost</small>
      <small>Risk</small>
    </div>
  )
}

function StrategyDecisionMatrix() {
  return (
    <div className="decision-matrix roadmap-cockpit" aria-hidden="true">
      <div className="cockpit-radar"><i /><i /><i /></div>
      <div className="cockpit-lane">
        {['Pressure', 'ROI score', 'Risk gate', 'Launch order'].map((item, index) => (
          <span key={item} style={{ '--step': index }}><b>{String(index + 1).padStart(2, '0')}</b>{item}</span>
        ))}
      </div>
      <div className="cockpit-core">
        <Icon name="target" />
        <strong>Roadmap engine</strong>
        <small>ranked investment sequence</small>
      </div>
      <div className="cockpit-bars">
        {['Growth value', 'Cost removal', 'Risk exposure'].map((item, index) => (
          <span key={item}><small>{item}</small><i><b style={{ '--score': `${86 - index * 14}%` }} /></i></span>
        ))}
      </div>
    </div>
  )
}

function SolutionRouter() {
  return (
    <div className="solution-router pressure-router solution-switchboard" aria-hidden="true">
      <div className="switchboard-grid" />
      <div className="switchboard-core"><Icon name="target" /><strong>Matched system layer</strong><small>pressure-to-solution routing</small></div>
      <div className="switchboard-stream stream-a"><i /></div>
      <div className="switchboard-stream stream-b"><i /></div>
      <div className="switchboard-stream stream-c"><i /></div>
      <div className="switchboard-stream stream-d"><i /></div>
      {[
        ['Revenue', 'SalesOS + LeadOS'],
        ['Marketing', 'MediaOS + WebOS'],
        ['Operations', 'CommsOS + Data Hub'],
        ['Finance', 'finOS'],
      ].map(([title, text], index) => (
        <span className="router-chip switchboard-chip" key={title} style={{ '--chip': index }}><b>{title}</b><small>{text}</small></span>
      ))}
    </div>
  )
}

function RiskGovernanceVisual() {
  return (
    <div className="risk-governance-visual" aria-hidden="true">
      <div className="risk-core">
        <Icon name="shield" />
        <strong>14-day secure launch</strong>
      </div>
      <div className="risk-rail"><i /></div>
      {[
        ['01', 'Scope', 'integration boundaries'],
        ['02', 'Secure', 'data pipeline checks'],
        ['03', 'Govern', 'approval controls'],
        ['04', 'Launch', 'zero downtime'],
      ].map(([number, title, text], index) => (
        <span className={`risk-gate gate-${index + 1}`} key={title} style={{ '--gate': index }}>
          <b>{number}</b>
          <strong>{title}</strong>
          <small>{text}</small>
        </span>
      ))}
    </div>
  )
}

function DecisionFlowVisual() {
  return (
    <div className="decision-flow data-routing-visual" aria-hidden="true">
      <div className="data-rail"><i /><i /><i /></div>
      <div className="data-cluster source-cluster">
        <span>Business systems</span>
        {['Finance', 'Sales', 'Ops docs'].map((item) => <b key={item}>{item}</b>)}
      </div>
      <div className="data-core">
        <Icon name="shield" />
        <strong>Secure context layer</strong>
        <small>permissions + retrieval + audit</small>
      </div>
      <div className="data-cluster output-cluster">
        <span>Decision outputs</span>
        {['Cost signal', 'Growth action', 'Risk alert'].map((item) => <b key={item}>{item}</b>)}
      </div>
    </div>
  )
}

function ContactPath({ openInquiry }) {
  return (
    <section className="section contact-path-section">
      <div className="wrapper contact-path">
        <div>
          <p className="eyebrow">What happens next</p>
          <h2>A simple path from inquiry to focused AI opportunity.</h2>
          <p>No complex technical integration lists. No software confusion. Just direct, unshakeable growth and major cost-savings engineered by seasoned business specialists.</p>
        </div>
        <div className="contact-flow inquiry-route">
          <i className="route-line" />
          {['Choose solution interest', 'Add business context', 'Open email draft', 'Map first ROI move'].map((item, index) => (
            <button key={item} type="button" onClick={() => openInquiry()} style={{ '--step': index }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
              <Icon name={index === 0 ? 'target' : index === 1 ? 'workflow' : index === 2 ? 'arrow' : 'chart'} />
            </button>
          ))}
        </div>
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
    database: <><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v10c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 10c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
    workflow: <><path d="M5 6h5v5H5z" /><path d="M14 13h5v5h-5z" /><path d="M10 8h3a3 3 0 0 1 3 3v2" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15v-4" /><path d="M12 15V8" /><path d="M16 15v-6" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  }
  return <svg className="icon" {...common}>{paths[name] || paths.node}</svg>
}

function GrowthEngine() {
  return (
    <div className="visual-panel">
      <div className="panel-head"><span>AI Growth Engine</span><strong>Live operating view</strong></div>
      <div className="engine-core">
        <i className="neural-scan" />
        <div className="core-cube">AIC</div>
        <b className="orbit-dot dot-one" />
        <b className="orbit-dot dot-two" />
        <b className="orbit-dot dot-three" />
        {['Growth', 'ROI', 'Risk', 'Ops'].map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="telemetry">
        {['Growth acceleration', 'Cost reduction', 'Capital protection'].map((item, index) => <div key={item}><span>{item}</span><i style={{ '--scale': `${84 - index * 9}%` }} /></div>)}
      </div>
    </div>
  )
}

function RoadmapVisual() {
  return (
    <div className="visual-panel strategy-console roadmap-visual">
      <div className="roadmap-grid" />
      <div className="roadmap-core">
        <Icon name="target" />
        <strong>AI roadmap</strong>
        <span>ROI sequence</span>
      </div>
      <div className="roadmap-pulse pulse-one" />
      <div className="roadmap-pulse pulse-two" />
      {[
        ['01', 'Audit', 'Find leakage'],
        ['02', 'Model', 'Rank ROI'],
        ['03', 'Govern', 'Control risk'],
        ['04', 'Deploy', 'Sequence launch'],
      ].map(([number, title, text], index) => (
        <div className={`roadmap-stage stage-${index + 1}`} key={title} style={{ '--step': index }}>
          <span>{number}</span>
          <strong>{title}</strong>
          <small>{text}</small>
        </div>
      ))}
    </div>
  )
}

function SystemsMap() {
  return (
    <div className="visual-panel solution-hub systems-visual">
      <div className="systems-orbit orbit-one" />
      <div className="systems-orbit orbit-two" />
      <div className="systems-route route-a" />
      <div className="systems-route route-b" />
      <div className="systems-route route-c" />
      <div className="systems-core"><Icon name="node" /><strong>AIC Systems</strong></div>
      {['SalesOS', 'MediaOS', 'WebOS', 'LeadOS', 'LinkedInOS', 'CommsOS', 'finOS', 'Data Hub'].map((item, index) => (
        <span className={`system-chip system-${index + 1}`} key={item} style={{ '--chip': index }}>{item}</span>
      ))}
      <i className="systems-packet packet-a" />
      <i className="systems-packet packet-b" />
      <i className="systems-packet packet-c" />
    </div>
  )
}

function PlatformVisual() {
  return (
    <div className="visual-panel platform-console platform-routing">
      <div className="routing-line line-a" />
      <div className="routing-line line-b" />
      <div className="platform-source source-left">
        <strong>Existing systems</strong>
        {['CRM', 'Finance', 'Docs'].map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="platform-core">
        <Icon name="shield" />
        <strong>Secure AI Layer</strong>
        <small>Role-aware routing</small>
      </div>
      <div className="platform-source source-right">
        <strong>AI outputs</strong>
        {['SalesOS', 'Data Hub', 'finOS'].map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  )
}

function FlowVisual() {
  return (
    <div className="flow-visual workflow-audit workflow-visual">
      <div className="workflow-stream" />
      <div className="audit-board">
        {['Manual drag', 'Duplicate tools', 'Hidden leakage'].map((item, index) => (
          <span key={item} style={{ '--row': index }}><Icon name="target" />{item}</span>
        ))}
      </div>
      <div className="audit-router" aria-hidden="true">
        <i />
        <strong>AI routing</strong>
      </div>
      <div className="audit-output">
        <strong>Efficiency model</strong>
        <span><b style={{ '--scale': '78%' }} />Cost removal</span>
        <span><b style={{ '--scale': '66%' }} />Workflow speed</span>
      </div>
    </div>
  )
}

function GovernanceVisual() {
  return (
    <div className="governance-visual governance-console governance-visual-live">
      <div className="governance-ring ring-one" />
      <div className="governance-ring ring-two" />
      <div className="governance-shield">
        <Icon name="shield" />
        <strong>Secure</strong>
      </div>
      {['Data guardrails', 'Executive sign-off', 'Compliance control'].map((item, index) => (
        <span key={item} style={{ '--rule': index }}><Icon name="check" />{item}</span>
      ))}
    </div>
  )
}

function PlatformGovernanceVisual() {
  return (
    <div className="platform-governance-visual" aria-hidden="true">
      <div className="governance-gridlines" />
      <div className="policy-core">
        <Icon name="shield" />
        <strong>Policy control</strong>
        <small>secure AI layer</small>
      </div>
      {[
        ['Data guardrails', 'encrypted access paths'],
        ['Role permissions', 'team-level visibility'],
        ['Audit evidence', 'logged AI activity'],
        ['Compliance review', 'executive sign-off'],
      ].map(([title, text], index) => (
        <span className={`policy-node policy-${index + 1}`} key={title} style={{ '--node': index }}>
          <Icon name="check" />
          <b>{title}</b>
          <small>{text}</small>
        </span>
      ))}
      <i className="policy-signal signal-one" />
      <i className="policy-signal signal-two" />
    </div>
  )
}

function StrategyControlVisual() {
  return (
    <div className="control-visual executive-control-live" aria-hidden="true">
      <div className="control-gridlines" />
      <div className="approval-core">
        <Icon name="shield" />
        <strong>Executive control</strong>
        <small>approve, gate, evidence</small>
      </div>
      {['Human approval', 'Data privacy', 'Access roles', 'Compliance evidence'].map((item, index) => (
        <span className={`approval-node approval-${index + 1}`} key={item} style={{ '--node': index }}><Icon name={index === 0 ? 'target' : 'check'} />{item}</span>
      ))}
      <i className="approval-scan scan-one" />
      <i className="approval-scan scan-two" />
    </div>
  )
}

function ContactPanel({ openInquiry }) {
  return (
    <div className="visual-panel contact-panel inquiry-signal contact-dispatch">
      <div className="signal-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="dispatch-packet packet-one" />
      <div className="dispatch-packet packet-two" />
      <div className="signal-card">
        <span>Inquiry signal</span>
        <strong>Growth opportunity detected</strong>
      </div>
      <div className="signal-options">
        {['SalesOS', 'finOS', 'Data Hub'].map((item) => <span key={item}>{item}</span>)}
      </div>
      <button type="button" onClick={() => openInquiry()}>{contactEmail}</button>
      <p>Immediate growth opportunities, structural efficiencies, rapid ROI roadmap, and risk mitigation framework.</p>
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
        <p className="eyebrow">Solution inquiry</p>
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
          <button className="button primary" type="submit">Open email client</button>
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
            <img src={assetPath('aicatlyst-long.png')} alt="AI Catlyst" />
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
          <span>Direct expert access</span>
          <button type="button" onClick={() => openInquiry()}>Contact Our Experts to Transform Your Business Today</button>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </div>
      <div className="wrapper footer-legal">
        <small>© 2026 AI Catlyst Ltd. A Knights Move Consulting Company. All Rights Reserved. Powered by <a href="https://levatahq.com" target="_blank" rel="noreferrer">Levata</a></small>
      </div>
    </footer>
  )
}

createRoot(document.getElementById('root')).render(<App />)
