import twistImg from '../assets/tickets/twist-and-fly.jpg';
import aerobidImg from '../assets/tickets/aerobid-wars.jpg';
import quizImg from '../assets/tickets/aeroquiz.jpg';
import simImg from '../assets/tickets/simulation-zero.jpg';
import skyImg from '../assets/tickets/sky-breach.jpg';

export const stargazingData = {
  id: 'stargazing',
  title: 'STARGAZING',
  category: 'Night Sky Observation',
  tagline: 'PEER DEEP INTO THE COSMOS.',
  date: '26 & 27 Sep',
  time: '7:00 - 8:00 PM',
  venue: 'Lawn Circle',
  isStargazing: true,
  shortDesc: 'Peer deep into the cosmos through astronomical telescopes. Observe lunar craters, Saturn’s planetary rings, Jupiter’s Galilean moons, and distant star clusters under guided constellation tours.',
  perk: 'Astronomical Telescopes & Astro-Photography Mounts Provided',
  contacts: [
    { name: 'AeroSoc Astronomy Wing', phone: 'Official Helpdesk' }
  ]
};

export const eventsData = [
  stargazingData,
  {
    id: 'simulation-zero',
    title: 'SIMULATION ZERO',
    collab: 'Aerocon x MATLAB',
    tagline: 'CODE. SIMULATE. FLY.',
    category: 'Simulation & Code',
    date: '26.09.2026',
    time: '10:00 A.M',
    venue: 'ROOM 220',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSddlBpBv7SyR_PYDriYewciOut2eoV9HwsXyy6s2amju2bgaw/viewform',
    perk: 'Free Pizzas and Goodies Loading...',
    ticketImage: simImg,
    shortDesc: 'Code, simulate, and optimize aerospace flight dynamics and control algorithms in MATLAB & Simulink.',
    contacts: [
      { name: 'Shourya', phone: '83201 55541' },
      { name: 'Kartikeya', phone: '8789 058459' }
    ]
  },
  {
    id: 'aerobid-wars',
    title: 'AEROBID WARS',
    tagline: 'BID. BUILD. DOMINATE.',
    category: 'Auction & Strategy',
    date: '26.09.2026',
    time: '01:00 P.M',
    venue: 'ROOM 217',
    formUrl: 'https://forms.gle/VvFA3Xp3VmgirahW8',
    ticketImage: aerobidImg,
    shortDesc: 'High-stakes aerospace component bidding war. Form your squad, bid strategically, assemble your machine, and conquer the arena.',
    contacts: [
      { name: 'Aayush', phone: '91100 57864' },
      { name: 'Utkarsh', phone: '77658 55180' }
    ]
  },
  {
    id: 'sky-breach',
    title: 'SKY BREACH',
    tagline: 'DESIGN. ASSEMBLE. LAUNCH.',
    category: 'Rocketry & Flight',
    date: '26.09.2026',
    time: '03:00 P.M',
    venue: 'ROOM 219',
    formUrl: 'https://forms.gle/bXQJCzNJVZnS2QD39',
    ticketImage: skyImg,
    shortDesc: 'Rocketry design, payload integration, and high-altitude launch mission. Build your launch vehicle and breach the sky.',
    contacts: [
      { name: 'A. Krishnan', phone: '62039 74739' },
      { name: 'Avnish', phone: '96088 86805' }
    ]
  },
  {
    id: 'twist-and-fly',
    title: 'TWIST AND FLY',
    tagline: 'WIND. RELEASE. GLIDE.',
    category: 'Aeromodelling',
    date: '27.09.2026',
    time: '10:00 A.M',
    venue: 'ROOM 220',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-zLXQXX8FyrvhYennJW1L4Cv1MOf8s2bQ3VuQmBU6SuJXJw/viewform',
    ticketImage: twistImg,
    shortDesc: 'Precision aeromodelling glider contest. Wind the rubber-band mechanism, release into flight, and maximize airtime glide.',
    contacts: [
      { name: 'Roushan', phone: '62032 08219' },
      { name: 'Pritam', phone: '62991 22506' }
    ]
  },
  {
    id: 'aeroquiz',
    title: 'AEROQUIZ',
    tagline: 'THINK. COMPETE. CONQUER.',
    category: 'Quiz & Intel',
    date: '27.09.2026',
    time: '01:00 P.M',
    venue: 'ROOM 217',
    formUrl: 'https://forms.gle/fmBjob2477KrkPL96',
    ticketImage: quizImg,
    shortDesc: 'The ultimate aviation and aerospace quiz. Rapid-fire trivia on aircraft, space missions, rocketry milestones, and defense tech.',
    contacts: [
      { name: 'Raghav', phone: '82926 77570' },
      { name: 'Arijit', phone: '73190 54017' }
    ]
  }
];
