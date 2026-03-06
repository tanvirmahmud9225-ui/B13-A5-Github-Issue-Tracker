
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
        if (card.status === "open") {
            borderColor = "border-primary";
            iconColor = "text-primary"
        } else {
            borderColor = "border-success";
            iconColor = "text-success"
        }


        issueCard.className = `bg-white shadow-xl ${borderColor} border-t-5  rounded-[8px]`;
        issueCard.innerHTML = `
             <div class=" border-b-2 border-gray-300">
                    <div class="space-y-5 py-5 px-3">
                        <div class="flex justify-between items-center">
                            <i class="fa-solid fa-circle ${iconColor}"></i>
                            <div class="text-white badge badge-error px-7 font-bold">${card.priority}</div>
                        </div>

                        <div>
                            <div class="h-14 flex items-center"> <h2 class="font-bold">${card.title}</h2> </div>
                            <p class="text-gray-500 text line-clamp-2 text-[0.9rem]">${card.description}</p>
                        </div>

                        <div class="flex gap-2">
                            <div class="badge badge-accent text-[0.8rem] py-5"><i class="fa-solid fa-bug"></i>${card.labels[0]}</div>
                            <div class="badge badge-warning text-[0.8rem]  py-5"><i class="fa-solid fa-life-ring"></i>${card.labels[1] ? card.labels[1] : "Not Issue"}</div>
                        </div>
                    </div>
            </div>
            <div class="py-4 px-3 text-[0.9rem] text-gray-600">
                <p class="mb-2"># ${card.assignee ? card.assignee : "No Assignee"}</p>
                <p>${card.createdAt}</p>
            </div>
        `
        allIssues.appendChild(issueCard)
    });

}



issueLoad();




















