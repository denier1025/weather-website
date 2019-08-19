const weatherForm = document.querySelector("form");
const searchBar = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?search_place=${encodeURIComponent(searchBar.value)}`).then(
    res => {
      res.json().then(data => {
        if (data.err) {
          messageOne.textContent = data.err.msg;
        } else {
          messageOne.textContent = data.location;
          const { summary, temperature, precipProbability } = data.forecast;
          messageTwo.textContent = `${summary} It's currently ${temperature} degress out. There is a ${precipProbability}% chance of rain.`;
        }
      });
    }
  );
});
