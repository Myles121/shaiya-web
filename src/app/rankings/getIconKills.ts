export const getImageBasedOnKills = (kills: number) => {
  const thresholds = [
    { kills: 1000000, image: "/rank/46.png" },
    { kills: 950000, image: "/rank/45.png" },
    { kills: 900000, image: "/rank/44.png" },
    { kills: 850000, image: "/rank/44.png" },
    { kills: 800000, image: "/rank/42.png" },
    { kills: 750000, image: "/rank/41.png" },
    { kills: 700000, image: "/rank/40.png" },
    { kills: 650000, image: "/rank/40.png" },
    { kills: 600000, image: "/rank/39.png" },
    { kills: 550000, image: "/rank/38.png" },
    { kills: 500000, image: "/rank/37.png" },
    { kills: 450000, image: "/rank/36.png" },
    { kills: 400000, image: "/rank/35.png" },
    { kills: 350000, image: "/rank/34.png" },
    { kills: 300000, image: "/rank/33.png" },
    { kills: 250000, image: "/rank/32.png" },
    { kills: 200000, image: "/rank/31.png" },
    { kills: 150000, image: "/rank/15.png" },
    { kills: 130000, image: "/rank/14.png" },
    { kills: 110000, image: "/rank/13.png" },
    { kills: 90000, image: "/rank/12.png" },
    { kills: 70000, image: "/rank/11.png" },
    { kills: 50000, image: "/rank/10.png" },
    { kills: 40000, image: "/rank/9.png" },
    { kills: 30000, image: "/rank/8.png" },
    { kills: 20000, image: "/rank/7.png" },
    { kills: 10000, image: "/rank/6.png" },
    { kills: 5000, image: "/rank/5.png" },
    { kills: 1000, image: "/rank/4.png" },
    { kills: 300, image: "/rank/3.png" },
    { kills: 50, image: "/rank/2.png" },
    { kills: 1, image: "/rank/1.png" },
    { kills: 0, image: "/rank/0.png"}
  ];

  for (const threshold of thresholds) {
    if (kills >= threshold.kills) {
      return threshold.image;
    }
  }
};
