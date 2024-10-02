import dotenv from "dotenv";
dotenv.config();

const allowedOrigins = [
  "http://localhost:4200", // Angular development server
  "http://localhost:4000", // Angular SSR server
];

export const corsMiddleware = (req, res, next) => {
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
