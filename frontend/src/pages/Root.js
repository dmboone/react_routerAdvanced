import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation></MainNavigation>
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} one way to find out if you are loading data are not */}
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default RootLayout;
