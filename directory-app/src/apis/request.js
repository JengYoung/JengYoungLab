const API_END_POINT = process.env.API_END_POINT;

export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) {
      throw new Error("API Call Failed");
    }

    return await res.json();
  } catch (e) {
    alert(e.message);
  }
};
