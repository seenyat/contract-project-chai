
function cookiesCleaner(req, res, next) {
  // если есть кука и нет сессии - удаляем куку
  console.log(req.session.user );
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");

  }
  next();
}



module.exports = {
  
  cookiesCleaner,
};
