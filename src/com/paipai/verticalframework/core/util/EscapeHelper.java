package com.paipai.verticalframework.core.util;

public class EscapeHelper {
    private static final String[] hex
	= { "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A",
	    "0B", "0C", "0D", "0E", "0F", "10", "11", "12", "13", "14", "15",
	    "16", "17", "18", "19", "1A", "1B", "1C", "1D", "1E", "1F", "20",
	    "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B",
	    "2C", "2D", "2E", "2F", "30", "31", "32", "33", "34", "35", "36",
	    "37", "38", "39", "3A", "3B", "3C", "3D", "3E", "3F", "40", "41",
	    "42", "43", "44", "45", "46", "47", "48", "49", "4A", "4B", "4C",
	    "4D", "4E", "4F", "50", "51", "52", "53", "54", "55", "56", "57",
	    "58", "59", "5A", "5B", "5C", "5D", "5E", "5F", "60", "61", "62",
	    "63", "64", "65", "66", "67", "68", "69", "6A", "6B", "6C", "6D",
	    "6E", "6F", "70", "71", "72", "73", "74", "75", "76", "77", "78",
	    "79", "7A", "7B", "7C", "7D", "7E", "7F", "80", "81", "82", "83",
	    "84", "85", "86", "87", "88", "89", "8A", "8B", "8C", "8D", "8E",
	    "8F", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99",
	    "9A", "9B", "9C", "9D", "9E", "9F", "A0", "A1", "A2", "A3", "A4",
	    "A5", "A6", "A7", "A8", "A9", "AA", "AB", "AC", "AD", "AE", "AF",
	    "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "BA",
	    "BB", "BC", "BD", "BE", "BF", "C0", "C1", "C2", "C3", "C4", "C5",
	    "C6", "C7", "C8", "C9", "CA", "CB", "CC", "CD", "CE", "CF", "D0",
	    "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "DA", "DB",
	    "DC", "DD", "DE", "DF", "E0", "E1", "E2", "E3", "E4", "E5", "E6",
	    "E7", "E8", "E9", "EA", "EB", "EC", "ED", "EE", "EF", "F0", "F1",
	    "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "FA", "FB", "FC",
	    "FD", "FE", "FF" };
    private static final byte[] val
	= { 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 0, 1, 2, 3,
	    4, 5, 6, 7, 8, 9, 63, 63, 63, 63, 63, 63, 63, 10, 11, 12, 13, 14,
	    15, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 10, 11, 12, 13, 14, 15, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
	    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63 };
    
    public static String escape(String string) {
	StringBuffer stringbuffer = new StringBuffer();
	int i = string.length();
	for (int i_0_ = 0; i_0_ < i; i_0_++) {
	    int i_1_ = string.charAt(i_0_);
	    if (65 <= i_1_ && i_1_ <= 90)
		stringbuffer.append((char) i_1_);
	    else if (97 <= i_1_ && i_1_ <= 122)
		stringbuffer.append((char) i_1_);
	    else if (48 <= i_1_ && i_1_ <= 57)
		stringbuffer.append((char) i_1_);
	    else if (i_1_ == 45 || i_1_ == 95 || i_1_ == 46 || i_1_ == 33
		     || i_1_ == 126 || i_1_ == 42 || i_1_ == 39 || i_1_ == 40
		     || i_1_ == 41)
		stringbuffer.append((char) i_1_);
	    else if (i_1_ <= 127) {
		stringbuffer.append('%');
		stringbuffer.append(hex[i_1_]);
	    } else {
		stringbuffer.append('%');
		stringbuffer.append('u');
		stringbuffer.append(hex[i_1_ >>> 8]);
		stringbuffer.append(hex[0xff & i_1_]);
	    }
	}
	return stringbuffer.toString();
    }
    
    public static String unescape(String string) {
	StringBuffer stringbuffer = new StringBuffer();
	int i = 0;
	for (int i_2_ = string.length(); i < i_2_; i++) {
	    char c = string.charAt(i);
	    if ('A' <= c && c <= 'Z')
		stringbuffer.append((char) c);
	    else if ('a' <= c && c <= 'z')
		stringbuffer.append((char) c);
	    else if ('0' <= c && c <= '9')
		stringbuffer.append((char) c);
	    else if (c == '-' || c == '_' || c == '.' || c == '!' || c == '~'
		     || c == '*' || c == '\'' || c == '(' || c == ')')
		stringbuffer.append((char) c);
	    else if (c == '%') {
		int i_3_ = 0;
		if ('u' != string.charAt(i + 1)) {
		    i_3_ = i_3_ << 4 | val[string.charAt(i + 1)];
		    i_3_ = i_3_ << 4 | val[string.charAt(i + 2)];
		    i += 2;
		} else {
		    i_3_ = i_3_ << 4 | val[string.charAt(i + 2)];
		    i_3_ = i_3_ << 4 | val[string.charAt(i + 3)];
		    i_3_ = i_3_ << 4 | val[string.charAt(i + 4)];
		    i_3_ = i_3_ << 4 | val[string.charAt(i + 5)];
		    i += 5;
		}
		stringbuffer.append((char) i_3_);
	    } else
		stringbuffer.append((char) c);
	}
	return stringbuffer.toString();
    }
}
