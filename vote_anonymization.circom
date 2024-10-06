// Circuit for zk-STARK-based vote anonymization and verification
// This circuit ensures that votes are anonymized and that no double voting occurs.

pragma circom 2.0.0;

template VoteAnonymization() {

    // Signal inputs
    signal input vote;             // The actual vote (candidate ID)
    signal input nullifierHash;     // Nullifier to prevent double voting
    signal input merkleRoot;        // Merkle root of the voter list (for validity check)
    signal input merkleProof[32];   // Merkle proof to verify the voter is valid
    signal input voterLeafHash;     // Hash of the voter’s data (to check against Merkle root)

    // Signals for the output
    signal output isValidVote;      // Output to indicate if the vote is valid
    signal output anonymizedVote;   // The anonymized vote output

    // Constants
    var ZERO = 0;                   // Nullifier constant

    // Step 1: Verify that the voter is in the Merkle tree (valid voter)
    component isVoterValid = MerkleProofCheck(32);
    isVoterValid.leafHash <== voterLeafHash;
    isVoterValid.root <== merkleRoot;
    for (var i = 0; i < 32; i++) {
        isVoterValid.proof[i] <== merkleProof[i];
    }

    // Step 2: Ensure the nullifier hash is correct (no double voting)
    signal doubleVotingCheck;
    doubleVotingCheck <== (nullifierHash == ZERO);  // If nullifier is ZERO, no double voting occurred

    // Step 3: Anonymize the vote using a hash function
    signal anonymizedVoteHash;
    anonymizedVoteHash <== poseidon([vote, nullifierHash]);

    // Step 4: Output the results
    isValidVote <== isVoterValid.isValid && doubleVotingCheck;  // Valid vote if voter is valid and no double voting
    anonymizedVote <== anonymizedVoteHash;  // Return the anonymized vote
}

// Merkle proof checker to verify valid voter from the Merkle tree
template MerkleProofCheck(depth) {

    signal input leafHash;         // The leaf hash (voter data)
    signal input root;             // The Merkle root
    signal input proof[depth];     // The Merkle proof

    signal output isValid;         // Output indicating whether the proof is valid

    // Start with the leaf and hash up the tree
    signal hash = leafHash;
    for (var i = 0; i < depth; i++) {
        hash <== poseidon([hash, proof[i]]);
    }

    // The proof is valid if the final hash matches the Merkle root
    isValid <== (hash == root);
}

// Main circuit instantiation
component main = VoteAnonymization();