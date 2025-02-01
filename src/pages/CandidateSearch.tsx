


import { useState, useEffect } from 'react';
import { searchGithubUser, getCandidates } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

interface CandidateSearchProps {
  onSaveCandidate: (candidate: Candidate) => void;
}

const CandidateSearch: React.FC<CandidateSearchProps> = ({ onSaveCandidate }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialCandidates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCandidates(); // Call without arguments
        setCandidates(data);
      } catch (err) {
        setError('Failed to fetch initial candidates');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialCandidates();
  }, []);

  const fetchCandidate = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithubUser(username);
      setCandidates([...candidates, data]);
      setCurrentCandidateIndex(candidates.length);
    } catch (err) {
      setError('Failed to fetch candidate');
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    const candidate = candidates[currentCandidateIndex];
    if (candidate) {
      onSaveCandidate(candidate);
      showNextCandidate();
    }
  };

  const showNextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      fetchCandidate('nextUsername');
    }
  };

  const skipCandidate = () => {
    showNextCandidate();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const candidate = candidates[currentCandidateIndex];
  if (!candidate) {
    return <div>No more candidates available</div>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <img src={candidate.avatar_url} alt="Avatar" />
        <p>Name: {candidate.name}</p>
        <p>Username: {candidate.login}</p>
        <p>Location: {candidate.location}</p>
        <p>Email: {candidate.email}</p>
        <p>Company: {candidate.company}</p>
        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
      </div>
      <button onClick={saveCandidate}>+</button>
      <button onClick={skipCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;
