import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { Portal } from './portal';

export const dynamic = 'force-dynamic';

export default async function PortalPage() {
  const session = await getSession();
  if (!session) redirect('/');
  return <Portal member={session} />;
}
