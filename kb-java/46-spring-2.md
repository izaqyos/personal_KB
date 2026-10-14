---
type: reference
title: spring
description: Section 1 of the legacy java-kb notes.
tags: [kb-java]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#1"
---

# spring

[↑ java-kb](/kb-java/README.md)

## 1.1 tutorial

### 1.1.1 IDE, intellij

### 1.1.2 Key concepts / files

#### 1.1.2.1 dependency Injection

```text
decouples the dependencies between classes so that spring Framework would be responsibile for constructing required java classes (beans)
```

#### 1.1.2.2 Spring configuration file, usually spring.xml

```text
ex:


<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd"
       default-init-method="myInit" default-destroy-method="myDestroy">
    <!-- define the default init/destroy methods for all beans. if they are implemented they will be called -->

    <!-- note that by defaults all beans have singelton scope. meaning appCtxt.getBean()
    will return reference to same singelton instance (that was created when app context is created)
    another scope is 'prototype', in which case getBean() will create and return a new instance every time it is called
    (lazy initialization)
    There also web scopes. Request (new bean per HTTP req) / Session (new bean per HTTP session) / Global session (new bean per global session)
    singelton is the default


    -->
    <bean id="demoRootBean"  class="com.example.springbootdemo.DemoBean"  > <!-- demonstrate bean inheritance -->
        <property name="id" value="999" /> <!-- invoke setter -->
    </bean>
    <bean id="demoBean" class="com.example.springbootdemo.DemoBean" scope="prototype">
        <property name="id" value="999" /> <!-- invoke setter -->
        <constructor-arg value="A_Bean" /> <!-- provide CTOR w/ 1st args vals -->
        <constructor-arg type="int" value="10" /> <!-- provide CTOR w/ 2nd arg. use type to specify type -->
        <constructor-arg index="2" value=", that demonstrate spring beans creation" /> <!-- provide CTOR w/ 3rd arg.
        use index to specify index in argument list -->
    </bean>
    <bean id="demoChildBean" class="com.example.springbootdemo.DemoBean" parent="demoRootBean">
        <constructor-arg value="A_Bean" /> <!-- provide CTOR w/ 1st args vals -->
        <constructor-arg type="int" value="10" /> <!-- provide CTOR w/ 2nd arg. use type to specify type -->
        <constructor-arg index="2" value=", that demonstrate spring beans creation" /> <!-- provide CTOR w/ 3rd arg.
        use index to specify index in argument list -->
    </bean>
    <bean id="triangle" class="com.example.springbootdemo.Triangle" name="triangle3" init-method="myInit" destroy-method="myDestroy"> <!-- call CTOR w/ references to Point instance beans
    that are defined below
    also note name serves as another alias
    register init method -->
         <property name="point1" ref="point1Ref" /> <!--ref can refer to an id a name or an alias -->
        <property name="point2" >
            <bean class="com.example.springbootdemo.Point" >
                <property name="x" value="-20"/>
                <property name="y" value="0"/>
            </bean>
        </property>
        <property name="point3" ref="point3Ref" />
    </bean>

    <!-- demonstrate inheritence of container members. and the merge flag for adding to parent list
    rather than overwriting the list
    -->
    <bean id="pointsListParent" class="com.example.springbootdemo.Points" abstract="true"> <!-- abstract means
    that this only serves as base definition but can't be instantiated
    -->
        <property name="points">
            <list>
                <ref bean="point1Ref"/>
            </list>
        </property>
    </bean>
    <bean id="pointsListChild" class="com.example.springbootdemo.Points" parent="pointsListParent">
        <property name="points">
            <list merge="true">
                <ref bean="point2Ref"/>
                <ref bean="point3Ref"/>
            </list>
        </property>
    </bean>


    <bean id="pointsList" class="com.example.springbootdemo.Points">
        <!-- when commented out the @Required will have RequiredAnnotationBeanPostProcessor throw exception
       Caused by: org.springframework.beans.factory.BeanInitializationException: Property 'points' is required for bean 'pointsList'
        <property name="points">
            <list>
                <ref bean="point1Ref"/>
                <ref bean="point2Ref"/>
                <ref bean="point3Ref"/>
            </list>
        </property>
        -->
        <property name="points">
            <list>
                <ref bean="point1Ref"/>
                <ref bean="point2Ref"/>
                <ref bean="point3Ref"/>
            </list>
        </property>
    </bean>

    <alias name="triangle" alias="triangle2" /> <!-- alias to a bean (like a reference) -->

    <bean id="point1Ref" class="com.example.springbootdemo.Point" > <!-- external bean, can be used by any bean-->
        <property name="x" value="0"/>
        <property name="y" value="0"/>
    </bean>
    <bean id="point2Ref" class="com.example.springbootdemo.Point" >
        <property name="x" value="-20"/>
        <property name="y" value="0"/>
    </bean>
    <bean id="point3Ref" class="com.example.springbootdemo.Point" >
        <property name="x" value="+20"/>
        <property name="y" value="0"/>
    </bean>

    <!-- demonstrate auto-wiring. inject the dependencies when bean names match member variable names -->
    <bean id="triangle4" class="com.example.springbootdemo.Triangle" autowire="byName"> <!-- call CTOR w/ references to Point instance beans
    that are autotmatically populated so long as spring finds beans names that match class Triangle members
    it also possible to set autoWire "byType" which will inject a ref so long as there's one member of that type
    that matches one bean definition of matchine type
    Another option is "constructor" which is similar to byType w/ the difference that spring would try to match
    to a CTOR by type (so multiple beans of same type will not work)
    -->
    </bean>

    <bean id="point1" class="com.example.springbootdemo.Point" > <!-- external bean, can be used by any bean-->
        <property name="x" value="1"/>
        <property name="y" value="2"/>
    </bean>
    <bean id="point2" class="com.example.springbootdemo.Point" >
        <property name="x" value="3"/>
        <property name="y" value="4"/>
    </bean>
    <bean id="point3" class="com.example.springbootdemo.Point" >
        <property name="x" value="5"/>
        <property name="y" value="6"/>
    </bean>
    <bean id="point4" class="com.example.springbootdemo.Point" >
        <!-- placeholder for populating values taken from properties file -->
        <property name="x" value="${point4.x_cfg}"/>
        <property name="y" value="${point4.y_cfg}"/>
    </bean>
    <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer" >
        <property name="locations" value="application.properties" />
    </bean>
    <!-- this is a special
    BeanFactoryPostProcessor that reads from properties file and populates the placeholders w/ values
    -->

    <!-- demonstrate auto-wiring. inject the dependencies when bean names match member variable names -->


    <bean class="com.example.springbootdemo.DisplayNameBeanPostProcessor" /> <!-- spring will create an instance
    of this class so that it can function a post processor
    -->
    <bean class="com.example.springbootdemo.DemoBeanFactoryPostProcessor" />

    <!-- note that its possible to add all annotations post processors beans by adding line
    <context:annotation-config />
    -->
    <context:annotation-config />

    <!-- with <context:annotation-config /> there's no need to manually add each annotation post processor -->
    <!-- <bean class="org.springframework.beans.factory.annotation.RequiredAnnotationBeanPostProcessor" /> --> <!-- check for
    required annotations -->
    <!-- <bean class="org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor" /> --> <!-- wire values to
    setters marked w/ @Autowire
    -->
    <!-- note that @Autowire annotation is by type => so long as there's one bean of this type
    in the spring config it will be wired correctly!
    -->


    <!-- <bean id="msgFormatter" class="com.example.springbootdemo.msgFormatter"/>  --> <!-- match by name -->
    <bean id="msgFormatter" class="com.example.springbootdemo.msgFormatter">  <!-- match by qualifier -->
        <qualifier value="PointsRelated" />
    </bean>
    <!-- note that in case of multiple
    beans w/ same type an dependancy injection failed exception is thrown. ex:
   Caused by: org.springframework.beans.factory.NoUniqueBeanDefinitionException: No qualifying bean of type 'com.example.springbootdemo.msgFormatter' available: expected single matching bean but found 2: msgFmt,msgFmt1
   So, the injection algorithm for @Autowire annotation starts by injecting when single match to type exists
   otherwise it will try to match by member name if possible.
   Another way to tie the dependancy is by using a qualifier.
    -->
    <bean id="msgFmt1" class="com.example.springbootdemo.msgFormatter"/>

    <!-- demonstrating coding to interface technique in spring -->
    <bean id="horsi" class="com.example.springbootdemo.horse" >
       <property name="sound" value="${horse.sound}" />
    </bean>
    <bean id="bell" class="com.example.springbootdemo.dog" >
        <property name="sound" value="${dog.sound}" />
    </bean>
    <!-- demonstrating coding to interface technique in spring -->

    <!-- tell spring to scan for @Component annotated classes so that they would be
        loaded as beans
        Unfortunately I get an exception Caused by: javax.management.InstanceAlreadyExistsException: org.springframework.boot:type=Admin,name=SpringApplication
        so for now skip
        -->
<!--     <context:component-scan base-package="com.example.springbootdemo" /> -->

    <!-- support for i8n via class="org.springframework.context.support.ResourceBundleMessageSource"
    The ResourceBundleMessageSource will load a properties file that contains the messages
    -->
    <bean id="messageSource" class="org.springframework.context.support.ResourceBundleMessageSource"  >

        <property name="basenames">
           <list>
               <value> messages</value>

           </list>
        </property>
    </bean>

    <!-- register event listener bean -->
    <bean id="GeneralEvtListener" class="com.example.springbootdemo.GeneralEvtListener" >

    </bean>
</beans>
```

#### 1.1.2.3 main application

#### 1.1.2.3.1 example of BeanFactory, ApplicationContext, AbstractApplicationContext, getting beans and wiring to HTTP requests

```text
package com.example.springbootdemo;

import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SpringbootDemoApplication {

    public static void main(String[] args) {

        //BeanFactory bFactory = new XmlBeanFactory( new FileSystemResource("src/main/resources/spring.xml"));
        // Note that even though there is no BeanFactory still the DemoBeanFactoryPostProcessor get called.
        //The reason is that an ApplicationContext is also a BeanFactory
        ApplicationContext  appCtxt  = new ClassPathXmlApplicationContext( "spring.xml");
        //DemoBean dBean = (DemoBean) bFactory.getBean("demoBean");
        DemoBean dBean = (DemoBean) appCtxt.getBean("demoBean");
        System.out.println(dBean.toString());

        SpringApplication.run(SpringbootDemoApplication.class, args);
        System.out.println( appCtxt.getMessage("msg1", null, "msg1 not found", null) );


    }

    @RequestMapping("hello")
    public String sayHello()
    {
        //Note that ApplicationContext is autoclosed when deployed as webapp. For desktop
        // app or when explicit shutdown handling is required use AbstractApplicationContext
        //ApplicationContext  appCtxt  = new ClassPathXmlApplicationContext( "spring.xml");
        AbstractApplicationContext appCtxt  = new ClassPathXmlApplicationContext( "spring.xml");
        appCtxt.registerShutdownHook();
        //DemoBean dBean = (DemoBean) bFactory.getBean("demoBean");
        DemoBean dBean = (DemoBean) appCtxt.getBean("demoBean");
        DemoBean dcBean = (DemoBean) appCtxt.getBean("demoChildBean");

        //Triangle triangle = (Triangle) appCtxt.getBean("triangle"); //note that all triangle dependecies (points)
        // will be initialized by spring according to spring.xml config
        Triangle triangle = (Triangle) appCtxt.getBean("triangle2"); //note that we are using an alias to triangle
        Triangle triangle4 = (Triangle) appCtxt.getBean("triangle4"); //get an auto-wired bean
        triangle.publishDemoEvent();

        Points pointsList = (Points) appCtxt.getBean("pointsList");
        Points pointsListChild = (Points) appCtxt.getBean("pointsListChild");

        //coding dependendant on implementation. not advisable!
        //horse horsi = (horse) appCtxt.getBean("horsi");
        //dog bell = (dog) appCtxt.getBean("bell");
        //coding to implementation. advisable!
        animal horsi = (animal) appCtxt.getBean("horsi");
        horse realHorse = (horse) horsi ;
        animal bell = (animal) appCtxt.getBean("bell");
        //animal mitzi = (animal) appCtxt.getBean("cat");
        //cat derivedMitzi = (cat) mitzi ;

        return  String.format("<p>Hello Spring Boot App%nDemo Bean: %s</p>%n<p>Spring Inheriting Bean= %s</p>%n" +
                        "<p>Manually defined Triangle: %s</p>%nAut0-wired Triangle: %s</p>%n" +
                        "<p>Points: %s%n Points  %s</p>%n" +
                        "<p>Points Child Bean=%s</p>%n" +
                        "<p>Animal %s . message %s</p>%n" + //horse
                        //"<p>Animal %s . message %s</p>%n" + //cat
                        "<p>Animal %s </p>%n", //dog
                dBean.toString(), dcBean.toString(),
                triangle.toString(),
                triangle4.toString(),
                pointsList.toString(),
                pointsList.getMsgFormatter().formatMsg("formated message"),
                pointsListChild.toString(),
                horsi.Classification(),
                realHorse.getMsgFormatter().formatMsg("I'm derived class, the msg formatter was injected using java @Resource annotation"),
                //mitzi.Classification(),
                //derivedMitzi.getMsgFormatter().formatMsg("I'm an annotated bean"),
                bell.Classification()
        );


    }
}


                1.1.2.3.2
```

#### 1.1.2.4 beans

#### 1.1.2.4.1 example, simple bean

```text
package com.example.springbootdemo;

public class DemoBean {


    //private static int id = 0;

    private int id;
    private  String name;
    private  String message;

    public  int getId()
    {
        return  id;
    }

    public  void  setId(int id)
    {
        this.id = id;
    }

    public DemoBean()
    {
        this.name = "uninitialized";
        this.id = -1;
        this.message="uninitialized bean";
    }
    public  DemoBean(String name)
    {
        //id++;
        //m_id = id;
        this.name = name;
        System.out.printf("Created DemoBean [%s] instance [%d]%n", name, id);
    }

    public  DemoBean(String name, int id)
    {
        this.name = name;
        this.id = id;
    }

    public  DemoBean(String name, int id, String message)
    {
        this.name = name;
        this.id = id;
        this.message = message;
    }


    public String toString(){

        return  String.format("I am DemoBean [%s], instance [%d]%nMy message is %s", name, id, message);
    }
}


                1.1.2.4.2 Bean that is ApplicationContext and name aware , also has init and cleanup callbacks
package com.example.springbootdemo;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanNameAware;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
//import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;

//yosi.izaq. demo of using spring dependancy injection.
//Triangle will not init (new) Points.
// Neither will main init Triangle/Points
//Spring will take care of init
public class Triangle implements ApplicationEventPublisherAware, ApplicationContextAware, BeanNameAware { //this bean is now aware of spring app context

    private Point point1;
    private ApplicationContext appCtxt;
    private String beanName;

    public Point getPoint1() {
        return point1;
    }

    public void setPoint1(Point point1) {
        this.point1 = point1;
    }

    public Point getPoint2() {
        return point2;
    }

    public void setPoint2(Point point2) {
        this.point2 = point2;
    }

    public Point getPoint3() {
        return point3;
    }

    public void setPoint3(Point point3) {
        this.point3 = point3;
    }

    private Point point2;
    private Point point3;

    public Point getPoint4() {
        return point4;
    }

    public void setPoint4(Point point4) {
        this.point4 = point4;
    }

    private Point point4; //just for demo of place holders

    @Override
    public String toString() {
        return "Triangle{" +
                "point1=" + point1 +
                ", point2=" + point2 +
                ", point3=" + point3 +
                ", point4=" + point4 +
                ", beanName=" + beanName +
                '}';
    }


    public void publishDemoEvent()
    {
        //publish a toString method called event
        ToStringEvt toStringEvt = new ToStringEvt(this);
        appEvtPub.publishEvent(toStringEvt);
    }

    @Override
    public  void setApplicationContext(ApplicationContext ctxt)
            throws BeansException
    {
        appCtxt = ctxt;
    }

    @Override
public void setBeanName(String name)
    {
        beanName = name;

    }

    public  void  myInit(){
        System.out.printf("My manual init method, registerd to be called for bean initialization in spring.xml%n" );
    }

    public  void myDestroy(){
        System.out.printf("My manual cleanyp method, registerd to be called for bean destruction in spring.xml%n" );
    }

    private ApplicationEventPublisher appEvtPub;

    //Note that actually spring passes the ApplicationContext (which implements the publisher
    // interface). The consumer class uses the interface and the concrete class
    //This complies w/ Spring concept of coding to interface (thus reducing concrete dependencies)
    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        appEvtPub = applicationEventPublisher;

    }
}
```

#### 1.1.2.4.3 Bean that is InitializingBean and DisposableBean, also contains a container member field

```text
package com.example.springbootdemo;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.context.MessageSource;

import java.util.List;
import java.util.Locale;

public class Points implements InitializingBean, DisposableBean { //InitializingBean interface allow to register bean init callback
    //so afterPropertiesSet will be called upon bean init
    // DisposableBean is for bean destruction
    public List<Point> getPoints() {
        return points;
    }

    @Required //instruct spring to validate that setPoints is called, otherwise BeanPostProcessor will throw an exception
    // org.springframework.beans.factory.annotation.RequiredAnnotationBeanPostProcessor must be registered
    //in spring config file as it is actually doing the check
    public void setPoints(List<Point> points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return this.msgSrc.getMessage("pointsMsg1", null, "Points I8N intro message not found!", null)+
                //this.msgSrc.getMessage("pointsMsg2", new  Object[]  {points} ,"Points I8N intro message not found!", null ) +
                this.msgSrc.getMessage("pointsMsg2", points.toArray(new Object[0]),"Points I8N intro message not found!", Locale.GERMANY ) +
                "I8N msg: "+ this.msgSrc.getMessage("msg1", null, "I8N message not found!", null)+
                '}';
    }

    @Override
    public void afterPropertiesSet() throws Exception {

        System.out.printf("Bean Points init callback was called%n");
    }

    @Override
    public void destroy() throws Exception {
        System.out.printf("Bean Points shutdown callback was called%n");
    }

    private List<Point> points;



    public com.example.springbootdemo.msgFormatter getMsgFormatter() {
        return msgFormatter;
    }

    @Autowired
    @Qualifier("PointsRelated") //inject the bean that has this qualifier. only required when @Autowired
   // can't match by type (multiple defined) or name (none exists)
    public void setMsgFormatter(com.example.springbootdemo.msgFormatter msgFormatter) {
        this.msgFormatter = msgFormatter;
    }

    private msgFormatter msgFormatter; //just to demo @AutoWired...

    public MessageSource getMsgSrc() {
        return msgSrc;
    }

    public void setMsgSrc(MessageSource msgSrc) {
        this.msgSrc = msgSrc;
    }

    @Autowired
    private MessageSource msgSrc;
}
```

#### 1.1.2.4.4 BeanPostProcessor

```text
package com.example.springbootdemo;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

/**
 *
implement a post process method before and after every
bean initialization
need to be registered in spring.xml
 */
public class DisplayNameBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.printf("postProcessBeforeInitialization(Object() called for bean %s%n ", beanName);
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.printf("postProcessAfterInitialization(Object() called for bean %s%n ", beanName) ;
        return bean;
    }
}

package com.example.springbootdemo;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;

public class DemoBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
        System.out.printf("DemoBeanFactoryPostProcessor:postProcessBeanFactory() was called%n ");
    }
}
```

#### 1.1.2.4.5 code to interface example

#### 1.1.2.4.5.1 animal interface

```text
package com.example.springbootdemo;

/*
This interface is meant for demonstrating coding to interface technique in spring
 */
public interface animal {
    public String Classification() ; //what kind of animal are you
}
```

#### 1.1.2.4.5.2 animals: cat, dog, horse

```text
package com.example.springbootdemo;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

//Component annotation tells spring to treat this class as a bean
// its equivalent to <bean></bean> clause
//however , when using this annotation, its not possible to have multiple instances of a bean of same class
@Component //bean
//MVC beans annotations
//@Service // BL (view) bean
//@Repository //data (model) bean
//@Controller //controller bean
public class cat implements animal{

    private static String classification="felis catus";

    public com.example.springbootdemo.msgFormatter getMsgFormatter() {
        return msgFormatter;
    }

    public void setMsgFormatter(com.example.springbootdemo.msgFormatter msgFormatter) {
        this.msgFormatter = msgFormatter;
    }

    private  msgFormatter msgFormatter; //note that message formatter bean will be injected according to spring config

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    @Override
    public String Classification() {
        return classification;
    }
}

package com.example.springbootdemo;

public class dog implements  animal{
    private static  final String   classification = "canis lupus familaris";

    public String getSound() {
        return sound;
    }

    public void setSound(String sound) {
        this.sound = sound;
    }

    private String sound;

    @Override
    public String Classification() {
        return  String.format("dog classificatio is %s. %s%n", classification, sound);
    }

}

package com.example.springbootdemo;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;

public class horse implements animal{
   private static  final String   classification = "Equus caballus";

   public String getSound() {
      return sound;
   }

   public void setSound(String sound) {
      this.sound = sound;
   }

   private String sound;


   public com.example.springbootdemo.msgFormatter getMsgFormatter() {
      return msgFormatter;
   }


   //@Resource(name = "msgFormatter") //use standard java annotations to inject dependancy
   //Note that @Resource alone (w/o name) will try inject a bean that has name that matches
   // the member name. since they are same in our case we shall omit the name
   @Resource
   public void setMsgFormatter(com.example.springbootdemo.msgFormatter msgFormatter) {
      this.msgFormatter = msgFormatter;
   }

   private msgFormatter msgFormatter;

   @Override
   public String Classification() {
      return  String.format("horse classificatio is %s. %s%n", classification, sound);
   }

   //use java annotations to wire init/destroy callback
   //rather than using spring InitializingBean, DisposableBean  interfaces or specifying these callbacks
   //in spring config file
    @PostConstruct
   public void initHorse(){
       System.out.printf("horse::initHorse() called%n");
   }

   @PreDestroy
   public void destroyHorse(){
      System.out.printf("horse::destroyHorse() called%n");
   }
}
```

#### 1.1.2.4.6 Internationalization and application resources

```text
                application.properties:
point4.x_cfg=0
point4.y_cfg=1
horse.sound="hihiheeeeeee!"
dog.sound="woof woof!"

messages.properties, 
msg1=This is I8N message 1
pointsMsg1=This is points I8N intro!
pointsMsg2=The actual points are {0} {1}

load in spring.xml :
    <bean id="messageSource" class="org.springframework.context.support.ResourceBundleMessageSource"  >

wire to beans as in:
    @Autowired
    private MessageSource msgSrc;
```

#### 1.1.2.4.7 Events

#### 1.1.2.4.7.1 GeneralEvtListener

```text
package com.example.springbootdemo;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

//@Component
//ToDo, talk to yan. Fix the double app ctxt init error...
public class GeneralEvtListener implements ApplicationListener {

    @Override
    public void onApplicationEvent(ApplicationEvent applicationEvent) {
        System.out.println("GeneralEvtListener::onApplicationEvent() got event  "+applicationEvent.toString());
    }
}
```

#### 1.1.2.4.7.2 ToStringEvt

```text
package com.example.springbootdemo;

import org.springframework.context.ApplicationEvent;

public class ToStringEvt extends ApplicationEvent {

    public ToStringEvt(Object source) {
        super(source);
    }

    @Override
    public String toString() {
        return "ToStringEvt{" +
                "super toString=" + source +
                "ToStringEvt toString="+" this is a toString() called event!"+
                '}';
    }
}
```

#### 1.1.2.4.7.3 publish custom events

```text
                    snip:
    public void publishDemoEvent()
    {
        //publish a toString method called event
        ToStringEvt toStringEvt = new ToStringEvt(this);
        appEvtPub.publishEvent(toStringEvt);
    }

                    1.1.2.4.7.4

                1.1.2.4.8

            1.1.2.5


        1.1.3
```

## 1.2 database

### 1.2.1 database connections

#### 1.2.1.1 database connections pools

```text
https://www.baeldung.com/java-connection-pooling
```

#### 1.2.1.1.1 Apache Commons DBCP

```text
 -> Configure data source
               public class DBCPDataSource {
    
    private static BasicDataSource ds = new BasicDataSource();
    
    static {
        ds.setUrl("jdbc:h2:mem:test");
        ds.setUsername("user");
        ds.setPassword("password");
        ds.setMinIdle(5);
        ds.setMaxIdle(10);
        ds.setMaxOpenPreparedStatements(100);
    }
    
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }
    
    private DBCPDataSource(){ } 

    -> to get connection:
    Connection con = DBCPDataSource.getConnection();
```

#### 1.2.1.1.2 HikariCP

```text
Performant Connection-Pool
-> Configure
public class HikariCPDataSource {
    
    private static HikariConfig config = new HikariConfig();
    private static HikariDataSource ds;
    
    static {
        config.setJdbcUrl("jdbc:h2:mem:test");
        config.setUsername("user");
        config.setPassword("password");
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        ds = new HikariDataSource(config);
    }
    
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }
    
    private HikariCPDataSource(){}
}

-> get connection:
Connection con = HikariCPDataSource.getConnection();
```

#### 1.2.1.1.3 C3PO

```text
Last in this review is C3PO, a powerful JDBC4 connection and statement pooling framework developed by Steve Waldman:
-> Configure data source:
public class C3poDataSource {

    private static ComboPooledDataSource cpds = new ComboPooledDataSource();

    static {
        try {
            cpds.setDriverClass("org.h2.Driver");
            cpds.setJdbcUrl("jdbc:h2:mem:test");
            cpds.setUser("user");
            cpds.setPassword("password");
        } catch (PropertyVetoException e) {
            // handle the exception
        }
    }
    
    public static Connection getConnection() throws SQLException {
        return cpds.getConnection();
    }
    
    private C3poDataSource(){}
}
-> get connection:
Connection con = C3poDataSource.getConnection();
```

#### 1.2.1.1.4 A Simple Implementation

```text
To better understand the underlying logic of connection pooling, let's create a simple implementation.

Let's start out with a loosely-coupled design, based on just one single interface:

public interface ConnectionPool {
    Connection getConnection();
    boolean releaseConnection(Connection connection);
    String getUrl();
    String getUser();
    String getPassword();
}
The ConnectionPool interface defines the public API of a basic connection pool.

Now, let's create an implementation, which provides some basic functionality, including getting and releasing a pooled connection:


freestar
public class BasicConnectionPool 
  implements ConnectionPool {

    private String url;
    private String user;
    private String password;
    private List<Connection> connectionPool;
    private List<Connection> usedConnections = new ArrayList<>();
    private static int INITIAL_POOL_SIZE = 10;
    
    public static BasicConnectionPool create(
      String url, String user, 
      String password) throws SQLException {
 
        List<Connection> pool = new ArrayList<>(INITIAL_POOL_SIZE);
        for (int i = 0; i < INITIAL_POOL_SIZE; i++) {
            pool.add(createConnection(url, user, password));
        }
        return new BasicConnectionPool(url, user, password, pool);
    }
    
    // standard constructors
    
    @Override
    public Connection getConnection() {
        Connection connection = connectionPool
          .remove(connectionPool.size() - 1);
        usedConnections.add(connection);
        return connection;
    }
    
    @Override
    public boolean releaseConnection(Connection connection) {
        connectionPool.add(connection);
        return usedConnections.remove(connection);
    }
    
    private static Connection createConnection(
      String url, String user, String password) 
      throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }
    
    public int getSize() {
        return connectionPool.size() + usedConnections.size();
    }

    // standard getters
}
While pretty naive, the BasicConnectionPool class provides the minimal functionality that we'd expect from a typical connection pooling implementation.

In a nutshell, the class initializes a connection pool based on an ArrayList that stores 10 connections, which can be easily reused.

It's possible to create JDBC connections with the DriverManager class and with Datasource implementations.

As it's much better to keep the creation of connections database agnostic, we've used the former, within the create() static factory method.

In this case, we've placed the method within the BasicConnectionPool, because this is the only implementation of the interface.

In a more complex design, with multiple ConnectionPool implementations, it'd be preferable to place it in the interface, therefore getting a more flexible design and a greater level of cohesion.

The most relevant point to stress here is that once the pool is created, connections are fetched from the pool, so there's no need to create new ones.

Furthermore, when a connection is released, it's actually returned back to the pool, so other clients can reuse it.

There's no any further interaction with the underlying database, such as an explicit call to the Connection's close() method.

->  Using the BasicConnectionPool Class
As expected, using our BasicConnectionPool class is straightforward.

Let's create a simple unit test and get a pooled in-memory H2 connection:

@Test
public whenCalledgetConnection_thenCorrect() {
    ConnectionPool connectionPool = BasicConnectionPool
      .create("jdbc:h2:mem:test", "user", "password");
 
    assertTrue(connectionPool.getConnection().isValid(1));
}
-> Further Improvements and Refactoring
Of course, there's plenty of room to tweak/extend the current functionality of our connection pooling implementation.

For instance, we could refactor the getConnection() method, and add support for maximum pool size. If all available connections are taken, and the current pool size is less than the configured maximum, the method will create a new connection.

Also, we could additionally verify whether the connection obtained from the pool is still alive, before passing it to the client.

@Override
public Connection getConnection() throws SQLException {
    if (connectionPool.isEmpty()) {
        if (usedConnections.size() < MAX_POOL_SIZE) {
            connectionPool.add(createConnection(url, user, password));
        } else {
            throw new RuntimeException(
              "Maximum pool size reached, no available connections!");
        }
    }

    Connection connection = connectionPool
      .remove(connectionPool.size() - 1);

    if(!connection.isValid(MAX_TIMEOUT)){
        connection = createConnection(url, user, password);
    }

    usedConnections.add(connection);
    return connection;
}
Note that the method now throws SQLException, meaning we'll have to update the interface signature as well.

Or, we could add a method to gracefully shut down our connection pool instance:

public void shutdown() throws SQLException {
    usedConnections.forEach(this::releaseConnection);
    for (Connection c : connectionPool) {
        c.close();
    }
    connectionPool.clear();
}
In production-ready implementations, a connection pool should provide a bunch of extra features, such as the ability for tracking the connections that are currently in use, support for prepared statement pooling, and so forth.

As we'll keep things simple, we'll omit how to implement these additional features and keep the implementation non-thread-safe for the sake of clarity.


-> Configure data source:
-> get connection:
Spring Framework JPA
            1.2.1.2

        1.2.2
```

## 1.3 chatgpt

### 1.3.1 q. what is spring-boot-starter-webflux

```text
a. 
spring-boot-starter-webflux is a Spring Boot starter dependency that provides a set of libraries for building reactive web applications using Spring WebFlux.

Spring WebFlux is a module of the Spring Framework that provides support for building reactive web applications. Reactive programming is a programming paradigm that focuses on building asynchronous, non-blocking, and event-driven systems. With Spring WebFlux, you can build web applications that are capable of handling a large number of concurrent requests with low resource consumption.

The spring-boot-starter-webflux dependency includes the following libraries:

Spring WebFlux: Provides support for building reactive web applications.
Reactor Core: A reactive library that provides a set of classes for building asynchronous and non-blocking systems.
Jackson JSON: Provides support for working with JSON data.
Spring Boot Actuator: Provides support for monitoring and managing your application.
By including spring-boot-starter-webflux in your Spring Boot application, you can quickly set up a reactive web application with all the necessary dependencies and configurations.
```

### 1.3.2 q. explain the basics of setting up a reactive web application using

```text
a.
Sure, here are the basics of setting up a reactive web application using Spring WebFlux:

Add the necessary dependencies: To build a reactive web application using Spring WebFlux, you will need to add the spring-boot-starter-webflux dependency to your project. You can add this dependency using your build tool of choice (Maven or Gradle).

Create a Controller: A Controller is a class that handles HTTP requests and returns a response. In Spring WebFlux, you can create a Controller by annotating a class with @RestController.

Define the Routes: To define the routes for your web application, you can use the @RequestMapping annotation. This annotation specifies the HTTP method and the path for each endpoint.

Define the Request and Response Objects: You will need to define the objects that represent the request and response for each endpoint. In Spring WebFlux, you can define these objects as Java classes.

Implement the Business Logic: In the Controller method, you can implement the business logic for handling the request and returning the response.

Here's an example of a simple Spring WebFlux Controller:
@RestController
public class MyController {

  @GetMapping("/hello")
  public Mono<String> sayHello() {
    return Mono.just("Hello World!");
  }

}

In this example, we have defined a Controller that handles GET requests to the /hello endpoint. The sayHello() method returns a Mono object, which represents a single asynchronous result.

That's a basic overview of setting up a reactive web application using Spring WebFlux. Of course, there are many more features and capabilities of Spring WebFlux, but this should give you a good starting point.
```

### 1.3.3 q. example using maven and postgress DB

```text
Sure, here's an example of setting up a Spring Boot application with Maven and PostgreSQL as the database:

Create a new Maven project: You can create a new Maven project using the following command in the terminal or command prompt:
mvn archetype:generate -DgroupId=com.example -DartifactId=myproject -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

Add the necessary dependencies: To use PostgreSQL as the database in your Spring Boot application, you will need to add the following dependencies to your pom.xml file:
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.2.23</version>
  </dependency>
</dependencies>

The spring-boot-starter-web dependency provides support for building web applications, while the spring-boot-starter-data-jpa dependency provides support for working with databases. The postgresql dependency provides the PostgreSQL driver for Spring Boot to connect to the database.

Configure the database connection: In the application.properties file, you can configure the connection to the PostgreSQL database:
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=postgres
spring.datasource.password=postgres

Replace mydb, postgres, and postgres with the name of your database, username, and password, respectively.

Create a JPA Entity: A JPA Entity is a Java class that maps to a table in the database. Here's an example of a simple JPA Entity:
@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private String email;

  // Getters and Setters
}

In this example, we have defined a JPA Entity that represents a User table in the database. The @Id annotation specifies the primary key, while the @GeneratedValue annotation generates a unique identifier automatically.

Create a Repository: A Repository is an interface that defines methods for accessing and manipulating data in the database. Here's an example of a simple Repository:
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}

In this example, we have defined a Repository that extends the JpaRepository interface, which provides a set of methods for working with data in the database.

Create a Controller: A Controller is a class that handles HTTP requests and returns a response. Here's an example of a simple Controller:
@RestController
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/users")
  public List<User> getUsers() {
    return userRepository.findAll();
  }

  @PostMapping("/users")
  public User createUser(@RequestBody User user) {
    return userRepository.save(user);
  }

}

In this example, we have defined a Controller that handles GET and POST requests to the /users endpoint. The @Autowired annotation injects the UserRepository dependency, which we can use to access and manipulate data in the database.

That's a basic example of setting up a Spring Boot application with Maven and PostgreSQL as the database. Of course, there are many more features and configurations that you can add to this setup,
```

### 1.3.4 use JDBC instead of JPA

```text
Sure, here's an example of setting up a Spring Boot application with Maven and PostgreSQL as the database using JDBC instead of JPA:

Create a new Maven project: You can create a new Maven project using the following command in the terminal or command prompt:
mvn archetype:generate -DgroupId=com.example -DartifactId=myproject -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

Add the necessary dependencies: To use PostgreSQL as the database in your Spring Boot application with JDBC, you will need to add the following dependencies to your pom.xml file:
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.2.23</version>
  </dependency>
</dependencies>

The spring-boot-starter-web dependency provides support for building web applications, while the postgresql dependency provides the PostgreSQL driver for Spring Boot to connect to the database.

Configure the database connection: In the application.properties file, you can configure the connection to the PostgreSQL database:
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=postgres
spring.datasource.password=postgres

Replace mydb, postgres, and postgres with the name of your database, username, and password, respectively.

Create a DAO: A DAO (Data Access Object) is a class that encapsulates the logic for accessing and manipulating data in the database. Here's an example of a simple DAO:
@Repository
public class UserDao {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<User> getUsers() {
    String sql = "SELECT * FROM users";
    return jdbcTemplate.query(sql, new UserRowMapper());
  }

  public User createUser(User user) {
    String sql = "INSERT INTO users(name, email) VALUES (?, ?)";
    jdbcTemplate.update(sql, user.getName(), user.getEmail());
    return user;
  }

}

In this example, we have defined a DAO that uses the JdbcTemplate class to interact with the database. The getUsers() method executes a SELECT statement to retrieve a list of users from the database, while the createUser() method executes an INSERT statement to insert a new user into the database.

Create a RowMapper: A RowMapper is an interface that maps a row of data from the database to a Java object. Here's an example of a simple RowMapper:
public class UserRowMapper implements RowMapper<User> {

  @Override
  public User mapRow(ResultSet rs, int rowNum) throws SQLException {
    User user = new User();
    user.setId(rs.getLong("id"));
    user.setName(rs.getString("name"));
    user.setEmail(rs.getString("email"));
    return user;
  }

}

In this example, we have defined a RowMapper that maps a row of data from the users table in the database to a User object.

Create a Controller: A Controller is a class that handles HTTP requests and returns a response. Here's an example of a simple Controller:
@RestController
public class UserController {

  @Autowired
  private UserDao userDao;

  @GetMapping("/users")
  public List<User> getUsers() {
    return userDao.getUsers();
  }

  @PostMapping("/users")
  public User createUser(@RequestBody User user) {
    return userDao.createUser(user);
  }

}

q. why JdbcTemplate is @Autowired
a. In the example I provided earlier, the JdbcTemplate object is autowired into the UserDao class using the @Autowired annotation. This is because the JdbcTemplate class is a Spring framework class that provides a convenient way to interact with a JDBC datasource.

By autowiring the JdbcTemplate object, Spring takes care of creating an instance of the JdbcTemplate class and injecting it into the UserDao class at runtime. This makes it easier to use the JdbcTemplate object without having to manually create an instance of the class or worry about managing its lifecycle.

In addition, the @Autowired annotation is used in conjunction with Spring's IoC (Inversion of Control) container, which is responsible for managing the lifecycle of objects and their dependencies in a Spring application. By using @Autowired, the JdbcTemplate object is automatically wired up by the IoC container, which reduces the amount of boilerplate code that would be required if we had to create and manage the JdbcTemplate object manually.
```

### 1.3.5 explain java org.springframework.context.annotation.Profile

````text
In Java and the Spring Framework, the `@Profile` annotation is used to define different configurations and beans based on specific runtime environments or application profiles. It allows you to selectively activate or deactivate certain parts of your application's configuration based on the specified profile.

Here's how the `@Profile` annotation works:

1. Defining Profiles: Profiles are defined using the `@Profile` annotation at the class or method level. You can assign one or more profile names to the annotation. For example:

```java
@Configuration
@Profile("development")
public class DevelopmentConfig {
    // Configuration for development profile
}

@Configuration
@Profile("production")
public class ProductionConfig {
    // Configuration for production profile
}
```

In this example, two configuration classes are defined, each associated with a different profile. The `DevelopmentConfig` class is active only when the "development" profile is active, and the `ProductionConfig` class is active only when the "production" profile is active.
````
