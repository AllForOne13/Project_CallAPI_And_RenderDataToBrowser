

import { useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

export const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
      throw new Error('GitHub token is not defined. Check your environment variables.');
    }

    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Invalid API response: ${response.statusText}`);
    }

    const data: Candidate[] = await response.json();
    return data;

  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

export const searchGithubUser = async (username: string): Promise<Candidate> => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
      throw new Error('GitHub token is not defined. Check your environment variables.');
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Invalid API response: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      avatar_url: data.avatar_url,
      name: data.name || 'N/A',
      login: data.login,
      location: data.location || 'N/A',
      email: data.email || 'N/A',
      company: data.company || 'N/A',
      html_url: data.html_url,
      id: data.id,
      node_id: data.node_id,
      url: data.url,
      followers_url: data.followers_url,
      gists_url: data.gists_url,
      starred_url: data.starred_url,
      subscriptions_url: data.subscriptions_url,
      organizations_url: data.organizations_url,
      repos_url: data.repos_url,
      events_url: data.events_url,
      type: data.type,
      site_admin: data.site_admin,
      blog: data.blog || 'N/A',
      bio: data.bio || 'N/A',
      twitter_username: data.twitter_username || 'N/A',
      public_repos: data.public_repos,
      followers: data.followers,
      created_at: data.created_at,
    };

  } catch (err) {
    console.error('An error occurred:', err);

    return {
      avatar_url: '',
      name: 'N/A',
      login: '',
      location: 'N/A',
      email: 'N/A',
      company: 'N/A',
      html_url: '',
      id: 0,
      node_id: '',
      url: '',
      followers_url: '',
      gists_url: '',
      starred_url: '',
      subscriptions_url: '',
      organizations_url: '',
      repos_url: '',
      events_url: '',
      type: '',
      site_admin: false,
      blog: 'N/A',
      bio: 'N/A',
      twitter_username: 'N/A',
      public_repos: 0,
      followers: 0,
      created_at: '',
    };
  }
};

export const getCandidates = async (): Promise<Candidate[]> => {
  const candidates = await searchGithub();
  console.log(candidates);

  // Call searchGithubUser for a specific username
  const username = 'example_username';
  const candidate = await searchGithubUser(username);
  console.log(candidate);

  return candidates;
};

// React component to use getCandidates
const MyComponent = () => {
  useEffect(() => {
    const fetchCandidates = async () => {
      const candidates = await getCandidates();
      console.log('Fetched candidates:', candidates);
    };

    fetchCandidates();
  }, []);

  return <div>Check the console for fetched candidates.</div>;
};

export default MyComponent;
