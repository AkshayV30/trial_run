// Rate limiting middleware:

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

export const rateLimitMiddleware = limiter;
