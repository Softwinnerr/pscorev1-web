import type {
  MatchResponse,
  SportResponse,
  TournamentDto,
  TeamResponse,
} from "@/types/models";
import type {
  MatchDetail,
  StandingRow,
  MatchStatistic,
  TeamLineup,
} from "@/types/match-detail";
import type { IMatchesService } from "./matches-service";

// ── Sports ──────────────────────────────────────────────────────────────
const football: SportResponse = { id: 1, name: "Football", code: "FOOTBALL" };
const basketball: SportResponse = {
  id: 2,
  name: "Basketball",
  code: "BASKETBALL",
};
const volleyball: SportResponse = {
  id: 3,
  name: "Volleyball",
  code: "VOLLEYBALL",
};
const handball: SportResponse = { id: 4, name: "Handball", code: "HANDBALL" };

// ── Tournaments (Côte d'Ivoire) ─────────────────────────────────────────
const COMP_LOGO = "https://cdn-icons-png.flaticon.com/512/861/861512.png";

const interclassesEsatic: TournamentDto = {
  id: 1,
  name: "Interclasses ESATIC",
  logoPath: COMP_LOGO,
  sport: football,
};
const fenu: TournamentDto = {
  id: 2,
  name: "Championnat FENU",
  logoPath: COMP_LOGO,
  sport: football,
};
const coupeLycees: TournamentDto = {
  id: 3,
  name: "Coupe Excellence Lycéenne",
  logoPath: COMP_LOGO,
  sport: football,
};
const ligue2: TournamentDto = {
  id: 4,
  name: "Ligue 2 Ivoirienne",
  logoPath: COMP_LOGO,
  sport: football,
};
// Basketball / volleyball tournaments removed for now — add them back
// here when the first matches for those sports land in [matches] below.

// ── Teams ───────────────────────────────────────────────────────────────
const TEAM_LOGO = (n: string) =>
  `https://cdn-icons-png.flaticon.com/512/5968/596852${n}.png`;

const lysSassandra: TeamResponse = {
  id: 11,
  name: "LYS Sassandra",
  logo: TEAM_LOGO("9"),
};
const asecMimosas: TeamResponse = {
  id: 12,
  name: "ASEC Mimosas",
  logo: TEAM_LOGO("3"),
};
const uscBassam: TeamResponse = {
  id: 13,
  name: "USC Bassam",
  logo: TEAM_LOGO("1"),
};
const afadDjekanou: TeamResponse = {
  id: 14,
  name: "AFAD Djékanou",
  logo: TEAM_LOGO("7"),
};
const ufhbCocody: TeamResponse = {
  id: 15,
  name: "UFHB Cocody",
  logo: TEAM_LOGO("3"),
};
const inpHb: TeamResponse = {
  id: 16,
  name: "INP-HB Yamoussoukro",
  logo: TEAM_LOGO("4"),
};
const lyceeClassique: TeamResponse = {
  id: 17,
  name: "Lycée Classique d'Abidjan",
  logo: TEAM_LOGO("1"),
};
const lyceeSainteMarie: TeamResponse = {
  id: 18,
  name: "Lycée Sainte-Marie",
  logo: TEAM_LOGO("9"),
};
const esaticReseaux: TeamResponse = {
  id: 19,
  name: "ESATIC — Filière Réseaux",
  logo: TEAM_LOGO("8"),
};
const esaticGl: TeamResponse = {
  id: 20,
  name: "ESATIC — Filière Génie Logiciel",
  logo: TEAM_LOGO("8"),
};

// ── Matches ─────────────────────────────────────────────────────────────
function generateMockMatches(): MatchResponse[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const iso = (d: Date) => d.toISOString();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  return [
    // ── Featured ("À la Une") ─────────────────────────────────────────────
    // Curated for the home screen via [MatchResponse.isFeatured]. Each
    // match still belongs to its real competition so it appears with the
    // right comp logo + name in team / player detail pages.
    {
      id: 1,
      homeTeam: lysSassandra,
      awayTeam: asecMimosas,
      scoreHomeTeam: 3,
      scoreAwayTeam: 1,
      status: "LIVE",
      currentMinute: "89:17",
      scheduleDate: iso(today),
      scheduleTime: "18:00",
      tournament: ligue2,
      isFeatured: true,
    },
    {
      id: 2,
      homeTeam: ufhbCocody,
      awayTeam: inpHb,
      scoreHomeTeam: 0,
      scoreAwayTeam: 4,
      status: "FINISHED",
      scheduleDate: iso(yesterday),
      scheduleTime: "15:30",
      tournament: fenu,
      isFeatured: true,
    },
    {
      id: 3,
      homeTeam: lyceeClassique,
      awayTeam: lyceeSainteMarie,
      homeTeamForm: "0-2-1",
      awayTeamForm: "3-0-0",
      status: "SCHEDULED",
      scheduleDate: iso(dayAfter),
      scheduleTime: "16:00",
      tournament: coupeLycees,
      isFeatured: true,
    },

    // ── Ligue 2 Ivoirienne (semi-pro) ─────────────────────────────────────
    {
      id: 4,
      homeTeam: uscBassam,
      awayTeam: afadDjekanou,
      scoreHomeTeam: 0,
      scoreAwayTeam: 1,
      status: "LIVE",
      currentMinute: "30:28",
      scheduleDate: iso(today),
      scheduleTime: "20:00",
      tournament: ligue2,
    },
    {
      id: 5,
      homeTeam: lysSassandra,
      awayTeam: uscBassam,
      scoreHomeTeam: 2,
      scoreAwayTeam: 2,
      status: "FINISHED",
      scheduleDate: iso(yesterday),
      scheduleTime: "17:00",
      tournament: ligue2,
    },
    {
      id: 6,
      homeTeam: afadDjekanou,
      awayTeam: asecMimosas,
      status: "SCHEDULED",
      scheduleDate: iso(tomorrow),
      scheduleTime: "19:00",
      tournament: ligue2,
    },

    // ── Coupe Excellence Lycéenne ─────────────────────────────────────────
    {
      id: 7,
      homeTeam: lyceeClassique,
      awayTeam: lyceeSainteMarie,
      scoreHomeTeam: 1,
      scoreAwayTeam: 1,
      status: "FINISHED",
      scheduleDate: iso(yesterday),
      scheduleTime: "14:00",
      tournament: coupeLycees,
    },
    {
      id: 8,
      homeTeam: lyceeSainteMarie,
      awayTeam: lyceeClassique,
      status: "SCHEDULED",
      scheduleDate: iso(tomorrow),
      scheduleTime: "15:00",
      tournament: coupeLycees,
    },

    // ── Interclasses ESATIC ───────────────────────────────────────────────
    {
      id: 9,
      homeTeam: esaticReseaux,
      awayTeam: esaticGl,
      scoreHomeTeam: 2,
      scoreAwayTeam: 3,
      status: "FINISHED",
      scheduleDate: iso(yesterday),
      scheduleTime: "12:00",
      tournament: interclassesEsatic,
    },
    {
      id: 10,
      homeTeam: esaticGl,
      awayTeam: esaticReseaux,
      status: "SCHEDULED",
      scheduleDate: iso(tomorrow),
      scheduleTime: "13:00",
      tournament: interclassesEsatic,
    },
  ];
}

// Memoize so subsequent calls don't allocate again — same pattern as
// `_cachedMatches` in the Flutter mock.
let _cached: MatchResponse[] | null = null;
const matches = () => (_cached ??= generateMockMatches());

export class MockMatchesService implements IMatchesService {
  async getMatches(params?: {
    sportCode?: string;
    status?: string;
  }): Promise<MatchResponse[]> {
    await new Promise((r) => setTimeout(r, 120));
    return matches().filter((m) => {
      if (params?.sportCode && m.tournament?.sport?.code !== params.sportCode) {
        return false;
      }
      if (params?.status && m.status !== params.status) return false;
      return true;
    });
  }

  async getSports(): Promise<SportResponse[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [football, basketball, volleyball, handball];
  }

  async getTournaments(params?: {
    sportCode?: string;
  }): Promise<TournamentDto[]> {
    await new Promise((r) => setTimeout(r, 80));
    // Unique by id, in first-seen order.
    const seen = new Set<number>();
    const all: TournamentDto[] = [];
    for (const m of matches()) {
      const t = m.tournament;
      if (!t?.id || seen.has(t.id)) continue;
      if (params?.sportCode && t.sport?.code !== params.sportCode) continue;
      seen.add(t.id);
      all.push(t);
    }
    return all;
  }

  async getMatchDetail(matchId: number): Promise<MatchDetail | null> {
    await new Promise((r) => setTimeout(r, 180));
    const match = matches().find((m) => m.id === matchId);
    if (!match) return null;
    return buildMatchDetail(match);
  }
}

// ── MatchDetail builder ────────────────────────────────────────────────
// Mirrors the Flutter `_buildMatchDetail` private helper — synthesises a
// realistic detail object from the lightweight `MatchResponse`. The shape
// matches what a real backend would return so the UI doesn't change when
// we flip to HTTP on Sunday.

function buildMatchDetail(match: MatchResponse): MatchDetail {
  const homeName = match.homeTeam?.name ?? "Home";
  const awayName = match.awayTeam?.name ?? "Away";

  const scorers = [
    {
      playerName: "K. Yao",
      minutes: [54, 56],
      side: "home" as const,
    },
    {
      playerName: "A. Coulibaly",
      minutes: [77],
      side: "home" as const,
    },
    {
      playerName: "D. Souleymane",
      minutes: [84],
      side: "away" as const,
    },
  ];

  const lineup = (coach: string, prefix: string): TeamLineup => ({
    coachName: coach,
    starters: [
      { number: 1, name: `${prefix} Touré`, position: "Gardien" },
      { number: 2, name: `${prefix} Bamba`, position: "Défenseur" },
      { number: 4, name: `${prefix} Coulibaly`, position: "Défenseur" },
      { number: 5, name: `${prefix} Diallo`, position: "Défenseur" },
      { number: 6, name: `${prefix} Konan`, position: "Milieu" },
      { number: 8, name: `${prefix} Soro`, position: "Milieu" },
      { number: 10, name: `${prefix} Yao`, position: "Milieu" },
      { number: 7, name: `${prefix} Kouassi`, position: "Attaquant" },
      { number: 9, name: `${prefix} Traoré`, position: "Attaquant" },
      { number: 11, name: `${prefix} N'Guessan`, position: "Attaquant" },
      { number: 14, name: `${prefix} Diabaté`, position: "Attaquant" },
    ],
    substitutes: [
      { number: 12, name: `${prefix} Yapi`, position: "Gardien" },
      { number: 15, name: `${prefix} Brou`, position: "Défenseur" },
      { number: 16, name: `${prefix} Ouattara`, position: "Milieu" },
      { number: 17, name: `${prefix} Adjé`, position: "Attaquant" },
    ],
  });

  const stats: MatchStatistic[] = [
    { label: "Possession", homeValue: 58, awayValue: 42, isPercentage: true },
    { label: "Tirs", homeValue: 12, awayValue: 7 },
    { label: "Tirs cadrés", homeValue: 5, awayValue: 3 },
    { label: "Corners", homeValue: 6, awayValue: 4 },
    { label: "Fautes", homeValue: 9, awayValue: 14 },
    {
      label: "Précision passes",
      homeValue: 87,
      awayValue: 79,
      isPercentage: true,
    },
    { label: "Cartons jaunes", homeValue: 1, awayValue: 3 },
    { label: "Cartons rouges", homeValue: 0, awayValue: 1 },
  ];

  const standings: StandingRow[] = [
    {
      rank: 1,
      teamName: "LYS Sassandra",
      played: 18,
      won: 12,
      drawn: 3,
      lost: 3,
      goalsFor: 38,
      goalsAgainst: 14,
      points: 39,
    },
    {
      rank: 2,
      teamName: "ASEC Mimosas",
      played: 18,
      won: 11,
      drawn: 4,
      lost: 3,
      goalsFor: 34,
      goalsAgainst: 16,
      points: 37,
    },
    {
      rank: 3,
      teamName: "AFAD Djékanou",
      played: 18,
      won: 10,
      drawn: 4,
      lost: 4,
      goalsFor: 28,
      goalsAgainst: 17,
      points: 34,
    },
    {
      rank: 4,
      teamName: "USC Bassam",
      played: 18,
      won: 8,
      drawn: 5,
      lost: 5,
      goalsFor: 24,
      goalsAgainst: 20,
      points: 29,
    },
    {
      rank: 5,
      teamName: "UFHB Cocody",
      played: 18,
      won: 7,
      drawn: 4,
      lost: 7,
      goalsFor: 22,
      goalsAgainst: 23,
      points: 25,
    },
  ];

  return {
    match,
    scorers,
    events: [
      { minute: 14, type: "goal", side: "home", playerName: "K. Yao" },
      {
        minute: 18,
        type: "penaltyMissed",
        side: "away",
        playerName: "D. Souleymane",
      },
      {
        minute: 28,
        type: "goal",
        side: "away",
        playerName: "D. Souleymane",
      },
      { minute: 54, type: "goal", side: "home", playerName: "K. Yao" },
      {
        minute: 56,
        type: "goal",
        side: "home",
        playerName: "A. Coulibaly",
        secondaryPlayerName: "K. Yao",
      },
      {
        minute: 78,
        type: "substitution",
        side: "home",
        playerName: "B. Yacouba",
        secondaryPlayerName: "T. Bakary",
      },
      { minute: 80, type: "redCard", side: "away", playerName: "S. Mahamadou" },
      { minute: 82, type: "yellowCard", side: "home", playerName: "O. Daouda" },
      {
        minute: 84,
        type: "goal",
        side: "home",
        playerName: "K. Yao",
        secondaryPlayerName: "A. Coulibaly",
      },
    ],
    odds: {
      bookmaker: "AkwaBet",
      home: 1.65,
      draw: 3.4,
      away: 4.8,
    },
    homeForm: ["win", "loss", "win", "win", "draw"],
    awayForm: ["draw", "win", "win", "loss", "win"],
    competition: match.tournament?.name ?? "Ligue 2 Ivoirienne",
    startsAt: match.scheduleDate,
    venue: "Stade municipal de Sassandra",
    lineups: {
      home: lineup("Yao Kouassi", homeName.charAt(0)),
      away: lineup("Diomandé Mamadou", awayName.charAt(0)),
    },
    stats: { full: stats },
    standings,
  };
}
