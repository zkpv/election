// Simulated results, replace with actual data from backend
const results = [
    { name: 'Candidate A', votes: 120 },
    { name: 'Candidate B', votes: 90 },
    { name: 'Candidate C', votes: 150 },
];

const resultsTableBody = document.getElementById('resultsTableBody') as HTMLTableSectionElement;

function populateResults() {
    resultsTableBody.innerHTML = '';
    results.forEach(result => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const votesCell = document.createElement('td');
        
        nameCell.textContent = result.name;
        votesCell.textContent = result.votes.toString();
        
        row.appendChild(nameCell);
        row.appendChild(votesCell);
        resultsTableBody.appendChild(row);
    });
}

// Simulate real-time updates
setInterval(() => {
    // Here, you would fetch new data from backend and update the table
    populateResults();
}, 5000);

populateResults();