/*  
You are a developer for a university. Your current project is to develop a system for students to find courses they share with friends. The university has a system for querying courses students are enrolled in, returned as a list of (ID, course) pairs.

Write a function that takes in a list of (student ID number, course name) pairs and returns, for every pair of students, a list of all courses they share.

Sample Input:

student_course_pairs_1 = [
  ["58", "Software Design"],
  ["58", "Linear Algebra"],
  ["94", "Art History"],
  ["94", "Operating Systems"],
  ["17", "Software Design"],
  ["58", "Mechanics"],
  ["58", "Economics"],
  ["17", "Linear Algebra"],
  ["17", "Political Science"],
  ["94", "Economics"],
  ["25", "Economics"],
]

Sample Output (pseudocode, in any order):

find_pairs(student_course_pairs_1) =>
{
  [58, 17]: ["Software Design", "Linear Algebra"]
  [58, 94]: ["Economics"]
  [58, 25]: ["Economics"]
  [94, 25]: ["Economics"]
  [94, 17]: []
  [25, 17]: []
}

Additional test cases:

Sample Input:

student_course_pairs_2 = [
  ["42", "Software Design"],
  ["0", "Advanced Mechanics"],
  ["9", "Art History"],
]

Sample output:

find_pairs(student_course_pairs_2) =>
{
  [0, 42]: []
  [0, 9]: []
  [9, 42]: []
}
*/

/* 思路，Set, 存所有id， 遇到一个，删除，遍历其他的 */

function find_pairs(pairs) {
  let map = {}
  for (let i = 0; i < pairs.length; i++) {
    if (map[pairs[i][0]] !== undefined) {
      map[pairs[i][0]].add(pairs[i][1]);
    } else {
      map[pairs[i][0]] = new Set();
      map[pairs[i][0]].add(pairs[i][1])
    }
  }

  let keySet = Object.keys(map);
  console.log(map);
  console.log("\n");

  let result = {}
  for (let i = 0; i < keySet.length; i++) {
    for (let j = i + 1; j < keySet.length; j++) {
      let pair = keySet[i] + "," + keySet[j];
      let tempResult = [];
      for (let course of map[keySet[i]]) {
        if (map[keySet[j]].has(course)) {
          tempResult.push(course)
        }
      }

      result[pair] = tempResult.slice();
    }
  }
  console.log(result);
  return result;
}

// find_pairs([["58", "Software Design"],
// ["58", "Linear Algebra"],
// ["94", "Art History"],
// ["94", "Operating Systems"],
// ["17", "Software Design"],
// ["58", "Mechanics"],
// ["58", "Economics"],
// ["17", "Linear Algebra"],
// ["17", "Political Science"],
// ["94", "Economics"],
// ["25", "Economics"],
// ]);

/*
告诉你a是b的先修课，b是c的先修课，问你mid course是啥。并且条件是，只有一种修下来课的顺序，这里是 a -> b ->c
所以mid course就是b, <pre-request, course>
input 是 [(course1, course2), (course3, course4), (course2, course3)] ==> course2
207. Course Schedule
*/



function middleAllCourse(course) {
  let mapPre = {};
  let mapAfter = {}
  course.forEach((item) => {
    if (mapPre[item[1]] !== undefined) {
      mapPre[item[1]].push(item[0]);
    } else {
      mapPre[item[1]] = [item[0]];
    }
    if (mapPre[item[0]] === undefined) {
      mapPre[item[0]] = [];
    }

    if (mapAfter[item[0]] !== undefined) {
      mapAfter[item[0]].push(item[1]);
    }
    else {
      mapAfter[item[0]] = [item[1]];
    }
  });

  console.log(mapPre);
  console.log(mapAfter);
  

  let headCourse = [];
  let keySet = Object.keys(mapPre);
  for (let key of keySet) {
    if (mapPre[key].length === 0) {
      headCourse.push(key);
    }
  }

  
  function dfs(preCourse, count) {
    if (count === midCouresCount) {
      return preCourse;
    }
    for (let course of mapAfter[preCourse]) {
      return dfs(course, count + 1);
    }
  }

  // let result = [];
  // for(let course of headCourse) {
  //   dfs(beginCourse, 1);
  // }
  // console.log(result);
  // return result;
  
}

middleAllCourse(
  [["Logic", "COBOL"],
  ["Data Structures", "Algorithms"],
  ['Creative Writing', "Data Structures"],
  ["Algorithms", "COBOL"],
  ["Intro to Computer Science", "Data Structure"],
  ["Logic", "Compilers"],
  ["Data Structure", "Logic"],
  ["Creative Writing", "System Adminstration"],
  ["Databases", "System Adminstration"],
  ["Creative Writing", "Databases"]]
);