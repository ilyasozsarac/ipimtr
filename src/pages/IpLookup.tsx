import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfoCard from '../components/InfoCard';
import Location from '../components/Location';
import Map from '../components/Map';
import AdditionalInfo from '../components/AdditionalInfo';
import { getIpInfo } from '../utils/api';

interface IPInfo {
  ip: string;
  browser: string;
  location: {
    country: string;
    city: string;
    state: string;
    timezone: string;
    latitude: number;
    longitude: number;
    zip: string;
    local_time: string;
  };
  company: {
    name: string;
    domain: string;
    type: string;
  };
  asn: {
    org: string;
    descr: string;
    route: string;
  };
  abuse: {
    name: string;
    email: string;
    phone: string;
  };
}

function IpLookup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [rawData, setRawData] = useState<any | null>(null);
  const [inputIp, setInputIp] = useState(searchParams.get('ip') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchIPInfo = async (ip: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await getIpInfo(ip);
      const userAgent = window.navigator.userAgent;
      setRawData(response.data);
      setIpInfo({
        ip: response.data.ip,
        browser: userAgent,
        location: response.data.location,
        company: response.data.company,
        asn: response.data.asn,
        abuse: response.data.abuse
      });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch IP information');
      console.error('Error fetching IP info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ip = searchParams.get('ip');
    if (ip) {
      fetchIPInfo(ip);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputIp) {
      navigate(`/lookup?ip=${inputIp}`);
    }
  };

  const excludedKeys = [
    'ip', 'org', 'city', 'region', 'postal', 'timezone',
    'latitude', 'longitude', 'country_name', 'browser', 'location'
  ];

  const additionalInfoData = rawData
    ? Object.fromEntries(
        Object.entries(rawData).filter(([key]) => !excludedKeys.includes(key))
      )
    : {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={inputIp}
            onChange={(e) => setInputIp(e.target.value)}
            placeholder="Enter IP address..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Lookup
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-600">{error}</p>
        )}
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
        </div>
      ) : ipInfo ? (
        <div className="space-y-6">
          <InfoCard
            label="IP Address"
            value={ipInfo.ip}
            field="ip"
            isIP={true}
          />

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex h-[350px]">
                <div className="w-[30%] min-w-[300px] p-6">
                  <Location
                    location={`${ipInfo.location.city}, ${ipInfo.location.country}`}
                    region={ipInfo.location.state}
                    postal={ipInfo.location.zip}
                    timezone={ipInfo.location.timezone}
                    localTime={ipInfo.location.local_time}
                  />
                </div>

                {ipInfo.location.latitude && ipInfo.location.longitude && (
                  <div className="flex-1">
                    <Map
                      latitude={ipInfo.location.latitude}
                      longitude={ipInfo.location.longitude}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex-1">
                <InfoCard
                  label="Internet Service Provider"
                  value={ipInfo.company.name}
                  field="isp"
                />
              </div>
              <div className="flex-1">
                <InfoCard
                  label="Network Route"
                  value={ipInfo.asn.route}
                  field="route"
                />
              </div>
              <div className="flex-1">
                <InfoCard
                  label="ASN Info"
                  value={`${ipInfo.asn.descr} (${ipInfo.asn.org})`}
                  field="asn"
                />
              </div>
            </div>

            {rawData && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                <AdditionalInfo data={additionalInfoData} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default IpLookup;
