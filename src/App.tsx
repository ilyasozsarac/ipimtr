import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import Location from './components/Location';
import Map from './components/Map';
import AdditionalInfo from './components/AdditionalInfo'; // Import the new component

interface IPInfo {
  ip: string;
  browser: string;
  location: string;
  isp: string;
  region: string;
  postal: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
  [key: string]: any; // Allow other properties
}

function App() {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [rawData, setRawData] = useState<any | null>(null); // Store raw data
  const [copied, setCopied] = useState<string>('');

  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const userAgent = window.navigator.userAgent;
        setRawData(response.data); // Store raw data
        setIpInfo({
          ip: response.data.ip,
          browser: userAgent,
          location: `${response.data.city}, ${response.data.country_name}`,
          isp: response.data.org,
          region: response.data.region,
          postal: response.data.postal,
          timezone: response.data.timezone,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        });
      } catch (error) {
        console.error('Error fetching IP info:', error);
      }
    };

    fetchIPInfo();
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const InfoCard = ({ label, value, field, isIP = false }: { label: string; value: string; field: string; isIP?: boolean }) => (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
        ${isIP ? 'p-6 border-2 border-blue-500' : 'p-5'}`}
      onClick={() => copyToClipboard(value, field)}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-700">
            {label}
          </h3>
          <div className="relative">
            <ClipboardDocumentIcon className={`${isIP ? 'h-6 w-6' : 'h-5 w-5'} text-gray-400 hover:text-gray-600`} />
            {copied === field && (
              <span className="absolute -top-8 -left-16 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg shadow-md">
                Copied!
              </span>
            )}
          </div>
        </div>
        <p className={`${isIP ? 'text-3xl font-bold text-gray-800' : 'text-lg text-gray-700'} break-all`}>
          {value}
        </p>
        {isIP && (
          <div className="mt-2 inline-flex items-center text-sm text-blue-600">
            <span className="mr-2">●</span>
            <span>Click to copy</span>
          </div>
        )}
      </div>
    </div>
  );

  const excludedKeys = [
    'ip',
    'org',
    'city',
    'region',
    'postal',
    'timezone',
    'latitude',
    'longitude',
    'country_name',
    'browser',
    'location',
  ];

  const additionalInfoData = rawData
    ? Object.fromEntries(
        Object.entries(rawData).filter(([key]) => !excludedKeys.includes(key))
      )
    : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400" style={{ fontWeight: 'bold' }}>
            ipim.trrrrr
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {ipInfo ? (
          <div className="space-y-6">
            <InfoCard
              label="Your IP Address"
              value={ipInfo.ip}
              field="ip"
              isIP={true}
            />

            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex h-[350px]">
                  <div className="w-[30%] min-w-[300px] p-6">
                    <Location
                      location={ipInfo.location}
                      region={ipInfo.region}
                      postal={ipInfo.postal}
                      timezone={ipInfo.timezone}
                    />
                  </div>

                  {ipInfo.latitude && ipInfo.longitude && (
                    <div className="flex-1">
                      <Map
                        latitude={ipInfo.latitude}
                        longitude={ipInfo.longitude}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex-1">
                  <InfoCard
                    label="Browser"
                    value={ipInfo.browser}
                    field="browser"
                  />
                </div>
                <div className="flex-1">
                  <InfoCard
                    label="Internet Service Provider"
                    value={ipInfo.isp}
                    field="isp"
                  />
                </div>
              </div>

              {/* Additional Info */}
              {rawData && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                  <AdditionalInfo data={additionalInfoData} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white shadow-sm mt-8">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <p className="text-center text-gray-500"> 2025 ipim.tr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
