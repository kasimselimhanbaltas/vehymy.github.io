export function getComponents() {
    const myNav = document.getElementById('myNav');
    const navGame = document.getElementById("navGame");
    let activeClassH = "";
    let activeClassP = "";
    let activeClassS = "";
    const fileName = location.pathname.split('/').pop();
    console.log("file:", fileName);
    if(fileName === "projects.html")
        activeClassP = "active"
    
    else if(fileName === "skills.html")
        activeClassS = "active"
    else  
        activeClassH = "active"
    
    myNav.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <a href="/" class="navbar-brand ms-5 pt-0">
                <img src="assets/images/sb.png" class="brand" style="height: 3vh;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li id="navHome" class="nav-item">
                        <a class="nav-link ${activeClassH}" href="/index.html">Home</a>
                    </li>
                    <li id="navProjects" class="nav-item">
                        <a class="nav-link ${activeClassP}" href="/projects.html">Projects</a>
                    </li>
                    <li id="navSkills" class="nav-item">
                        <a class="nav-link ${activeClassS}" href="/skills.html">Skills</a>
                    </li>
                    <li id="navGame" class="nav-item">
                        <a class="nav-link" href="/game.html">Mini Game</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" target="blank"
                            href="https://www.linkedin.com/in/kas%C4%B1m-selimhan-balta%C5%9F-2b3832201/"><img
                                src="assets/images/linkedin.png" alt=""></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="blank" href="mailto:selimhanbaltas@gmail.com"><img
                                src="assets/images/gmail.png" alt=""></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="blank" href="https://github.com/kasimselimhanbaltas"><img
                                src="assets/images/github.png" alt=""></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `;



}



