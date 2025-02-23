const net = require('net');

// Function to get the client's IP address
function getClientIp(req) {
  // Check the x-forwarded-for header if present
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    // The first IP in the list is the client's IP
    return ips[0];
  }
  
  // Fallback to connection remote address
  let ipAddress = req.connection.remoteAddress;

  // Normalize IPv6 loopback address to IPv4 loopback
  if (ipAddress === '::1') {
    ipAddress = '127.0.0.1';
  }

  return ipAddress;
}

// Function to validate the IP address
function isValidIp(ip) {
  return net.isIP(ip) !== 0;
}

module.exports = (req) => {
  const clientIp = getClientIp(req);
  if (isValidIp(clientIp))  return clientIp
  return null
}
