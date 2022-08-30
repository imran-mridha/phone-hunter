// Load Phones From API
const loadPhones = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  try{
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data,dataLimit)
  }catch(error){
    console.log(error)
  }
}
// Display Phones on the UI
const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.innerHTML = '';
  const ShowAll = document.getElementById('show-all');
  if(dataLimit && phones.length > 9){
    phones = phones.slice(0, 9);
    ShowAll.classList.remove('d-none')
  }else{
    ShowAll.classList.add('d-none')
  } 
  const notFound = document.getElementById('not-found');
  if(phones.length == 0){
    notFound.classList.remove('d-none');
  }else{
    notFound.classList.add('d-none');
  }
  phones.forEach(phone => {
    const {image,phone_name,brand,slug} = phone;
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML =`
    <div class="card p-4">
      <img src="${image}" class="card-img-top" alt="Phone-Image">
      <div class="card-body">
        <h5 class="card-title">${phone_name}</h5>
        <p class="card-text">${brand}</p>
        <button type="button" onclick="loadPhoneDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
      </div>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv)
  });
  toggleSpinner(false)
}
// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(event){
  if(event.key === 'Enter'){
    searchProces(9);
  }
});
// Search Proces
const searchProces = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit)
}
// Default Phones showing Limit
const searchPhoneLimit = () => {
  searchProces(10)
}
// Toggle Spinner
const toggleSpinner = isLoading => {
  const spinner = document.getElementById('spinner');

  if(isLoading){
    spinner.classList.remove('d-none')
  }else{
    spinner.classList.add('d-none')
  }
}
// Show all Products
const searchPhoneAll = () => {
  searchProces()
}
// Load Details
const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data)
}
// Display Details With Modal
const displayPhoneDetails = phone => {
  console.log(phone);
  const {brand,name,image,releaseDate,mainFeatures,others} = phone;
  const {chipSet,displaySize,memory,storage,sensors} = mainFeatures;
  const {Bluetooth,GPS,NFC,Radio,USB,WLAN} = others;
  console.log(sensors)
  const phoneTitle = document.querySelector('.modal-title');
  phoneTitle.innerText = name;
  const modalBody = document.getElementById('phone-details');
  modalBody.innerHTML = `
  <tr class="text-center">
     <td colspan="2"><img src="${image}" alt=""></td>
  </tr>
  <tr class="text-center">
    <td colspan="2"><h4>${name ? name : 'N/A'} Full Specifications</h4></td>
  </tr>
  <tr>
     <td>Realese Date</td>
     <td>${releaseDate ? releaseDate : 'N/A'}</td>
  </tr>
  <tr>
    <td><strong>Connectivity</strong></td>
    <td></td>
  </tr>
  <tr>
    <td>WLAN</td>
    <td>${WLAN ? WLAN : 'N/A'}</td>
  </tr>
  <tr>
    <td>Bluetooth</td>
    <td>${Bluetooth ? Bluetooth : 'N/A'}</td>
  </tr>
  <tr>
    <td>GPS</td>
    <td>${GPS ? GPS : 'N/A'}</td>
  </tr>
  <tr>
    <td>NFC</td>
    <td>${NFC ? NFC : 'N/A'}</td>
  </tr>
  <tr>
    <td>Radio</td>
    <td>${Radio ? Radio : 'N/A'}</td>
  </tr>
  <tr>
    <td>USB</td>
    <td>${USB ? USB : 'N/A'}</td>
  </tr>
  <tr>
    <td><strong>Display</strong></td>
    <td></td>
  </tr>
  <tr>
    <td>Display Size</td>
    <td>${displaySize ? displaySize: 'N/A'}</td>
  </tr>
  <tr>
    <td><strong>Performance</strong></td>
    <td></td>
  </tr>
  <tr>
    <td>Chipset</td>
    <td>${chipSet ? chipSet: 'N/A'}</td>
  </tr>
  <tr>
    <td>Chipset</td>
    <td>${memory ? memory: 'N/A'}</td>
  </tr>
  <tr>
    <td><strong>Storage</strong></td>
    <td></td>
  </tr>
  <tr>
    <td>ROM</td>
    <td>${storage ? storage : 'N/A'}</td>
  </tr>
  <tr>
    <td><strong>Others</strong></td>
    <td></td>
  </tr>
  <tr>
    <td>Sensors</td>
    <td>${sensors.join(', ') ? sensors.join(', '): 'N/A'}</td>
  </tr>
  <tr>
    <td>Manufactured by</td>
    <td>${brand ? brand : 'N/A'}</td>
  </tr>
  `
}
// Default Display Products
loadPhones(9, "Apple");