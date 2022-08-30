console.log("Hare Krishna");
const load_phones = async (phoneName) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`; 
    const res = await fetch(url);
    const data = await res.json();
    placeData(data.data);
}


const placeData = data => {
    const phones = document.getElementById("phones");
    phones.innerHTML = ``;
    if(data.length === 0)
    {
        document.getElementById("no-result").classList.remove('d-none');
        document.getElementById("buttonShowMore").classList.add('d-none');
    }
    else {
        document.getElementById("no-result").classList.add('d-none');
        if(data.length>10)
        {
            data = data.slice(0, 10);
            document.getElementById("buttonShowMore").classList.remove('d-none');
        }
        else
        { 
            document.getElementById("buttonShowMore").classList.add('d-none');
        }
    }
    for (const phone of data) {
        console.log(phone);
        const div = document.createElement('div');
        
        div.innerHTML = `<div class="col">
            <div class="card h-100">
                <img src="${phone.image}" class="card-imgf-top" alt="...">
                <div class="card-body">
                   <h5 class="card-title">${phone.phone_name}</h5>
                </div>
            </div>
        </div>`;
        phones.append(div);
    }
    toggleSpinner(false);
}


document.getElementById('search').addEventListener('click', function(){
    toggleSpinner(true);
    const phoneName = document.getElementById('input').value;
    load_phones(phoneName);
});


const toggleSpinner = isSpinner=>{
    const spinner = document.getElementById('spinner');
    if(isSpinner)
    {
        document.getElementById("spinner").classList.remove("d-none");
    }
    else
    {
        document.getElementById("spinner").classList.add("d-none");
    }
}

 


document.getElementById('input').addEventListener('keydown', function(event){
    if(event.key === "Enter")
    {
        console.log("Enter button clicked");
    }
    // const phoneName = document.getElementById('input').value;
    // load_phones(phoneName);
});
 