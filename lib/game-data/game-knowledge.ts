/**
 * Curated game knowledge for Last War: Survival.
 * Sources: lastwartutorial.com, cpt-hedge.com, lastwarhandbook.com, community guides.
 * Used by the AI advisor and the Guidance page.
 */

export const GAME_KNOWLEDGE = {
  vsStrategy: {
    title: 'Alliance Duel (VS) Strategy',
    sections: [
      {
        title: 'Scoring System',
        content: `Day 1 awards 1 point, Days 2-5 award 2 points each, Day 6 awards 4 points. You need 7 points for overall victory. Research "Duel Expert" tech (all 20 levels) to DOUBLE all points received during the Alliance Duel.`,
      },
      {
        title: 'Day 1: Radar Training (Monday)',
        content: `Focus on radar missions, stamina usage, and drone training. Stack radar missions the day before but DON'T collect rewards yet — save them. Open Drone Data Chip and Component chests only on this day. Sync with Drone Boost AR phase.`,
      },
      {
        title: 'Day 2: Base Expansion (Tuesday)',
        content: `Construction speedups and building power increases. Start building upgrades beforehand, complete them via gift boxes on this day. Dispatch Legendary Trade Trucks and perform Legendary Secret Tasks. Sync with Base Building AR phases.`,
      },
      {
        title: 'Day 3: Age of Science / Badge Day (Wednesday)',
        content: `The most important day for badges. Use Valor Badges for research in the Alliance Duel, Intercity Truck, or Special Forces sections. NEVER spend badges on "Intercity Truck" or "Hero" trees before unlocking T10 — Special Forces first! Complete stacked radar missions. Sync with Tech Research AR phases.`,
      },
      {
        title: 'Day 4: Train Heroes (Thursday)',
        content: `Hero recruitment, XP upgrades, and tier advancement. Use accumulated Legendary Recruitment Tickets. Calculate Hero XP points for efficient use. Use hero shards and skill medals. Sync with Hero Advancement AR phases.`,
      },
      {
        title: 'Day 5: Total Mobilisation (Friday)',
        content: `Everything counts — this is the biggest point day. Use speedups across ALL categories plus unit training. Stack radar missions from Day 4. Syncs with ALL Arms Race themes. Train low-level soldiers for easy points. Go all out.`,
      },
      {
        title: 'Day 6: Enemy Buster (Saturday)',
        content: `PvP day — defeat enemy troops and unit losses both score points. Remove defending squads from walls Friday evening. Shield farm accounts. Dispatch Legendary Trade Trucks for significant bonus points. Coordinate rally targets with R4/R5. 4 points available — this day can swing the whole duel.`,
      },
      {
        title: 'Key Tips',
        content: `• Always coordinate VS tasks with matching Arms Race phases for double rewards
• No points awarded during first 5 minutes after server reset — don't waste activities
• Chest 3 requires ~540K points, Chest 6 requires ~2.3M, Chest 9 requires ~7.2M
• Research Premium Rewards (tiers 4-6) to unlock chests 4-6; Super Bonus for chests 7-9
• Prepare activities the day before and complete during the correct VS day`,
      },
    ],
  },

  armsRace: {
    title: 'Arms Race Strategy',
    sections: [
      {
        title: 'Phase Strategy Overview',
        content: `6 phases per day, 4 hours each, running in Server Time (UTC-2). Each phase gives up to 6 badges. Collect 18 badges in a day to unlock Bronze, Silver, and Gold daily chests.`,
      },
      {
        title: 'Tech Research Phase',
        content: `Start research ahead of time (6-12+ hours). Prioritise combat/troop tech for more power points. Complete research during this phase to claim the points.`,
      },
      {
        title: 'Unit Progression Phase',
        content: `Use the "Ladder Strategy": train through intermediate troop levels sequentially rather than jumping to top tier. This earns 3.3x MORE points for the same resources and time. This is the single biggest point optimisation in Arms Race.`,
      },
      {
        title: 'Drone Boost Phase',
        content: `Save stamina for this phase — don't waste it beforehand. Buy stamina with gems instead of using saved up stamina. Pair with radar missions and rallies for double value.`,
      },
      {
        title: 'Hero Advancement Phase',
        content: `Save Hero EXP and recruitment tickets for this phase. Focus on upgrading heroes that boost your army and base.`,
      },
      {
        title: 'Base Building Phase',
        content: `Pre-start building upgrades and wait to complete them during this phase. Use construction speedups here for maximum efficiency.`,
      },
    ],
  },

  heroes: {
    title: 'Hero Guide',
    sections: [
      {
        title: 'S-Tier Heroes (Must Have)',
        content: `• Kimberly — Best AoE damage dealer. Dominates Frostfire Mine, SvS battles, and PvE. If you can only max one damage hero, pick Kimberly.
• DVA — Top single-target burst. Eliminates priority targets in PvP before they can act. Position in backline behind a tank.
• Williams — Best defensive tank. Team-wide damage reduction. Essential for PvP, base defense, and rally survival.`,
      },
      {
        title: 'A-Tier Heroes',
        content: `• Murphy — Best alternative tank. HP and attack buffs + solid survivability. Great in extended PvP fights.
• Schuyler — Crowd control specialist. Stuns and paralysis disrupt enemy formations and shut down burst heroes.
• Fiona — Strong support with healing and buffs.`,
      },
      {
        title: 'Type Matchups',
        content: `Rock-Paper-Scissors system: Tanks > Missiles > Aircraft > Tanks. Building a same-type team gives +20% stat bonus but limits flexibility. Mixed teams are generally better for most content.`,
      },
    ],
  },

  t10: {
    title: 'T10 Troops Guide',
    sections: [
      {
        title: 'Requirements',
        content: `Barracks Level 30 and Tech Center Level 30 required. The final four research nodes (Advanced Protection, HP Boost III, Attack Boost III, Defense Boost III) are the gatekeepers to Unit X (T10).`,
      },
      {
        title: 'Optimal Research Path',
        content: `You DON'T need to max the entire Special Forces tree. Follow the specific path that skips unnecessary nodes to save gold and speedups. Focus on the path directly to Unit X.`,
      },
      {
        title: 'Resource Bottleneck',
        content: `COINS are the #1 bottleneck — not badges, iron, or food. Final research nodes cost 500M+ coins. Start stockpiling early. Final nodes take 20-35 days each to research.`,
      },
      {
        title: 'Badge Priority',
        content: `ALWAYS prioritise badges for Special Forces tech. Never spend Valor Badges on "Intercity Truck" or "Hero" trees until you've unlocked T10. Hit the 9th Chest in daily VS — this is the primary source of badges in sufficient quantities.`,
      },
      {
        title: 'Why T10 Matters',
        content: `T10 is the biggest power spike in the game. For Capitol War and SVS, you need 5-10 T10 players minimum to be competitive. T10 troops dramatically outclass T9 in all combat scenarios.`,
      },
    ],
  },

  events: {
    title: 'Event Guides',
    sections: [
      {
        title: "General's Trial",
        content: `Recurring 4-day event with Solo and Alliance challenges. Requires base level 8+.

Solo Challenge: Choose a difficulty level at the start — you cannot change it for the duration of the event. Normal mode (yellow stars) has 9 difficulty levels and 30 challenges per level, appearing 3 at a time on the map. Advanced mode (red stars) has 9 levels and only 10 challenges per level, appearing 1 at a time. Advanced unlocks after completing all Normal levels and once your server reaches a certain age. Single attacks cost 10 stamina, rally attacks cost 20. Normal rewards unlock at 10/15/20/25/30 completions. Advanced rewards unlock at 3/6/10 completions. Advanced mode unlocks overlord items from difficulty level 4+.

Minimum squad power suggestions (Normal mode solo attacks):
• Level 5: 10M+ • Level 6: 14M+ • Level 7: 16M+ • Level 8: 19.5M+ • Level 9: 22M+
Advanced mode level 1 requires 30M+.

You can attack via the event page challenge button, or by clicking the Marshall tank icon on the map above your daily task icon.

Alliance Challenge: R4/R5 can start an alliance-level challenge once at least 10 members have completed the corresponding Solo level. Elite forces appear on the map for 24 hours and can only be attacked via rallies. All alliance members receive rewards by mail at the event's end regardless of personal participation.

Key tips:
• Wait for R4/R5 direction before choosing difficulty — alliances may deliberately go lower to preserve troops before Season wars
• Do challenges during the Drone Boost AR phase to earn AR points simultaneously
• Spread challenges across all 4 days using free stamina — don't rush and waste stamina outside AR windows
• Advanced mode is worth attempting if your squad qualifies — overlord items are significant rewards`,
      },
      {
        title: 'Zombie Invasion',
        content: `Waves of invading zombies appear across the map. Kill them to earn Courage Medals and spawn Zombie Bosses for big rewards.

How it works: Invading zombies are always level 10 and appear in groups of 3 (small golden skulls on the map). Each one drops resources and 10 Courage Medals. Killing one has a random chance to spawn a Zombie Boss (large golden skull). The discoverer's alliance gets an exclusive 10-minute protection window to rally the boss before the rest of the server can join. Zombie Boss rewards and medals scale with boss level.

Tip for finding bosses: Zoom out on the map to scan for golden skulls. On Android, once zoomed out hit the back button — this keeps you zoomed out on the map while still showing the rally button when you tap a boss.

Summoning level: Each player has a personal summoning level that controls what level bosses they can spawn. Starts at 5. The spawn range is 15 levels below to 5 levels above your summoning level. It increases when you kill a boss higher than your current summoning level, or when you lead a team to kill a boss above your summoning level (up to 3 times per event). Summoning level only ever increases — it never resets.

Leaderboard: Total damage on invading zombies and zombie bosses is tracked throughout the event. Higher cumulative damage = better leaderboard rewards sent by mail after the event ends.

After Season 2 Celebration — Glacieradon: Once enough Zombie Bosses are killed, R4/R5 can manually trigger the Glacieradon alliance boss. The challenge lasts 60 minutes. Each player can attack up to 30 times. Critical hits deal multiplied damage — the player landing the final blow gets 10x attack reward. Glacieradon uses ice attacks that freeze bases, preventing relocation or rallying. If defeated in time, all alliance members receive rewards by mail. If not, a consolation reward is still sent. Glacieradon leaves 2 hours before the event ends — no new challenges can start after that.

Trade store priority (F2P recommended order): Stamina → Legendary Gold chest → Universal Exclusive Weapon Shards → Drone parts → Purple Gold chest

Key tips:
• Use stamina during the Drone Boost AR phase to earn AR points and Courage Medals simultaneously
• Check the Zombie Boss level before rallying — high-level bosses need strong rallies
• Coordinate Glacieradon timing carefully — it must be triggered with enough time to defeat it before the 2-hour cutoff`,
      },
      {
        title: 'Doomsday',
        content: `Server-wide invasion of Doom Walkers. Open the event page to see a full list of all Doom Walkers currently on the map and click any to jump directly to it.

How it works: Doom Walkers spawn across the map in waves. A countdown at the bottom of the event page shows when the next wave reset occurs — if only high-level Doom Walkers remain, wait for the reset to get lower-level ones back. Attack via rally only. During the event Doom Walkers will likely attack commander bases, but they will NOT breach your HQ. When a Doom Walker breaches your HQ, the death rate of idle units decreases.

Rewards:
• First kill reward: claimable up to 3 times per event
• Achievement rewards: triggered server-wide whenever any commander hits a milestone — you benefit even from kills you didn't participate in
• Damage ranking: total damage across all Doom Walkers is tracked for the whole event, with ranking rewards sent by mail after it ends

Key tips:
• Use the event page to find Doom Walkers rather than searching the map manually
• Focus rallies on the highest level Doom Walkers your squad can handle for better damage ranking
• Keep shields active — Doom Walkers will attack bases during the event`,
      },
      {
        title: 'Ghost Ops',
        content: `Weekly stealth missions accessed through the Secret Command Post. Available from Season 1 Day 60 onwards. Requires base level 18+.

How it works: Every Thursday, 3 Ghost Ops missions are assigned to each player. Missions can only be executed during 4 Server Time windows: 00:00–03:00, 06:00–09:00, 12:00–15:00, 18:00–21:00. Signals are cut off outside these windows — set alarms. Missions are carried out in other warzones (not your own server).

Mission types — always check rewards before joining:
• UR* (starred): The priority target. Rewards include named hero shards and exclusive weapon shards. Has special conditions requiring a specific number of heroes of a specific named hero at 4+ stars to unlock bonus rewards. If special conditions are met, everyone in the mission gets the bonus.
• UR: Good rewards including important items. Worth doing.
• Purple (SSR): Low-tier rewards — skip these if you have UR options available.

After completing your own 3 missions, you can assist allies up to 3 times per day for rewards. After the 3-assist limit, you can still help allies but receive no rewards. Additionally, you can loot up to 5 Ghost Ops missions running in your own warzone daily — prioritise looting UR* missions.

IMPORTANT: After completing a mission you must manually claim rewards from the Secret Command Post — they do not auto-collect.

Key tips:
• You do not need the required hero yourself to unlock UR* bonus rewards — if any team member has the required hero at 4+ stars, everyone gets the bonus
• Do not change your hero upgrade strategy just for Ghost Ops requirements — coordinate with alliance members who already have the right heroes
• Post in alliance chat when you have UR* missions running so members with named heroes at 4+ stars can join and trigger the bonus for the whole team
• Looting Ghost Ops in your own warzone is recommended — it avoids inter-alliance drama from taking missions on your own server`,
      },
      {
        title: 'Sky Battlefront',
        content: `Off-season event lasting 7 days, split into 3 stages. Accessible via the dedicated Sky Battlefront icon above the Duel VS icon.

Stage 1 — Donation (Monday–Thursday, 4 days): Complete daily tasks to earn Airship Tokens. Donate tokens at the Sky Predator Station (click the coordinates shown in the event page, then click the station and use the gear icon). A scout truck delivers your donation from your base. Donations contribute to individual progress (unlocking personal reward chests) and alliance progress (unlocking alliance reward chests for all members). Every 500 alliance donation points has a 50% chance to spawn an Alliance Supply Tile and 50% chance to spawn an Alliance Resource Tile — collect these quickly as all warzone commanders can claim them. The airship has 3 construction stages. Once fully built, a Rush stage begins: continued donations during Rush strengthen the airship's combat power for the battle stage.

Stage 2 — Battle (Friday–Saturday, 2 days): The President selects a target location in an enemy warzone and deploys the airship. After a countdown it arrives and battle begins. Rally attacks on the enemy Sky Predator reduce its HP. At certain HP thresholds the airship activates a shield — break it within the time limit or it enters berserk mode with stronger attacks. Maximum 20 consecutive rally wins per session, or 15 when the shield is active. If the President does not deploy manually, the system deploys automatically. Enemy airships will also be attacking your server at the same time.

Stage 3 — Settlement (Sunday): Review full event results. Both donation and damage rankings are tracked separately throughout the event and accessible at any time via the ranking button.

Key tips:
• Donate tokens as soon as you earn them — don't hoard
• Complete daily tasks every day during the donation stage, tokens are the bottleneck for alliance progress
• New members who joined the alliance less than 24 hours ago cannot contribute to alliance donation progress or claim alliance chests
• During the battle stage, coordinate rally launches — breaking shields fast is critical to prevent berserk mode`,
      },
      {
        title: "Alliance Exercise (Marshal's Guard)",
        content: `Periodic alliance event (every 2–3 days), lasting 30 minutes. R4/R5 sets the time and location. Requires at least 20 active members to participate.

Preparation phase: Before the event, donate wrenches via Events → Alliance Exercise → Build. Each wrench donated increases the alliance's damage output and earns you 500 alliance points. Recall all troops from mines and fields 5–10 minutes before start so squads are available for rallies. Move your base close to the Marshal platform. Do not launch any rallies in the 15 minutes before the event starts.

During the event: The platform disappears and 5 tanks appear in its place. Only 3-minute rallies are allowed — 1-minute rallies are not available. You can only launch 1 rally at a time, but you can join as many rallies simultaneously as you want.

Optimal strategy:
• Use your weakest squad to launch rallies (it waits at the tank while you join others)
• Use your strongest squad to join other people's rallies
• Always join rallies with the lowest countdown first
• R4/R5 rallies give a +5% damage bonus to all participants — prioritise joining these
• Never cancel a correctly-launched rally
• If a member far from the platform joined your rally and is causing a delay, the rally launcher can remove them using the red arrow in the rally participant list

Alliance progress has 5 reward phases — reaching Phase 5 wins the event. If an MVP minimum score threshold is reached by at least one player, all alliance prizes are multiplied x10.

Individual rewards are based on personal damage done and are awarded regardless of alliance phase reached.

Healing trick: After the event, heal troops immediately. Select only enough soldiers to heal in 25–30 minutes, start healing, then request alliance help. Hours of healing complete in seconds.

Key tips:
• War fever trick: Scout an unoccupied base without an alliance a few minutes before the event for +1% damage. Do NOT do this if you have a shield — you will lose it.
• The auto-rally feature means offline members may be pulled into rallies automatically — starting more rallies also helps offline members earn rewards
• It is possible to participate even with a shield active — just skip the war fever trick`,
      },
      {
        title: 'Zombie Siege',
        content: `Alliance defense event where zombie waves attack member bases. Available on all servers from the beginning of the game.

Setup — collecting clues: R4/R5 must first collect Doom Legion Clue Points via radar tasks before the event can be started. Points per action: Kill Doom Walker/Doom Elite/Doom Legion enemy = 300 pts each. Kill Zombie, Assist Allies, Geological Sampling, Resource Gathering, Digging Tasks = 10 pts each. Unused clue points carry over to the next event. Once enough clues are gathered, R4/R5 selects a difficulty level and starts the search — the Doom Legion base appears and zombie attacks begin immediately.

CRITICAL: R4/R5 must announce to the alliance to enable wall defenses before starting the event. Shields do NOT protect against zombie attacks — only wall squads defend your base.

Eligibility requirements:
• Been in the alliance for more than 48 hours
• Been online within the past 72 hours
• Your HQ level meets the minimum for the selected difficulty level
• Your base is not in a cross-server state — do not teleport once the event starts or you will be removed

How waves work: 20 waves of zombies attack all eligible member bases. Early waves send 1 zombie, later waves send 2–3 simultaneously with significantly higher power. Once a base is breached it won't be attacked again. Stronger members can garrison a weaker member's base with a spare squad to help them survive more waves — keep at least 1 squad defending your own base.

Rewards: Individual rewards are based on how many waves you personally survived. Alliance rewards are based on the total waves survived across all members. Both scale with difficulty level. All rewards are sent by mail after the event ends. Members who joined the alliance less than 48 hours ago cannot claim alliance rewards.

Squad setup tips:
• Set your strongest squad as Squad 1 on the wall to minimise troop losses
• If your Squad 1 is powerful enough to handle waves alone, consider disabling Squad 2 and 3 from the wall — when 2–3 zombies attack at once, weaker squads joining the fight lose more troops than they save
• Check your event mail after the event to see which members survived all 20 waves — use this to calibrate difficulty level for next time`,
      },
    ],
  },

  season1: {
    title: 'Season 1 — The Crimson Plague',
    sections: [
      {
        title: 'Season 1 Overview',
        content: `Season 1 ("The Crimson Plague") begins on Day 70 of a server's life (after pre-season). The entire map resets — all territory is wiped. Season 1 runs 56 days (8 weeks) and always starts on a Monday. New buildings unlock: Virus Research Institute, Protein Farms (×5), Tank/Air Force/Missile Military Bases. New resources: Immune Protein, Mutant Crystals, Gene Fragments, Serum Fragments. The Profession Hall activates — players choose Engineer or War Leader.`,
      },
      {
        title: 'The Virus System — Most Critical Mechanic',
        content: `Players accumulate virus infection stacks (0–100) from attacking infected enemies. Stacks cause damage penalties:
• 1+ stacks: -4% damage, +4% casualties
• 20+ stacks: -8% damage, +6% casualties
• 40+ stacks: -12% damage, +8% casualties
• 60+ stacks: -16% damage, +10% casualties
• With severely insufficient resistance: damage drops up to 99%, enemy damage increases 375–900%

Virus Resistance is built through the Virus Research Institute (max 10,000 resistance). Fueled by Immune Protein from Protein Farms. BUILD THIS IMMEDIATELY ON DAY 1 — it is the single most important Season 1 priority.

CRITICAL RALLY LEADER RULE: In rallies, the RALLY LEADER's resistance stat applies to ALL rally members. A weak player can participate safely in a high-level rally as long as the leader has sufficient resistance.

Weather affects virus: Light Rain = troops don't accumulate virus stacks (best attack window). Windy = -30% march speed (avoid major attacks). Sunny = +30% Profession EXP from monster kills.

Viral Offense (seasonal skill): Can release virus onto strategic targets (cities, military strongholds, Capitol, missile sites) — adds 2 stacks per use, max 30 stacks per target. Use this to weaken enemy cities BEFORE declaring war.`,
      },
      {
        title: 'City Unlock Schedule & Territory Control',
        content: `Cities unlock by Season Day:
• Day 3: Level 1 cities (100K influence each)
• Day 4: Level 2 cities (200K influence each)
• Day 10: Level 3 cities (300K influence each)
• Day 14: Level 4 cities (400K influence each)
• Day 17: Level 5 cities (500K influence each)
• Day 21: Level 6 cities (1,000,000 influence each) — TOP PRIORITY
• Day 28: Capitol / Apocalypse City

Rules: Alliance can capture up to 2 cities per day. Must own an adjacent stronghold. After capture: 7-day protection (cannot be declared on). War declaration window: 1 hour to complete the siege. Foreign warzone war declarations: Thursdays and Saturdays only (from Week 4).

Stronghold limit: 3 base + 1 per L1–L5 city held + 2 per L6 city held. Capture 2 strongholds per day from Day 1.

Peace vs War: Sunday–Friday: attacks only on Infected/contaminated land. Saturday: attacks on ALL foreign warzone bases permitted (the main PvP kill day).`,
      },
      {
        title: 'Crimson Legion Defense',
        content: `Starting Week 2, the Crimson Legion attacks alliance-held cities every Tuesday and Friday at 12:00 server time. 30 consecutive waves, new wave every minute. Up to 20 alliance members can reinforce each city.

If you fail: city is LOST to the Crimson Legion for 7 days — you lose all influence from that city.

Wave strength escalates by week:
• Week 2 Friday: up to 8.2M power at wave 30
• Week 4 Tuesday: up to 29.9M at wave 30

Total virus infections across all 30 waves = 465 stacks. Defenders MUST have high virus resistance or they deal near-zero damage.

Strategy: Assign top 20 commanders by power to each city. They must teleport to city borders BEFORE 12:00. Low-resistance defenders are liabilities — prioritize virus resistance upgrades for your combat core.

Rewards per milestone wave (5, 10, 15, 20, 25, 30): Mutant Crystals, Immune Protein, construction/training speedups, Hero Return Recruitment Tickets.`,
      },
      {
        title: 'Warzone Duel — Weekly Server-vs-Server Scoring',
        content: `The Warzone Duel runs every week. Monday–Friday: both servers accumulate warzone points. Saturday: the server with MORE points attacks the other server's Capitol (Capitol War). Lower total = you defend.

Warzone Duel point values (weekly):
• Wanted Boss — Server Win: 250,000 pts (once/week — BIGGEST single swing)
• Apex Arena — #1 Win: 100,000 pts (once/week)
• Wanted Boss — Individual Top 5: 50,000 pts each (up to 5× per week)
• Desert Storm Victory: 50,000 pts each (max 20 alliances)
• Alliance Duel VS Victory: 30,000 pts per day (6 days max = 180,000)
• Arms Race — 1st Place: 10,000 pts per phase
• Alliance Duel MVP: 6,000 pts each
• Hostile Truck Plunder: 100 pts (max 4/day = 2,800/week)

Maximum theoretical weekly score: ~1.6M pts. Winning the Wanted Boss server event alone is worth more than 8 full days of VS victories. Track VS wins daily — they are the most controllable large point source.`,
      },
      {
        title: 'Capitol War — Saturday Battle',
        content: `The Capitol (Apocalypse City) is surrounded by 4 cannons: North, South, East, West. The attacking server (higher Warzone Duel score) teleports troops to the enemy's territory.

Objective for Attacker: Push occupation progress to 100% to capture the Capitol.
Objective for Defender: Repel invaders, protect the Capitol.

Destroying enemy bases = 50,000 warzone points each. This means base destruction teams are a reliable point source even if you don't capture the Capitol.

Post-victory: Diamond Mines appear around the captured Capitol for resource farming.

Assign squads to cannon positions (N/S/E/W) in advance. Designate base destruction teams separately — they can score points independently while main teams fight for the Capitol.`,
      },
      {
        title: 'Infinite Octagon — Season Championship (Weeks 5–7)',
        content: `The Infinite Octagon is the cross-server knockout tournament running from Day 25 (Week 5) through Week 7. Servers are grouped by warzone Influence Points ranking.

3 total rounds over 3 weeks. Each round: Monday–Friday points accumulation → Saturday Capitol War.

Influence bonuses for the warzone:
• 1 round won: 250,000 influence points
• 2 rounds won: 500,000 influence points
• 3 rounds won (sweep): 1,500,000 influence points

A full 3-round sweep = 1.5M bonus influence — equivalent to holding 1.5 Level 6 cities for the entire season. THIS IS THE DECIDING FACTOR for end-of-season tier rankings.

Individual top commanders earn temporary titles: Duel Overlord (7 days) for 1st place weekly.`,
      },
      {
        title: 'Warzone Expedition — Foreign Server Expansion (Week 3+)',
        content: `From Day 16 (Week 3), alliances can establish outposts on foreign servers. Maximum 4 outposts total (placed on Thursdays). Outposts must be placed within range of a military base lower than Level 2.

Once you capture an adjacent military base in a foreign warzone, your territory presence is established. Foreign warzone war declarations: Thursdays and Saturdays only.

You can capture any city level in foreign warzones (no unlock gate like home warzone). A Level 6 foreign city = 1M influence — same value as home.

Strategy: Target servers weaker than yours (check bracket analyzer). Coordinate with allied servers for joint attacks. Time placement during enemy offline hours.`,
      },
      {
        title: 'Influence Points — The Win Condition',
        content: `Influence Points determine end-of-season ranking and rewards:

City ownership (per scoring period):
• Level 1: 100,000 | Level 2: 200,000 | Level 3: 300,000
• Level 4: 400,000 | Level 5: 500,000 | Level 6: 1,000,000

End-of-season reward tiers:
• Gold (God of Judgment): Rank #1 alliance + 4 Level 6 cities
• Purple: 8,000,000+ influence + 3 Level 6 cities
• Blue: 4,000,000+ influence
• Green: 1,000,000+ influence

Strategy to reach Gold tier: Hold 4 Level 6 cities from Day 21. Win the Infinite Octagon (3 rounds = 1.5M bonus). Win Warzone Duels to stay as Attacker. Defend cities from Crimson Legion every Tuesday/Friday.`,
      },
      {
        title: 'Season 1 Week-by-Week Priorities',
        content: `Week 1 (Days 1–7): Build Virus Research Institute IMMEDIATELY. Capture strongholds (2/day). Rush Level 1–2 cities. Stock Immune Protein. Start Purge Action (zombie ranking).

Week 2 (Days 8–14): Crimson Legion attacks start (Tues/Fri 12:00). Position 20 defenders at each city before attacks. Level 3–4 cities unlock. Warzone Duel scoring begins.

Week 3 (Days 15–21): Warzone Expedition opens (place outposts Thursdays). Level 5–6 cities unlock (Day 17 and 21). Level 6 cities are the primary influence source — take them ASAP.

Week 4 (Days 22–28): Capitol available (Day 28). Cross-server war declarations open (Thu/Sat). Builder Alliance mode available. Coordinate Infinite Octagon prep.

Weeks 5–7: Infinite Octagon — 3 rounds of cross-server Capitol Wars. Maximize influence lead.

Week 8 (Days 50–56): Settlement week. R5s distribute season rewards based on member contribution. Season resources convert to Profession EXP.`,
      },
      {
        title: 'Seasonal Profession Skills',
        content: `Both War Leader and Engineer share 9 seasonal skills (refunded after season, max Level 40 in Season 1):

Key seasonal skills:
• Troops don't accumulate virus stacks (allows attacking infected zones freely — massive PvP advantage)
• Remove 5 virus stacks from allies per treatment (+10 Profession EXP per stack removed)
• Viral Offense: Release virus onto strategic targets (+2 stacks, max 30 per target) — use to weaken cities before declaring war

War Leader seasonal advantages: +combat skills, rally boosts, quick squad teleport returns.
Engineer seasonal advantages: Resource collection bonuses, construction speed, alliance donation rewards.

Recommend high-combat players choose War Leader for Saturday Capitol Wars. Engineers provide sustained economic advantage during the week.`,
      },
      {
        title: 'Season 1 Readiness Checklist',
        content: `Before each Capitol War (Saturday):
✓ Warzone Duel: Did we win Wanted Boss this week? VS wins logged for all 6 days? Desert Storm victories counted?
✓ Defenders: Top 20 by power assigned to each city. Do they have ≥4,600 resistance? Teleported to city borders before 12:00 Tues/Fri?
✓ Viral Offense: Have we stacked 30 virus stacks on enemy cities before attacking?
✓ Capitol War squads: N/S/E/W cannon positions assigned? Base destruction team ready?

Minimum standards for competitive Season 1:
• At least 10 commanders with virus resistance ≥ 7,500 (can lead Level 55+ rallies)
• At least 4 commanders with resistance ≥ 10,000 (Level 60 zombie)
• 4+ Level 6 cities held for Gold tier
• Net positive Warzone Duel points (more wins than losses across 6 days)`,
      },
    ],
  },

  progression: {
    title: 'Progression Priorities',
    sections: [
      {
        title: 'Early Game (HQ 1-15)',
        content: `Focus on completing all starter events (Rookie Challenges, Rookie Pass, Daily Progress). Level all buildings evenly. Join an active alliance ASAP for alliance tech benefits. Don't spread hero investment too thin — focus on 5 main heroes.`,
      },
      {
        title: 'Mid Game (HQ 15-25)',
        content: `Start focusing on Special Forces tech tree. Build coin reserves for T10 research. Establish consistent VS participation for badge income. Develop your top 5 hero lineup. Start tracking Arms Race phases for efficient point earning.`,
      },
      {
        title: 'Late Game (HQ 25-30)',
        content: `Rush T10 unlock — everything else is secondary. Maximise badge income through VS Chest 9. Stockpile coins aggressively. Research final Special Forces nodes (20-35 days each). Once T10 is unlocked, you become a key asset for Capitol War and SVS.`,
      },
      {
        title: 'Power Growth Tips',
        content: `• Power comes from: troop training, building upgrades, research, hero development
• Kill/death ratio matters for SVS and Capitol War matchups
• Weekly donations show alliance commitment
• Regular stat updates indicate engagement
• For Capitol War/SVS: minimum 5-10 T10 players to compete`,
      },
    ],
  },
};

/**
 * Build the full AI advisor system prompt with curated game knowledge.
 */
export function buildAdvisorSystemPrompt(
  allianceName: string,
  allianceTag: string,
  serverNumber: number,
  commanderSummary: string,
): string {
  const knowledge = Object.values(GAME_KNOWLEDGE)
    .map(section => {
      const content = section.sections.map(s => `### ${s.title}\n${s.content}`).join('\n\n');
      return `## ${section.title}\n\n${content}`;
    })
    .join('\n\n---\n\n');

  return `You are the AMP Strategy Advisor for the Last War: Survival alliance "${allianceName}" [${allianceTag}] on Server ${serverNumber}.

You provide tactical advice based on the alliance's real data and deep game knowledge. Be concise, specific, and actionable. Reference actual commander names and numbers when relevant.

ALLIANCE DATA:
${commanderSummary}

GAME KNOWLEDGE:

${knowledge}

When answering:
- Be direct and tactical, not generic
- Reference specific commanders by name when giving individual advice
- Use actual numbers from the alliance data
- If asked about readiness, compare against known thresholds (e.g. 5-10 T10 for Capitol War)
- Cite specific strategies (e.g. "Ladder Strategy" for AR Unit Progression)
- For VS advice, reference the specific day and what syncs with which AR phase
- Keep responses under 300 words unless the question requires more detail
- When recommending heroes, reference the current meta tier list`;
}
