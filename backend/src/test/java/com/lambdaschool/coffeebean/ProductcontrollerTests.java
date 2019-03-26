package com.lambdaschool.coffeebean;

import com.lambdaschool.coffeebean.controller.Productcontroller;
import com.lambdaschool.coffeebean.model.Product;
import com.lambdaschool.coffeebean.repository.Productrepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Date;
import java.util.Collections;

@RunWith(SpringRunner.class)
@WebMvcTest(value = Productcontroller.class, secure = false)
public class ProductcontrollerTests
{
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private Productrepository productrepos;

    private final Product mockProduct = new Product("productname4", "description4", 12.50, 10, new Date(System.currentTimeMillis()), "asdf");

    @Test
    public void canGetProduct() throws Exception {

        productrepos.save(mockProduct);

        Mockito.when(
                productrepos.findAll()).thenReturn(Collections.singletonList((mockProduct)));

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(
                "/products").accept(
                MediaType.APPLICATION_JSON_UTF8);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        System.out.println(result.getResponse().getContentAsString());
        String expected = "[{\"productid\":0,\"productname\":\"productname4\",\"description\":\"description4\",\"price\":12.5,\"quantity\":10,\"expiration\":\"2019-03-21\",\"image\":\"asdf\",\"productorders\":null,\"potentialusers\":null,\"productusers\":null,\"suppliers\":null}]";

        JSONAssert.assertEquals(expected, result.getResponse()
                .getContentAsString(), false);
    }

    @Test
    public void checkContentType() throws Exception
    {
        System.out.println("test intial");
        mockMvc.perform(
                MockMvcRequestBuilders.get("/products")
        )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_UTF8));
        System.out.println("test end");
    }
}
