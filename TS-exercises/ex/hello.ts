function rnaTranscription(dna: string) {
    let rna = '';
    for (let i = 0; i < dna.length; i++) {
        console.log(dna[i]);
        if (dna[i] === 'G') {
            rna += 'C';
        } else if (dna[i] === 'C') {
            rna += 'G';
        } else if (dna[i] === 'T') {
            rna += 'A';
        } else if (dna[i] === 'A') {
            rna += 'U';
        }
    }
    console.log(rna);
}

rnaTranscription('GCTAGCTGC');
