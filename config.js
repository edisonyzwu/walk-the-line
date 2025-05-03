let config = {
  style: "mapbox://styles/mapbox/dark-v11",
  // leave commented to use Mapbox Standard Style
  accessToken:
    "pk.eyJ1IjoiZWRpc29uLXd1IiwiYSI6ImNtMmh6MHE1aDBpOW8ybXByOWQ4OXFqMjQifQ.CCubqrI6NiN0S6M54r-vIg", // your mapbox gl access token.
  showMarkers: true,
  markerColor: "#FF9B00",
  //   projection: "equirectangular",
  //Read more about available projections here
  //https://docs.mapbox.com/mapbox-gl-js/example/projections/
  inset: true, // setting this to true will display markers and the panel on a second map (main map can't have markers or a panel)
  insetOptions: {
    markerColor: "orange",
  },
  insetPosition: "bottom-right",
  theme: "dark",
  use3dTerrain: true, //set true for enabling 3D maps.
  auto: false,
  //   title: "Walk the Line",
  //   subtitle: "The Map Scrollytelling for Thesis Part 2",
  //   byline: "By Edison",
  //   footer:
  //     'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
  chapters: [
    {
      id: "step-1",
      alignment: "left",
      hidden: false,
      showMarkers: false,
      //   title: "China",
      //   image: "./assets/san-fran.jpeg",
      description:
        "The trip often started with a one-way flight across the Pacific from <strong>China</strong> to <strong>Ecuador</strong> — one of the few countries that allowed Chinese passport holders to enter <strong>without a visa</strong>. (That policy was later rescinded in July 2024).",
      location: {
        center: [121.4737, 31.2304],
        zoom: 2,
        pitch: 0, // pitch in degrees
        bearing: 0, // bearing in degrees
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "flight-path",
          opacity: 0,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "flight-path",
          opacity: 1,
          duration: 1000,
        },
      ],
    },
    {
      id: "step-2",
      alignment: "left",
      hidden: false,
      showMarkers: true,
      description:
        "After landing in <span style='color: orange; padding: 0'><strong>Quito</strong></span>, they connect with other migrants — some friends, some strangers, often organized through WeChat, Telegram or Whatsapp.",
      location: {
        center: [-78.507751, -0.208946],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "flight-path",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "flight-path",
          opacity: 0,
          duration: 300,
        },
      ],
    },

    {
      id: "step-3",
      alignment: "left",
      hidden: false,
      showMarkers: true,
      description:
        "From there, they begin the journey north using intercity buses or smuggler-arranged vans, riding for 20 to 30 hours through <strong>Ecuador</strong> to <span style='color: orange; padding: 0'><strong>Necoclí</strong></span>, a coastal town on Colombia’s Caribbean shore.",
      location: {
        center: [-76.82428, 8.57533],
        zoom: 6,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "land-path-1",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "land-path-1",
          opacity: 0,
          duration: 300,
        },
      ],
    },

    {
      id: "step-4",
      alignment: "left",
      hidden: false,
      showMarkers: true,
      image: "./assets/boat.jpg",
      description:
        "Then they purchase tickets for small boats or speed ferries that carry them to <span style='color: orange; padding: 0'><strong>Acandí</strong></span>, bordering <strong>Panama</strong>.",
      location: {
        center: [-77.303, 8.533],
        zoom: 7,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "boat-path",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "boat-path",
          opacity: 0,
          duration: 300,
        },
      ],
    },

    {
      id: "step-5",
      alignment: "left",
      hidden: false,
      showMarkers: false,
      image: "./assets/jungle1.jpg",
      description:
        "<p>To enter Panama, they must cross the <span style='background-color: #8B0000; color: white; padding: 0 4px'><strong>Darién Gap</strong></span>—a lawless, roadless expanse of dense rainforest stretching over <strong>100 kilometers</strong>, known as one of the most dangerous migration routes in the world.</p> <p>There were no roads, no signs, no guarantees, only smuggler-guided trails that twist through thick foliage, mudslides, steep ridges, and fast-moving rivers. </p>",
      location: {
        center: [-77.303, 8.533],
        zoom: 7,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "darien-gap-fill",
          opacity: 0.2,
          duration: 300,
        },
        {
          layer: "darien-gap-border",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "darien-gap-fill",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "darien-gap-border",
          opacity: 0,
          duration: 300,
        },
      ],
    },

    {
      id: "step-6",
      alignment: "left",
      video: "./assets/jungle.mp4",
      hidden: false,
      showMarkers: false,
      description:
        "Migrants carried whatever they could fit in a backpack and spent days hiking through slick trails, steep cliffs, and flooded ravines. It typically takes <strong>4 to 10 days</strong> to cross, depending on weather, health, and luck. The region was notorious for bandits, smugglers, venomous animals, and deadly dehydration. Some people didn’t make it out.",
      location: {
        center: [-77.303, 8.533],
        zoom: 7,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "darien-gap-fill",
          opacity: 0.2,
          duration: 300,
        },
        {
          layer: "darien-gap-border",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "darien-gap-fill",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "darien-gap-border",
          opacity: 0,
          duration: 300,
        },
      ],
    },

    {
      id: "step-7",
      alignment: "left",
      video: "./assets/riding horse.mp4",
      hidden: false,
      showMarkers: false,
      description:
        "There were alternative options, in which guides offered horseback transport for <span style='color: orange; padding: 0'><strong>US$1,600</strong></span> per person, but it was five times the cost of walking.",
      location: {
        center: [-77.303, 8.533],
        zoom: 7,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "darien-gap-fill",
          opacity: 0.2,
          duration: 300,
        },
        {
          layer: "darien-gap-border",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "darien-gap-fill",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "darien-gap-border",
          opacity: 0,
          duration: 300,
        },
      ],
    },

    {
      id: "step-8",
      alignment: "left",
      hidden: false,
      image: "./assets/tent.jpg",
      description:
        "Those who survived the jungle continued to spend weeks traveling through <strong>Panama, Costa Rica, Nicaragua, Honduras,</strong> and <strong>Guatemala</strong>, before finally entering Mexico.",
      location: {
        center: [-92.26432, 14.911071],
        zoom: 3,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "central-america-path",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "central-america-path",
          opacity: 0,
          duration: 300,
        },
      ],
    },

    {
      id: "step-9",
      alignment: "left",
      hidden: false,
      description:
        "In <span style='color: orange; padding: 0'><strong>Tapachula</strong></span>,  the southwest city of Mexico, many are detained by Mexican immigration officials and held in camps or shelters. They apply for temporary transit documents—or are forced to wait weeks or months in limbo.",
      location: {
        center: [-92.26432, 14.911071],
        zoom: 8,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },

    {
      id: "step-10",
      alignment: "left",
      hidden: false,
      showMarkers: false,
      description:
        "Many migrants who spent weeks trekking toward the northern border were stopped by Mexican immigration officers and deported back south.",
      location: {
        center: [-102.552, 22.771],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "mexico-path",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "mexico-path",
          opacity: 0,
          duration: 300,
        },
      ],
    },

    {
      id: "step-11",
      alignment: "left",
      hidden: false,
      showMarkers: false,
      description: "Bribes were often required to avoid detention or to secure passage forward.",
      location: {
        center: [-117.046623, 32.522499],
        zoom: 6,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },

    {
      id: "step-12",
      alignment: "left",
      hidden: false,
      showMarkers: false,
      video: "./assets/wall.MOV",
      description:
        "Eventually, after 3 to 6 mounths, they reached <strong>Tijuana</strong>, just <span style='background: repeating-linear-gradient(45deg, #8B0000, #8B0000 5px, #8B3220 5px, #8B3220 10px); color: white; padding: 0 4px'><strong>a wall</strong></span> away from San Diego.",
      location: {
        center: [-117.046623, 32.522499],
        zoom: 11,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "tijuana-border-line",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "tijuana-border-line",
          opacity: 0,
          duration: 300,
        },
      ],
    },
  ],
};
