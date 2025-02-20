"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Create axios instance with more detailed configuration
const axiosInstance = axios_1.default.create({
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'IPimtr/1.0'
    }
});
app.get('/api/ip/:ip?', async (req, res) => {
    var _a, _b;
    try {
        const ip = req.params.ip || '';
        const url = `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`;
        console.log(`[${new Date().toISOString()}] Attempting to fetch IP info for: ${ip || 'current IP'}`);
        const response = await axiosInstance.get(url);
        const data = response.data;
        if (data.status === 'fail') {
            throw new Error(data.message || 'IP lookup failed');
        }
        // Transform the response to match our expected format
        const transformedData = {
            ip: data.query,
            location: {
                country: data.country,
                city: data.city,
                state: data.regionName,
                timezone: data.timezone,
                latitude: data.lat,
                longitude: data.lon,
                zip: data.zip,
                local_time: new Date().toISOString()
            },
            company: {
                name: data.isp,
                domain: data.as,
                type: 'isp'
            },
            asn: {
                org: data.org || data.isp,
                descr: data.as,
                route: data.query
            }
        };
        console.log(`[${new Date().toISOString()}] Successfully fetched data for IP: ${ip}`);
        res.json(transformedData);
    }
    catch (error) {
        const axiosError = error;
        console.error('Error details:', {
            timestamp: new Date().toISOString(),
            message: axiosError.message,
            response: (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data
        });
        res.status(500).json({
            error: axiosError.message,
            details: ((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data) || 'No additional details',
            message: 'Failed to fetch IP information',
            timestamp: new Date().toISOString()
        });
    }
});
// Add a health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(port, () => {
    console.log(`[${new Date().toISOString()}] Backend server running on port ${port}`);
});
