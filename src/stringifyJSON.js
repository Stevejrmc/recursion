// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var result = '';
  var isArr = obj => Array.isArray(obj);
  var makeString = function(value) {
    return typeof value === "string"? '"' + value + '"' : value.toString();
  };

  var handleObj = function(obj){

    // handle Array
    if (isArr(obj)) {
      result += '[';
      obj.forEach((v,i,ar) => {
        if (ar.length > 1 && i !== ar.length - 1) {
          handleObj(v);
          result += ','
        } else {
          handleObj(v);
        }
      });
      result += ']';
      return;
    }

    var objType = typeof obj;

    // handle Functions
    if (objType === 'function') {
      result += null;
      return;
    }
    // handle numbers
    if (objType === "number") {
      result += makeString(obj);
      return;
    }
    // handle bool
    if(objType === 'boolean') {
      result += makeString(obj);
      return;
    }
    // handle null && undefined
    if (!obj) {
      result += null;
      return;
    }
    // handle strings
    if (objType === 'string') {
      result += makeString(obj);
      return;
    }
    // handle Object literals
    if (objType === 'object' && !isArr(obj)) {
      result += "{";
      var count = Object.keys(obj).length;
      for (var prop in obj) {
        if (typeof obj[prop] === 'function' || obj[prop] === undefined) {
          result += "}";
          return;
        }
        if (count > 1) {
          handleObj(prop);
          result += ':';
          handleObj(obj[prop]);
          result += ',';
        } else {
          handleObj(prop);
          result += ':';
          handleObj(obj[prop]);
        }
        count--;
      }
      result += "}";
      return;
    }
  };

  handleObj(obj);


  return result;
};
