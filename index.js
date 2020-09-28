const usersUrl = "https://5f518d325e98480016123ada.mockapi.io/api/v1/users";
const jobsUrl = "https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs";

let users = [];
let jobs = [];


const showForm = () =>{
    const modal = document.querySelector('#form-modal');
    modal.style.display = "block";
}

const hideForm = () =>{
    const form = document.querySelector('#form-modal');
    form.style.display = "none";
}

const createRow = (user) =>{
    const tbody = document.querySelector('#append-here');
    const row = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.innerText = user.id;
    const tdName = document.createElement('td');
    tdName.innerText = user.name;
    const tdAvatar = document.createElement('td');
    const imgAvatar = document.createElement('img');
    imgAvatar.src = user.avatar;
    imgAvatar.style.width = "45px";
    imgAvatar.style.borderRadius = "50%";
    

    const tdPosition = document.createElement('td');
    const jobFound = jobs.find(job => job.id == user.jobId); 
    tdPosition.innerText = jobFound.name;

    const tdFecha = document.createElement('td');
    tdFecha.innerText = user.createdAt;

    const tdEliminar = document.createElement('td');
    const btnEliminar = document.createElement('button');
    btnEliminar.innerText = "Eliminar";


    row.appendChild(tdId);
    row.appendChild(tdName);
    tdAvatar.appendChild(imgAvatar);
    row.appendChild(tdAvatar);
    row.appendChild(tdPosition);
    row.appendChild(tdFecha);
    tdEliminar.appendChild(btnEliminar);
    row.appendChild(tdEliminar);
    tbody.appendChild(row);
}

const loadSelect = (job) =>{
    const select = document.querySelector('#select-jobs');
    const option = document.createElement('option');
    option.innerText = job.name;
    option.classList.add("option-job")
    option.value = job.id;

    select.appendChild(option);

}

const addUser = async () =>{
    try{
        const inputName = document.querySelector('#input-name').value;
        const inputAvatar = document.querySelector('#input-avatar').value;

        const jobOptions = document.querySelectorAll('.option-job');
        let jobIdSelected = jobOptions.forEach(option => {if(option.selected) option.value});
        console.log("jobId:",jobIdSelected);

        const res = await axios.post('https://5f518d325e98480016123ada.mockapi.io/api/v1/users',
        {
            name: inputName,
            avatar: inputAvatar,
            jobId: jobIdSelected
        });
        
        createRow(res.data);

    }catch(err){
        console.log("ERROR", err);
    }
}


const loadApis = async () =>{
    //trae las apis
    const res = axios.get('https://5f518d325e98480016123ada.mockapi.io/api/v1/users');
    const res2 = axios.get('https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs');

    //para trabajar con varias promesas o endpoints se usa el Promise.all

    try{
        const resp = await Promise.all([res, res2]);
        users = resp[0].data;
        jobs = resp[1].data;

        console.log("ACA MIS USERS:",users);
        console.log("ACA MI JOB:",jobs);

        users.forEach(user=>{
            createRow(user);
        });

        jobs.forEach(job=>{
            loadSelect(job);
        });

    }catch(err){
        console.log("ERROR", err);
    }
}

const load = () =>{
    document.querySelector('#add-user-btn').addEventListener("click", showForm);
    document.querySelector('#form-btn-cerrar').addEventListener("click", hideForm);
    document.querySelector('#guardar-form').addEventListener("click",() => {
        addUser();
        hideForm();
    });

    loadApis();
}
