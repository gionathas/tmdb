export interface Credit {
  id: number;
  adult: boolean;
  name: string;
  popularity: number;
  profile_path?: string | null;
}

export interface CastCredit extends Credit {
  character: string;
}

export interface CrewCredit extends Credit {
  department: string;
  job: string;
}
