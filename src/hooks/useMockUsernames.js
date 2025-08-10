const useMockUsernames = () => {
  const users = {
    "687a5c321e886df381f39554": "Noel Boi",
    "687b52181e886df381f3d96d": "Mark Frongia",
    "687b9f6c1e886df381f3ed7c": "Mattia Secci",
    "687b488e1e886df381f3d6d5": "Luca Atzeni",
    "687a6acc1e886df381f39a37": "Miguel Tanda",
    "687b5c901e886df381f3dc2e" : "Pierluigi Mattana",
    "687b75081e886df381f3e284" : "Emanuele Songini",
    "687fbd2d320c5674fca1ce73" : "Paola Peruzzi"
  };

  const getUsernameById = (id) => users[id] || null;

  return { getUsernameById };
};

export default useMockUsernames;
