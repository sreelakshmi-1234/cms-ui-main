const LandingTimeService = (): void => {
    const everyCheck = 1000; // 1 sec in milliseconds
    const nextToMS = 300000; // Next to 5 minutes
    const currentTime = new Date().getTime();
    const storedTime = localStorage.getItem("landingTime");
  
    const updateLandingTime = () => {
      const currentTime = new Date(new Date().setSeconds(0, 0));
      const minute = currentTime.getMinutes() % 5;
      if(minute == 0) {
        const newLandingTime = currentTime.getTime() + nextToMS;
        localStorage.setItem("landingTime", newLandingTime.toString());
      } else {
        const addMin = (5 - minute) * 60000;
        const newLandingTime = currentTime.getTime() + addMin;
        localStorage.setItem("landingTime", newLandingTime.toString());
      }
    };
  
    if (!storedTime) {
      // If no stored time, set it to 5 minutes from now
      updateLandingTime();
    } else if (currentTime > parseInt(storedTime)) {
      // If current time exceeds stored time, reset it
      updateLandingTime();
    }
  
    // Set an interval to check and update if the stored time is reached
    setInterval(() => {
      const currentIntervalTime = new Date().getTime();
      const latestStoredTime = parseInt(localStorage.getItem("landingTime") || "0");
  
      if (currentIntervalTime > latestStoredTime) {
        updateLandingTime();
      }
    }, everyCheck);
  };
  
  export default LandingTimeService;
  