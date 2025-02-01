// TODO: Create an interface for the Candidate objects returned by the API


export interface Candidate {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id?: string;
    url: string;
    location:string;
    html_url: string;
    followers_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    company:string;
    events_url: string;
    type: string;
    site_admin: boolean;
    name?: string|undefined;
    blog?: string;
    email?: string;
    hireable?: boolean;
    bio?: string;
    twitter_username?: string;
    public_repos: number;
    followers: number;
    created_at: string;

    

  }
  export interface CandidateSearchProps {
    onSaveCandidate: (candidate: Candidate) => void;
  }
  