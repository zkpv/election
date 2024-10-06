// Simulate candidates being loaded from the backend
const candidates = [
    { name: 'Candidate A', affiliation: 'Party 1' },
    { name: 'Candidate B', affiliation: 'Party 2' },
    { name: 'Candidate C', affiliation: 'Party 3' },
];

const votingForm = document.getElementById('votingForm') as HTMLFormElement;
const firstChoiceSelect = document.getElementById('firstChoice') as HTMLSelectElement;
const secondChoiceSelect = document.getElementById('secondChoice') as HTMLSelectElement;
const confirmationScreen = document.getElementById('confirmationScreen') as HTMLDivElement;
const summaryScreen = document.getElementById('summaryScreen') as HTMLDivElement;
const confirmationFirstChoice = document.getElementById('confirmationFirstChoice') as HTMLParagraphElement;
const confirmationSecondChoice = document.getElementById('confirmationSecondChoice') as HTMLParagraphElement;
const summaryChoices = document.getElementById('summaryChoices') as HTMLParagraphElement;

let selectedFirstChoice: string;
let selectedSecondChoice: string;

function populateChoices() {
    candidates.forEach(candidate => {
        const option1 = document.createElement('option');
        option1.value = candidate.name;
        option1.textContent = `${candidate.name} (${candidate.affiliation})`;
        firstChoiceSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = candidate.name;
        option2.textContent = `${candidate.name} (${candidate.affiliation})`;
        secondChoiceSelect.appendChild(option2);
    });
}

votingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    selectedFirstChoice = firstChoiceSelect.value;
    selectedSecondChoice = secondChoiceSelect.value;

    confirmationFirstChoice.textContent = selectedFirstChoice;
    confirmationSecondChoice.textContent = selectedSecondChoice;

    votingForm.classList.add('hidden');
    confirmationScreen.classList.remove('hidden');
});

document.getElementById('confirmVote')?.addEventListener('click', () => {
    summaryChoices.textContent = `President: ${selectedFirstChoice}, ${selectedSecondChoice}`;
    confirmationScreen.classList.add('hidden');
    summaryScreen.classList.remove('hidden');
});

document.getElementById('correctVote')?.addEventListener('click', () => {
    confirmationScreen.classList.add('hidden');
    votingForm.classList.remove('hidden');
});

document.getElementById('finalConfirm')?.addEventListener('click', () => {
    alert('Vote confirmed!');
    // Here you would submit the vote and process zk-STARK logic
});

populateChoices();