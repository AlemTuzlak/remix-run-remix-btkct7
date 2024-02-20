# Steps to reproduce

1. Clone the repository
2. Run the following commands
```bash
npm install
npm run dev
```
Has to be on windows, because the issue is not reproducible on linux.

# Expected behavior

The application should start without any errors.

# Actual behavior

The application fails to start with the following error:
```bash 
[vite] Pre-transform error: Server-only module referenced by client
```