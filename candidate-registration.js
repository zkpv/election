const candidateForm = document.getElementById('candidateForm') as HTMLFormElement;
const candidateList = document.getElementById('candidateList') as HTMLUListElement;

interface Candidate {
    name: string;
    affiliation: string;
}

let candidates: Candidate[] = [];

candidateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = (document.getElementById('name') as HTMLInputElement).value;
    const affiliationInput = (document.getElementById('affiliation') as HTMLInputElement).value;
    
    const newCandidate: Candidate = { name: nameInput, affiliation: affiliationInput };
    candidates.push(newCandidate);
    updateCandidateList();
});

function updateCandidateList() {
    candidateList.innerHTML = '';
    candidates.forEach((candidate, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${candidate.name} (${candidate.affiliation})`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            candidates.splice(index, 1);
            updateCandidateList();
        };
        listItem.appendChild(deleteButton);
        candidateList.appendChild(listItem);
    });
}