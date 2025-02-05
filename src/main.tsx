





import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import CandidateSearch from './pages/CandidateSearch.tsx';
import SavedCandidates from './pages/SavedCandidates.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import { Candidate } from './interfaces/Candidate.interface';
import { getCandidates, searchGithub } from './api/API.tsx'; 

// Access environment variables using import.meta.env
const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
if (!githubToken) {
  throw new Error('GitHub token is not defined. Check your environment variables.');
}
console.log('GitHub Token:', githubToken);

// Define the handleSaveCandidate function
const handleSaveCandidate = (candidate: Candidate) => {
  console.log('Saving candidate:', candidate);

  // Retrieve the existing saved candidates from local storage
  const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');

  // Add the new candidate to the list of saved candidates
  savedCandidates.push(candidate);

  // Save the updated list back to local storage
  localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));

  console.log('Candidate saved successfully!');
};

// Call the getCandidates function to fetch candidates
getCandidates().then(candidates => {
  console.log('Fetched candidates:', candidates);
}).catch(error => {
  console.error('Error fetching candidates:', error);
});

// Call the searchGithub function to fetch GitHub users with the token
searchGithub().then(users => {
  console.log('Fetched GitHub users:', users);
}).catch(error => {
  console.error('Error fetching GitHub users:', error);
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CandidateSearch onSaveCandidate={handleSaveCandidate} />,
      },
      {
        path: '/SavedCandidates',
        element: <SavedCandidates />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);}
