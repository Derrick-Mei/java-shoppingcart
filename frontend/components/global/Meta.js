import Head from "next/head";

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 

    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/static/style.css" />
    <title>Mean Coffee Bean</title>
  </Head>
);

export default Meta;
