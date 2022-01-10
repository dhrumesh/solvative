const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const verify = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: "unauthorize access" });

    let token = req.headers.authorization.replace("Bearer ", "");

    console.log(token)
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken._id && !mongoose.Types.ObjectId.isValid(verifyToken._id))
      return res.status(401).json({ message: "invalid object id" });

      req.user = {_id : verifyToken._id}
      next()
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports=  {
    verify
}