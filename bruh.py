alphabet = list("abcdefghijklmnopqrstuvwxyz .'")
mapping = {}

for i, letter in enumerate(alphabet):
  mapping[letter] = i

def encode (input_string):
  lowered = input_string.lower()
  listed = list(lowered)
  toRet = []

  for letter in listed:
    toRet += letter_to_bruh(letter)

  final_string = "".join(toRet)

  if final_string.endswith(" "):
    final_string = final_string[:-1]
    final_string += "!"

  return final_string

def letter_to_bruh(letter):
  if (letter not in alphabet):
    return ""

  binary = bin(mapping[letter]).replace("0b", "")
  binary = "00000" + binary # pad it, it will need 4 zeroes at most
  bits = binary[-5:] # use only 5 bits
  print(bits)
  needs_space = False

  if bits.startswith("1"):
    needs_space = True
  
  bits = bits[-4:]

  toRet = []

  for letter, bit_value in zip(["b", "r", "u", "h"], bits):
    toRet += letter.upper() if bit_value == "1" else letter

  return "".join(toRet) + (" " if needs_space else "")

def decode (input_string):
  bruh_list = []
  start_index = 0

  while start_index + 4 < len(input_string) - 1:
    if input_string[start_index + 4] == " ":
      bruh_list.append(input_string[start_index: start_index + 5])
      start_index += 5
    else:
      bruh_list.append(input_string[start_index:start_index + 4])
      start_index += 4

  if (len(bruh_list) <= 0):
    if input_string[-1] == "!":
      bruh_list += [input_string[-5:-1] + " "]
    else:
      bruh_list += [input_string[-4:]]
  else:
    if input_string[-1] == "!":
      bruh_list += [input_string[-5:-1] + " "]
    else:
      bruh_list += [input_string[-4:]]

  toRet = []

  for bruh in bruh_list:
    toRet.append(bruh_to_letter(bruh))

  return "".join(toRet)

def bruh_to_letter(bruh):
  bruh_values = bruh[:4]
  bits = ["1" if letter.isupper() else "0" for letter in bruh_values]

  bits = ("1" if len(bruh) == 5 else "0") + "".join(bits)

  index = int(bits, 2)

  return alphabet[index] if index < len(alphabet) else "<OOV>"

def encode_button ():
    value = encode(document.getElementById("encode").value)
    document.getElementById("encode-p").innerHTML = value

def decode_button ():
    value = decode(document.getElementById("decode").value)
    document.getElementById("decode-p").innerHTML = value

document.getElementById("encode-button").addEventListener("click", encode_button)
document.getElementById("decode-button").addEventListener("click", decode_button)