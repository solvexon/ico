export interface UserStake {
  amount: number;
  startDate: Date;
  endDate: Date;
  claimed: boolean;
}

export interface ReferralEarning {
  from: string;
  amount: number;
  level: number;
  date: Date;
}

export interface UserStats {
  totalStaked: number;
  totalReferralEarnings: number;
  directReferrals: number;
  totalTeam: number;
}