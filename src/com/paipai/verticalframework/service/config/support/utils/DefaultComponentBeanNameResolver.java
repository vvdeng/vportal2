package com.paipai.verticalframework.service.config.support.utils;

import com.paipai.verticalframework.service.config.support.metadata.IAnnotationMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;

/**
 * @author raywu
 */
public class DefaultComponentBeanNameResolver implements IBeanNameResolver {

	private final static String DEFAULT_END = "Impl";
	private String annotationClass;

	public DefaultComponentBeanNameResolver(String annotationClass) {
		this.annotationClass = annotationClass;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.utils.IBeanNameResolver#resolve(com.paipai.logicframework.config.support.metadata.IClassMetadata)
	 */
	public String resolve(IClassMetadata metadata) {
		IAnnotationMetadata annotationMetadata = metadata
				.getAnnotationMetadata(this.annotationClass);

		// ???Annotation??name??????????????????
		String beanName = (String) annotationMetadata.getAttribute("name");

		if (beanName != null && beanName.trim().length() > 0) {
			return beanName.trim();
		}

		// ?????????????Сд?????BeanName
		beanName = metadata.getClassNameForShort();
		beanName = beanName.substring(0, 1).toLowerCase()
				+ beanName.substring(1, beanName.length());

		if (beanName.endsWith(DEFAULT_END)) {
			beanName = beanName.substring(0, beanName.length()
					- DEFAULT_END.length());
		}

		return beanName;
	}

}
