class Node {
    constructor(left, right, frequency) {
      this.left = left;
      this.right = right;
      this.frequency = frequency;
    }
  }
  
  class Letter {
    constructor(letter, frequency) {
      this.letter = letter;
      this.frequency = frequency;
    }
  }
  
  function createHuffmanTree (LoL) { // List of Letter
    var list = [];
  
    for (var e of LoL) {
      list.push(e)
    }
  
    list.sort((a, b) => a.frequency - b.frequency)
  
    while (list.length > 1) {
      var left = list[0];
      var right = list[1];
      
      var node = new Node(left, right, left.frequency + right.frequency);
  
      list.shift()
      list.shift()
  
      var added = false;
  
      for (var i = 0; i < list.length; i++) {
        if (node.frequency < list[i].frequency) {
          list.splice(i, 0, node);
          added = true;
          break;
        }
      }
  
      if (!added) {
        list.push(node)
      }
  
      if (list.length <= 0) {
        list.push(node);
        return (node);
      }
    }
  
    return (list[0]);
  }
  
  function generateCodes (tree) { // returns an object
    var toRet = {};
    generateCodesHelper(tree, "", toRet);
    return toRet;
  }
  
  function generateCodesHelper (node, path, collector) {
    if (node instanceof Letter) {
      collector[node.letter] = path;
    } else {
      generateCodesHelper(node.left, path + "0", collector);
      generateCodesHelper(node.right, path + "1", collector);
    }
  }
  
  var tree = createHuffmanTree([
    new Letter(" ", 12),
    new Letter(".", 2),
    new Letter("e", 12.02),
    new Letter("t", 9.10),
    new Letter("a", 8.12),
    new Letter("o", 7.68),
    new Letter("i", 7.31),
    new Letter("n", 6.95),
    new Letter("s", 6.28),
    new Letter("r", 6.02),
    new Letter("h", 5.92),
    new Letter("d", 4.32),
    new Letter("l", 3.98),
    new Letter("u", 2.88),
    new Letter("c", 2.71),
    new Letter("m", 2.61),
    new Letter("f", 2.30),
    new Letter("y", 2.11),
    new Letter("w", 2.09),
    new Letter("g", 2.03),
    new Letter("p", 1.82),
    new Letter("b", 1.49),
    new Letter("v", 1.11),
    new Letter("k", 0.69),
    new Letter("x", 0.17),
    new Letter("q", 0.11),
    new Letter("j", 0.10),
    new Letter("z", 0.07),
    new Letter("EOF", 10),])
//   ].map((l) => new Letter(l.letter, Math.pow(l.frequency, 2))))
  
  var smallTree = createHuffmanTree([
    new Letter("a", 5),
    new Letter("b", 9),
    new Letter("c", 12),
    new Letter("d", 13),
    new Letter("e", 16),
    new Letter("f", 45),
  ])
  
  var codes = generateCodes(tree)
  
  console.log(codes)
  console.log("bpc: " + averageBitsPerCharacter(codes))

  //console.log(smallTree)
  //console.log(generateCodes(smallTree))
  
//   console.log(tree)
  
  function encode(str, codes) {
    var myStr = str.toLowerCase();
    toRet = "";
    
    for (var i = 0; i < myStr.length; i++) {
      var code = codes[myStr[i]]
      toRet += code != undefined ? code : ""
    }
  
    return toRet;
  }
  
  function decode(binSeq, tree) {
    var toRet = "";
    var index = 0;
    var currentNode = tree;
  
    while (index <= binSeq.length) {
      if (currentNode instanceof Letter) {
        if (currentNode.letter == "EOF") {
          return toRet;
        }
  
        toRet += currentNode.letter;
        currentNode = tree;
      } else {
        if (binSeq[index] == "0") {
          currentNode = currentNode.left;
          index++;
        } else {
          currentNode = currentNode.right;
          index++;
        }
      }
    }
  
    return toRet
  }
  
  function hideText(plaintext, maskingText) {
    var text = maskingText.toLowerCase();
    var maskIndex = 0;
    var toRet = "";
  
    var encoded = encode(plaintext, codes) + codes["EOF"];

    var textLength = text.replace(/[^a-zA-Z]/g, "").length;
  
    if (encoded.length > textLength){
      return "Masking string too short. You need " + (encoded.length - textLength) + " more letters."
    }
  
    for (var i = 0; i < encoded.length; i++) {
      while (!/[A-Za-z]/.test(text[maskIndex])) {
        toRet += text[maskIndex];
        maskIndex++;
      }
  
      if (encoded[i] == "1") {
        //console.log(text[maskIndex])
        //text[maskIndex] = text[maskIndex].toUpperCase()
        toRet += text[maskIndex].toUpperCase();
      } else {
        toRet += text[maskIndex].toLowerCase();
        //text[maskIndex] = text[maskIndex].toLowerCase()
      }
  
      maskIndex++;
    }

    for (var i = maskIndex; i < text.length; i++) {
        if (Math.random() > 0.5) {
            toRet += text[i].toUpperCase();
        } else {
            toRet += text[i];
        }
    }
  
    return toRet;
  }
  
  function hideTextRepeating (plaintext, toRepeat) {
    length = (encode(plaintext, codes) + codes['EOF']).length;
  
    times = Math.ceil(length / toRepeat.replace(/[^a-zA-Z]/g, "").length)
  
    return hideText(plaintext, toRepeat.repeat(times))
  }
  
  function revealText(maskedText) {
    stripped = maskedText.replace(/[^a-zA-Z]/g, "")
  
    bits = stripped.split("").map((c) => c == c.toUpperCase() ? "1" : "0").join("")
  
    return decode(bits, tree)
  }
  
  function bitLength(str) {
    var encoded = encode(str, codes) + codes["EOF"];
    console.log(`Original length: ${str.length}, Bits required: ${encoded.length}. Roughly ${encoded.length / str.length} bits per character.`)
    console.log(str);
    console.log(encoded);
    console.log(decode(encoded, tree))
  }
  
function averageBitsPerCharacter (codes) {
    sum = 0;
    size = 0;

    for (var character in codes) {
        sum += codes[character];
        size++;
    }

    return sum / size;
}

window.onload = (event) => {
    document.getElementById("hide-button").addEventListener("click", () => {
        if (document.getElementById("repeating").checked) {
            document.getElementById("hide-p").innerHTML = hideTextRepeating(document.getElementById("hide-plain").value, document.getElementById("hide-mask").value)
        } else {
            document.getElementById("hide-p").innerHTML = hideText(document.getElementById("hide-plain").value, document.getElementById("hide-mask").value)
        }
    })

    document.getElementById("hidden-button").addEventListener("click", () => {
        document.getElementById("hidden-p").innerHTML = revealText(document.getElementById("hidden-mask").value)
    })
}
