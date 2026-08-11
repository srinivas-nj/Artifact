// PROFILE PHOTO PREVIEW

const photoInput = document.getElementById("photo");

if (photoInput) {

    photoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById("resumePhoto").src = e.target.result;

        };

        reader.readAsDataURL(file);

    });

}

// GENERATE RESUME

function generateResume() {

//    PERSONAL DETAILS

    document.getElementById("rName").innerText =document.getElementById("name").value || "Your Name";

    document.getElementById("rTitle").innerText =document.getElementById("title").value || "Professional Title";

    document.getElementById("rEmail").innerText =document.getElementById("email").value;

    document.getElementById("rPhone").innerText =document.getElementById("phone").value;

    document.getElementById("rAddress").innerText =document.getElementById("address").value;

//  SUMMARY

    document.getElementById("rSummary").innerText =document.getElementById("summary").value;

    // OBJECTIVE

    document.getElementById("rObjective").innerText =document.getElementById("objective").value;

  //  EDUCATION

    document.getElementById("rDegree").innerText =document.getElementById("degree").value;

    document.getElementById("rCollege").innerText =document.getElementById("college").value;

    document.getElementById("rYear").innerText =document.getElementById("year").value;

    document.getElementById("rCgpa").innerText =document.getElementById("cgpa").value;

    // EXPERIENCE

    document.getElementById("rExperience").innerText =document.getElementById("experience").value;

   
    // LANGUAGES
   

    document.getElementById("rLanguages").innerText =document.getElementById("languages").value;

    
    // LINKS
   

    const github = document.getElementById("github").value;

    const linkedin = document.getElementById("linkedin").value;

    const portfolio = document.getElementById("portfolio").value;

    document.getElementById("rGithub").href = github || "#";
    document.getElementById("rGithub").innerText = github || "GitHub Profile";

    document.getElementById("rLinkedin").href = linkedin || "#";
    document.getElementById("rLinkedin").innerText = linkedin || "LinkedIn Profile";

    document.getElementById("rPortfolio").href = portfolio || "#";
    document.getElementById("rPortfolio").innerText = portfolio || "Portfolio Website";

    
    // SKILLS
   

    let skillHTML = "";

    const skills = document.getElementById("skills").value;

    skills.split(",").forEach(function(skill){

        skill = skill.trim();

        if(skill !== ""){

            skillHTML +=
            `<span class="skill-badge">${skill}</span>`;

        }

    });

    document.getElementById("rSkills").innerHTML = skillHTML;

  
    // PROJECTS
   

    let projectHTML = "";

    const projects = document.getElementById("projects").value;

    projects.split(",").forEach(function(project){

        project = project.trim();

        if(project !== ""){

            projectHTML +=
            `
            <div class="project-card">

                <h4>${project}</h4>

            </div>
            `;

        }

    });

    document.getElementById("rProjects").innerHTML = projectHTML;

    
    // CERTIFICATES
    

    let certificateHTML = "";

    const certificates =
        document.getElementById("certifications").value;

    certificates.split(",").forEach(function(item){

        item = item.trim();

        if(item !== ""){

            certificateHTML +=
            `
            <div class="certificate-item">

                <i class="fa-solid fa-certificate"></i>

                ${item}

            </div>
            `;

        }

    });

    document.getElementById("rCertifications").innerHTML =
    certificateHTML;

    
    // ACHIEVEMENTS
  

    let achievementHTML = "";

    const achievements =
        document.getElementById("achievements").value;

    achievements.split(",").forEach(function(item){

        item = item.trim();

        if(item !== ""){

            achievementHTML +=
            `
            <div class="achievement-item">

                <i class="fa-solid fa-trophy"></i>

                ${item}

            </div>
            `;

        }

    });

    document.getElementById("rAchievements").innerHTML =
    achievementHTML;

}

// AI SUMMARY GENERATOR


function generateSummary() {

    const title = document.getElementById("title").value.trim();
    const skills = document.getElementById("skills").value.trim();

    let summary =
    `Highly motivated ${title || "Computer Science Student"} with strong knowledge of ${skills || "modern technologies"}. Passionate about developing high-quality software solutions, solving real-world problems, and continuously learning emerging technologies.`;

    document.getElementById("summary").value = summary;

    generateResume();

}


// AI CAREER OBJECTIVE


function generateObjective() {

    document.getElementById("objective").value =
    "Seeking a challenging opportunity where I can apply my technical knowledge, enhance my skills, contribute to organizational success, and grow professionally.";

    generateResume();

}


// RESUME SCORE


function calculateResumeScore(){

    const fields = [

        "name","title","email","phone","address",

        "summary","objective",

        "degree","college","year","cgpa",

        "skills","experience","projects",

        "certifications","achievements",

        "languages","github","linkedin","portfolio"

    ];

    let completed = 0;

    fields.forEach(function(id){

        if(document.getElementById(id).value.trim() !== ""){

            completed++;

        }

    });

    let score = Math.round((completed / fields.length) * 100);

    document.getElementById("resumeScore").innerText = score + "%";
    document.getElementById("previewResumeScore").innerText = score + "%";

    document.getElementById("scoreProgress").style.width = score + "%";
    document.getElementById("previewResumeProgress").style.width = score + "%";

}


// ATS SCORE


function calculateATS(){

    let ats = 40;

    if(document.getElementById("skills").value.trim() !== "") ats += 15;

    if(document.getElementById("projects").value.trim() !== "") ats += 15;

    if(document.getElementById("experience").value.trim() !== "") ats += 10;

    if(document.getElementById("certifications").value.trim() !== "") ats += 10;

    if(document.getElementById("github").value.trim() !== "") ats += 5;

    if(document.getElementById("linkedin").value.trim() !== "") ats += 5;

    if(ats > 100){

        ats = 100;

    }

    document.getElementById("atsScore").innerText = ats + "%";
    document.getElementById("previewATSScore").innerText = ats + "%";

    document.getElementById("atsProgress").style.width = ats + "%";
    document.getElementById("previewATSProgress").style.width = ats + "%";

    if(ats >= 90){

        document.getElementById("atsMessage").innerText =
        "Excellent ATS Compatibility.";

    }

    else if(ats >= 70){

        document.getElementById("atsMessage").innerText =
        "Good ATS Compatibility.";

    }

    else{

        document.getElementById("atsMessage").innerText =
        "Improve your resume by adding more information.";

    }

}

// RESUME COMPLETION


function calculateCompletion(){

    const total = document.querySelectorAll("input,textarea").length;

    let filled = 0;

    document.querySelectorAll("input,textarea").forEach(function(field){

        if(field.value.trim() !== ""){

            filled++;

        }

    });

    let completion = Math.round((filled / total) * 100);

    document.getElementById("completionScore").innerText =
    completion + "%";

    document.getElementById("previewCompletionScore").innerText =
    completion + "%";

    document.getElementById("completionProgress").style.width =
    completion + "%";

    document.getElementById("previewCompletionProgress").style.width =
    completion + "%";

}


// ANALYTICS


function updateAnalytics(){

    document.getElementById("skillCount").innerText =
    document.getElementById("skills").value
    .split(",")
    .filter(item=>item.trim()!="").length;

    document.getElementById("projectCount").innerText =
    document.getElementById("projects").value
    .split(",")
    .filter(item=>item.trim()!="").length;

    document.getElementById("certificateCount").innerText =
    document.getElementById("certifications").value
    .split(",")
    .filter(item=>item.trim()!="").length;

}

// THEME COLOR


document.getElementById("themeColor").addEventListener("input",function(){

    document.documentElement.style.setProperty(
        "--primary",
        this.value
    );

});


// FONT SELECTOR


document.getElementById("fontSelector").addEventListener("change",function(){

    document.body.style.fontFamily = this.value;

});


// TEMPLATE SWITCHER


document.getElementById("templateSelector").addEventListener("change",function(){

    const preview = document.getElementById("resumePreview");

    preview.classList.remove(
        "professional-template",
        "modern-template",
        "creative-template"
    );

    preview.classList.add(this.value + "-template");

});


// QR CODE


function generateQRCode(){

    const qrBox = document.getElementById("qrCode");

    qrBox.innerHTML = "";

    let link =
    document.getElementById("qrLink").value.trim() ||

    document.getElementById("portfolio").value.trim() ||

    document.getElementById("github").value.trim();

    if(link===""){

        qrBox.innerHTML="<p>No QR Code Available</p>";

        return;

    }

    new QRCode(qrBox,{

        text:link,

        width:140,

        height:140

    });

}


// REFRESH ALL


function refreshResume(){

    generateResume();

    calculateResumeScore();

    calculateATS();

    calculateCompletion();

    updateAnalytics();

    generateQRCode();

}

// DOWNLOAD PDF


function downloadPDF() {

    const resume = document.getElementById("resumePreview");

    const options = {

        margin: 0.5,

        filename: "Professional_Resume.pdf",

        image: {

            type: "jpeg",

            quality: 1

        },

        html2canvas: {

            scale: 2

        },

        jsPDF: {

            unit: "in",

            format: "a4",

            orientation: "portrait"

        }

    };

    html2pdf()

        .set(options)

        .from(resume)

        .save();

}

// PRINT RESUME


function printResume() {

    window.print();

}


// COPY RESUME LINK


function copyResumeLink() {

    const portfolio =
        document.getElementById("portfolio").value.trim();

    const github =
        document.getElementById("github").value.trim();

    const link = portfolio || github;

    if (link === "") {

        alert("Please enter your Portfolio or GitHub URL.");

        return;

    }

    navigator.clipboard.writeText(link)

    .then(function () {

        alert("Resume link copied successfully!");

    })

    .catch(function () {

        alert("Unable to copy the link.");

    });

}


// SHARE RESUME


function shareResume() {

    const portfolio =
        document.getElementById("portfolio").value.trim();

    const github =
        document.getElementById("github").value.trim();

    const link = portfolio || github;

    if (link === "") {

        alert("Please enter your Portfolio or GitHub URL.");

        return;

    }

    if (navigator.share) {

        navigator.share({

            title: "My Professional Resume",

            text: "Check out my professional resume.",

            url: link

        });

    }

    else {

        copyResumeLink();

    }

}


// CLEAR FORM


function clearForm() {

    if (!confirm("Are you sure you want to clear the form?")) {

        return;

    }

    document.querySelectorAll("input, textarea").forEach(function (field) {

        if (field.type !== "color") {

            field.value = "";

        }

    });

    document.getElementById("resumePhoto").src =
        "images/default-profile.png";

    document.getElementById("qrCode").innerHTML = "";

    document.getElementById("rSkills").innerHTML = "";
    document.getElementById("rProjects").innerHTML = "";
    document.getElementById("rCertifications").innerHTML = "";
    document.getElementById("rAchievements").innerHTML = "";

    document.getElementById("rName").innerText = "Your Name";
    document.getElementById("rTitle").innerText = "Professional Title";

    document.getElementById("rEmail").innerText = "";
    document.getElementById("rPhone").innerText = "";
    document.getElementById("rAddress").innerText = "";

    document.getElementById("rSummary").innerText = "";
    document.getElementById("rObjective").innerText = "";

    document.getElementById("rDegree").innerText = "";
    document.getElementById("rCollege").innerText = "";
    document.getElementById("rYear").innerText = "";
    document.getElementById("rCgpa").innerText = "";

    document.getElementById("rExperience").innerText = "";
    document.getElementById("rLanguages").innerText = "";

    document.getElementById("rGithub").innerText = "GitHub Profile";
    document.getElementById("rGithub").href = "#";

    document.getElementById("rLinkedin").innerText = "LinkedIn Profile";
    document.getElementById("rLinkedin").href = "#";

    document.getElementById("rPortfolio").innerText = "Portfolio Website";
    document.getElementById("rPortfolio").href = "#";

    document.getElementById("resumeScore").innerText = "0%";
    document.getElementById("previewResumeScore").innerText = "0%";

    document.getElementById("atsScore").innerText = "0%";
    document.getElementById("previewATSScore").innerText = "0%";

    document.getElementById("completionScore").innerText = "0%";
    document.getElementById("previewCompletionScore").innerText = "0%";

    document.getElementById("skillCount").innerText = "0";
    document.getElementById("projectCount").innerText = "0";
    document.getElementById("certificateCount").innerText = "0";

    document.getElementById("scoreProgress").style.width = "0%";
    document.getElementById("atsProgress").style.width = "0%";
    document.getElementById("completionProgress").style.width = "0%";

    document.getElementById("previewResumeProgress").style.width = "0%";
    document.getElementById("previewATSProgress").style.width = "0%";
    document.getElementById("previewCompletionProgress").style.width = "0%";

    document.getElementById("atsMessage").innerText =
        "Fill all required details to improve your ATS score.";

    localStorage.removeItem("resumeData");

}

// DARK MODE


function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );

}


// SAVE DATA


function saveResumeData() {

    const fields = {};

    document.querySelectorAll("input, textarea, select").forEach(function (field) {

        fields[field.id] = field.value;

    });

    localStorage.setItem(
        "resumeData",
        JSON.stringify(fields)
    );

}


// LOAD DATA


function loadResumeData() {

    const saved = localStorage.getItem("resumeData");

    if (!saved) return;

    const data = JSON.parse(saved);

    Object.keys(data).forEach(function (id) {

        const field = document.getElementById(id);

        if (field) {

            field.value = data[id];

        }

    });

    refreshResume();

}


// LIVE UPDATE


document.querySelectorAll("input, textarea, select").forEach(function (field) {

    field.addEventListener("input", function () {

        refreshResume();

        saveResumeData();

    });

});


// RESTORE DARK MODE


if (localStorage.getItem("darkMode") === "true") {

    document.body.classList.add("dark-mode");

}


// INITIAL LOAD


window.onload = function () {

    loadResumeData();

    refreshResume();

};


// DEFAULT BUTTONS


document.addEventListener("DOMContentLoaded", function () {

    const generateButton = document.querySelector(
        ".generate-btn"
    );

    if (generateButton) {

        generateButton.addEventListener(
            "click",
            refreshResume
        );

    }

});


// KEYBOARD SHORTCUTS


document.addEventListener("keydown", function (e) {

    // Ctrl + S
    if (e.ctrlKey && e.key === "s") {

        e.preventDefault();

        saveResumeData();

        alert("Resume Saved!");

    }

    // Ctrl + P
    if (e.ctrlKey && e.key === "p") {

        e.preventDefault();

        printResume();

    }

});


// AUTO REFRESH


setInterval(function () {

    calculateResumeScore();

    calculateATS();

    calculateCompletion();

    updateAnalytics();

}, 1000);


// PROJECT READY


console.log("======================================");
console.log(" AI Resume Builder Loaded Successfully");
console.log(" Version : 1.0");
console.log(" ATS Analysis : Enabled");
console.log(" Resume Score : Enabled");
console.log(" QR Code : Enabled");
console.log(" Auto Save : Enabled");
console.log(" Dark Mode : Enabled");
console.log(" PDF Download : Enabled");
console.log("======================================");