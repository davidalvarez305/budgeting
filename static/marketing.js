const qs = new URLSearchParams(window.location.search);
let latitude = 0.0;
let longitude = 0.0;

document.addEventListener("DOMContentLoaded", getUserLocation());

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function getHostFromURL() {
  const referrer = document.referrer;

  if (referrer.length === 0) return referrer;

  const parsedURL = new URL(document.referrer);

  const getSplitStr = parsedURL.hostname.split(".");

  if (getSplitStr.length < 2) return getSplitStr.toString();

  const host = parsedURL.hostname.split(".")[1];

  return host;
}

function checkClickId() {
  const keys = ["gclid", "gbraid", "wbraid", "msclkid", "fbclid"];
  
  for (const key of keys) {
    if (qs.has(key)) {
      qs.set("click_id", qs.get(key));
      qs.delete(key);
      break;
    }
  }

  return qs.has("click_id");
}

function getLeadChannel() {
  // No referrer means the user accessed the website directly
  if (document.referrer.length === 0) return "direct";

  // If we get to this point, it means that document.referrer is not empty
  if (qs.size === 0) {
    const host = getHostFromURL();

    qs.set("source", host);
    qs.set("medium", `${toTitleCase(host)} - SEO`);

    return "organic";
  }

  // Google Ads
  if (checkClickId()) return "paid";

  return "other";
}

function getUserLocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Success callback
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      },
      function (error) {
        console.error("Error getting user location:", error.message);
      },
      options
    );
  } else {
    console.error("Geolocation is not supported by your browser.");
  }
}

function handleCTAClick(e) {
  const language = navigator.language || navigator.userLanguage;

  const buttonName = e.target.getAttribute("name");
  // This set method must be first in order for the getLeadChannel logic to work correctly
  // Because it checks that all qs.entries are of length 0 ('meaning organic traffic')
  // It also checks document.referrer to differentiate direct vs organic
  var data = JSON.parse(localStorage.getItem("user")) || {};

  if (Object.keys(data).length === 0) {
    data.landingPage = window.location.href;
    data.referrer = document.referrer;
    data.trafficSource = getLeadChannel();
    localStorage.setItem("user", JSON.stringify(data));
  }

  qs.set("landing_page", data.landingPage);
  qs.set("referrer", data.referrer);
  qs.set("channel", data.trafficSource);
  qs.set("channel", getLeadChannel());
  qs.set("landing_page", window.location.href);
  qs.set("button_clicked", buttonName);
  qs.set("longitude", longitude);
  qs.set("latitude", latitude);
  qs.set("language", language);

  const currentDomain = new URL(window.location.origin + "/quote");

  currentDomain.search = qs.toString();

  window.location.replace(currentDomain.href);
}

function applyButtonlogic() {
  let quoteButtons = document.querySelectorAll(".quoteButton");

  quoteButtons.forEach((button) => {
    let children = button.children;
    Array.from(children).forEach((child) => {
      child.setAttribute("name", button.name);
    });

    button.addEventListener("click", handleCTAClick);
  });
};

applyButtonlogic();
