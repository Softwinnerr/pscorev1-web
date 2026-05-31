import type {
  MatchResponse,
  SportResponse,
  TournamentDto,
  TeamResponse,
} from "@/types/models";
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
}
