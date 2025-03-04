import React, { useEffect, useState } from 'react';
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

const Home: React.FC = () => {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [rawData, setRawData] = useState<any | null>(null);
  const [copied, setCopied] = useState<string>('');

  const fetchUserIp = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip; // Kullanıcının IP adresini döndürür
  };

  const fetchIPInfo = async () => {
    try {
      const userIp = await fetchUserIp(); // Kullanıcının IP adresini al
      const response = await getIpInfo(userIp); // IP adresini parametre olarak geçin
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
    } catch (error) {
      console.error('Error fetching IP info:', error);
    }
  };

  useEffect(() => {
    fetchIPInfo();
  }, []);

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

            {ipInfo.abuse && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Abuse Contact Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {ipInfo.abuse.name}</p>
                  <p><span className="font-medium">Email:</span> {ipInfo.abuse.email}</p>
                  <p><span className="font-medium">Phone:</span> {ipInfo.abuse.phone}</p>
                </div>
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
  );
};

export default Home;
