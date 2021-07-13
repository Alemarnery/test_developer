//Escribe una función que imprima los primeros N números primos

// Funcion Auxiliar
function isPrime(n) {
  // Si el numero es menor a 2, no es primo
  if (n < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    // Si el modulo del numero con
    // el indice llega a ser cero, no es primo
    if (n % i === 0) {
      return false;
    }
  }

  // Pasó las validaciones,
  // el numero entonces es primo
  return true;
}

function getNprimes(n) {
  // Inicializamos el array resultante
  const arr = [];
  // Comenzamos conteo con el primer numero primo
  let i = 2;

  // Ciclo que pare cuando el array
  // este populadocon "n" numeros primos
  while (arr.length < n) {
    // Funcion auxiliar para saber si un numero es primo
    if (isPrime(i)) {
      // De ser primo, lo guardamos en el array resultante
      arr.push(i);
    }
    // Sumamos el contador para evaluar el siguiente
    // numero si aun no tenemos la cantidad solicitada
    i++;
  }

  // Devolvemos array resultante
  return arr;
}

console.log(getNprimes(10));
