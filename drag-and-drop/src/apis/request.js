const API_END_POINT = process.env.API_END_POINT;

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
    });

    if (!res.ok) {
      throw new Error("API fetch failed");
    }

    return await res.json();
  } catch (e) {
    alert(e.message);
  }
};

export default request;
