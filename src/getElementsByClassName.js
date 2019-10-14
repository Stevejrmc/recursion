// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var result = [];
  var root = document.body;

  var findClass = function (node) {
    if (node.classList) {
      if (node.classList.contains(className)) {
        result.push(node);
      }
    }
    if (node.childNodes) {
      node.childNodes.forEach(n => {
        findClass(n);
      });
    }
  };

  findClass(root);
  return result;
};
