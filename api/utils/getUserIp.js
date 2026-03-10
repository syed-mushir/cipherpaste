import requestIp from 'request-ip'

export const getUserIp = (req) => requestIp.getClientIp(req);