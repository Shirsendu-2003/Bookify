import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext =
  createContext(null);

const STORAGE_KEY =
  "app-theme";

const THEMES = {

  LIGHT:"light",

  DARK:"dark",

  SYSTEM:"system",

};

export function ThemeProvider({

  children,

}) {

  const [theme,setTheme] =
    useState(

      localStorage.getItem(
        STORAGE_KEY
      ) ||

      THEMES.SYSTEM

    );

  /* --------------------- */
  /* SYSTEM DETECTION */
  /* --------------------- */

  const getSystemTheme =
    ()=>{

    return window
      .matchMedia(

        "(prefers-color-scheme: dark)"

      ).matches

      ? THEMES.DARK

      : THEMES.LIGHT;

  };

  /* --------------------- */
  /* APPLY THEME */
  /* --------------------- */

  const applyTheme =
    (selected)=>{

    const root =
      document.documentElement;

    root.classList.remove(

      "light",

      "dark"

    );

    const finalTheme =

      selected ===
      THEMES.SYSTEM

      ? getSystemTheme()

      : selected;

    root.classList.add(
      finalTheme
    );
  };

  /* --------------------- */
  /* INIT */
  /* --------------------- */

  useEffect(()=>{

    applyTheme(theme);

    localStorage.setItem(

      STORAGE_KEY,

      theme

    );

  },[theme]);

  /* --------------------- */
  /* SYSTEM CHANGE LISTENER */
  /* --------------------- */

  useEffect(()=>{

    const mediaQuery =

      window.matchMedia(

        "(prefers-color-scheme: dark)"

      );

    const handleChange =
      ()=>{

      if(

        theme ===
        THEMES.SYSTEM

      ){

        applyTheme(
          THEMES.SYSTEM
        );

      }

    };

    mediaQuery
      .addEventListener(

        "change",

        handleChange

      );

    return ()=>{

      mediaQuery
        .removeEventListener(

          "change",

          handleChange

        );

    };

  },[theme]);

  /* --------------------- */
  /* HELPERS */
  /* --------------------- */

  const toggleTheme =
    ()=>{

    setTheme(

      (prev)=>

        prev ===
        THEMES.DARK

        ? THEMES.LIGHT

        : THEMES.DARK

    );

  };

  const setLight =
    ()=>{

    setTheme(
      THEMES.LIGHT
    );

  };

  const setDark =
    ()=>{

    setTheme(
      THEMES.DARK
    );

  };

  const setSystem =
    ()=>{

    setTheme(
      THEMES.SYSTEM
    );

  };

  const resolvedTheme =

    theme ===
    THEMES.SYSTEM

    ? getSystemTheme()

    : theme;

  /* --------------------- */
  /* MEMO */
  /* --------------------- */

  const value =
    useMemo(()=>({

      theme,

      resolvedTheme,

      themes:THEMES,

      toggleTheme,

      setLight,

      setDark,

      setSystem,

    }),[

      theme,

      resolvedTheme,

    ]);

  return(

    <ThemeContext.Provider
      value={value}
    >

      {children}

    </ThemeContext.Provider>

  );

}

/* --------------------- */
/* HOOK */
/* --------------------- */

export function useTheme(){

  const context =
    useContext(
      ThemeContext
    );

  if(!context){

    throw new Error(

      "useTheme must be used inside ThemeProvider"

    );

  }

  return context;

}