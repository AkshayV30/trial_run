import dotenv from "dotenv";
dotenv.config();

// 4
const allowedOrigins = [
  "http://localhost:4200", // Angular development server
  "http://localhost:4000", // Angular SSR server
];

export const corsMiddleware = (req, res, next) => {
  // 1
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
  // 2
  // const allowedOrigin = process.env.CORS_ORIGIN;
  // 3
  // const allowedOrigin =
  // process.env.NODE_ENV === "production"
  //   ? "http://frontend:4000" // Production URL
  //   : "http://localhost:4200"; // Development URL

  // 4
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
};
