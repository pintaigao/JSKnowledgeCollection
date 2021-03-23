# Introduction to Hashing

Hashing is a process used to store an object according to a unique key. This means that hashing always creates a **key-value pair**. A collection of such pairs forms a *dictionary* where every object or value can be looked up according to its key. Hence, the search operation can be performed in *O(1)*.



#### Hash Tables

The performance of a hash table depends on three fundamental factors:

- Hash function
- Size of the hash table
- Collision handling method



#### The Hash Function

A **key** is used to map a value in the array, and the efficiency of a hash table depends on how a key is computed. At first glance, you may observe that we can directly use the indices(索引) as keys because each index is unique.



A hash function takes an item’s key and returns the corresponding index in the array for that item. Depending on your program, the calculation of this index can be a simple arithmetic or a very complicated encryption method. However, it is important to choose an efficient hashing function as **it directly affects the performance** of the hash table mechanism.



#### Collisions in Hash Tables

There are several ways to work around collisions in the array. The three most common strategies are:

- *Linear Probing*
- *Chaining*
- *Resizing the array*



**Linear Probing**

This strategy suggests that if our hash function returns an index that is already filled, it would **move to the next index**. This increment can be based on a fixed offset value to an already computed index. If that index is also filled, it would traverse farther until a free spot is found.

One drawback of using this strategy is that if we don’t pick an offset wisely, we can end up back where we started and we would miss out on so many possible positions in the array.



**Chaining**

Each slot of our **hash table holds a pointer to another data structure** such as a linked list or a tree. Every entry at that index will be inserted into the **linked list** for that index.

**Pros:** chaining allows us to hash multiple key-value pairs at the same index in constant time (inserts at the head for linked lists). This strategy greatly increases performance.

**Cons:** It is costly in terms of space.



**Resizing the array**

we can create a new table that is double the size of the original. All we have to do then is to copy the elements from the previous table.