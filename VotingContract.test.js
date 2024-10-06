const VotingContract = artifacts.require("VotingContract");

contract("VotingContract", (accounts) => {
    let votingInstance;

    beforeEach(async () => {
        votingInstance = await VotingContract.new();
    });

    it("should register a new candidate", async () => {
        const name = "Candidate A";
        const affiliation = "Party 1";
        
        await votingInstance.registerCandidate(name, affiliation);
        const candidate = await votingInstance.candidates(1); // First candidate is registered with ID 1
        
        assert.equal(candidate.name, name, "Candidate name should match");
        assert.equal(candidate.affiliation, affiliation, "Candidate affiliation should match");
        assert.equal(candidate.votes.toNumber(), 0, "Initial votes should be 0");
        assert.equal(candidate.exists, true, "Candidate should exist");
    });

    it("should allow a user to cast a vote", async () => {
        const name = "Candidate B";
        const affiliation = "Party 2";
        
        await votingInstance.registerCandidate(name, affiliation);
        await votingInstance.castVote(1, { from: accounts[0] });
        
        const candidate = await votingInstance.candidates(1);
        assert.equal(candidate.votes.toNumber(), 1, "Votes should be incremented after voting");
        
        const hasVoted = await votingInstance.hasVoted(accounts[0]);
        assert.equal(hasVoted, true, "Voter should be marked as having voted");
    });

    it("should not allow a user to vote twice", async () => {
        const name = "Candidate C";
        const affiliation = "Party 3";
        
        await votingInstance.registerCandidate(name, affiliation);
        await votingInstance.castVote(1, { from: accounts[1] });
        
        try {
            await votingInstance.castVote(1, { from: accounts[1] });
            assert.fail("The same user should not be able to vote twice");
        } catch (error) {
            assert(error.message.includes("You have already voted"), "Expected 'You have already voted' error");
        }
    });

    it("should allow vote transfer between candidates", async () => {
        const nameA = "Candidate D";
        const affiliationA = "Party 4";
        const nameB = "Candidate E";
        const affiliationB = "Party 5";
        
        await votingInstance.registerCandidate(nameA, affiliationA);
        await votingInstance.registerCandidate(nameB, affiliationB);
        
        await votingInstance.castVote(1, { from: accounts[2] });
        
        await votingInstance.transferVotes(1, 2, 1, { from: accounts[2] });
        
        const candidateA = await votingInstance.candidates(1);
        const candidateB = await votingInstance.candidates(2);
        
        assert.equal(candidateA.votes.toNumber(), 0, "All votes should be transferred from Candidate A");
        assert.equal(candidateB.votes.toNumber(), 1, "Transferred votes should be added to Candidate B");
    });

    it("should validate zk-STARK proof", async () => {
        const validProof = "0x123456"; // Mock proof for testing
        const isValid = await votingInstance.verifySTARKProof(validProof);
        
        assert.equal(isValid, true, "zk-STARK proof should be valid");
    });
});