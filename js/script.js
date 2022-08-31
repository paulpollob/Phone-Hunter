console.log("Hare Krishna");
let data;
let temp;
let details;




// load the data start
const load_phones = async (url) => {
    await fetch(url)
        .then(res => res.json())
        .then(rdata => this.temp = rdata.data);

}
// load the data end



// const load_phones = async (phoneName) => {
//     console.log("Hello 2");
//     const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`; 
//     const fetchjson = await fetch(url);
//     const data = await fetchjson.json();
//     console.log("Hello 3");
// }





// place data on display start
const placeData = (data, isSliceNmbr) => {
    const phones = document.getElementById("phones");
    phones.innerHTML = ``;
    if (data.length === 0) {
        document.getElementById("no-result").classList.remove('d-none');
        document.getElementById("buttonShowMore").classList.add('d-none');
    }
    else {
        document.getElementById("no-result").classList.add('d-none');
        if (data.length > 10) {
            if (isSliceNmbr === true) {
                data = data.slice(0, 10);
            }
            document.getElementById("buttonShowMore").classList.remove('d-none');
        }
        else {
            document.getElementById("buttonShowMore").classList.add('d-none');
        }
    }
    for (const phone of data) {
        const div = document.createElement('div');
        div.innerHTML = `<div class="col">
            <div class="card h-100">
                <img src="${phone.image}" class="card-imgf-top" alt="...">
                <div class="card-body">
                   <h5 class="card-title">${phone.phone_name}</h5>
                </div>
                <!-- Button trigger modal start-->
                
                <button onclick = "mobileDetails('${phone.slug}')" type="button" class=" m-4 btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">
                Show Details
                </button>
                <!-- Button trigger modal end -->
            </div>
        </div>`;
        phones.append(div);
    }
    toggleSpinner(false);
}
// place data on display end





//search button start
document.getElementById('search').addEventListener('click', function () {
    toggleSpinner(true);
    search();
});
// search button end




// search method start
async function search() {
    const phoneName = document.getElementById('phoneInput').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    await load_phones(url);
    this.data = this.temp;
    placeData(this.data, true);
}
// search method end





//enter key on search field start
document.getElementById("phoneInput").addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        toggleSpinner(true);
        search();
    }

});
// enter key on search field end




//loading spinner start
const toggleSpinner = isSpinner => {
    const spinner = document.getElementById('spinner');
    if (isSpinner) {
        document.getElementById("spinner").classList.remove("d-none");
    }
    else {
        document.getElementById("spinner").classList.add("d-none");
    }
}
// loading spinner end






//show more button start
document.getElementById("buttonShowMore").addEventListener("click", function () {
    showMore();
});
// show more button end


// show more start
function showMore() {
    placeData(this.data, false);
    document.getElementById("buttonShowMore").classList.add('d-none');
}
// show more end





//mobile details start
async function mobileDetails(slug) {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    console.log(url);
    await load_phones(url);
    this.details = this.temp;
    document.getElementById("exampleModalLabel").innerText = this.details.name;
    let unorderedList = document.getElementById("mainFeatures"); 
    unorderedList.innerText = '';
    for(const [key, value] of  Object.entries(this.details.mainFeatures))
    {
        const li = document.createElement('li'); 
        if(Array.isArray(value))
        {
            const ul = document.createElement('ul');
            for(const par of value)
            {
                const li = document.createElement('li'); 
                li.textContent = par;
                ul.appendChild(li);
            }
            li.textContent = key;
            li.appendChild(ul);
        }
        else 
        {
            li.textContent = `${key}: ${value}`;
        }
        unorderedList.appendChild(li);        
    }
}
// mobile details end





// tast
// enter handler
// add descriptionconsole
// show descript using modal



