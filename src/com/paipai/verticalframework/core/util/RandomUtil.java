/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??RandomUtil.java
 * 
 * Description?????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-29			????
 */
package com.paipai.verticalframework.core.util;

import java.util.Random;

/**
 * ???????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class RandomUtil {

	public final static char[] NUMBERS_AND_LETTERS = ("0123456789abcdefghijklmnopqrstuvwxyz"
			+ "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").toCharArray();

	public static synchronized String random(int length) {
		char[] randoms = new char[length];
		Random random = new Random(System.nanoTime());
		for (int i=0; i<length; i++)
		{
			int index = random.nextInt();
			if (index < 0)
			{
				index = -index;
			}
			randoms[i] = NUMBERS_AND_LETTERS[index % NUMBERS_AND_LETTERS.length];
		}
		return new String(randoms);
	}
}
