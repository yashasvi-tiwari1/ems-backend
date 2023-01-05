import express from "express";
import jsonwebtoken from "jsonwebtoken";

const app = express();
const router = express.Router();

const accessSecretKey = process.env.ACCESS_TOKEN_SECRET;
router.post("/", async (req, res) => {
  const refToken: any = req.headers.authorization;
  const refreshToken = refToken.slice(7);
  console.log(refreshToken);
  const tokenInfo = jsonwebtoken.verify(
    refreshToken,
    `${process.env.REFRESH_TOKEN_SECRET}`
  );
  const string = JSON.stringify(tokenInfo);
  const realInfo = JSON.parse(string);
  const information = {
    role:realInfo.role,
    username:realInfo.username,
  }
  const newAccesToken = generateAccessToken(information);
  console.log(newAccesToken);
  res.send(newAccesToken);
});

export { router as refreshRouter };

function generateAccessToken(tokenInfo: any) {
  return jsonwebtoken.sign(tokenInfo, `${accessSecretKey}`, {
    expiresIn: "10m",
  });
}
