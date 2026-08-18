# REST API Reference - Complete Endpoint Guide

## 🌐 API Overview

Base URL: `http://localhost:3000/api`

All endpoints support JSON request/response format. API authentication uses JWT tokens passed in the `Authorization` header.

---

## 📋 Core Endpoints

### Health Check
```
GET /health

Response (200):
{
  "status": "operational",
  "aiCoreAvailable": true,
  "timestamp": "2026-08-18T19:00:00Z"
}
```

### Module Management
```
GET /modules

Response (200):
{
  "modules": [
    {
      "id": "universal-method",
      "name": "Universal Comparability Method",
      "status": "active",
      "version": "1.0.0"
    },
    ...
  ]
}

GET /modules/:id

Response (200):
{
  "id": "universal-method",
  "name": "Universal Comparability Method",
  "description": "...",
  "status": "active",
  "features": [...],
  "endpoints": [...]
}
```

---

## 🔷 Universal Comparability Method API

### Run Comparison Analysis
```
POST /universal-method/compare

Request:
{
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
      "values": [15, 25, 35, 45, 55],
      "type": "numeric"
    }
  ],
  "parameters": {
    "algorithm": "pearson",
    "confidence": 0.95,
    "includeStats": true
  },
  "rules": [
    {
      "type": "threshold",
      "min": 0.5,
      "max": 1.0
    }
  ]
}

Response (200):
{
  "status": "success",
  "comparisonId": "CMP-abc123",
  "results": {
    "similarity": 0.987,
    "correlation": {
      "pearson": 0.987,
      "spearman": 0.965,
      "euclidean": 0.042
    },
    "statistics": {
      "mean_difference": 5.0,
      "std_deviation": 2.5,
      "confidence": 0.95
    }
  },
  "metadata": {
    "timestamp": "2026-08-18T19:00:00Z",
    "duration": 245,
    "algorithm": "pearson"
  }
}

Error (400):
{
  "status": "error",
  "error": {
    "code": "INVALID_DATASETS",
    "message": "Datasets must have at least 2 elements"
  }
}
```

### Fetch Comparison Results
```
GET /universal-method/results/:comparisonId

Response (200):
{
  "comparisonId": "CMP-abc123",
  "datasets": {...},
  "results": {...},
  "createdAt": "2026-08-18T19:00:00Z",
  "expiresAt": "2026-08-25T19:00:00Z"
}

Error (404):
{
  "status": "error",
  "error": {
    "code": "NOT_FOUND",
    "message": "Comparison not found"
  }
}
```

### Export Comparison Data
```
POST /universal-method/export

Request:
{
  "comparisonId": "CMP-abc123",
  "format": "json|csv|pdf",
  "includeMetadata": true
}

Response (200):
{
  "status": "success",
  "downloadUrl": "https://...",
  "filename": "comparison_abc123.json",
  "format": "json",
  "size": 2048
}
```

### List Comparisons
```
GET /universal-method/results?limit=10&offset=0&sort=created_desc

Response (200):
{
  "comparisons": [
    {
      "id": "CMP-abc123",
      "name": "Comparison 1",
      "createdAt": "2026-08-18T19:00:00Z",
      "similarity": 0.987
    },
    ...
  ],
  "pagination": {
    "total": 42,
    "limit": 10,
    "offset": 0
  }
}
```

---

## 🟣 Light Genesis Core API

### Initialize Civilization Simulation
```
POST /light-genesis/simulate

Request:
{
  "mode": "civilization|fleet|planetary|industrial|circuit|energy|knowledge|ai",
  "parameters": {
    "initialPopulation": 1000,
    "startingResources": {
      "energy": 5000,
      "materials": 2000,
      "knowledge": 100
    },
    "generationTarget": 1000,
    "timeScale": 1.0
  },
  "context": {
    "difficulty": "normal",
    "features": ["terraforming", "spaceflight", "ai"]
  }
}

Response (200):
{
  "status": "simulated_ai",
  "simulationId": "SIM-xyz789",
  "output": {
    "title": "Aurora Genesis Matrix Pulse",
    "description": "Civilization initialized with stable quantum parameters...",
    "metrics": {
      "efficiency": "94.2%",
      "quantumCoherence": "0.984 Φ",
      "entropyIndex": "0.012 Δe",
      "thermalDissipation": "234 W/cm²"
    },
    "recommendation": "Increase nutrient circulation to dampen harmonics",
    "anomaliesDetected": 0,
    "events": [
      "Initial settlement established",
      "Light-Protocol bus initialized",
      "Shield deflector activated"
    ]
  },
  "metadata": {
    "timestamp": "2026-08-18T19:00:00Z",
    "duration": 1234
  }
}
```

### System Diagnostics
```
POST /light-genesis/diagnose

Request:
{
  "deckState": {
    "fluxFrequency": 65,
    "shieldLevel": 100,
    "nutrientCirculation": 95,
    "aiCoreSynapses": 87,
    "gearTrain": 92,
    "hologramMesh": 98
  }
}

Response (200):
{
  "status": "diagnostic_ai",
  "analysis": "All subsystems within operational tolerances...",
  "subsystemRatings": {
    "lightProtocol": "OPTIMAL",
    "gearTrain": "SYNCHRONIZED",
    "hologramMesh": "COHERENT",
    "nutrientCirculation": "STABLE",
    "aiCoreSynapses": "BALANCED",
    "shieldDeflector": "OPTIMAL"
  },
  "directives": [
    "Maintain flux frequency between 60-80 GHz",
    "Verify secondary heat-treated alloy seals on node 04",
    "Schedule routine hologram recalibration"
  ]
}
```

### Synthesize Light Protocol
```
POST /light-genesis/synthesize-light

Request:
{
  "lightPreset": "AURORA",
  "wavelengthTHz": 540,
  "powerWatts": 100
}

Response (200):
{
  "status": "synthesized_ai",
  "protocolName": "AURORA-HARMONIC-v7",
  "spectralBand": "540 THz",
  "energyYield": "142.0 MW/s",
  "resonanceColor": "#00f0ff",
  "fluxPathways": [
    "Core → AI Synapse",
    "Core → Nutrient Buffer",
    "Core → Shield Grid"
  ],
  "summary": "Coherent photon stream stabilized and locked into hardware matrix"
}
```

### Get Scanner State
```
GET /light-genesis/scanner/:mode

Response (200):
{
  "mode": "galactic",
  "state": {
    "zoom": 1000000,
    "centerX": 0,
    "centerY": 0,
    "objects": [
      {
        "id": "sys-001",
        "type": "star_system",
        "name": "Sol",
        "position": [0, 0],
        "scale": 1.0
      },
      ...
    ]
  }
}
```

---

## 🟠 AI Vision API

### Initialize Game Session
```
POST /ai-vision/game/init

Request:
{
  "gameMode": "story|sandbox|challenge|script",
  "difficulty": "easy|normal|hard|expert",
  "features": {
    "aiEnabled": true,
    "visionProcessing": true,
    "scriptableMode": false
  }
}

Response (200):
{
  "status": "success",
  "sessionId": "GAME-session123",
  "gameState": {
    "player": {
      "id": "player1",
      "position": [0, 0, 0],
      "health": 100,
      "inventory": []
    },
    "map": {
      "width": 1024,
      "height": 768,
      "terrain": "..."
    },
    "mode": "story",
    "difficulty": "normal"
  }
}
```

### Process Game Command
```
POST /ai-vision/game/command

Request:
{
  "sessionId": "GAME-session123",
  "command": "move|attack|interact|use_item",
  "parameters": {
    "direction": "north",
    "targetId": "npc-001",
    "itemId": "weapon-sword"
  }
}

Response (200):
{
  "status": "success",
  "commandId": "CMD-abc123",
  "result": {
    "success": true,
    "playerState": {
      "position": [10, 0, 0],
      "health": 95,
      "animation": "walk_forward"
    },
    "events": [
      {
        "type": "movement",
        "description": "Player moved north"
      }
    ]
  }
}
```

### Get Game State
```
GET /ai-vision/game/state/:sessionId

Response (200):
{
  "sessionId": "GAME-session123",
  "gameState": {
    "timestamp": 15234,
    "player": {...},
    "entities": [...],
    "map": {...},
    "ui": {
      "health": 95,
      "mana": 50,
      "inventory": {...}
    }
  }
}
```

### Load Game Script
```
POST /ai-vision/game/script

Request:
{
  "sessionId": "GAME-session123",
  "scriptContent": "MOVE north 10\nATTACK enemy\n..."
}

Response (200):
{
  "status": "success",
  "scriptId": "SCRIPT-def456",
  "executionLog": [
    "✓ MOVE north 10",
    "✓ ATTACK enemy",
    "✗ LOOT - no items found"
  ],
  "finalState": {...}
}
```

---

## 🟢 Light Protocol API

### Validate Protocol Code
```
POST /light-protocol/validate

Request:
{
  "code": "fn main() { print(\"Hello\") }"
}

Response (200):
{
  "status": "success",
  "valid": true,
  "diagnostics": [],
  "warnings": []
}

Error (400):
{
  "status": "error",
  "valid": false,
  "diagnostics": [
    {
      "line": 1,
      "column": 15,
      "severity": "error",
      "message": "Unexpected token: print"
    }
  ]
}
```

### Compile Code
```
POST /light-protocol/compile

Request:
{
  "code": "let x: i32 = 42\nfn main() { return x }",
  "target": "bytecode|llvm|native",
  "optimizationLevel": 2
}

Response (200):
{
  "status": "success",
  "compilationId": "COMPILE-ghi789",
  "bytecode": "60 50 20 01 ...",
  "metadata": {
    "size": 256,
    "symbols": 5,
    "optimizations": ["dead_code_elimination", "constant_folding"]
  }
}
```

### Get Protocol Specification
```
GET /light-protocol/spec?version=latest

Response (200):
{
  "version": "1.0.0",
  "specification": {
    "types": [...],
    "keywords": [...],
    "operators": [...],
    "builtins": [...],
    "grammar": "..."
  },
  "stdlib": {
    "io": {...},
    "math": {...},
    "collections": {...}
  }
}
```

### Format Code
```
POST /light-protocol/format

Request:
{
  "code": "fn main(){print(\"test\")}",
  "style": "standard|compact|expanded"
}

Response (200):
{
  "status": "success",
  "formatted": "fn main() {\n  print(\"test\")\n}"
}
```

### Get Language Documentation
```
GET /light-protocol/docs/:topic

Response (200):
{
  "topic": "functions",
  "content": "# Functions in Light Protocol\n\n...",
  "examples": [
    {
      "title": "Basic Function",
      "code": "fn add(a: i32, b: i32) -> i32 {\n  return a + b\n}"
    }
  ]
}
```

---

## 🔵 Light Stage One API

### Execute Program
```
POST /light-stage-one/execute

Request:
{
  "code": "let x = 10\nlet y = 20\nprint(x + y)",
  "mode": "interpreted|compiled",
  "timeout": 5000
}

Response (200):
{
  "status": "success",
  "executionId": "EXEC-jkl012",
  "output": "30",
  "exitCode": 0,
  "metrics": {
    "executionTime": 45,
    "memoryUsed": 1024,
    "instructionsExecuted": 150
  }
}
```

### Run Tests
```
POST /light-stage-one/test

Request:
{
  "testFiles": ["fibonacci.test.light", "math.test.light"],
  "coverage": true,
  "verbose": true
}

Response (200):
{
  "status": "success",
  "testId": "TEST-mno345",
  "results": {
    "passed": 42,
    "failed": 0,
    "skipped": 2,
    "duration": 1234
  },
  "coverage": {
    "lines": 85.5,
    "branches": 72.3,
    "functions": 90.0
  }
}
```

### Get Benchmarks
```
GET /light-stage-one/benchmarks

Response (200):
{
  "benchmarks": [
    {
      "name": "fibonacci",
      "iterations": 1000,
      "averageTime": 2.5,
      "minTime": 1.2,
      "maxTime": 5.3,
      "unit": "ms"
    },
    {
      "name": "sort_array",
      "iterations": 500,
      "averageTime": 15.8,
      "unit": "ms"
    }
  ]
}
```

---

## 🟡 Extended Integrations API

### Get Integration Status
```
GET /integrations/status

Response (200):
{
  "integrations": [
    {
      "id": "concurrency",
      "name": "Concurrent Execution",
      "status": "active",
      "endpoints": 5
    },
    {
      "id": "networking",
      "name": "Network Protocols",
      "status": "active",
      "endpoints": 8
    },
    {
      "id": "storage",
      "name": "Database Integration",
      "status": "active",
      "endpoints": 12
    },
    {
      "id": "cloud",
      "name": "Cloud Deployment",
      "status": "beta",
      "endpoints": 6
    },
    {
      "id": "monitoring",
      "name": "Performance Monitoring",
      "status": "active",
      "endpoints": 10
    }
  ]
}
```

### Execute Concurrent Task
```
POST /integrations/concurrency/execute

Request:
{
  "tasks": [
    { "id": "task1", "function": "process_data", "params": {...} },
    { "id": "task2", "function": "analyze_results", "params": {...} }
  ],
  "parallelism": 4,
  "timeout": 30000
}

Response (200):
{
  "status": "success",
  "jobId": "JOB-pqr678",
  "results": [
    { "taskId": "task1", "result": {...}, "duration": 234 },
    { "taskId": "task2", "result": {...}, "duration": 189 }
  ]
}
```

### Deploy to Cloud
```
POST /integrations/cloud/deploy

Request:
{
  "service": "module_name",
  "version": "1.0.0",
  "target": "aws|gcp|azure",
  "region": "us-east-1",
  "scalingPolicy": "auto"
}

Response (200):
{
  "status": "success",
  "deploymentId": "DEPLOY-stu901",
  "endpoint": "https://service.cloud.provider.com",
  "status": "active",
  "instances": 3
}
```

---

## 🔐 Authentication API

### Login
```
POST /auth/login

Request:
{
  "email": "user@example.com",
  "password": "secure_password"
}

Response (200):
{
  "status": "success",
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600,
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

### Refresh Token
```
POST /auth/refresh-token

Request:
{
  "refreshToken": "eyJhbGc..."
}

Response (200):
{
  "status": "success",
  "token": "eyJhbGc...",
  "expiresIn": 3600
}
```

### Logout
```
POST /auth/logout

Response (200):
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

## 📊 Error Responses

### Error Codes
```
400 - Bad Request
  - INVALID_PARAMS
  - MISSING_REQUIRED_FIELD
  - INVALID_FORMAT

401 - Unauthorized
  - INVALID_TOKEN
  - TOKEN_EXPIRED
  - NO_CREDENTIALS

403 - Forbidden
  - INSUFFICIENT_PERMISSIONS
  - ACCESS_DENIED

404 - Not Found
  - RESOURCE_NOT_FOUND
  - MODULE_NOT_FOUND

409 - Conflict
  - DUPLICATE_RESOURCE
  - STATE_CONFLICT

429 - Too Many Requests
  - RATE_LIMIT_EXCEEDED

500 - Server Error
  - INTERNAL_ERROR
  - SERVICE_UNAVAILABLE
  - DATABASE_ERROR
```

### Error Response Format
```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {
      "field": "error detail",
      "suggestion": "possible fix"
    }
  },
  "metadata": {
    "timestamp": "2026-08-18T19:00:00Z",
    "requestId": "req-123"
  }
}
```

---

## 🔄 Rate Limiting

All endpoints are rate limited:

```
Standard Limit: 100 requests/minute
Authenticated: 1000 requests/minute
Enterprise: Unlimited

Headers:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1629302465
```

---

## 📝 Request Headers

Required headers for authenticated endpoints:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
Accept: application/json
User-Agent: YourApp/1.0
```

---

## 🧪 Testing API Calls

### Using cURL
```bash
# Health check
curl http://localhost:3000/api/health

# Authenticated request
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/universal-method/results

# POST request
curl -X POST http://localhost:3000/api/universal-method/compare \
     -H "Content-Type: application/json" \
     -d '{"datasets": [...]}'
```

### Using JavaScript/Fetch
```javascript
// Basic request
const response = await fetch('http://localhost:3000/api/health');
const data = await response.json();

// Authenticated request
const response = await fetch('http://localhost:3000/api/modules', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// POST request
const response = await fetch('http://localhost:3000/api/universal-method/compare', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    datasets: [...],
    parameters: {...}
  })
});
```

---

## 📚 Pagination

All list endpoints support pagination:

```
GET /api/universal-method/results?limit=10&offset=0&sort=created_desc

Query Parameters:
- limit: 1-100 (default: 30)
- offset: 0+ (default: 0)
- sort: created_asc|created_desc|name_asc|name_desc

Response includes:
{
  "items": [...],
  "pagination": {
    "total": 500,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 🔗 Webhooks

Enable webhooks for event notifications:

```
POST /api/webhooks/subscribe

Request:
{
  "events": ["simulation:completed", "compile:failed"],
  "url": "https://yourapp.com/webhook",
  "secret": "webhook_secret"
}

Response:
{
  "webhookId": "webhook-123",
  "status": "active"
}
```

---

**Last Updated:** August 2026  
**API Version:** 1.0.0  
**Status:** Production Ready
