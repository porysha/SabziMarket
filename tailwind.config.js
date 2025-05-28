module.exports = {
    content: ["./public/*.{html,js}"],
    theme: {
        extend: {

          colors:{
            "greenpro":{
                "100":"#9ad198",
                "200":'#48b06b'
            }
          },

        },
        fontFamily: {
            "Vazirmatn": "Vazirmatn",
            "Dana": "Dana",
            "DanaMedium": "Dana Medium",
            "DanaDemiBold": "Dana DemiBold",
            "MorabbaLight": "Morabba Light",
            "MorabbaMedium": "Morabba Medium",
            "MorabbaBold": "Morabba Bold",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                lg: "1.625rem",
            },
        },
        screens: {
            "xs": "480px",

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        
        '2lg': '1162px',
        // => @media (min-width: 1162px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }


      },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        },
    ],
};
