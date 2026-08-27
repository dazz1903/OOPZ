'use client';

import { FormEvent, useState } from 'react';

export function ImportForm() {
  const [result, setResult] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setResult('Importing…');
    const parsed = JSON.parse(String(form.get('rows') ?? '[]')) as unknown;
    const response = await fetch('/api/admin/import-lwma', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Array.isArray(parsed) ? { rows: parsed } : parsed),
    });
    const body = await response.json() as { imported?: number; vsImported?: number; error?: string };
    setResult(response.ok ? `Imported ${body.imported} members and ${body.vsImported ?? 0} weekly scores.` : body.error ?? 'Import failed.');
  }
  return <form onSubmit={submit}>
    <textarea name="rows" aria-label="LWMA roster JSON" required style={{ width: '100%', minHeight: 320 }} />
    <button type="submit" style={{ marginTop: 16, padding: '12px 20px' }}>Import roster</button>
    <p role="status">{result}</p>
  </form>;
}
