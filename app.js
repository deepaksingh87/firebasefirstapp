const cafeList = document.querySelector('#cafe-list');
let form = document.querySelector('#add-cafe-form');
//create element and render cafe

function renderCafe(doc) {
    let li = document.createElement('li');
    let phone = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);

    phone.textContent = doc.data().phone;

    city.textContent = doc.data().city;
    cross.textContent = 'x'

    li.appendChild(phone);

    li.appendChild(city);
    li.appendChild(cross);
    cafeList.appendChild(li);

    //deleting data

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}
//getting data
db.collection('cafes').orderBy('city').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        // console.log(doc.data())

        // console.log(snapshot.docs)  
        renderCafe(doc);
    })
});


//sending data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        phone: form.phone.value,
        city: form.city.value

    })
    form.phone.value = '';
    form.city.value = '';
})