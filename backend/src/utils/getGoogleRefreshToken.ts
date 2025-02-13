import axios from "axios";

export const getGooogeRefreshToken = async (code: string): Promise<string> => {
  const payload = {
    grant_type: "authorization_code",
    code: code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  };
  const res = await axios.post("https://oauth2.googleapis.com/token", payload, {
    withCredentials: true,
  });
  return res.data;
};
