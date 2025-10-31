const form = document.querySelector(".search-bar");

const contentContainer = document.querySelector(".searched-content");
const Card = document.querySelector(".searched-content .card");
const Text = document.querySelector(".text");

const URLs = [
  "https://yoga-api-nzy4.onrender.com/v1/categories",
  "https://yoga-api-nzy4.onrender.com/v1/categories?id=",
  "https://yoga-api-nzy4.onrender.com/v1/categories?name=value",
  "https://yoga-api-nzy4.onrender.com/v1/categories?id=value&level=value",
  "https://yoga-api-nzy4.onrender.com/v1/poses",
  "https://yoga-api-nzy4.onrender.com/v1/poses?id=value",
  "https://yoga-api-nzy4.onrender.com/v1/poses?name=",
  "https://yoga-api-nzy4.onrender.com/v1/poses?level=",
];


async function content() {
  const response = await fetch(CategoryAPI);
  const data = await response.json();
  console.log(data);
  contentContainer.innerHTML = "";
  data.forEach((category) => {});
}

async function CategoryList() {
  const response = await fetch(
    "https://yoga-api-nzy4.onrender.com/v1/categories"
  );
  const data = await response.json();
  console.log(data);
  const Select = document.querySelector("#category");
  data.forEach((category) => {
    const option = document.createElement("option");
    option.text = category.category_name;
    option.title = category.category_description;
    option.value = category.id;
    Select.appendChild(option);
  });
}

CategoryList();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector("#cat_lev").innerHTML = "";
  const Input = document.querySelector("#pose-name").value;
  const CategorySelect = document.querySelector("#category").value;
  console.log(CategorySelect.value);

  const levelSelect = document.querySelector("#difficulty").value;
  if (Input === "" && CategorySelect === "" && levelSelect === "") {
    alert("Please enter a pose name");
    return;
  } else if (Input || CategorySelect || levelSelect) {
    if (Input) PoseFetch(Input);
    if (CategorySelect) {
      CategoryFetch(CategorySelect);
    }
    if (levelSelect) {
      levelFetch(levelSelect);
    }
  }
});

async function PoseFetch(name) {
  const pose_url = URLs[6] + name;
  try {
    let response = await fetch(pose_url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    CardRender(data);
  } catch (error) {
    console.error("Fetch Error :-S", error);
    form.reset();
    alert("Unable to fetch poses");
    return;
  }
}

async function CategoryFetch(name) {
  const category_url = URLs[1] + name;
  try {
    let response = await fetch(category_url);
    let data = await response.json();
    let posesArray = data.poses;
    document.querySelector("#cat_lev").innerHTML += `${data.category_name} | `;
    CardRender(posesArray);
  } catch (error) {
    alert("Unable to fetch poses, Try Again");
    return;
  }
}
async function levelFetch(name) {
  const level_url = URLs[7] + name;
  try {
    let response = await fetch(level_url);
    let data = await response.json();
    let posesArray = data.poses;
    document.querySelector("#cat_lev").innerHTML += data.difficulty_level;
    CardRender(posesArray);
  } catch (error) {
    alert("Unable to fetch poses, Try Again");
    return;
  }
}

async function CardRender(obj) {
  // Clear the content container
  contentContainer.innerHTML = "";
  let poses = Array.isArray(obj) ? obj : [obj];
  
  poses.forEach((pose) => {
    // Create main card
    let card = document.createElement("div");
    card.classList.add("card");

    // Create image container
    let imageBox = document.createElement("div");
    imageBox.classList.add("image_box");
    
    let image = document.createElement("img");
    image.src = pose.url_svg;
    image.alt = `${pose.english_name} and ${pose.sanskrit_name} poses`;
    
    imageBox.appendChild(image);

    // Create text container
    let textContainer = document.createElement("div");
    textContainer.classList.add("text");

    // Create pose title
    let poseTitle = document.createElement("h3");
    poseTitle.classList.add("pose-title");
    poseTitle.innerHTML = `${pose.english_name} | ${pose.sanskrit_name}`;

    // Create pose description
    let poseDesc = document.createElement("p");
    poseDesc.classList.add("pose-description");
    poseDesc.innerHTML = pose.pose_description;

    // Create benefits section
    let benefitsSection = document.createElement("div");
    benefitsSection.classList.add("benefits-section");

    let benefitsTitle = document.createElement("h4");
    benefitsTitle.classList.add("benefits-title");
    benefitsTitle.innerHTML = "Pose Benefits";

    let benefitsList = document.createElement("ul");
    benefitsList.classList.add("benefits-list");

    // Split benefits by period or comma and create list items
    let benefits = pose.pose_benefits
      .split(/[.,;]/)
      .map(benefit => benefit.trim())
      .filter(benefit => benefit.length > 0);

    benefits.forEach(benefit => {
      let listItem = document.createElement("li");
      listItem.innerHTML = benefit;
      benefitsList.appendChild(listItem);
    });

    // Append benefits elements
    benefitsSection.appendChild(benefitsTitle);
    benefitsSection.appendChild(benefitsList);

    // Append all elements to text container
    textContainer.appendChild(poseTitle);
    textContainer.appendChild(poseDesc);
    textContainer.appendChild(benefitsSection);

    // Append image box and text container to card
    card.appendChild(imageBox);
    card.appendChild(textContainer);

    // Append card to content container
    contentContainer.appendChild(card);
  });
}

function starter(){
  fetch("https://yoga-api-nzy4.onrender.com/v1/poses")
  fetch("https://yoga-api-nzy4.onrender.com/v1/poses")
  fetch("https://yoga-api-nzy4.onrender.com/v1/poses")
  fetch("https://yoga-api-nzy4.onrender.com/v1/poses")
}
starter()
