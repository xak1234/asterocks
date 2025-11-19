// config/environment.js
// Centralized environment configuration

module.exports = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',

  // CORS
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'localhost:3000,127.0.0.1:3000').split(','),

  // Data Refresh
  refreshIntervalHours: Number(process.env.REFRESH_INTERVAL_HOURS || 6),

  // Rate Limiting
  rateLimitWindow: 60000, // 1 minute in milliseconds
  rateLimitMaxRequests: 60,

  // Security
  maxPayloadSize: '10kb',
  maxWebSocketMessageSize: 1048576, // 1MB
  maxStringLength: 500,
  maxSourceLength: 100,
  maxNoteLength: 500,

  // Validation Ranges
  magnitude: { min: 0, max: 30 },
  distance: { min: 0, max: 1e12 }, // 0 to 1 trillion km
  velocity: { min: 0.1, max: 250 }, // km/s

  // Data Sources
  dataSources: {
    theSkyLive: {
      url: 'https://theskylive.com/c2025n1-info',
      timeout: 20000
    },
    cobs: {
      url: 'https://cobs.si/recent/',
      timeout: 20000
    }
  }
};
