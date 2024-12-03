var form = document.getElementById('resumeForm');
var resumeDisplayElement = document.getElementById('resumeOutput');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareabLeLinkElement = document.getElementById('shareable-link');
var downloadPDFButton = document.getElementById('download-pdf');
if (form && resumeDisplayElement && shareableLinkContainer && downloadPDFButton) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var usernameElement = document.getElementById('username');
        var nameElement = document.getElementById('name');
        var emailElement = document.getElementById('email');
        var educationElement = document.getElementById('education');
        var experienceElement = document.getElementById('experience');
        var skillsElement = document.getElementById('skills');
        var descriptionElement = document.getElementById('description');
        if (usernameElement && nameElement && emailElement && educationElement &&
            experienceElement && skillsElement && descriptionElement) {
            var username = usernameElement.value;
            var name_1 = nameElement.value;
            var email = emailElement.value;
            var education = educationElement.value;
            var experience = experienceElement.value;
            var skills = skillsElement.value;
            var description = descriptionElement.value;
            // Create resume data 
            var resumeData = {
                name: name_1,
                email: email,
                education: education,
                experience: experience,
                skills: skills,
                description: description
            };
            localStorage.setItem(username, JSON.stringify(resumeData));
            var resumeHTML = "\n\n    <h2>Personal Information</h2>\n    <p><strong>Name:</strong> ".concat(name_1, "</p>\n    <p><strong>Email:</strong> ").concat(email, "</p>\n    <p><strong>Education:</strong> ").concat(education, "</p>\n    <p><strong>Experience:</strong> ").concat(experience, "</p>\n    <p><strong>Skills:</strong> ").concat(skills, "</p>\n    <p><strong>Description:</strong> ").concat(description, "</p>\n\n    ");
            resumeDisplayElement.innerHTML = resumeHTML;
            var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
            shareableLinkContainer.style.display = "block";
            shareabLeLinkElement.href = shareableURL;
            shareabLeLinkElement.textContent = shareableURL;
        }
    });
    downloadPDFButton.addEventListener("click", function () {
        window.print();
    });
}
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
            document.getElementById('description').value = resumeData.description;
        }
    }
});
