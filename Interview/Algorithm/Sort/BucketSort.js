function bucketSort(list, bucketCount){
    // only for numbers
    var min = Math.min.apply(Math, list),  // get the min
        buckets = [],
        bucket_count = bucketCount || 200

    // build the bucket and distribute the elements in the list
    for (var i = 0; i < list.length; i++) {
        // this is a simple hash function that will make sure the basic rule of bucket sort
        var newIndex = Math.floor((list[i] - min) / bucket_count);

        buckets[newIndex] = buckets[newIndex] || []
        buckets[newIndex].push(list[i])
    }
    // refill the elements into the list
    var idx = 0
    for (i = 0; i < buckets.length; i++) {
        if (typeof buckets[i] !== "undefined") {
            // select those non-empty buckets
            insertionSort(buckets[i]);  // use any sorting algorithm would be fine
            // sort the elements in the bucket
            for (var j = 0; j < buckets[i].length; j++) {
                list[idx++] = buckets[i][j]
            }
        }
    }
    return list
}

// counting sort
function countingSort(list){
    var bucket = [], idx = 0;

    // assign each element to its bucket
    for (var i = 0; i < list.length; i++) {
        bucket[list[i]] = bucket[list[i]] || 0
        bucket[list[i]]++
    }

    // now combine all the buckets
    for (i = 0; i < bucket.length; i++) {
        while (bucket[i] && bucket[i] > 0) {
            // skip empty buckets and loop over every elements in a bucket
            list[idx++] = i;
            bucket[i]--;
        }
    }
    return list
}