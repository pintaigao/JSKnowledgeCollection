/* Approach 1 */
function hashModular(key, size){
    return key % size;
  }
  
  let list = []; 
  for(var i=0; i<10; i++){ // Array of size 10
    list[i]=null;
  }
  let key = 35;
  let index = hashModular(key, list.length); // Fit the key into the array size
  console.log("The index for key " + String(key) + " is " + String(index))