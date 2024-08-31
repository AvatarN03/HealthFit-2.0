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
    let card = document.createElement("div");
    card.classList.add("card");

    let image = document.createElement("img");
    image.classList.add("image_box");
    image.src = pose.url_svg;
    image.alt = `${pose.english_name} pose image`;

    let textContainer = document.createElement("div");
    textContainer.classList.add("text");

    let head = document.createElement("h3");
    head.innerHTML = `${pose.english_name} | ${pose.sanskrit_name}`;

    let poseDesc = document.createElement("p");
    poseDesc.innerHTML = pose.pose_description;

    let hr = document.createElement("hr");

    let poseBenefits = document.createElement("p");
    poseBenefits.innerHTML = `Pose Benefits: ${pose.pose_benefits}`;

    // Append elements to the text container
    textContainer.appendChild(head);
    textContainer.appendChild(poseDesc);
    textContainer.appendChild(hr);
    textContainer.appendChild(poseBenefits);
    card.appendChild(image);
    card.appendChild(textContainer);

    contentContainer.appendChild(card);
  });
}
