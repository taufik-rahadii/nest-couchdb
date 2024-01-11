export interface CouchDBConfig {
  url: string;
  cookieSession?: string;
  log?: (id: string, args: any) => void;
  username: string;
  password: string;
  sync: boolean;
}
