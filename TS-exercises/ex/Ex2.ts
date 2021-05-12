function rnaTranscriptionV1(dna: string) {
    let rna = '';
    // if we use "for... of...", we can directly get the item from arr
    for (const nucleotide of dna) {
        // The switch statement is used to perform different actions based on different conditions.
        switch (nucleotide) {
            case 'G':
                rna += 'C'
                // code here
                break;
            case 'C':
                rna += 'G'
                // code here
                break;
            case 'T':
                rna += 'A'
                // code here
                break;
            case 'A':
                rna += 'U'
                // code here
                break;
            default:
                console.log('didnt match any DNA')
            // code here
        }
    }
    console.log(rna);
}

rnaTranscriptionV1('GCTAGCT');

function rnaTranscriptionV3(dna: string) {
    let rna = '';
    const dnaMap0 = { 'G':'C' }
    const dnaMap1 = { 'C':'G' }
    const dnaMap2 = { 'T':'A' }
    const dnaMap3 = { 'A':'U' }
    for (const nucleotide of dna) {
        if (nucleotide in dnaMap0) {
            const newNucleotide = dnaMap0[nucleotide];
            rna += newNucleotide;
        } else if (nucleotide in dnaMap1) {
            const newNucleotide = dnaMap1[nucleotide];
            rna += newNucleotide;
        } else if (nucleotide in dnaMap2) {
            const newNucleotide = dnaMap2[nucleotide];
            rna += newNucleotide;
        } else if (nucleotide in dnaMap3) {
            const newNucleotide = dnaMap3[nucleotide];
            rna += newNucleotide;
        }
    }
    console.log(rna);
}
rnaTranscriptionV3('GCTAGCTB');