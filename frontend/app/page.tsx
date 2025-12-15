"use client";

import Introblock from "./components/Introblock";
import GetStartedblock from "./components/GetStartedBlock";

//Requirements Fullfilled//
/*1.When the user opens the application, the system shall display the start screen.
Description: The user clicks on the desktop application icon, and the application opens to the start screen.
Precondition: The user must have the application on their computer
Postcondition: The application start screen is displayed.*/


export default function HomePage() {
  return (
    <main>
      <Introblock/>
      <GetStartedblock/>

    </main>
  );
}
