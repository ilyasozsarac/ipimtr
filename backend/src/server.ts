import express from 'express';
import cors from 'cors';
import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import https from 'https';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Create axios instance with more detailed configuration
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'IPimtr/1.0'
  }
});

app.get('/api/ip/:ip', async (req, res) => {
  const userIp = req.params.ip;
  try {
    const response = await axios.get(`http://ip-api.com/json/${userIp}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching IP info from ip-api.com:', error);
    res.status(500).json({ error: 'Failed to fetch IP info' });
  }
});

app.get('/api/ip/:ip?', async (req: Request, res: Response) => {
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

  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error details:', {
      timestamp: new Date().toISOString(),
      message: axiosError.message,
      response: axiosError.response?.data
    });

    res.status(500).json({
      error: axiosError.message,
      details: axiosError.response?.data || 'No additional details',
      message: 'Failed to fetch IP information',
      timestamp: new Date().toISOString()
    });
  }
});

// Add a health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Backend server running on port ${port}`);
});
