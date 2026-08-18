# Quick Reference - Command Cheat Sheet

## 🚀 Installation & Setup

```bash
# Clone
git clone https://github.com/AdamAlexanderOO/Universal-comparability-method
cd Universal-comparability-method

# Install
npm install

# Start
npm run dev

# Visit: http://localhost:3000
```

---

## 📋 Development Commands

```bash
npm run dev              # Start dev server with HMR
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Check code quality
npm run format           # Auto-format code
npm run test             # Run tests
npm run test:setup       # Validate environment
```

---

## 🔷 Universal Comparability Method

```bash
# Compare datasets
curl -X POST http://localhost:3000/api/universal-method/compare \
  -H "Content-Type: application/json" \
  -d '{
    "datasets": [
      {"id": "d1", "name": "Dataset A", "values": [10, 20, 30]},
      {"id": "d2", "name": "Dataset B", "values": [12, 22, 32]}
    ],
    "parameters": {"algorithm": "pearson", "confidence": 0.95}
  }'

# Get results
curl http://localhost:3000/api/universal-method/results/CMP-abc123

# List comparisons
curl http://localhost:3000/api/universal-method/results

# Export
curl -X POST http://localhost:3000/api/universal-method/export \
  -H "Content-Type: application/json" \
  -d '{"comparisonId": "CMP-abc123", "format": "json"}'
```

---

## 🟣 Light Genesis Core

```bash
# Initialize simulation
curl -X POST http://localhost:3000/api/light-genesis/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "galactic",
    "parameters": {
      "initialPopulation": 1000,
      "startingResources": {"energy": 5000, "materials": 2000}
    }
  }'

# Get diagnostics
curl -X POST http://localhost:3000/api/light-genesis/diagnose \
  -H "Content-Type: application/json" \
  -d '{
    "deckState": {
      "fluxFrequency": 65,
      "shieldLevel": 100,
      "aiCoreSynapses": 87
    }
  }'

# Synthesize Light Protocol
curl -X POST http://localhost:3000/api/light-genesis/synthesize-light \
  -H "Content-Type: application/json" \
  -d '{
    "lightPreset": "AURORA",
    "wavelengthTHz": 540,
    "powerWatts": 100
  }'
```

---

## 🟠 AI Vision

```bash
# Initialize game
curl -X POST http://localhost:3000/api/ai-vision/game/init \
  -H "Content-Type: application/json" \
  -d '{
    "gameMode": "story",
    "difficulty": "normal",
    "features": {"aiEnabled": true}
  }'

# Send command
curl -X POST http://localhost:3000/api/ai-vision/game/command \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "GAME-xyz",
    "command": "move",
    "parameters": {"direction": "north"}
  }'

# Get state
curl http://localhost:3000/api/ai-vision/game/state/GAME-xyz
```

---

## 🟢 Light Protocol

```bash
# Validate code
curl -X POST http://localhost:3000/api/light-protocol/validate \
  -H "Content-Type: application/json" \
  -d '{"code": "fn main() { print(\"Hello\") }"}'

# Compile
curl -X POST http://localhost:3000/api/light-protocol/compile \
  -H "Content-Type: application/json" \
  -d '{
    "code": "fn main() { print(\"Hello\") }",
    "target": "bytecode",
    "optimizationLevel": 2
  }'

# Get spec
curl http://localhost:3000/api/light-protocol/spec

# Format code
curl -X POST http://localhost:3000/api/light-protocol/format \
  -H "Content-Type: application/json" \
  -d '{"code": "fn main(){print(\"test\")}", "style": "standard"}'
```

---

## 🔵 Light Stage One

```bash
# Execute program
curl -X POST http://localhost:3000/api/light-stage-one/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "let x = 10\nlet y = 20\nprint(x + y)",
    "mode": "interpreted",
    "timeout": 5000
  }'

# Run tests
curl -X POST http://localhost:3000/api/light-stage-one/test \
  -H "Content-Type: application/json" \
  -d '{"testFiles": ["fibonacci.test.light"], "coverage": true}'

# Get benchmarks
curl http://localhost:3000/api/light-stage-one/benchmarks
```

---

## 🟡 Integrations

```bash
# Check status
curl http://localhost:3000/api/integrations/status

# Execute concurrent task
curl -X POST http://localhost:3000/api/integrations/concurrency/execute \
  -H "Content-Type: application/json" \
  -d '{
    "tasks": [
      {"id": "task1", "function": "process_data"},
      {"id": "task2", "function": "analyze"}
    ],
    "parallelism": 4
  }'

# Deploy to cloud
curl -X POST http://localhost:3000/api/integrations/cloud/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "service": "module_name",
    "version": "1.0.0",
    "target": "aws"
  }'
```

---

## 🔐 Authentication

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Refresh token
curl -X POST http://localhost:3000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "YOUR_REFRESH_TOKEN"}'

# Logout
curl -X POST http://localhost:3000/api/auth/logout
```

---

## 🏥 Health & Status

```bash
# Check health
curl http://localhost:3000/api/health

# List all modules
curl http://localhost:3000/api/modules

# Get module details
curl http://localhost:3000/api/modules/universal-method
```

---

## 🐛 Troubleshooting Commands

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (macOS/Linux)
lsof -i :3000
kill -9 <PID>

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check environment
npm run env:validate

# Validate setup
npm run test:setup
```

---

## 📁 Project Structure

```
Universal-comparability-method/
├── src/
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Main component
│   ├── components/              # Shared UI
│   ├── modules/                 # 6 modules
│   ├── services/                # Shared services
│   ├── hooks/                   # React hooks
│   ├── types/                   # TypeScript types
│   ├── styles/                  # Global styles
│   └── utils/                   # Utilities
├── server.ts                    # Express backend
├── public/                      # Static assets
├── docs/                        # Documentation
├── examples/                    # Code examples
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
└── index.html                   # HTML entry
```

---

## 📖 Documentation Links

- **Main:** `/README.md`
- **Modules:** `/docs/MODULES.md`
- **Architecture:** `/docs/ARCHITECTURE.md`
- **API:** `/docs/API.md`
- **Getting Started:** `/docs/GETTING_STARTED.md`
- **Summary:** `/PROJECT_SUMMARY.md`
- **This Guide:** `/QUICK_REFERENCE.md`

---

## 🎨 Key URLs

- **Local Dev:** http://localhost:3000
- **API Base:** http://localhost:3000/api
- **Universal Method:** https://universal-comparability-method.vercel.app
- **Light Genesis:** https://light-genesis-core.lovable.app

---

## 📊 Module Matrix

| Module | Endpoint | Status | Live Demo |
|--------|----------|--------|-----------|
| Universal | `/universal-method/*` | ✅ Active | ✓ Yes |
| Genesis | `/light-genesis/*` | ✅ Active | ✓ Yes |
| AI Vision | `/ai-vision/*` | ✅ Active | ✗ No |
| Protocol | `/light-protocol/*` | ✅ Active | ✗ No |
| Stage One | `/light-stage-one/*` | ✅ Active | ✗ No |
| Integrations | `/integrations/*` | ✅ Beta | ✗ No |

---

## 🔑 Environment Variables

Create `.env.local`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000
GEMINI_API_KEY=your_key_here
DATABASE_URL=postgresql://user:pass@localhost/db
JWT_SECRET=your_secret_key
NODE_ENV=development
DEBUG=true
```

---

## 🧪 Test Commands

```bash
npm run test                    # Run all tests
npm run test:universal-method   # Test module
npm run test:light-genesis      # Test module
npm run test:ai-vision          # Test module
npm run test:light-protocol     # Test module
npm run test:light-stage-one    # Test module
npm run test:integrations       # Test module
npm run test:setup              # Validate environment
```

---

## 🚀 Deployment

```bash
# Build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel deploy

# Deploy to AWS
aws s3 sync dist/ s3://bucket-name

# Docker
docker build -t platform-hub .
docker run -p 3000:3000 platform-hub
```

---

## 💡 Quick Tips

- **HMR Works:** Changes refresh instantly
- **DevTools:** Press F12 for browser tools
- **React DevTools:** Install for better debugging
- **Network Tab:** Monitor API calls in F12
- **Console:** Check for errors and warnings
- **Search:** Use sidebar search to filter modules
- **Docs:** Always check `/docs/` for details
- **Examples:** Check `/examples/` for code samples

---

## 🎯 Common Workflows

### Adding a New Module
1. Create folder in `src/modules/[module-name]`
2. Add components and services
3. Register in `App.tsx` module array
4. Add API endpoints in `server.ts`
5. Document in `/docs/MODULES.md`

### Making API Call
```javascript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(data)
});
const result = await response.json();
```

### Creating Component
```typescript
import React from 'react';

interface Props {
  title: string;
}

export default function Component({ title }: Props) {
  return <div>{title}</div>;
}
```

---

## 📞 Quick Support

| Issue | Solution |
|-------|----------|
| Port in use | Kill process or use `--port 3001` |
| Dependencies fail | `rm -rf node_modules && npm install` |
| API not responding | Check server: `curl /api/health` |
| Module not showing | Clear cache & hard refresh |
| Errors in console | Check `.env.local` variables |
| Build fails | Check `npm run lint` for errors |

---

## ✅ Verification Checklist

- [ ] npm install completed
- [ ] npm run dev starts
- [ ] http://localhost:3000 loads
- [ ] All 6 modules visible
- [ ] Can click modules
- [ ] API health check passes
- [ ] No console errors
- [ ] Search works
- [ ] Navigation works
- [ ] Live demo links valid

---

## 📈 Performance Metrics

```
Target Performance:
- Load time: <2s
- API latency: <100ms
- Bundle size: <500KB gzipped
- Lighthouse score: >90

Monitor with:
- DevTools Performance tab
- Network tab (F12)
- Lighthouse audit (F12)
```

---

**Quick Reference v1.0**  
**Updated:** August 2026  
**For:** AdamAlexanderOO/Universal-comparability-method
