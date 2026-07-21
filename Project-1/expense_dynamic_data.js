// Sample data demonstrating dynamic behavior (can easily handle 1 or 10+ elements)
const reportDataSets = {
    requesterName: "Madeleine Willson",
    claimNumber: "20042047",
    workerAppId: "712041",
    // Data will generate submittedDate dynamically
    sections: [
        {
            title: "Prescription Drugs",
            pageIndex: 1,
            headers: ["Drug Name", "Prescription Date", "Date Purchased", "Healthcare Provider Name", "Paid Amount"],
            rows: [
                ["Naproxen", "February 28, 2024", "February 29, 2024", "Dr. Best", "$20.00"]
            ]
        },
        {
            title: "Over-the-Counter Drugs",
            pageIndex: 1,
            headers: ["Drug Name", "Date Purchased", "Paid Amount", "Seller's Name", "Reason for Purchasing"],
            rows: [
                ["Advil", "March 28, 2024", "$8.00", "Shoppers Drug Mart", "Pain"]
            ]
        },
        {
            title: "Bandages, Braces or Other Medical Supplies",
            pageIndex: 1,
            headers: ["Item Purchased", "Date Purchased", "Was this Prescribed?", "Healthcare Provider Name", "Paid Amount", "Seller's Name"],
            rows: [
                ["Tensor", "February 28, 2024", "Yes", "Dr. Best", "$10.00", "Shoppers DrugMart"]
            ]
        },
        {
            title: "Parking for Medical Appointments",
            pageIndex: 1,
            headers: ["Address of Healthcare Provider/Medical Facility", "Date", "Paid Amount", "Meter Used?", "Meter Number"],
            rows: [
                ["333 St Mary Ave, Winnipeg MB R3C 4A5, Canada", "March 28, 2024", "$10.00", "yes", "12245"]
            ]
        },
        {
            title: "Mileage to Medical Appointments",
            pageIndex: 1,
            note: "The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.",
            headers: ["Appointment Date", "Address of Healthcare Provider/Medical Facility", "Address of Workplace", "Number of km (Round Trip)"],
            rows: [
                ["March 28, 2024", "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada", "20 km"]
            ]
        },
        {
            title: "Bus or Taxi Fare for Medical Appointments*",
            pageIndex: 2,
            note: "*Note: Pre-approval is required from your WCB representative to claim taxi fare(s).",
            headers: ["Appointment Date", "Address of Starting Point", "Address of Healthcare Provider/Medical Facility", "Bus or Taxi (indicate one)", "Total Fare Paid"],
            rows: [
                ["March 28, 2024", "", "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada", "Bus", "$3.00"],
                ["March 27, 2024", "25 Furby St, Winnipeg MB R3C2A2, Canada", "440 Edmonton St, Winnipeg MB R3B 2M4, Canada", "Taxi", "$15.00"]
            ]
        }
    ]
};

// Function to generate the current date in "Month DD, YYYY HH:MM" format
function getCurrentDate() {
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${month} ${date}, ${year} ${hours}:${minutes}`;
}

// Function to generate and render the UI based on data
function dynamicDocument() {
    // Generate dynamic date and set it
    const dynamicDate = getCurrentDate();
    const dateElements = document.querySelectorAll('.submitted-date');
    dateElements.forEach(el => el.textContent = dynamicDate);

    // Populate simple text fields
    document.getElementById('claim-number-display').textContent = reportDataSets.claimNumber;
    document.getElementById('requester-name-display').textContent = reportDataSets.requesterName;
    document.getElementById('worker-app-id-1').textContent = reportDataSets.workerAppId;
    document.getElementById('worker-app-id-2').textContent = reportDataSets.workerAppId;

    const containerPage1 = document.getElementById('tables-container-page-1');
    const containerPage2 = document.getElementById('tables-container-page-2');

    // Iterate through sections to build tables dynamically
    reportDataSets.sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'table-section';

        // Title
        const titleEl = document.createElement('h3');
        titleEl.className = 'table-title';
        titleEl.textContent = section.title;
        sectionDiv.appendChild(titleEl);

        // Optional Note
        if (section.note) {
            const noteEl = document.createElement('p');
            noteEl.className = 'table-note';
            noteEl.textContent = section.note;
            sectionDiv.appendChild(noteEl);
        }

        // Table
        const table = document.createElement('table');
        table.className = 'data-table';
        
        // Headers
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        section.headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Body (Rows)
        const tbody = document.createElement('tbody');
        section.rows.forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        sectionDiv.appendChild(table);
        
        // Append to appropriate page container
        if (section.pageIndex === 1) {
            containerPage1.appendChild(sectionDiv);
        } else {
            containerPage2.appendChild(sectionDiv);
        }
    });

    // Automatically calculate and print page numbers
    const pages = document.querySelectorAll('.page-container');
    const totalPages = pages.length;
    
    pages.forEach((page, index) => {
        const pageNumDisplay = page.querySelector('.page-number-display');
        if (pageNumDisplay) {
            pageNumDisplay.textContent = `Page ${index + 1} of ${totalPages}`;
        }
    });
}

// Execute on load
document.addEventListener('DOMContentLoaded', dynamicDocument);
