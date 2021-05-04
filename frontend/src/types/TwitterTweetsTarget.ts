export interface TwitterTweetsTarget {
  [x: string]: any;
  id: string | number;
  target_platform: string | number;
  target_type: string | number;
  target_username: string | number;
  tweets_count: string | number;
  tweets: Array<any>;
  target_scheduling: string | number;
  scanning_status: string | number;
  created_at: string | number;
  updated_at: string | number;
}
