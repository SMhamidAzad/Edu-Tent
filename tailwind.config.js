module.exports = {
  content: ["./src/**/*.{html,js}"],
  themes: [
    {
      mytheme: {

        "primary": "#ff0000",

        "secondary": "#463AA1",

        "accent": "#C149AD",

        "neutral": "#021431",

        "base-100": "#FFFFFF",

        "info": "#93E6FB",

        "success": "#80CED1",

        "warning": "#EFD8BD",

        "error": "#E58B8B",
      },
    },
  ],

  plugins: [require("daisyui")],
}
