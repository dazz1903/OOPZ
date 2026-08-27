import {env} from 'cloudflare:workers';
import {NextResponse} from 'next/server';
import {getSession} from '@/lib/session';
import {getMemberAccess} from '@/lib/member-access';
import {buildWeeklyAllianceReport,sendWeeklyDiscordReport} from '@/lib/weekly-alliance-report';
async function authorised(request:Request){const session=await getSession();if(session&&(await getMemberAccess(session.discordId)).isAdmin)return true;const settings=env as unknown as {WEEKLY_REPORT_SECRET?:string};const header=request.headers.get('authorization');return !!settings.WEEKLY_REPORT_SECRET&&header===`Bearer ${settings.WEEKLY_REPORT_SECRET}`}
export async function GET(request:Request){if(!await authorised(request))return NextResponse.json({error:'Admin access required.'},{status:403});return NextResponse.json(await buildWeeklyAllianceReport())}
export async function POST(request:Request){if(!await authorised(request))return NextResponse.json({error:'Admin access required.'},{status:403});try{const report=await buildWeeklyAllianceReport();if(!report.configured)return NextResponse.json({error:'Set both alliance minimums before sending.',report},{status:409});await sendWeeklyDiscordReport(report);return NextResponse.json({ok:true,report})}catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Discord report failed.'},{status:500})}}
