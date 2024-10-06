// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StarknetMessaging.sol";

contract VotingContract {
    struct Candidate {
        string name;
        string affiliation;
        uint256 votes;
        bool exists;
    }

    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;
    
    mapping(address => bool) public hasVoted;

    event CandidateRegistered(uint256 candidateId, string name, string affiliation);
    event VoteCast(address voter, uint256 candidateId);
    event VoteTransfer(uint256 candidateId, uint256 transferredVotes);

    function registerCandidate(string memory _name, string memory _affiliation) public {
        candidateCount++;
        candidates[candidateCount] = Candidate(_name, _affiliation, 0, true);
        emit CandidateRegistered(candidateCount, _name, _affiliation);
    }

    function castVote(uint256 _candidateId) public {
        require(!hasVoted[msg.sender], "Voto ok.");
        candidates[_candidateId].votes++;
        hasVoted[msg.sender] = true;
        emit VoteCast(msg.sender, _candidateId);
    }
}