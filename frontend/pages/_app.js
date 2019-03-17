import App, {Container} from "next/app";
import Page from "../components/global/Page";
// Needed to fix the CSS loader bug that Next.js needs
import "../dummy/dummy.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // This exposes the query to the user
    pageProps.query = ctx.query;
    return {pageProps};
  }
  render() {
    const {Component, apollo} = this.props;

    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
