const GV = require('../../dist/valis-hpgv.js');

// pass a list of files to visualize in an array, the viewer will determine the best visualization to use
let config = {
    allowNewPanels: true,
    highlightLocation: 'chr1:54877700',
    reorderTracks: true,
    tracks: [ 
        {
            name: 'dbSNP (153)',
            type: 'variant',
            path: 'https://encoded-build.s3.amazonaws.com/browser/GRCh38/GRCh38-dbSNP153.vvariants-dir',
        },

        {
            file_format: 'variant',
            path: 'https://encoded-build.s3.amazonaws.com/browser/GRCh38/GRCh38-dbSNP153.vvariants-dir',
            title: 'dbSNP (153)',
            name: "dbSNP (153)",
            type: 'variant',
        }
    ],
};

let hpgv = new GV.GenomeVisualizer(config);

hpgv.render({ width: 800, height: 600 }, document.getElementById('container'));

document.getElementById('button-to-click').addEventListener('click', () => {
    console.log('clicked!');
    hpgv.setLocation({ contig: 'ch1', x0: 10000, x1: 248956422 });
});
