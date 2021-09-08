const { API_END_POINT } = process.env;

export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) {
      throw new Error("요청에 실패했어요!");
    }

    return await res.json();
  } catch (e) {
    alert(e.message);
  }
};
