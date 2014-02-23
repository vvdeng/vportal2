/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??Parameter.java					
 *			
 * Description??HQL???????????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql.ast;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.hql.antlr.SqlTokenTypes;

import antlr.collections.AST;

import com.paipai.verticalframework.core.util.CommonUtils;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Context;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Parameter;

/**
 * HQL???????????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class HqlCompileExecutor implements SqlTokenTypes {

	private final static Log LOG = LogFactory.getLog(HqlCompileExecutor.class);
	private final static Map NODE_TYPE_MAP = new HashMap();
	static {
		Field[] fields = SqlTokenTypes.class.getFields();
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			int modifiers = field.getModifiers();
			if (Modifier.isPublic(modifiers) && Modifier.isStatic(modifiers)
					&& Modifier.isFinal(modifiers)) {
				String name = field.getName();
				try {
					Object value = field.get(null);
					NODE_TYPE_MAP.put(value, name);
				}
				catch (IllegalAccessException ex) {
					LOG.error("Imposible", ex);
				}
			}
		}
	}

	protected Hql hql;
	protected List<Parameter> parameters;
	protected Context context;

	private AST root;

	public HqlCompileExecutor(AST root, Context context) {
		init(root, context);
	}

	protected HqlCompileExecutor() {

	}

	protected void init(AST root, Context context) {
		this.context = context;
		this.root = root;
		this.parameters = new ArrayList<Parameter>();
	}

	/**
	 * ????HQL???
	 * @return Hql
	 * @see ?ο???JavaDoc
	 */
	public Hql build() {
		if (this.hql == null) {
			String hql = buildHql();
			if (LOG.isDebugEnabled()) {
				LOG.debug("hql:" + hql);
				for (int i = 0; i < this.parameters.size(); i++) {
					LOG.debug("  parameter[" + i + "]:name=["
							+ this.parameters.get(i).getName() + "],value=["
							+ this.parameters.get(i).getValue() + "]");
				}
			}
			this.hql = new Hql(hql, this.parameters
					.toArray(new Parameter[this.parameters.size()]));
		}
		return this.hql;
	}

	protected String buildHql() {
		StringBuilder buffer = new StringBuilder();
		print(buffer, this.root);
		return buffer.toString();
	}

	protected void print(StringBuilder buffer, AST ast) {
		switch (ast.getType()) {
			case QUERY:
				printChildren(buffer, ast, " ");
				break;
			case RANGE:
				printRANGE(buffer, ast);
				break;
			case IDENT:
			case ALIAS:
			case ROW_STAR: // *
			case DISTINCT:
			case ALL:
			case NUM_INT:
			case NUM_DOUBLE:
			case NUM_FLOAT:
			case NUM_LONG:
				printText(buffer, ast);
				break;
			case INNER:
			case OUTER:
			case FULL:
			case LEFT:
			case RIGHT:
				printText(buffer, ast);
				buffer.append(" join");
				break;
			case JOIN:
				printJOIN(buffer, ast);
				break;
			case FROM:
				printSelfAndChildren(buffer, ast, " ");
				break;
			case SELECT:
				printSelfAndChildren(buffer, ast, ",");
				break;
			case SELECT_FROM:
				printSELECT_FROM(buffer, ast);
				break;
			case COUNT:
			case AGGREGATE:
				printFunction(buffer, ast);
				break;
			case DOT: // .
				printDOT(buffer, ast);
				break;
			case AND:
			case OR:
				printLinkWord(buffer, ast);
				break;
			case WHERE:
				printWhere(buffer, ast);
				break;
			case CONSTRUCTOR:
				printCONSTRUCTOR(buffer, ast);
				break;
			case LIKE:
			case NOT_LIKE:
			case EQ:
			case GT:
			case GE:
			case LT:
			case LE:
			case IN:
			case NOT_IN:
				printCondition(buffer, ast);
				break;
			case IS_NULL:
				printSingleCondition(buffer, ast, "is null");
				break;
			case IS_NOT_NULL:
				printSingleCondition(buffer, ast, "is not null");
				break;
			case BETWEEN:
			case NOT_BETWEEN:
				printBETWEEN(buffer, ast);
				break;
			case IN_LIST: // in
				printInList(buffer, ast);
				break;
			case COLON: // :
				printCOLON(buffer, ast);
				break;
			case ORDER:
				printORDER(buffer, ast);
				break;
			case GROUP:
				buffer.append("group by ");
				printChildren(buffer, ast, ",");
				break;
			case ASCENDING:
			case DESCENDING:
				printText(buffer, ast);
				break;
			case METHOD_CALL: //????巽??
				printMethodCall(buffer, ast);
				break;
			default:
				LOG.warn("Incognizance node, type["
						+ NODE_TYPE_MAP.get(ast.getType()) + "("
						+ ast.getType() + ")] text[" + ast.getText() + "]");
		}
	}
	
	protected void printMethodCall(StringBuilder buffer, AST ast) {
		AST method = ast.getFirstChild(); //??????
		AST exprList = method.getNextSibling(); //??????
		buffer.append(method.getText());
		buffer.append("(");
		printChildren(buffer, exprList, ",");
		buffer.append(")");
	}

	protected void printCONSTRUCTOR(StringBuilder buffer, AST ast) {
		buffer.append("new ");
		AST constructor = ast.getFirstChild();
		print(buffer, constructor);
		buffer.append('(');
		AST next = constructor.getNextSibling();
		while (next != null) {
			if (buffer.charAt(buffer.length() - 1) != '(') {
				buffer.append(',');
			}
			print(buffer, next);
			next = next.getNextSibling();
		}
		buffer.append(')');
	}

	protected void printORDER(StringBuilder buffer, AST ast) {
		buffer.append("order by ");
		AST child = ast.getFirstChild();
		AST next = null;
		while (child != null) {
			print(buffer, child);
			next = child.getNextSibling();
			if (next != null) {
				if (next.getType() == DESCENDING || next.getType() == ASCENDING) {
					buffer.append(" ");
				}
				else {
					buffer.append(",");
				}
			}
			child = next;
		}
	}

	protected void printRANGE(StringBuilder buffer, AST ast) {
		printChildren(buffer, ast, " ");

		AST next = ast.getNextSibling();
		if (next != null && next.getType() == RANGE) {
			buffer.append(",");
		}
	}

	protected void printInList(StringBuilder buffer, AST ast) {
		buffer.append("(");
		printChildren(buffer, ast, "");
		buffer.append(")");
	}

	protected void printWhere(StringBuilder buffer, AST ast) {
		// ???where???
		int length = buffer.length();
		AST child = ast.getFirstChild();

		print(buffer, child);

		if (buffer.length() > length) {
			buffer.insert(length, ast.getText() + " ");
		}
	}

	/*
	 * ???like???
	 */
	protected void printLinkWord(StringBuilder buffer, AST ast) {
		int sourceLength = buffer.length();
		AST left = ast.getFirstChild();
		AST right = left.getNextSibling();

		print(buffer, left);

		int middleLength = buffer.length();

		print(buffer, right);

		int allLength = buffer.length();

		// and/or??????(??
		if ((allLength > middleLength) && (middleLength > sourceLength)) {
			buffer.insert(sourceLength, "(");

			buffer.insert(middleLength + 1, " " + ast.getText() + " ");

			buffer.append(")");
		}
	}

	/*
	 * :
	 */
	protected void printCOLON(StringBuilder buffer, AST ast) {
		int length = buffer.length();
		printChildren(buffer, ast, "");
		String name = buffer.substring(length, buffer.length()).replace('_',
				'.');
		Object value = context.get(name);
		if (CommonUtils.isEmpty(value)) {
			throw new ValueNotExistException(name);
		}
		buffer.insert(length, ast.getText());
		this.parameters.add(new Parameter(name, value));
	}

	protected void printText(StringBuilder buffer, AST ast) {
		buffer.append(ast.getText());
	}

	/*
	 * ???????avg/count???1?7
	 */
	protected void printFunction(StringBuilder buffer, AST ast) {
		buffer.append(ast.getText());
		buffer.append("(");
		printChildren(buffer, ast, " ");
		buffer.append(")");
	}

	/*
	 * .
	 */
	protected void printDOT(StringBuilder buffer, AST ast) {
		AST left = ast.getFirstChild();
		print(buffer, left);

		buffer.append(ast.getText());

		AST right = left.getNextSibling();
		print(buffer, right);
	}

	/*
	 * ??????????? @param buffer ???? @param ast ast?? @param join l????1?7
	 */
	protected void printChildren(StringBuilder buffer, AST ast, String join) {
		AST child = ast.getFirstChild();
		while (child != null) {
			print(buffer, child);
			child = child.getNextSibling();
			if (child != null) {
				buffer.append(join);
			}
		}
	}

	/*
	 * @param buffer @param ast @param join @param selfJoin
	 */
	protected void printSelfAndChildren(StringBuilder buffer, AST ast,
			String join) {
		buffer.append(ast.getText());
		buffer.append(" ");
		printChildren(buffer, ast, join);
	}

	/*
	 * join
	 */
	protected void printJOIN(StringBuilder buffer, AST ast) {
		int length = buffer.length();
		printChildren(buffer, ast, " ");
		if (!buffer.substring(length, buffer.length()).contains(ast.getText())) {
			buffer.insert(length, "join ");
		}
	}

	protected void printSELECT_FROM(StringBuilder buffer, AST ast) {
		AST from = ast.getFirstChild();
		AST select = from.getNextSibling();
		if (select != null) {
			print(buffer, select);
			buffer.append(" ");
		}
		print(buffer, from);
	}

	protected void printBETWEEN(StringBuilder buffer, AST ast) {
		int length = buffer.length();
		AST property = ast.getFirstChild();
		AST first = property.getNextSibling();
		AST second = first.getNextSibling();
		try {
			print(buffer, property);
			buffer.append(" ");
			printText(buffer, ast);
			buffer.append(" ");
			print(buffer, first);
			buffer.append(" and ");
			print(buffer, second);
		}
		catch (ValueNotExistException e) {
			if (buffer.lastIndexOf(":") > length) {
				this.parameters.remove(this.parameters.size() - 1);
			}

			buffer.setLength(length);
		}
	}

	/*
	 * ????????????like
	 */
	protected void printCondition(StringBuilder buffer, AST ast) {
		int length = buffer.length();

		try {
			AST left = ast.getFirstChild();
			print(buffer, left);

			buffer.append(" ");
			buffer.append(ast.getText());
			buffer.append(" ");

			AST right = left.getNextSibling();
			print(buffer, right);
		}
		catch (ValueNotExistException e) {
			// ???????1?7
			buffer.setLength(length);
		}
	}

	/*
	 * ??????????????is null, is not null??
	 */
	private void printSingleCondition(StringBuilder buffer, AST ast,
			String condition) {
		AST left = ast.getFirstChild();
		print(buffer, left);

		buffer.append(" ");
		buffer.append(condition);
	}
}
