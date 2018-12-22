const stringToChar = (text) => {
  try {
    return text.toUpperCase().slice(0, 2);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
    return '🐶';
  }
};

export default stringToChar;
