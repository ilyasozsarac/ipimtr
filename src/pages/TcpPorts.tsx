import React from 'react';

const TcpPorts: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800">TCP and UDP</h1>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">What is TCP?</h2>
            <p className="text-gray-600 mt-2">TCP (Transmission Control Protocol) is a fundamental communication protocol in computer networks that ensures reliable data transmission. It operates at the transport layer of the OSI model and is responsible for breaking data into packets, ensuring their delivery, and reassembling them in the correct order. TCP is widely used in applications where data integrity and order are crucial, such as web browsing, email, and file transfers.</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">What is UDP?</h2>
            <p className="text-gray-600 mt-2">UDP (User Datagram Protocol) is a lightweight, connectionless transport protocol that facilitates fast data transmission without guaranteeing delivery or order. Unlike TCP, UDP does not establish a connection before sending data, making it ideal for applications that require low latency, such as video streaming, online gaming, and VoIP (Voice over IP) calls.</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">What are the Differences Between TCP and UDP?</h2>
            <ul className="list-disc list-inside mt-2">
                <li><strong>Reliability:</strong> TCP ensures data is received correctly and in order, while UDP does not guarantee delivery.</li>
                <li><strong>Speed:</strong> UDP is faster than TCP since it does not require handshaking or acknowledgments.</li>
                <li><strong>Connection:</strong> TCP establishes a connection before data transfer, whereas UDP sends data without establishing a connection.</li>
                <li><strong>Use Cases:</strong> TCP is used for applications needing accuracy (e.g., email, web pages), while UDP is preferred for real-time applications (e.g., video streaming, gaming).</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">What is a Port?</h2>
            <p className="text-gray-600 mt-2">A port is a logical endpoint in networking that allows computers to differentiate between different types of traffic. Ports are used in combination with IP addresses to direct network traffic to the appropriate service or application on a device.</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">How Are Ports Used?</h2>
            <p className="text-gray-600 mt-2">Ports are used to identify specific processes or services running on a device. When data is sent over a network, it includes both the destination IP address and a port number, ensuring that the data reaches the correct application. For example, HTTP traffic typically uses port 80, while HTTPS traffic uses port 443.</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">What is Port Forwarding?</h2>
            <p className="text-gray-600 mt-2">Port forwarding is a networking technique that directs incoming traffic to a specific device or service within a private network. This is commonly used to allow remote access to services such as gaming servers, web servers, and security cameras by mapping an external port to an internal IP and port.</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">What Are Commonly Used Ports?</h2>
            <ul className="list-disc list-inside mt-2">
                <li><strong>Port 20/21:</strong> FTP (File Transfer Protocol) for data transfer and control</li>
                <li><strong>Port 22:</strong> SSH (Secure Shell) for encrypted remote access</li>
                <li><strong>Port 23:</strong> Telnet (Unencrypted text communications - insecure)</li>
                <li><strong>Port 25:</strong> SMTP (Simple Mail Transfer Protocol) for email transmission</li>
                <li><strong>Port 53:</strong> DNS (Domain Name System) for name resolution</li>
                <li><strong>Port 80:</strong> HTTP (Hypertext Transfer Protocol) for web browsing</li>
                <li><strong>Port 88:</strong> Kerberos authentication</li>
                <li><strong>Port 110:</strong> POP3 (Post Office Protocol version 3) for email retrieval</li>
                <li><strong>Port 123:</strong> NTP (Network Time Protocol) for time synchronization</li>
                <li><strong>Port 139:</strong> NetBIOS Session Service over TCP/IP</li>
                <li><strong>Port 143:</strong> IMAP (Internet Message Access Protocol) for email retrieval</li>
                <li><strong>Port 161/162:</strong> SNMP (Simple Network Management Protocol) for network device monitoring</li>
                <li><strong>Port 389:</strong> LDAP (Lightweight Directory Access Protocol) for directory services</li>
                <li><strong>Port 443:</strong> HTTPS (HTTP Secure) for encrypted web communication</li>
                <li><strong>Port 445:</strong> SMB (Server Message Block) for file sharing on Windows networks</li>
                <li><strong>Port 465:</strong> SMTPS (SMTP over SSL) for secure email transmission</li>
                <li><strong>Port 500:</strong> IKE (Internet Key Exchange) for VPN key negotiation</li>
                <li><strong>Port 636:</strong> LDAPS (LDAP over SSL) for secure directory services</li>
                <li><strong>Port 993:</strong> IMAPS (IMAP over SSL) for secure email retrieval</li>
                <li><strong>Port 1433/1434:</strong> MSSQL (Microsoft SQL Server database communication)</li>
                <li><strong>Port 3306:</strong> MySQL (MySQL database communication)</li>
                <li><strong>Port 3389:</strong> RDP (Remote Desktop Protocol) for remote access to Windows systems</li>
                <li><strong>Port 5060/5061:</strong> SIP (Session Initiation Protocol) for VoIP communication</li>
                <li><strong>Port 8080:</strong> HTTP Alternate (commonly used for web proxies and caching)</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">How to Find a Port Number?</h2>
            <p className="text-gray-600 mt-2">To find an active port number on a system:</p>
            <ul className="list-disc list-inside mt-2">
                <li><strong>Windows:</strong> Use the command <code>netstat -an</code> in the command prompt.</li>
                <li><strong>Mac/Linux:</strong> Use the command <code>netstat -tulnp</code> or <code>ss -tulnp</code>.</li>
                <li><strong>For Specific Applications:</strong> Check documentation or settings for configured ports.</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">Conclusion</h2>
            <p className="text-gray-600 mt-2">Understanding TCP, UDP, and port management is essential for network configuration and security. By knowing how ports function and how to use them effectively, users can optimize network performance, enhance security, and troubleshoot connectivity issues.</p>
            <meta name="description" content="TCP ve UDP hakkında bilgi ve bilinen TCP portlarının listesi." />
            <meta name="keywords" content="TCP, UDP, Portlar, Bilgi, Ağ, Protokol" />
        </div>
    );
};

export default TcpPorts;