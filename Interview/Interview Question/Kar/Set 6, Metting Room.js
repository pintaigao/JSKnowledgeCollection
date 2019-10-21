/* 第一题：类似meeting rooms，输入是一个int[][] meetings, int start, int end, 每个数都是时间，13：00 =》 1300， 9：30 =》 930， 
看新的meeting 能不能安排到meetings
ex: {[1300, 1500], [930, 1200],[830, 845]}, 新的meeting[820, 830], return true; [1450, 1500] return false;
 */

function solution1(meetings, start, end) {
    meetings.sort((a, b) => a[0] - b[0]);
    console.log(meetings);
}

solution1([[1300, 1500], [930, 1200], [830, 845]]);

