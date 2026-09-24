import twistImg from '../assets/tickets/twist-and-fly.jpg';
import aerobidImg from '../assets/tickets/aerobid-wars.jpg';
import quizImg from '../assets/tickets/aeroquiz.jpg';
import simImg from '../assets/tickets/simulation-zero.jpg';
import skyImg from '../assets/tickets/sky-breach.jpg';

export const droneShowData = {
  id: 'drone-show',
  title: 'DRONE SHOW',
  category: 'Aerial Swarm Demonstration',
  date: '25.09.2026',
  time: '05:30 PM',
  venue: 'NCC Ground',
  shortDesc: 'Synchronized multi-rotor UAV formation flight. Features autonomous trajectory tracking, dynamic swarm positioning, and high-intensity nocturnal LED telemetry.',
  perk: 'Precision Autonomous Flight Trajectories • Open Access',
  contacts: [
    { name: 'Aayush', phone: '91100 57864' },
    { name: 'Abhishek', phone: '62021 74621' }
  ]
};

export const stargazingData = {
  id: 'stargazing',
  title: 'STARGAZING',
  category: 'Night Sky Observation',
  date: '26 & 27 Sep',
  time: '07:00 - 08:00 PM',
  venue: 'Lawn Circle',
  formUrl: 'https://form.jotform.com/262655686665070',
  isStargazing: true,
  shortDesc: 'Deep-space optical observation session using high-power reflector telescopes. Includes guided tracking of lunar topography, Saturnian ring structures, and Jovian moons.',
  perk: 'Astronomical Reflector Telescopes & Astrophotography Mounts',
  contacts: [
    { name: 'A. Krishnan', phone: '62039 74739' },
    { name: 'Shourya', phone: '83201 55541' }
  ]
};

export const eventsData = [
  droneShowData,
  stargazingData,
  {
    id: 'simulation-zero',
    title: 'SIMULATION ZERO',
    collab: 'Aerocon x MATLAB',
    category: 'Flight Dynamics & Control',
    date: '26.09.2026',
    time: '10:00 AM',
    venue: 'Room 220',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSddlBpBv7SyR_PYDriYewciOut2eoV9HwsXyy6s2amju2bgaw/viewform',
    perk: 'MATLAB & Simulink Dynamics Control Track',
    ticketImage: simImg,
    shortDesc: 'Technical computational modeling competition. Participants design, simulate, and tune aerospace flight control algorithms and aerodynamic stability matrices.',
    contacts: [
      { name: 'Shourya', phone: '83201 55541' },
      { name: 'Kartikeya', phone: '87890 58459' }
    ]
  },
  {
    id: 'aerobid-wars',
    title: 'AEROBID WARS',
    category: 'Procurement & Strategy',
    date: '26.09.2026',
    time: '01:00 PM',
    venue: 'Room 217',
    formUrl: 'https://forms.gle/VvFA3Xp3VmgirahW8',
    perk: 'Budget Allocation & Aircraft Assembly Challenge',
    ticketImage: aerobidImg,
    shortDesc: 'Strategic aerospace component procurement auction. Teams manage financial capital to bid on structural parts, propulsion units, and assemble airworthy models.',
    contacts: [
      { name: 'Aayush', phone: '91100 57864' },
      { name: 'Utkarsh', phone: '77658 55180' }
    ]
  },
  {
    id: 'sky-breach',
    title: 'SKY BREACH',
    category: 'High-Power Rocketry',
    date: '26.09.2026',
    time: '03:00 PM',
    venue: 'Room 219',
    formUrl: 'https://forms.gle/bXQJCzNJVZnS2QD39',
    perk: 'Solid-Motor Aerodynamics & Recovery Systems',
    ticketImage: skyImg,
    shortDesc: 'Model rocketry engineering contest evaluating solid-motor impulse ratio, fins alignment, center of mass stability, payload integration, and parachute recovery.',
    contacts: [
      { name: 'A. Krishnan', phone: '62039 74739' },
      { name: 'Avnish', phone: '96088 86805' }
    ]
  },
  {
    id: 'twist-and-fly',
    title: 'TWIST AND FLY',
    category: 'Aeromodelling Endurance',
    date: '27.09.2026',
    time: '10:00 AM',
    venue: 'Room 220',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-zLXQXX8FyrvhYennJW1L4Cv1MOf8s2bQ3VuQmBU6SuJXJw/viewform',
    perk: 'Passive Airfoil Lift & Glide Duration Scoring',
    ticketImage: twistImg,
    shortDesc: 'Precision rubber-band powered glider competition. Evaluates aerodynamic lift-to-drag optimization, structural mass minimization, and maximum flight duration.',
    contacts: [
      { name: 'Roushan', phone: '62032 08219' },
      { name: 'Pritam', phone: '62991 22506' }
    ]
  },
  {
    id: 'aeroquiz',
    title: 'AEROQUIZ',
    category: 'Aviation & Space Systems',
    date: '27.09.2026',
    time: '01:00 PM',
    venue: 'Room 217',
    formUrl: 'https://forms.gle/fmBjob2477KrkPL96',
    perk: 'Aeronautical Engineering & Space Exploration Intel',
    ticketImage: quizImg,
    shortDesc: 'Comprehensive technical examination covering classical aerodynamics, jet propulsion systems, orbital mechanics, historical space missions, and defense technology.',
    contacts: [
      { name: 'Raghav', phone: '82926 77570' },
      { name: 'Arijit', phone: '73190 54017' }
    ]
  }
];
