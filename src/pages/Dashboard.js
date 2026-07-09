import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Phone, MapPin, Users } from 'lucide-react';

export default function Dashboard() {
  const [location, setLocation] = useState({ lat: "Detecting...", lng: "Detecting..." });
  const [sosActive, setSosActive] = useState(false);
  const [backendStatus, setBackendStatus] = useState("Connecting...");

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setBackendStatus(`${data.status}`))
      .catch(() => setBackendStatus("Offline ❌"));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6)
          });
        },
        () => setLocation({ lat: "28.6139", lng: "77.2090" })
      );
    }
  }, []);

  const triggerSOS = () => {
    setSosActive(!sosActive);
    if (!sosActive) {
      alert("🚨 EMERGENCY SOS TRIGGERED!");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoSec}>
          <Shield size={32} color="#ff3366" />
          <h1 style={styles.title}>WomenShield <span style={styles.v2v}>v2v</span></h1>
        </div>
        <div style={styles.statusBadge}>
          Backend: <span style={{ color: backendStatus.includes('Offline') ? 'red' : '#00ffcc' }}>{backendStatus}</span>
        </div>
      </header>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Emergency SOS</h2>
          <p style={styles.cardDesc}>Press the button below to instantly broadcast your live location.</p>
          <div style={styles.sosContainer}>
            <button 
              onClick={triggerSOS} 
              style={{
                ...styles.sosButton,
                backgroundColor: sosActive ? '#ff3366' : '#222',
                boxShadow: sosActive ? '0 0 30px #ff3366' : '0 0 10px rgba(0,0,0,0.5)'
              }}
            >
              <AlertTriangle size={64} color={sosActive ? '#fff' : '#ff3366'} />
              <span style={{...styles.sosText, color: sosActive ? '#fff' : '#ff3366'}}>
                {sosActive ? "SOS ACTIVE" : "TAP TO SOS"}
              </span>
            </button>
          </div>
        </div>

        <div style={styles.rightCol}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}><MapPin size={18} style={styles.icon} /> Live Location</h3>
            <div style={styles.locGrid}>
              <div style={styles.locBox}><strong>Lat:</strong> {location.lat}</div>
              <div style={styles.locBox}><strong>Lng:</strong> {location.lng}</div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}><Users size={18} style={styles.icon} /> Contacts</h3>
            <ul style={styles.contactList}>
              <li style={styles.contactItem}><Phone size={14} /> Emergency: 112</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f12', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '15px', marginBottom: '30px' },
  logoSec: { display: 'flex', alignItems: 'center', gap: '10px' },
  title: { fontSize: '24px', margin: 0, fontWeight: '800' },
  v2v: { color: '#ff3366', fontSize: '14px', border: '1px solid #ff3366', padding: '2px 6px', borderRadius: '4px' },
  statusBadge: { fontSize: '14px', color: '#aaa', backgroundColor: '#1a1a24', padding: '8px 12px', borderRadius: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' },
  card: { backgroundColor: '#15151e', border: '1px solid #222', borderRadius: '12px', padding: '20px' },
  cardTitle: { fontSize: '18px', margin: '0 0 10px 0', color: '#ff3366', display: 'flex', alignItems: 'center' },
  cardDesc: { color: '#888', fontSize: '14px', marginBottom: '20px' },
  sosContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' },
  sosButton: { width: '180px', height: '180px', borderRadius: '50%', border: '3px solid #ff3366', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s ease' },
  sosText: { fontWeight: 'bold', fontSize: '14px', marginTop: '10px', letterSpacing: '1px' },
  rightCol: { display: 'flex', flexDirection: 'column', gap: '20px' },
  icon: { marginRight: '8px' },
  locGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  locBox: { backgroundColor: '#1d1d2b', padding: '10px', borderRadius: '6px', fontSize: '13px', color: '#ccc' },
  contactList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' },
  contactItem: { backgroundColor: '#1d1d2b', padding: '10px', borderRadius: '6px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }
};
