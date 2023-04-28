
export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};


export const calculateTimeLeft = (date) => {

  const difference = +new Date(date) - +new Date();

  let timeLeft: TimeLeft = {} as TimeLeft;

  if (difference > 0) {
      timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
      }
  }
  return timeLeft;
};

export const calculateTimeIn = (date) => {
  const difference =+new Date() - +new Date(date)  ;

  let timeLeft: TimeLeft = {} as TimeLeft;

  if (difference > 0) {
      timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
      }
  }
  return timeLeft;
};

export const formatedTimestamp = ()=> {
  const d = new Date()
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`
}

