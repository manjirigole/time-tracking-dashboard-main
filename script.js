document.addEventListener("DOMContentLoaded", () => {
  let currentPeriod = "daily";
  let dashboardData = [];

  //import the variables
  const dashboardContainer = document.querySelector(".dashboard-container");
  const template = document.querySelector(".dashboard-template");
  const dailyLink = document.querySelector(".daily-link");
  const weeklyLink = document.querySelector(".weekly-link");
  const monthlyLink = document.querySelector(".monthly-link");

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      dashboardData = data;
      renderDashboard();
      console.log(data);
    })
    .catch((error) => console.error("Error fetching JSON:", error));

  function renderDashboard() {
    dashboardContainer.innerHTML = "";

    dashboardData.forEach((details) => {
      const clone = template.content.cloneNode(true);
      const title = clone.querySelector(".title");
      const currentTime = clone.querySelector(".current");
      const prevTime = clone.querySelector(".previous");
      const dashboardDiv = clone.querySelector(".dashboard-div");

      const timeFrames = details.timeframes[currentPeriod];
      dashboardDiv.style.backgroundImage = `url(${details.img})`;
      dashboardDiv.style.backgroundColor = details.color;
      title.textContent = details.title;
      currentTime.textContent = `${timeFrames.current}hrs`;

      let label = "Last";
      if (currentPeriod === "daily") label = "Yesterday";
      else if (currentPeriod === "weekly") label = "Last Week";
      else if (currentPeriod === "monthly") label = "Last Month";

      prevTime.textContent = `${label} - ${timeFrames.previous}hrs`;

      dashboardContainer.appendChild(clone);
    });
  }
  dailyLink.addEventListener("click", (e) => {
    e.preventDefault();
    currentPeriod = "daily";
    renderDashboard();
  });

  weeklyLink.addEventListener("click", (e) => {
    e.preventDefault();
    currentPeriod = "weekly";
    renderDashboard();
  });

  monthlyLink.addEventListener("click", (e) => {
    e.preventDefault();
    currentPeriod = "monthly";
    renderDashboard();
  });
});
