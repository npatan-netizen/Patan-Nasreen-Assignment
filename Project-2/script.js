// Clean Data Object representing the form data
const formData = {
    claimNumber: "20042047",
    workerName: "Madeleine Willson",
    appId: "712041",
    
    // Page 1 Data
    rtwStatus: "returned", // options: "not-missed", "not-returned", "returned"
    rtwDate: "March 15, 2024",
    workingStatus: "mod-red", // options: "full-reg", "full-red", "mod-reg", "mod-red", "other"
    workingOther: "",
    rtwGoing: "Terrible. Testing Testing",
    expectRtwDate: "",
    rtwConcerns: "",
    contactName: "",
    contactDate: "",
    recoveryStatus: "fully", // options: "not-fully", "fully"
    recoveryComments: "",

    // Page 2 Data
    painLevel: null, // 1 to 10
    medTreatment: null,
    medProviderType: "",
    lastMedDate: "",
    lastMedName: "",
    nextMedDate: "",
    nextMedName: "",
    chiroFreq: "",
    medication: null,
    medicationName: "",
    exercises: null,
    exercisesList: "",
    additionalInfo: "No info Testing Testing"
};

// Returns current date in format matching document: Month DD, YYYY HH:MM
function getTimestamp() {
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${month} ${date}, ${year} ${hours}:${minutes}`;
}

// Populates HTML elements with data from the state object
function generateForm() {
    // Top Level Info
    document.getElementById('claim-number').textContent = formData.claimNumber;
    document.getElementById('worker-name').textContent = formData.workerName;
    
    // Fill text inputs
    const textInput = {
        'rtw-date': formData.rtwDate,
        'working-other': formData.workingOther,
        'expect-rtw-date': formData.expectRtwDate,
        'contact-name': formData.contactName,
        'contact-date': formData.contactDate,
        'med-provider-type': formData.medProviderType,
        'last-med-date': formData.lastMedDate,
        'last-med-name': formData.lastMedName,
        'next-med-date': formData.nextMedDate,
        'next-med-name': formData.nextMedName,
        'chiro-freq': formData.chiroFreq,
        'medication-name': formData.medicationName
    };
    
    for (const [id, value] of Object.entries(textInput)) {
        if (value) {
            document.getElementById(id).value = value;
        }
    }

    // Fill Text Areas (divs formatted as text areas)
    const areaField = {
        'rtw-going': formData.rtwGoing,
        'rtw-concerns': formData.rtwConcerns,
        'recovery-comments': formData.recoveryComments,
        'exercises-list': formData.exercisesList,
        'additional-info': formData.additionalInfo
    };

    for (const [id, value] of Object.entries(areaField)) {
        if (value) {
            const el = document.getElementById(id);
            el.innerHTML = `<span class="blue-text">${value}</span>`;
        }
    }

    // Handle Radio Buttons dynamically based on state
    if (formData.rtwStatus) {
        document.querySelector(`input[name="rtw-status"][value="${formData.rtwStatus}"]`).checked = true;
    }
    if (formData.workingStatus) {
        document.querySelector(`input[name="working-status"][value="${formData.workingStatus}"]`).checked = true;
    }
    if (formData.recoveryStatus) {
        document.querySelector(`input[name="recovery-status"][value="${formData.recoveryStatus}"]`).checked = true;
    }
    if (formData.painLevel) {
        document.querySelector(`input[name="pain"][value="${formData.painLevel}"]`).checked = true;
    }
    if (formData.medTreatment) {
        document.querySelector(`input[name="med-treatment"][value="${formData.medTreatment}"]`).checked = true;
    }
    if (formData.medication) {
        document.querySelector(`input[name="medication"][value="${formData.medication}"]`).checked = true;
    }
    if (formData.exercises) {
        document.querySelector(`input[name="exercises"][value="${formData.exercises}"]`).checked = true;
    }
}

// Configures footers across all pages
function setFootersElements() {
    const timestamp = getTimestamp();
    const pages = document.querySelectorAll('.page-container');
    const totalPages = pages.length;
    
    pages.forEach((page, index) => {
        // Set App ID
        const appIdEl = page.querySelector('.app-id');
        if (appIdEl) appIdEl.textContent = formData.appId;
        
        // Set Date
        const timeEl = page.querySelector('.submit-time');
        if (timeEl) timeEl.textContent = timestamp;
        
        // Set Page Number automatically
        const pageNumEl = page.querySelector('.page-number');
        if (pageNumEl) pageNumEl.textContent = `Page ${index + 1} of ${totalPages}`;
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    generateForm();
    setFootersElements();
});
