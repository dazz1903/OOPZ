import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getMemberAccess, syncMember } from '@/lib/member-access';
import { ImportForm } from './import-form';

export default async function ImportPage() {
  const session = await getSession();
  if (!session) redirect('/');
  await syncMember(session);
  const access = await getMemberAccess(session.discordId);
  if (!access.isAdmin) redirect('/portal');

  return <main style={{ maxWidth: 800, margin: '48px auto', padding: 24 }}>
    <h1>LWMA roster import</h1>
    <p>Admin-only transfer into the private OOPZ database.</p>
    <ImportForm />
  </main>;
}
