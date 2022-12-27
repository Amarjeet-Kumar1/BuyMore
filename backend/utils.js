import jwt from 'jsonwebtoken';
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const toaken = authorization.slice(7, authorization.length); //bearer token
    jwt.verify(toaken, process.env.JWT_SECRET, (err, docode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = docode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
