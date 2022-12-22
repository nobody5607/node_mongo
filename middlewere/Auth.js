import jwt from "jsonwebtoken";
export const Auth = (req, res, next) => {
  try {
    const seecret_key = process.env.SECRET_KEY;
    const token = req.headers.authorization.split(" ")[1];
    const { data } = jwt.verify(token, seecret_key);
    req.company = data;
    next();
  } catch (error) {
    return res.json({ status: "nok", message: "Unauthorized" });
  }
};

export const IsCompany = (req, res, next) => {
  try {
    const seecret_key = process.env.SECRET_KEY;
    const token = req.headers.authorization.split(" ")[1];
    const { data } = jwt.verify(token, seecret_key);
    req.company = data;

    if (data.role != "company" && data.role != "admin") {
      return res.json({ status: "nok", message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.json({ status: "nok", message: "Unauthorized" });
  }
};
