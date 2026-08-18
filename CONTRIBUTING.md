# Contributing Guide

## 👋 Welcome!

Thank you for interest in contributing to Universal Platform Hub!

## 🤝 How to Contribute

### Reporting Bugs
1. Check existing issues first
2. Create new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment info

### Suggesting Features
1. Check discussions first
2. Create discussion with:
   - Feature description
   - Use case and benefits
   - Implementation ideas
   - Alternative approaches

### Code Contributions
1. Fork repository
2. Create feature branch: `git checkout -b feature/name`
3. Make changes following code style
4. Add tests for new functionality
5. Run `npm run lint` and `npm run test`
6. Create pull request with description

## 📋 Development Setup

```bash
# Clone and setup
git clone https://github.com/[your-fork]/Universal-comparability-method
cd Universal-comparability-method
npm install
npm run dev

# Create branch
git checkout -b feature/your-feature

# Make changes and test
npm run lint
npm run test

# Commit and push
git add .
git commit -m "feat: description of changes"
git push origin feature/your-feature
```

## ✨ Code Style

- Use TypeScript
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive variable names
- Add comments for complex logic
- Include JSDoc for functions

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test
npm run test -- filename

# Check coverage
npm run test:coverage
```

## 📝 Commit Messages

Use conventional commits:
- `feat: new feature`
- `fix: bug fix`
- `docs: documentation`
- `style: formatting`
- `test: tests`
- `refactor: code refactoring`

## 📚 Documentation

When adding features:
1. Update relevant docs in `/docs/`
2. Add code examples in `/examples/`
3. Update API reference if needed
4. Add tests to verify functionality

## 🔒 Security

- Don't commit API keys or secrets
- Use environment variables
- Validate all inputs
- Run security checks
- Report security issues privately

## ✅ PR Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Lint passing: `npm run lint`
- [ ] Tests passing: `npm run test`
- [ ] Code formatted: `npm run format`
- [ ] No console errors
- [ ] Changes follow style guide
- [ ] PR description is clear

## 🎯 Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Rebase if needed
4. PR merged when approved
5. Changes deployed automatically

## 📖 Resources

- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Module Guide](docs/MODULES.md)
- [Getting Started](docs/GETTING_STARTED.md)

## 🙏 Thanks!

Your contributions make this project better!

---

Happy coding! 🚀