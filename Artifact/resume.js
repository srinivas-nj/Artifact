// AI RESUME BUILDER

const defaultProfileImage = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'>
    <rect width='300' height='300' fill='#e8efff'/>
    <circle cx='150' cy='110' r='56' fill='#93b4ff'/>
    <rect x='72' y='185' width='156' height='72' rx='18' fill='#93b4ff'/>
</svg>
`);

// GENERATE RESUME
function generateResume() {

    // =========================
    // PERSONAL DETAILS
    // =========================

    let name = document.getElementById("name").value.trim();
    let title = document.getElementById("title").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let objective = document.getElementById("objective").value.trim();

// EDUCATION

    let degree = document.getElementById("degree").value.trim();
    let college = document.getElementById("college").value.trim();
    let year = document.getElementById("year").value.trim();
    let cgpa = document.getElementById("cgpa").value.trim();

// PROFESSIONAL DETAILS

    let skills = document.getElementById("skills").value.trim();
    let experience = document.getElementById("experience").value.trim();
    let projects = document.getElementById("projects").value.trim();
    let certifications = document.getElementById("certifications").value.trim();
    let achievements = document.getElementById("achievements").value.trim();
    let languages = document.getElementById("languages").value.trim();

//   SOCIAL LINKS

    let github = document.getElementById("github").value.trim();
    let linkedin = document.getElementById("linkedin").value.trim();
    let portfolio = document.getElementById("portfolio").value.trim();

    // UPDATE BASIC DETAILS

  document.getElementById("rName").innerText =
    name || "Your Name";

document.getElementById("rTitle").innerText =
    title || "Professional Title";

document.getElementById("rEmail").innerText = email;

document.getElementById("rPhone").innerText = phone;

document.getElementById("rAddress").innerText = address;

document.getElementById("rObjective").innerText =
    objective || "Your career objective will appear here.";

// UPDATE EDUCATION

document.getElementById("rDegree").innerText = degree;

document.getElementById("rCollege").innerText = college;

document.getElementById("rYear").innerText = year;

document.getElementById("rCgpa").innerText = cgpa;

// SKILL BADGES

    let skillArray = skills.split(",");

    let skillHTML = "";

    skillArray.forEach(function(skill){

        if(skill.trim() !== ""){

            skillHTML += `
                <span class="skill-badge">
                    ${skill.trim()}
                </span>
            `;

        }

    });

    document.getElementById("rSkills").innerHTML = skillHTML;

    // PROJECT CARDS

    let projectArray = projects.split(",");

    let projectHTML = "";

    projectArray.forEach(function(project){

        if(project.trim() !== ""){

            projectHTML += `
                <div class="project-card">
                    <h4>${project.trim()}</h4>
                    <p>Personal Project</p>
                </div>
            `;

        }

    });

    document.getElementById("rProjects").innerHTML = projectHTML;

    // PROJECT CARDS

    let certificateArray = certifications.split(",");

    let certificateHTML = "";

    certificateArray.forEach(function(certificate){

        if(certificate.trim() !== ""){

            certificateHTML += `
                <div class="certificate-item">
                    <i class="fa-solid fa-certificate"></i>
                    ${certificate.trim()}
                </div>
            `;

        }

    });

    document.getElementById("rCertifications").innerHTML = certificateHTML;

    // ACHIEVEMENTS

    let achievementArray = achievements.split(",");

    let achievementHTML = "";

    achievementArray.forEach(function(achievement){

        if(achievement.trim() !== ""){

            achievementHTML += `
                <div class="achievement-item">
                    <i class="fa-solid fa-trophy"></i>
                    ${achievement.trim()}
                </div>
            `;

        }

    });

    document.getElementById("rAchievements").innerHTML = achievementHTML;

    // LANGUAGES

    document.getElementById("rLanguages").innerText = languages;

    // GITHUB

    document.getElementById("rGithub").href = github ? (github.startsWith("http") ? github : "https://" + github) : "#";
    document.getElementById("rGithub").innerText = github;

    // LINKEDIN

    document.getElementById("rLinkedin").href = linkedin ? (linkedin.startsWith("http") ? linkedin : "https://" + linkedin) : "#";
    document.getElementById("rLinkedin").innerText = linkedin;

    // PORTFOLIO

    document.getElementById("rPortfolio").href =
    portfolio ? (portfolio.startsWith("http") ? portfolio : "https://" + portfolio) : "#";

   document.getElementById("rPortfolio").innerText = portfolio;

    // EXPERIENCE

    document.getElementById("rExperience").innerText =
        experience;

    // AUTO SAVE

    localStorage.setItem("resumeData", JSON.stringify({

        name,
        title,
        email,
        phone,
        address,
        objective,
        degree,
        college,
        year,
        cgpa,
        skills,
        experience,
        projects,
        certifications,
        achievements,
        languages,
        github,
        linkedin,
        portfolio

    }));

    //  SUCCESS MESSAGE

} // End of generateResume()


// LOAD SAVED DATA

window.onload = function(){

    document.getElementById("resumePhoto").src = defaultProfileImage;

    let savedData = JSON.parse(localStorage.getItem("resumeData"));

    if(savedData){

        document.getElementById("name").value = savedData.name || "";
        document.getElementById("title").value = savedData.title || "";
        document.getElementById("email").value = savedData.email || "";
        document.getElementById("phone").value = savedData.phone || "";
        document.getElementById("address").value = savedData.address || "";
        document.getElementById("objective").value = savedData.objective || "";

        document.getElementById("degree").value = savedData.degree || "";
        document.getElementById("college").value = savedData.college || "";
        document.getElementById("year").value = savedData.year || "";
        document.getElementById("cgpa").value = savedData.cgpa || "";

        document.getElementById("skills").value = savedData.skills || "";
        document.getElementById("experience").value = savedData.experience || "";
        document.getElementById("projects").value = savedData.projects || "";
        document.getElementById("certifications").value = savedData.certifications || "";
        document.getElementById("achievements").value = savedData.achievements || "";
        document.getElementById("languages").value = savedData.languages || "";

        document.getElementById("github").value = savedData.github || "";
        document.getElementById("linkedin").value = savedData.linkedin || "";
        document.getElementById("portfolio").value = savedData.portfolio || "";

        generateResume();

    }

};


// PHOTO UPLOAD

document.getElementById("photo").addEventListener("change", function(event){

    const file = event.target.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            document.getElementById("resumePhoto").src = e.target.result;

        };

        reader.readAsDataURL(file);

    }

});


// PRINT RESUME
function printResume(){

    window.print();

}

// DOWNLOAD PDF
function downloadPDF(){

    const resumeName = document.getElementById("name").value.trim()
        .replace(/[^\w-]+/g, "-") || "resume";

    if(typeof html2pdf !== "function"){

        printResume();
        return;

    }

    html2pdf()
        .set({
            filename: `${resumeName}.pdf`,
            margin: 0.35,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        })
        .from(document.querySelector(".resume-preview"))
        .save();

}

// CLEAR FORM

function clearForm(){

    // Clear Form Inputs
    document.getElementById("name").value = "";
    document.getElementById("title").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("objective").value = "";

    document.getElementById("degree").value = "";
    document.getElementById("college").value = "";
    document.getElementById("year").value = "";
    document.getElementById("cgpa").value = "";

    document.getElementById("skills").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("projects").value = "";
    document.getElementById("certifications").value = "";
    document.getElementById("achievements").value = "";
    document.getElementById("languages").value = "";

    document.getElementById("github").value = "";
    document.getElementById("linkedin").value = "";
    document.getElementById("portfolio").value = "";
    document.getElementById("photo").value = "";

    // Reset Preview
    document.getElementById("resumePhoto").src = defaultProfileImage;

    document.getElementById("rName").innerText = "Your Name";
    document.getElementById("rTitle").innerText = "Professional Title";

    document.getElementById("rEmail").innerText = "";
    document.getElementById("rPhone").innerText = "";
    document.getElementById("rAddress").innerText = "";

    document.getElementById("rObjective").innerText =
        "Your career objective will appear here.";

    document.getElementById("rDegree").innerText = "";
    document.getElementById("rCollege").innerText = "";
    document.getElementById("rYear").innerText = "";
    document.getElementById("rCgpa").innerText = "";

    document.getElementById("rSkills").innerHTML = "";
    document.getElementById("rExperience").innerText = "";
    document.getElementById("rProjects").innerHTML = "";
    document.getElementById("rCertifications").innerHTML = "";
    document.getElementById("rAchievements").innerHTML = "";
    document.getElementById("rLanguages").innerText = "";

    document.getElementById("rGithub").href = "#";
    document.getElementById("rGithub").innerText = "Not Added";

    document.getElementById("rLinkedin").href = "#";
    document.getElementById("rLinkedin").innerText = "Not Added";

    document.getElementById("rPortfolio").href = "#";
    document.getElementById("rPortfolio").innerText = "Not Added";

    // Remove Saved Data
    localStorage.removeItem("resumeData");

    alert("Form Cleared Successfully!");

}


// DARK MODE

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        darkBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i> Light Mode';

    }

    else{

        darkBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i> Dark Mode';

    }

});


// KEYBOARD SHORTCUT

document.addEventListener("keydown", function(event){

    if(event.ctrlKey && event.key.toLowerCase() === "p"){

        event.preventDefault();

        printResume();

    }

});


                //  END OF PROJECT