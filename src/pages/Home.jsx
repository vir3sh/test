import React from "react";

import PropertySearchHero from "../components/PropertySearchHero";
import PremiumProperties from "../components/PremiumProperties";
import WhyValueProperties from "../components/Whyvalueproperties";
import Explorebydeveloper from "../components/Explorebydeveloper";
import GetInTouch from "../components/Getintouch";

const Home = () => {
  return (
    <main>
      <PropertySearchHero />
      <PremiumProperties />
      <WhyValueProperties />
      <Explorebydeveloper />
      <GetInTouch />
    </main>
  );
};

export default Home;
