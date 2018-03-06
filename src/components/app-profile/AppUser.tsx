interface AppUser {
  sub: string;
  name: string;
  locale: string;
  email: string;
  ver: number;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  jti: string;
  amr: string[];
  idp: string;
  nonce: string;
  nickname: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  zoneinfo: string;
  updated_at: number;
  email_verified: boolean;
  auth_time: number;
}
