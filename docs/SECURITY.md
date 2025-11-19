# Security Policy

## Overview
This document outlines the security considerations and best practices implemented in the Asterocks project.

## Security Improvements Made

### 1. **Content Security Policy (CSP)**
- Added `Content-Security-Policy` header to prevent XSS attacks
- Restricts script sources to `'self'` and `'unsafe-inline'` (necessary for game canvas)
- Image sources restricted to `'self'`, `data:`, and HTTPS URLs

### 2. **CORS Protection**
- Replaced global CORS with origin validation
- Only allows connections from specified origins (configurable via `ALLOWED_ORIGINS` env var)
- Prevents unauthorized cross-origin requests

### 3. **Input Validation & Sanitization**
- All numeric inputs validated (magnitude, distance, velocity)
- String inputs sanitized with HTML entity escaping
- Magnitude values restricted to 0-30 range
- Distance values validated (0 - 1 trillion km)
- String length limits enforced (50-500 chars depending on field)

### 4. **XSS Prevention**
- `textContent` used instead of `innerHTML` for all user-controlled data display
- Note fields and source information sanitized before rendering
- Table rendering uses DOM creation methods (not string concatenation)

### 5. **Rate Limiting**
- 60 requests per minute per IP address
- In-memory storage with automatic cleanup
- Prevents API abuse and brute force attempts

### 6. **WebSocket Security**
- Message type validation required
- Message size limits (1MB maximum)
- JSON parsing errors gracefully handled
- All WebSocket messages validated before processing

### 7. **Security Headers**
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - Browser-level XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information

### 8. **Error Handling**
- Generic error messages returned to clients (no system details leaked)
- Detailed errors logged server-side only
- Try-catch blocks around critical operations

### 9. **Payload Size Limits**
- Express JSON body limit: 10KB
- WebSocket message limit: 1MB
- String field length limits enforced

## Recommended Additional Security Measures

### For Production Deployment:
1. **Enable HTTPS/TLS** - Use valid SSL certificates
2. **Environment Variables** - Store sensitive config in `.env` (use `.env.example` as template)
3. **Database Security** - If adding persistence, use parameterized queries
4. **Authentication** - Implement user authentication for multiplayer features
5. **Rate Limiting** - Consider external rate limiting service (Redis)
6. **Monitoring** - Set up security event logging and monitoring
7. **HTTPS Redirect** - Redirect HTTP to HTTPS in production
8. **Helmet.js** - Consider using Helmet.js for additional headers
9. **Regular Updates** - Keep dependencies updated (`npm audit`, `npm update`)

### Code Security Best Practices:
- Never log sensitive information
- Validate all external API responses
- Use environment variables for secrets
- Implement request signing for APIs
- Use CSRF tokens for state-changing operations
- Implement proper session management

## Dependency Security

### Current Dependencies:
- `express` - Web framework
- `cheerio` - HTML parsing (web scraping)
- `cors` - Cross-Origin Resource Sharing
- `ws` - WebSocket library

### Security Considerations:
- All dependencies are pinned to safe versions
- Run `npm audit` regularly to check for vulnerabilities
- Keep dependencies updated with `npm update`
- Review `package-lock.json` for dependency trees

## Testing & Validation

To verify security implementations:

1. **Test CORS**: Try requests from unauthorized origins
2. **Test Rate Limiting**: Send 65+ requests in one minute
3. **Test Input Validation**: Send invalid magnitude/distance values
4. **Test XSS**: Attempt HTML injection in note fields
5. **Test Large Payloads**: Send WebSocket messages > 1MB

## Reporting Security Issues

If you discover a security vulnerability, please:
1. **Do not** create a public GitHub issue
2. Email security details to project maintainers
3. Include steps to reproduce the vulnerability
4. Allow 48 hours for initial response

## Changelog

### Version 1.0.0 - Initial Security Audit
- Added CORS origin validation
- Implemented input sanitization
- Added security headers
- Enhanced WebSocket message validation
- Improved error message handling
- Added rate limiting safeguards
- Documented security best practices
