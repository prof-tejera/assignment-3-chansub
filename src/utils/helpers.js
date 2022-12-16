// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

//convert seconds to min:sec display
export const convertToMinSec = (s) => {
    let minutes = Math.floor(s/60);
    let secs = s % 60;
    let final = minutes.toString().padStart(2,'0') + ':' + secs.toString().padStart(2,'0');
    return final;
}
//sample
//export const add = (a, b) => a + b;

//from https://www.w3docs.com/snippets/javascript/how-to-move-an-array-element-from-one-array-position-to-another.html
export const  arrMove = (arr, oldIndex, newIndex) => {
if (newIndex >= arr.length) {
    let i = newIndex - arr.length + 1;
    while (i--) {
    arr.push(undefined);
    }
}
arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
return arr;
}
