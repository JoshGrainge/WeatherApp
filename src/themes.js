let lightTheme = true;

const lightBodyBg = "#ffcdb2";
const darkBodyBg = "#02020B";
const lightCardBg = "#df4545";
const darkCardBg = "#7fb069";

const lightTextColor = "#000";
const darkTextColor = "#fff";

const lightToggleBallColor = "#fff";
const darkToggleBallColor = "#111";
const lightToggleBgColor = "#111";
const darkToggleBgColor = "#fff";
const lightToggleTextColor = "#fff";
const darkToggleTextColor = "#111";

function toggleThemes() {
  lightTheme = !lightTheme;

  if (lightTheme) {
    document.documentElement.style.setProperty("--body-bg", lightBodyBg);
    document.documentElement.style.setProperty("--card-bg", lightCardBg);
    document.documentElement.style.setProperty("--text-color", lightTextColor);
    document.documentElement.style.setProperty(
      "--toggle-ball-color",
      lightToggleBallColor
    );
    document.documentElement.style.setProperty(
      "--toggle-bg",
      lightToggleBgColor
    );
    document.documentElement.style.setProperty(
      "--toggle-text-color",
      lightToggleTextColor
    );
  } else {
    console.log("Setting dark mode");
    document.documentElement.style.setProperty("--body-bg", darkBodyBg);
    document.documentElement.style.setProperty("--card-bg", darkCardBg);
    document.documentElement.style.setProperty("--text-color", darkTextColor);
    document.documentElement.style.setProperty(
      "--toggle-ball-color",
      darkToggleBallColor
    );
    document.documentElement.style.setProperty(
      "--toggle-bg",
      darkToggleBgColor
    );
    document.documentElement.style.setProperty(
      "--toggle-text-color",
      darkToggleTextColor
    );
  }
}

export { toggleThemes };
