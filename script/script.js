
let issueData = [];

const allIssues = document.getElementById("issue-container");
const loadingSpinner = document.getElementById("loadingSpinner");
const totalIssue = document.getElementById("totalIssue");













// spinner added
function showLoading() {
    loadingSpinner.classList.remove("hidden")
    loadingSpinner.classList.add("flex")
}

function hideLoading() {
    loadingSpinner.classList.add("hidden")
}










// async function loadOpenIssue() {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//     const data = await res.json();

//     console.log(data.data.id);

// }



const removeBtn = () => {
    const lessonButtons = document.querySelectorAll(".issue-btn")
    lessonButtons.forEach(btn => btn.classList.remove("btn-primary"))
}

document.getElementById("open-issue-btn").addEventListener('click', () => {
    removeBtn()
    showLoading()
    const clickBtn = document.getElementById("open-issue-btn")
    clickBtn.classList.add("btn-primary")

    const openIssue = issueData.filter(issue => issue.status == "open")
    displayIssue(openIssue)
    hideLoading()
})


document.getElementById("closed-issue-btn").addEventListener('click', () => {
    removeBtn()
    const clickBtn = document.getElementById("closed-issue-btn")
    clickBtn.classList.add("btn-primary")

    const closedIssue = issueData.filter(issue => issue.status === "closed")
    displayIssue(closedIssue)
})

document.getElementById("all-issue-btn").addEventListener('click', () => {
    removeBtn()
    const clickBtn = document.getElementById("all-issue-btn")
    clickBtn.classList.add("btn-primary")

    displayIssue(issueData)
})









// Issue Container
async function issueLoad() {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    hideLoading()
    issueData = data.data;
    displayIssue(data.data)
}



function displayIssue(data) {
    allIssues.innerHTML = "";
    totalIssue.innerHTML = data.length


    data.forEach(card => {
        const issueCard = document.createElement("div");
        // const borderColor = card.status === "open"? "border-primary" : "border-success";
        let iconColor = 0;
        let borderColor = 0;
        if (card.status === "closed") {
            borderColor = "border-primary";
            iconColor = "text-primary"
        } else {
            borderColor = "border-success";
            iconColor = "text-success"
        }




        // const priority = card.priority === "high"? "badge-success": "badge-error";
        let priority = 0;
        if (card.priority === "high") {
            priority = "bg-gray-900"
        } else if (card.priority === "medium") {
            priority = "bg-gray-600"
        } else {
            priority = "bg-gray-400"
        }

        issueCard.onclick = () => onclick = issueDetail(card.id)
        issueCard.className = `bg-white shadow-xl ${borderColor} border-t-5  rounded-[8px]`;
        issueCard.innerHTML = `
             <div class=" border-b-2 border-gray-300">
                    <div class="space-y-4 py-5 px-3">
                        <div class="flex justify-between items-center">
                            <i class="fa-solid fa-circle ${iconColor}"></i>
                            <div class="text-white badge ${priority} px-7 font-bold">${card.priority}</div>
                        </div>

                        <div>
                            <div class="h-14 flex items-center"> <h2 class="font-bold">${card.title}</h2> </div>
                            <p class="text-gray-500 text line-clamp-2 text-[0.9rem]">${card.description}</p>
                        </div>

                        <div class="flex gap-2 flex-wrap">
                            ${createElements(card.labels)}
                        </div>
                    </div>
            </div>
            <div class="py-1.5 px-3 text-[0.9rem] text-gray-600">
                <p class="mb-2"># ${card.assignee ? card.assignee : "No Assignee"}</p>
                <p>${card.createdAt}</p>
            </div>
        `
        allIssues.appendChild(issueCard)
    });
}

function createElements(labels) {
    const showLabels = labels.map(label => `<p class="badge badge-accent text-[0.8rem] py-5""><i class="fa-solid fa-bug"></i>${label}</p>`)
    return showLabels.join(" ");
    
}

// <div class="badge badge-accent text-[0.8rem] py-5">${createElements(card.labels)}</div>


issueLoad();









// issue detail functionality
async function issueDetail(id) {
    res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    data = await res.json()
    displayIssueDetail(data.data)
}



function displayIssueDetail(details) {

    // let priorityColor = 0;
    // if(details.priority === "")



    let statusColor = 0;
    if (details.status === "closed") {
        statusColor = "bg-primary"
    } else {
        statusColor = "bg-success"
    }



    document.getElementById("details-issue-container").innerHTML = `
           <div class=" max-w-3xl p-4 space-y-5">
                <div>
                    <h1 class="text-2xl font-bold mb-2">${details.title}</h1>
                    <div class="flex items-center gap-4 text-[0.8rem]">
                        <p class="badge ${statusColor} rounded-3xl px-4 text-white font-semibold">${details.status}</p>
                        <div class="flex items-center gap-1">
                            <div class="bg-gray-600 rounded-full p-1 w-1 h-1"></div>
                            <p>Opened by ${details.author}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <div class="bg-gray-600 rounded-full p-1 w-1 h-1"></div>
                            <p>${details.createdAt}</p>
                        </div>
                    </div>
                </div>
                <div class="text-[0.8rem]">
                    <p class="badge bg-gray-300 py-3.5 rounded-4xl "><i class="fa-solid fa-bug"></i>${details.labels[0]}</p >
                    <p class="badge bg-gray-300 py-3.5 rounded-4xl"><i class="fa-solid fa-life-ring"></i> ${details.labels[1]}</p>
                </div >
                <div class="text-[0.8rem]">
                    <p>${details.description}</p>
                </div>
                <div class="grid grid-cols-2 bg-gray-100 px-3 py-2 rounded-xl text-[0.8rem]">
                    <div>
                        <p>Assignee:</p>
                        <p class="font-semibold">${details.author}</p>
                    </div>
                    <div class="text-[0.8rem]">
                        <p>Priority:</p>
                        <p class="badge bg-red-600 text-white rounded-4xl px-6 py-3 outline-0">${details.status}</p>
                    </div>
                </div>
            </div >
        `

    document.getElementById("issue_modal").showModal()
}







// search all Issues
document.getElementById("search-issues").addEventListener('click', () => {
    const input = document.getElementById("input-issue");
    const searchValue = input.value;
    
    if(searchValue === ""){
        alert("Please input search")
        return;
    }
    removeBtn()
    
    showLoading()
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
        .then(res => res.json())
        .then(data => {
            const allIssues = data.data;
            const filterIssue = allIssues.filter(issue => issue.title.toLowerCase().includes(searchValue))
            displayIssue(filterIssue)
            hideLoading()
        })


})






















