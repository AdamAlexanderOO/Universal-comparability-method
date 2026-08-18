# System Architecture - Complete Technical Reference

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    UNIVERSAL PLATFORM HUB                        │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              PRESENTATION LAYER (React UI)               │  │
│  │  - Bright Dashboard Interface                            │  │
│  │  - Module Navigation & Selection                         │  │
│  │  - Real-time Visualization Components                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           INTEGRATION LAYER (Module Router)              │  │
│  │  - Module Loader                                         │  │
│  │  - Event Bus (Cross-module communication)               │  │
│  │  - Shared State Management                              │  │
│  │  - Authentication & Authorization                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         MODULE LAYER (6 Independent Projects)            │  │
│  │                                                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │  Universal  │  │    Light    │  │      AI     │    │  │
│  │  │  Comparab.  │  │   Genesis   │  │    Vision   │    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘    │  │
│  │                                                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │    Light    │  │    Light    │  │  Extended   │    │  │
│  │  │  Protocol   │  │   Stage 1   │  │ Integrations│    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘    │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           BACKEND LAYER (Express.js Server)              │  │
│  │  - REST API Endpoints                                    │  │
│  │  - AI Integration (Google GenAI)                         │  │
│  │  - Simulation Engines                                    │  │
│  │  - Data Processing                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │        DATA LAYER (Storage & External Services)          │  │
│  │  - Database (PostgreSQL/MongoDB)                         │  │
│  │  - Cache Layer (Redis)                                   │  │
│  │  - Google GenAI API                                      │  │
│  │  - File Storage (S3/Cloud Storage)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Directory Structure

```
Universal-comparability-method/
│
├── src/                                    # Source code
│   ├── main.tsx                           # React entry point
│   ├── App.tsx                            # Main dashboard component
│   ├── App.css                            # Main styles
│   │
│   ├── components/                        # Shared UI components
│   │   ├── Navigation/
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── ModuleCard/
│   │   │   └── ModuleCard.tsx
│   │   ├── Dashboard/
│   │   │   └── DashboardLayout.tsx
│   │   └── Common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── StatusBadge.tsx
│   │
│   ├── modules/                           # Individual module implementations
│   │   ├── universal-method/
│   │   │   ├── components/
│   │   │   │   ├── ComparisonEngine.tsx
│   │   │   │   ├── AnalyticsBoard.tsx
│   │   │   │   ├── DataImporter.tsx
│   │   │   │   └── VisualizationTools.tsx
│   │   │   ├── services/
│   │   │   │   ├── comparisonService.ts
│   │   │   │   └── analyticsService.ts
│   │   │   ├── types/
│   │   │   │   └── comparison.types.ts
│   │   │   └── README.md
│   │   │
│   │   ├── light-genesis/
│   │   │   ├── routes/
│   │   │   │   ├── dashboard.tsx
│   │   │   │   ├── scanner/
│   │   │   │   │   ├── galactic.tsx
│   │   │   │   │   ├── fleet.tsx
│   │   │   │   │   └── planetary.tsx
│   │   │   │   └── systems/
│   │   │   ├── components/
│   │   │   │   ├── Scanner/
│   │   │   │   ├── RadialControl/
│   │   │   │   ├── HUD/
│   │   │   │   └── Visualization/
│   │   │   ├── services/
│   │   │   │   ├── simulationEngine.ts
│   │   │   │   ├── scannerEngine.ts
│   │   │   │   ├── animationEngine.ts
│   │   │   │   └── knowledgeEngine.ts
│   │   │   └── README.md
│   │   │
│   │   ├── ai-vision/
│   │   │   ├── engine/
│   │   │   │   ├── gameLoop.ts
│   │   │   │   ├── physicsEngine.ts
│   │   │   │   └── renderEngine.ts
│   │   │   ├── vision/
│   │   │   │   ├── visionProcessor.ts
│   │   │   │   └── objectDetection.ts
│   │   │   ├── gameplay/
│   │   │   │   ├── mechanics.ts
│   │   │   │   └── stateManager.ts
│   │   │   └── README.md
│   │   │
│   │   ├── light-protocol/
│   │   │   ├── specification/
│   │   │   │   ├── language-spec.md
│   │   │   │   └── stdlib-reference.md
│   │   │   ├── compiler/
│   │   │   │   ├── lexer.ts
│   │   │   │   ├── parser.ts
│   │   │   │   └── codegen.ts
│   │   │   ├── runtime/
│   │   │   │   ├── vm.ts
│   │   │   │   └── executor.ts
│   │   │   └── README.md
│   │   │
│   │   ├── light-stage-one/
│   │   │   ├── phase1/
│   │   │   │   ├── lexer/
│   │   │   │   ├── parser/
│   │   │   │   ├── typeSystem/
│   │   │   │   └── runtime/
│   │   │   ├── tests/
│   │   │   ├── examples/
│   │   │   └── README.md
│   │   │
│   │   └── integrations/
│   │       ├── concurrency/
│   │       ├── networking/
│   │       ├── storage/
│   │       ├── cloud/
│   │       └── README.md
│   │
│   ├── services/                          # Shared services
│   │   ├── api.ts                        # API client
│   │   ├── auth.ts                       # Authentication
│   │   ├── storage.ts                    # Data persistence
│   │   └── eventBus.ts                   # Event handling
│   │
│   ├── hooks/                             # React hooks
│   │   ├── useModule.ts
│   │   ├── useGlobalState.ts
│   │   └── useAuth.ts
│   │
│   ├── types/                             # TypeScript types
│   │   ├── module.types.ts
│   │   ├── api.types.ts
│   │   └── common.types.ts
│   │
│   ├── styles/                            # Global styles
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── animations.css
│   │
│   └── utils/                             # Utility functions
│       ├── helpers.ts
│       ├── formatters.ts
│       └── validators.ts
│
├── public/                                # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
│
├── server.ts                              # Express backend
├── vite.config.ts                         # Vite configuration
├── tsconfig.json                          # TypeScript config
├── package.json                           # Dependencies
├── index.html                             # HTML entry
├── .env.example                           # Environment template
├── .gitignore
│
├── docs/                                  # Documentation
│   ├── README.md                         # Main documentation
│   ├── MODULES.md                        # Module guide
│   ├── ARCHITECTURE.md                   # This file
│   ├── API.md                            # API reference
│   └── GETTING_STARTED.md                # Quick start
│
└── examples/                              # Code examples
    ├── universal-method/
    ├── light-genesis/
    ├── ai-vision/
    └── integrations/
```

---

## 🔄 Data Flow Architecture

### Request Flow
```
User Interaction
      ↓
React Component (UI)
      ↓
Event Handler / Hook
      ↓
Module Service
      ↓
API Client
      ↓
Express Backend
      ↓
Business Logic
      ↓
Database / AI Service
      ↓
Response
      ↓
State Update
      ↓
Component Re-render
```

### Module Communication Flow
```
Module A
      ↓
Event Bus (emit)
      ↓
Module Registry
      ↓
Event Bus (listen)
      ↓
Module B
```

---

## 🔌 API Architecture

### API Endpoints Structure

```
/api
├── /health                      # Health check
├── /modules                     # Module management
│   ├── GET  /                  # List all modules
│   └── GET  /:id               # Get module details
│
├── /universal-method/
│   ├── POST /compare           # Run comparison
│   ├── GET  /results/:id       # Get results
│   └── POST /export            # Export data
│
├── /light-genesis/
│   ├── POST /simulate          # Run simulation
│   ├── POST /diagnose          # System diagnostics
│   └── POST /synthesize-light  # Generate protocol
│
├── /ai-vision/
│   ├── POST /game/init         # Initialize game
│   ├── POST /game/command      # Process command
│   └── GET  /game/state        # Get game state
│
├── /light-protocol/
│   ├── POST /validate          # Validate code
│   ├── POST /compile           # Compile
│   └── GET  /spec              # Get spec
│
├── /light-stage-one/
│   ├── POST /execute           # Execute code
│   ├── POST /test              # Run tests
│   └── GET  /benchmarks        # Performance metrics
│
└── /auth
    ├── POST /login             # User login
    ├── POST /logout            # User logout
    └── POST /refresh-token     # Refresh token
```

### API Response Format

```typescript
// Successful Response
{
  status: "success" | "simulated_ai" | "simulated_local",
  data: {
    // Module-specific data
  },
  metadata: {
    timestamp: "2026-08-18T19:00:00Z",
    duration: 145,        // ms
    cacheHit: false
  }
}

// Error Response
{
  status: "error",
  error: {
    code: "ERR_INVALID_PARAMS",
    message: "Description of error",
    details: { /* Additional context */ }
  },
  metadata: {
    timestamp: "2026-08-18T19:00:00Z"
  }
}
```

---

## 🧮 Component Hierarchy

### App Component Tree
```
App
├── Header
│   ├── Logo
│   ├── SearchBar
│   ├── NavigationMenu
│   └── UserMenu
│
├── Layout
│   ├── Sidebar
│   │   ├── DashboardLink
│   │   ├── ModuleLink (x6)
│   │   └── SettingsLink
│   │
│   └── MainContent
│       ├── DashboardView
│       │   ├── StatsCards
│       │   ├── ModuleGrid
│       │   └── RecentActivity
│       │
│       └── ModuleDetailView
│           ├── ModuleHeader
│           ├── FeaturesList
│           ├── TechStack
│           ├── QuickStart
│           └── APIReference
│
└── Footer
    ├── Links
    ├── Copyright
    └── StatusIndicator
```

---

## 🎨 Styling Architecture

### Design System
```
Colors
├── Primary: Cyan (#00f0ff)
├── Secondary: Blue (#3b82f6)
├── Success: Green (#22c55e)
├── Warning: Orange (#f97316)
├── Error: Red (#ef4444)
└── Neutral: Slate (900-100)

Typography
├── Heading L: 36px, Bold
├── Heading M: 28px, Bold
├── Heading S: 20px, Bold
├── Body: 16px, Regular
└── Code: 14px, Monospace

Spacing
├── xs: 4px
├── sm: 8px
├── md: 16px
├── lg: 24px
├── xl: 32px
└── 2xl: 48px

Shadows
├── Small: 0 1px 2px rgba(0,0,0,0.05)
├── Medium: 0 4px 6px rgba(0,0,0,0.1)
└── Large: 0 10px 15px rgba(0,0,0,0.1)
```

### CSS Structure
```
styles/
├── globals.css          # Global resets
├── tailwind.css         # Tailwind imports
├── animations.css       # Custom animations
├── theme.css            # Color variables
└── components.css       # Component-specific styles
```

---

## 🔐 Security Architecture

### Authentication Flow
```
User Input (Credentials)
      ↓
Validation
      ↓
Backend Authentication
      ↓
JWT Token Generation
      ↓
Token Storage (Secure)
      ↓
Authenticated Requests (JWT in Header)
      ↓
Token Verification
      ↓
Resource Access
```

### Data Security
- All API calls use HTTPS
- Sensitive data encrypted at rest
- Environment variables for secrets
- Input sanitization on all endpoints
- CORS policy strictly configured
- Rate limiting per endpoint

---

## 📊 State Management

### Global State Structure
```typescript
{
  user: {
    id: string
    name: string
    email: string
    role: string
    authenticated: boolean
  },
  modules: {
    loaded: Module[]
    active: string | null
    metadata: ModuleMetadata
  },
  ui: {
    sidebarOpen: boolean
    theme: 'dark' | 'light'
    notifications: Notification[]
  },
  cache: {
    results: Record<string, any>
    timestamps: Record<string, number>
  }
}
```

### State Management Libraries
- React Context for global state
- Custom hooks for state access
- Local storage for persistence
- Session storage for temporary data

---

## 🔄 Event System

### Event Types
```typescript
// Module Events
'module:loaded'
'module:error'
'module:update'

// Simulation Events
'simulation:started'
'simulation:progress'
'simulation:completed'

// UI Events
'sidebar:toggled'
'theme:changed'
'notification:new'

// API Events
'api:request'
'api:response'
'api:error'
```

### Event Bus Implementation
```typescript
// Subscribe
eventBus.on('simulation:started', (data) => {
  console.log('Simulation started:', data)
})

// Emit
eventBus.emit('simulation:started', {
  moduleId: 'light-genesis',
  timestamp: Date.now()
})

// Unsubscribe
eventBus.off('simulation:started', handler)
```

---

## 🚀 Performance Optimization

### Frontend Optimization
- Code splitting per module
- Lazy loading of components
- Image optimization
- CSS minification
- JavaScript minification
- Tree shaking
- Caching strategies

### Backend Optimization
- Connection pooling
- Query optimization
- Response compression
- Caching headers
- Async processing
- Load balancing ready

### Bundle Size Targets
- Main bundle: <200KB
- Module bundles: <100KB each
- Total gzipped: <500KB

---

## 🔍 Monitoring & Logging

### Logging Strategy
```
Levels:
├── DEBUG: Development information
├── INFO: General information
├── WARN: Warning messages
├── ERROR: Error messages
└── FATAL: Fatal errors

Destinations:
├── Console (dev)
├── File system (prod)
├── Centralized logging (ELK/Datadog)
└── Error tracking (Sentry)
```

### Metrics
- Request latency
- Error rates
- Module performance
- Resource usage
- User engagement

---

## 🧪 Testing Architecture

### Testing Pyramid
```
       Integration Tests (E2E)
              ↑
          Component Tests
              ↑
          Unit Tests
              ↑
```

### Test Coverage Targets
- Unit: 80%+
- Components: 75%+
- Integration: 50%+
- Overall: 70%+

---

## 📦 Deployment Architecture

### CI/CD Pipeline
```
Code Push
    ↓
Lint & Format
    ↓
Unit Tests
    ↓
Build
    ↓
Integration Tests
    ↓
Security Scan
    ↓
Deploy to Staging
    ↓
Smoke Tests
    ↓
Deploy to Production
    ↓
Monitoring & Alerts
```

### Deployment Targets
- Vercel (Frontend)
- AWS/GCP (Backend)
- Docker containers
- Kubernetes ready

---

## 🔄 Module Integration Points

### Shared Interfaces
```typescript
// Module Interface
interface IModule {
  id: string
  name: string
  version: string
  enabled: boolean
  initialize(): Promise<void>
  shutdown(): Promise<void>
  getStatus(): ModuleStatus
  handleEvent(event: Event): void
}

// Service Interface
interface IService {
  initialize(): Promise<void>
  execute(request: Request): Promise<Response>
  validate(data: any): boolean
}
```

### Cross-Module Communication
- Event bus for loose coupling
- Shared services for common functionality
- Module registry for discovery
- Direct imports for tight integration (where needed)

---

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Distributed cache (Redis Cluster)
- Database replication
- Load balancer configuration
- Module independence

### Vertical Scaling
- Lazy loading strategies
- Memory pooling
- Efficient algorithms
- Database indexing
- Query optimization

---

## 🛠️ Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run lint         # Check code quality
npm run test         # Run tests
npm run build        # Build for production
```

### Module Development
Each module can be developed independently with:
- Isolated dependencies
- Separate test suites
- Individual documentation
- Own configuration files

---

## 📚 Documentation Structure

All documentation uses Markdown format:
- README.md - Main overview
- MODULES.md - Detailed module guide
- ARCHITECTURE.md - This technical reference
- API.md - REST API documentation
- GETTING_STARTED.md - Quick start guide

---

**Last Updated:** August 2026  
**Architecture Version:** 1.0  
**Maintained by:** AdamAlexanderOO
