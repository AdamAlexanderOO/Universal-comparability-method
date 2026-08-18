# Getting Started Guide - Quick Setup & Tutorial

## ⚡ Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- npm 9+ or bun
- Git
- Code editor (VS Code recommended)
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone repository
git clone https://github.com/AdamAlexanderOO/Universal-comparability-method
cd Universal-comparability-method

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev

# Open browser
# Visit: http://localhost:3000
```

**Done!** 🎉 Your platform hub is running.

---

## 🎯 First Steps

### 1. Explore the Dashboard
- Open http://localhost:3000
- You'll see 6 module cards
- Each card shows module status, features, and links
- Click any module to view details

### 2. Check Status
```bash
# Terminal 1: Start server (already running from npm run dev)

# Terminal 2: Check API health
curl http://localhost:3000/api/health

# Response:
# {
#   "status": "operational",
#   "aiCoreAvailable": true,
#   "timestamp": "2026-08-18T19:00:00Z"
# }
```

### 3. Access Live Demos
- **Universal Comparability Method**: https://universal-comparability-method.vercel.app
- **Light Genesis Core**: https://light-genesis-core.lovable.app

---

## 📚 Module-Specific Getting Started

### 🔷 Universal Comparability Method

**Use Case:** Comparing datasets and analyzing similarities

**Quick Tutorial:**
```bash
# 1. Run a comparison
curl -X POST http://localhost:3000/api/universal-method/compare \
  -H "Content-Type: application/json" \
  -d '{
    "datasets": [
      {
        "id": "dataset1",
        "name": "Dataset A",
        "values": [10, 20, 30, 40, 50],
        "type": "numeric"
      },
      {
        "id": "dataset2",
        "name": "Dataset B",
        "values": [12, 22, 32, 42, 52],
        "type": "numeric"
      }
    ],
    "parameters": {
      "algorithm": "pearson",
      "confidence": 0.95
    }
  }'

# 2. You'll get back:
# {
#   "status": "success",
#   "comparisonId": "CMP-abc123",
#   "results": {
#     "similarity": 0.987,
#     "correlation": {...}
#   }
# }

# 3. Fetch results
curl http://localhost:3000/api/universal-method/results/CMP-abc123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Key Features to Try:**
- Multi-parameter comparison
- Real-time visualization
- Export to CSV/JSON/PDF
- Advanced analytics
- Custom comparison rules

---

### 🟣 Light Genesis Core

**Use Case:** Civilization simulation with advanced procedural animations

**Quick Tutorial:**
```bash
# 1. Initialize simulation
curl -X POST http://localhost:3000/api/light-genesis/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "galactic",
    "parameters": {
      "initialPopulation": 1000,
      "startingResources": {
        "energy": 5000,
        "materials": 2000
      }
    },
    "context": {
      "difficulty": "normal"
    }
  }'

# 2. Get system diagnostics
curl -X POST http://localhost:3000/api/light-genesis/diagnose \
  -H "Content-Type: application/json" \
  -d '{
    "deckState": {
      "fluxFrequency": 65,
      "shieldLevel": 100,
      "aiCoreSynapses": 87
    }
  }'

# 3. Synthesize Light Protocol
curl -X POST http://localhost:3000/api/light-genesis/synthesize-light \
  -H "Content-Type: application/json" \
  -d '{
    "lightPreset": "AURORA",
    "wavelengthTHz": 540,
    "powerWatts": 100
  }'
```

**Scanner Modes to Explore:**
1. **Galactic** - Universe scale
2. **Fleet** - Ship management
3. **Planetary** - Surface detail
4. **Industrial** - Manufacturing
5. **Circuit** - Electronics
6. **Energy** - Power systems
7. **Knowledge** - Information
8. **AI/Runtime** - Intelligence
9. **Heat** - Thermal analysis

---

### 🟠 AI Vision

**Use Case:** Game engine with AI and vision processing

**Quick Tutorial:**
```bash
# 1. Initialize game session
curl -X POST http://localhost:3000/api/ai-vision/game/init \
  -H "Content-Type: application/json" \
  -d '{
    "gameMode": "story",
    "difficulty": "normal",
    "features": {
      "aiEnabled": true,
      "visionProcessing": true
    }
  }'

# Response includes sessionId

# 2. Send player command
curl -X POST http://localhost:3000/api/ai-vision/game/command \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "GAME-session123",
    "command": "move",
    "parameters": {
      "direction": "north"
    }
  }'

# 3. Get current game state
curl http://localhost:3000/api/ai-vision/game/state/GAME-session123
```

**Game Modes:**
- **Story** - Guided campaign
- **Sandbox** - Free exploration
- **Challenge** - Timed objectives
- **Script** - Custom scripting

---

### 🟢 Light Protocol

**Use Case:** Programming language with full compiler and runtime

**Quick Tutorial:**

Create a file `hello.light`:
```light
fn main() {
  print("Hello, Light World!")
}
```

Then compile and run:
```bash
# 1. Validate code
curl -X POST http://localhost:3000/api/light-protocol/validate \
  -H "Content-Type: application/json" \
  -d '{
    "code": "fn main() { print(\"Hello\") }"
  }'

# 2. Compile
curl -X POST http://localhost:3000/api/light-protocol/compile \
  -H "Content-Type: application/json" \
  -d '{
    "code": "fn main() { print(\"Hello\") }",
    "target": "bytecode",
    "optimizationLevel": 2
  }'

# 3. Get specification
curl http://localhost:3000/api/light-protocol/spec

# 4. Format code
curl -X POST http://localhost:3000/api/light-protocol/format \
  -H "Content-Type: application/json" \
  -d '{
    "code": "fn main(){print(\"test\")}",
    "style": "standard"
  }'
```

**Language Features:**
- Strong typing
- Pattern matching
- First-class functions
- Module system
- Standard library
- Error handling

---

### 🔵 Light Stage One

**Use Case:** Foundation implementation of Light Protocol

**Quick Tutorial:**
```bash
# 1. Execute program
curl -X POST http://localhost:3000/api/light-stage-one/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "let x = 10\nlet y = 20\nprint(x + y)",
    "mode": "interpreted",
    "timeout": 5000
  }'

# 2. Run tests
curl -X POST http://localhost:3000/api/light-stage-one/test \
  -H "Content-Type: application/json" \
  -d '{
    "testFiles": ["fibonacci.test.light"],
    "coverage": true
  }'

# 3. View benchmarks
curl http://localhost:3000/api/light-stage-one/benchmarks
```

**Example Programs:**

Fibonacci:
```light
fn fibonacci(n: u32) -> u32 {
  if n <= 1 {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
```

Factorial:
```light
fn factorial(n: u32) -> u32 {
  if n == 0 {
    return 1
  }
  return n * factorial(n - 1)
}
```

---

### 🟡 Extended Integrations

**Use Case:** Advanced features and experimental modules

**Quick Tutorial:**
```bash
# 1. Check integration status
curl http://localhost:3000/api/integrations/status

# 2. Execute concurrent task
curl -X POST http://localhost:3000/api/integrations/concurrency/execute \
  -H "Content-Type: application/json" \
  -d '{
    "tasks": [
      { "id": "task1", "function": "process_data", "params": {} },
      { "id": "task2", "function": "analyze", "params": {} }
    ],
    "parallelism": 4
  }'

# 3. Deploy to cloud
curl -X POST http://localhost:3000/api/integrations/cloud/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "service": "module_name",
    "version": "1.0.0",
    "target": "aws",
    "region": "us-east-1"
  }'
```

---

## 🔧 Development Workflow

### Project Structure
```
Universal-comparability-method/
├── src/
│   ├── main.tsx           # React entry
│   ├── App.tsx            # Main component
│   ├── modules/           # 6 modules
│   └── components/        # Shared UI
├── server.ts              # Backend
├── package.json
├── vite.config.ts
└── index.html
```

### Common Commands

```bash
# Development
npm run dev              # Start dev server + HMR

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check code quality
npm run format           # Auto-format code
npm run test             # Run tests

# Environment
npm run env:setup        # Setup environment
npm run env:validate     # Validate environment

# Database (if applicable)
npm run db:migrate       # Run migrations
npm run db:seed          # Seed test data
```

---

## 🔑 Environment Setup

### Create `.env.local`
```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Google GenAI
GEMINI_API_KEY=your_api_key_here

# Database (optional)
DATABASE_URL=postgresql://user:password@localhost/db

# Authentication
JWT_SECRET=your_jwt_secret_key

# Environment
NODE_ENV=development
DEBUG=true
```

### Validate Environment
```bash
npm run env:validate

# Checks for all required variables
```

---

## 📱 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | Latest  | ✅ Full |
| Firefox | Latest  | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | Latest  | ✅ Full |
| Mobile  | iOS 12+ | ✅ Full |

---

## 🧪 Testing Your Setup

### Run Full Setup Test
```bash
# This validates everything is working
npm run test:setup

# Checks:
# ✓ Node.js version
# ✓ npm dependencies
# ✓ Environment variables
# ✓ API connectivity
# ✓ Database connection
# ✓ All modules accessible
```

### Test Individual Modules
```bash
# Universal Method
npm run test:universal-method

# Light Genesis
npm run test:light-genesis

# AI Vision
npm run test:ai-vision

# Light Protocol
npm run test:light-protocol

# Light Stage One
npm run test:light-stage-one

# Integrations
npm run test:integrations
```

---

## 📖 Learning Resources

### Official Documentation
- **Main Guide:** `/docs/README.md`
- **Module Details:** `/docs/MODULES.md`
- **Architecture:** `/docs/ARCHITECTURE.md`
- **API Reference:** `/docs/API.md`
- **This Guide:** `/docs/GETTING_STARTED.md`

### Code Examples
Located in `/examples/` directory:
```
examples/
├── universal-method/      # Comparison examples
├── light-genesis/         # Simulation examples
├── ai-vision/             # Game examples
└── light-protocol/        # Language examples
```

### Video Tutorials (Coming Soon)
- Getting started with each module
- Building with Universal Platform Hub
- Advanced integration patterns
- Performance optimization

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- --port 3001
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Environment Variables Not Loading
```bash
# Check .env file exists
ls -la .env.local

# Restart dev server
# Ctrl+C to stop
npm run dev
```

### API Not Responding
```bash
# Check server is running
curl http://localhost:3000/api/health

# Check logs for errors
# Look in terminal output

# Restart server
npm run dev
```

### Module Not Appearing
```bash
# Check module is properly imported
# Check /src/modules/[module-name] exists
# Verify module registration in App.tsx
# Clear browser cache (Ctrl+Shift+Del)
# Hard refresh (Ctrl+Shift+R)
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm run dev` starts without errors
- [ ] Browser opens to http://localhost:3000
- [ ] Dashboard loads with all 6 modules visible
- [ ] Can click each module card
- [ ] Module details page loads
- [ ] API health check passes: `curl http://localhost:3000/api/health`
- [ ] Can run example code from any module
- [ ] No console errors in browser (F12)
- [ ] Sidebar navigation works
- [ ] Search filters modules correctly

---

## 🚀 Next Steps

After getting everything running:

1. **Explore Modules** - Try each module's features
2. **Read Documentation** - Understand architecture
3. **Run Examples** - See practical usage
4. **Build Something** - Create your own integration
5. **Join Community** - Contribute and collaborate

---

## 💡 Tips & Best Practices

### Development Tips
- Use VS Code with recommended extensions
- Enable format-on-save in editor
- Keep terminal visible for errors
- Use browser DevTools (F12)
- Test with different screen sizes

### Performance Tips
- Use React DevTools profiler
- Monitor network requests
- Check bundle size regularly
- Enable source maps in dev
- Use lazy loading for modules

### Security Tips
- Never commit .env files
- Use strong JWT secrets
- Validate all inputs
- Keep dependencies updated
- Review API access logs

---

## 📞 Getting Help

### Resources
1. **Documentation:** `/docs/` folder
2. **Code Examples:** `/examples/` folder
3. **GitHub Issues:** Report bugs
4. **GitHub Discussions:** Ask questions
5. **API Reference:** `/docs/API.md`

### Common Questions

**Q: Can I use this in production?**
A: Yes! Build with `npm run build` and deploy. See deployment docs.

**Q: How do I add a new module?**
A: Follow module structure in `/src/modules/` and register in App.tsx.

**Q: Can I modify the dashboard?**
A: Absolutely! Edit `/src/App.tsx` to customize the interface.

**Q: How do I deploy?**
A: See deployment section in docs. Supports Vercel, AWS, Docker, etc.

---

## 🎓 Learning Path

Recommended order to learn:
1. ✅ Run this guide (you're here!)
2. → Try each module's quick tutorial
3. → Read module-specific documentation
4. → Explore code examples
5. → Build a small project
6. → Study architecture
7. → Contribute improvements

---

**Ready to build something amazing?** 🚀

Start with any module above and follow the tutorial. Happy coding!

---

**Version:** 1.0.0  
**Last Updated:** August 2026  
**Maintained by:** AdamAlexanderOO
