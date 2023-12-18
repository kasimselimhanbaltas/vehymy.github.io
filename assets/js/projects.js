import { getComponents } from './components.js'

const projects = [
  {
    projectId: 1,
    projectName: "Baltaş Auto Gallery",

    description: "This is my favorite project that I have completed and periodically made improvements on. While researching data for the backend of this project, I signed up for a website and obtained a CSV file with approximately 70,000 car records. Using Python, I created a table from this CSV file. The data in this table was very complex, so I used normalization techniques to create 7 tables from 1 and removed some unnecessary columns. With the Selenium module in Python, I saved approximately 10 images for each car from Google Images, totaling more than 65,000 images into my Postgres database. Initially, I used Python's pyautogui module for this image-saving process, but Selenium's ability to run in the background saved me a lot of time.",
    images: [
      "assets/images/projects/c11.PNG",
      "assets/images/projects/c12.PNG",
      "assets/images/projects/c13.PNG",
      "assets/images/projects/c14.PNG",
      "assets/images/projects/c15.PNG",
    ],
    githubLink: "",
  },
  {
    projectId: 2,
    projectName: "Car Gallery Management System",
    description: "This project is an enhanced version of the previous project, with an improved database. Additionally, I designed a system for a car dealership and its dealers. I added many functions, such as adding and removing dealers, buying and selling cars, saving customers datas, hiring or firing employees, and more. To save a car, I created a registration screen using the car data I prepared in my previous project. When selecting a car model to register, default values are automatically filled in, and the fields that need to be changed (such as repair history or mileage for a second hand car) can be edited, speeding up the process.",
    images: [
      "assets/images/projects/cc1.PNG",
      "assets/images/projects/cc2.PNG",
      "assets/images/projects/cc3.PNG",
      "assets/images/projects/cc4.PNG",
      "assets/images/projects/cc5.PNG",
      "assets/images/projects/cc6.PNG",
    ],
    githubLink: "",
  },
  {
    projectId: 3,
    projectName: "Earth Info",
    description: "This is the first web project I finished. During my first internship, I learned a lot. I developed a full-stack web application and then fully dockerized the project. Initially, I created a database dump file and restored my local database inside the Postgres container. After that, I created a Postgres image. I also generated a JAR file with Maven wrapper for my backend and then used it to create a Java image. Finally, I built my Vue.js project using npm and created a Node.js image. I published all of these images on Docker Hub. Lastly, I created a docker-compose file to run all the images as containers that are connected to each other via appropriate ports.",
    images: [
      "assets/images/projects/ei1.PNG",
      "assets/images/projects/ei2.PNG",
    ],
    githubLink: "",
  },
  {
    projectId: 4,
    projectName: "Visual Exploration Assistant",
    description: "This project is a mobile application that my two friends and I developed during our Introduction to Artificial Intelligence course in school. Using an artificial intelligence model that covers certain objects in our campus, the app is designed to help visually impaired people by identifying and providing information on the objects they encounter while walking, such as their type, direction, and distance. To prepare the dataset for this project, we took a total of 2139 photos of objects in our school, such as doors, banks, and stairs, and manually labeled them for higher accuracy. We then integrated the labeled photos into our mobile application. To maximize the output of our model, we used the label location and size when an object is detected to provide more detailed guidance to visually impaired users.",
    images: [
      "assets/images/projects/bg1.PNG",
      "assets/images/projects/bg2.PNG",
      "assets/images/projects/bg3.PNG",
      "assets/images/projects/bg4.PNG"
    ],
    githubLink: "",
  },
]

window.onload = function () {
  getComponents();

  let currentProjectIndex = 0; // Şu anki proje dizindeki ilk proje
  let imageIndex = 0;
  const projectContainer = document.getElementById("project-container");
  const projectName = document.getElementById("project-name");
  const projectImage = document.getElementById("project-image");
  const imageNumber = document.getElementById("image-info");
  const projectDescription = document.getElementById("project-description");
  const projectGithub = document.getElementById("project-github");
  const projectNumber = document.getElementById("project-number");


  function showProject() {
    window.currentProject = projects[currentProjectIndex];
    projectName.innerHTML = currentProject.projectName;

    projectImage.src = currentProject.images[imageIndex];
    imageNumber.innerHTML = imageIndex + 1 + "/" + currentProject.images.length;

    projectDescription.innerHTML = currentProject.description;
    projectGithub.href = currentProject.githubLink;

    projectNumber.innerHTML = currentProjectIndex + 1 + "/" + projects.length;
  }


  showProject();

  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  //const container = document.getElementById("project-images");

  nextBtn.addEventListener("click", () => {

    // // Delete all img's of previous project 
    // while (container.firstChild) {
    //   container.removeChild(container.firstChild);
    // }


    imageIndex = 0;

    currentProjectIndex++;
    if (currentProjectIndex >= projects.length) {
      currentProjectIndex = 0;
    }
    showProject();
  });

  prevBtn.addEventListener("click", () => {

    imageIndex = 0;

    currentProjectIndex--;
    if (currentProjectIndex < 0) {
      currentProjectIndex = projects.length - 1;
    }
    showProject();
  });

  const nextImageBtn = document.getElementById("image-next-btn");
  const prevImageBtn = document.getElementById("image-prev-btn");
  //const container = document.getElementById("project-images");

  nextImageBtn.addEventListener("click", () => {

    // // Delete all img's of previous project 
    // while (container.firstChild) {
    //   container.removeChild(container.firstChild);
    // }
    imageIndex++;
    if (imageIndex >= currentProject.images.length) {
      imageIndex = 0;
    }
    showProject();
  });

  prevImageBtn.addEventListener("click", () => {

    imageIndex--;
    if (imageIndex < 0) {
      imageIndex = currentProject.images.length - 1;
    }
    showProject();
  });

}


