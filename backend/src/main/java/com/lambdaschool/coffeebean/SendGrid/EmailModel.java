package com.lambdaschool.coffeebean.SendGrid;

public class EmailModel
{
    String emailFrom;

    String emailTo;

    String subject;

    String body;

    public EmailModel(String emailFrom, String emailTo, String subject, String body)
    {
        this.emailFrom = emailFrom;
        this.emailTo = emailTo;
        this.subject = subject;
        this.body = body;
    }

    public String getEmailFrom()
    {
        return emailFrom;
    }

    public void setEmailFrom(String emailFrom)
    {
        this.emailFrom = emailFrom;
    }

    public String getEmailTo()
    {
        return emailTo;
    }

    public void setEmailTo(String emailTo)
    {
        this.emailTo = emailTo;
    }

    public String getSubject()
    {
        return subject;
    }

    public void setSubject(String subject)
    {
        this.subject = subject;
    }

    public String getBody()
    {
        return body;
    }

    public void setBody(String body)
    {
        this.body = body;
    }
}
