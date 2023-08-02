import { createGlobalStyle } from "styled-components";
import Colors from "./Colors";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
    box-sizing: border-box;
  }


  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Lato', sans-serif;
    scroll-behavior: smooth;
    /* background-color: ${Colors.Dark} */
  }

  a {
      text-decoration: none;
  }

  a {
      text-decoration: none;
  }

  ul {
      list-style: none;
  }

   button{
    border: none;
    cursor: pointer;
    background-color: transparent;
   }



   @media (pointer: fine) {
        /* total width */
::-webkit-scrollbar {
  background-color: rgba(0,0,0,0);
  width: 16px;
  height: 16px;
  z-index: 999999;
}

/* background of the scrollbar except button or resizer */
::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0);
}

/* scrollbar itself */
::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0);
  border-radius:16px;
  border:0px solid #fff;
}

/* set button(top and bottom of the scrollbar) */
::-webkit-scrollbar-button {
  display:none;
}


/* scrollbar when element is hovered */
:hover::-webkit-scrollbar-thumb {
  background-color: #a0a0a5;
  border:4px solid #fff;
}

/* scrollbar when scrollbar is hovered */
::-webkit-scrollbar-thumb:hover {
    background-color:#a0a0a5;
    border:4px solid #f4f4f4
}
}


`;
