// for printing normal log messages
const info = (...params) => {
  console.log(...params);
};

// for all error messages
const error = (...params) => {
  console.log(...params);
};

module.exports = { info, error };
