/* 
Question 1:
A website domain like "discuss.leetcode.com" consists of various subdomains. At the top level, we have "com", at the next level, we have "leetcode.com", and at the lowest level, "discuss.leetcode.com". When we visit a domain like "discuss.leetcode.com", we will also visit the parent domains "leetcode.com" and "com" implicitly.

Now, call a "count-paired domain" to be a count (representing the number of visits this domain received), followed by a space, followed by the address. An example of a count-paired domain might be "9001 discuss.leetcode.com".

We are given a list cpdomains of count-paired domains. We would like a list of count-paired domains, (in the same format as the input, and in any order), that explicitly counts the number of visits to each subdomain.

Example 1:
Input: 
["9001 discuss.leetcode.com"]
Output: 
["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
Explanation: 
We only have one website domain: "discuss.leetcode.com". As discussed above, the subdomain "leetcode.com" and "com" will also be visited. So they will all be visited 9001 times.

Example 2:
Input: 
["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
Output: 
["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
Explanation: 
We will visit "google.mail.com" 900 times, "yahoo.com" 50 times, "intel.mail.com" once and "wiki.org" 5 times. For the subdomains, we will visit "mail.com" 900 + 1 = 901 times, "com" 900 + 50 + 1 = 951 times, and "org" 5 times.
 */

/**
* @param {string[]} cpdomains
* @return {string[]}
*/
var subdomainVisits = function (cpdomains) {
    // 1. Set up Map
    let map = {};
    // 2. Set up helper function 
    helper = (domain, count) => {
        let domainArray = domain.split("\.");
        let currDomain = "";
        for (let i = domainArray.length - 1; i >= 0; i--) {
            currDomain = domainArray[i] + (i < domainArray.length - 1 ? "." : "") + currDomain;
            if (map[currDomain] === undefined) {
                map[currDomain] = count;
            }
            else {
                map[currDomain] += count;
            }
        }
    }

    cpdomains.forEach((cpdomain) => {
        let cpdomainArray = cpdomain.split(" ");
        helper(cpdomainArray[1], parseInt(cpdomainArray[0]));
    });
    let result = [];
    for (let [key, value] of Object.entries(map)) {
        let tempResult = value + " " + key;
        result.push(tempResult)
    }
    return result;
};

// console.log(subdomainVisits(["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]));

/*
Question 2:
给每个user访问历史记录，找出两个user之间longest continuous common history
输入：
[ ["3234.html", "xys.html", "7hsaa.html"], // user1
  ["3234.html", ''sdhsfjdsh.html", "xys.html", "7hsaa.html"] // user2
], user1 and user2 （指定两个user求intersect）
输出：["xys.html", "7hsaa.html"]
Leetcode 718 Similar
*/

function longestCommonHistory(user1, user2) {
    let dp = Array(user1.length + 1).fill(0).map(element => {
        return Array(user2.length + 1).fill(0);

    });

    let max = 0;
    let end = -1;
    for (let i = 1; i < user1.length + 1; i++) {
        for (let j = 1; j < user2.length + 1; j++) {
            if (user1[i - 1] === user2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }

            if (dp[i][j] > max) {
                max = dp[i][j];
                end = i - 1;
            }
        }
    }

    let result = [];
    console.log(dp);

    for (let j = end; j > end - max; j--) {
        result.push(user1[j]);
    }
    console.log(result);
}

// longestCommonHistory(["3234.html"], ["3234.html", "sdhsfjdsh.html", "xys.html", "7hsaa.html"]);

/*
Question3
The people who buy ads on our network don't have enough data about how ads are working for
their business. They've asked us to find out which ads produce the most purchases on their website.

 Our client provided us with a list of user IDs of customers who bought something on a landing page
after clicking one of their ads:

 # Each user completed 1 purchase.
 completed_purchase_user_ids = [
   "3123122444","234111110", "8321125440", "99911063"]

 And our ops team provided us with some raw log data from our ad server showing every time a
user clicked on one of our ads:
 ad_clicks = [
  #"IP_Address,Time,Ad_Text",
  "122.121.0.1,2016-11-03 11:41:19,Buy wool coats for your pets",
  "96.3.199.11,2016-10-15 20:18:31,2017 Pet Mittens",
  "122.121.0.250,2016-11-01 06:13:13,The Best Hollywood Coats",
  "82.1.106.8,2016-11-12 23:05:14,Buy wool coats for your pets",
  "92.130.6.144,2017-01-01 03:18:55,Buy wool coats for your pets",
  "92.130.6.145,2017-01-01 03:18:55,2017 Pet Mittens",
]

The client also sent over the IP addresses of all their users.

all_user_ips = [
  #"User_ID,IP_Address",
   "2339985511,122.121.0.155",
  "234111110,122.121.0.1",
  "3123122444,92.130.6.145",
  "39471289472,2001:0db8:ac10:fe01:0000:0000:0000:0000",
  "8321125440,82.1.106.8",
  "99911063,92.130.6.144"
]

 Write a function to parse this data, determine how many times each ad was clicked,
then return the ad text, that ad's number of clicks, and how many of those ad clicks
were from users who made a purchase.


 Expected output:
 Bought Clicked Ad Text
 1 of 2  2017 Pet Mittens
 0 of 1  The Best Hollywood Coats
 3 of 3  Buy wool coats for your pets

用几个map来回倒腾就行。
 */

function checkoutMost(completed_purchase_user_ids, ad_clicks, all_user_ips) {
    let all_user = {};
    for (let user of all_user_ips) {
        let userArray = user.split(",");
        all_user[userArray[1]] = userArray[0];
    }

    let ad_map = {}
    for (let user of ad_clicks) {
        let userArray = user.split(",");
        if (ad_map[userArray[2]] !== undefined) {
            ad_map[userArray[2]].push(all_user[userArray[0]] !== undefined ? all_user[userArray[0]] : "-1");
        }
        else {
            ad_map[userArray[2]] = [all_user[userArray[0]] !== undefined ? all_user[userArray[0]] : "-1"];
        }
    }
    let purchase_userId = new Set(completed_purchase_user_ids);
    // console.log(all_user);
    // console.log(ad_map);
    // console.log(purchase_userId);

    // Calculated
    let finalResult = [];
    for (let [ad, userIdArray] of Object.entries(ad_map)) {
        let count = 0;
        for (let userId of userIdArray) {
            if (purchase_userId.has(userId)) {
                count += 1;
            }
        }
        finalResult.push(count + " of " + userIdArray.length + " " + ad);
    }
    console.log(finalResult);
}

let completed_purchase_user_ids = ["3123122444", "234111110", "8321125440", "99911063"]
let ad_clicks = [
    "122.121.0.1,2016-11-03 11:41:19,Buy wool coats for your pets",
    "96.3.199.11,2016-10-15 20:18:31,2017 Pet Mittens",
    "122.121.0.250,2016-11-01 06:13:13,The Best Hollywood Coats",
    "82.1.106.8,2016-11-12 23:05:14,Buy wool coats for your pets",
    "92.130.6.144,2017-01-01 03:18:55,Buy wool coats for your pets",
    "92.130.6.145,2017-01-01 03:18:55,2017 Pet Mittens",
];
let all_user_ips = [
    "2339985511,122.121.0.155",
    "234111110,122.121.0.1",
    "3123122444,92.130.6.145",
    "39471289472,2001:0db8:ac10:fe01:0000:0000:0000:0000",
    "8321125440,82.1.106.8",
    "99911063,92.130.6.144"
];

checkoutMost(completed_purchase_user_ids, ad_clicks, all_user_ips);

