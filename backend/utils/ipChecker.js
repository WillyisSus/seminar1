import ipRangeCheck from "ip-range-check"

const ALLOWED_IPS = ["127.0.0.1"];

export const ipChecker = (req, res, next) => {
  const clientIp = req.ip;

  // Check if the client's IP is in our allowed list
  if (ipRangeCheck(clientIp, ALLOWED_IPS)) {
    // IP is allowed, proceed to the next route
    next();
  } else {
    // IP is not allowed, send a 403 Forbidden error
    console.warn(`Forbidden: Denied access from IP ${clientIp}`);
    res.status(403).json({ message: "Forbidden: You do not have access." });
  }
};
