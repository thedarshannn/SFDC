// Mock data
const mockContacts = [
  {
    firstName: "Rajeev",
    lastName: "Sharma",
    dob: "1986-02-12",
    address: "1001 NOBLE ST STE 1",
    city: "FAIRBANKS",
    state: "AK",
    zip: "99701",
    email: "rajeevsharma@gmail.com",
    phone: "2582528582",
  },
  {
    firstName: "Eesha",
    lastName: "Sharma",
    dob: "1995-07-04",
    address: "4821 RIDGE TOP CIR",
    city: "ANCHORAGE",
    state: "AK",
    zip: "99508",
    email: "eeshasharma@gmail.com",
    phone: "",
  },
  {
    firstName: "John",
    lastName: "Smith",
    dob: "1990-03-15",
    address: "742 EVERGREEN TERRACE",
    city: "SPRINGFIELD",
    state: "IL",
    zip: "62701",
    email: "john.smith@gmail.com",
    phone: "2173334444",
  },
  {
    firstName: "Maria",
    lastName: "Garcia",
    dob: "1988-11-23",
    address: "123 MAIN STREET",
    city: "MIAMI",
    state: "FL",
    zip: "33101",
    email: "maria.g@yahoo.com",
    phone: "3055556666",
  },
  {
    firstName: "David",
    lastName: "Johnson",
    dob: "1992-09-30",
    address: "789 OAK AVENUE",
    city: "SEATTLE",
    state: "WA",
    zip: "98101",
    email: "david.j@outlook.com",
    phone: "2065557777",
  },
  {
    firstName: "Sarah",
    lastName: "Williams",
    dob: "1991-06-18",
    address: "456 PINE ROAD",
    city: "BOSTON",
    state: "MA",
    zip: "02108",
    email: "sarah.w@gmail.com",
    phone: "6175558888",
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    dob: "1987-12-05",
    address: "321 ELM STREET",
    city: "DENVER",
    state: "CO",
    zip: "80201",
    email: "michael.b@hotmail.com",
    phone: "3035559999",
  },
  {
    firstName: "Jennifer",
    lastName: "Davis",
    dob: "1993-04-27",
    address: "159 MAPLE DRIVE",
    city: "AUSTIN",
    state: "TX",
    zip: "78701",
    email: "jennifer.d@gmail.com",
    phone: "5125551111",
  },
  {
    firstName: "Robert",
    lastName: "Miller",
    dob: "1985-08-14",
    address: "753 BIRCH LANE",
    city: "PORTLAND",
    state: "OR",
    zip: "97201",
    email: "robert.m@yahoo.com",
    phone: "5035552222",
  },
  {
    firstName: "Lisa",
    lastName: "Anderson",
    dob: "1994-01-09",
    address: "951 CEDAR COURT",
    city: "CHICAGO",
    state: "IL",
    zip: "60601",
    email: "lisa.a@outlook.com",
    phone: "3125553333",
  },
  {
    firstName: "James",
    lastName: "Wilson",
    dob: "1989-10-21",
    address: "357 SPRUCE WAY",
    city: "SAN FRANCISCO",
    state: "CA",
    zip: "94101",
    email: "james.w@gmail.com",
    phone: "4155554444",
  },
  {
    firstName: "Emily",
    lastName: "Taylor",
    dob: "1996-05-03",
    address: "852 WILLOW PLACE",
    city: "NEW YORK",
    state: "NY",
    zip: "10001",
    email: "emily.t@yahoo.com",
    phone: "2125555555",
  },
];

// Global variables
let currentPage = 1;
const itemsPerPage = 10;
let filteredContacts = [...mockContacts];
let selectedContact = null;

// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const contactsBody = document.getElementById("contactsBody");
const noResults = document.getElementById("noResults");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const currentPageSpan = document.getElementById("currentPage");

// Event Listeners
searchBtn.addEventListener("click", handleSearch);
prevPageBtn.addEventListener("click", () => changePage(-1));
nextPageBtn.addEventListener("click", () => changePage(1));

// Search function
function handleSearch() {
  const firstName = document.getElementById("firstName").value.toLowerCase();
  const lastName = document.getElementById("lastName").value.toLowerCase();
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value.toLowerCase();
  const phone = document.getElementById("phone").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value.toLowerCase();
  const zip = document.getElementById("zip").value;
  const address = document.getElementById("address").value.toLowerCase();

  filteredContacts = mockContacts.filter((contact) => {
    return (
      (!firstName || contact.firstName.toLowerCase().includes(firstName)) &&
      (!lastName || contact.lastName.toLowerCase().includes(lastName)) &&
      (!dob || contact.dob === dob) &&
      (!email || contact.email.toLowerCase().includes(email)) &&
      (!phone || contact.phone.includes(phone)) &&
      (!state || contact.state === state) &&
      (!city || contact.city.toLowerCase().includes(city)) &&
      (!zip || contact.zip.includes(zip)) &&
      (!address || contact.address.toLowerCase().includes(address))
    );
  });

  currentPage = 1;
  displayContacts();
}

// Display contacts
function displayContacts() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedContacts = filteredContacts.slice(start, end);

  contactsBody.innerHTML = "";

  if (paginatedContacts.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  paginatedContacts.forEach((contact) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="checkbox-col">
                <input type="radio" name="contact-select" class="contact-radio">
            </td>
            <td>${contact.firstName} ${contact.lastName}</td>
            <td>${formatDate(contact.dob)}</td>
            <td>${contact.address}</td>
            <td>${contact.city}</td>
            <td>${contact.state}</td>
            <td>${contact.zip}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
        `;

    row.addEventListener("click", (e) => {
      const radio = row.querySelector(".contact-radio");
      radio.checked = true;
      selectContact(contact);
    });

    if (selectedContact === contact) {
      row.classList.add("selected");
      const radio = row.querySelector(".contact-radio");
      radio.checked = true;
    }

    contactsBody.appendChild(row);
  });

  updatePagination();
}

// Helper functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function changePage(delta) {
  const maxPage = Math.ceil(filteredContacts.length / itemsPerPage);
  currentPage = Math.max(1, Math.min(currentPage + delta, maxPage));
  currentPageSpan.textContent = currentPage;
  displayContacts();
}

function updatePagination() {
  const maxPage = Math.ceil(filteredContacts.length / itemsPerPage);
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === maxPage;
  currentPageSpan.textContent = currentPage;
}

function selectContact(contact) {
  selectedContact = contact;
  document.getElementById(
    "selectedName"
  ).textContent = `${contact.firstName} ${contact.lastName}`;
  document.getElementById("selectedEmail").textContent = contact.email || "-";
  document.getElementById("selectedPhone").textContent = contact.phone || "-";
  document.getElementById("selectedAddress").textContent = contact.address
    ? `${contact.address}, ${contact.city}, ${contact.state} ${contact.zip}`
    : "-";
  displayContacts();
}

// Add US states to the select dropdown
const states = [
  { value: "", label: "Select state" },
  { value: "AK", label: "Alaska" },
  { value: "AL", label: "Alabama" },
  { value: "AR", label: "Arkansas" },
  { value: "AZ", label: "Arizona" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DC", label: "District of Columbia" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "IA", label: "Iowa" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "MA", label: "Massachusetts" },
  { value: "MD", label: "Maryland" },
  { value: "ME", label: "Maine" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MO", label: "Missouri" },
  { value: "MS", label: "Mississippi" },
  { value: "MT", label: "Montana" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "NE", label: "Nebraska" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NV", label: "Nevada" },
  { value: "NY", label: "New York" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VA", label: "Virginia" },
  { value: "VT", label: "Vermont" },
  { value: "WA", label: "Washington" },
  { value: "WI", label: "Wisconsin" },
  { value: "WV", label: "West Virginia" },
  { value: "WY", label: "Wyoming" },
];

// Populate state dropdown
const stateSelect = document.getElementById("state");
states.forEach((state) => {
  const option = document.createElement("option");
  option.value = state.value;
  option.textContent = state.label;
  stateSelect.appendChild(option);
});

// Initial display
displayContacts();
