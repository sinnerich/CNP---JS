import React, { useState } from "react";

const CNP = () => {
  const [results, setResults] = useState([]);

  // Function to generate a unique CNP (Romanian Personal Numeric Code)
  const generateCNP = (j) => {
    // Selects a random number from 1, 2, 5, or 6 to represent gender and age group
    const s = [1, 2, 5, 6][Math.floor(Math.random() * 4)];

    // Generates two-digit components for the year, month, and day with padding for single digits
    const aa = String(Math.floor(Math.random() * 100)).padStart(2, "0"); // Year
    const ll = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0"); // Month
    const zz = String(Math.floor(Math.random() * 31) + 1).padStart(2, "0"); // Day

    // Formats the county code (j) to always be two digits
    const jj = String(j).padStart(2, "0");

    // Generates a three-digit serial number within the county
    const nnn = String(Math.floor(Math.random() * 1000)).padStart(3, "0");

    // Concatenates all parts to create the first 12 digits of the CNP
    const cnpBase = `${s}${aa}${ll}${zz}${jj}${nnn}`;

    // Constant used to calculate the checksum digit
    const constant = "279146358279";
    let sum = 0;

    // Calculates a weighted sum of the digits using the constant to produce the checksum
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpBase[i]) * parseInt(constant[i]);
    }

    // Computes the checksum digit, c, as the remainder of the sum divided by 11
    const c = sum % 11 < 10 ? sum % 11 : 1;

    // Returns the complete CNP by appending the checksum digit to the CNP base
    return cnpBase + String(c);
  };

  const generateName = (sex) => {
    const lastNames = [
      "Popescu",
      "Ionescu",
      "Georgescu",
      "Dumitrescu",
      "Stan",
      "Toma",
    ];
    const femaleNames = [
      "Maria",
      "Ana",
      "Ioana",
      "Elena",
      "Gabriela",
      "Daniela",
    ];
    const maleNames = ["Ion", "Vasile", "Andrei", "Mihai", "Daniel", "Nicolae"];

    // Selects a random first name from either female or male names based on the 'sex' parameter
    const firstName =
      sex === "f"
        ? femaleNames[Math.floor(Math.random() * femaleNames.length)]
        : maleNames[Math.floor(Math.random() * maleNames.length)];

    // Selects a random last name
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${lastName} ${firstName}`;
  };

  // Function to generate a sample population and store it in 'results'
  const generatePopulation = () => {
    // Define approximate populations for some Romanian regions
    const regions = {
      Alba: 378614,
      Arad: 458487,
      Bacau: 721411,
      Bucuresti: 1931236,
      Cluj: 689523,
    };

    // Calculate the total population across all regions
    const totalPop = Object.values(regions).reduce((a, b) => a + b, 0);

    // Define the target number of CNP entries to generate (reduced to 1000 for demonstration)
    const targetCnp = 1000;

    // Initialize an empty list to store generated CNPs and names
    const cnpList = [];

    // Loop through each region to generate a proportional number of entries based on population
    for (let region in regions) {
      // Calculate how many CNPs to generate for each region based on its population proportion
      const count = Math.floor((regions[region] * targetCnp) / totalPop);

      // Generate the specified number of CNP and name entries for this region
      for (let i = 0; i < count; i++) {
        // Randomly assign gender ('f' for female, 'm' for male)
        const sex = Math.random() < 0.5 ? "f" : "m";

        // Generate a CNP using a sample county code (1)
        const generatedCnp = generateCNP(1);

        // Generate a full name based on the assigned gender
        const fullName = generateName(sex);

        // Add the generated CNP and name as an object to the list
        cnpList.push({ cnp: generatedCnp, name: fullName });
      }
    }

    setResults(cnpList);
  };

  return (
    <div>
      <h2>Generated CNPs and Names</h2>

      <button onClick={generatePopulation}>Generate Population</button>

      <ul>
        {results.map((item, index) => (
          <li key={index}>
            <strong>CNP:</strong> {item.cnp} - <strong>Name:</strong>{" "}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CNP;
