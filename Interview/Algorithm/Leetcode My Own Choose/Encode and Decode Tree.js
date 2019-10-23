function serialize(root) {
    if (!root) return "";
    let queue = [];
    let string = root.val + " ";
    queue.push(root);
    while (queue.length) {
        let node = queue.shift();
        if (!node.left) string += "null ";
        else {
            queue.push(node.left);
            string += node.left.val + " "
        }

        if (!node.right) string += "null ";
        else {
            queue.push(node.right);
            string += node.right.val + " ";
        }
    }
    return string;
}

function deserialize(string) {
    if (!string.length) return null;
    let stringArray = string.split(" ");
    let root = new TreeNode(stringArray[0]);
    let queue = [root];
    let i = 1;
    while (queue.length) {
        let node = queue.shift();
        if (stringArray[i] === "null") node.left = null;
        else {
            node.left = new TreeNode(parseInt(stringArray[i]));
            queue.push(x.left);
        }
        i++;
        if (stringArray[i] === "null") node.right = null;
        else {
            node.right = new TreeNode(parseInt(stringArray[i]));
            queue.push(node.right);
        }
        i++;
    }
    return root;
}