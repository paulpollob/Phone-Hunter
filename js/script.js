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
}


document.getElementById('search').addEventListener('click', function(){
    console.log("Hare Krishna from button" );
    const phoneName = document.getElementById('input').value;
    load_phones(phoneName);
});
 