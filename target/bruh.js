// Transcrypt'ed from Python, 2020-08-19 15:44:04
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var alphabet = list ("abcdefghijklmnopqrstuvwxyz .'");
export var mapping = dict ({});
for (var [i, letter] of enumerate (alphabet)) {
	mapping [letter] = i;
}
export var encode = function (input_string) {
	var lowered = input_string.lower ();
	var listed = list (lowered);
	var toRet = [];
	for (var letter of listed) {
		toRet += letter_to_bruh (letter);
	}
	var final_string = ''.join (toRet);
	if (final_string.endswith (' ')) {
		var final_string = final_string.__getslice__ (0, -(1), 1);
		final_string += '!';
	}
	return final_string;
};
export var letter_to_bruh = function (letter) {
	if (!__in__ (letter, alphabet)) {
		return '';
	}
	var binary = (mapping [letter]).toString(2);
	var binary = '00000' + binary;
	var bits = binary.__getslice__ (-(5), null, 1);
	var needs_space = false;
	if (bits.startswith ('1')) {
		var needs_space = true;
	}
	var bits = bits.__getslice__ (-(4), null, 1);
	var toRet = [];
	for (var [letter, bit_value] of zip (['b', 'r', 'u', 'h'], bits)) {
		toRet += (bit_value == '1' ? letter.upper () : letter);
	}
	return ''.join (toRet) + (needs_space ? ' ' : '');
};
export var decode = function (input_string) {
	var bruh_list = [];
	var start_index = 0;
	while (start_index + 4 < len (input_string) - 1) {
		if (input_string [start_index + 4] == ' ') {
			bruh_list.append (input_string.__getslice__ (start_index, start_index + 5, 1));
			start_index += 5;
		}
		else {
			bruh_list.append (input_string.__getslice__ (start_index, start_index + 4, 1));
			start_index += 4;
		}
	}

	// print(bruh_list)
	print(input_string [input_string.length - 1]);

	if (len (bruh_list) <= 0) {
		if (input_string [input_string.length - 1] == "!") {
		print("FOUND")
			bruh_list.append(input_string.__getslice__ (-(5), -(1), 1) + ' ');
		}
		else {
			bruh_list.append(input_string.__getslice__ (-(4), null, 1));
		}
	}
	else if (input_string [input_string.length - 1] == "!") {
		print("FOUND")
		bruh_list.append(input_string.__getslice__ (-(5), -(1), 1) + ' ');
	}
	else {
		bruh_list.append(input_string.__getslice__ (-(4), null, 1));
	}

	// print(bruh_list)

	var toRet = [];
	for (var bruh of bruh_list) {
		toRet.append (bruh_to_letter (bruh));
	}

	// print(toRet)
	return ''.join (toRet);
};
export var bruh_to_letter = function (bruh) {
	var bruh_values = bruh.__getslice__ (0, 4, 1);
	// print(bruh_values)
	var bits = (function () {
		var __accu0__ = [];
		for (var letter of bruh_values) {
			__accu0__.append ((letter.isupper () ? '1' : '0'));
		}
		return __accu0__;
	}) ();

	var bits = (len (bruh) == 5 ? '1' : '0') + ''.join (bits);
	// print(bits)
	var index = parseInt(bits, 2);
	return (index < len (alphabet) ? alphabet [index] : '<OOV>');
};
export var encode_button = function () {
	var value = encode (document.getElementById ('encode').value);
	document.getElementById ('encode-p').innerHTML = value;
};
export var decode_button = function () {
	var value = decode (document.getElementById ('decode').value.trim());
	document.getElementById ('decode-p').innerHTML = value;
};
document.getElementById ('encode-button').addEventListener ('click', encode_button);
document.getElementById ('decode-button').addEventListener ('click', decode_button);

//# sourceMappingURL=bruh.map