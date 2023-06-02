import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import AppPreLoader from "./components/library/AppPreLoader";
import { loadHomeData } from "./store/actions/homeActions";
import { connect } from "react-redux";

function App({ allRecordsLoaded, dispatch }) {

  useEffect(() => {
    dispatch(loadHomeData());
  }, [])

  if (!allRecordsLoaded)
    return <AppPreLoader message="Loading..." />

  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

const mapStateToProps = ({ home }) => {
  return {
    allRecordsLoaded: home.allRecordsLoaded,
  }
}

export default connect(mapStateToProps)(App);