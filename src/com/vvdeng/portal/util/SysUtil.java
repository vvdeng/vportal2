package com.vvdeng.portal.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

public class SysUtil {
	static Pattern imgFilterPattern=Pattern.compile("<img.*/>",Pattern.CASE_INSENSITIVE);
	public static int genCode() {
		Random random = new Random();
		return (Math.abs(random.nextInt() % 10000));
	}

	public static byte[] genCodeImage(int verifyCode) {
		int width = 100, height = 40;
		byte[] result = null;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		String s = String.format("%04d", verifyCode);

		Font font = new Font("Serif", Font.BOLD, 30);

		BufferedImage bi = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		Graphics2D g2 = (Graphics2D) bi.getGraphics();
		g2.setFont(font);
		g2.setBackground(Color.WHITE);
		g2.clearRect(0, 0, width, height);
		g2.setPaint(Color.BLUE);

		FontRenderContext context = g2.getFontRenderContext();
		Rectangle2D bounds = font.getStringBounds(s, context);
		System.out.println("bounds width=" + bounds.getWidth() + " height="
				+ bounds.getHeight());
		double x = (width - bounds.getWidth()) / 2;
		double y = (height - bounds.getHeight()) / 2;
		double ascent = -bounds.getY();
		double baseY = y + ascent;

		g2.drawString(s, (int) x, (int) baseY);

		try {
			ImageIO.write(bi, "jpg", bos);
			result = bos.toByteArray();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				bos.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return result;

	}
	public static String filterImg(String origin){
		String result=null;
		Matcher matcher=imgFilterPattern.matcher(origin);
		result=matcher.replaceAll("");
		return result;
		
	}

}
