//package com.lambdaschool.coffeebean;
//
//import com.lambdaschool.coffeebean.model.User;
//import com.lambdaschool.coffeebean.repository.Userrepository;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import static org.junit.Assert.assertTrue;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//public class UserreposTests
//{
//
//    @Autowired
//    private Userrepository userrepos;
//
//    //@Before is an annotation to make sure what's in there is run first
////    @Before
////    public void beforeTest()
////    {
////    }
//
//    @Test
//    public void countAllStartingUsers()
//    {
//        assertTrue(userrepos.findAll().spliterator().getExactSizeIfKnown() == 4);
//    }
//
//    @Test
//    public void getOne()
//    {
//        assertTrue(userrepos.findById((long) 1).orElse(null) != null);
//    }
//
//    @Test
//    public void updateUsername()
//    {
//        User username2 = userrepos.findById((long) 2).orElse(null);
//        assertTrue(username2 != null);
//        assertTrue(username2.getUsername().equals("username2"));
//
//        username2.setUsername("Green Apple");
//        userrepos.save(username2);
//
//        assertTrue(userrepos.findById((long) 2).orElse(null).getUsername().equals("Green Apple"));
//    }
//
//    @Test
//    public void createAndDeleteAUser()
//    {
//        long userid = userrepos.save(new User()).getUserid();
//        User createdUser = userrepos.findById(userid).orElse(null);
//        assertTrue(createdUser != null);
//        userrepos.deleteById(userid);
//        assertTrue(userrepos.findById(userid).orElse(null) == null);
//    }
//
//    @Test
//    public void getWrongId()
//    {
//        assertTrue(userrepos.findById((long) 9999).orElse(null) == null);
//    }
//
//}