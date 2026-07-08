const registerUser = async () => {
  try {
    const res = await axios.post(
      'https://enterskillhub-production.up.railway.app/api/auth/register',
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    );

    alert(res.data.message);
    window.location.href = '/login';
  } catch (err) {
    console.log(err);

    if (err.response) {
      alert(err.response.data.message);
    } else {
      alert('Network Error');
    }
  }
};
