// function lookAndSay(seq) {
//     console.log(seq);
//     var prev = seq[0];
//     var freq = 0;
//     var output = [];
//     seq.forEach(function (s) {
//         if (s == prev) {
//             freq++;
//         }
//         else {
//             output.push(prev);
//             output.push(freq);
//             prev = s;
//             freq = 1;
//         }
//     });
//     output.push(prev);
//     output.push(freq);
//     console.log(output.join(''));
//     return output;
// }

// Sample: try on the first 11 sequences
// var seq = [1];
// for (var n = 0; n < 3; n++) {
//     seq = lookAndSay(seq);
// }

function lookAndSay(seq) {
    console.log(seq);
    var prev = seq[0];
    var freq = 0;

    let start = 0;
    let end = 0;
    while (end <= seq.length) {
        if (seq[end] !== seq[end + 1]) {
            
        }
    }
    console.log(output.join(''));
    return output;
}

// Sample: try on the first 11 sequences
var seq = [1];
for (var n = 0; n < 3; n++) {
    seq = lookAndSay(seq);
}