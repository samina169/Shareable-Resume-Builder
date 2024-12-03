const form= document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resumeOutput') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareabLeLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPDFButton = document.getElementById('download-pdf') as HTMLButtonElement;

if (form && resumeDisplayElement && shareableLinkContainer && downloadPDFButton) {
form.addEventListener('submit', (event:Event) =>{
    event.preventDefault();

    const usernameElement =document.getElementById('username') as HTMLInputElement;
    const nameElement =document.getElementById('name') as HTMLInputElement;
    const emailElement=document.getElementById('email') as HTMLInputElement;
    const educationElement =document.getElementById('education') as HTMLInputElement;
    const experienceElement=document.getElementById('experience') as HTMLInputElement;
    const skillsElement=document.getElementById('skills') as HTMLInputElement;
    const descriptionElement=document.getElementById('description') as HTMLInputElement;
  
    if (usernameElement && nameElement && emailElement && educationElement && 
        experienceElement && skillsElement && descriptionElement) {
        
        const username = usernameElement.value;
        const name = nameElement.value;
        const email = emailElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const description = descriptionElement.value;

        // Create resume data 
        const resumeData = { 
            name, 
            email, 
            education, 
            experience, 
            skills, 
            description 
        };

    localStorage.setItem(username,JSON.stringify(resumeData));

    const resumeHTML= `

    <h2>Personal Information</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Education:</strong> ${education}</p>
    <p><strong>Experience:</strong> ${experience}</p>
    <p><strong>Skills:</strong> ${skills}</p>
    <p><strong>Description:</strong> ${description}</p>

    `;
       resumeDisplayElement.innerHTML = resumeHTML;

       const shareableURL =`${window.location.origin}?username=${encodeURIComponent(username)}`;

       shareableLinkContainer.style.display="block";
       shareabLeLinkElement.href = shareableURL;
       shareabLeLinkElement.textContent = shareableURL;
        }   
});

downloadPDFButton.addEventListener("click",()=>{
    window.print();
});
}

window.addEventListener("DOMContentLoaded", ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (username){
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData){

        const resumeData = JSON.parse (savedResumeData);
        (document.getElementById('username')as HTMLInputElement).value=username;
        (document.getElementById('name')as HTMLInputElement).value=resumeData.name;
        (document.getElementById('email')as HTMLInputElement).value= resumeData.email;
        (document.getElementById('education')as HTMLInputElement).value=resumeData.education;
        (document.getElementById('experience')as HTMLInputElement).value=resumeData.experience;
        (document.getElementById('skills')as HTMLInputElement).value=resumeData.skills;
        (document.getElementById('description')as HTMLInputElement).value=resumeData.description;
        
        }

    }

    
    
});