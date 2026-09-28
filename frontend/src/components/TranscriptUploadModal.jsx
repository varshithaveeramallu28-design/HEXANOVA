import React, { useState } from 'react';
import { X, Upload, FileText, Check } from 'lucide-react';

export default function TranscriptUploadModal({ meeting, onClose, onUpdateMeeting }) {
  const [activeTab, setActiveTab] = useState('paste'); // paste or upload
  const [pastedText, setPastedText] = useState(meeting?.transcript || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSavePaste = () => {
    onUpdateMeeting({ ...meeting, transcript: pastedText });
    onClose();
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        onUpdateMeeting({ ...meeting, transcript: text });
        setProcessing(false);
        onClose();
      };
      reader.readAsText(selectedFile);
    } catch (err) {
      console.error(err);
      setProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px'
    }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '560px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Transcript Input & Upload</h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('paste')}
            style={{
              padding: '8px 4px',
              borderBottom: activeTab === 'paste' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              color: activeTab === 'paste' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'paste' ? 700 : 500
            }}
          >
            Paste Transcript
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            style={{
              padding: '8px 4px',
              borderBottom: activeTab === 'upload' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              color: activeTab === 'upload' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'upload' ? 700 : 500
            }}
          >
            Upload File (TXT, DOCX, SRT)
          </button>
        </div>

        {activeTab === 'paste' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <textarea
              rows={10}
              placeholder="Paste meeting text or transcript content here..."
              value={pastedText}
              onChange={e => setPastedText(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface-elevated)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSavePaste}>Save Transcript</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFileUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              border: '2px dashed var(--border-color)',
              padding: '36px',
              borderRadius: '12px',
              textAlign: 'center',
              background: 'var(--bg-surface-elevated)'
            }}>
              <Upload size={36} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
                {selectedFile ? selectedFile.name : "Select TXT, DOCX, or SRT file"}
              </p>
              <input
                type="file"
                accept=".txt,.docx,.srt"
                onChange={e => setSelectedFile(e.target.files[0])}
                style={{ fontSize: '0.85rem' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={!selectedFile || processing}>
                {processing ? 'Processing...' : 'Upload & Process'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
