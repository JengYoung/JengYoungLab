export const request = async (url) => {
  const API_END_POINT = process.env.API_END_POINT;
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) {
      throw new Error("API fetch failed");
    }

    return await res.json();
  } catch (e) {
    console.error(e);
    alert(e);
  }
};
