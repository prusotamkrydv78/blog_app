//login logics

const login = (req, res) => {
  res.render("auth/login", {
    title: "BlogVerse - Login",
    user: null,
  });
};

const loginUser = (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  res.send('login complete')
};
//registers logics
const register = (req, res) => {
  res.render("auth/register", {
    title: "BlogVerse - Register",
    user: null,
  });
};
const registerUser = (req,res)=>{
    const { username, email, password } = req.body;
    console.log(username, email, password);
}

export { login, register, loginUser, registerUser };
