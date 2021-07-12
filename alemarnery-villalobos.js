// No editar
const clients = [
  { id: 1, taxNumber: "86620855", name: "HECTOR ACUÑA BOLAÑOS" },
  { id: 2, taxNumber: "7317855K", name: "JESUS RODRIGUEZ ALVAREZ" },
  { id: 3, taxNumber: "73826497", name: "ANDRES NADAL MOLINA" },
  { id: 4, taxNumber: "88587715", name: "SALVADOR ARNEDO MANRIQUEZ" },
  { id: 5, taxNumber: "94020190", name: "VICTOR MANUEL ROJAS LUCAS" },
  { id: 6, taxNumber: "99804238", name: "MOHAMED FERRE SAMPER" },
];

const accounts = [
  { clientId: 6, bankId: 1, balance: 15000 },
  { clientId: 1, bankId: 3, balance: 18000 },
  { clientId: 5, bankId: 3, balance: 135000 },
  { clientId: 2, bankId: 2, balance: 5600 },
  { clientId: 3, bankId: 1, balance: 23000 },
  { clientId: 5, bankId: 2, balance: 15000 },
  { clientId: 3, bankId: 3, balance: 45900 },
  { clientId: 2, bankId: 3, balance: 19000 },
  { clientId: 4, bankId: 3, balance: 51000 },
  { clientId: 5, bankId: 1, balance: 89000 },
  { clientId: 1, bankId: 2, balance: 1600 },
  { clientId: 5, bankId: 3, balance: 37500 },
  { clientId: 6, bankId: 1, balance: 19200 },
  { clientId: 2, bankId: 3, balance: 10000 },
  { clientId: 3, bankId: 2, balance: 5400 },
  { clientId: 3, bankId: 1, balance: 9000 },
  { clientId: 4, bankId: 3, balance: 13500 },
  { clientId: 2, bankId: 1, balance: 38200 },
  { clientId: 5, bankId: 2, balance: 17000 },
  { clientId: 1, bankId: 3, balance: 1000 },
  { clientId: 5, bankId: 2, balance: 600 },
  { clientId: 6, bankId: 1, balance: 16200 },
  { clientId: 2, bankId: 2, balance: 10000 },
];

const banks = [
  { id: 1, name: "SANTANDER" },
  { id: 2, name: "CHILE" },
  { id: 3, name: "ESTADO" },
];

/*
    - Su prueba debe ejecutarse sin errores con: node nombre-apellido.js
    - Su prueba debe ejecutarse sin errores en la consola del inspector de Google Chrome
*/

// 0 Arreglo con los ids de clientes
function listClientsIds() {
  return clients.map((client) => client.id);
}

// 1 Arreglo con los ids de clientes ordenados por rut
function listClientsIdsSortByTaxNumber() {
  return clients
    .map((client) => ({ id: client.id, taxNumber: client.taxNumber }))
    .sort((a, b) => (a.taxNumber > b.taxNumber ? 1 : -1))
    .map((client) => client.id);
}

// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
function sortClientsTotalBalances(newClients, newAccounts) {
  // These changes were added to reuse
  // this function for question #8
  const finalClients = newClients || clients;
  const finalAccounts = newAccounts || accounts;

  const clientsAndTotalBalances = finalClients.map((client, i) => {
    const totalBalanceForClient = finalAccounts.reduce((acc, account) => {
      if (account.clientId === client.id) {
        return (acc += account.balance);
      }

      return acc;
    }, 0);

    return {
      name: client.name,
      totalBalance: totalBalanceForClient,
    };
  });

  clientsAndTotalBalances.sort((a, b) =>
    a.totalBalance < b.totalBalance ? 1 : -1
  );

  return clientsAndTotalBalances.map((client) => client.name);
}

// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
function banksClientsTaxNumbers() {
  // Initialize result object using a reduce method
  return banks.reduce((prev, bank) => {
    // List all accounts per Bank
    const accountsPerBank = accounts.filter(
      (account) => account.bankId === bank.id
    );

    // List all clients per Bank
    const clientsPerBank = accountsPerBank.map((account) => {
      return clients.find((client) => client.id === account.clientId);
    });

    // Sort the clients array alphabetically
    const clientsPerBankAlph = clientsPerBank.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );

    // Return the taxNumber only
    prev[bank.name] = [
      ...new Set(clientsPerBankAlph.map((client) => client.taxNumber)),
    ];

    return prev;
  }, {});
}

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
function richClientsBalances() {
  const account = accounts
    .filter((account) => account.bankId === 1 && account.balance > 25000)
    .sort((a, b) => (a.balance < b.balance ? -1 : -1));

  return account.map((value) => value.balance);
}

// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
function banksRankingByTotalBalance() {
  const banksByTotalBalance = banks.map((bank) => {
    const totalMoney = accounts.reduce((acc, account) => {
      if (bank.id === account.bankId) {
        return acc + account.balance;
      }
      return acc;
    }, 0);

    return {
      bankId: bank.id,
      totalMoney,
    };
  });

  return banksByTotalBalance
    .sort((a, b) => (a.totalMoney > b.totalMoney ? 1 : -1))
    .map((bank) => bank.bankId);
}

// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
function banksFidelity() {
  // Initialize result object using a reduce method
  return banks.reduce((prev, bank) => {
    // List all accounts per Bank
    const accountsPerBank = accounts.filter(
      (account) => account.bankId === bank.id
    );

    // List all clients per Bank
    const clientsPerBank = [
      ...new Set(
        accountsPerBank.map((account) => {
          return clients.find((client) => client.id === account.clientId);
        })
      ),
    ];

    // Return the length only
    prev[bank.name] = clientsPerBank.length;

    return prev;
  }, {});
}

// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
function banksPoorClients() {
  // Initialize result object using a reduce method
  return banks.reduce((prev, bank) => {
    // List all accounts per Bank
    const accountsPerBank = accounts.filter(
      (account) => account.bankId === bank.id
    );

    // Sum of all balances per client and bank
    const clientTotalBalancesPerBank = accountsPerBank.reduce(
      (prev, account) => {
        const accBalance = prev[account.clientId] || 0;
        prev[account.clientId] = accBalance + account.balance;

        return prev;
      },
      {}
    );

    let minBalanceClient = {
      id: 0,
      // We default the balance
      // to any random high value
      balance: 9999999,
    };

    for (clientId in clientTotalBalancesPerBank) {
      if (clientTotalBalancesPerBank[clientId] < minBalanceClient.balance) {
        minBalanceClient = {
          id: parseInt(clientId),
          balance: clientTotalBalancesPerBank[clientId],
        };
      }
    }

    // Return the ID of the poorest client
    prev[bank.name] = minBalanceClient.id;

    return prev;
  }, {});
}

// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado.
// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newClientRanking() {
  const NEW_CLIENT = {
    id: 7,
    taxNumber: "23894731",
    name: "ALEMARNERY CHINQUINQUIRA VILLALOBOS MARCANO",
  };
  const NEW_ACCOUNT = {
    clientId: 7,
    bankId: 3,
    balance: 9000,
  };
  const newClients = [...clients, NEW_CLIENT];
  const newAccounts = [...accounts, NEW_ACCOUNT];

  return sortClientsTotalBalances(newClients, newAccounts).indexOf(
    NEW_CLIENT.name
  );
}

// No modificar, eliminar o alterar cualquier línea de código o comentario de acá para abajo
// Cualquier cambio hará que su prueba quede invalidada automáticamente
console.log("Pregunta 0");
console.log(listClientsIds());
console.log("Pregunta 1");
console.log(listClientsIdsSortByTaxNumber());
console.log("Pregunta 2");
console.log(sortClientsTotalBalances());
console.log("Pregunta 3");
console.log(banksClientsTaxNumbers());
console.log("Pregunta 4");
console.log(richClientsBalances());
console.log("Pregunta 5");
console.log(banksRankingByTotalBalance());
console.log("Pregunta 6");
console.log(banksFidelity());
console.log("Pregunta 7");
console.log(banksPoorClients());
console.log("Pregunta 8");
console.log(newClientRanking());
