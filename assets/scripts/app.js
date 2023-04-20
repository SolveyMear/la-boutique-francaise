// ANCIEN CODE JS, MAUVAISE LOGIQUE (INCREMENT ET DELETE AU LIEU
// DE MULTIPLIER LE TOTAL DU PANIER AVEC L'USER INPUT)

// const nombreProduit = document.querySelector("#nombre-produit");

// let count = 0;

// nombreProduit.innerHTML = count;

// const handleIncrement = () => {
//   count++;
//   nombreProduit.innerHTML = count;
// };
// const handleDelete = () => {
//   count -= count;
//   nombreProduit.innerHTML = count;
// };

// const incrementCount = document.querySelectorAll("#add-produit");
// const deleteCount = document.querySelectorAll("#supprimer-produit");

// incrementCount.forEach((img) => {
//   img.addEventListener("click", handleIncrement);
// });
// deleteCount.forEach((img) => {
//   img.addEventListener("click", handleDelete);
// });

// console.log(nombreProduit);

// crée un tableau des prix
const getPrices = () => {
  const productsPrice = document.getElementsByClassName("products__price");
  const prices = [];

  for (let i = 0; i < productsPrice.length; i++) {
    const price = parseFloat(productsPrice[i].textContent);
    prices.push(price);
  }

  return prices;
};

// Fixe le prix du produit selon son index
const prixBleu = getPrices()[1]; // renvoie 25
const prixRaclette = getPrices()[2]; // renvoie 30
const prixCoulommiers = getPrices()[3]; // renvoie 61
const prixNectaire = getPrices()[4]; // renvoie 17

function cart() {
  // Check le user input en fonction de l'ID associé au produit
  const userInputs = [
    Number(document.getElementById("bleu").value),
    Number(document.getElementById("raclette").value),
    Number(document.getElementById("coulommiers").value),
    Number(document.getElementById("nectaire").value),
  ];

  // Calcul du prix en fonction de l'ajout de X produit
  // const ajoutBleuPanier = prixBleu * userInputs[0];
  // const ajoutRaclettePanier = prixRaclette * userInputs[1];
  // const ajoutCoulommiersPanier = prixCoulommiers * userInputs[2];
  // const ajoutNectairePanier = prixNectaire * userInputs[3];

  // Pareil, mais plus simple
  const total = [
    prixBleu * userInputs[0],
    prixRaclette * userInputs[1],
    prixCoulommiers * userInputs[2],
    prixNectaire * userInputs[3],
  ];

  let countItem = 0; // nombre de produits dans le panier
  let totalDue = 0; // total du panier

  for (let i = 0; i < userInputs.length; i++) {
    countItem += userInputs[i];
  }

  for (let n = 0; n < total.length; n++) {
    totalDue += total[n];
  }

  document.getElementById(
    "itemTotal"
  ).innerHTML = `Votre panier contient ${countItem} produit(s).`;
  document.getElementById(
    "totalDue"
  ).innerHTML = `Le total est de ${totalDue}€.`;

  // Vider entièrement le panier
  const clearCart = () => {
    const userInputs = [
      document.getElementById("bleu"),
      document.getElementById("raclette"),
      document.getElementById("coulommiers"),
      document.getElementById("nectaire"),
    ];

    for (let i = 0; i < userInputs.length; i++) {
      userInputs[i].value = 0;
    }

    document.getElementById("itemTotal").innerHTML = "Votre panier est vide.";
    document.getElementById("totalDue").innerHTML = "Le total est de 0€.";
  };

  // Ajouter un écouteur d'événement pour vider le panier
  const clearCartButton = document.getElementById("viderPanier");
  clearCartButton.addEventListener("click", clearCart);
}

// Panneau d'aministration du site
const users = [
  {
    id: 1,
    nomEntier: "Sacha ROFFINI",
    poste: "Étudiant",
    descr: "Je suis étudiant à l'université de Tours",
  },
  {
    id: 2,
    nomEntier: "Solvey MEAR",
    poste: "CEO",
    descr: "J'adore vraiment beaucoup le fromage",
  },
];
const validateBtn = document.getElementById("valider");

validateBtn.addEventListener("click", addUser);
showAllUsers();
updateOrDeleteUser();
function updateOrDeleteUser() {
  const deleteButtons = document.querySelectorAll(".Supprimer");
  const editButtons = document.querySelectorAll(".Modifier");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => deleteUser(button.id));
  });
  editButtons.forEach((button) => {
    button.addEventListener("click", () => editUser(button.id));
  });
}

function addUser(e) {
  e.preventDefault();
  const usersData = {
    id: users.length !== 0 ? users[users.length - 1].id + 1 : 1,
    nomEntier: document.getElementById("nomEntier").value,
    poste: document.getElementById("poste").value,
    descr: document.getElementById("descr").value,
  };
  if (
    usersData.nomEntier !== "" &&
    usersData.poste !== "" &&
    usersData.descr !== ""
  ) {
    users.push(usersData);
    showAllUsers();
  }
}

// Permet de récup l'URL de l'image en fonction du nomEntier de l'utilisateur
function getImagePath(nomEntier) {
  const imagePath =
    "/assets/images/" + nomEntier.toLowerCase().replace(" ", "") + ".jpeg";
  return imagePath;
}

// Affiche les utilisateurs une fois créés
function showAllUsers() {
  document.getElementById("allUsers").innerHTML = "";
  users.forEach((user) => {
    // const newInputs = {
    //   nomEntier: document.createElement("input"),
    //   poste: document.createElement("input"),
    //   descr: document.createElement("input"),
    // };
    const nomPara = document.createElement("p");
    nomPara.textContent = `Nom: ${user.nomEntier}`;

    const postePara = document.createElement("p");
    postePara.textContent = `Poste: ${user.poste}`;

    const descrPara = document.createElement("p");
    descrPara.textContent = `Description: ${user.descr}`;

    const userImage = new Image(100, 100);
    userImage.src = getImagePath(user.nomEntier); // Renvoie l'image selon nomEntier

    const newDiv = document.createElement("div");
    const newBtns = {
      Supprimer: document.createElement("input"),
      Modifier: document.createElement("input"),
    };

    // for (const [key, value] of Object.entries(newInputs)) {
    //   value.setAttribute("type", "text");
    //   value.setAttribute("id", `${key}OfUser${user.id}`);

    //   key === "nomEntier" && value.setAttribute("value", user.nomEntier);
    //   key === "poste" && value.setAttribute("value", user.poste);
    //   key === "descr" && value.setAttribute("value", user.descr);

    //   newDiv.appendChild(value);
    //   document.getElementById("allUsers").appendChild(newDiv);
    // }

    newDiv.appendChild(nomPara);
    newDiv.appendChild(postePara);
    newDiv.appendChild(descrPara);
    newDiv.appendChild(userImage);

    for (const [key, value] of Object.entries(newBtns)) {
      value.setAttribute("type", "button");
      value.setAttribute("class", key);
      value.setAttribute("id", user.id);
      value.setAttribute("value", key);
      newDiv.appendChild(value);
    }

    document.getElementById("allUsers").appendChild(newDiv);
  });

  updateOrDeleteUser();
}

// Supprimer utilisateur
function deleteUser(id) {
  users.forEach((user) => {
    const userPositionInArray = users.indexOf(user);
    user.id === parseInt(id) && users.splice(userPositionInArray, 1);
  });
  showAllUsers();
}

// Renvoie une erreur car adapté aux inputs, mais j'ai switch sur des paragraphes
// pour une meilleure sémantique, je dois revenir dessus
function editUser(id) {
  const newInputs = {
    nomEntier: document.getElementById(`nomEntierOfUser${id}`).value,
    poste: document.getElementById(`posteOfUser${id}`).value,
    descr: document.getElementById(`descrOfUser${id}`).value,
  };

  // Remplace les données user par celles créées dans newInputs
  users.forEach((user) => {
    if (user.id === parseInt(id)) {
      user.nomEntier = newInputs.nomEntier;
      user.poste = newInputs.poste;
      user.descr = newInputs.descr;
    }
  });
}
