document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const container = document.getElementById("container");

  // Show content after loader
  setTimeout(() => {
    loader.style.display = "none";
    container.style.display = "block";
  }, 1000);

  // Get category containers
  const generalPurposeAI = document.getElementById("generalPurposeAI");
  const codingDevelopment = document.getElementById("codingDevelopment");
  const writingEditing = document.getElementById("writingEditing");
  const researchKnowledge = document.getElementById("researchKnowledge");
  const imageDesign = document.getElementById("imageDesign");
  const videoAudio = document.getElementById("videoAudio");
  const productivityBusiness = document.getElementById("productivityBusiness");
  const aiDeveloperPlatforms = document.getElementById("aiDeveloperPlatforms");

  // Fetch AI data
  fetch("./ai_data.json")
    .then((response) => response.json())
    .then((data) => {
      display(data.general_purpose_ai, generalPurposeAI);
      display(data.coding_development, codingDevelopment);
      display(data.writing_editing, writingEditing);
      display(data.research_knowledge, researchKnowledge);
      display(data.image_design, imageDesign);
      display(data.video_audio, videoAudio);
      display(data.ai_developer_platforms, aiDeveloperPlatforms);
      display(data.productivity_business, productivityBusiness);
    })
    .catch((error) => console.log("Error loading AI tools:", error));

  function display(data, container) {
    if (!container) return;
    data.forEach((tool) => {
      const Div = document.createElement("div");
      Div.className =
        "ai-tool bg-white rounded-xl shadow-lg p-4 mb-4 flex flex-col items-center justify-between hover-scale transition transform duration-300";
      Div.innerHTML = `
        <img src="${tool.icon}" alt="${tool.name}" class="h-16 mb-3" />
        <h3 class="font-semibold text-lg mb-2">${tool.name}</h3>
        <p class="text-sm text-gray-500 text-center">${tool.description}</p>
        <a href="${tool.link}" target="_blank" class="mt-3 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">Learn More</a>
      `;
      container.appendChild(Div);
    });
  }

  // Dark Mode Toggle
  const darkToggle = document.getElementById("darkToggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("bg-gray-900");
      document.querySelectorAll("h2").forEach((h2) => {
        h2.classList.toggle("text-white");
      });
    });
  }

  // Filter Buttons
  const general_container = document.getElementById("general");
  const writing_container = document.getElementById("writing");
  const coding_container = document.getElementById("coding");
  const image_container = document.getElementById("image");
  const developer_container = document.getElementById("developer");
  const video_container = document.getElementById("video");
  const research_container = document.getElementById("research");
  const productivity_container = document.getElementById("productivity");

  const containersMap = {
    all: [
      general_container,
      writing_container,
      coding_container,
      image_container,
      developer_container,
      video_container,
      research_container,
      productivity_container,
    ],
    general: [general_container],
    writing: [writing_container],
    coding: [coding_container],
    image: [image_container],
    video: [video_container],
    research: [research_container],
    business: [productivity_container],
    developer: [developer_container],
  };

  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category").trim();
      // Hide all first
      Object.values(containersMap)
        .flat()
        .forEach((c) => {
          if (c) c.style.display = "none";
        });
      // Show selected
      (containersMap[category] || []).forEach(
        (c) => (c.style.display = "block"),
      );
    });
  });
});
