package com.lambdaschool.coffeebean.SendGrid;

import com.sendgrid.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SendGridService2
{
    @Value("${TEST_SENDGRID}")
    String secretKey;

    public void sendEmail (EmailModel email) throws IOException {
        Email from = new Email(email.getEmailFrom());
        Email to = new Email(email.getEmailTo());
        String subject = email.getSubject();
        Content content = new Content("text/plain", email.getBody());
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(secretKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
