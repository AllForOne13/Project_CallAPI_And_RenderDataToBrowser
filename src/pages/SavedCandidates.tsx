import { useState, useEffect } from 'react';
import CandidateSearch from './CandidateSearch';
import { Candidate } from '../interfaces/Candidate.interface';

// Remove CandidateSearchProps interface here

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  const handleSaveCandidate = (candidate: Candidate) => {
    const updatedCandidates = [...savedCandidates, candidate];
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates available</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img src={candidate.avatar_url} alt="Avatar" />
              <p>Name: {candidate.name}</p>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            </li>
          ))}
        </ul>
      )}
      <CandidateSearch onSaveCandidate={handleSaveCandidate} />
    </div>
  );
};

export default SavedCandidates;

